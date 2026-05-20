'use client';

import React from 'react';
import { Globe, Layers, Link2, Key, Users, ArrowUpRight, Cpu, Radio, ShieldCheck, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SinergiaNexus() {
  return (
    <section className="w-full py-32 bg-slate-950 relative overflow-hidden">
      {/* Imperial Expansion Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"></div>
      
      {/* Planetary Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[conic-gradient(from_90deg_at_50%_0%,#0f172a_0%,#4f46e533_50%,#0f172a_100%)] blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - The Imperial Expansion */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-sm font-bold text-indigo-400 mb-6 uppercase tracking-widest shadow-[0_0_20px_rgba(79,70,229,0.2)]">
            <Globe className="w-4 h-4" />
            <span>SinergIA Nexus: Expansão Continental</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
            Não governe uma cidade.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Licencie um Império.
            </span>
          </h2>
          <p className="max-w-[800px] mx-auto text-slate-400 leading-relaxed font-medium md:text-xl">
            Sua agência, consultoria ou fundo domina carteiras de clientes? Com o <strong>Protocolo Nexus</strong>, você embala a tecnologia da SinergIA OS com a sua marca. Instale metrópoles de inteligência artificial nos seus clientes e capture margens estratosféricas de SaaS.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Partner Modus Operandi */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0">
                     <Layers className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-white mb-2">White-Label Absoluto</h3>
                     <p className="text-slate-400 text-sm leading-relaxed">
                        A tecnologia é SinergIA. A glória é sua. Sub-painéis (Tenant) customizados com a sua paleta, seu domínio e sua logomarca. Seus clientes nunca saberão que somos a engrenagem por trás da sua máquina mágica.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
                     <Link2 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-white mb-2">Replicação de Playbooks em 1-Click</h3>
                     <p className="text-slate-400 text-sm leading-relaxed">
                        Achou um fluxo que converte absurdamente na Clínica A? O Nexus permite clonar o cérebro central (RAG) e a frota aérea inteira para a Clínica B em exatos 30 segundos.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                     <Key className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-white mb-2">Master-Telemetria</h3>
                     <p className="text-slate-400 text-sm leading-relaxed">
                        Você, como Governador, vê o mapa múndi. Um dashboard Master controlando o MRR, disparos e saúde de todas as suas &quot;Cidades&quot; operando simultaneamente.
                     </p>
                  </div>
               </div>
            </div>

            <Button className="h-14 w-full sm:w-auto px-8 bg-white hover:bg-slate-200 text-slate-950 font-black rounded-xl transition-all hover:scale-105 uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.1)]">
               Aplicar para Master-Partner <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right: The Nexus Network Visualization */}
          <div className="lg:col-span-7">
             <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-slate-900/50 rounded-[40px] border border-white/5 overflow-hidden backdrop-blur-xl p-8 flex items-center justify-center">
                
                {/* Visual Connector Beams */}
                <div className="absolute inset-0">
                   <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M50 50 L20 20" stroke="currentColor" strokeWidth="0.5" className="text-indigo-500" strokeDasharray="2 2" />
                      <path d="M50 50 L80 20" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500" strokeDasharray="2 2" />
                      <path d="M50 50 L20 80" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500" strokeDasharray="2 2" />
                      <path d="M50 50 L80 80" stroke="currentColor" strokeWidth="0.5" className="text-amber-500" strokeDasharray="2 2" />
                      
                      {/* Animated pulses along the paths */}
                      <circle cx="20" cy="20" r="1" fill="#6366f1">
                        <animate attributeName="cx" values="50;20" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="50;20" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="80" cy="20" r="1" fill="#06b6d4">
                        <animate attributeName="cx" values="50;80" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="50;20" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="20" cy="80" r="1" fill="#10b981">
                        <animate attributeName="cx" values="50;20" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="50;80" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="80" cy="80" r="1" fill="#f59e0b">
                        <animate attributeName="cx" values="50;80" dur="1.8s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="50;80" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                   </svg>
                </div>

                {/* Central Core (The Partner Agency) */}
                <div className="relative z-10 w-32 h-32 rounded-full border-2 border-indigo-500/50 bg-slate-950 flex items-center justify-center shadow-[0_0_60px_rgba(79,70,229,0.4)]">
                   <div className="absolute inset-0 rounded-full border border-indigo-400 animate-ping opacity-20"></div>
                   <div className="text-center">
                      <ShieldCheck className="w-8 h-8 text-indigo-400 mx-auto mb-1" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Hub Master</span>
                   </div>
                </div>

                {/* Sub-City 1 */}
                <div className="absolute top-[10%] left-[10%] w-20 h-20 rounded-2xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center shadow-xl group hover:scale-110 transition-transform cursor-pointer">
                   <div className="text-center">
                      <Building className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
                      <span className="text-[8px] font-bold text-slate-400">Cliente A</span>
                   </div>
                </div>

                {/* Sub-City 2 */}
                <div className="absolute top-[10%] right-[10%] w-20 h-20 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center shadow-xl group hover:scale-110 transition-transform cursor-pointer">
                   <div className="text-center">
                      <Building className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                      <span className="text-[8px] font-bold text-slate-400">Cliente B</span>
                   </div>
                </div>

                {/* Sub-City 3 */}
                <div className="absolute bottom-[10%] left-[10%] w-20 h-20 rounded-2xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center shadow-xl group hover:scale-110 transition-transform cursor-pointer">
                   <div className="text-center">
                      <Building className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                      <span className="text-[8px] font-bold text-slate-400">Cliente C</span>
                   </div>
                </div>

                {/* Sub-City 4 */}
                <div className="absolute bottom-[10%] right-[10%] w-20 h-20 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-center justify-center shadow-xl group hover:scale-110 transition-transform cursor-pointer">
                   <div className="text-center">
                      <Building className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                      <span className="text-[8px] font-bold text-slate-400">Cliente D</span>
                   </div>
                </div>

             </div>
          </div>

        </div>

      </div>
    </section>
  );
}
