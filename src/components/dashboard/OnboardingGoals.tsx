import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ChevronRight, Target } from 'lucide-react';

export default function OnboardingGoals() {
    const [progress] = useState(33);

    return (
        <Card className="mb-6 overflow-hidden border-0 relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-xl shadow-indigo-900/20 rounded-2xl">
            {/* Glassmorphism Accents */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 pointer-events-none"></div>

            <CardContent className="relative p-6 sm:p-8 z-10 text-white flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="flex-1 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold text-indigo-200">
                        <Target className="w-4 h-4" /> Goal-First Onboarding
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                            Ative sua Máquina de Vendas
                        </h3>
                        <p className="text-indigo-200/90 max-w-lg text-sm sm:text-base leading-relaxed">
                            Acelere seu crescimento com Inteligência Automática. Complete estas 3 etapas para que sua IA capture e converta leads 24 horas por dia.
                        </p>
                    </div>
                    
                    <div className="w-full max-w-md pt-2">
                        <div className="flex justify-between text-xs font-bold mb-2 text-indigo-300 uppercase tracking-widest">
                            <span>Implementação IA</span>
                            <span>{progress}% Concluído</span>
                        </div>
                        {/* Custom Liquid Glass Progress Bar */}
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5 shadow-inner">
                            <div 
                                className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-green-500 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[400px] flex-shrink-0 flex flex-col gap-3">
                    {/* Step 1: DONE */}
                    <div className="group relative flex items-center p-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-md transition-all">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 mr-4 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <div className="flex-1">
                            <h4 className="font-bold text-sm text-white">Integração WhatsApp</h4>
                            <p className="text-xs text-indigo-200">A IA SinergIA ganhou olhos e ouvidos.</p>
                        </div>
                    </div>

                    {/* Step 2: IN PROGRESS */}
                    <div className="group relative flex items-center p-4 bg-white/5 hover:bg-white/10 border border-indigo-500/50 rounded-xl backdrop-blur-md transition-all cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        <div className="w-6 h-6 rounded-full border-2 border-indigo-400 mr-4 flex items-center justify-center bg-indigo-900/50">
                            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                        </div>
                        <div className="flex-1 pr-6">
                            <h4 className="font-bold text-sm text-amber-300">Setup Inicial SinergIA Bot</h4>
                            <p className="text-xs text-indigo-200/80 line-clamp-1">Clone de vendas pronto para treinamento.</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-indigo-300 absolute right-4 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Step 3: TODO */}
                    <div className="group relative flex items-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-md transition-all cursor-pointer opacity-70 hover:opacity-100">
                        <div className="w-6 h-6 rounded-full border-2 border-slate-500 mr-4"></div>
                        <div className="flex-1 pr-6">
                            <h4 className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors">Playbook: Recuperação</h4>
                            <p className="text-xs text-slate-400 group-hover:text-indigo-200 transition-colors">Resgate dinheiro dormindo na base.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
