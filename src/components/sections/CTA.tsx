'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Rocket, ShieldCheck, ArrowRight, Target, ShieldAlert } from 'lucide-react'

export default function CTA() {
  return (
    <section className="w-full py-24 md:py-32 bg-slate-950 overflow-hidden relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-16">
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Rocket className="w-4 h-4 animate-bounce" />
            O Fim das Tarefas Manuais
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Sua operação em <span className="text-emerald-400">piloto automático.</span>
          </h2>
          
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            Elimine gargalos operacionais e erros de digitação humana. Escolha abaixo a porta de entrada para conectar sua empresa ou carteira B2B ao ecossistema SinergIA.
          </p>
        </div>
        
        {/* TWO PATHWAYS FOR CLOSING CTA */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          
          {/* PATH 1: DIAGNÓSTICO EXECUTIVO (CLIENTE) */}
          <div className="bg-slate-900/60 border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">1. Diagnóstico Executivo</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Descubra os gargalos e perdas financeiras da sua própria empresa. Nossa equipe auditará seus canais e implementará o ecossistema SinergIA OS sob medida.
              </p>
              
              <ul className="space-y-3 pt-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Análise completa de tempo de contato e resposta</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Mapeamento de integrações de CRM e ERP</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Retorno garantido via performance de processos</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <Link href="/apply" className="block w-full">
                <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs">
                  Auditar Minha Operação
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* PATH 2: LICENCIAMENTO TECNOLÓGICO (PARCEIRO) */}
          <div className="bg-slate-900/60 border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">2. Licenciamento Tecnológico</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Indique clientes da sua carteira ou implemente integrações avançadas como parceiro homologado Nexus e fature comissões recorrentes (LTV) robustas.
              </p>
              
              <ul className="space-y-3 pt-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Comissões vitalícias recorrentes de até 30%</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Certificação Oficial SinergIA Academy incluída</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>SLA assegurado e blindagem jurídica mercantil</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <Link href="/partners" className="block w-full">
                <Button className="w-full h-14 bg-white text-slate-950 hover:bg-slate-200 font-black rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs">
                  Licenciar SinergIA Nexus
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
        
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          🔒 Conexão Criptografada Segura &bull; LGPD Compliance
        </p>
      </div>
    </section>
  )
}
