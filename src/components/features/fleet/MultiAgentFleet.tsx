'use client';

import React, { useState, useEffect } from 'react';
import { Crosshair, Shield, Zap, Search, BrainCircuit, Rocket, ArrowRight, CheckCircle2, Lock, FileText, Share2, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MultiAgentFleet() {
  const [activeAgent, setActiveAgent] = useState(0);

  const fleet = [
    {
      id: 'scout',
      role: 'Agente Recon (Prospector)',
      icon: <Search className="w-6 h-6 text-cyan-400" />,
      color: 'cyan',
      bgClass: 'bg-cyan-500/10',
      borderClass: 'border-cyan-500/30',
      glowClass: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]',
      description: 'Voo rasante sobre bancos de dados. Extrai e-mails, raspa perfis de LinkedIn e valida telefones de decisores (C-Levels) antes do ataque.',
      payload: 'Volume de Topo de Funil'
    },
    {
      id: 'awacs',
      role: 'Agente Enriquecedor (Data)',
      icon: <Network className="w-6 h-6 text-fuchsia-400" />,
      color: 'fuchsia',
      bgClass: 'bg-fuchsia-500/10',
      borderClass: 'border-fuchsia-500/30',
      glowClass: 'group-hover:shadow-[0_0_30px_rgba(217,70,239,0.2)]',
      description: 'Enriquece os dados brutos. Descobre o faturamento, a stack de tecnologia (usa WordPress? VTEX?) e mapeia concorrentes do lead na hora.',
      payload: 'Munição de Contexto'
    },
    {
      id: 'apache',
      role: 'Agente Interceptador (BDR)',
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      color: 'amber',
      bgClass: 'bg-amber-500/10',
      borderClass: 'border-amber-500/30',
      glowClass: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]',
      description: 'Engajamento balístico. Dispara o e-mail ou WhatsApp frio, neutraliza objeções como "não tenho orçamento" e qualifica usando framework BANT.',
      payload: 'Agendamentos Quentes'
    },
    {
      id: 'bomber',
      role: 'Agente Fechador (A.E.)',
      icon: <FileText className="w-6 h-6 text-emerald-400" />,
      color: 'emerald',
      bgClass: 'bg-emerald-500/10',
      borderClass: 'border-emerald-500/30',
      glowClass: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
      description: 'Ataque cirúrgico final. Pega todo o contexto da frota, redige contratos personalizados, lança faturas e realiza follow-up até a assinatura digital.',
      payload: 'MRR / Contratos Fechados'
    }
  ];

  // Rotate through active agents to simulate the assembly line passing data
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % fleet.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [fleet.length]);

  return (
    <section className="w-full py-32 bg-[#020617] relative overflow-hidden">
      {/* Flight Deck Background Grid */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#020617] via-transparent to-transparent z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* The Base Commander Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 shadow-xl text-sm font-black text-slate-300 mb-6 uppercase tracking-widest">
              <Rocket className="w-4 h-4 text-rose-500" />
              <span>Base Aérea Multi-Agente (Swarm AI)</span>
           </div>
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white">
              SinergIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Carrier Deck</span>
           </h2>
           <p className="max-w-[800px] mx-auto text-slate-400 leading-relaxed font-medium md:text-xl">
              Uma única IA generalista tem pontos cegos. A nossa resposta? Uma <strong className="text-white">Frota de IAs Especializadas</strong> (Swarm). Cada agente domina uma fase do funil militarmente e transfere a inteligência para o próximo veículo através de memória compartilhada.
           </p>
        </div>

        {/* The Carrier Deck Visualization */}
        <div className="relative mb-24">
           {/* Connecting Line underneath */}
           <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 hidden lg:block rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-amber-500 to-emerald-500 w-1/4 animate-[pulse_2s_ease-in-out_infinite]" 
                   style={{ transform: `translateX(${activeAgent * 100}%)`, transition: 'transform 0.5s ease' }}></div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {fleet.map((agent, idx) => {
                 const isActive = idx === activeAgent;
                 return (
                    <div key={agent.id} 
                         className={`relative p-8 rounded-3xl border transition-all duration-700 group backdrop-blur-md cursor-pointer
                         ${isActive ? `bg-slate-900 border-${agent.color}-500/50 shadow-[0_0_40px_rgba(var(--${agent.color}-500),0.15)] scale-105 z-10` : 'bg-slate-950/50 border-white/5 hover:border-white/10 scale-95 opacity-60'}`}
                         onClick={() => setActiveAgent(idx)}
                    >
                       {/* Activity indicator dot */}
                       {isActive && (
                         <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full bg-${agent.color}-500 animate-ping`}></div>
                       )}

                       <div className="flex flex-col h-full">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 ${isActive ? `${agent.bgClass} ${agent.borderClass}` : 'bg-slate-900 border-white/10 grayscale'}`}>
                             {agent.icon}
                          </div>
                          
                          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Unidade Tática 0{idx + 1}</div>
                          <h3 className={`text-xl font-black mb-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                             {agent.role}
                          </h3>
                          
                          <p className={`text-sm leading-relaxed mb-8 flex-1 transition-colors ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
                             {agent.description}
                          </p>
                          
                          <div className="pt-4 border-t border-white/10 mt-auto">
                             <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Carga Útil Entregue:</div>
                             <div className={`text-sm font-bold ${isActive ? `text-${agent.color}-400` : 'text-slate-600'}`}>
                                {agent.payload}
                             </div>
                          </div>
                       </div>
                    </div>
                 );
              })}
           </div>
        </div>

        {/* Global Memory / Command Center */}
        <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-1 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-transparent to-emerald-500/20 opacity-50"></div>
           
           <div className="bg-[#020617] rounded-[22px] p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                 <h3 className="text-2xl font-black text-white mb-3 flex items-center gap-3">
                    <BrainCircuit className="w-8 h-8 text-rose-500" />
                    Cérebro Central Compartilhado (Memória RAG)
                 </h3>
                 <p className="text-slate-400">
                    O Recon não apenas acha o Lead. Ele joga os dados no Cérebro Central. O Interceptador lê isso antes de dar bom dia. O Fechador já sabe das objeções que o Interceptador venceu. Eles operam em <strong className="text-white">sinergia total e instantânea</strong>.
                 </p>
              </div>
              <div className="shrink-0 flex gap-4">
                 <div className="flex -space-x-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#020617] bg-cyan-900 flex items-center justify-center text-cyan-400 font-bold z-40 shadow-lg">01</div>
                    <div className="w-12 h-12 rounded-full border-2 border-[#020617] bg-fuchsia-900 flex items-center justify-center text-fuchsia-400 font-bold z-30 shadow-lg">02</div>
                    <div className="w-12 h-12 rounded-full border-2 border-[#020617] bg-amber-900 flex items-center justify-center text-amber-400 font-bold z-20 shadow-lg">03</div>
                    <div className="w-12 h-12 rounded-full border-2 border-[#020617] bg-emerald-900 flex items-center justify-center text-emerald-400 font-bold z-10 shadow-lg">04</div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
