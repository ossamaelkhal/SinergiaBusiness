import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as admin from 'firebase-admin';
import CheckoutClient from "./CheckoutClient";

// Inicializar o Firebase Admin SDK no escopo do servidor
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK no Checkout Server Component:', error);
  }
}

async function getLeadFromSession() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('sinergia_session')?.value;
  
  if (!sessionCookie) return null;

  try {
    let email: string | null = null;

    // Decodificar o Session Cookie com suporte a mocks de desenvolvimento
    if (sessionCookie.startsWith('mock-session-cookie-fallback-')) {
      const token = sessionCookie.replace('mock-session-cookie-fallback-', '');
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        email = decoded.email || null;
      } catch {
        if (token.startsWith('mock-uid-')) {
          email = 'mock-user@example.com';
        }
      }
    } else if (sessionCookie.startsWith('mock-session-cookie-')) {
      const token = sessionCookie.replace('mock-session-cookie-', '');
      if (token === 'mock-token') {
        email = 'mock-admin@sinergia.business';
      } else if (token.startsWith('mock-uid-')) {
        email = 'mock-user@example.com';
      }
    } else {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
      email = decodedClaims.email || null;
    }

    if (!email) return null;

    const dbAdmin = admin.firestore();
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
        name: data.name || '',
        email: data.email || '',
        nichoSlug: data.nichoSlug || '',
        document: data.document || '',
        phone: data.phone || '',
        revenue: data.revenue || '',
        status: data.status || '',
      };
    }
    return null;
  } catch (err) {
    console.error("Erro ao carregar sessão de lead no Checkout:", err);
    return null;
  }
}

interface PageProps {
  searchParams: {
    plan?: string
  }
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const lead = await getLeadFromSession();

  if (!lead) {
    redirect('/apply');
  }

  // Se já for cliente ativo, vai direto para o dashboard
  if (lead.status === 'active_client' || lead.status === 'CLOSED') {
    redirect('/app/client');
  }

  const urlPlan = searchParams.plan;
  const getActivePlan = (): 'playbooks' | 'setup' | 'enterprise' => {
    if (urlPlan === 'playbooks' || urlPlan === 'setup' || urlPlan === 'enterprise') {
      return urlPlan;
    }
    
    // Fallback: Mapeamento de receita
    const rev = (lead.revenue || '').toLowerCase();
    if (rev.includes('acima') || rev.includes('2 milhões') || rev.includes('2m')) {
      return 'enterprise';
    }
    if (rev.includes('500 mil') || rev.includes('100 mil a')) {
      return 'setup'; // Standard
    }
    return 'playbooks'; // PoC
  };

  const activePlan = getActivePlan();

  return <CheckoutClient lead={lead} planId={activePlan} />;
}
