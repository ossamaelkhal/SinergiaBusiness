'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, ChevronRight, Fingerprint, ShieldCheck } from 'lucide-react'

// Section Components
import Hero from '@/components/sections/Hero'
import SinergiaAudit from '@/components/sections/SinergiaAudit'
import SinergiaBlueprint from '@/components/sections/SinergiaBlueprint'
import SinergiaSonar from '@/components/features/sonar/SinergiaSonar'
import MultiAgentFleet from '@/components/features/fleet/MultiAgentFleet'
import SinergiaOS from '@/components/sections/SinergiaOS'
import Features from '@/components/sections/Features'
import NicheSolutions from '@/components/sections/NicheSolutions'
import { ROICalculator as ROICalculatorSection } from '@/components/sections/ROICalculator'
import SinergiaGenesis from '@/components/sections/SinergiaGenesis'
import SinergiaCosmos from '@/components/sections/SinergiaCosmos'
import SinergiaNexus from '@/components/sections/SinergiaNexus'
import AuraAcademy from '@/components/sections/AuraAcademy'
import Demos from '@/components/sections/Demos'
import SinergiaFAQ from '@/components/sections/SinergiaFAQ'
import CTA from '@/components/sections/CTA'

import SalesGamification from '@/components/features/gamification/SalesGamification'
import FlowBuilder from '@/components/features/flow-simulator/FlowBuilder'
import FlowDemo from '@/components/features/flow-simulator/FlowDemo'
import SalesSimulator from '@/components/features/training/SalesSimulator'

export default function LandingPage() {
    const [showGamification, setShowGamification] = useState(false)
    const [showBuilder, setShowBuilder] = useState(false)
    const [showFlowDemo, setShowFlowDemo] = useState(false)
    const [showSimulator, setShowSimulator] = useState(false)

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
            <main className="flex-1 w-full bg-slate-950">
                <Hero onDemoClick={() => setShowFlowDemo(true)} />
                
                {/* 1. O Gatilho da Dor (FOMO) */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <SinergiaAudit />

                {/* 2. O Mapa da Solução (Leigo) */}
                <SinergiaBlueprint />

                {/* 3. A Execução do Mapa (Passo a Passo Visual) */}
                <SinergiaSonar />
                <MultiAgentFleet />
                <SinergiaOS />
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent my-10" />

                {/* 4. A Prova Técnica e de Nicho */}
                <Features />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />
                <NicheSolutions />

                {/* 5. A Prova Financeira */}
                <ROICalculatorSection />

                {/* 6. A Visão de Futuro e Expansão */}
                <SinergiaGenesis />
                <SinergiaCosmos />
                <SinergiaNexus />
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent my-10" />
                <AuraAcademy />

                {/* 7. O Playground Interativo (Para quem quer testar antes de comprar) */}
                <Demos
                    onFlowClick={() => setShowFlowDemo(true)}
                    onBuilderClick={() => setShowBuilder(true)}
                    onGamificationClick={() => setShowGamification(true)}
                    onSimulatorClick={() => setShowSimulator(true)}
                />

                {/* 8. Quebra de Objeções (Obrigatório em High-Ticket) */}
                <SinergiaFAQ />

                {/* 9. O Fechamento */}
                <CTA />
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
                            Ecossistema B2B focado em orquestração de IA. Escalamos receitas, cortamos custos e conectamos parceiros via telemetria autônoma.
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg w-max mt-4">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold text-slate-300">Infraestrutura Blindada (SSL/TLS)</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Plataforma</h4>
                        <ul className="space-y-4">
                            <li><Link href="/solutions" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Soluções por Nicho</Link></li>
                            <li><Link href="/checkout" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Ver Planos & Preços</Link></li>
                            <li><Link href="/login" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Acessar Plataforma</Link></li>
                            <li><Link href="/blog" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Blog & Insights</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Empresa & Partners</h4>
                        <ul className="space-y-4">
                            <li><Link href="/partners" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Programa de Parceiros</Link></li>
                            <li><Link href="/partners" className="text-sm flex items-center gap-2 group text-slate-400 hover:text-emerald-400 transition-colors"><ChevronRight className="w-3 h-3 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Hub de Afiliados <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold rounded uppercase">Vagas</span></Link></li>
                            <li><Link href="/signup" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" /> Criar Conta</Link></li>
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

            {/* Modals */}
            {showGamification && <SalesGamification onClose={() => setShowGamification(false)} />}
            {showBuilder && <FlowBuilder onClose={() => setShowBuilder(false)} />}
            {showFlowDemo && <FlowDemo isOpen={showFlowDemo} onClose={() => setShowFlowDemo(false)} />}
            {showSimulator && <SalesSimulator isOpen={showSimulator} onClose={() => setShowSimulator(false)} />}
        </div>
    )
}
