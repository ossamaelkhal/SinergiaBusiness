'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Clock, Sparkles, Users } from 'lucide-react'

interface HeroProps {
    onDemoClick: () => void
}

export default function Hero({ onDemoClick }: HeroProps) {
    return (
        <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 bg-slate-950 overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Tech Grid */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_80%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center min-h-[500px] justify-center text-center">
                
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">Tecnologia com Alma, Crescimento com Consciência</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter text-white leading-[1.05] mb-6 max-w-[1000px] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    Tecnologia com Alma.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">
                        Crescimento com Consciência.
                    </span>
                </h1>

                {/* Sub-headline */}
                <p className="mx-auto max-w-[700px] text-slate-400 text-lg md:text-xl leading-relaxed mb-10 font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    Não acreditamos em escolhas falsas. Não é humano ou máquina. Unimos a força operacional de agentes digitais à sensibilidade e ao propósito da sua equipe. Emancipe seu time da burocracia e resgate o foco no que realmente gera valor.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                    <Link href="#niches">
                        <Button className="h-14 px-8 bg-white hover:bg-slate-200 text-slate-950 font-black text-lg rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all hover:scale-105 uppercase tracking-widest">
                            Conhecer as Soluções
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        className="h-14 px-8 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-bold text-lg rounded-xl backdrop-blur-sm transition-all hover:scale-105 uppercase tracking-widest"
                        onClick={onDemoClick}
                    >
                        <Play className="mr-2 h-5 w-5" />
                        Diagnosticar Minha Operação
                    </Button>
                </div>

                {/* Social Proof / Metrics (Conscious Growth Outcomes) */}
                <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 pt-10 border-t border-white/5 animate-in fade-in duration-1000 delay-500 w-full max-w-4xl">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-white font-black text-2xl md:text-4xl mb-1">
                            <Clock className="w-6 h-6 text-emerald-500" /> +80h/mês
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest text-center mt-1">Burocracia Eliminada</div>
                        <div className="text-[9px] text-slate-500 text-center font-light mt-0.5">Time focado em estratégia e clientes</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-white font-black text-2xl md:text-4xl mb-1">
                            <Sparkles className="w-6 h-6 text-indigo-500" /> 65%
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest text-center mt-1">Crescimento Equilibrado</div>
                        <div className="text-[9px] text-slate-500 text-center font-light mt-0.5">Aceleração livre de burnout operacional</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-white font-black text-2xl md:text-4xl mb-1">
                            <Users className="w-6 h-6 text-cyan-400" /> 0%
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest text-center mt-1">Desperdício de Talento</div>
                        <div className="text-[9px] text-slate-500 text-center font-light mt-0.5">Profissionais atuando com arte e propósito</div>
                    </div>
                </div>

            </div>
        </section>
    )
}
