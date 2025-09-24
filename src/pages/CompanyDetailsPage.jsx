import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { getCompany, addLead, getLeadsStream } from '../services/firestoreService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, User, Mail, Phone } from 'lucide-react';

export default function CompanyDetailsPage() {
  const { companyId } = useParams();
  const { currentUser } = useAuth();
  const [company, setCompany] = useState(null);
  const [leads, setLeads] = useState([]); // Estado para a lista de leads
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [leadError, setLeadError] = useState('');
  const [leadLoading, setLeadLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Efeito para buscar detalhes da empresa
  useEffect(() => {
    // ... (código existente)
  }, [companyId, currentUser]);

  // Efeito para ouvir o stream de leads
  useEffect(() => {
    if (!companyId) return;

    const unsubscribe = getLeadsStream(companyId, (fetchedLeads) => {
      setLeads(fetchedLeads);
    });

    // Limpa a inscrição ao desmontar o componente
    return () => unsubscribe();
  }, [companyId]);

  const onAddLead = async (data) => {
    // ... (código existente)
  };

  // ... (JSX de loading, error, etc.)

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
         {/* ... (Botão Voltar e Detalhes da Empresa) */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ... (Card de Detalhes da Empresa) */}
          {/* ... (Card de Adicionar Lead) */}
        </div>

        {/* Seção da Lista de Leads */}
        <div className="mt-8">
           <Card>
            <CardHeader>
              <CardTitle>Leads da Empresa</CardTitle>
            </CardHeader>
            <CardContent>
              {leads.length > 0 ? (
                <ul className="space-y-4">
                  {leads.map(lead => (
                    <li key={lead.id} className="p-4 bg-gray-50 rounded-md shadow-sm border flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center font-medium text-gray-800 mb-1">
                           <User className="mr-2 h-4 w-4 text-gray-500" />
                           <span>{lead.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                           <Mail className="mr-2 h-4 w-4 text-gray-500" />
                           <span>{lead.email}</span>
                        </div>
                         {lead.phone && (
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Phone className="mr-2 h-4 w-4 text-gray-500" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 mt-2 sm:mt-0 sm:ml-4 self-start sm:self-center">
                         Criado em: {lead.createdAt?.toDate().toLocaleDateString() ?? 'N/A'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">Nenhum lead adicionado ainda. Seja o primeiro!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
