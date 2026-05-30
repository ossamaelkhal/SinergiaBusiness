"use server"

import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export interface ApplyInput {
  name: string;
  email: string;
  phone: string;
  revenue: string;
  teamSize: string;
  bottleneck: string;
  referrerId?: string;
  domain?: string;
}

export async function submitApplication(data: ApplyInput) {
  try {
    const { name, email, phone, revenue, teamSize, bottleneck, referrerId, domain } = data;

    if (!email || !name) {
      return { success: false, error: 'Dados incompletos para processamento.' };
    }

    // 1. Salvar no Firestore (Coleção: applications)
    let docId = '';
    try {
      const docRef = await addDoc(collection(db, 'applications'), {
        name,
        email,
        phone,
        revenue,
        teamSize,
        bottleneck,
        domain: domain || null,
        referrerId: referrerId || null,
        createdAt: new Date().toISOString(),
        status: 'NEW'
      });
      docId = docRef.id;
    } catch (dbErr) {
      console.error("Falha ao persistir aplicação no Firestore:", dbErr);
      return { success: false, error: 'Erro de banco de dados ao salvar a aplicação.' };
    }

    // 2. Disparar Webhook do n8n de forma assíncrona (não-bloqueante)
    const N8N_APPLY_WEBHOOK = process.env.N8N_APPLY_WEBHOOK_URL;

    if (N8N_APPLY_WEBHOOK) {
      // Disparo em background sem 'await' para retornar resposta imediata ao usuário
      fetch(N8N_APPLY_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'process_highticket_application',
          lead: {
            id: docId,
            name,
            email,
            phone,
            revenue,
            teamSize,
            bottleneck,
            domain: domain || null,
            referrerId: referrerId || null
          },
          timestamp: new Date().toISOString()
        }),
      }).catch(err => console.error("Falha ao enviar dados para orquestrador n8n:", err));
    } else {
      console.warn("Aviso: N8N_APPLY_WEBHOOK_URL não configurado no ambiente");
    }

    return { success: true, docId };
  } catch (error) {
    console.error("Erro interno na Server Action submitApplication:", error);
    return { success: false, error: 'Erro interno do servidor ao processar formulário.' };
  }
}
