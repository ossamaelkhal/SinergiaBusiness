'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/providers/AuthProvider';
import { getCompany, addLead, getLeadsStream, LeadStatus, updateLeadStatus } from '@/services/firestoreService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, User, Mail, Phone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHome from './DashboardHome';
import { LeadBoard } from './LeadBoard';

export function CompanyDetails() {
    const params = useParams();
    const companyId = params.id as string;
    const router = useRouter();
    const { user } = useAuth();
    const [company, setCompany] = useState<any>(null);
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [leadError, setLeadError] = useState('');
    const [leadLoading, setLeadLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleStatusUpdate = async (leadId: string, newStatus: LeadStatus) => {
        try {
            await updateLeadStatus(leadId, newStatus);
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    useEffect(() => {
        async function fetchCompany() {
            if (!companyId || !user) return;
            try {
                const companyData = await getCompany(companyId);
                if (companyData) {
                    setCompany(companyData);
                } else {
                    setError('Empresa não encontrada.');
                }
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar detalhes da empresa.');
            } finally {
                setLoading(false);
            }
        }
        fetchCompany();
    }, [companyId, user]);

    useEffect(() => {
        if (!companyId) return;

        const unsubscribe = getLeadsStream(companyId, (fetchedLeads: any[]) => {
            setLeads(fetchedLeads);
        });

        return () => unsubscribe();
    }, [companyId]);

    const onAddLead = async (data: any) => {
        setLeadLoading(true);
        setLeadError('');
        try {
            await addLead(companyId, data);
            reset();
        } catch (err) {
            console.error(err);
            setLeadError('Erro ao adicionar lead.');
        } finally {
            setLeadLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Carregando...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!company) return <div className="p-8 text-center">Empresa não encontrada.</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <Button variant="ghost" onClick={() => router.back()} className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para Dashboard
                </Button>

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{company.name}</h1>
                        <p className="text-gray-500">CNPJ: {company.cnpj || 'Não informado'}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Configurações</Button>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                        <TabsTrigger value="leads">Gestão de Leads</TabsTrigger>
                        <TabsTrigger value="settings" disabled>Configurações</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <DashboardHome />
                    </TabsContent>

                    <TabsContent value="leads">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Adicionar Novo Lead</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit(onAddLead)} className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nome</Label>
                                            <Input id="name" type="text" {...register('name', { required: 'Nome é obrigatório' })} />
                                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" {...register('email', { required: 'Email é obrigatório' })} />
                                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone">Telefone</Label>
                                            <Input id="phone" type="tel" {...register('phone')} />
                                        </div>
                                        {leadError && <p className="text-red-500 text-sm">{leadError}</p>}
                                        <Button type="submit" disabled={leadLoading}>
                                            {leadLoading ? 'Adicionando...' : 'Adicionar Lead'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Resumo de Leads</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8">
                                        <div className="text-4xl font-bold text-primary mb-2">{leads.length}</div>
                                        <p className="text-gray-500">Leads Cadastrados</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mb-4">
                            <LeadBoard leads={leads} onUpdateStatus={handleStatusUpdate} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    );
}
