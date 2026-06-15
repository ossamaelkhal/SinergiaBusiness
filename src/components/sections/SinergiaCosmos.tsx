'use client';

import React, { useState } from 'react';
import { Rocket, Globe, Compass, Network, ArrowRight, Sparkles, Cpu, Radio, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SinergiaCosmos() {
  const [activeTab, setActiveTab] = useState<'rocket' | 'pioneer' | 'galaxy'>('rocket');

  const systems = {
    rocket: {
      title: "SinergiaAceleração",
      codename: "Atração e Sintonia Inteligente",
      tag: "A ACELERAÇÃO",
      description: "O SinergiaAceleração é um motor de atração autônomo que interage de forma genuína. Ele estuda o cenário de potenciais parceiros ideais e estabelece conexões no WhatsApp, E-mail e LinkedIn de forma ultra-personalizada, conduzindo diálogos baseados em valor real e direcionando oportunidades qualificadas para a sua equipe comercial.",
      metrics: [
        { label: "Volume de Contatos/Dia", value: "Até 10k" },
        { label: "Otimização de Mensagens", value: "Análise de Sentimento" },
        { label: "Redução de Fricção", value: "Até 80% no Onboarding" }
      ],
      details: [
        "Estudo de afinidade geográfica e setorial",
        "Detecção de intenções reais de compra",
        "Roteamento ético e integrado para o SinergiaOS"
      ]
    },
    pioneer: {
      title: "SinergiaInovação",
      codename: "Validação Temerária e Incubação",
      tag: "A INOVAÇÃO",
      description: "Desenvolvemos Landing Pages baseadas em empatia, estruturamos os canais de atendimento reativo e começamos a validar novas ofertas de forma inteligente. É a primeira incubadora de novas ideias de negócios operada com suporte total de Inteligência Artificial, ideal para experimentar novos horizontes sem desviar o foco da sua equipe principal.",
      metrics: [
        { label: "Tempo de Lançamento", value: "Sub 2 Horas" },
        { label: "Validação de Demanda", value: "Tempo Real" },
        { label: "Intervenção Manual Inicial", value: "Zero" }
      ],
      details: [
        "Mapeamento de tendências de busca",
        "Geração automática de portais focados em acolhimento",
        "Integração imediata com fluxos de pagamento síncronos"
      ]
    },
    galaxy: {
      title: "SinergiaExpansão",
      codename: "Orquestração Multicultural Global",
      tag: "A EXPANSÃO",
      description: "Expanda a sua presença sem barreiras físicas, culturais ou linguísticas. O SinergiaExpansão gerencia fluxos descentralizados operando em mais de 40 idiomas nativos. Ele adapta as conversas culturalmente em tempo real, gerencia variações regulatórias locais de privacidade (LGPD/GDPR) e facilita faturamentos cross-border de forma transparente.",
      metrics: [
        { label: "Idiomas Suportados", value: "40+ Nativos" },
        { label: "Conformidade Regulatória", value: "LGPD & GDPR" },
        { label: "Latência Conversacional", value: "< 1.2s" }
      ],
      details: [
        "Tradução e localização de tom por agentes regionais",
        "Mapeamento de gírias e intenções locais por região",
        "Termos contratuais automatizados em multi-moedas"
      ]
    }
  };

  const activeSystem = systems[activeTab];

  return (
    <section id="cosmos" className="w-full py-32 bg-[#020617] relative overflow-hidden border-t border-slate-900">
      {/* Cosmic background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[180px] pointer-events-none mix-blend-screen"></div>
      
      {/* Stars Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm font-black text-cyan-400 mb-6 uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Estágio 2: Expansão Consciente</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black tracking-tight mb-6 text-white leading-tight">
            Expanda Seu Impacto.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400">
              Conecte Novos Horizontes.
            </span>
          </h2>
          <p className="max-w-[800px] mx-auto text-slate-400 font-medium md:text-xl leading-relaxed">
            Com os processos operacionais do SinergiaOS integrados e fluindo com harmonia, o seu time ganha asas para focar na expansão de impacto. Conecte novos públicos, valide ideias inovadoras e expanda sua marca globalmente.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('rocket')}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 transform-gpu will-change-transform ${
              activeTab === 'rocket'
                ? 'bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className={`p-3 rounded-xl ${activeTab === 'rocket' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-400'}`}>
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">Aceleração</div>
              <div className="font-black text-sm">SinergiaAceleração</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('pioneer')}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 transform-gpu will-change-transform ${
              activeTab === 'pioneer'
                ? 'bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border-indigo-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.15)]'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className={`p-3 rounded-xl ${activeTab === 'pioneer' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-900 text-slate-400'}`}>
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">Inovação</div>
              <div className="font-black text-sm">SinergiaInovação</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('galaxy')}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 transform-gpu will-change-transform ${
              activeTab === 'galaxy'
                ? 'bg-gradient-to-r from-violet-500/10 to-pink-500/10 border-violet-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.15)]'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className={`p-3 rounded-xl ${activeTab === 'galaxy' ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-900 text-slate-400'}`}>
              <Network className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">Expansão</div>
              <div className="font-black text-sm">SinergiaExpansão</div>
            </div>
          </button>
        </div>

        {/* System Details Display Panel */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl transform-gpu will-change-transform shadow-[0_0_50px_rgba(99,102,241,0.05)]">
          {/* Decorative glowing panel corner */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent via-cyan-500/5 to-cyan-500/20 blur-xl"></div>
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Description Area */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider">
                {activeSystem.tag}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {activeSystem.title}
                <span className="block text-lg font-medium text-slate-400 mt-2">{activeSystem.codename}</span>
              </h3>
              <p className="text-slate-300 leading-relaxed font-medium text-base">
                {activeSystem.description}
              </p>
              
              <div className="border-t border-slate-900 pt-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Mecanismos do Núcleo
                </h4>
                <ul className="space-y-3">
                  {activeSystem.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 shrink-0"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metrics and Interactive Panel Area */}
            <div className="lg:col-span-5 space-y-6 bg-slate-900/40 border border-white/5 rounded-2xl p-6 relative backdrop-blur-xl transform-gpu will-change-transform">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5" />
                  Conectado à Órbita
                </span>
              </div>
              
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-6">Métricas de Sintonia</h4>
              
              <div className="space-y-6">
                {activeSystem.metrics.map((metric, idx) => (
                  <div key={idx} className="border-b border-slate-800/60 last:border-b-0 pb-4 last:pb-0">
                    <div className="text-xs font-medium text-slate-500 mb-1">{metric.label}</div>
                    <div className="text-2xl font-black text-white bg-clip-text bg-gradient-to-r from-white to-slate-300">{metric.value}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/apply" className="w-full">
                  <Button className="w-full py-6 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 font-bold rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 text-white border-0">
                    <span>Configurar Missão {activeSystem.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
