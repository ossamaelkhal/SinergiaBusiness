'use client';

import React from 'react';
import { Target, Zap, Building, LineChart, ArrowDown } from 'lucide-react';

export default function SinergiaBlueprint() {
  const steps = [
    {
      icon: <Target className="w-6 h-6 text-rose-500" />,
      title: "1. O Radar (SinergIA Sonar)",
      desc: "Nós não esperamos o cliente vir até você. Nossa I.A. vasculha a internet 24/7 procurando pessoas que precisam do seu serviço agora e alerta nosso sistema.",
      color: "border-rose-500/30 bg-rose-500/5",
      line: "from-rose-500/50 to-amber-500/50"
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "2. O Esquadrão (Multi-Agentes)",
      desc: "Em vez de um atendente humano demorar 2 horas para responder, nossos Agentes Inteligentes abordam o lead na mesma hora, tiram dúvidas, quebram objeções e agendam a reunião.",
      color: "border-amber-500/30 bg-amber-500/5",
      line: "from-amber-500/50 to-emerald-500/50"
    },
    {
      icon: <Building className="w-6 h-6 text-emerald-500" />,
      title: "3. A Operação (SinergIA OS)",
      desc: "Conectamos essa máquina de vendas direto no seu sistema atual (WhatsApp, CRM, Agenda). Tudo funciona sozinho, nos bastidores, como um relógio suíço.",
      color: "border-emerald-500/30 bg-emerald-500/5",
      line: "from-emerald-500/50 to-cyan-500/50"
    },
    {
      icon: <LineChart className="w-6 h-6 text-cyan-500" />,
      title: "4. O Resultado (Evolução Constante)",
      desc: "Você recebe um painel para acompanhar o lucro gerado. E o melhor: nossa I.A. (Genesis) aprende com cada venda e fica mais inteligente a cada dia, sem cobrar hora extra.",
      color: "border-cyan-500/30 bg-cyan-500/5",
      line: "hidden"
    }
  ];

  return (
    <section className="w-full py-20 bg-slate-950 relative border-b border-white/5">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Simple Header for Layman */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-white">
            Como funciona a nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Parceria Estratégica?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Sem jargões técnicos ou falsas promessas. Aqui está o mapa exato de como transformamos o seu negócio em uma máquina autônoma em 4 passos simples:
          </p>
        </div>

        {/* The Blueprint Pipeline */}
        <div className="relative">
          <div className="space-y-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex gap-6 md:gap-8 items-start group">
                
                {/* Connecting Vertical Line */}
                {idx !== steps.length - 1 && (
                  <div className={`absolute left-[27px] top-[60px] bottom-[-40px] w-1 rounded-full bg-gradient-to-b ${step.line} opacity-30`}></div>
                )}

                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-full border-2 ${step.color} flex items-center justify-center shrink-0 backdrop-blur-sm z-10 shadow-lg group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>

                {/* Content Box */}
                <div className={`flex-1 bg-slate-900/50 border ${step.color} rounded-2xl p-6 md:p-8 backdrop-blur-md group-hover:bg-slate-900 transition-colors`}>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* Down Arrow Indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-slate-950 border border-white/10 rounded-full flex items-center justify-center text-slate-500 shadow-xl z-20">
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
