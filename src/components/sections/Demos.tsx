'use client'

import React from 'react'
import { Calculator, Play, Workflow, Trophy, ArrowRight, Mic } from 'lucide-react'

interface DemosProps {
    onFlowClick: () => void
    onBuilderClick: () => void
    onGamificationClick: () => void
    onSimulatorClick: () => void
}

import Link from 'next/link'

export default function Demos({ onFlowClick, onBuilderClick, onGamificationClick, onSimulatorClick }: DemosProps) {
    return (
        <section id="demos" className="w-full py-24 relative overflow-hidden bg-slate-950 selection:bg-fuchsia-500 selection:text-white border-y border-white/5">
            {/* Liquid Glass Background Effects */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>

            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse"></span>
                        <span className="text-sm font-medium text-fuchsia-300 tracking-wide uppercase">Demos Interativas</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6">
                        Veja a <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-emerald-400">SinergIA</span> em Ação
                    </h2>
                    <p className="max-w-[800px] mx-auto text-lg text-indigo-100/70 font-light leading-relaxed">
                        Interaja com nossas ferramentas autônomas e sinta o poder da automação operando no seu modelo de negócio em tempo real.
                    </p>
                </div>

                {/* Glassmorphism Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {/* Card 1: Calculadora ROI */}
                    <Link href="#roi-calculator" className="block">
                        <div
                            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-lg h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="p-8 pb-6 flex flex-col h-full relative z-10">
                                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all duration-500">
                                    <Calculator className="w-7 h-7 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">Calculadora ROI</h3>
                                <p className="text-indigo-100/60 text-sm leading-relaxed mb-8 flex-1">
                                    Simule o impacto financeiro exato de trocar tarefas manuais por IAs focadas em lucro.
                                </p>
                                <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-4">
                                    <span className="text-sm font-bold tracking-tight text-emerald-400 group-hover:text-white transition-colors">Calcular Agora</span>
                                    <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 2: Demo de Fluxos */}
                    <div
                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/50 shadow-lg"
                        onClick={onFlowClick}
                    >
                        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="p-8 pb-6 flex flex-col h-full relative z-10">
                            <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-500">
                                <Play className="w-7 h-7 text-indigo-400 ml-1" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">Operações e Fluxos</h3>
                            <p className="text-indigo-100/60 text-sm leading-relaxed mb-8 flex-1">
                                Assista nossos agentes autônomos recuperando leads frios e processando Vendas no WhatsApp.
                            </p>
                            <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-4">
                                <span className="text-sm font-bold tracking-tight text-indigo-400 group-hover:text-white transition-colors">Ver Simulação</span>
                                <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Construtor Visual */}
                    <div
                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-fuchsia-500/50 shadow-lg"
                        onClick={onBuilderClick}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="p-8 pb-6 flex flex-col h-full relative z-10">
                            <div className="w-14 h-14 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center mb-6 border border-fuchsia-500/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all duration-500">
                                <Workflow className="w-7 h-7 text-fuchsia-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-fuchsia-300 transition-colors">A Missão (Construtor)</h3>
                            <p className="text-indigo-100/60 text-sm leading-relaxed mb-8 flex-1">
                                O centro de comando. Conecte blocos e faça deploy de bots sem escrever código.
                            </p>
                            <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-4">
                                <span className="text-sm font-bold tracking-tight text-fuchsia-400 group-hover:text-white transition-colors">Ativar Engine</span>
                                <ArrowRight className="w-5 h-5 text-fuchsia-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Simulador de Vendas */}
                    <div
                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/50 shadow-lg xl:-translate-y-4 xl:hover:-translate-y-6"
                        onClick={onSimulatorClick}
                    >
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-300 text-[10px] font-black px-2 py-1 rounded border border-amber-500/30 uppercase tracking-widest">Hot</div>
                        
                        <div className="p-8 pb-6 flex flex-col h-full relative z-10">
                            <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all duration-500">
                                <Mic className="w-7 h-7 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors">Tropa Simulator</h3>
                            <p className="text-indigo-100/60 text-sm leading-relaxed mb-8 flex-1">
                                Bata objeções com um cliente agressivo gerado por IA (Áudio e Texto). Treino duro, jogo fácil.
                            </p>
                            <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-4">
                                <span className="text-sm font-bold tracking-tight text-amber-400 group-hover:text-white transition-colors">Iniciar Treino</span>
                                <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Gamificação */}
                    <div
                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-sky-400/50 shadow-lg"
                        onClick={onGamificationClick}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="p-8 pb-6 flex flex-col h-full relative z-10">
                            <div className="w-14 h-14 bg-sky-400/20 rounded-2xl flex items-center justify-center mb-6 border border-sky-400/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-500">
                                <Trophy className="w-7 h-7 text-sky-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-sky-300 transition-colors">A Cultura de Elite</h3>
                            <p className="text-indigo-100/60 text-sm leading-relaxed mb-8 flex-1">
                                Conquistas e Rankings que injetam dopamina na veia do seu time comercial para bater a meta.
                            </p>
                            <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-4">
                                <span className="text-sm font-bold tracking-tight text-sky-400 group-hover:text-white transition-colors">Ver Sistema</span>
                                <ArrowRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
