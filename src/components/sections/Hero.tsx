'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Activity, Code, Shield } from 'lucide-react'

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
                    <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">SinergIA Engine 2.0 Operacional</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter text-white leading-[1.05] mb-6 max-w-[1000px] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    O Fim do Caos.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">
                        O Início do Seu Império.
                    </span>
                </h1>

                {/* Sub-headline */}
                <p className="mx-auto max-w-[700px] text-slate-400 text-lg md:text-xl leading-relaxed mb-10 font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    Sua operação não precisa de mais funcionários ou planilhas. Ela precisa de uma <strong className="text-white">Infraestrutura Autônoma</strong>. Implantamos um ecossistema de I.A. que rastreia a web, qualifica leads e fecha negócios em escala industrial.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                    <Link href="#features">
                        <Button className="h-14 px-8 bg-white hover:bg-slate-200 text-slate-950 font-black text-lg rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all hover:scale-105 uppercase tracking-widest">
                            Conhecer a Máquina
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        className="h-14 px-8 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-bold text-lg rounded-xl backdrop-blur-sm transition-all hover:scale-105 uppercase tracking-widest"
                        onClick={onDemoClick}
                    >
                        <Play className="mr-2 h-5 w-5" />
                        Simular Operação
                    </Button>
                </div>

                {/* Social Proof / Metrics (Updated to match Real B2B AI Benchmarks) */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 pt-10 border-t border-white/5 animate-in fade-in duration-1000 delay-500">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-white font-black text-2xl md:text-4xl mb-1">
                            <Activity className="w-6 h-6 text-emerald-500" /> 75%
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Alta em Conversão BANT</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-white font-black text-2xl md:text-4xl mb-1">
                            <Code className="w-6 h-6 text-indigo-500" /> 65%
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Queda no Custo de SDR</div>
                    </div>
                    <div className="flex flex-col items-center col-span-2 md:col-span-1">
                        <div className="flex items-center justify-center gap-2 text-white font-black text-2xl md:text-4xl mb-1">
                            <Shield className="w-6 h-6 text-cyan-400" /> 3.2x
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Mais Reuniões Agendadas</div>
                    </div>
                </div>

            </div>
        </section>
    )
}
