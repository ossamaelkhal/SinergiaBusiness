'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Sliders, Database, Server, ArrowRight, ShieldCheck, ShieldAlert, Info, Heart, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SinergiaPricingOSProps {
  nicheColor?: string;
  nicheSlug?: string;
}

const colorMaps: Record<string, {
  text: string;
  bg: string;
  border: string;
  glow: string;
  accent: string;
  sliderTrack: string;
  badge: string;
  btnHover: string;
}> = {
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'from-emerald-500/10 to-transparent',
    accent: 'emerald-500',
    sliderTrack: 'bg-emerald-500',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    btnHover: 'hover:bg-emerald-500/95 shadow-[0_0_25px_rgba(16,185,129,0.25)]'
  },
  indigo: {
    text: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    glow: 'from-indigo-500/10 to-transparent',
    accent: 'indigo-500',
    sliderTrack: 'bg-indigo-500',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    btnHover: 'hover:bg-indigo-500/95 shadow-[0_0_25px_rgba(99,102,241,0.25)]'
  },
  fuchsia: {
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/20',
    glow: 'from-fuchsia-500/10 to-transparent',
    accent: 'fuchsia-500',
    sliderTrack: 'bg-fuchsia-500',
    badge: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    btnHover: 'hover:bg-fuchsia-500/95 shadow-[0_0_25px_rgba(217,70,239,0.25)]'
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'from-amber-500/10 to-transparent',
    accent: 'amber-500',
    sliderTrack: 'bg-amber-500',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    btnHover: 'hover:bg-amber-500/95 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
  },
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'from-cyan-500/10 to-transparent',
    accent: 'cyan-500',
    sliderTrack: 'bg-cyan-500',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    btnHover: 'hover:bg-cyan-500/95 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
  },
  rose: {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    glow: 'from-rose-500/10 to-transparent',
    accent: 'rose-500',
    sliderTrack: 'bg-rose-500',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    btnHover: 'hover:bg-rose-500/95 shadow-[0_0_25px_rgba(225,29,72,0.25)]'
  }
};

const repetitiveTasks = [
  { id: 'redigitacao-notas', name: 'Redigitação de Notas no ERP', hours: 8, emotional: 'Crítico' },
  { id: 'triagem-chats', name: 'Triagem Manual de Chats (WhatsApp)', hours: 12, emotional: 'Médio' },
  { id: 'conciliacao-comprovantes', name: 'Conciliação de Comprovantes', hours: 6, emotional: 'Crítico' },
  { id: 'crm-leads', name: 'Alimentação de Planilhas e CRM', hours: 5, emotional: 'Médio' },
  { id: 'auditoria-notas', name: 'Auditoria Manual de Notas de Entrada', hours: 10, emotional: 'Crítico' }
];

export default function SinergiaPricingOS({ nicheColor = 'emerald', nicheSlug = '' }: SinergiaPricingOSProps) {
  const [slots, setSlots] = useState(2);
  const [stackLevel, setStackLevel] = useState<1 | 2 | 3>(2);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([
    'redigitacao-notas',
    'triagem-chats'
  ]);

  const colors = colorMaps[nicheColor] || colorMaps.emerald;

  // Parâmetros de precificação rígidos do SinergIA OS
  const platformFee = 1500;
  const pricePerSlot = 1200;
  
  const setupCosts: Record<1 | 2 | 3, number> = {
    1: 3000,
    2: 12000,
    3: 35000
  };

  const monthlyTotal = platformFee + (slots * pricePerSlot);
  const setupTotal = setupCosts[stackLevel];

  const handleToggleTask = (taskId: string) => {
    setSelectedTasks(prev => {
      const next = prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId];
      
      // Ajusta dinamicamente a quantidade de slots recomendados com base nas tarefas selecionadas
      if (next.length > 0) {
        setSlots(Math.max(1, next.length));
      }
      return next;
    });
  };

  // Cálculo das Horas de Propósito Recuperadas
  const baseWeeklyHours = repetitiveTasks
    .filter(t => selectedTasks.includes(t.id))
    .reduce((sum, t) => sum + t.hours, 0);

  // Mapeamento de Custo Emocional (reduz conforme ativamos slots para cobrir as tarefas)
  const coverageRatio = selectedTasks.length > 0 ? Math.min(1, slots / selectedTasks.length) : 1;
  const emotionalCost = Math.max(0, 100 - Math.round(coverageRatio * 100));

  // Determinar cores da barra de progresso do custo emocional
  let progressColor = 'bg-rose-500';
  let progressLabel = 'Carga Braçal Extrema / Sugadores de Alma';
  let labelColor = 'text-rose-400';

  if (emotionalCost <= 60 && emotionalCost > 15) {
    progressColor = 'bg-amber-500';
    progressLabel = 'Mitigação Límbica / Transição Operacional';
    labelColor = 'text-amber-400';
  } else if (emotionalCost <= 15) {
    progressColor = 'bg-emerald-500';
    progressLabel = 'Capital Intelectual Liberado / Emancipação';
    labelColor = 'text-emerald-400';
  }

  return (
    <section id="pricing-section" className="border-t border-white/5 py-24 bg-slate-900/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b ${colors.glow} opacity-20 rounded-full blur-[120px] pointer-events-none`} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 ${colors.text} font-bold uppercase tracking-widest`}>
            Alocação de Consciência
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">
            Simulador de Emancipação Cognitiva
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed font-light">
            Monetização consciente baseada em consumo de capacidade ativa e remoção de custos emocionais. Mapeie a carga operacional e veja o impacto humano em tempo real.
          </p>
        </div>

        {/* Layout Principal: 2 Colunas */}
        <div className="grid lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-stretch">
          
          {/* Lado Esquerdo: Simulador de Parâmetros (Lg: Col-span 7) */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
            <div className="space-y-8">
              
              {/* Seção A: Tarefas Repetitivas / Engessadas */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
                    1. Mapeamento de Carga Braçal
                  </h3>
                  <p className="text-xs text-slate-400 font-light">Selecione as tarefas operacionais que atualmente drenam o propósito do seu time:</p>
                </div>

                <div className="space-y-2.5">
                  {repetitiveTasks.map((task) => {
                    const isChecked = selectedTasks.includes(task.id);
                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => handleToggleTask(task.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                          isChecked 
                            ? 'bg-slate-900 border-white/15 text-white' 
                            : 'bg-slate-950/40 border-white/5 text-slate-500 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isChecked ? (
                            <CheckSquare className={`w-5 h-5 ${colors.text}`} />
                          ) : (
                            <Square className="w-5 h-5 text-slate-700" />
                          )}
                          <div>
                            <span className="text-xs font-bold block">{task.name}</span>
                            <span className="text-[10px] text-slate-500 font-light">Custo Emocional: <strong className={task.emotional === 'Crítico' ? 'text-rose-400' : 'text-slate-400'}>{task.emotional}</strong></span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold">{task.hours}h/sem</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seção B: Quantidade de Slots */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-indigo-400" />
                      2. Slots de Agentes Cognitivos
                    </h3>
                    <p className="text-xs text-slate-400 font-light">Quantidade de fluxos ou rotinas ativas em paralelo assumindo o trabalho braçal.</p>
                  </div>
                  <span className={`text-2xl font-black ${colors.text} bg-white/5 px-4 py-1 border border-white/10 rounded-xl`}>
                    {slots} {slots === 1 ? 'Slot' : 'Slots'}
                  </span>
                </div>
                
                <div className="relative pt-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={slots}
                    onChange={(e) => setSlots(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, #34d399 0%, #34d399 ${(slots - 1) * 11.1}%, #1e293b ${(slots - 1) * 11.1}%, #1e293b 100%)`
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest pt-2">
                    <span>1 Agente</span>
                    <span>5 Agentes</span>
                    <span>10 Agentes</span>
                  </div>
                </div>
              </div>

              {/* Seção C: Mapeamento de Custo Emocional & Progresso */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Mapeamento de Custo Emocional</span>
                  <span className={`font-bold uppercase tracking-wide text-[10px] ${labelColor}`}>
                    {progressLabel} ({emotionalCost}%)
                  </span>
                </div>
                
                <div className="h-3 w-full bg-slate-950/60 border border-white/5 rounded-full overflow-hidden relative">
                  <div 
                    className={`h-full transition-all duration-500 ease-out ${progressColor}`} 
                    style={{ width: `${emotionalCost}%` }}
                  />
                </div>
              </div>

              {/* Seção D: Complexidade da Stack */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-indigo-400" />
                    3. Complexidade Sistêmica (Setup)
                  </h3>
                  <p className="text-xs text-slate-400 font-light">Complexidade técnica dos seus sistemas atuais para integração da IA.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-1">
                  
                  {/* Nível 1 */}
                  <button
                    type="button"
                    onClick={() => setStackLevel(1)}
                    className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      stackLevel === 1 
                        ? `bg-slate-900 border-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.15)]` 
                        : 'bg-slate-950/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        stackLevel === 1 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-900 text-slate-400'
                      }`}>
                        Nível 1
                      </span>
                      <h4 className="text-xs font-bold text-white">SaaS Nativo</h4>
                      <p className="text-[10px] text-slate-500 font-light leading-relaxed">Shopify, Bling, HubSpot, etc.</p>
                    </div>
                    <span className="text-xs font-bold text-slate-300 mt-4 block">R$ 3.000 <span className="text-[9px] text-slate-600 font-normal">setup</span></span>
                  </button>

                  {/* Nível 2 */}
                  <button
                    type="button"
                    onClick={() => setStackLevel(2)}
                    className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      stackLevel === 2 
                        ? `bg-slate-900 border-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.15)]` 
                        : 'bg-slate-950/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        stackLevel === 2 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-900 text-slate-400'
                      }`}>
                        Nível 2
                      </span>
                      <h4 className="text-xs font-bold text-white">Sistemas Múltiplos</h4>
                      <p className="text-[10px] text-slate-500 font-light leading-relaxed">Salesforce, Pipefy, ActiveCampaign.</p>
                    </div>
                    <span className="text-xs font-bold text-slate-300 mt-4 block">R$ 12.000 <span className="text-[9px] text-slate-600 font-normal">setup</span></span>
                  </button>

                  {/* Nível 3 */}
                  <button
                    type="button"
                    onClick={() => setStackLevel(3)}
                    className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      stackLevel === 3 
                        ? `bg-slate-900 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.1)]` 
                        : 'bg-slate-950/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        stackLevel === 3 ? 'bg-red-500/20 text-red-300' : 'bg-slate-900 text-slate-400'
                      }`}>
                        Nível 3
                      </span>
                      <h4 className="text-xs font-bold text-white">Legado / Corp</h4>
                      <p className="text-[10px] text-slate-500 font-light leading-relaxed">TOTVS, SAP, Senior, Portais SEFAZ.</p>
                    </div>
                    <span className="text-xs font-bold text-slate-300 mt-4 block">R$ 35.000 <span className="text-[9px] text-slate-600 font-normal">setup</span></span>
                  </button>

                </div>
              </div>

            </div>

            {/* Avisos Dinâmicos de Governança */}
            <div className="mt-8 pt-6 border-t border-white/5">
              {stackLevel === 3 ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 text-xs text-red-400">
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-1">
                    <span className="font-bold block uppercase tracking-wider text-[10px]">🚨 Homologação Concierge Obrigatória</span>
                    <p className="leading-relaxed font-light">Projetos que envolvem integrações do Nível 3 (SAP/TOTVS/SEFAZ) possuem trava de segurança e exigem avaliação técnica C-Level e SLA sob medida antes da ativação da licença.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 flex gap-3 text-xs text-slate-400">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block text-slate-300 uppercase tracking-wider text-[10px]">✓ Fluxo Online Autorizado</span>
                    <p className="leading-relaxed font-light">O setup da stack selecionada está apto para faturamento imediato via Pix e início da implementação em até 48h após a conclusão do diagnóstico.</p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Lado Direito: Laudo de Faturamento e Conversão (Lg: Col-span 5) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between shadow-2xl relative">
            <div className="space-y-8">
              
              <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <Server className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Demonstrativo de Impacto</h3>
              </div>

              {/* Contadores de Impacto Humano */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 text-center">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Propósito Recuperado</span>
                  <div className="text-xl md:text-2xl font-black text-emerald-400 font-mono mt-1">
                    {baseWeeklyHours}h<span className="text-[10px] font-normal text-slate-500">/sem</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-light block mt-0.5">Time focado em estratégia</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Impacto Mensal</span>
                  <div className="text-xl md:text-2xl font-black text-indigo-400 font-mono mt-1">
                    {baseWeeklyHours * 4}h<span className="text-[10px] font-normal text-slate-500">/mês</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-light block mt-0.5">Horas libertadas de burocracia</span>
                </div>
              </div>

              {/* Tabela de Preço Dinâmica */}
              <div className="space-y-4">
                
                {/* Linha 1: Platform Fee */}
                <div className="flex justify-between items-center text-sm py-2">
                  <div className="space-y-0.5">
                    <span className="text-white font-medium">Platform Fee (SinergIA Core)</span>
                    <span className="text-[10px] text-slate-500 block">Licença base do sistema operacional autônomo</span>
                  </div>
                  <span className="text-white font-bold">R$ 1.500<span className="text-xs text-slate-500 font-normal">/mês</span></span>
                </div>

                {/* Linha 2: Slots */}
                <div className="flex justify-between items-center text-sm py-2 border-t border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-white font-medium">Slots de Agentes ({slots} ativos)</span>
                    <span className="text-[10px] text-slate-500 block">{slots}x R$ 1.200 por slot recorrente</span>
                  </div>
                  <span className="text-white font-bold">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(slots * pricePerSlot)}
                    <span className="text-xs text-slate-500 font-normal">/mês</span>
                  </span>
                </div>

                {/* Linha 3: Total Recorrência */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-6 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="text-white font-black text-xs uppercase tracking-widest">Recorrência Estimada</span>
                    <span className="text-[9px] text-slate-400 block font-light">Faturamento mensal sob licença ativa</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-black ${colors.text}`}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(monthlyTotal)}
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">/mês</span>
                  </div>
                </div>

                {/* Linha 4: Setup Fee Upfront */}
                <div className="flex justify-between items-center text-sm py-3 border-t border-white/5 mt-4">
                  <div className="space-y-0.5">
                    <span className="text-white font-medium">Taxa de Setup Upfront</span>
                    <span className="text-[10px] text-slate-500 block">Complexidade da Stack: Nível {stackLevel}</span>
                  </div>
                  <span className="text-white font-black text-lg">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(setupTotal)}
                  </span>
                </div>

              </div>

              {/* Informações de Soberania */}
              <div className="bg-slate-950/60 border border-white/5 rounded-xl p-4 space-y-2.5">
                <div className="flex gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest items-center">
                  <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  Soberania de Processamento
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed font-light">
                  Diferente de SaaS tradicionais que cobram margem sobre dados, toda a requisição de API (OpenAI/Anthropic) roda nas chaves do cliente. A SinergIA cobra estritamente pelo licenciamento dos slots e manutenção do core.
                </p>
              </div>

            </div>

            {/* CTA Final de Conversão */}
            <div className="pt-8 mt-8 border-t border-white/5">
              <Link href={`/apply?nicho=${nicheSlug}&slots=${slots}&setup=${stackLevel}`} className="block w-full">
                <Button className={`w-full h-14 bg-emerald-500 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs transition-all ${colors.btnHover}`}>
                  Ativar Blueprint e Diagnóstico
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-500 pt-3 uppercase tracking-wider font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Auditoria de Fricção e Preços Homologada
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
