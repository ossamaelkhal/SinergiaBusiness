'use client';

import React from 'react';
import { Network, Database, Workflow, ShieldAlert, Cpu, Globe2, Building, Zap, Boxes } from 'lucide-react';

export default function SinergiaOS() {
  return (
    <section className="w-full py-32 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* City Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
      
      {/* Glowing City Center Core */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - The Smart City Narrative */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm font-bold text-emerald-400 mb-6 uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Globe2 className="w-4 h-4" />
            <span>SinergIA OS: A Metrópole Corporativa</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
            Nós não vendemos &quot;robôs&quot;.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Nós fundamos Cidades Inteligentes.
            </span>
          </h2>
          <p className="max-w-[800px] mx-auto text-slate-400 leading-relaxed font-medium md:text-xl">
            A frota captura o território. A cidade o mantém. Quando a SinergIA entra na sua operação, quebramos os silos da sua empresa e construímos um ecossistema vivo onde todos os dados fluem, se interconectam e geram caixa sozinhos.
          </p>
        </div>

        {/* Holistic Architecture Diagram */}
        <div className="relative">
          {/* Main Connector Line (Vertical Backbone) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/50 via-emerald-500/50 to-amber-500/50 -translate-x-1/2 rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-12">
            
            {/* Sector 1: The Port (Data Ingestion) */}
            <div className="relative group lg:text-right">
              <div className="hidden lg:block absolute right-[-48px] top-1/2 w-8 h-1 bg-indigo-500/50"></div>
              <div className="hidden lg:block absolute right-[-54px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20"></div>
              
              <div className="bg-slate-900/50 border border-indigo-500/20 rounded-3xl p-8 backdrop-blur-md hover:bg-slate-900 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 lg:ml-auto">
                  <Database className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 flex items-center lg:justify-end gap-2">
                  O Porto de Entrada (Sonar & Dados)
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Assim como uma cidade portuária recebe navios e mercadorias, nossa infraestrutura consome todos os sinais vitais: O Submarino Sonar traz intenção da Dark Web, os Leads chegam das campanhas, e o histórico do seu CRM é drenado para a nossa matriz.
                </p>
              </div>
            </div>

            {/* Sector 2: The Industrial Zone (The Fleet) */}
            <div className="relative group lg:mt-32">
              <div className="hidden lg:block absolute left-[-48px] top-1/2 w-8 h-1 bg-emerald-500/50"></div>
              <div className="hidden lg:block absolute left-[-54px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></div>
              
              <div className="bg-slate-900/50 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-md hover:bg-slate-900 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <FactoryIcon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 flex items-center gap-2">
                  Zona Industrial (Frota Aérea)
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Onde a matéria-prima vira produto de alto valor. Nossos Drones (Prospector, BDR, Closer) pegam os dados brutos do Porto e forjam Agendamentos, Qualificações BANT e Contratos assinados em uma linha de montagem implacável.
                </p>
              </div>
            </div>

            {/* Sector 3: The Highways (Playbooks & n8n) */}
            <div className="relative group lg:text-right">
              <div className="hidden lg:block absolute right-[-48px] top-1/2 w-8 h-1 bg-cyan-500/50"></div>
              <div className="hidden lg:block absolute right-[-54px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-cyan-500/20"></div>
              
              <div className="bg-slate-900/50 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-md hover:bg-slate-900 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 lg:ml-auto">
                  <Workflow className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 flex items-center lg:justify-end gap-2">
                  Rodovias Inteligentes (Infra n8n)
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Sem avenidas, o trânsito colapsa. Usamos a espinha dorsal de nossos Playbooks Niche e integrações webhook (n8n) para fazer o ERP falar com o WhatsApp, e o WhatsApp falar com o Financeiro sem gargalos humanos. As informações viajam na velocidade da luz.
                </p>
              </div>
            </div>

            {/* Sector 4: City Hall (Cockpit & Defense) */}
            <div className="relative group lg:mt-32">
              <div className="hidden lg:block absolute left-[-48px] top-1/2 w-8 h-1 bg-amber-500/50"></div>
              <div className="hidden lg:block absolute left-[-54px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-500/20"></div>
              
              <div className="bg-slate-900/50 border border-amber-500/20 rounded-3xl p-8 backdrop-blur-md hover:bg-slate-900 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
                  <Building className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 flex items-center gap-2">
                  A Prefeitura (Cockpit C-Level)
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Do alto da torre, você governa. A Telemetria da SinergIA OS mostra o pulso da cidade: MRR gerado, custo poupado, e taxas de conversão. E o nosso CS (Sistema de Defesa) cuida da retenção do seu território lutando contra o Churn automaticamente.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Global Output Summary */}
        <div className="mt-32 max-w-5xl mx-auto bg-gradient-to-r from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-1 relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10"></div>
           <div className="relative z-10 p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                 <h4 className="text-2xl font-black text-white mb-2">Holística Operacional (Ecosistema Fechado)</h4>
                 <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                   Da prospecção sombria (Submarino), à blitzkrieg de qualificação (Esquadrão Aéreo), até a fundação e controle dos dados (A Cidade). Com SinergIA OS, o cliente não gerencia softwares, ele apenas <strong className="text-emerald-400">governa a riqueza gerada pela metrópole</strong>.
                 </p>
              </div>
              <div className="w-full md:w-auto shrink-0 flex items-center justify-center">
                 <div className="w-24 h-24 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                       <Cpu className="w-8 h-8 text-emerald-400 animate-pulse" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}

// Minimal Factory Icon for local component
function FactoryIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
      <path d="M17 18h1"/>
      <path d="M12 18h1"/>
      <path d="M7 18h1"/>
    </svg>
  )
}
