'use client'

import React from 'react'
import { Zap, BarChart, CalendarCheck, Shield, BrainCircuit, Target, Factory, TrendingUp } from 'lucide-react'

export default function Features() {
    return (
        <section id="features" className="w-full py-24 bg-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 -ml-64" />
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 -mr-64" />
            
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Left Column - The "Factory" Narrative */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5">
                            <Factory className="h-4 w-4 text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
                                A Fábrica SinergIA
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                            Arquitetura de <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                                Conversão Determinística
                            </span>
                        </h2>
                        <p className="max-w-[500px] text-slate-400 text-lg leading-relaxed font-medium">
                            Nós não vendemos &quot;chatbots&quot;. Nós implementamos linhas de produção. Substituímos a variabilidade do humor humano por processos algorítmicos que rodam 24/7.
                        </p>
                        
                        <ul className="space-y-4 pt-4 border-t border-white/10">
                            <li className="flex items-center gap-3 text-slate-300 font-bold">
                                <TrendingUp className="w-5 h-5 text-emerald-500" /> 
                                Escalonamento horizontal infinito.
                            </li>
                            <li className="flex items-center gap-3 text-slate-300 font-bold">
                                <Zap className="w-5 h-5 text-indigo-500" /> 
                                Resposta garantida em menos de 3s.
                            </li>
                        </ul>
                    </div>

                    {/* Right Column - Engineering Bento Box */}
                    <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                        
                        {/* Box 1: Lead Scoring */}
                        <div className="flex flex-col space-y-4 p-8 rounded-3xl border border-white/5 bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500/30 transition-all group backdrop-blur-xl">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                <Target className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-white mb-2">Lead Scoring ML</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Identifica intenção de compra invisível aos olhos humanos. Eleva as taxas de Lead-to-Opp em 75% separando curiosos de compradores.
                                </p>
                            </div>
                        </div>

                        {/* Box 2: Agentes de Agendamento (offset) */}
                        <div className="flex flex-col space-y-4 p-8 rounded-3xl border border-white/5 bg-slate-900/50 hover:bg-slate-900 hover:border-indigo-500/30 transition-all group lg:translate-y-8 backdrop-blur-xl">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                                <CalendarCheck className="h-6 w-6 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-white mb-2">Booking Booking Autônomo</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Agendamento B2B automatizado que destrói atritos. Transforma tráfego frio em reuniões no calendário com 3.2x mais eficácia.
                                </p>
                            </div>
                        </div>

                        {/* Box 3: Qualificação BANT */}
                        <div className="flex flex-col space-y-4 p-8 rounded-3xl border border-white/5 bg-slate-900/50 hover:bg-slate-900 hover:border-teal-500/30 transition-all group backdrop-blur-xl">
                            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 group-hover:scale-110 transition-transform">
                                <BrainCircuit className="h-6 w-6 text-teal-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-white mb-2">SDR Engine (BANT)</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Sondas de inteligência artificial que disparam em D+0 para qualificar Budget, Authority, Need e Timeframe sem intervenção.
                                </p>
                            </div>
                        </div>

                        {/* Box 4: Telemetria (offset) */}
                        <div className="flex flex-col space-y-4 p-8 rounded-3xl border border-white/5 bg-slate-900/50 hover:bg-slate-900 hover:border-cyan-500/30 transition-all group lg:translate-y-8 backdrop-blur-xl">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                                <BarChart className="h-6 w-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-white mb-2">Telemetria C-Level</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Dashboard Cockpit com cálculo de ROI em tempo real. Veja o MRR gerado pela máquina e o custo poupado a cada 24 horas.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
