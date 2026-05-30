import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

export const dynamic = 'force-dynamic';

// Inicializar o Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK no API Telemetry route:', error);
  }
}

export async function POST(req: Request) {
  try {
    // 1. Validação de Token
    const token = req.headers.get('x-sinergia-token') || req.headers.get('X-Sinergia-Token');
    const expectedToken = process.env.AGENT_API_SECRET || 'sinergia_core_connect_secret_2026';

    if (token !== expectedToken) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    // 2. Parsing do Payload
    const body = await req.json();
    const { companyId, agentName, action, status, tokensConsumed = 0 } = body;

    if (!companyId || !agentName || !action || !status) {
      return NextResponse.json({ error: 'Parâmetros obrigatórios ausentes: companyId, agentName, action, status.' }, { status: 400 });
    }

    const dbAdmin = admin.firestore();

    // 3. Gravação de Logs de Operação
    const logData = {
      companyId,
      agentName,
      action,
      status,
      tokensConsumed: Number(tokensConsumed),
      createdAt: new Date().toISOString()
    };
    await dbAdmin.collection('operation_logs').add(logData);

    // 4. Contabilidade Atômica de Recursos com Inicialização Segura
    let leadRef = dbAdmin.collection('leads').doc(companyId);
    let leadSnap = await leadRef.get();

    if (!leadSnap.exists) {
      // Tenta buscar onde o campo companyId seja igual a companyId
      const qSnap = await dbAdmin.collection('leads').where('companyId', '==', companyId).limit(1).get();
      if (!qSnap.empty) {
        leadRef = qSnap.docs[0].ref;
        leadSnap = qSnap.docs[0];
      }
    }

    if (leadSnap.exists) {
      const data = leadSnap.data() || {};
      const isWhatsApp = agentName.toLowerCase().includes('whatsapp') || 
                         action.toLowerCase().includes('whatsapp') || 
                         action.toLowerCase().includes('whats');

      const incrementTokens = Number(tokensConsumed);

      if (!data.resources) {
        // Inicializa o nó de resources de forma segura com os valores iniciais da telemetria
        await leadRef.update({
          resources: {
            llm_tokens: { used: incrementTokens, limit: 1000000 },
            n8n_workflows: { used: 1, limit: 50000 },
            whatsapp_credits: { used: isWhatsApp ? 1 : 0, limit: 5000 }
          },
          updatedAt: new Date().toISOString()
        });
      } else {
        // Se o nó de resources já existe, faz o incremento atômico
        const updateData: any = {};
        updateData['resources.llm_tokens.used'] = admin.firestore.FieldValue.increment(incrementTokens);
        updateData['resources.n8n_workflows.used'] = admin.firestore.FieldValue.increment(1);
        if (isWhatsApp) {
          updateData['resources.whatsapp_credits.used'] = admin.firestore.FieldValue.increment(1);
        }
        updateData.updatedAt = new Date().toISOString();
        await leadRef.update(updateData);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Telemetria ingerida e recursos computados com sucesso.'
    });

  } catch (error: any) {
    console.error('Erro na rota POST /api/v1/agent/telemetry:', error);
    return NextResponse.json({ error: error.message || 'Erro interno no servidor.' }, { status: 500 });
  }
}
