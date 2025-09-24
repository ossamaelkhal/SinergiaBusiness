import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

const companiesCollection = collection(db, 'companies');
const leadsCollection = collection(db, 'leads');

// ... (addCompany, addLead, getCompany)

/**
 * Ouve as mudanças na coleção de leads em tempo real para uma empresa específica.
 * @param {string} companyId - O ID da empresa para filtrar os leads.
 * @param {function} callback - Função a ser chamada com a lista de leads.
 * @returns {function} - A função para cancelar a subscrição (unsubscribe).
 */
export const getLeadsStream = (companyId, callback) => {
  if (!companyId) {
    console.error("ID da empresa não fornecido para getLeadsStream");
    return () => {};
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
    }));
    callback(leads);
  });

  return unsubscribe;
};


/**
 * Ouve as mudanças na coleção de empresas em tempo real para um usuário específico.
 */
export const getCompaniesStream = (userId, callback) => {
  // ... (código existente)
};
