import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as fbHelper from '@/lib/firebase-admin-helper';
import ClientDashboard from "./ClientDashboard";

export default async function ClientPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('sinergia_session')?.value;

  if (!sessionCookie) {
    redirect('/login');
  }

  // Obter o lead de forma segura com suporte a mock e real
  const lead = await fbHelper.getLeadFromSession(sessionCookie);

  if (!lead) {
    redirect('/login');
  }

  // BLOQUEIO SEGURO DE ATIVAÇÃO
  // Se o usuário não for do grupo dev mock E o status for diferente de 'active_client' ou 'CLOSED', redirect imediato
  const isDevMock = sessionCookie.includes('mock') || lead.email === 'mock-admin@sinergia.business';
  const isActive = lead.status === 'active_client' || lead.status === 'CLOSED' || lead.status === 'prospect_vip';

  if (!isDevMock && !isActive) {
    redirect('/app/discover');
  }

  // Prepara o objeto Lead mapeando todas as propriedades necessárias para o Dashboard
  const mappedLead = {
    id: lead.id,
    companyId: lead.companyId || lead.id || 'mock-company-id',
    name: lead.name || '',
    email: lead.email || '',
    nichoSlug: lead.nichoSlug || '',
    document: lead.document || '',
    phone: lead.phone || '',
    revenue: lead.revenue || '',
    status: lead.status || '',
    blueprintId: lead.blueprintId || lead.preferences?.blueprintId || '',
    malhas: lead.malhas || lead.preferences?.malhas || [],
    stackLevel: lead.stackLevel || lead.preferences?.stackLevel || 1
  };

  return <ClientDashboard lead={mappedLead} />;
}
