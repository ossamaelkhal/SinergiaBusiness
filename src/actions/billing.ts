"use server"

import * as admin from 'firebase-admin'
import { revalidatePath } from 'next/cache'

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
}

export async function generatePaymentSession(leadId: string, planId: string): Promise<PaymentSessionResponse> {
  try {
    if (!leadId || !planId) {
      return { success: false, error: 'Lead ID e Plan ID são obrigatórios.' };
    }

    const dbAdmin = admin.firestore();
    const leadRef = dbAdmin.collection('leads').doc(leadId);
    const leadSnap = await leadRef.get();

    if (!leadSnap.exists) {
      return { success: false, error: 'Lead não encontrado.' };
    }

    if (planId === 'playbooks') {
      // Plano PoC R$ 997: Gerar PIX Imediato simulado
      const transactionId = `MP-${Math.floor(Math.random() * 1000000000)}`;
      const pixKey = "financeiro@sinergia.ai";
      const pixString = `00020126580014br.gov.bcb.pix0136${pixKey}5204000053039865406997.005802BR5911SinergIA OS6009Sao Paulo62070503***6304E5D4`;
      
      await leadRef.update({
        planId: 'playbooks',
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
          price: 997.00
        }
      };
    } else {
      // Plano Standard (R$ 15k) ou Enterprise (R$ 50k)
      const labelPlan = planId === 'enterprise' ? 'Enterprise' : 'Standard';
      const price = planId === 'enterprise' ? 50000.00 : 15000.00;

      await leadRef.update({
        planId: planId,
        billing_status: 'waiting_call',
        status: 'waiting_onboarding_call',
        updatedAt: new Date().toISOString()
      });

      return {
        success: true,
        type: 'booking',
        plan: labelPlan,
        price: price
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
