'use client';

import React from 'react';
import { 
  Workflow, Zap, Boxes, Cpu, TrendingUp, BarChart3, 
  Sparkles, Database, Layout, Lightbulb 
} from 'lucide-react';

export default function SinergiaOS() {
  return (
    <section className="w-full py-32 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e50d_1px,transparent_1px),linear-gradient(to_bottom,#4f46e50d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
      
      {/* Glowing Core */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - The 4 Pillars Narrative */}
        <div className="text-center max-w-4xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
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
            Conectamos, digitalizamos e organizamos os setores essenciais da sua empresa. Escolha as soluções modulares que fazem sentido para seu momento de crescimento.
          </p>
        </div>

        {/* Holistic Architecture Diagram */}
        <div className="relative">
          {/* Main Connector Line (Vertical Backbone) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/20 via-emerald-500/20 to-amber-500/20 -translate-x-1/2 rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
            
            {/* Pilar 1: Comercial */}
            <div className="relative group lg:text-right">
              {/* Connector Pin */}
              <div className="hidden lg:block absolute right-[-48px] top-12 w-8 h-[2px] bg-indigo-500/30"></div>
              <div className="hidden lg:block absolute right-[-54px] top-12 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500/80 ring-4 ring-indigo-500/20"></div>
              
              <div className="bg-slate-900/40 border border-indigo-500/10 rounded-[32px] p-8 md:p-10 backdrop-blur-md hover:bg-slate-900/80 hover:border-indigo-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 lg:ml-auto">
                  <Zap className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  1. Comercial e Vendas
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-8 lg:ml-auto lg:max-w-md">
                  Elimine a perda de contatos por tempo de resposta e filtre leads desqualificados de forma automatizada.
                </p>

                {/* Sub-Offers Grid */}
                <div className="space-y-6 text-left">
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Workflow className="w-5 h-5 text-indigo-400" />
                      <h4 className="font-extrabold text-white text-base">Automação de Vendas (Sales Ops)</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Conexão ativa do seu CRM com WhatsApp e e-mails. Quando o lead chega, o vendedor é notificado instantaneamente e a régua de relacionamento inicia sem demora.
                    </p>
                  </div>
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Cpu className="w-5 h-5 text-indigo-400" />
                      <h4 className="font-extrabold text-white text-base">Agentes de Atendimento Inteligente</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Assistentes virtuais que entendem linguagem natural no WhatsApp para qualificar o interesse, responder dúvidas frequentes e agendar reuniões 24 horas por dia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pilar 2: Financeiro */}
            <div className="relative group lg:mt-32">
              {/* Connector Pin */}
              <div className="hidden lg:block absolute left-[-48px] top-12 w-8 h-[2px] bg-emerald-500/30"></div>
              <div className="hidden lg:block absolute left-[-54px] top-12 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500/80 ring-4 ring-emerald-500/20"></div>
              
              <div className="bg-slate-900/40 border border-emerald-500/10 rounded-[32px] p-8 md:p-10 backdrop-blur-md hover:bg-slate-900/80 hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  2. Financeiro e Cobrança
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-8 max-w-md">
                  Automatize a régua de contas a receber e visualize a margem real de lucro da sua operação comercial.
                </p>

                {/* Sub-Offers Grid */}
                <div className="space-y-6 text-left">
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-extrabold text-white text-base">Recuperação de Contas e Caixa</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Lembretes de faturamento e acordos automáticos via WhatsApp integrados ao seu banco ou gateway, resgatando valores atrasados sem atrito humano.
                    </p>
                  </div>
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-extrabold text-white text-base">Dashboards e Monitoramento (BI)</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Painéis centrais de monitoramento de dados em tempo real. Veja custos, vendas e gargalos operacionais sem depender de planilhas manuais.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pilar 3: Operações */}
            <div className="relative group lg:text-right">
              {/* Connector Pin */}
              <div className="hidden lg:block absolute right-[-48px] top-12 w-8 h-[2px] bg-teal-500/30"></div>
              <div className="hidden lg:block absolute right-[-54px] top-12 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-500/80 ring-4 ring-teal-500/20"></div>
              
              <div className="bg-slate-900/40 border border-teal-500/10 rounded-[32px] p-8 md:p-10 backdrop-blur-md hover:bg-slate-900/80 hover:border-teal-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-6 lg:ml-auto">
                  <Database className="w-7 h-7 text-teal-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  3. Backoffice e Integrações
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-8 lg:ml-auto lg:max-w-md">
                  Zere tarefas manuais e burocráticas repetitivas de cópia de dados entre diferentes sistemas.
                </p>

                {/* Sub-Offers Grid */}
                <div className="space-y-6 text-left">
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Workflow className="w-5 h-5 text-teal-400" />
                      <h4 className="font-extrabold text-white text-base">Integração de Sistemas (Workflows)</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Conexão de planilhas, bancos de dados, faturas e ERPs sem intervenção humana. Copie e sincronize dados de forma segura e instantânea.
                    </p>
                  </div>
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Boxes className="w-5 h-5 text-teal-400" />
                      <h4 className="font-extrabold text-white text-base">Orquestração de Multi-Agentes</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Criação de fluxos complexos e de alta escala onde assistentes digitais dividem tarefas de ponta a ponta (pesquisa, digitação, validação e arquivamento).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pilar 4: Gestão */}
            <div className="relative group lg:mt-32">
              {/* Connector Pin */}
              <div className="hidden lg:block absolute left-[-48px] top-12 w-8 h-[2px] bg-amber-500/30"></div>
              <div className="hidden lg:block absolute left-[-54px] top-12 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500/80 ring-4 ring-amber-500/20"></div>
              
              <div className="bg-slate-900/40 border border-amber-500/10 rounded-[32px] p-8 md:p-10 backdrop-blur-md hover:bg-slate-900/80 hover:border-amber-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  4. Posicionamento e Crescimento
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-8 max-w-md">
                  Estabeleça canais de captação digital automatizados e tenha um mapa de evolução tecnológica claro.
                </p>

                {/* Sub-Offers Grid */}
                <div className="space-y-6 text-left">
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Layout className="w-5 h-5 text-amber-400" />
                      <h4 className="font-extrabold text-white text-base">Páginas de Conversão Inteligentes</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Landing pages estruturadas para captação com formulários que qualificam os visitantes e disparam atendimentos personalizados no WhatsApp de imediato.
                    </p>
                  </div>
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      <h4 className="font-extrabold text-white text-base">Consultoria de Maturidade Digital</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Diagnóstico minucioso das gargalos operacionais da empresa com entrega de roteiro técnico (roadmap) priorizado com base no retorno financeiro.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Global Output Summary */}
        <div className="mt-32 max-w-5xl mx-auto bg-gradient-to-r from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-1 relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10"></div>
           <div className="relative z-10 p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                 <h4 className="text-2xl font-black text-white mb-2">Estrutura Modular para Escalabilidade</h4>
                 <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                   Você não precisa reformular toda a sua operação comercial de uma vez. A SinergIA implementa cada um desses sistemas de forma isolada e gradativa, garantindo adaptação rápida e retorno claro para cada investimento.
                 </p>
              </div>
              <div className="w-full md:w-auto shrink-0 flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full bg-slate-950 flex items-center justify-center border border-white/10">
                    <Boxes className="w-8 h-8 text-emerald-400 animate-pulse" />
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
