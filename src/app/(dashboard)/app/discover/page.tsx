import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as admin from 'firebase-admin';
import DiscoverClient from "./DiscoverClient";

// Inicializar o Firebase Admin SDK no escopo do servidor
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK no DiscoverPage:', error);
  }
}

export const metadata = {
  title: "Sala de Descoberta | SinergIA",
  description: "Seu motor de aquisição está quase pronto.",
};

export default async function DiscoverPage() {
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
    console.error('Falha criptográfica de autenticação no Discover Page:', error);
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

  let finalLead = null;

  if (!leadsSnap.empty) {
    const data = leadsSnap.docs[0].data();
    finalLead = {
      id: leadsSnap.docs[0].id,
      name: data.name || '',
      email: data.email || '',
      nichoSlug: data.nichoSlug || '',
      document: data.document || '',
      phone: data.phone || '',
      revenue: data.revenue || ''
    };
  } else {
    // SALVAGUARDA CONTRA CONDIÇÃO DE CORRIDA (Firestore Propagation Delay)
    // Se o lead ainda não propagou na base global, geramos um fallback com dados mínimos da sessão
    finalLead = {
      id: `fallback-${uid}`,
      name: email.split('@')[0] || 'Parceiro SinergIA',
      email: email,
      nichoSlug: 'commerce-omnichannel-vendas', // Fallback amigável de e-commerce
      document: '',
      phone: '',
      revenue: 'De R$ 100 mil a R$ 500 mil', // Padrão standard
      isFallback: true
    };
  }

  return <DiscoverClient lead={finalLead} />;
}
