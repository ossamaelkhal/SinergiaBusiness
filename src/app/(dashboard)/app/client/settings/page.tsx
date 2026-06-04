import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as admin from 'firebase-admin';
import SettingsClient from "./SettingsClient";

export const dynamic = 'force-dynamic';

// Inicializar o Firebase Admin SDK no escopo do servidor
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK no Client Settings:', error);
  }
}

async function getLeadFromSession() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('sinergia_session')?.value;
  
  if (!sessionCookie) return null;

  try {
    let uid: string | null = null;
    let email: string | null = null;

    // Decodificar o Session Cookie com suporte a mocks de desenvolvimento
    if (sessionCookie.startsWith('mock-session-cookie-fallback-')) {
      const token = sessionCookie.replace('mock-session-cookie-fallback-', '');
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        uid = decoded.uid;
        email = decoded.email || null;
      } catch {
        if (token.startsWith('mock-uid-')) {
          uid = token;
          email = 'mock-user@example.com';
        }
      }
    } else if (sessionCookie.startsWith('mock-session-cookie-')) {
      const token = sessionCookie.replace('mock-session-cookie-', '');
      if (token === 'mock-token') {
        uid = 'mock-uid-123456';
        email = 'mock-admin@sinergia.business';
      } else if (token.startsWith('mock-uid-')) {
        uid = token;
        email = 'mock-user@example.com';
      }
    } else {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
      uid = decodedClaims.uid;
      email = decodedClaims.email || null;
    }

    if (!email) return null;

    const dbAdmin = admin.firestore();
    
    // Buscar o lead mais recente associado a este e-mail no Firestore
    const leadsSnap = await dbAdmin.collection('leads')
      .where('email', '==', email)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (!leadsSnap.empty) {
      const doc = leadsSnap.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        companyId: data.companyId || doc.id, // Fallback para ID do lead
        name: data.name || '',
        email: data.email || '',
        nichoSlug: data.nichoSlug || '',
        document: data.document || '',
        phone: data.phone || '',
        revenue: data.revenue || '',
        status: data.status || '',
        integration_keys: data.integration_keys || {
          whatsapp_api_url: '',
          whatsapp_access_token: '',
          crm_api_token: ''
        },
        knowledge_base: data.knowledge_base || [],
        raw_text_context: data.raw_text_context || '',
        uid: uid
      };
    }

    // Se for o mock admin dev, geramos um fallback com status de cliente ativo para testes
    if (uid === 'mock-uid-123456' || email === 'mock-admin@sinergia.business') {
      return {
        id: 'mock-lead-id-123',
        companyId: 'mock-company-id-123',
        name: 'Cliente Mock Admin',
        email: email,
        nichoSlug: 'commerce-omnichannel-vendas',
        document: '00.000.000/0001-00',
        phone: '11999999999',
        revenue: 'De R$ 100 mil a R$ 500 mil',
        status: 'active_client',
        integration_keys: {
          whatsapp_api_url: '',
          whatsapp_access_token: '',
          crm_api_token: ''
        },
        knowledge_base: [],
        raw_text_context: '',
        uid: uid
      };
    }

    return null;
  } catch (error) {
    console.error('Erro ao processar sessão no Client Settings Server Component:', error);
    return null;
  }
}

export default async function ClientSettingsPage() {
  const lead = await getLeadFromSession();

  if (!lead) {
    redirect('/login');
  }

  // Bloqueio seguro de ativação
  const isDevMock = lead.uid === 'mock-uid-123456' || lead.email === 'mock-admin@sinergia.business';
  const isActive = lead.status === 'active_client' || lead.status === 'CLOSED';

  if (!isDevMock && !isActive) {
    redirect('/app/discover');
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <SettingsClient lead={lead} />
      </div>
    </div>
  );
}
