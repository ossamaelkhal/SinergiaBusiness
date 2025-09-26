import {
  collection, addDoc, doc, getDoc, serverTimestamp, query, where, onSnapshot, orderBy, Timestamp, getCountFromServer, updateDoc, CollectionReference, DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

// Tipos
export type LeadStatus = 'Novo' | 'Qualificado' | 'Contato' | 'Convertido' | 'Perdido';
export interface Company { id: string; name: string; cnpj?: string; ownerId: string; createdAt: Timestamp; }
export interface Lead { id: string; name: string; email: string; phone?: string; companyId: string; ownerId: string; status: LeadStatus; createdAt: Timestamp; }
export interface UserStats { companyCount: number; leadCount: number; newCompanies: number; newLeads: number; qualifiedLeads: number; }

// Coleções
const companiesCollection = collection(db, 'companies');
const leadsCollection = collection(db, 'leads');

// --- Funções de Estatísticas ---
// ... (código getCountInDateRange existente)

export async function getUserStats(userId: string): Promise<UserStats> {
  if (!userId) return { companyCount: 0, leadCount: 0, newCompanies: 0, newLeads: 0, qualifiedLeads: 0 };
  
  const qualifiedLeadsQuery = query(leadsCollection, where("ownerId", "==", userId), where("status", "==", "Qualificado"));
  // ... (outras queries existentes)

  const [companySnapshot, leadSnapshot, newCompanies, newLeads, qualifiedLeadsSnapshot] = await Promise.all([
    // ... (chamadas Promise.all existentes)
    getCountFromServer(qualifiedLeadsQuery)
  ]);

  return {
    companyCount: companySnapshot.data().count,
    leadCount: leadSnapshot.data().count,
    newCompanies,
    newLeads,
    qualifiedLeads: qualifiedLeadsSnapshot.data().count
  };
}

// --- Funções de Empresa ---
// ... (código de empresa existente)

// --- Funções de Lead ---
export const addLead = (data: { name: string, email: string, phone?: string }, companyId: string, userId: string) => {
  if (!userId) return Promise.reject(new Error('User ID is required'));
  return addDoc(leadsCollection, { ...data, companyId, ownerId: userId, status: 'Novo', createdAt: serverTimestamp() });
}

export const updateLeadStatus = (leadId: string, status: LeadStatus) => {
  const leadRef = doc(db, 'leads', leadId);
  return updateDoc(leadRef, { status: status });
}

export const getLeadsStream = (companyId: string, callback: (l: Lead[]) => void) => {
  // ... (código existente)
};
