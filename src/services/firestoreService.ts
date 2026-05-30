import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
  limit
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Interfaces
export interface Company {
  id?: string;
  name: string;
  cnpj?: string;
  userId: string;
  createdAt?: Timestamp;
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED' | 'LOST' | 'prospect_vip' | 'active_client';

export interface Lead {
  id?: string;
  companyId?: string;
  name: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  createdAt?: Timestamp | string;
}

const companiesCollection = collection(db, 'companies');
const leadsCollection = collection(db, 'leads');

export const addCompany = async (companyData: Omit<Company, 'id' | 'userId' | 'createdAt'>, userId: string) => {
  return await addDoc(companiesCollection, {
    ...companyData,
    userId,
    createdAt: serverTimestamp(),
  });
};

export const getCompany = async (companyId: string): Promise<Company | null> => {
  const docRef = doc(db, 'companies', companyId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Company;
  } else {
    return null;
  }
};

export const addLead = async (companyId: string, leadData: Omit<Lead, 'id' | 'companyId' | 'createdAt' | 'status'>) => {
  return await addDoc(leadsCollection, {
    ...leadData,
    companyId,
    status: 'NEW', // Default status
    createdAt: serverTimestamp(),
  });
};

export const updateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
  const leadRef = doc(db, 'leads', leadId);
  await updateDoc(leadRef, {
    status: newStatus
  });
}

export const getLeadsStream = (companyId: string, callback: (leads: Lead[]) => void) => {
  if (!companyId) {
    console.error("ID da empresa não fornecido para getLeadsStream");
    return () => { };
  }

  const q = query(
    leadsCollection,
    where("companyId", "==", companyId),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const leads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Lead[];
    callback(leads);
  });

  return unsubscribe;
};

export const getCompaniesStream = (userId: string, callback: (companies: Company[]) => void) => {
  if (!userId) {
    return () => { };
  }
  const q = query(
    companiesCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const companies = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Company[];
    callback(companies);
  });
  return unsubscribe;
};

// Applications Funnel (Real B2B Leads from leads collection)
export interface Application {
  id?: string;
  name: string;
  email: string;
  phone: string;
  revenue: string;
  teamSize: string;
  bottleneck: string;
  status: string;
  nichoSlug?: string;
  domain?: string;
  referrerId?: string;
  tracking?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    fbc?: string;
    fbp?: string;
    client_user_agent?: string;
    client_ip_address?: string;
  };
  createdAt?: any;
}

/**
 * Escuta os leads (onboarding) em tempo real da coleção 'leads'
 */
export const getApplicationsStream = (callback: (apps: Application[]) => void) => {
  const q = query(
    leadsCollection,
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const apps = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Application[];
    callback(apps);
  }, (err) => {
    console.error("Erro no stream de leads (applications):", err);
  });

  return unsubscribe;
};

/**
 * Atualiza o status de uma aplicação/lead
 */
export const updateApplicationStatus = async (appId: string, status: string) => {
  const docRef = doc(db, 'leads', appId);
  await updateDoc(docRef, { status });
};

// --- GATEWAY DE SAQUES DOS AFILIADOS ---

export interface WithdrawalRequest {
  id?: string;
  partnerId: string;
  partnerName: string;
  amount: number;
  pixKey: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: any;
  updatedAt?: string;
}

/**
 * Grava nova solicitação de saque de comissão Pix no Firestore
 */
export const addWithdrawalRequest = async (data: Omit<WithdrawalRequest, 'id' | 'status' | 'createdAt'>) => {
  const withdrawalsCollection = collection(db, 'withdrawals');
  return await addDoc(withdrawalsCollection, {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
};

/**
 * Escuta as solicitações de saque em tempo real (para o Painel Admin C-Level)
 */
export const getWithdrawalsStream = (callback: (requests: WithdrawalRequest[]) => void) => {
  const q = query(
    collection(db, 'withdrawals'),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const requests = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as WithdrawalRequest[];
    callback(requests);
  }, (err) => {
    console.error("Erro no stream de saques (withdrawals):", err);
  });

  return unsubscribe;
};

// --- TELEMETRIA DE LOGS DE OPERAÇÃO DOS AGENTES ---

export interface OperationLog {
  id?: string;
  companyId?: string;
  agentName: string;
  action: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  createdAt: any;
}

/**
 * Escuta em tempo real os logs de IA para uma determinada empresa / lead
 */
export const getOperationLogsStream = (companyId: string, callback: (logs: OperationLog[]) => void) => {
  if (!companyId) {
    return () => {};
  }
  
  const q = query(
    collection(db, 'operation_logs'),
    where('companyId', '==', companyId),
    orderBy('createdAt', 'desc'),
    limit(50)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const logs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as OperationLog[];
    callback(logs);
  }, (err) => {
    console.error("Erro no stream de logs operacionais (operation_logs):", err);
  });

  return unsubscribe;
};
