'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { addCompany, getCompaniesStream, getUserStats, Company, UserStats } from '@/services/firestore';
import { isValidCNPJ } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { WelcomeBanner } from '@/components/welcome-banner';
import { StatsBar } from '@/components/stats-bar';

type FormInputs = {
  companyName: string;
  companyCnpj: string;
}

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [stats, setStats] = useState<UserStats>({ companyCount: 0, leadCount: 0, newCompanies: 0, newLeads: 0, qualifiedLeads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.uid) {
      const unsubscribe = getCompaniesStream(currentUser.uid, (fetchedCompanies) => {
        setCompanies(fetchedCompanies);
        // Apenas para o skeleton da lista
        if (loading) setLoading(false);
      });
      
      // Busca as estatísticas
      getUserStats(currentUser.uid).then(setStats);
      
      return () => unsubscribe();
    }
  }, [currentUser]);

  const onAddCompany: SubmitHandler<FormInputs> = async (data) => {
    if (!currentUser) return;
    try {
      await addCompany({ name: data.companyName, cnpj: data.companyCnpj }, currentUser.uid);
      toast.success(`Empresa "${data.companyName}" adicionada.`);
      reset();
      // Refresca as estatísticas após adicionar
      getUserStats(currentUser.uid).then(setStats);
    } catch (err) {
      toast.error("Erro ao adicionar empresa.");
    }
  };

  return (
    <>
      <WelcomeBanner userName={currentUser?.displayName} companyCount={stats.companyCount} />
      
      <StatsBar 
        companyCount={stats.companyCount} 
        leadCount={stats.leadCount}
        qualifiedLeads={stats.qualifiedLeads}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader><CardTitle>Adicionar Nova Empresa</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onAddCompany)} className="space-y-4">
                {/* ... Formulário ... */}
                 <Input id="companyName" {...register("companyName", { required: "Nome é obrigatório" })} />
                 <Input id="companyCnpj" {...register("companyCnpj", { validate: value => !value || isValidCNPJ(value) || "CNPJ inválido" })} />
                 <Button type="submit" className="w-full">Adicionar</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Minhas Empresas</CardTitle></CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : companies.length > 0 ? (
                <ul className="space-y-3">
                  {companies.map(company => (
                    <li key={company.id}>
                      <Link href={`/dashboard/company/${company.id}`}>
                        <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted">
                           <span>{company.name}</span>
                           <span className="text-sm text-muted-foreground">{company.cnpj}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground">Nenhuma empresa adicionada.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
