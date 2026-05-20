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
  Timestamp
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

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED' | 'LOST';

export interface Lead {
  id?: string;
  companyId: string;
  name: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  createdAt?: Timestamp;
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

// Applications Funnel
export interface Application {
  id?: string;
  name: string;
  email: string;
  phone: string;
  revenue: string;
  teamSize: string;
  bottleneck: string;
  status: string;
  createdAt?: Timestamp;
}

export const getApplicationsStream = (callback: (apps: Application[]) => void) => {
  const q = query(
    collection(db, 'applications'),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const apps = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Application[];
    callback(apps);
  }, (err) => {
    console.error("Erro no stream de aplicações:", err);
  });

  return unsubscribe;
};

export const updateApplicationStatus = async (appId: string, status: string) => {
  const docRef = doc(db, 'applications', appId);
  await updateDoc(docRef, { status });
};
