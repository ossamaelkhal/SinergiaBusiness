'use client';

import React, { useState, useEffect } from 'react';
import { Radar, Target, Wifi, AlertTriangle, Crosshair, ArrowRight, Activity, DatabaseZap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SinergiaSonarProps {
  domain?: string;
}

export default function SinergiaSonar({ domain }: SinergiaSonarProps = {}) {
  const [scanning, setScanning] = useState(true);
  const [foundLeads, setFoundLeads] = useState<any[]>([]);

  // Simulated Deep Intent Data Feeds
  useEffect(() => {
    const mockLeads = [
      { 
        id: 1, 
        company: domain ? domain.split('.')[0].toUpperCase() : 'Logística Alfa', 
        intent: domain 
          ? `Vazamento crítico detectado no domínio ${domain} devido a tempo de resposta comercial de 15+ min.` 
          : 'Reclamação pública sobre atraso do CRM atual', 
        source: 'Sonar Telemetry', 
        match: '98%', 
        time: '1 min atrás' 
      },
      { id: 2, company: 'Logística Alfa', intent: 'Reclamação pública sobre atraso do CRM atual', source: 'LinkedIn Post', match: '95%', time: '3 min atrás' },
      { id: 3, company: 'Clínica Revitalize', intent: 'Acabou de contratar 4 Recepcionistas', source: 'Vagas.com API', match: '94%', time: '12 min atrás' },
      { id: 4, company: 'TechCorp SaaS', intent: 'Busca por "Alternativas para reduzir custo de SDR"', source: 'Dark Funnel Search', match: '89%', time: '45 min atrás' },
    ];

    if (scanning) {
      setFoundLeads([]);
      const timers = mockLeads.map((lead, index) => 
        setTimeout(() => {
          setFoundLeads(prev => [...prev, lead]);
        }, (index + 1) * 1500)
      );
      
      return () => timers.forEach(clearTimeout);
    }
  }, [scanning, domain]);

  return (
    <section className="w-full py-32 bg-slate-950 relative overflow-hidden border-t border-indigo-500/10">
      {/* Deep Ocean Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
      
      {/* Sonar Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: The Submarine Narrative */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5">
              <Radar className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-400 tracking-wide uppercase">
                Módulo Confidencial: Sonar Deep-Web
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              A Superfície é para Amadores.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Mergulhe no Dark Funnel.
              </span>
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Enquanto seus concorrentes pescam leads que já estão orçando com 3 empresas (Inbound), o <strong className="text-white">SinergIA Sonar</strong> age como um submarino nuclear. Ele escaneia a internet 24/7 buscando <strong className="text-indigo-400">Sinais de Intenção Ocultos</strong>.
            </p>

            <ul className="space-y-6 pt-6 border-t border-white/5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0">
                  <AlertTriangle className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Interceptação de Reclamações</h4>
                  <p className="text-sm text-slate-500">Monitoramos as redes. Se um prospect xingar a ferramenta do seu concorrente, nosso Agente aborda ele em 2 minutos.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
                  <DatabaseZap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Rastreamento de Contratações</h4>
                  <p className="text-sm text-slate-500">A empresa X abriu 5 vagas para Vendedores? O Sonar te avisa que eles estão com caixa e precisando de tração. É hora de atacar.</p>
                </div>
              </li>
            </ul>

            <Link href={`/apply${domain ? `?domain=${encodeURIComponent(domain)}` : ''}`} className="inline-block mt-4">
              <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all hover:scale-105 uppercase tracking-widest">
                Ativar Radar de Intenção
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Right: The Sonar Visualizer */}
          <div className="relative h-[600px] rounded-3xl border border-indigo-500/20 bg-slate-900/50 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col">
            {/* Radar Animation Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-indigo-500/10 rounded-full flex items-center justify-center opacity-30">
               <div className="w-[600px] h-[600px] border border-indigo-500/20 rounded-full flex items-center justify-center">
                  <div className="w-[400px] h-[400px] border border-indigo-500/30 rounded-full flex items-center justify-center">
                     <div className="w-[200px] h-[200px] border border-indigo-500/40 rounded-full bg-indigo-500/5 relative">
                        {/* Sweeping line */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                           <div className="w-1/2 h-1/2 bg-gradient-to-br from-indigo-500/40 to-transparent origin-bottom-right animate-spin" style={{ animationDuration: '3s' }}></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="relative z-10 p-6 flex items-center justify-between border-b border-indigo-500/20 bg-slate-900/80">
               <div className="flex items-center gap-3">
                  <Wifi className="text-indigo-400 animate-pulse w-5 h-5" />
                  <span className="text-white font-bold tracking-widest text-sm">SONAR FEED: ATIVO</span>
               </div>
               <span className="text-xs text-indigo-400 font-mono">Profundidade: Nível 4 (Dark Web/APIs)</span>
            </div>

            <div className="relative z-10 flex-1 p-6 overflow-y-auto space-y-4">
               {foundLeads.length === 0 && (
                 <div className="h-full flex flex-col items-center justify-center text-indigo-500/50 font-mono text-sm animate-pulse">
                    Escaneando o mercado...
                 </div>
               )}
               {foundLeads.map((lead, i) => (
                 <div key={i} className="bg-slate-950/80 border border-indigo-500/30 rounded-xl p-5 animate-in slide-in-from-right-8 fade-in duration-500 relative group hover:border-indigo-400 transition-colors">
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(79,70,229,0.8)]"></div>
                    <div className="flex justify-between items-start mb-3">
                       <h5 className="text-white font-black text-lg flex items-center gap-2">
                          <Target className="w-4 h-4 text-rose-500" />
                          {lead.company}
                       </h5>
                       <span className="text-xs font-mono text-indigo-300 bg-indigo-900/50 px-2 py-1 rounded border border-indigo-500/30">Match: {lead.match}</span>
                    </div>
                    <p className="text-sm text-slate-300 font-medium mb-3">{lead.intent}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                       <span>Fonte: {lead.source}</span>
                       <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {lead.time}</span>
                    </div>
                    
                    {/* Hover Action */}
                    <div className="absolute inset-0 bg-indigo-900/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                       <Link href={`/apply${domain ? `?domain=${encodeURIComponent(domain)}` : ''}`}>
                          <Button size="sm" className="bg-white text-indigo-950 hover:bg-indigo-100 font-bold">
                             Disparar Abordagem Autônoma <Crosshair className="w-4 h-4 ml-2" />
                          </Button>
                       </Link>
                    </div>
                 </div>
               ))}
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}

// Minimal Clock icon for local use since it wasn't imported globally in the component above
function Clock(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}
