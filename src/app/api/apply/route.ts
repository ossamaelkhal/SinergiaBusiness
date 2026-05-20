import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { revenue, teamSize, bottleneck, name, email, phone } = data;

    if (!email || !name) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // 1. Salvar no Firestore (Coleção: applications)
    try {
      await addDoc(collection(db, 'applications'), {
        name,
        email,
        phone,
        revenue,
        teamSize,
        bottleneck,
        createdAt: serverTimestamp(),
        status: 'NEW'
      });
    } catch (dbErr) {
      console.error("Falha ao persistir aplicação no Firestore:", dbErr);
      // Continuamos a execução para tentar disparar o webhook mesmo se o DB falhar temporariamente
    }

    // 2. Disparar Webhook do Orquestrador (Make/n8n) se configurado
    const N8N_APPLY_WEBHOOK = process.env.N8N_APPLY_WEBHOOK_URL;

    if (N8N_APPLY_WEBHOOK) {
      fetch(N8N_APPLY_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'process_highticket_application',
          lead: {
            name,
            email,
            phone,
            revenue,
            teamSize,
            bottleneck
          },
          timestamp: new Date().toISOString()
        }),
      }).catch(err => console.error("Falha ao enviar aplicação para orquestrador:", err));
    } else {
      console.warn("Aviso: N8N_APPLY_WEBHOOK_URL não configurado no ambiente");
    }

    return NextResponse.json({ 
      status: 'success', 
      message: 'Aplicação recebida e processada com sucesso.' 
    });

  } catch (error) {
    console.error("Erro na rota /api/apply:", error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
