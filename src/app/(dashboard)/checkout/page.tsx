import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as admin from 'firebase-admin';
import CheckoutClient from "./CheckoutClient";
import * as fbHelper from '@/lib/firebase-admin-helper';

async function getLeadFromSession() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('sinergia_session')?.value;
  
  if (!sessionCookie) return null;

  try {
    return await fbHelper.getLeadFromSession(sessionCookie);
  } catch (err) {
    console.error("Erro ao carregar sessão de lead no Checkout:", err);
    return null;
  }
}

export default async function CheckoutPage({ searchParams }: { searchParams?: { niche?: string, blueprint?: string, slots?: string, setup?: string, modules?: string } }) {
  const lead = await getLeadFromSession();

  if (!lead) {
    redirect('/apply');
  }

  // Se já for cliente ativo, vai direto para o dashboard
  if (lead.status === 'active_client' || lead.status === 'CLOSED') {
    redirect('/app/client');
  }

  return <CheckoutClient lead={lead} searchParams={searchParams} />;
}
