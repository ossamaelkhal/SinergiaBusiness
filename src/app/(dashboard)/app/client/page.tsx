'use client';

import { useState } from 'react';
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LayoutDashboard, BookOpen, Bot, Settings, PlayCircle, Zap, ShieldCheck, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SetupWizard } from "@/components/dashboard/SetupWizard";

export default function ClientDashboardPage() {
    const [needsSetup, setNeedsSetup] = useState(true);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 text-slate-50 p-4 sm:p-6 lg:p-8">
                {needsSetup ? (
                    <SetupWizard onComplete={() => setNeedsSetup(false)} />
                ) : (
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                                <LayoutDashboard className="w-8 h-8 text-emerald-400" />
                                Cockpit SinergIA
                            </h1>
                            <p className="text-slate-400 mt-2 font-medium flex items-center gap-2">
                                Sistema Mestre Operacional <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            </p>
                        </div>
                        <Button className="bg-slate-900 border border-white/10 hover:bg-slate-800 text-white rounded-lg px-6">
                            <Settings className="w-4 h-4 mr-2" /> Configurar Engine
                        </Button>
                    </header>

                    {/* Quick Access */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Playbooks */}
                        <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden bg-slate-900 border-white/5 ring-1 ring-white/10 relative group">
                            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-indigo-900"></div>
                            <CardContent className="p-8">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                                    <BookOpen className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Treinamento & Playbooks</h2>
                                <p className="text-slate-400 mb-6 text-sm">Acesse as metodologias estruturadas BANT, SPIN Selling e Nurturing B2B para treinar seus times.</p>
                                <Button variant="ghost" className="w-full justify-between items-center group-hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-300 border border-white/5">
                                    Explorar Base de Conhecimento <PlayCircle className="w-5 h-5 text-slate-500 group-hover:text-indigo-400" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Agents */}
                        <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden bg-slate-900 border-white/5 ring-1 ring-emerald-500/20 relative group">
                            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                            <div className="absolute top-4 right-4 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] uppercase font-black text-emerald-400">Ativo</div>
                            <CardContent className="p-8">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                                    <Bot className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Seu Clone BDR SinergIA</h2>
                                <p className="text-slate-400 mb-6 text-sm">Ajuste os hyper-parâmetros do seu agente, injete novos PDFs de contexto e monitore o Webhook n8n.</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wide">
                                        Console n8n
                                    </Button>
                                    <Button variant="outline" className="w-full border-white/10 text-slate-300 hover:bg-white/5">
                                        Logs
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Funnel Metrics - Enterprise Telemetry */}
                    <div className="pt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                               <Zap className="w-5 h-5 text-amber-400" /> Telemetria Financeira & Operacional
                            </h3>
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                <ShieldCheck className="w-4 h-4" /> DADOS EM TEMPO REAL
                            </div>
                        </div>

                        {/* Top Line Impact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                             {/* Faturamento Recuperado */}
                             <Card className="bg-slate-900 border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.05)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-all"></div>
                                <CardContent className="p-8">
                                    <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2">Receita Líquida Gerada pela I.A. (Mês)</div>
                                    <div className="flex items-end gap-3">
                                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                                            R$ 42.850
                                        </div>
                                        <div className="text-sm font-bold text-emerald-400 mb-2 flex items-center">
                                            +240% <Activity className="w-3 h-3 ml-1" />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm text-slate-400 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 34 deals fechados sem interação humana.
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Custo Operacional Salvo */}
                            <Card className="bg-slate-900 border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.05)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] group-hover:bg-indigo-500/20 transition-all"></div>
                                <CardContent className="p-8">
                                    <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Custo de SDR/Recepção Evitado</div>
                                    <div className="flex items-end gap-3">
                                        <div className="text-5xl font-black text-white">
                                            R$ 14.200
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm text-slate-400 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 248 horas de trabalho manual poupadas.
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Machine Performance */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="bg-slate-900 border-white/5 shadow-inner hover:border-white/10 transition-colors">
                                <CardContent className="p-6">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Respostas &lt; 3 Segundos</div>
                                    <div className="text-2xl font-black text-white">842</div>
                                    <div className="text-xs text-slate-500 mt-1">Interações executadas</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900 border-white/5 shadow-inner hover:border-white/10 transition-colors">
                                <CardContent className="p-6">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Qualificação BANT</div>
                                    <div className="text-2xl font-black text-white">128</div>
                                    <div className="text-xs text-slate-500 mt-1">Leads quentes entregues</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900 border-white/5 shadow-inner hover:border-white/10 transition-colors">
                                <CardContent className="p-6">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Agendamentos (Booking)</div>
                                    <div className="text-2xl font-black text-white">45</div>
                                    <div className="text-xs text-slate-500 mt-1">Reuniões cravadas na agenda</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900 border-white/5 shadow-inner hover:border-white/10 transition-colors">
                                <CardContent className="p-6">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Recuperação (No-Show/Abandono)</div>
                                    <div className="text-2xl font-black text-white">32%</div>
                                    <div className="text-xs text-slate-500 mt-1">Acima da média do mercado</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
