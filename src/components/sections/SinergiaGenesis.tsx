'use client';

import React from 'react';
import { Hexagon, Sparkles, Brain, Workflow, Infinity, Zap, Lock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SinergiaGenesis() {
  return (
    <section className="w-full py-32 bg-[#020617] relative overflow-hidden">
      {/* Galactic Background Effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      {/* Supernova Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - The Genesis Concept */}
        <div className="text-center max-w-4xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-sm font-black text-fuchsia-400 mb-6 uppercase tracking-widest shadow-[0_0_30px_rgba(217,70,239,0.3)]">
            <Infinity className="w-4 h-4" />
            <span>Horizonte Nível 5: Cognitive Autonomy</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black tracking-tight mb-6 text-white leading-tight">
            Não programe as regras.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
              Apenas defina o destino.
            </span>
          </h2>
          <p className="max-w-[800px] mx-auto text-slate-400 leading-relaxed font-medium md:text-xl">
            Apresentamos o <strong>SinergIA Genesis Core</strong>. Enquanto ferramentas comuns exigem que você desenhe fluxos e mapeie gatilhos, o Genesis é o primeiro motor de Cognição B2B. Ele não obedece a regras fixas, ele persegue o lucro autonomamente.
          </p>
        </div>

        {/* The Genesis Visualization */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Neural Core Animation */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
             <div className="absolute inset-0 flex items-center justify-center">
                {/* Orbital Rings */}
                <div className="absolute w-[500px] h-[500px] rounded-full border border-fuchsia-500/20 animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute w-[400px] h-[400px] rounded-full border-t border-r border-indigo-500/40 animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute w-[300px] h-[300px] rounded-full border-b border-l border-cyan-500/60 animate-[spin_10s_linear_infinite]"></div>
                
                {/* The Core */}
                <div className="relative w-48 h-48 bg-slate-950 rounded-full border border-fuchsia-500/50 shadow-[0_0_80px_rgba(217,70,239,0.3)] flex items-center justify-center z-20 group cursor-pointer hover:scale-105 transition-transform duration-500">
                   <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20 animate-pulse"></div>
                   <Brain className="w-20 h-20 text-fuchsia-400 group-hover:text-white transition-colors" />
                   
                   {/* Data Particles emitting from core */}
                   <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-ping"></div>
                   <div className="absolute bottom-0 left-0 w-3 h-3 bg-fuchsia-400 rounded-full shadow-[0_0_15px_#d946ef] animate-ping delay-300"></div>
                </div>

                {/* Satellite Nodes */}
                <div className="absolute w-[400px] h-[400px] animate-[spin_15s_linear_infinite_reverse] pointer-events-none">
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-slate-900 border border-indigo-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                      <Workflow className="w-5 h-5 text-indigo-400 animate-[spin_15s_linear_infinite]" />
                   </div>
                   <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <Eye className="w-5 h-5 text-cyan-400 animate-[spin_15s_linear_infinite]" />
                   </div>
                </div>
             </div>
          </div>

          {/* Right: The Paradigm Shift */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-fuchsia-500/30 transition-colors">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Hexagon className="w-24 h-24 text-fuchsia-500" />
               </div>
               <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-fuchsia-400" />
                  Auto-Geração de Playbooks
               </h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                  O Genesis monitora o mercado. Se uma nova técnica de vendas converte 5% a mais, ele reescreve os roteiros do Agente Interceptador (BDR) automaticamente na calada da noite. Quando você acorda, sua máquina já está operando no novo padrão global.
               </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Hexagon className="w-24 h-24 text-indigo-500" />
               </div>
               <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-indigo-400" />
                  Orquestração Dinâmica
               </h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                  O lead parou de responder no WhatsApp? O Genesis toma a decisão autônoma de mobilizar o Agente Recon para encontrar o LinkedIn desse lead e iniciar um cold touch cross-channel, tudo sem que você aperte um único botão.
               </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Hexagon className="w-24 h-24 text-cyan-500" />
               </div>
               <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-cyan-400" />
                  Soberania de Dados Proprietária
               </h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                  Cada interação que o Genesis realiza treina o SEU modelo privado. Ele não alimenta os algoritmos públicos. A inteligência comercial da sua empresa vira um ativo intangível intransferível e avaliado em milhões.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
