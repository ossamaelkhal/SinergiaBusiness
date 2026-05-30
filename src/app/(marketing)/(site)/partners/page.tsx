'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle2, TrendingUp, Users, Code2, ArrowRight, 
  ShieldAlert, Sparkles, Scale, BookOpen, UserCheck, Landmark,
  DollarSign, Calculator, HelpCircle, AlertCircle, ShieldCheck, Shield,
  Building2, GraduationCap
} from 'lucide-react'

export default function PartnersPage() {
  // Calculator States
  const [squadsCount, setSquadsCount] = useState(3)
  const [averageSquadTicket, setAverageSquadTicket] = useState(10000) // MRR do cliente
  const [monthlyPocs, setMonthlyPocs] = useState(2) // setups de PoC por mês

  // Commission Calculations based on Active Squads (Tiers)
  const calculationResult = useMemo(() => {
    let commissionPercentage = 20
    let tierName = 'Homologado'
    let setupRebate = 50 // % do PoC Setup Fee (R$ 997) retornado ao parceiro

    if (squadsCount >= 10) {
      commissionPercentage = 30
      tierName = 'Master Partner'
      setupRebate = 100
    } else if (squadsCount >= 5) {
      commissionPercentage = 25
      tierName = 'Growth Partner'
      setupRebate = 70
    }

    const pocSetupPrice = 997
    const monthlyPocCommission = monthlyPocs * pocSetupPrice * (setupRebate / 100)
    const monthlyActiveMRR = squadsCount * averageSquadTicket
    const monthlyRecurringCommission = monthlyActiveMRR * (commissionPercentage / 100)
    const totalMonthlyRevenue = monthlyPocCommission + monthlyRecurringCommission

    return {
      tierName,
      commissionPercentage,
      setupRebate,
      monthlyPocCommission,
      monthlyRecurringCommission,
      totalMonthlyRevenue,
      monthlyActiveMRR
    }
  }, [squadsCount, averageSquadTicket, monthlyPocs])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-30 pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300 tracking-widest uppercase">Nexus Partners Hub</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              Não governe uma cidade.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-indigo-400 to-teal-300">
                Licencie um Império.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl font-light leading-relaxed">
              Transforme sua base de clientes em receita recorrente (MRR) com IA White-Label. Distribua a infraestrutura de agentes cognitivos SinergIA com total garantia de SLA, suporte técnico e conformidade regulatória.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6">
              <Link href="/signup?role=partner">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-tight rounded-xl shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all">
                  Aplicar para o Nexus Partners Hub <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strict Legal Framework (Blindagem de Responsabilidade Jurídica) */}
      <section className="py-20 bg-slate-900/40 border-y border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase text-indigo-400 tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Blindagem Jurídica e Regulatória
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-4">
              Por que somos o canal de parcerias mais seguro do país?
            </h2>
            <p className="text-slate-400 mt-3 font-light text-lg">
              Substituir processos corporativos críticos exige muito mais do que templates simples. Oferecemos governança total para que seu negócio não corra riscos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            
            {/* Responsabilidade Tecnológica */}
            <div className="bg-slate-950/80 p-8 rounded-3xl border border-white/5 relative flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Scale className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">SLA e Garantia Direta</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  A SinergIA assume 100% da garantia e responsabilidade técnica de funcionamento do software. O contrato de licenciamento final é assinado diretamente entre a SinergIA e o cliente final, blindando o parceiro de qualquer passivo civil ou processual decorrente de mau funcionamento de fluxos de IA.
                </p>
              </div>
            </div>

            {/* Faturamento Transparente */}
            <div className="bg-slate-950/80 p-8 rounded-3xl border border-white/5 relative flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                  <ShieldCheck className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Consumo Direto de APIs</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Sem taxas ocultas ou surpresas nas faturas. Todos os custos de consumo direto de APIs (como OpenAI, Anthropic, Twilio, WhatsApp Cloud API) são faturados diretamente no cartão de crédito corporativo do cliente. Isso evita despesas tributárias adicionais sobre repasses fiscais e protege a margem líquida da parceria.
                </p>
              </div>
            </div>

            {/* Código de Conduta */}
            <div className="bg-slate-950/80 p-8 rounded-3xl border border-white/5 relative flex flex-col justify-between hover:border-rose-500/20 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                  <ShieldAlert className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Human-in-the-Loop</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Nossos termos de conduta exigem que todas as integrações críticas que lidam com dados sensíveis (saúde, financeiro e jurídico) possuam um supervisor humano no fluxo operacional (human-in-the-loop). Proibimos promessas de autonomia 100% não-supervisionada para garantir a conformidade legal com a LGPD e o Banco Central.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Commissions Simulation Tool */}
      <section className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Simulador Realista e Transparente
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
              Calcule Seus Ganhos Nexus
            </h2>
            <p className="text-slate-400 mt-4 leading-relaxed font-light text-base">
              Ajuste as métricas de indicações e fechamentos de projetos para visualizar em tempo real a comissão vitalícia e o bônus de setup imediato que você receberá.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 bg-slate-900/40 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
            
            {/* Left Col: Sliders */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Squads Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-white uppercase tracking-wider text-xs">Clientes Ativos com Esquadrão de IA:</span>
                  <span className="text-emerald-400 font-mono font-bold text-lg">{squadsCount} {squadsCount === 1 ? 'cliente' : 'clientes'}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="25" 
                  step="1"
                  value={squadsCount}
                  onChange={(e) => setSquadsCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                  <span>0 (Sem Recorrência)</span>
                  <span>5 (Growth Partner: 25%)</span>
                  <span>10+ (Master Partner: 30% LTV)</span>
                </div>
              </div>

              {/* Average Ticket Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-white uppercase tracking-wider text-xs">Ticket Médio Mensal do Cliente (MRR):</span>
                  <span className="text-indigo-400 font-mono font-bold text-lg">R$ {averageSquadTicket.toLocaleString('pt-BR')}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="20000" 
                  step="2500"
                  value={averageSquadTicket}
                  onChange={(e) => setAverageSquadTicket(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                  <span>R$ 5k (PoC Expandido)</span>
                  <span>R$ 10k (Squad Médio)</span>
                  <span>R$ 20k (Enterprise Máximo)</span>
                </div>
              </div>

              {/* Monthly PoC Sells */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-white uppercase tracking-wider text-xs">Novos Pilotos (PoC) Fechados no Mês:</span>
                  <span className="text-cyan-400 font-mono font-bold text-lg">{monthlyPocs} {monthlyPocs === 1 ? 'setup' : 'setups'} / mês</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  step="1"
                  value={monthlyPocs}
                  onChange={(e) => setMonthlyPocs(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                  <span>0 setups</span>
                  <span>5 setups</span>
                  <span>10 setups</span>
                </div>
              </div>

            </div>

            {/* Right Col: Simulation Output Card */}
            <div className="lg:col-span-5 bg-slate-950 p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Nível de Parceria Simulado</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-white">{calculationResult.tierName}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      {calculationResult.commissionPercentage}% LTV
                    </span>
                  </div>
                </div>

                <div className="space-y-3 border-y border-white/5 py-4">
                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <span>Retorno Setup (PoC):</span>
                    <span className="font-mono text-white">R$ {calculationResult.monthlyPocCommission.toLocaleString('pt-BR')} ({calculationResult.setupRebate}%)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <span>Recorrência Mensal (MRR):</span>
                    <span className="font-mono text-white">R$ {calculationResult.monthlyRecurringCommission.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 uppercase tracking-wider">
                    <span>Volume sob custódia:</span>
                    <span className="font-mono">R$ {calculationResult.monthlyActiveMRR.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Sua Estimativa de Ganhos / Mês</span>
                <div className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tighter">
                  R$ {calculationResult.totalMonthlyRevenue.toLocaleString('pt-BR')}
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                  *Valores projetados baseados em comissões nominais. Impostos incidentes aplicados em nota fiscal de serviços.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3 Categorias de Embaixadores */}
      <section className="py-24 bg-slate-900/20 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-indigo-400 font-bold uppercase tracking-wider text-xs bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Categorias Nexus
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
              Três Caminhos de Homologação
            </h2>
            <p className="text-slate-400 mt-4 leading-relaxed font-light text-lg">
              Escolha o formato operacional que melhor se adapta à capacidade comercial e técnica da sua estrutura.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Modelo 1: Embaixador Co-Sell */}
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col justify-between relative group">
              <div className="absolute top-0 left-10 w-20 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <div className="space-y-6">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 shrink-0">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">1. Embaixador Co-Sell</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Desenvolvido para assessores financeiros, contadores, agências de tráfego e consultores B2B que indicam clientes. O fechamento e a entrega técnica são operados diretamente por nós.
                </p>
                <ul className="space-y-3 pt-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Até **20% de comissão recorrente** (LTV)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Venda consultiva executada em conjunto</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Onboarding e suporte geridos pela SinergIA</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link href="/signup?role=partner" className="w-full">
                  <Button className="w-full h-12 bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-xl transition-all">
                    Iniciar Co-Sell
                  </Button>
                </Link>
              </div>
            </div>

            {/* Modelo 2: Integrador Tech Partner */}
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between relative group">
              <div className="absolute top-0 left-10 w-20 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
              <div className="space-y-6">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Code2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">2. Integrador Tech Partner</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Para desenvolvedores, arquitetos de integração e agências de tecnologia. Você atua na modelagem técnica, sustentação local e no design das regras operacionais do cliente final.
                </p>
                <ul className="space-y-3 pt-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Retenha até **100% da Taxa de Setup (PoC)**</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>**20% a 25% de recorrência** vitalícia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acesso ao repositório de blueprints n8n/APIs</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link href="/signup?role=partner" className="w-full">
                  <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all">
                    Iniciar como Integrador
                  </Button>
                </Link>
              </div>
            </div>

            {/* Modelo 3: Master Partner */}
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/10 hover:border-teal-500/30 transition-all flex flex-col justify-between relative group">
              <div className="absolute top-0 left-10 w-20 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <div className="space-y-6">
                <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 border border-teal-500/20 shrink-0">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">3. Master Partner</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Nível máximo de licenciamento com direito à infraestrutura White-Label total. Permite customizar a aplicação e implantar esquadrões de automação sob servidores dedicados e isolados.
                </p>
                <ul className="space-y-3 pt-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Até **30% de margem e recorrência** no LTV</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Infraestrutura de servidores e bancos isolados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Co-branding e homologação de selo tecnológico</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link href="/signup?role=partner" className="w-full">
                  <Button className="w-full h-12 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all">
                    Iniciar como Master
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUEBRA DE OBJEÇÃO: APAGÃO DE MÃO DE OBRA E AURA LEARN AI */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <GraduationCap className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Resolvendo o Apagão de Mão de Obra do Mercado
              </h2>
              <p className="text-slate-400 text-base font-light leading-relaxed">
                Muitos empresários evitam implantar automação e modernização de dados por medo de que seus times internos não saibam operá-los. Nós resolvemos isso na raiz.
              </p>
              <p className="text-slate-400 text-base font-light leading-relaxed">
                Cada implantação do ecossistema SinergIA inclui de forma nativa a trilha **Aura Learn AI**. Treinamos o time do cliente final a supervisionar e auditar os fluxos automáticos, removendo a barreira técnica de adoção e blindando o seu pós-venda.
              </p>
            </div>
            
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 space-y-6">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider text-emerald-400">Conteúdo Aura Learn AI</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Supervisão de Agentes Autónomos</h5>
                    <p className="text-xs text-slate-500 mt-1">Como auditar e intervir em chats e fluxos de WhatsApp em tempo real.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Gestão de Telemetria e BI</h5>
                    <p className="text-xs text-slate-500 mt-1">Leitura de dashboards executivos para extrair margens e lucros operacionais.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Régua de Mitigação de Riscos</h5>
                    <p className="text-xs text-slate-500 mt-1">Regras de segurança da informação em conformidade rígida com a LGPD.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Legal & FAQ Section */}
      <section className="py-20 bg-slate-900/40 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase text-indigo-400 tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Perguntas Frequentes
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-4">
              Esclarecimentos Jurídicos, LGPD e Segredos Comerciais
            </h2>
          </div>

          <div className="space-y-6">
            
            <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Como funciona a homologação jurídica (MOU) do parceiro?
              </h4>
              <p className="text-slate-400 text-sm mt-3 font-light leading-relaxed">
                As parcerias são regidas por um Termo de Homologação de Indicações (MOU) estruturado. Esse acordo comercial formaliza os payouts de comissões, garante a segurança no tráfego dos leads indicados e define as obrigações tributárias das partes, sem estabelecer qualquer vínculo laboral ou exclusividade mercantil.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Como é garantida a conformidade regulatória e a LGPD?
              </h4>
              <p className="text-slate-400 text-sm mt-3 font-light leading-relaxed">
                Nossos fluxos armazenam dados pessoais apenas pelo período estritamente necessário para processamento e triagem. Toda a infraestrutura utiliza comunicação TLS e chaves criptografadas no Firestore. O contrato com o cliente final atribui a responsabilidade dos dados confidenciais à SinergIA, blindando judicialmente a estrutura comercial do parceiro.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Existe proteção de segredos comerciais e propriedade intelectual?
              </h4>
              <p className="text-slate-400 text-sm mt-3 font-light leading-relaxed">
                Sim. Nossos playbooks de integração, esquemas de APIs e sistemas cognitivos são protegidos por cláusulas severas de sigilo industrial contidas no acordo Nexus. Proibimos o compartilhamento de código ou fluxo sem autorização prévia por escrito, mantendo a exclusividade comercial de nossos parceiros homologados.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-indigo-950/40 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            Construa um Canal de Recorrência Robusto
          </h2>
          <p className="text-slate-300 font-light text-base md:text-lg mb-10">
            Saia do amadorismo das integrações caseiras. Entregue estabilidade operacional, conformidade de dados real e garanta sua fatia no LTV dos maiores clientes.
          </p>
          <Link href="/signup?role=partner">
            <Button size="lg" className="h-16 px-10 text-base bg-white text-slate-950 hover:bg-emerald-500 hover:text-slate-950 font-black rounded-2xl transition-all uppercase tracking-wide">
              Aplicar para o Nexus Partners Hub <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}
