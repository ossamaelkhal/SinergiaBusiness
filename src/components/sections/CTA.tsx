'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Rocket, ShieldCheck, Zap, Server, TrendingUp } from 'lucide-react'

export default function CTA() {
    return (
        <section className="w-full py-24 md:py-32 bg-slate-950 overflow-hidden relative border-t border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <Rocket className="w-4 h-4" />
                    O Fim do Caos Operacional
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-tight mb-4">
                    Pare de pagar o <span className="text-emerald-400">pedágio da ineficiência.</span>
                </h2>
                
                <p className="mx-auto max-w-[700px] text-slate-400 text-lg font-medium leading-relaxed mb-16">
                    Mude o jogo hoje. Deixe seus concorrentes operando com planilhas enquanto você roda em piloto automático.
                </p>
                
                {/* TIERS / PREÇOS ESTRATÉGICOS (Anchoring) */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 text-left">
                    
                    {/* TIER 1: THE VITAMIN (Anchoring down to make painkiller seem better) */}
                    <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 relative opacity-90">
                        <div className="text-slate-400 font-bold mb-2">Treinamentos &quot;Vitamina&quot;</div>
                        <div className="text-3xl font-black text-white mb-4">R$ 5k a 10k<span className="text-sm font-normal text-slate-500"> /ano</span></div>
                        <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-white/5">O que agências convencionais vendem para animar sua equipe por uma semana.</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5"></div>Efeito Voo de Galinha</li>
                            <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5"></div>Zero infraestrutura deixada</li>
                            <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5"></div>Não escala, depende 100% de humanos motivados</li>
                        </ul>
                    </div>

                    {/* TIER 2: SinergIA Painkiller (The actual focal point) */}
                    <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-8 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(16,185,129,0.15)] z-10">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-emerald-950 text-xs font-black rounded-full uppercase tracking-widest border border-emerald-400 shadow-lg whitespace-nowrap">
                            A Cura Definitiva
                        </div>
                        <div className="text-emerald-400 font-bold mb-2">Engine SinergIA + Engine TTFV</div>
                        <div className="text-4xl font-black text-white mb-2">A partir de R$ 4.997<span className="text-sm font-normal text-slate-500"></span></div>
                        <p className="text-slate-400 text-sm mb-6 pb-6 border-b border-white/10">Clones digitais forjados na sua operação em 48h. Vendas imediatas no piloto automático.</p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3 text-sm text-slate-300 font-medium"><ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" /> Agente Qualificador BDR que responde em 3s</li>
                            <li className="flex gap-3 text-sm text-slate-300 font-medium"><Zap className="w-5 h-5 text-emerald-500 shrink-0" /> Onboarding em apenas 48 Horas (TTFV)</li>
                            <li className="flex gap-3 text-sm text-slate-300 font-medium"><Server className="w-5 h-5 text-emerald-500 shrink-0" /> Dashboard Cockpit com calculadoras de ROI reais</li>
                            <li className="flex gap-3 text-sm text-emerald-400 font-bold"><TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" /> Elimine gargalos. Triplique seu funil.</li>
                        </ul>
                        <Link href="/apply" className="block w-full">
                            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-lg rounded-xl transition-all hover:scale-[1.02] uppercase tracking-wide">
                                Integrar SinergIA Agora
                            </Button>
                        </Link>
                    </div>

                    {/* TIER 3: Enterprise */}
                    <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 relative opacity-90">
                        <div className="text-slate-400 font-bold mb-2">Operação Enterprise B2B</div>
                        <div className="text-3xl font-black text-white mb-4">R$ 50k - R$ 100k<span className="text-sm font-normal text-slate-500"> /setup</span></div>
                        <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-white/5">Para corporações que desejam internalizar as automações ou fazer parcerias de Equity.</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>Fine-tuning próprio e exclusivo</li>
                            <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>In-house squads</li>
                            <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>Onboarding Customizado em 30 Dias</li>
                        </ul>
                         <Link href="/apply" className="block w-full mt-4">
                            <Button variant="outline" className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl">
                                Contatar Diretoria
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
