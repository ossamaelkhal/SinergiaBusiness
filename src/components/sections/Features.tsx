'use client'

import React from 'react'
import { Zap, Shield, TrendingUp, Layers, Lock, CheckCircle2, Sparkles } from 'lucide-react'

export default function Features() {
    return (
        <section id="features" className="w-full py-24 bg-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 -ml-64" />
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 -mr-64" />
            
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Left Column - The Value Narrative */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5">
                            <Sparkles className="h-4 w-4 text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
                                Nossos Diferenciais
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                            Eficiência Desenhada para <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                                Resultados Reais
                            </span>
                        </h2>
                        <p className="max-w-[500px] text-slate-400 text-lg leading-relaxed font-medium">
                            Não criamos sistemas difíceis ou complicados. Nossas soluções se integram silenciosamente nos seus canais atuais para reduzir gargalos e otimizar o tempo da sua equipe.
                        </p>
                        
                        <ul className="space-y-4 pt-4 border-t border-white/10">
                            <li className="flex items-center gap-3 text-slate-300 font-bold">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 
                                Integração sem interromper sua rotina.
                            </li>
                            <li className="flex items-center gap-3 text-slate-300 font-bold">
                                <CheckCircle2 className="w-5 h-5 text-indigo-500" /> 
                                Monitoramento constante e ajustes automáticos.
                            </li>
                        </ul>
                    </div>

                    {/* Right Column - Bento Box */}
                    <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                        
                        {/* Box 1: Modularity */}
                        <div className="flex flex-col space-y-4 p-8 rounded-3xl border border-white/5 bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500/30 transition-all group backdrop-blur-xl">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                <Layers className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-white mb-2">Modularidade sob Medida</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Adote as soluções em blocos de acordo com a necessidade atual do seu negócio. Expanda a automação conforme sua operação cresce.
                                </p>
                            </div>
                        </div>

                        {/* Box 2: Security (offset) */}
                        <div className="flex flex-col space-y-4 p-8 rounded-3xl border border-white/5 bg-slate-900/50 hover:bg-slate-900 hover:border-indigo-500/30 transition-all group lg:translate-y-8 backdrop-blur-xl">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                                <Lock className="h-6 w-6 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-white mb-2">Segurança e Privacidade</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Todos os dados, históricos e negociações pertencem exclusivamente à sua empresa. Processamento em conformidade total com as leis vigentes de proteção.
                                </p>
                            </div>
                        </div>

                        {/* Box 3: ROI focus */}
                        <div className="flex flex-col space-y-4 p-8 rounded-3xl border border-white/5 bg-slate-900/50 hover:bg-slate-900 hover:border-teal-500/30 transition-all group backdrop-blur-xl">
                            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 group-hover:scale-110 transition-transform">
                                <TrendingUp className="h-6 w-6 text-teal-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-white mb-2">Foco no Retorno Comercial</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Desenvolvemos fluxos especificamente voltados para reaver faturamento estagnado, diminuir despesas operacionais e evitar desperdício de contatos.
                                </p>
                            </div>
                        </div>

                        {/* Box 4: Simplicity (offset) */}
                        <div className="flex flex-col space-y-4 p-8 rounded-3xl border border-white/5 bg-slate-900/50 hover:bg-slate-900 hover:border-cyan-500/30 transition-all group lg:translate-y-8 backdrop-blur-xl">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                                <Zap className="h-6 w-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-white mb-2">Facilidade de Uso</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Não exigimos treinamentos complexos ou adaptação a novos softwares difíceis. Nossas soluções rodam diretamente no WhatsApp e e-mail da equipe.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
