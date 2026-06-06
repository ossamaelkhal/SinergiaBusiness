"use server"

import * as admin from 'firebase-admin'
import { revalidatePath } from 'next/cache'
import { getNicheBySlug } from '@/data/niches'
import { calculateInfraBase } from '@/lib/utils'

// Inicializar o Firebase Admin SDK com segurança no escopo do servidor
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK em billing.ts:', error);
  }
}

export interface PaymentSessionResponse {
  success: boolean;
  error?: string;
  type?: 'pix' | 'booking';
  pixPayload?: {
    qr_code: string;
    qr_code_base64: string;
    id: string;
    price: number;
  };
  plan?: string;
  price?: number;
  setupPrice?: number;
  monthlyLoss?: number;
}

export async function generatePaymentSession(leadId: string, modulesStr?: string): Promise<PaymentSessionResponse> {
  try {
    if (!leadId) {
      return { success: false, error: 'Lead ID é obrigatório.' };
    }

    const dbAdmin = admin.firestore();
    const leadRef = dbAdmin.collection('leads').doc(leadId);
    const leadSnap = await leadRef.get();

    if (!leadSnap.exists) {
      return { success: false, error: 'Lead não encontrado.' };
    }

    const leadData = leadSnap.data();
    if (!leadData) {
      return { success: false, error: 'Dados do lead inválidos.' };
    }

    const auditedLoss = Number(leadData.auditedLoss) || 0;
    const nichoSlug = leadData.nichoSlug || '';
    const revenue = leadData.revenue || '';

    // 1. Resolução do Vazamento Mensal
    const monthlyLoss = (() => {
      if (auditedLoss > 0) {
        return auditedLoss;
      }
      const baselines: Record<string, number> = {
        'faturamento-saude-bemestar': 12400,
        'commerce-omnichannel-vendas': 18900,
        'operacoes-urgencia-logistica': 22500,
        'bpo-financeiro-credito-tem': 28200,
        'servicos-tecnicos-comerciais': 14700,
      };
      const base = baselines[nichoSlug] || 16500;

      // Multiplicador por Receita
      const rev = revenue.toLowerCase();
      if (rev === 'enterprise' || rev.includes('enterprise') || rev.includes('acima') || rev.includes('2m') || rev.includes('2 milhões')) {
        return base * 2.5;
      }
      if (rev === 'poc' || rev.includes('poc') || rev.includes('até 100k') || rev.includes('inicial')) {
        return base * 0.5;
      }
      return base;
    })();

    // 2. Módulos ativos e Precificação Modular Dinâmica
    const activeModules = modulesStr ? modulesStr.split(',').filter(Boolean) : ['piloto', 'resgate', 'backoffice'];
    
    // Obter o nicho para buscar a volumetria de leads
    const niche = nichoSlug ? getNicheBySlug(nichoSlug) : null;
    const leadsCount = niche?.financialMetrics?.leadsPerMonth || 300;
    
    const infraBase = calculateInfraBase(leadsCount, nichoSlug || undefined);
    const modulesCost = activeModules.length * 350;
    const monthlyLicense = infraBase + modulesCost;
    const setupPrice = activeModules.length * 1500; // R$ 1.500 por módulo ativo

    if (setupPrice <= 5000) {
      // Gerar PIX Imediato simulado
      const transactionId = `MP-${Math.floor(Math.random() * 1000000000)}`;
      const pixKey = "financeiro@sinergia.ai";
      const priceStr = setupPrice.toFixed(2);
      const priceLenStr = String(priceStr.length).padStart(2, '0');
      // Pix EMV string formatada
      const pixString = `00020126580014br.gov.bcb.pix0136${pixKey}52040000530398654${priceLenStr}${priceStr}5802BR5911SinergIA OS6009Sao Paulo62070503***6304E5D4`;

      await leadRef.update({
        planId: 'modular_infrastructure',
        contractValue: setupPrice,
        monthlyLicense: monthlyLicense,
        activeModules: activeModules,
        billing_status: 'pending',
        transactionId: transactionId,
        updatedAt: new Date().toISOString()
      });

      return {
        success: true,
        type: 'pix',
        pixPayload: {
          qr_code: pixString,
          qr_code_base64: "iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAQMAAAAGz+h2AAAABlBMVEX///8AAABVwtN+AAABkklEQVRIjWNgQAL/IQZ/IP7/AwoQ7oAQ/Bf8j3/A/wQG2EA/hEEA2EEB/wH/EwzQQD+EAQYAA2AAgA==",
          id: transactionId,
          price: setupPrice
        },
        setupPrice,
        monthlyLoss
      };
    } else {
      // Booking Concierge para setups corporativos
      await leadRef.update({
        planId: 'modular_infrastructure',
        contractValue: setupPrice,
        monthlyLicense: monthlyLicense,
        activeModules: activeModules,
        billing_status: 'waiting_call',
        status: 'waiting_onboarding_call',
        updatedAt: new Date().toISOString()
      });

      return {
        success: true,
        type: 'booking',
        plan: 'Modular Value Setup',
        price: setupPrice,
        setupPrice,
        monthlyLoss
      };
    }
  } catch (error: any) {
    console.error('Erro na Server Action generatePaymentSession:', error);
    return { success: false, error: error.message || 'Erro interno do servidor.' };
  }
}

export async function bookOnboardingCall(leadId: string, datetime: string) {
  try {
    const dbAdmin = admin.firestore();
    const leadRef = dbAdmin.collection('leads').doc(leadId);
    
    await leadRef.update({
      onboarding_call_slot: datetime,
      status: 'waiting_onboarding_call',
      billing_status: 'waiting_call_scheduled',
      updatedAt: new Date().toISOString()
    });

    const n8nWebhookUrl = process.env.N8N_APPLY_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      const leadSnap = await leadRef.get();
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'onboarding_call_scheduled',
          lead: { id: leadId, ...leadSnap.data() },
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error("Falha ao enviar agendamento ao n8n:", err));
    }

    return { success: true };
  } catch (error: any) {
    console.error('Erro ao agendar onboarding call:', error);
    return { success: false, error: error.message || 'Erro ao agendar horário.' };
  }
}
