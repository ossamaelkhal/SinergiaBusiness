'use client';

import React from 'react';
import { 
  Workflow, Zap, Boxes, Cpu, TrendingUp, BarChart3, 
  Sparkles, Database, Layout, Lightbulb, Heart 
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
            <Heart className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Estrutura de Emancipação Consciente</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
            Os Quatro Pilares da<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
              Emancipação Consciente.
            </span>
          </h2>
          <p className="max-w-[800px] mx-auto text-slate-400 leading-relaxed font-medium md:text-xl">
            Não é humano ou máquina. É humano E máquina. Tecnologia com Alma. Conectamos e organizamos os setores essenciais da sua empresa, automatizando o repetitivo para elevar o seu time a um nível de artesão.
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
              
              <div className="bg-slate-900/30 border border-indigo-500/10 rounded-[32px] p-8 md:p-10 backdrop-blur-xl hover:bg-slate-900/60 hover:border-indigo-500/30 transition-all duration-500 transform-gpu will-change-transform shadow-[0_0_50px_rgba(99,102,241,0.02)] hover:shadow-[0_0_50px_rgba(99,102,241,0.08)]">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 lg:ml-auto">
                  <Zap className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  1. Comercial e Crescimento
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-8 lg:ml-auto lg:max-w-md">
                  Acelere a atração e o relacionamento através de escuta ativa, garantindo respostas rápidas sem perder a sensibilidade humana.
                </p>

                {/* Sub-Offers Grid */}
                <div className="space-y-6 text-left">
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Workflow className="w-5 h-5 text-indigo-400" />
                      <h4 className="font-extrabold text-white text-base">Atração Virtuosa (Sales Ops)</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Integração ativa e inteligente de CRMs, e-mails e canais sociais. Alerte a sua equipe comercial nos momentos quentes para um atendimento altamente empático.
                    </p>
                  </div>
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Cpu className="w-5 h-5 text-indigo-400" />
                      <h4 className="font-extrabold text-white text-base">Acolhimento Inteligente e Filtros</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Assistentes virtuais que compreendem a intenção real no WhatsApp. Esclarecem dúvidas complexas e qualificam leads com acolhimento 24h por dia.
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
              
              <div className="bg-slate-900/30 border border-emerald-500/10 rounded-[32px] p-8 md:p-10 backdrop-blur-xl hover:bg-slate-900/60 hover:border-emerald-500/30 transition-all duration-500 transform-gpu will-change-transform shadow-[0_0_50px_rgba(16,185,129,0.02)] hover:shadow-[0_0_50px_rgba(16,185,129,0.08)]">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  2. Financeiro e Fluxo
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-8 max-w-md">
                  Zere o desgaste de tarefas repetitivas de faturamento e contas a receber com réguas baseadas em transparência mútua.
                </p>

                {/* Sub-Offers Grid */}
                <div className="space-y-6 text-left">
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-extrabold text-white text-base">Mediação e Resgate de Receitas</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Lembretes de faturamento automatizados via WhatsApp integrados ao seu gateway, oferecendo acordos e opções de parcelamento sem constrangimentos.
                    </p>
                  </div>
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-extrabold text-white text-base">Cockpits de Telemetria e Impacto</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Painéis centrais de monitoramento de dados em tempo real. Acompanhe a liberação de capital intelectual e o retorno de propósito sem depender de planilhas.
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
              
              <div className="bg-slate-900/30 border border-teal-500/10 rounded-[32px] p-8 md:p-10 backdrop-blur-xl hover:bg-slate-900/60 hover:border-teal-500/30 transition-all duration-500 transform-gpu will-change-transform shadow-[0_0_50px_rgba(20,184,166,0.02)] hover:shadow-[0_0_50px_rgba(20,184,166,0.08)]">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-6 lg:ml-auto">
                  <Database className="w-7 h-7 text-teal-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  3. Backoffice e Conexão
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-8 lg:ml-auto lg:max-w-md">
                  Elimine a carga braçal do backoffice e centralize a retaguarda burocrática sob os cuidados de microsserviços integrados.
                </p>

                {/* Sub-Offers Grid */}
                <div className="space-y-6 text-left">
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Workflow className="w-5 h-5 text-teal-400" />
                      <h4 className="font-extrabold text-white text-base">Integração Síncrona de Fluxos</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Sincronização imediata de planilhas, bancos de dados, faturas e ERPs sem digitação manual. Mova os dados com absoluta fidelidade e segurança.
                    </p>
                  </div>
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Boxes className="w-5 h-5 text-teal-400" />
                      <h4 className="font-extrabold text-white text-base">Orquestração Multi-Agente</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Integração de múltiplos agentes em paralelo cooperando para extrair dados, validar notas fiscais e arquivar de forma 100% harmoniosa.
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
              
              <div className="bg-slate-900/30 border border-amber-500/10 rounded-[32px] p-8 md:p-10 backdrop-blur-xl hover:bg-slate-900/60 hover:border-amber-500/30 transition-all duration-500 transform-gpu will-change-transform shadow-[0_0_50px_rgba(245,158,11,0.02)] hover:shadow-[0_0_50px_rgba(245,158,11,0.08)]">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  4. Posicionamento e Academia
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-8 max-w-md">
                  Mantenha seu time alinhado a processos claros e capacite-os para atuar com visão estratégica e criatividade de artesão.
                </p>

                {/* Sub-Offers Grid */}
                <div className="space-y-6 text-left">
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Layout className="w-5 h-5 text-amber-400" />
                      <h4 className="font-extrabold text-white text-base">Portais de Conversão com Propósito</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Landing pages pensadas para qualificar leads de alto valor de forma interativa, disparando fluxos de acolhimento personalizados imediatamente.
                    </p>
                  </div>
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      <h4 className="font-extrabold text-white text-base">Jornada de Maturidade Tecnológica</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Capacitação constante da sua equipe para configurar as regras dos agentes e playbooks, promovendo autonomia técnica total para a empresa.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Global Output Summary */}
        <div className="mt-32 max-w-5xl mx-auto bg-gradient-to-r from-slate-900/60 to-slate-950/80 border border-white/10 rounded-3xl p-1 relative overflow-hidden shadow-2xl backdrop-blur-xl transform-gpu will-change-transform">
           <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10"></div>
           <div className="relative z-10 p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                 <h4 className="text-2xl font-black text-white mb-2">Estrutura Modular para Evolução Contínua</h4>
                 <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                   Você não precisa reformular toda a sua operação de uma vez. A SinergIA implementa cada um desses pilares de forma isolada e gradativa, garantindo adaptação humanizada, adaptação tranquila da equipe e retorno claro para cada investimento.
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
