'use client';

import React from 'react';
import { Workflow, Zap, Boxes, Cpu, TrendingUp, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';

export default function SinergiaOS() {
  return (
    <section className="w-full py-32 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e50d_1px,transparent_1px),linear-gradient(to_bottom,#4f46e50d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
      
      {/* Glowing Core */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - The 4 Pillars Narrative */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm font-bold text-emerald-400 mb-6 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Estrutura de Eficiência Operacional</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
            Os Quatro Pilares da<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
              Operação Autônoma.
            </span>
          </h2>
          <p className="max-w-[800px] mx-auto text-slate-400 leading-relaxed font-medium md:text-xl">
            Conectamos e automatizamos os setores essenciais da sua empresa, reduzindo a sobrecarga da equipe e acelerando o retorno financeiro.
          </p>
        </div>

        {/* Holistic Architecture Diagram */}
        <div className="relative">
          {/* Main Connector Line (Vertical Backbone) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/30 via-emerald-500/30 to-amber-500/30 -translate-x-1/2 rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-12">
            
            {/* Pilar 1: Comercial */}
            <div className="relative group lg:text-right">
              <div className="hidden lg:block absolute right-[-48px] top-1/2 w-8 h-1 bg-indigo-500/50"></div>
              <div className="hidden lg:block absolute right-[-54px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20"></div>
              
              <div className="bg-slate-900/50 border border-indigo-500/20 rounded-3xl p-8 backdrop-blur-md hover:bg-slate-900 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 lg:ml-auto">
                  <Zap className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 flex items-center lg:justify-end gap-2">
                  1. Resposta Comercial Instantânea
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  A demora no retorno custa vendas valiosas. Nossos assistentes autônomos atendem potenciais clientes no WhatsApp em segundos: tiram dúvidas comuns sobre seu produto, filtram o interesse real de compra e agendam reuniões direto no seu calendário.
                </p>
              </div>
            </div>

            {/* Pilar 2: Financeiro */}
            <div className="relative group lg:mt-32">
              <div className="hidden lg:block absolute left-[-48px] top-1/2 w-8 h-1 bg-emerald-500/50"></div>
              <div className="hidden lg:block absolute left-[-54px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></div>
              
              <div className="bg-slate-900/50 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-md hover:bg-slate-900 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 flex items-center gap-2">
                  2. Recuperação de Contas e Caixa
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Cobranças manuais desgastam sua equipe e deixam dinheiro parado na mesa. Criamos fluxos inteligentes e mensagens amigáveis de lembrete de vencimento e renegociação via WhatsApp, integrados diretamente ao seu emissor de boletos, banco ou gateway.
                </p>
              </div>
            </div>

            {/* Pilar 3: Operações */}
            <div className="relative group lg:text-right">
              <div className="hidden lg:block absolute right-[-48px] top-1/2 w-8 h-1 bg-teal-500/50"></div>
              <div className="hidden lg:block absolute right-[-54px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-500 ring-4 ring-teal-500/20"></div>
              
              <div className="bg-slate-900/50 border border-teal-500/20 rounded-3xl p-8 backdrop-blur-md hover:bg-slate-900 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-6 lg:ml-auto">
                  <Workflow className="w-7 h-7 text-teal-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 flex items-center lg:justify-end gap-2">
                  3. Backoffice e Fluxo Interno
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Sua equipe perde tempo valioso digitando relatórios, copiando dados entre planilhas ou gerando contratos padrão. Automatizamos a leitura de documentos, entrada de notas e sincronização entre seus sistemas internos para eliminar erros e economizar horas diárias.
                </p>
              </div>
            </div>

            {/* Pilar 4: Gestão */}
            <div className="relative group lg:mt-32">
              <div className="hidden lg:block absolute left-[-48px] top-1/2 w-8 h-1 bg-amber-500/50"></div>
              <div className="hidden lg:block absolute left-[-54px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-500/20"></div>
              
              <div className="bg-slate-900/50 border border-amber-500/20 rounded-3xl p-8 backdrop-blur-md hover:bg-slate-900 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 flex items-center gap-2">
                  4. Controle Central de Resultados
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Administre sua empresa com clareza operacional. Disponibilizamos painéis intuitivos para você acompanhar o retorno das automações, taxa de contatos respondidos e metas, dando total controle estratégico sobre os processos que rodam nos bastidores.
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
                 <h4 className="text-2xl font-black text-white mb-2">A Força de uma Operação Orquestrada</h4>
                 <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                   Quando as áreas comercial, financeira e operacional da sua empresa conversam de forma integrada e automática, a sobrecarga de trabalho desaparece. O time foca no que é estratégico, e o negócio cresce com saúde.
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
