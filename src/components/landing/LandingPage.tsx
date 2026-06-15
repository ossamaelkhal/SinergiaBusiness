'use client'

import React from 'react'
import Link from 'next/link'
import { Zap, ChevronRight, Fingerprint, ShieldCheck } from 'lucide-react'

// Componentes das Seções Estruturais
import Hero from '@/components/sections/Hero'
import SinergiaBlueprint from '@/components/sections/SinergiaBlueprint' // SinergIA Blueprint
import MultiAgentFleet from '@/components/features/fleet/MultiAgentFleet' // SinergIA Swarm Consciência
import SinergiaOS from '@/components/sections/SinergiaOS' // Os Quatro Pilares da Emancipação Consciente
import SinergiaCosmos from '@/components/sections/SinergiaCosmos' // Expansão Consciente
import SinergiaFAQ from '@/components/sections/SinergiaFAQ' // FAQ e Quebra de Objeções
import CTA from '@/components/sections/CTA' // CTA Dupla (Diagnóstico / Licenciamento)
import SinergiaPricingOS from '@/components/sections/SinergiaPricingOS'

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
            <main className="flex-1 w-full bg-slate-950">
                {/* Hero Mestre */}
                <Hero onDemoClick={() => {
                  const element = document.getElementById('cta-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }} />
                
                {/* Linha separadora */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                {/* 1. SinergIA Blueprint (Mapa da Solução / Arquitetura SinergIA) */}
                <SinergiaBlueprint />

                <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent my-10" />

                {/* 2. SinergIA Swarm Consciência */}
                <MultiAgentFleet />
                
                {/* 3. Os Quatro Pilares da Emancipação Consciente */}
                <SinergiaOS />
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent my-10" />
                
                {/* 4. A Memória RAG e Expansão Consciente */}
                <SinergiaCosmos />

                {/* 5. Simulador de Alocação de Infraestrutura SinergIA OS */}
                <SinergiaPricingOS nicheColor="emerald" />

                {/* 6. Quebra de Objeções (FAQ) */}
                <SinergiaFAQ />

                {/* 7. Fechamento de Duplo Caminho */}
                <div id="cta-section">
                  <CTA />
                </div>
            </main>

            {/* Enterprise Footer */}
            <footer className="w-full border-t border-white/10 bg-slate-950 pt-20 pb-10 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                    <div className="space-y-6">
                        <Link className="flex items-center group" href="/">
                            <Zap className="h-6 w-6 text-emerald-400" />
                            <span className="ml-2 text-2xl font-black text-white">SinergIA</span>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed pr-6">
                            Orquestração de tecnologia com alma e crescimento com consciência. Elevamos a operação de PMEs liberando as pessoas de tarefas repetitivas para focarem no valor estratégico e na criatividade de artesão.
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg w-max mt-4">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold text-slate-300">Infraestrutura Blindada (SSL/TLS)</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Plataforma</h4>
                        <ul className="space-y-4">
                            <li><Link href="/sonar" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Diagnóstico Sonar</Link></li>
                            <li><Link href="/checkout" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Ver Planos & Preços</Link></li>
                            <li><Link href="/login" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Acessar Plataforma</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Empresa & Partners</h4>
                        <ul className="space-y-4">
                            <li><Link href="/partners" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Nexus Partners Hub</Link></li>
                            <li><Link href="/signup?role=partner" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Homologação de Parceiros</Link></li>
                            <li><Link href="mailto:contato@sinergia.business" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Contato Corporativo</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Privacidade & Links</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Termos de Serviço</Link></li>
                            <li><Link href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Política de Privacidade</Link></li>
                            <li><Link href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">LGPD Compliance</Link></li>
                        </ul>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-slate-500 relative z-10">
                    <p>© {new Date().getFullYear()} SinergIA Business. Todos os direitos reservados.</p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <span className="flex items-center gap-1 hover:text-slate-300 cursor-pointer transition-colors"><Fingerprint className="w-4 h-4" /> SSL Secure</span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                        <span className="hover:text-slate-300 cursor-pointer transition-colors">São Paulo, BR</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
