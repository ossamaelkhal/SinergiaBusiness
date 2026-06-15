'use client';

import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Layers, 
  Link2, 
  Key, 
  Users, 
  ArrowUpRight, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  Building,
  Calculator,
  Sparkles,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SinergiaNexus() {
  // Simulator States
  const [level, setLevel] = useState<1 | 2 | 3>(1); // Nível 1, 2 ou 3
  const [closedPerMonth, setClosedPerMonth] = useState(2); // Novos contratos / mês (0 a 10)
  const [activeClients, setActiveClients] = useState(5); // Clientes ativos (0 a 50)
  const [avgSlots, setAvgSlots] = useState(3); // Média de slots alocados (1 a 10)

  // Commission Calculations based on Split 70/30 and Tier LTV
  const calculationResult = useMemo(() => {
    let setupFee = 3000;
    let setupCommission = 900; // 30% repassado ao parceiro (70% retidos)
    let ltvPercentage = 10; // 10% comissão recorrente
    let tierName = 'SaaS Nativo (Nível 1)';

    if (level === 2) {
      setupFee = 12000;
      setupCommission = 3600;
      ltvPercentage = 12;
      tierName = 'Integrações Híbridas (Nível 2)';
    } else if (level === 3) {
      setupFee = 35000;
      setupCommission = 10500;
      ltvPercentage = 15;
      tierName = 'Legado & SEFAZ (Nível 3)';
    }

    // Upfront Setup comission
    const monthlyUpfrontEarnings = closedPerMonth * setupCommission;

    // LTV Recorrente Mensal: (Platform Fee R$ 1.500 + R$ 1.200 por slot) * ltvPercentage%
    const clientMonthlyPrice = 1500 + (avgSlots * 1200);
    const clientMonthlyActiveMRR = activeClients * clientMonthlyPrice;
    const monthlyRecurringCommission = clientMonthlyActiveMRR * (ltvPercentage / 100);

    const totalMonthlyRevenue = monthlyUpfrontEarnings + monthlyRecurringCommission;

    return {
      tierName,
      setupFee,
      setupCommission,
      ltvPercentage,
      monthlyUpfrontEarnings,
      monthlyRecurringCommission,
      totalMonthlyRevenue,
      clientMonthlyActiveMRR
    };
  }, [level, closedPerMonth, activeClients, avgSlots]);

  return (
    <section className="w-full py-32 bg-slate-955/20 relative overflow-hidden border-t border-white/5">
      {/* Imperial Expansion Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e50d_1px,transparent_1px),linear-gradient(to_bottom,#4f46e50d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
      
      {/* Planetary Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[conic-gradient(from_90deg_at_50%_0%,#020617_0%,#4f46e522_50%,#020617_100%)] blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - The Imperial Expansion */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-sm font-bold text-indigo-400 mb-6 uppercase tracking-widest shadow-[0_0_20px_rgba(79,70,229,0.2)]">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>SinergIA Nexus: Expansão Continental</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
            Não aprisione o tempo.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Semeie um Ecossistema de Emancipação.
            </span>
          </h2>
          <p className="max-w-[800px] mx-auto text-slate-400 leading-relaxed font-medium md:text-xl">
            Transforme sua carteira de clientes em um organismo vivo de alta alavancagem e receita recorrente estável através da Inteligência Humanocêntrica SinergIA. Distribua a nossa malha de agentes cognitivos sob a salvaguarda estrita do Pacto de Humanidade, suporte contínuo ao Artesão e governança de split automatizado direto na fonte.
          </p>
        </div>

        {/* Simulador de Caixa Invertido 70/30 */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Col: Sliders & Level Selectors */}
          <div className="lg:col-span-7 bg-slate-900/40 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-xl transform-gpu will-change-transform shadow-[0_0_40px_rgba(99,102,241,0.02)] space-y-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1.5 mb-2">
                  <Calculator className="w-4 h-4" /> Configurações de Escala
                </span>
                <h3 className="text-2xl font-black text-white">Simulador de Comissões Nexus</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light mt-1">Ajuste o perfil de integração e o volume de clientes ativos sob sua custódia para ver as projeções.</p>
              </div>

              {/* Selector de Nível */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nível de Complexidade da Integração:</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 1, name: 'Nível 1', label: 'SaaS Nativo', desc: 'Shopify / Hubspot' },
                    { id: 2, name: 'Nível 2', label: 'Híbrido', desc: 'CRM / RD Station' },
                    { id: 3, name: 'Nível 3', label: 'Legado / SEFAZ', desc: 'SAP / ERPs / TOTVS' }
                  ].map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setLevel(n.id as 1 | 2 | 3)}
                      className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                        level === n.id
                          ? 'bg-indigo-500/10 border-indigo-500/60 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                          : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10'
                      }`}
                    >
                      <div className="font-extrabold text-xs text-white">{n.name}</div>
                      <div className="text-[9px] text-slate-500 font-medium">{n.label}</div>
                      <div className="text-[8px] text-slate-600 mt-1">{n.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 1: Novos Contratos / Mês */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Novos Contratos Fechados por Mês:</span>
                  <span className="text-indigo-400 font-mono font-bold text-sm">{closedPerMonth} {closedPerMonth === 1 ? 'projeto' : 'projetos'} / mês</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  step="1"
                  value={closedPerMonth}
                  onChange={(e) => setClosedPerMonth(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
              </div>

              {/* Slider 2: Clientes Ativos em Carteira */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Total de Clientes Ativos na Carteira (Recorrência):</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">{activeClients} {activeClients === 1 ? 'operação' : 'operações'}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="1"
                  value={activeClients}
                  onChange={(e) => setActiveClients(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Slider 3: Slots por Operação */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Média de Módulos (Slots) alocados por Cliente:</span>
                  <span className="text-cyan-400 font-mono font-bold text-sm">{avgSlots} {avgSlots === 1 ? 'slot' : 'slots'} / cliente</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  step="1"
                  value={avgSlots}
                  onChange={(e) => setAvgSlots(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            {/* Explicação da atribuição do Token */}
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 flex gap-3.5 items-start mt-6">
              <Link2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Rastreamento Soberano e Seguro (?aff=)
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-light">
                  Ao ser homologado, você recebe um link parametrizado (ex: <code className="text-indigo-400">?aff=seu_token</code>) que o componente <strong className="text-white font-medium">AffiliateTracker.tsx</strong> lê e persiste em cookies seguros por 60 dias. Qualquer lead que converter será indexado diretamente na raiz do documento com o seu ID (<code className="text-white">partnerId</code>), garantindo repasses auditados e imediatos de split financeiro.
                </p>
              </div>
            </div>

          </div>

          {/* Right Col: Calculations output */}
          <div className="lg:col-span-5 bg-slate-950/80 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl transform-gpu will-change-transform shadow-[0_0_40px_rgba(16,185,129,0.02)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Nível de Parceria Ativo</span>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-white leading-tight">{calculationResult.tierName}</span>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    {calculationResult.ltvPercentage}% LTV
                  </span>
                </div>
              </div>

              {/* Detalhamento dos Cálculos */}
              <div className="space-y-4 border-y border-white/5 py-6 text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-slate-400 font-light">
                    <span>Comissão Upfront (30% do Setup):</span>
                    <span className="font-mono text-white font-semibold">R$ {calculationResult.setupCommission.toLocaleString('pt-BR')} / proj.</span>
                  </div>
                  <span className="text-[9px] text-slate-500 block leading-tight font-light">
                    Split Tributário: SinergIA retém R$ {(calculationResult.setupFee * 0.7).toLocaleString('pt-BR')} (70%) para cobrir QA e servidores.
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-400 font-light pt-2">
                  <span>Ganhos Setup Totais no Mês:</span>
                  <span className="font-mono text-white font-bold">R$ {calculationResult.monthlyUpfrontEarnings.toLocaleString('pt-BR')}</span>
                </div>

                <div className="space-y-1 border-t border-white/5 pt-4">
                  <div className="flex justify-between items-center text-slate-400 font-light">
                    <span>Recorrência da Carteira (MRR):</span>
                    <span className="font-mono text-white font-bold">R$ {calculationResult.monthlyRecurringCommission.toLocaleString('pt-BR')}</span>
                  </div>
                  <span className="text-[9px] text-slate-500 block leading-tight font-light">
                    Calculado sob mensalidade de R$ { (1500 + (avgSlots * 1200)).toLocaleString('pt-BR') } por cliente (Platform Fee R$ 1.500 + R$ 1.200/slot).
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs text-slate-500 uppercase tracking-wider">
                  <span>MRR sob Custódia:</span>
                  <span className="font-mono">R$ {calculationResult.clientMonthlyActiveMRR.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

            {/* Total final */}
            <div className="pt-6">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Seus Ganhos Estimados Nexus / Mês</span>
              <div className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tighter drop-shadow-[0_0_15px_rgba(52,211,153,0.15)] font-mono">
                R$ {calculationResult.totalMonthlyRevenue.toLocaleString('pt-BR')}
              </div>
              <p className="text-[9px] text-slate-600 mt-3 leading-relaxed font-light">
                *Cálculo nominal. Todos os setups sofrem recolhimento tributário antes do split. Recorrência vitalícia mantida sob adimplência do cliente.
              </p>
              
              <Link href="/signup?role=partner" className="w-full mt-6 block">
                <Button className="w-full h-12 bg-white hover:bg-emerald-500 text-slate-950 font-black rounded-xl transition-all hover:scale-[1.01] uppercase tracking-wider text-xs">
                  Homologar Minha Agência Agora
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* Visual Partner Modus Operandi (Features list below the calculator) */}
        <div className="grid md:grid-cols-3 gap-8">
           <div className="bg-slate-900/30 p-6 rounded-2xl border border-white/5 backdrop-blur-md hover:border-indigo-500/20 transition-all transform-gpu will-change-transform">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0 mb-4">
                 <Layers className="w-6 h-6 text-indigo-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">White-Label Absoluto</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                 Sub-painéis customizados com a sua logomarca, cores e domínio. Seus clientes utilizam o sistema sentindo que adquirem uma tecnologia própria sua.
              </p>
           </div>

           <div className="bg-slate-900/30 p-6 rounded-2xl border border-white/5 backdrop-blur-md hover:border-cyan-500/20 transition-all transform-gpu will-change-transform">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0 mb-4">
                 <Link2 className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Clonagem de Playbooks</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                 Replique fluxos operacionais inteiros e bases de conhecimento (RAG) entre clientes de nichos idênticos em poucos cliques, acelerando o onboarding.
              </p>
           </div>

           <div className="bg-slate-900/30 p-6 rounded-2xl border border-white/5 backdrop-blur-md hover:border-emerald-500/20 transition-all transform-gpu will-change-transform">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0 mb-4">
                 <Key className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Master-Telemetria</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                 Dashboard administrativo Master exibindo faturamentos, taxas de erros do CRM e MRR agregados de todas as marcas sob sua custódia.
              </p>
           </div>
        </div>

      </div>
    </section>
  );
}
