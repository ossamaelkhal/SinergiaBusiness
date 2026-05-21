'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle2, TrendingUp, Users, Code2, ArrowRight, 
  ShieldAlert, Sparkles, Scale, BookOpen, UserCheck, Landmark,
  DollarSign, Calculator, HelpCircle, AlertCircle, ShieldCheck, Shield
} from 'lucide-react'

export default function PartnersPage() {
  // Calculator States
  const [squadsCount, setSquadsCount] = useState(3)
  const [averageSquadTicket, setAverageSquadTicket] = useState(10000) // MRR of the client
  const [monthlyPocs, setMonthlyPocs] = useState(2) // PoC setup sells per month

  // Commission Calculations based on Active Squads (Tiers)
  const calculationResult = useMemo(() => {
    // Determine Commission Tier based on active squads
    let commissionPercentage = 20
    let tierName = 'Homologado'
    let setupRebate = 50 // % of PoC Setup Fee (R$ 997) returned to partner

    if (squadsCount >= 10) {
      commissionPercentage = 30
      tierName = 'Black / Enterprise'
      setupRebate = 100
    } else if (squadsCount >= 5) {
      commissionPercentage = 25
      tierName = 'Growth Partner'
      setupRebate = 70
    }

    // Calculations
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
        {/* Background glow animations */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-30 pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300 tracking-widest uppercase">Canal de Parcerias Homologadas B2B</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              A Escala do B2B com<br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-indigo-400 to-teal-300">Responsabilidade e SLA</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl font-light leading-relaxed">
              Distribua a infraestrutura de agentes cognitivos SinergIA para a sua carteira B2B. Ganhe recorrência agressiva enquanto nós garantimos a estabilidade tecnológica, compliance e proteção jurídica de ponta.
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
              Substituir processos corporativos críticos exige muito mais do que templates no Make ou n8n. Oferecemos governança total para que seu negócio não corra riscos.
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
              Calcule Seus Ganhos de Parceria
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
                  <span>5 (Growth: 25%)</span>
                  <span>10+ (Black: 30% LTV)</span>
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

      {/* 2 Modelos de Negócio Reais */}
      <section className="py-24 bg-slate-900/20 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Modelos Operacionais
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
              Como você deseja atuar?
            </h2>
            <p className="text-slate-400 mt-4 leading-relaxed font-light text-lg">
              Temos caminhos claros para quem foca exclusivamente na prospecção comercial e para quem entrega a customização técnica.
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
                <h3 className="text-2xl font-bold text-white tracking-tight">1. Indicações Estratégicas (Co-Sell)</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Desenvolvido para assessores financeiros, contadores consultivos, agências de marketing de performance ou consultores corporativos que possuem livre trânsito na mesa dos decisores de MPEs e grandes corporações.
                </p>
                <ul className="space-y-3 pt-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Até **30% de comissão recorrente vitalícia** (LTV)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Apresentação e proposta feitas em conjunto com nosso time técnico</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Nós cuidamos do onboarding, integrações, servidores e suporte</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Painel exclusivo de telemetria para ver o progresso dos leads</span>
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
                  Voltado para desenvolvedores, arquitetos de n8n/make, integradores de sistemas corporativos e software houses. Você atua na modelagem técnica dos processos e na sustentação de primeiro nível dos fluxos operacionais.
                </p>
                <ul className="space-y-3 pt-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Retenha até **100% da Taxa de Setup (PoC)** do cliente</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>**20% recorrente fixo** sobre as licenças mensais da SinergIA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acesso ao repositório fechado de playbooks e blueprints n8n</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Certificação homologada e encaminhamento de demandas da holding</span>
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

      {/* Playbook de Oportunidades (Como Prospectar) */}
      <section className="py-24 bg-slate-950 border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Guia de Indicações
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
              Playbook de Oportunidades
            </h2>
            <p className="text-slate-400 mt-4 leading-relaxed font-light text-lg">
              Identifique dores comuns no dia a dia de potenciais clientes e saiba qual solução exata do portfólio da SinergIA indicar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Automação de Vendas",
                badge: "Sales Ops",
                oQueE: "Conectar o CRM (Pipedrive, RD Station) com WhatsApp e e-mail de forma direta.",
                oQueFaz: "O lead chega, é cadastrado, o vendedor é notificado e o acompanhamento inicial é imediato.",
                indicacao: "Empresas que perdem vendas devido à demora no retorno comercial ou falta de organização.",
              },
              {
                title: "Atendimento Inteligente",
                badge: "Agentes de IA",
                oQueE: "Assistentes virtuais que entendem e respondem de forma natural no WhatsApp.",
                oQueFaz: "Triagem de leads, qualificação ativa, resposta de dúvidas complexas e agendamentos 24/7.",
                indicacao: "Negócios com alto fluxo de suporte inicial ou que precisam filtrar curiosos antes do comercial.",
              },
              {
                title: "Integração de Sistemas",
                badge: "Workflows",
                oQueE: "Fazer ferramentas distintas trabalharem juntas sem digitação humana.",
                oQueFaz: "Sincronização de planilhas, bancos de dados, faturas e ERPs de forma automática.",
                indicacao: "Gestores que identificam a equipe gastando horas copiando e colando dados manualmente.",
              },
              {
                title: "Arquitetura de Receita",
                badge: "Stack Digital",
                oQueE: "Desenho da infraestrutura digital para suportar o crescimento da empresa.",
                oQueFaz: "Seleção, montagem e integração de todas as ferramentas e fluxos da área comercial.",
                indicacao: "Empresas em rápida expansão que sentem que a operação virou um caos de sistemas desconexos.",
              },
              {
                title: "Dashboards & BI",
                badge: "Telemetria",
                oQueE: "Transformação de dados brutos e planilhas em painéis visuais fáceis de ler.",
                oQueFaz: "Gráficos de vendas, margem líquida e gargalos integrados automaticamente em tempo real.",
                indicacao: "Empresários que sentem que estão pilotando às cegas e não sabem suas métricas reais.",
              },
              {
                title: "Landing Pages com IA",
                badge: "Atração",
                oQueE: "Páginas de captura com sistemas inteligentes de qualificação acoplados.",
                oQueFaz: "Criação do site com formulários integrados que iniciam conversas imediatas no WhatsApp.",
                indicacao: "Profissionais liberais (advogados, médicos) ou produtores que precisam captar clientes ativamente.",
              },
              {
                title: "Consultoria de Maturidade",
                badge: "Roadmap",
                oQueE: "Diagnóstico profundo para estruturar a modernização tecnológica.",
                oQueFaz: "Análise de processos e entrega de roteiro técnico focado em eficiência e retorno financeiro.",
                indicacao: "Empresas tradicionais que desejam se digitalizar, mas não sabem por qual etapa começar.",
              },
              {
                title: "Multi-Agentes Autónomos",
                badge: "Sistemas Autónomos",
                oQueE: "IAs coordenadas cooperando em tarefas complexas e em lote.",
                oQueFaz: "Fluxo sequencial de tarefas (ex: uma IA pesquisa, outra redige, e uma terceira revisa).",
                indicacao: "Agências, equipes de marketing ou times que demandam alta escala em processos repetitivos.",
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl hover:border-indigo-500/20 hover:bg-slate-900/80 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="space-y-3 mb-6 text-xs text-slate-400">
                    <div>
                      <span className="block font-bold text-slate-500 uppercase tracking-widest text-[9px] mb-1">O que é</span>
                      <p className="font-light leading-relaxed">{item.oQueE}</p>
                    </div>
                    <div>
                      <span className="block font-bold text-slate-500 uppercase tracking-widest text-[9px] mb-1">O que fazemos</span>
                      <p className="font-light leading-relaxed">{item.oQueFaz}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <span className="block font-bold text-emerald-400 uppercase tracking-widest text-[9px] mb-1">Gatilho de Prospecção</span>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    💡 &quot;{item.indicacao}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Holistic Integration & Lead Telemetry */}
      <section className="py-20 bg-slate-950 border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Como Funciona a Telemetria de Indicações
            </h2>
            <p className="text-slate-400 mt-3 font-light text-lg">
              Sem planilhas manuais ou adivinhações. Nosso ecossistema rastreia a jornada em tempo real com segurança total.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            
            {/* Passo 1 */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 relative flex flex-col space-y-4">
              <div className="text-3xl font-black text-indigo-500/50">01</div>
              <h4 className="font-bold text-white">Cadastro & Papel</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Crie sua credencial selecionando seu papel de atuação (Vendas ou Integração) na página `/signup` do ecossistema.
              </p>
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1 pt-2">
                <UserCheck className="w-4 h-4"/> Homologação rápida
              </div>
            </div>

            {/* Passo 2 */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 relative flex flex-col space-y-4">
              <div className="text-3xl font-black text-indigo-500/50">02</div>
              <h4 className="font-bold text-white">Link de Rastreio</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                No seu painel do parceiro, copie seu link com o parâmetro de cookies exclusivo `?ref=id` estruturado e verificado.
              </p>
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1 pt-2">
                <BookOpen className="w-4 h-4"/> Cookie de 60 dias
              </div>
            </div>

            {/* Passo 3 */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 relative flex flex-col space-y-4">
              <div className="text-3xl font-black text-indigo-500/50">03</div>
              <h4 className="font-bold text-white">Fluxo `/apply` Seguro</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Quando o lead clica na sua indicação, preenche a análise de gargalo em `/apply` ou finaliza a compra em `/checkout`.
              </p>
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1 pt-2">
                <Landmark className="w-4 h-4"/> Atribuição por cookie/local
              </div>
            </div>

            {/* Passo 4 */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 relative flex flex-col space-y-4">
              <div className="text-3xl font-black text-indigo-500/50">04</div>
              <h4 className="font-bold text-white">Atribuição por Webhook</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Nosso endpoint `/api/apply` detecta a referência criptografada, adiciona ao Firestore e dispara o webhook para o n8n creditando o LTV.
              </p>
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1 pt-2">
                <TrendingUp className="w-4 h-4"/> Payout via dashboard
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Complete Legal & Commercial FAQ Section */}
      <section className="py-20 bg-slate-900/40 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase text-indigo-400 tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Perguntas Frequentes
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-4">
              Esclarecimentos Jurídicos e de Repasses
            </h2>
          </div>

          <div className="space-y-6">
            
            {/* FAQ 1 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Como é assinado o contrato de repasse? Existe vínculo empregatício?
              </h4>
              <p className="text-slate-400 text-sm mt-3 font-light leading-relaxed">
                Não. A relação de parceria é regida por um Termo de Homologação de Indicações (MOU) de caráter estritamente mercantil. O parceiro emite Nota Fiscal (NFSe) correspondente às comissões auditadas no dashboard no fechamento de cada mês, sem qualquer subordinação ou exclusividade laboral.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Quem arca com custos de infraestrutura caso a IA pare de funcionar?
              </h4>
              <p className="text-slate-400 text-sm mt-3 font-light leading-relaxed">
                A SinergIA assume integralmente o suporte operacional nível 2 e 3 e a responsabilidade de uptime dos servidores privados. Em caso de quedas de serviços de LLM externos (como interrupção nos datacenters da OpenAI ou Anthropic), o contrato de licença firmado diretamente com o cliente prevê cláusulas de força maior, isentando a agência integradora ou o parceiro comissionado de multas ou ônus judiciais.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Posso comercializar como White-Label (usando minha própria marca)?
              </h4>
              <p className="text-slate-400 text-sm mt-3 font-light leading-relaxed">
                Autorizamos o modelo de **Co-branding**. Isso significa que você pode vender as automações com o selo &quot;Powered by SinergIA OS&quot;, permitindo que seu cliente saiba que a infraestrutura crítica é operada e assegurada por uma holding consolidada. Esse modelo protege sua marca de eventuais passivos regulatórios que um White-Label puro traria em caso de auditorias da LGPD.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Como funciona o repasse em caso de inadimplência do cliente?
              </h4>
              <p className="text-slate-400 text-sm mt-3 font-light leading-relaxed">
                A comissão do parceiro é repassada mediante a confirmação da quitação de cada parcela da mensalidade paga pelo cliente final. Caso o cliente fique inadimplente, o repasse daquele respectivo faturamento é suspenso temporariamente e retomado de forma retroativa assim que a pendência for liquidada pela holding.
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
            Construa um Canal de Recorrência Seguro
          </h2>
          <p className="text-slate-300 font-light text-base md:text-lg mb-10">
            Chega de soluções artesanais e instáveis. Ofereça infraestrutura robusta, conformidade de dados real e garanta sua margem livre de riscos.
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
