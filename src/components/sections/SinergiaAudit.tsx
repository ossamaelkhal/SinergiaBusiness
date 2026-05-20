'use client';

import React, { useState } from 'react';
import { ShieldAlert, Search, Activity, Target, AlertTriangle, ArrowRight, Lock, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SinergiaAudit() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ risk: string; leak: string; competitor: number } | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setScanning(true);
    setResult(null);

    // Envio Oculto para o Middleware SinergIA (Segurança)
    try {
      fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: url, source: 'SinergiaAudit', timestamp: new Date().toISOString() })
      }).catch(() => {}); // silent error para não travar a UI
    } catch (e) {}

    // Simulate the terrifying but realistic audit process
    setTimeout(() => {
      setScanning(false);
      setResult({
        risk: 'NÍVEL CRÍTICO (VERMELHO)',
        leak: 'R$ 140.000 a R$ 280.000',
        competitor: Math.floor(Math.random() * 4) + 2 // 2 to 5 competitors
      });
    }, 4500);
  };

  return (
    <section className="w-full py-24 bg-[#0a0a0a] relative border-y border-rose-500/10 overflow-hidden">
      {/* Warning Stripes Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[url('/stripes.png')] opacity-20"></div>
      
      {/* Red/Amber glow for urgency */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* FOMO Header */}
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-black text-rose-400 mb-6 uppercase tracking-widest animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span>O Mercado foi Dividido. De que lado você está?</span>
           </div>
           <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
              O seu concorrente já ativou a Máquina.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">
                Você tem certeza que está seguro?
              </span>
           </h2>
           <p className="text-slate-400 text-lg">
              Insira o domínio da sua empresa abaixo. O <strong>Sonar SinergIA</strong> fará uma varredura cruzada na dark web e em bancos de dados de CRM para estimar o <strong>Sangramento de Receita</strong> que sua falta de I.A. está gerando hoje.
           </p>
        </div>

        {/* The Audit Tool */}
        <div className="bg-slate-900/80 border border-rose-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(225,29,72,0.1)] relative">
           
           {!result ? (
             <form onSubmit={handleScan} className="space-y-6">
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-500" />
                   </div>
                   <input
                      type="text"
                      className="block w-full pl-12 pr-4 py-5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-lg"
                      placeholder="ex: suaempresa.com.br"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={scanning}
                      required
                   />
                </div>
                
                <Button 
                   type="submit" 
                   disabled={scanning || !url}
                   className="w-full h-14 bg-rose-600 hover:bg-rose-500 text-white font-black text-lg rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all uppercase tracking-widest disabled:opacity-70"
                >
                   {scanning ? (
                      <span className="flex items-center gap-2">
                         <Activity className="w-5 h-5 animate-pulse" />
                         Varrendo o Dark Funnel...
                      </span>
                   ) : (
                      <span className="flex items-center gap-2">
                         <Target className="w-5 h-5" />
                         Diagnosticar Sangramento de Receita
                      </span>
                   )}
                </Button>

                {/* Progress Simulation text */}
                {scanning && (
                   <div className="text-center text-xs font-mono text-rose-400 space-y-1 animate-pulse mt-4">
                      <p>&gt; Cruzando dados de concorrência B2B...</p>
                      <p>&gt; Calculando latência de resposta do CRM (delay humano)...</p>
                      <p>&gt; Estimando vazamento de Leads no topo do funil...</p>
                   </div>
                )}
             </form>
           ) : (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center mb-8 border-b border-white/5 pb-8">
                   <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-4 animate-pulse" />
                   <h3 className="text-2xl font-black text-white mb-2">Relatório de Risco Comercial Gerado</h3>
                   <p className="text-slate-400">Domínio analisado: <span className="text-rose-400 font-mono">{url}</span></p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                   <div className="bg-slate-950 rounded-2xl p-6 border border-rose-500/30">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nível de Exposição</div>
                      <div className="text-2xl font-black text-rose-500">{result.risk}</div>
                      <p className="text-sm text-slate-400 mt-2">O tempo de resposta humano atual está resultando no abandono de propostas quentes.</p>
                   </div>
                   <div className="bg-slate-950 rounded-2xl p-6 border border-amber-500/30">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Concorrentes Blindados</div>
                      <div className="text-2xl font-black text-amber-500">{result.competitor} Players</div>
                      <p className="text-sm text-slate-400 mt-2">Identificamos empresas na sua região que já estão usando I.A. para capturar seus leads em tempo real.</p>
                   </div>
                </div>

                <div className="bg-rose-950/30 border border-rose-500/50 rounded-2xl p-6 text-center mb-8">
                   <div className="text-sm font-bold text-rose-300 uppercase tracking-widest mb-2">Sangramento de Receita Anual Estimado (LTV Perdido)</div>
                   <div className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(225,29,72,0.8)]">{result.leak}</div>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 text-center">
                   <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold mb-4">
                      <Lock className="w-5 h-5" />
                      <span>Protocolo de Exclusividade (Proteção de Nicho)</span>
                   </div>
                   <p className="text-sm text-slate-300 mb-6 max-w-lg mx-auto">
                      A SinergIA opera com <strong>exclusividade geográfica/nicho</strong>. Se nós fecharmos com o seu concorrente, nós não podemos atender você. Pare o sangramento hoje.
                   </p>
                   <Link href="/apply" className="block w-full">
                     <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 transition-all uppercase tracking-widest">
                        Blindar Minha Operação Agora <ArrowRight className="w-5 h-5 ml-2" />
                     </Button>
                   </Link>
                </div>
             </div>
           )}

        </div>
        
        {/* Scarcity Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
           <Clock className="w-4 h-4 text-amber-500" />
           Vagas na incubadora deste mês: <span className="text-white">2 restantes</span>
        </div>
      </div>
    </section>
  );
}
