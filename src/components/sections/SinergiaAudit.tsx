'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRight, Clock, AlertCircle, RefreshCw, DollarSign, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SinergiaAudit() {
  const [leads, setLeads] = useState<number>(100);
  const [delay, setDelay] = useState<string>('30min-4h');
  const [ticket, setTicket] = useState<number>(1000);
  const [calculating, setCalculating] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState<{ leadsLost: number; revenueLeak: number } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    
    // Silent logging/sync for lead qualification insights
    try {
      fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leads,
          delay,
          ticket,
          source: 'SinergiaAudit',
          timestamp: new Date().toISOString()
        })
      }).catch(() => {});
    } catch (e) {}

    setTimeout(() => {
      let dropRatio = 0;
      if (delay === 'sub5m') dropRatio = 0.05; // 5% loss
      else if (delay === '5m-30m') dropRatio = 0.40; // 40% loss
      else if (delay === '30min-4h') dropRatio = 0.75; // 75% loss
      else dropRatio = 0.90; // 90% loss

      const conversionRate = 0.10; // Standard 10% baseline conversion rate
      const leadsLost = Math.round(leads * dropRatio);
      const revenueLeak = Math.round(leadsLost * ticket * conversionRate);

      setResult({ leadsLost, revenueLeak });
      setCalculating(false);
      setCalculated(true);
    }, 1200);
  };

  const handleReset = () => {
    setCalculated(false);
    setResult(null);
  };

  // Strategic recommendation mapping based on inputs
  const getRecommendation = () => {
    if (delay !== 'sub5m') {
      return {
        title: "Recuperação Comercial e Triagem Ativa",
        primary: "Automação de Vendas (Sales Ops)",
        secondary: "Agentes de Atendimento Inteligente",
        desc: "Seus contatos comerciais estão esfriando na fila. Para estancar a perda de receita, a recomendação é estruturar a distribuição de leads via CRM (Sales Ops) associada a assistentes virtuais de atendimento rápido, garantindo resposta em menos de 10 segundos no WhatsApp."
      };
    } else if (leads > 300) {
      return {
        title: "Escala Operacional e Redução de Gargalos",
        primary: "Integração de Sistemas (Workflows)",
        secondary: "Orquestração de Multi-Agentes",
        desc: "Excelente tempo de resposta! Porém, com um volume superior a 300 contatos/mês, sua equipe provavelmente está sobrecarregada com tarefas repetitivas e digitação manual. A prioridade é automatizar fluxos de dados internos (Workflows) e implementar robôs coordenados de backoffice."
      };
    } else {
      return {
        title: "Telemetria Estratégica e Roteiro de Crescimento",
        primary: "Dashboards e Monitoramento (BI)",
        secondary: "Consultoria de Maturidade Digital",
        desc: "Seu fluxo comercial inicial está saudável e sob controle. Para crescer de forma sustentável, recomendamos mapear seus números reais em painéis integrados (BI) e realizar uma auditoria de processos para entender qual setor deve ser digitalizado primeiro."
      };
    }
  };

  const rec = getRecommendation();

  return (
    <section className="w-full py-24 bg-slate-950 relative border-y border-white/5 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 mb-6 uppercase tracking-widest">
              <Calculator className="w-4 h-4" />
              <span>Diagnóstico de Eficiência Comercial</span>
           </div>
           <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
              O Custo Invisível da Demora.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                Calcule a perda operacional do seu negócio.
              </span>
           </h2>
           <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Estudos de mercado apontam que contatos respondidos após 5 minutos têm uma queda de até 80% na chance de conversão. Avalie seu cenário atual de forma transparente.
           </p>
        </div>

        {/* Diagnostic Card */}
        <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-xl relative">
            
           {!calculated ? (
             <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Monthly Leads */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Contatos comerciais/mês:
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="block w-full px-4 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold"
                      value={leads}
                      onChange={(e) => setLeads(Math.max(1, parseInt(e.target.value) || 0))}
                      disabled={calculating}
                      required
                    />
                  </div>

                  {/* Average Response Time */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Tempo médio de resposta:
                    </label>
                    <select
                      className="block w-full px-4 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold"
                      value={delay}
                      onChange={(e) => setDelay(e.target.value)}
                      disabled={calculating}
                    >
                      <option value="sub5m">Menos de 5 minutos</option>
                      <option value="5m-30m">De 5 a 30 minutos</option>
                      <option value="30min-4h">De 30 minutos a 4 horas</option>
                      <option value="plus4h">Mais de 4 horas ou outro dia</option>
                    </select>
                  </div>

                  {/* Ticket Medio */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Valor médio por cliente (R$):
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="block w-full px-4 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold"
                      value={ticket}
                      onChange={(e) => setTicket(Math.max(1, parseInt(e.target.value) || 0))}
                      disabled={calculating}
                      required
                    />
                  </div>
                </div>
                
                <Button 
                   type="submit" 
                   disabled={calculating}
                   className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-lg rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all uppercase tracking-widest disabled:opacity-70"
                >
                   {calculating ? (
                      <span className="flex items-center gap-2">
                         <RefreshCw className="w-5 h-5 animate-spin" />
                         Processando métricas...
                      </span>
                   ) : (
                      <span className="flex items-center gap-2">
                         <Calculator className="w-5 h-5" />
                         Calcular Impacto Operacional
                      </span>
                   )}
                </Button>
             </form>
           ) : (
             <div className="animate-in fade-in duration-500">
                <div className="text-center mb-8 border-b border-white/5 pb-8">
                   <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-indigo-400" />
                   </div>
                   <h3 className="text-2xl font-black text-white mb-2">Diagnóstico de Latência Comercial</h3>
                   <p className="text-slate-400 text-sm">Resumo baseado nos parâmetros fornecidos da sua operação comercial</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                   <div className="bg-slate-950 rounded-2xl p-6 border border-white/5">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Contatos Desperdiçados/Mês</div>
                      <div className="text-3xl font-black text-indigo-400 flex items-center gap-2">
                        <TrendingDown className="w-6 h-6 text-rose-500" />
                        {result?.leadsLost} contatos
                      </div>
                      <p className="text-xs text-slate-400 mt-2 font-light">Oportunidades de negócios que perdem interesse devido à demora no primeiro contato comercial.</p>
                   </div>
                   <div className="bg-slate-950 rounded-2xl p-6 border border-white/5">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Vazamento de Receita Estimado/Mês</div>
                      <div className="text-3xl font-black text-emerald-400 flex items-center gap-1">
                        <DollarSign className="w-6 h-6 text-emerald-400 shrink-0" />
                        R$ {result?.revenueLeak.toLocaleString('pt-BR')}
                      </div>
                      <p className="text-xs text-slate-400 mt-2 font-light">Receita não realizada considerando uma taxa básica de fechamento de 10% sobre os leads perdidos.</p>
                   </div>
                </div>

                {/* Dynamic Strategic Recommendation */}
                <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-6 text-left mb-8">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Solução Recomendada: {rec.title}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">{rec.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-white/5">
                    <div className="bg-slate-900 px-4 py-3 rounded-xl border border-white/5 text-xs text-white">
                      <span className="block font-bold text-slate-500 mb-1 uppercase tracking-wider">Módulo Principal</span>
                      {rec.primary}
                    </div>
                    <div className="bg-slate-900 px-4 py-3 rounded-xl border border-white/5 text-xs text-white">
                      <span className="block font-bold text-slate-500 mb-1 uppercase tracking-wider">Módulo de Apoio</span>
                      {rec.secondary}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link href="/apply" className="w-full sm:w-auto">
                     <Button className="w-full h-12 bg-white hover:bg-slate-200 text-slate-950 font-black rounded-xl transition-all uppercase tracking-widest">
                        Falar com Especialista <ArrowRight className="w-4 h-4 ml-2" />
                     </Button>
                   </Link>
                   <Button 
                     variant="outline"
                     onClick={handleReset}
                     className="h-12 border-white/10 bg-slate-950/40 text-slate-300 hover:bg-slate-900 rounded-xl"
                   >
                     Novo Cálculo
                   </Button>
                </div>
             </div>
           )}

        </div>

        {/* Small Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
           <Clock className="w-4 h-4 text-indigo-400" />
           Cálculo baseado em padrões médios de funil de vendas consultivo
        </div>
      </div>
    </section>
  );
}
