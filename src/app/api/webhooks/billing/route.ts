import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK no API Billing Webhook:', error);
  }
}

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token') || req.headers.get('x-webhook-token');
    const expectedSecret = process.env.BILLING_WEBHOOK_SECRET || 'sinergia_billing_secret_2026';

    if (token !== expectedSecret) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const body = await req.json();
    
    // Suporte a payloads de notificação do gateway contendo:
    // { leadId: string, status: 'approved' | 'paid' | 'succeeded', transactionId?: string }
    const { leadId, status, transactionId } = body;

    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID ausente.' }, { status: 400 });
    }

    const dbAdmin = admin.firestore();
    const leadRef = dbAdmin.collection('leads').doc(leadId);
    const leadSnap = await leadRef.get();

    if (!leadSnap.exists) {
      return NextResponse.json({ error: 'Lead não encontrado.' }, { status: 404 });
    }

    if (status === 'approved' || status === 'paid' || status === 'succeeded') {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 365);

      // Promover lead a active_client e inicializar cota de recursos
      await leadRef.update({
        status: 'active_client',
        billing_status: 'paid',
        license_expires_at: expirationDate.toISOString(),
        payment_transaction_id: transactionId || body.id || '',
        updatedAt: new Date().toISOString(),
        
        // Inicializar cotas mensais de recursos
        resources: {
          llm_tokens: { used: 0, limit: 1000000 },
          n8n_workflows: { used: 0, limit: 50000 },
          whatsapp_credits: { used: 0, limit: 5000 }
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Licença ativada com sucesso no Firestore.',
        leadId
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Notificação processada sem alterações na licença.',
      status
    });

  } catch (error: any) {
    console.error('Erro no route handler de webhooks/billing:', error);
    return NextResponse.json({ error: error.message || 'Erro interno no servidor.' }, { status: 500 });
  }
}
