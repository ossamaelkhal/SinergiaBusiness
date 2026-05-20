'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, Users, DollarSign, ArrowRight, Activity, Percent, MessageSquare, Target, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type SolutionType = 'chatbot' | 'scoring' | 'meeting' | 'proposal';

export function ROICalculator() {
  const [leadsPorMes, setLeadsPorMes] = useState(500);
  const [ticketMedio, setTicketMedio] = useState(2500);
  const [taxaConversaoAtual, setTaxaConversaoAtual] = useState(2); // %
  const [activeSolution, setActiveSolution] = useState<SolutionType>('chatbot');

  // Soluções de IA com dados de Benchmarks (Pesquisa 2026)
  const solutions = {
    chatbot: {
      name: 'Agente BDR (Chatbot)',
      icon: <MessageSquare className="w-5 h-5" />,
      multiplier: 2.4,
      desc: 'Atende em 3 segundos. Aumenta a conversão em até 2.4x e corta custos de SDR em 65% (Efeito Cliff evitado).',
      extraImpact: 'Redução de ~65% em custos de SDR'
    },
    scoring: {
      name: 'Lead Scoring Preditivo',
      icon: <Target className="w-5 h-5" />,
      multiplier: 1.75,
      desc: 'Encontra a agulha no palheiro. O Machine Learning aumenta a conversão Lead-to-Opp em 75%.',
      extraImpact: 'Ciclo de vendas 28% mais curto'
    },
    meeting: {
      name: 'Booking Automatizado',
      icon: <Calendar className="w-5 h-5" />,
      multiplier: 3.2,
      desc: 'Agendamento em 1 clique sem atrito. Gera 3.2x mais reuniões agendadas que o fluxo normal.',
      extraImpact: 'Queda de 50% em No-Shows'
    },
    proposal: {
      name: 'Gerador de Propostas IA',
      icon: <FileText className="w-5 h-5" />,
      multiplier: 1.1,
      desc: 'Cria propostas hiper-personalizadas em segundos, aumentando a taxa de fechamento final em 10%.',
      extraImpact: 'Economiza 2.2h/dia por vendedor'
    }
  };

  // Cálculos Atuais
  const clientesAtuais = Math.round(leadsPorMes * (taxaConversaoAtual / 100));
  const receitaAtual = clientesAtuais * ticketMedio;

  // Cálculos SinergIA
  const activeConfig = solutions[activeSolution];
  const taxaConversaoSinergia = Math.min(taxaConversaoAtual * activeConfig.multiplier, 100);
  const clientesSinergia = Math.round(leadsPorMes * (taxaConversaoSinergia / 100));
  const receitaSinergia = clientesSinergia * ticketMedio;

  // Ganhos
  const receitaAdicional = receitaSinergia - receitaAtual;
  const aumentoPercentual = Math.round(((receitaSinergia - receitaAtual) / receitaAtual) * 100) || 0;

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-6">
            <Calculator className="w-4 h-4" />
            Raio-X de Receita Oculta
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Quanto dinheiro seu CRM está <span className="text-emerald-400">queimando?</span>
          </h2>
          <p className="text-slate-400 text-lg">
            A cada 5 minutos de atraso na resposta, a chance de qualificar um lead <strong className="text-white">cai 21 vezes</strong>. 
            Simule o impacto financeiro de implantar soluções autônomas na sua operação B2B.
          </p>
        </div>

        {/* Tabs / Soluções */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
          {(Object.entries(solutions) as [SolutionType, typeof solutions[SolutionType]][]).map(([key, sol]) => (
            <button
              key={key}
              onClick={() => setActiveSolution(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeSolution === key 
                  ? 'bg-emerald-500 text-emerald-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                  : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {sol.icon}
              {sol.name}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls - Left Side */}
          <Card className="lg:col-span-5 bg-slate-900 border-white/5 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-indigo-500"></div>
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-2">
                Simulador de Entradas
              </h3>
              <p className="text-slate-500 text-sm mb-8 border-b border-white/5 pb-4">
                {activeConfig.desc}
              </p>

              <div className="space-y-8">
                {/* Leads Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                       <Users className="w-4 h-4 text-slate-500" />
                       Volume de Leads /mês
                    </label>
                    <span className="text-lg font-black text-indigo-400">{leadsPorMes}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" max="5000" step="50" 
                    value={leadsPorMes} 
                    onChange={(e) => setLeadsPorMes(Number(e.target.value))}
                    className="w-full accent-indigo-500" 
                  />
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>50</span>
                    <span>5.000+</span>
                  </div>
                </div>

                {/* Ticket Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                       <DollarSign className="w-4 h-4 text-slate-500" />
                       Ticket Médio (LTV)
                    </label>
                    <span className="text-lg font-black text-emerald-400">
                      R$ {ticketMedio.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="100" max="25000" step="100" 
                    value={ticketMedio} 
                    onChange={(e) => setTicketMedio(Number(e.target.value))}
                    className="w-full accent-emerald-500" 
                  />
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>R$ 100</span>
                    <span>R$ 25k+</span>
                  </div>
                </div>

                {/* Conversion Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                       <Percent className="w-4 h-4 text-slate-500" />
                       Taxa de Conversão Atual
                    </label>
                    <span className="text-lg font-black text-amber-400">{taxaConversaoAtual}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" max="15" step="0.5" 
                    value={taxaConversaoAtual} 
                    onChange={(e) => setTaxaConversaoAtual(Number(e.target.value))}
                    className="w-full accent-amber-500" 
                  />
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>0.5%</span>
                    <span>15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results - Right Side */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* CURRENT RESULT BOX */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 relative">
                 <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Sua Operação Hoje</div>
                 <div className="space-y-1 mb-6">
                   <div className="text-slate-400 text-sm">Faturamento Mensal</div>
                   <div className="text-3xl font-bold text-white">
                      R$ {receitaAtual.toLocaleString('pt-BR')}
                   </div>
                 </div>
                 <div className="flex items-center gap-2 text-sm">
                   <Users className="w-4 h-4 text-slate-500" />
                   <span className="text-slate-400">Apenas <strong className="text-white">{clientesAtuais} clientes</strong> fechados.</span>
                 </div>
              </div>

              {/* SINERGIA RESULT BOX */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 blur-[30px] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                 <div className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                    Com a SinergIA
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                 </div>
                 <div className="space-y-1 mb-6">
                   <div className="text-slate-300 text-sm">Projeção Mensal Pós-Setup</div>
                   <div className="text-4xl font-black text-white">
                      R$ {receitaSinergia.toLocaleString('pt-BR')}
                   </div>
                 </div>
                 <div className="flex flex-col gap-2 relative z-10">
                   <div className="flex items-center gap-2 text-sm text-emerald-300">
                     <Activity className="w-4 h-4" />
                     Cresce para <strong className="text-white">{clientesSinergia} clientes</strong> fechados.
                   </div>
                   <div className="flex items-center gap-2 text-sm text-emerald-300">
                     <DollarSign className="w-4 h-4" />
                     <strong className="text-white">{activeConfig.extraImpact}</strong>
                   </div>
                 </div>
              </div>

            </div>

            {/* BIG IMPACT BANNER */}
            <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.05)]">
               {/* Pattern overlay */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#34d399 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
               
               <div className="relative z-10 text-center md:text-left">
                  <div className="text-slate-400 font-medium mb-1">Receita Adicional Desbloqueada</div>
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 leading-tight">
                    + R$ {receitaAdicional.toLocaleString('pt-BR')} <span className="text-2xl text-emerald-500/50">/mês</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-500 font-bold tracking-wide uppercase">
                    Crescimento direto de {aumentoPercentual}% no Bottom-Line.
                  </div>
               </div>

               <Button className="relative z-10 bg-white text-slate-950 hover:bg-emerald-400 rounded-xl px-8 h-14 whitespace-nowrap font-black uppercase tracking-wider w-full md:w-auto hover:scale-105 transition-transform duration-300">
                  Resgatar minha Receita
                  <ArrowRight className="w-5 h-5 ml-2" />
               </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
