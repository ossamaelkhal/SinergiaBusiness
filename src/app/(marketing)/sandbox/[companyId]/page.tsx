'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getSandboxLeadAction } from '@/actions/growth';
import { sandboxScenarios, defaultScenario, SimulationScenario } from '@/data/sandbox-scenarios';
import { ShieldCheck, Terminal, AlertTriangle, CheckCircle, ArrowRight, HelpCircle, Heart } from 'lucide-react';

// Força a rota como dinâmica para compatibilidade com a esteira do Next.js
export const dynamic = 'force-dynamic';

export default function SandboxDynamicPage() {
  const { companyId } = useParams() as { companyId: string };
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [leadData, setLeadData] = useState<any>(null);
  const [scenario, setScenario] = useState<SimulationScenario>(defaultScenario);
  
  // Estados do Simulador de Atração
  const [simulationStep, setSimulationStep] = useState<'monitoring' | 'interrupted' | 'resolving' | 'success'>('monitoring');
  const [editedText, setEditedText] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    async function initSandbox() {
      try {
        // Recupera o diagnóstico do prospect via Server Action e ID SHA-256
        const result = await getSandboxLeadAction(companyId);
        if (result && result.success && result.lead) {
          setLeadData(result.lead);
          
          // Mapeia o cenário dinâmico com base no nicho do Lead
          const slug = String(result.lead.nicheSlug || result.lead.niche || '').toLowerCase();
          let nicheKey = 'default';
          if (slug.includes('saude') || slug.includes('clinica') || slug.includes('bemestar')) nicheKey = 'saude';
          else if (slug.includes('logistica') || slug.includes('frota') || slug.includes('urgencia')) nicheKey = 'logistica';
          else if (slug.includes('advocacia') || slug.includes('juridico') || slug.includes('legal') || slug.includes('servico')) nicheKey = 'advocacia';

          if (sandboxScenarios[nicheKey]) {
            setScenario(sandboxScenarios[nicheKey]);
            setEditedText(sandboxScenarios[nicheKey].rawBotOutput);
          } else {
            setScenario(defaultScenario);
            setEditedText(defaultScenario.rawBotOutput);
          }
        }
      } catch (err) {
        console.error("Erro na hidratação do Sandbox:", err);
      } finally {
        setLoading(false);
      }
    }
    initSandbox();
  }, [companyId]);

  // Loop de logs teatrais da malha cognitiva rodando em background
  useEffect(() => {
    if (loading || simulationStep !== 'monitoring') return;

    const baseLogs = [
      `[SISTEMA] Malha Cognitiva SinergIA inicializada para ${leadData?.name || 'Empresa'}.`,
      `[TELEMETRIA] Escutando canais síncronos (?aff=) e gatilhos de latência...`,
      `[MONITORAMENTO] Varrendo fluxos operacionais buscando inteligência aprisionada...`
    ];

    let currentLogIndex = 0;
    setLogs([baseLogs[0]]);

    const interval = setInterval(() => {
      currentLogIndex++;
      if (currentLogIndex < baseLogs.length) {
        setLogs(prev => [...prev, baseLogs[currentLogIndex]]);
      } else if (currentLogIndex === baseLogs.length) {
        // Dispara o sinal de entrada e força a interrupção ética ("Requer Artesão")
        setLogs(prev => [...prev, scenario.triggerEvent]);
      } else {
        clearInterval(interval);
        setSimulationStep('interrupted');
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [loading, simulationStep, leadData, scenario]);

  const handleApprovePact = () => {
    setSimulationStep('resolving');
    setTimeout(() => {
      setSimulationStep('success');
    }, 1500);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin transform-gpu"></div>
        <p className="mt-4 text-slate-400 font-mono text-sm animate-pulse">Sintonizando Malha de Consciência...</p>
      </div>
    );
  }

  const yearlyRevenueLeak = leadData?.yearlyRevenueLeak || (Number(leadData?.employeeCount || 10) * 1200 * 12);
  const weeklyWastedHours = (Number(leadData?.employeeCount || 10) * 3.2).toFixed(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 md:p-8 relative overflow-hidden selection:bg-fuchsia-500/30">
      
      {/* Orbes Neon com Glassmorfismo acelerado por GPU */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-500/5 blur-[120px] pointer-events-none transform-gpu will-change-transform" />

      {/* Header do Cockpit de Testes */}
      <header className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between border-b border-white/5 pb-6 mb-8 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-rose-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">SinergIA OS <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-fuchsia-400">Sandbox</span></h1>
            <p className="text-xs text-slate-400 font-mono">Ambiente de Entrega Antecipada • ID: {companyId.substring(0, 8)}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 rounded-xl bg-slate-900/50 border border-white/5 backdrop-blur-md flex items-center gap-2 font-mono text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Arquétipo Mapeado: <strong className="text-fuchsia-400">Oprimida por Burocracia</strong>
        </div>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-8 lg:gap-12 z-10 flex-1 items-start">
        
        {/* Painel Esquerdo: Telemetria e Impacto Financeiro */}
        <div className="flex flex-col gap-6 w-full">
          <div className="rounded-2xl bg-slate-900/40 border border-white/10 p-6 backdrop-blur-xl transform-gpu will-change-transform shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-mono text-slate-400 tracking-wider uppercase mb-4">Diagnóstico de Fricção Operacional</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-mono">Empresa Analisada</p>
                <p className="text-lg font-semibold text-white">{leadData?.name || 'Sua Empresa'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-rose-500/20 shadow-inner group-hover:border-rose-500/40 transition-colors">
                  <span className="text-xs font-mono text-rose-400">Vazamento Anual</span>
                  <p className="text-xl font-bold text-white mt-1">{formatCurrency(yearlyRevenueLeak)}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-fuchsia-500/20 shadow-inner group-hover:border-fuchsia-500/40 transition-colors">
                  <span className="text-xs font-mono text-fuchsia-400">Tempo Prisioneiro</span>
                  <p className="text-xl font-bold text-white mt-1">{weeklyWastedHours}h / sem</p>
                </div>
              </div>
            </div>
          </div>
 
          <div className="rounded-2xl bg-slate-900/20 border border-white/5 p-6 backdrop-blur-md">
            <h3 className="text-sm font-semibold text-slate-200 mb-2">Instruções do Artesão</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              A IA travou eticamente em Amber. Cure o fluxo dando intencionalidade humana à malha.
            </p>
          </div>
        </div>
 
        {/* Painel Direito: O Espetáculo Interativo da Sandbox */}
        <div className="w-full flex flex-col">
          <div className="flex-1 rounded-2xl bg-slate-950 border border-white/10 backdrop-blur-xl flex flex-col overflow-hidden relative shadow-2xl shadow-neon-artesao/5 min-h-[480px]">
            
            {/* Header do Terminal */}
            <div className="px-4 py-3 bg-slate-900/60 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/40"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/40"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/40"></span>
                <span className="text-xs font-mono text-slate-400 ml-2">swarm-consciencia-terminal.log</span>
              </div>
              <div className="flex items-center font-mono text-[10px]">
                Status: 
                {simulationStep === 'monitoring' && <span className="text-blue-400 ml-1 animate-pulse">RASTREANDO...</span>}
                {simulationStep === 'interrupted' && <span className="text-amber-400 ml-1 font-bold animate-pulse">REQUER ARTESÃO</span>}
                {simulationStep === 'resolving' && <span className="text-fuchsia-400 ml-1 animate-pulse">SINCRONIZANDO...</span>}
                {simulationStep === 'success' && <span className="text-emerald-400 ml-1 font-bold">EMANCIPADO</span>}
              </div>
            </div>

            {/* Tela Interna do Terminal */}
            <div className="p-6 flex-1 font-mono text-xs space-y-3 overflow-y-auto max-h-[380px]">
              {logs.map((log, index) => (
                <div 
                  key={index}
                  className={`leading-relaxed animate-in fade-in slide-in-from-left-2 duration-300 ${log.includes('[SINAL') ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
                >
                  {log}
                </div>
              ))}

              {/* CONTEXTO: INTERRUPÇÃO ÉTICA AMBER */}
              {simulationStep === 'interrupted' && (
                <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 animate-neon-artesao-pulsar space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-start gap-2 text-amber-400">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">Pausa Ética Ativada: Requer Artesão Humano</p>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{scenario.contextNote}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-slate-400 tracking-wider block text-left">Rascunho Frio gerado pela IA (Edite em tempo real para dar Alma ao fluxo):</label>
                    <textarea 
                      className="w-full h-24 bg-slate-950 border border-white/10 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-amber-500/60 font-mono text-xs leading-relaxed resize-none transition-colors"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap justify-end gap-3 pt-1">
                    <button 
                      onClick={() => setEditedText(scenario.curatedOutput)}
                      className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-[11px] text-slate-400"
                    >
                      Injetar Sugestão Humanocêntrica
                    </button>
                    <button 
                      onClick={handleApprovePact}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold transition-all flex items-center gap-1 shadow-lg shadow-amber-500/15"
                    >
                      Aprovar Pacto &amp; Liberar Envio
                    </button>
                  </div>
                </div>
              )}

              {/* CONTEXTO: SINCRONIZANDO (RESOLVING) */}
              {simulationStep === 'resolving' && (
                <div className="py-8 flex flex-col items-center justify-center text-fuchsia-400 gap-2">
                  <div className="w-6 h-6 border-2 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin"></div>
                  <p className="text-[11px] animate-pulse">Semeando intencionalidade humana na malha cognitiva...</p>
                </div>
              )}

              {/* CONTEXTO: SUCESSO EMERALD */}
              {simulationStep === 'success' && (
                <div className="mt-4 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 shadow-2xl shadow-emerald-500/5 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 mx-auto flex items-center justify-center border border-emerald-500/40">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-emerald-400 font-bold text-base">Processo Curado com Sucesso!</h4>
                    <p className="text-[11px] text-slate-300 font-mono">Status da Telemetria: SUCCESS [LOG_ID: SHA-256_VERIFIED]</p>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto font-sans font-light">
                    Você acabou de ver a filosofia da <strong className="font-bold text-white">SinergIA</strong> rodando na prática. O fluxo robótico foi impedido de danificar uma conexão de alto valor e foi emancipado com a sua assinatura moral.
                  </p>
                  <div className="pt-2">
                    <button 
                      onClick={() => router.push(`/apply?companyId=${companyId}`)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold tracking-tight text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2 mx-auto group transform-gpu hover:scale-[1.02]"
                    >
                      Estancar Vazamentos Invisíveis Agora
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Rodapé do Terminal */}
            <div className="px-4 py-2 bg-slate-900/40 border-t border-white/5 font-mono text-[10px] text-slate-500 flex justify-between">
              <span>SinergIA Engine v2.4-Aware</span>
              <span>Pacto de Humanidade Salvaguardado</span>
            </div>
          </div>
        </div>

      </main>

      {/* Selo Criptográfico de Luxo no Rodapé do Sandbox */}
      <footer className="w-full max-w-7xl mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 z-10 gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-fuchsia-500/60" />
          <span>Certificado Digital SinergIA OS Garantido</span>
        </div>
        <div className="text-slate-600 text-center sm:text-right selection:bg-slate-800">
          Hash de Sessão: <span className="text-slate-400">{companyId}</span>
        </div>
      </footer>
    </div>
  );
}
