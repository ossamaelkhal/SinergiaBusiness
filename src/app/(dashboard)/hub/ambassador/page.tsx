import { redirect } from 'next/navigation';
import { verifyPartnerSession } from '@/actions/withdrawals';
import * as admin from 'firebase-admin';
import { AmbassadorClient } from './AmbassadorClient';

export const dynamic = 'force-dynamic';

if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK no hub/page.tsx:', error);
  }
}

export const metadata = {
  title: "SinergIA | Hub de Embaixadores",
  description: "Gerencie suas indicações, links parametrizados e comissões da SinergIA.",
};

export default async function AmbassadorHubPage() {
  const partnerUid = await verifyPartnerSession();
  if (!partnerUid) {
    redirect('/login');
  }

  const dbAdmin = admin.firestore();

  // 1. Buscar dados do usuário parceiro
  let partnerEmail = '';
  let partnerName = 'Embaixador';
  try {
    const userRecord = await admin.auth().getUser(partnerUid);
    partnerEmail = userRecord.email || '';
    partnerName = userRecord.displayName || partnerEmail.split('@')[0] || 'Embaixador';
  } catch (e) {
    console.error('Erro ao buscar dados do parceiro no Auth:', e);
  }

  // 2. Buscar indicações (leads) do parceiro
  let leads: any[] = [];
  try {
    const leadsSnapshot = await dbAdmin.collection('leads')
      .where('tracking.sinergia_affiliate_id', '==', partnerUid)
      .get();

    leadsSnapshot.forEach(doc => {
      const data = doc.data();
      leads.push({
        id: doc.id,
        name: data.name || 'Sem nome',
        email: data.email || '',
        status: data.status || 'prospect_vip',
        createdAt: data.createdAt || '',
        planId: data.planId || '',
        revenue: data.revenue || ''
      });
    });
  } catch (e) {
    console.error('Erro ao buscar leads do parceiro:', e);
  }

  // 3. Buscar saques do parceiro
  let withdrawals: any[] = [];
  try {
    const withdrawalsSnapshot = await dbAdmin.collection('withdrawals')
      .where('partnerId', '==', partnerUid)
      .get();

    withdrawalsSnapshot.forEach(doc => {
      const data = doc.data();
      let createdAtStr = '';
      if (data.createdAt) {
        if (typeof data.createdAt.toDate === 'function') {
          createdAtStr = data.createdAt.toDate().toISOString();
        } else if (data.createdAt.seconds) {
          createdAtStr = new Date(data.createdAt.seconds * 1000).toISOString();
        } else {
          createdAtStr = String(data.createdAt);
        }
      }
      withdrawals.push({
        id: doc.id,
        amount: data.amount || 0,
        pixKey: data.pixKey || '',
        status: data.status || 'pending',
        createdAt: createdAtStr || data.updatedAt || new Date().toISOString()
      });
    });
  } catch (e) {
    console.error('Erro ao buscar saques do parceiro:', e);
  }

  // 4. Calcular métricas agregadas
  // Leads Capturados (status prospect_vip)
  const leadsCapturadosCount = leads.filter(l => l.status === 'prospect_vip').length;

  // Em Negociação (status qualified, waiting_call, waiting_onboarding_call, NEW, CONTACTED)
  const negociaoStatuses = ['qualified', 'waiting_call', 'waiting_onboarding_call', 'new', 'contacted', 'NEW', 'CONTACTED'];
  const emNegociacaoCount = leads.filter(l => negociaoStatuses.includes(l.status)).length;

  // Licenças Ativadas (status active_client, CLOSED)
  const licencasAtivas = leads.filter(l => l.status === 'active_client' || l.status === 'CLOSED');
  const licencasAtivasCount = licencasAtivas.length;

  // Calcular Comissões Acumuladas
  let totalComissoes = 0;
  licencasAtivas.forEach(l => {
    const planId = l.planId || '';
    const revenue = (l.revenue || '').toLowerCase();
    
    if (planId === 'enterprise' || revenue.includes('enterprise') || revenue.includes('acima') || revenue.includes('2 milhões') || revenue.includes('2m')) {
      totalComissoes += 15000;
    } else if (planId === 'standard' || revenue.includes('standard') || revenue.includes('500 mil') || revenue.includes('100 mil a')) {
      totalComissoes += 4500;
    } else {
      totalComissoes += 300;
    }
  });

  // Calcular Saques Aprovados e Pendentes
  let totalSacado = 0;
  let totalPendente = 0;
  withdrawals.forEach(w => {
    if (w.status === 'approved') {
      totalSacado += w.amount || 0;
    } else if (w.status === 'pending') {
      totalPendente += w.amount || 0;
    }
  });

  const saldoDisponivel = totalComissoes - (totalSacado + totalPendente);

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <AmbassadorClient 
          partnerUid={partnerUid}
          partnerName={partnerName}
          partnerEmail={partnerEmail}
          leads={leads}
          withdrawals={withdrawals}
          metrics={{
            leadsCapturadosCount,
            emNegociacaoCount,
            licencasAtivasCount,
            totalComissoes,
            totalSacado,
            totalPendente,
            saldoDisponivel
          }}
        />
      </div>
    </div>
  );
}
