"use server"

import * as admin from 'firebase-admin'
import { revalidatePath } from 'next/cache'
import { getNicheBySlug } from '@/data/niches'
import { calculateInfraBase, calculateSinergiaOSPricing } from '@/lib/utils'
import * as fbHelper from '@/lib/firebase-admin-helper'

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

export async function generatePaymentSession(leadId: string): Promise<PaymentSessionResponse> {
  try {
    if (!leadId) {
      return { success: false, error: 'Lead ID é obrigatório.' };
    }

    const leadData = await fbHelper.getLeadById(leadId);
    if (!leadData) {
      return { success: false, error: 'Lead não encontrado.' };
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

    // 2. Slots de Agentes e Complexidade de Stack salvos no Firestore
    const niche = nichoSlug ? getNicheBySlug(nichoSlug) : null;
    const defaultMalhas = niche?.operationalDNA?.activeFlowNetworks || ['Intercepção e Resgate 24/7'];
    
    // Ler preferências salvos no Firestore
    const malhas = Array.isArray(leadData.malhas) && leadData.malhas.length > 0 
      ? leadData.malhas 
      : defaultMalhas;
      
    const activeSlotsCount = malhas.length;
    const stackLevel = Number(leadData.stackLevel) || 1;

    // 3. Faturamento institucional no servidor
    const { platformFee, slotsFee, setupFee, monthlyTotal } = calculateSinergiaOSPricing(activeSlotsCount, stackLevel);
    const monthlyLicense = monthlyTotal;
    const setupPrice = setupFee;

    if (setupPrice <= 12000) {
      // Gerar PIX Imediato simulado
      const transactionId = `MP-${Math.floor(Math.random() * 1000000000)}`;
      const pixKey = "financeiro@sinergia.ai";
      const priceStr = setupPrice.toFixed(2);
      const priceLenStr = String(priceStr.length).padStart(2, '0');
      // Pix EMV string formatada
      const pixString = `00020126580014br.gov.bcb.pix0136${pixKey}52040000530398654${priceLenStr}${priceStr}5802BR5911SinergIA OS6009Sao Paulo62070503***6304E5D4`;

      await fbHelper.updateLeadBilling(leadId, {
        planId: 'sinergia_os_core',
        contractValue: setupPrice,
        setupEngineeringFee: setupPrice,
        monthlyLicense: monthlyLicense,
        activeSlotsCount: activeSlotsCount,
        activeFlowNetworks: malhas,
        blueprintId: leadData.blueprintId || 'agenda-guardian',
        invertedGuarantee30Days: true,
        billing_status: 'pending',
        transactionId: transactionId,
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
      await fbHelper.updateLeadBilling(leadId, {
        planId: 'sinergia_os_core',
        contractValue: setupPrice,
        setupEngineeringFee: setupPrice,
        monthlyLicense: monthlyLicense,
        activeSlotsCount: activeSlotsCount,
        activeFlowNetworks: malhas,
        blueprintId: leadData.blueprintId || 'agenda-guardian',
        invertedGuarantee30Days: true,
        billing_status: 'waiting_call',
        status: 'waiting_onboarding_call',
      });

      return {
        success: true,
        type: 'booking',
        plan: 'SinergIA OS Core setup',
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
    await fbHelper.updateLeadBilling(leadId, {
      onboarding_call_slot: datetime,
      status: 'waiting_onboarding_call',
      billing_status: 'waiting_call_scheduled',
    });

    const n8nWebhookUrl = process.env.N8N_APPLY_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      const leadData = await fbHelper.getLeadById(leadId);
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'onboarding_call_scheduled',
          lead: { id: leadId, ...leadData },
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

export async function simulatePixPaymentSuccess(leadId: string) {
  try {
    await fbHelper.updateLeadBilling(leadId, {
      billing_status: 'paid',
      status: 'active_client',
      payment_completed_at: new Date().toISOString()
    });
    revalidatePath('/checkout');
    revalidatePath('/app/client');
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao simular pagamento Pix:', error);
    return { success: false, error: error.message || 'Erro ao simular pagamento.' };
  }
}
