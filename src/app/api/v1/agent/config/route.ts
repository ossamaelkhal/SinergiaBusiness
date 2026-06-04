import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { nichesData } from '@/data/niches';

export const dynamic = 'force-dynamic';

// Inicializar o Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK no API Config route:', error);
  }
}

export async function GET(req: Request) {
  try {
    // 1. Validação de Token
    const token = req.headers.get('x-sinergia-token') || req.headers.get('X-Sinergia-Token');
    const expectedToken = process.env.AGENT_API_SECRET || 'sinergia_core_connect_secret_2026';

    if (token !== expectedToken) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    // 2. Filtro de Empresa / Email
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId');
    const email = searchParams.get('email');

    if (!companyId && !email) {
      return NextResponse.json({ error: 'Falta parâmetro companyId ou email na query string.' }, { status: 400 });
    }

    const dbAdmin = admin.firestore();
    let leadDoc: admin.firestore.DocumentSnapshot | null = null;

    if (companyId) {
      // Tenta carregar pelo ID direto do documento
      const docRef = dbAdmin.collection('leads').doc(companyId);
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        leadDoc = docSnap;
      } else {
        // Busca onde companyId == companyId
        const qSnap = await dbAdmin.collection('leads').where('companyId', '==', companyId).limit(1).get();
        if (!qSnap.empty) {
          leadDoc = qSnap.docs[0];
        }
      }
    } else if (email) {
      // Busca pelo email
      const qSnap = await dbAdmin.collection('leads')
        .where('email', '==', email)
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();
      if (!qSnap.empty) {
        leadDoc = qSnap.docs[0];
      }
    }

    if (!leadDoc || !leadDoc.exists) {
      return NextResponse.json({ error: 'Empresa/Lead não encontrado.' }, { status: 404 });
    }

    const data = leadDoc.data();
    if (!data) {
      return NextResponse.json({ error: 'Documento vazio.' }, { status: 404 });
    }

    const nichoSlug = data.nichoSlug || '';
    const tone = data.preferences?.tone || data.tone || 'casual';
    const objective = data.preferences?.objective || data.objective || 'BANT';
    const niche = data.preferences?.niche || data.niche || 'Outro';

    const integration_keys = data.integration_keys || {};
    const knowledge_base = data.knowledge_base || [];
    const raw_text_context = data.raw_text_context || '';

    // 3. Obter dados base do nicho
    const nicheInfo = nichesData[nichoSlug];

    // 4. Compilar as diretrizes de tom de voz
    let toneRules = '';
    if (tone === 'formal') {
      toneRules = 'Tom de voz: C-Level / Formal. Suas respostas devem ser curtas, corteses, diretas e extremamente profissionais. Evite jargões infantis, gírias ou emojis desnecessários.';
    } else if (tone === 'casual') {
      toneRules = 'Tom de voz: Consultivo / Casual. Use emojis com moderação, gere empatia e construa rapports rápidos. Comporte-se como um vendedor carismático e atencioso do WhatsApp.';
    } else if (tone === 'aggressive' || tone === 'agressive') {
      toneRules = 'Tom de voz: Closer Agressivo. Foco total em conversão rápida. Seja incisivo, contorne objeções com firmeza e direcione o cliente imediatamente para agendar uma reunião ou efetuar o pagamento.';
    } else {
      toneRules = `Tom de voz: Personalizado (${tone}). Siga uma linha de comunicação adequada ao público-alvo.`;
    }

    // 5. Compilar as diretrizes de objetivos estratégicos
    let objectiveRules = '';
    if (objective === 'BANT') {
      objectiveRules = 'Métrica e Objetivo Primário: Qualificação BANT Extremamente Rigorosa. Descubra de forma polida, porém assertiva: Orçamento (Budget), Autoridade de decisão (Authority), Necessidade real (Need) e Cronograma de contratação (Timeline) antes de avançar.';
    } else if (objective === 'CALENDAR') {
      objectiveRules = 'Métrica e Objetivo Primário: Agendar o máximo de reuniões (Volume). Direcione ativamente a conversa para preencher a agenda e travar slots com nossos consultores técnicos.';
    } else if (objective === 'FAQ') {
      objectiveRules = 'Métrica e Objetivo Primário: Responder dúvidas frequentes e reduzir tickets de suporte. Foco em fornecer informações úteis baseadas no conhecimento e sanar problemas operacionais.';
    } else {
      objectiveRules = `Objetivo estratégico: ${objective}.`;
    }

    // 6. Construir prompt compilado mestre
    let compiled_system_prompt = `Você é o agente inteligente oficial da empresa "${data.name || 'SinergIA Client'}".
Setor de Atuação: ${nicheInfo?.title || niche || 'Geral'}.
Descrição do Negócio: ${nicheInfo?.description || ''}

${toneRules}

${objectiveRules}

Diretrizes Adicionais do Agente:
${nicheInfo?.hooks?.pilotoAutomatico?.description || ''}`;

    if (raw_text_context) {
      compiled_system_prompt += `\n\nBase de Conhecimento Específica da Empresa (Use com prioridade máxima para responder dúvidas): ${raw_text_context}`;
    }

    // 7. Retornar JSON formatado
    return NextResponse.json({
      success: true,
      companyId: data.companyId || leadDoc.id,
      lead: {
        id: leadDoc.id,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        nichoSlug,
        status: data.status || ''
      },
      preferences: {
        niche,
        tone,
        objective
      },
      playbook: {
        nicheTitle: nicheInfo?.title || niche || '',
        shortTitle: nicheInfo?.shortTitle || '',
        toneRules,
        objectiveRules,
        activeAgent: nicheInfo?.hooks?.pilotoAutomatico || null
      },
      credentials: {
        whatsapp_api_url: integration_keys.whatsapp_api_url || '',
        whatsapp_access_token: integration_keys.whatsapp_access_token || '',
        crm_api_token: integration_keys.crm_api_token || ''
      },
      files: knowledge_base,
      compiled_system_prompt
    });

  } catch (error: any) {
    console.error('Erro na rota GET /api/v1/agent/config:', error);
    return NextResponse.json({ error: error.message || 'Erro interno no servidor.' }, { status: 500 });
  }
}
