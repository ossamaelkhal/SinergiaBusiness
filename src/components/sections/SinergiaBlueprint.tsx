'use client';

import React from 'react';
import { Target, Zap, Building, LineChart, ArrowDown } from 'lucide-react';

export default function SinergiaBlueprint() {
  const steps = [
    {
      icon: <Target className="w-6 h-6 text-rose-500" />,
      title: "1. O Mapeamento (Conectar Pontos)",
      desc: "Analisamos seu fluxo de trabalho atual para identificar gargalos manuais, mensagens perdidas e lentidões operacionais.",
      color: "border-rose-500/30 bg-rose-500/5",
      line: "from-rose-500/50 to-amber-500/50"
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "2. A Montagem (Módulos Inteligentes)",
      desc: "Selecionamos e customizamos os módulos de atendimento e backoffice ideais para as necessidades específicas da sua empresa.",
      color: "border-amber-500/30 bg-amber-500/5",
      line: "from-amber-500/50 to-emerald-500/50"
    },
    {
      icon: <Building className="w-6 h-6 text-emerald-500" />,
      title: "3. A Orquestração (Integração Direta)",
      desc: "Conectamos as soluções diretamente nos canais e sistemas que você já usa hoje (WhatsApp, e-mail, agendas e ERPs).",
      color: "border-emerald-500/30 bg-emerald-500/5",
      line: "from-emerald-500/50 to-cyan-500/50"
    },
    {
      icon: <LineChart className="w-6 h-6 text-cyan-500" />,
      title: "4. A Evolução (Melhoria Contínua)",
      desc: "Seus sistemas são otimizados constantemente a partir dos dados gerados, aumentando o retorno comercial dia após dia.",
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
            Sem termos técnicos difíceis ou promessas vazias. Aqui está o mapa exato de como estruturamos a sua operação em 4 passos simples:
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
