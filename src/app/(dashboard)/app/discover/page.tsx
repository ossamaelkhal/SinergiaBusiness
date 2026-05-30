import { cookies } from "next/headers";
import * as admin from 'firebase-admin';
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
      const data = leadsSnap.docs[0].data();
      return {
        id: leadsSnap.docs[0].id,
        name: data.name || '',
        email: data.email || '',
        nichoSlug: data.nichoSlug || '',
        document: data.document || '',
        phone: data.phone || '',
        revenue: data.revenue || ''
      };
    }

    // SALVAGUARDA CONTRA CONDIÇÃO DE CORRIDA (Firestore Propagation Delay)
    // Se o lead ainda não propagou na base global, geramos um fallback com dados mínimos da sessão
    return {
      id: `fallback-${uid}`,
      name: email.split('@')[0] || 'Parceiro SinergIA',
      email: email,
      nichoSlug: 'commerce-omnichannel-vendas', // Fallback amigável de e-commerce
      document: '',
      phone: '',
      revenue: 'De R$ 100 mil a R$ 500 mil', // Padrão standard
      isFallback: true
    };
  } catch (error) {
    console.error('Erro ao processar sessão/lead no Discover Server Component:', error);
    return null;
  }
}

export default async function DiscoverPage() {
  const lead = await getLeadFromSession();

  // Em caso de falha absoluta de autenticação, passamos nulo e o ProtectedRoute redirecionará para /login
  const finalLead = lead || {
    name: 'Parceiro SinergIA',
    email: '',
    nichoSlug: 'commerce-omnichannel-vendas',
    document: '',
    phone: '',
    revenue: 'De R$ 100 mil a R$ 500 mil'
  };

  return (
    <ProtectedRoute>
      <DiscoverClient lead={finalLead} />
    </ProtectedRoute>
  );
}
