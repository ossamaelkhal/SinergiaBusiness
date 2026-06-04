import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as admin from 'firebase-admin';
import ClientDashboard from "./ClientDashboard";

// Inicializar o Firebase Admin SDK no escopo do servidor
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK no Client Dashboard:', error);
  }
}

export default async function ClientPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('sinergia_session')?.value;

  if (!sessionCookie) {
    redirect('/login');
  }

  let uid = '';
  let email = '';

  try {
    // Decodificar o Session Cookie com suporte a mocks de desenvolvimento
    if (sessionCookie.startsWith('mock-session-cookie-fallback-')) {
      const token = sessionCookie.replace('mock-session-cookie-fallback-', '');
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        uid = decoded.uid;
        email = decoded.email || '';
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
      email = decodedClaims.email || '';
    }
  } catch (error) {
    console.error('Falha criptográfica de autenticação no Client Dashboard:', error);
    redirect('/login');
  }

  if (!email) {
    redirect('/login');
  }

  const dbAdmin = admin.firestore();
  
  // Buscar o lead mais recente associado a este e-mail no Firestore
  const leadsSnap = await dbAdmin.collection('leads')
    .where('email', '==', email)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  let lead = null;
  const isDevMock = uid === 'mock-uid-123456' || email === 'mock-admin@sinergia.business';

  if (!leadsSnap.empty) {
    const doc = leadsSnap.docs[0];
    const data = doc.data();
    lead = {
      id: doc.id,
      companyId: data.companyId || doc.id, // Fallback para ID do lead
      name: data.name || '',
      email: data.email || '',
      nichoSlug: data.nichoSlug || '',
      document: data.document || '',
      phone: data.phone || '',
      revenue: data.revenue || '',
      status: data.status || ''
    };
  } else if (isDevMock) {
    lead = {
      id: 'mock-lead-id-123',
      companyId: 'mock-company-id-123',
      name: 'Cliente Mock Admin',
      email: email,
      nichoSlug: 'commerce-omnichannel-vendas',
      document: '00.000.000/0001-00',
      phone: '11999999999',
      revenue: 'De R$ 100 mil a R$ 500 mil',
      status: 'active_client'
    };
  }

  if (!lead) {
    redirect('/login');
  }

  // BLOQUEIO SEGURO DE ATIVAÇÃO
  // Se o usuário não for do grupo dev mock E o status for diferente de 'active_client' ou 'CLOSED', redirect imediato
  const isActive = lead.status === 'active_client' || lead.status === 'CLOSED';

  if (!isDevMock && !isActive) {
    redirect('/app/discover');
  }

  return <ClientDashboard lead={lead} />;
}
