'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle2, TrendingUp, Users, Code2, ArrowRight, 
  ShieldAlert, Sparkles, Scale, BookOpen, UserCheck, Landmark 
} from 'lucide-react'

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-28 pb-20 md:pt-40 md:pb-28">
        {/* Background glow animations */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-30 pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300 tracking-widest uppercase">Canal de Parcerias Homologadas B2B</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              Amplie sua Operação B2B<br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-indigo-400 to-teal-300">Com Automação Cognitiva</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl font-light leading-relaxed">
              Leve a infraestrutura de agentes inteligentes da SinergIA para seus clientes. Aumente sua receita e retenção oferecendo soluções integradas de IA com segurança jurídica e SLA de nível empresarial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6">
              <Link href="/signup?role=ambassador">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-tight rounded-xl shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all">
                  Quero ser Parceiro <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/signup?role=agency">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-white/10 text-white bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-md transition-all">
                  Sou Desenvolvedor / Integrador
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Realist & Legal Framework Section (Blindagem de Responsabilidade) */}
      <section className="py-20 bg-slate-900/40 border-y border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase text-indigo-400 tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Compliance & Segurança Jurídica
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-4">
              Automação B2B Exige Responsabilidade
            </h2>
            <p className="text-slate-400 mt-3 font-light text-lg">
              Substituir processos em faturamento hospitalar, contencioso jurídico e conciliação bancária envolve riscos regulatórios altos. Nós fornecemos a blindagem para a sua marca.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            {/* O Perigo Jurídico de Soluções Genéricas */}
            <div className="bg-slate-950/80 p-8 rounded-3xl border border-rose-500/20 relative flex flex-col justify-between">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                  <ShieldAlert className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Por que o modelo tradicional White-Label faliu?</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Muitas agências tentam vender ferramentas de chat como se fossem donas da tecnologia (White-Label puro). No entanto, quando um agente de IA alucina ou comete erros operacionais (como enviar guias médicas erradas ou protocolar prazos judiciais inválidos), **a agência é processada e arca com indenizações pesadas**.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Sem contratos de nível de serviço (SLA), auditorias constantes e infraestrutura de ponta a ponta em conformidade com a LGPD, revender IA por conta própria é uma bomba relógio jurídica.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-rose-400 font-bold">
                ⚠️ Evite riscos de responsabilidade por mau funcionamento de terceiros.
              </div>
            </div>

            {/* A Abordagem SinergIA OS */}
            <div className="bg-slate-950/80 p-8 rounded-3xl border border-emerald-500/20 relative flex flex-col justify-between">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Scale className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">A Blindagem Contratual SinergIA</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Nós assumimos a **garantia tecnológica**. O contrato final de licenciamento do software é feito diretamente entre a SinergIA e o cliente indicado. Isso transfere a responsabilidade de funcionamento, segurança de dados, uptime e conformidade legal da IA para a nossa holding.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Você atua na ponta como estrategista comercial, modelando os processos do cliente e cobrando serviços de consultoria técnica, mantendo-se juridicamente seguro de ponta a ponta.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-emerald-400 font-bold">
                ✅ Você lucra com consultoria e recorrência; nós assumimos o SLA.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2 Modelos de Negócio Reais */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Escolha seu Modelo de Atuação
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
              Duas Formas Reais de Lucrar
            </h2>
            <p className="text-slate-400 mt-4 leading-relaxed font-light text-lg">
              Seja você um consultor focado em vendas ou um integrador focado em código, temos um caminho homologado para a sua equipe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Modelo 1: Embaixador / Co-Selling */}
            <div className="bg-slate-900/40 p-8 md:p-10 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col justify-between relative group">
              <div className="absolute top-0 left-10 w-20 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <div className="space-y-6">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">1. Indicação Estratégica (Co-Sell)</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Modelo ideal para agências de marketing, assessores financeiros e consultores de negócios que possuem rede de relacionamento ativa mas não possuem equipe técnica.
                </p>
                <ul className="space-y-3 pt-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>De **20% a 30%** de comissão recorrente (LTV)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Apresentação técnica feita em conjunto com a SinergIA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Nós cuidamos do onboarding, integrações e suporte 24h</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dashboard de indicações e cliques no link exclusivo</span>
                  </li>
                </ul>
              </div>
              <div className="mt-10">
                <Link href="/signup?role=ambassador" className="w-full">
                  <Button className="w-full h-12 bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-xl transition-all">
                    Iniciar como Embaixador
                  </Button>
                </Link>
              </div>
            </div>

            {/* Modelo 2: Integrador Homologado */}
            <div className="bg-slate-900/40 p-8 md:p-10 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between relative group">
              <div className="absolute top-0 left-10 w-20 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
              <div className="space-y-6">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <Code2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">2. Integrador / Tech Partner</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Para desenvolvedores, especialistas n8n e agências de software que desejam customizar fluxos, configurar APIs nos CRMs dos clientes e oferecer suporte dedicado.
                </p>
                <ul className="space-y-3 pt-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Retenha **100% do Setup Fee** de implantação</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Comissão fixa de licença de **20%** recorrente</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acesso ao repositório de Playbooks de Automação n8n</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Capacitação técnica no ecossistema e fórum exclusivo</span>
                  </li>
                </ul>
              </div>
              <div className="mt-10">
                <Link href="/signup?role=agency" className="w-full">
                  <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all">
                    Iniciar como Integrador
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* A Conexão Holística do Fluxo de Leads */}
      <section className="py-20 bg-slate-900/20 border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Como Funciona a Telemetria de Indicações
            </h2>
            <p className="text-slate-400 mt-3 font-light text-lg">
              Sem planilhas ou adivinhações. Nossa plataforma rastreia centavo por centavo em tempo real.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            
            {/* Passo 1 */}
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 relative flex flex-col space-y-4">
              <div className="text-3xl font-black text-indigo-500/50">01</div>
              <h4 className="font-bold text-white">Criar Conta</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Crie sua conta selecionando o seu papel operacional (Parceiro de Vendas ou Tech Partner) na página de cadastro.
              </p>
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1 pt-2">
                <UserCheck className="w-4 h-4"/> Acesso imediato
              </div>
            </div>

            {/* Passo 2 */}
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 relative flex flex-col space-y-4">
              <div className="text-3xl font-black text-indigo-500/50">02</div>
              <h4 className="font-bold text-white">Pegar Link de Rastreio</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Acesse o painel do parceiro em `/hub/ambassador` e obtenha seu link criptografado exclusivo com a flag de parceiro.
              </p>
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1 pt-2">
                <BookOpen className="w-4 h-4"/> Rastreamento por cookies
              </div>
            </div>

            {/* Passo 3 */}
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 relative flex flex-col space-y-4">
              <div className="text-3xl font-black text-indigo-500/50">03</div>
              <h4 className="font-bold text-white">Indicação ou Co-sell</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Seu cliente entra no site, preenche o formulário `/apply` ou finaliza a compra de setups e playbooks em `/checkout`.
              </p>
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1 pt-2">
                <Landmark className="w-4 h-4"/> Captura automatizada
              </div>
            </div>

            {/* Passo 4 */}
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 relative flex flex-col space-y-4">
              <div className="text-3xl font-black text-indigo-500/50">04</div>
              <h4 className="font-bold text-white">Comissão Creditada</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                A telemetria do webhook processa e atribui o lead ao seu ID de parceiro. A recorrência é auditada diretamente no seu portal.
              </p>
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1 pt-2">
                <TrendingUp className="w-4 h-4"/> Visualização em tempo real
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-indigo-950/40 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            Lidere a Implementação de IA com Conformidade
          </h2>
          <p className="text-slate-300 font-light text-base md:text-lg mb-10">
            A era das soluções fracas e amadoras acabou. Una-se à plataforma corporativa B2B que entrega estabilidade e segurança jurídica real.
          </p>
          <Link href="/signup?role=ambassador">
            <Button size="lg" className="h-14 px-10 text-base bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all">
              Aplicar para a Homologação <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}
