'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Copy, TrendingUp, Users, DollarSign, Download, Award, ShieldCheck, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/providers/AuthProvider';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export function PartnerHub() {
    const { user } = useAuth();
    const [referralLink, setReferralLink] = useState('');

    useEffect(() => {
        if (user) {
            // Generate link based on user email or ID. E.g. base64 or just clean string.
            const affiliateId = user.email?.split('@')[0] || user.uid.substring(0, 6);
            setReferralLink(`https://sinergia.business/?ref=${affiliateId}`);
        }
    }, [user]);

    // Mock partner data for UI demonstration
    const partnerData = {
        name: user?.displayName || user?.email?.split('@')[0] || 'Parceiro',
        currentTier: "Vanguard",
        nextTier: "Elite",
        activeClients: 0,
        clientsNeededForNextTier: 5,
        monthlyRecurringRevenue: 0,
    };

    const progressToNextTier = (partnerData.activeClients / partnerData.clientsNeededForNextTier) * 100;

    const copyLink = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success("Link copiado para a área de transferência!");
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-slate-300">
            {/* Header Identity */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 bg-slate-900/60 rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="z-10 text-white space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/20">
                        <Award className="w-4 h-4" /> Nível Atual: {partnerData.currentTier}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Portal SinergIA Partners</h2>
                    <p className="text-slate-400 font-medium">Bem-vindo(a), <span className="text-white">{partnerData.name}</span>. Gerencie suas comissões e indicações.</p>
                </div>

                <div className="z-10 flex flex-col gap-3 w-full md:w-auto">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Seu Link Exclusivo</label>
                    <div className="flex items-center bg-slate-950 rounded-xl p-1.5 border border-white/10">
                        <span className="px-4 text-sm text-slate-300 font-mono truncate max-w-[200px] md:max-w-[250px]">{referralLink}</span>
                        <Button variant="secondary" size="sm" onClick={copyLink} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-tight border-0 ml-2 rounded-lg">
                            <Copy className="w-4 h-4 mr-2" /> COPIAR
                        </Button>
                    </div>
                    <button onClick={handleLogout} className="text-xs text-slate-500 flex items-center gap-1 hover:text-rose-400 self-end transition-colors mt-2">
                        <LogOut className="w-3 h-3"/> Desconectar
                    </button>
                </div>
            </div>

            {/* Gamification Progress */}
            <Card className="border border-white/10 bg-white/5 backdrop-blur-md">
                <CardContent className="p-6 md:p-8">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h3 className="font-bold text-white text-lg">Progresso para Tier: <span className="text-indigo-400">{partnerData.nextTier}</span></h3>
                            <p className="text-sm text-slate-400 mt-1">Ative mais {partnerData.clientsNeededForNextTier - partnerData.activeClients} clientes para desbloquear 30% de comissão vitalícia.</p>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-black text-indigo-400">{partnerData.activeClients}</span>
                            <span className="text-slate-500 font-medium"> / {partnerData.clientsNeededForNextTier} Clientes</span>
                        </div>
                    </div>
                    <Progress value={progressToNextTier} className="h-3 my-4 bg-slate-800" />
                </CardContent>
            </Card>

            {/* KPIs */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-slate-900/50 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">MRR (Acumulado)</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">R$ {partnerData.monthlyRecurringRevenue.toLocaleString('pt-BR')}</div>
                        <p className="text-xs text-emerald-500 font-medium flex items-center mt-2">
                            <TrendingUp className="w-3 h-3 mr-1" /> Aguardando 1ª Indicação
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Clientes Ativos</CardTitle>
                        <Users className="h-4 w-4 text-indigo-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{partnerData.activeClients}</div>
                        <p className="text-xs text-slate-500 mt-2">
                            Taxa de conversão PIX: -
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Status Operacional</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-white">Conta Verificada</div>
                        <p className="text-xs text-slate-500 mt-2">
                            Pronto para transacionar
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Material de Venda (Swipe Files) */}
            <div className="pt-6">
                <h3 className="text-xl font-bold tracking-tight mb-6 text-white border-l-4 border-indigo-500 pl-4">Arsenal de Vendas White-Label</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="hover:border-indigo-500/50 bg-white/5 border-white/10 transition-colors cursor-pointer group">
                        <CardContent className="p-6 flex items-center justify-between h-full">
                            <div className="space-y-2">
                                <h4 className="font-bold text-white tracking-tight">Cold Email Template</h4>
                                <p className="text-sm text-slate-400">Cópia testada contra objeções para prospectar clínicas médicas e escritórios.</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border group-hover:border-indigo-500/50 transition-all shrink-0 ml-4">
                                <Download className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:border-indigo-500/50 bg-white/5 border-white/10 transition-colors cursor-pointer group">
                        <CardContent className="p-6 flex items-center justify-between h-full">
                            <div className="space-y-2">
                                <h4 className="font-bold text-white tracking-tight">Pitch Deck Apresentação</h4>
                                <p className="text-sm text-slate-400">Apresentação PPT limpa para você colocar a logo da sua agência e fechar reuniões B2B.</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border group-hover:border-indigo-500/50 transition-all shrink-0 ml-4">
                                <Download className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
