'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { 
  Bot, 
  Activity, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Cpu, 
  Wifi, 
  Clock, 
  Settings, 
  BookOpen, 
  PlayCircle,
  ShieldAlert
} from "lucide-react"
import { nichesData } from '@/data/niches'
import { usePerformance } from '@/hooks/usePerformance'
import { getOperationLogsStream, OperationLog } from '@/services/firestoreService'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts"

const darkFunnelConfig = {
  score: {
    label: "Intensidade",
    color: "hsl(var(--emerald-500))",
  },
  direct: { label: "Tráfego Direto", color: "hsl(var(--emerald-500))" },
  social: { label: "Dark Social", color: "hsl(var(--indigo-500))" },
  intent: { label: "Intenção de Busca", color: "hsl(var(--cyan-500))" },
  outbound: { label: "Outbound Ativo", color: "hsl(var(--amber-500))" },
} satisfies ChartConfig

const revenueRecoveryConfig = {
  recovered: { label: "Receita Blindada (R$)", color: "#10b981" },
} satisfies ChartConfig

const allocationConfig = {
  comercial: { label: "Crescimento (SinergIA Crescimento)", color: "#10b981" },
  suporte: { label: "Conexão (SinergIA Conexão)", color: "#6366f1" },
  backoffice: { label: "Fluxo (SinergIA Fluxo)", color: "#06b6d4" },
} satisfies ChartConfig

const recoveryData = [
  { period: "Semana 1", recovered: 4200 },
  { period: "Semana 2", recovered: 8500 },
  { period: "Semana 3", recovered: 15400 },
  { period: "Semana 4", recovered: 23100 },
  { period: "Semana 5", recovered: 31200 },
  { period: "Semana 6", recovered: 45000 },
]

const sonarData = [
  { item: "Tráfego Direto", score: 85 },
  { item: "Dark Social", score: 65 },
  { item: "Intenção de Busca", score: 90 },
  { item: "Outbound Ativo", score: 45 },
  { item: "Menções de Marca", score: 70 },
  { item: "Pesquisa Concorrentes", score: 80 },
]

const cognitiveLoadData = [
  {
    category: "Carga de IA",
    comercial: 42,
    suporte: 30,
    backoffice: 24,
  }
]

interface LeadData {
  id?: string
  companyId: string
  name: string
  email: string
  nichoSlug: string
  document?: string
  phone?: string
  revenue?: string
  status: string
  blueprintId?: string
  malhas?: string[]
  stackLevel?: number
}

interface ClientDashboardProps {
  lead: LeadData
}

export default function ClientDashboard({ lead }: ClientDashboardProps) {
  const [logs, setLogs] = useState<OperationLog[]>([])
  const [localLogs, setLocalLogs] = useState<OperationLog[]>([])
  const [draftText, setDraftText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [showPactoModal, setShowPactoModal] = useState(false)

  const radarChartId = React.useId()
  const areaChartId = React.useId()
  const barChartId = React.useId()

  // Buscar os playbooks e o nicho ativo
  const activeNicheSlug = lead.nichoSlug || 'commerce-omnichannel-vendas'
  const nicheInfo = nichesData[activeNicheSlug] || nichesData['commerce-omnichannel-vendas']

  const slotsCount = lead.malhas?.length || 0
  const { efficiencyGains, hoursEmancipated } = usePerformance(slotsCount, lead.nichoSlug)

  useEffect(() => {
    // Escuta em tempo real dos logs de operação da empresa do cliente
    const unsubscribe = getOperationLogsStream(lead.companyId, (streamedLogs) => {
      setLogs(streamedLogs)
    })
    return () => unsubscribe()
  }, [lead.companyId])

  useEffect(() => {
    if (logs.length > 0) {
      setLocalLogs(logs)
    } else {
      setLocalLogs(getNicheFallbackLogs())
    }
  }, [logs, lead.nichoSlug])

  const warningLogIndex = localLogs.findIndex(log => log.status === 'WARNING')
  const warningLog = warningLogIndex !== -1 ? localLogs[warningLogIndex] : null

  // Initialize draft text when warningLog is found or changed
  useEffect(() => {
    if (warningLog) {
      const slug = lead.nichoSlug;
      if (slug === 'commerce-omnichannel-vendas') {
        setDraftText('Prezado parceiro, compreendemos perfeitamente a flutuação do mercado. Para garantir nossa aliança de longo prazo e de acordo com o nosso Pacto de Humanidade, propomos uma bonificação de 10% nas próximas 3 parcelas e suporte dedicado direto. O que acha?');
      } else if (slug === 'faturamento-saude-bemestar') {
        setDraftText('Olá, lamentamos profundamente o transtorno em sua consulta. Já registramos sua queixa e gostaríamos de oferecer um encaixe prioritário amanhã às 14h com o Dr. Carlos para resolvermos tudo. Podemos confirmar?');
      } else if (slug === 'operacoes-urgencia-logistica') {
        setDraftText('Alerta SEFAZ: Identificamos divergência fiscal na emissão da NF-e #1092. Minuta de carta de correção eletrônica elaborada: retificação do código de tributação de ICMS interestadual. Favor liberar para retransmissão.');
      } else {
        setDraftText('Olá, compreendemos sua necessidade específica. Elaboramos uma solução sob medida respeitando o Pacto de Humanidade para garantir a máxima eficiência com empatia. Podemos prosseguir com esta resposta?');
      }
    }
  }, [warningLog, lead.nichoSlug])

  const triggerMockAnomaly = () => {
    const timeNow = new Date()
    const anomalyLog: OperationLog = {
      agentName: 'SinergIA Conexão',
      action: 'Cliente no WhatsApp manifestou objeção crítica sobre contrato de atacado. Sentimento de frustração detectado.',
      status: 'WARNING',
      createdAt: timeNow
    }
    setLocalLogs(prev => [anomalyLog, ...prev])
    setIsApproved(false)
  }

  // Obter agentes dinâmicos a partir das malhas contratadas
  const getActiveAgents = () => {
    const activeMalhas = lead.malhas && lead.malhas.length > 0 
      ? lead.malhas 
      : ['SinergIA Crescimento', 'SinergIA Conexão']; // fallback robusto

    return activeMalhas.map((m, idx) => {
      const lower = m.toLowerCase();
      let name = 'SinergIA Conexão';
      let desc = 'Módulo autônomo de conexão e acolhimento conversacional.';
      let ping = '34ms';
      let uptime = '99.98%';
      let role = 'Conscious Engine';

      if (lower.includes('sales') || lower.includes('venda') || lower.includes('comercial') || lower.includes('crescimento') || lower.includes('growth') || lower.includes('piloto')) {
        name = 'SinergIA Crescimento';
        desc = nicheInfo.hooks?.pilotoAutomatico?.description || 'Engrenagem de atração baseada em valor real, links tokenizados e engajamento autônomo.';
        ping = '34ms';
        uptime = '99.98%';
        role = 'Crescimento';
      } else if (lower.includes('resgate') || lower.includes('intercepção') || lower.includes('conexão') || lower.includes('conexao') || lower.includes('cx') || lower.includes('suporte') || lower.includes('support')) {
        name = 'SinergIA Conexão';
        desc = nicheInfo.hooks?.resgateAtivo?.description || 'Acolhimento humanizado no WhatsApp focado em compreender as dores e construir confiança.';
        ping = '42ms';
        uptime = '99.95%';
        role = 'Conexão';
      } else if (lower.includes('backoffice') || lower.includes('conciliação') || lower.includes('ops') || lower.includes('bpo') || lower.includes('fluxo')) {
        name = 'SinergIA Fluxo';
        desc = nicheInfo.hooks?.backoffice?.description || 'Malha de processamento de retaguarda invisível que elimina o trabalho braçal e concilia dados.';
        ping = '28ms';
        uptime = '100.00%';
        role = 'Fluxo';
      } else {
        if (idx === 0) {
          name = 'SinergIA Conexão';
          desc = nicheInfo.hooks?.resgateAtivo?.description || 'Acolhimento humanizado no WhatsApp focado em compreender as dores e construir confiança.';
          ping = '42ms';
          uptime = '99.95%';
          role = 'Conexão';
        } else if (idx === 1) {
          name = 'SinergIA Fluxo';
          desc = nicheInfo.hooks?.backoffice?.description || 'Malha de processamento de retaguarda invisível que elimina o trabalho braçal e concilia dados.';
          ping = '28ms';
          uptime = '100.00%';
          role = 'Fluxo';
        } else {
          name = 'SinergIA Crescimento';
          desc = nicheInfo.hooks?.pilotoAutomatico?.description || 'Engrenagem de atração baseada em valor real, links tokenizados e engajamento autônomo.';
          ping = '34ms';
          uptime = '99.98%';
          role = 'Crescimento';
        }
      }

      return { name, desc, ping, uptime, role };
    });
  }

  const agents = getActiveAgents()

  // Logs fallback temáticos por nicho caso a coleção do Firestore esteja vazia
  const getNicheFallbackLogs = (): OperationLog[] => {
    const slug = lead.nichoSlug
    const timeNow = new Date()
    
    const formatAgo = (mins: number) => new Date(timeNow.getTime() - mins * 60 * 1000)

    if (slug === 'faturamento-saude-bemestar') {
      return [
        { agentName: 'SinergIA Conexão', action: 'Paciente manifestou insatisfação grave no atendimento de retorno. Sentimento crítico detectado.', status: 'WARNING', createdAt: formatAgo(2) },
        { agentName: 'SinergIA Conexão', action: 'Consulta agendada confirmada pelo paciente via WhatsApp.', status: 'SUCCESS', createdAt: formatAgo(12) },
        { agentName: 'SinergIA Fluxo', action: 'Auditoria de guias médicas TISS/TUSS concluída para a operadora SulAmérica.', status: 'SUCCESS', createdAt: formatAgo(25) },
        { agentName: 'SinergIA Conexão', action: 'Paciente solicitou cancelamento. Vaga remanejada automaticamente para lista de espera.', status: 'SUCCESS', createdAt: formatAgo(45) },
      ]
    }
    
    if (slug === 'commerce-omnichannel-vendas') {
      return [
        { agentName: 'SinergIA Conexão', action: 'Cliente no WhatsApp solicitou renegociação complexa de contrato de atacado.', status: 'WARNING', createdAt: formatAgo(1) },
        { agentName: 'SinergIA Fluxo', action: 'Abandono de carrinho detectado. Recuperação de Pix enviada via WhatsApp.', status: 'SUCCESS', createdAt: formatAgo(3) },
        { agentName: 'SinergIA Fluxo', action: 'Divergência de frete de R$ 14,80 detectada na API dos Correios e contestada no ERP.', status: 'SUCCESS', createdAt: formatAgo(10) },
        { agentName: 'SinergIA Crescimento', action: 'Venda de Playbook fechada no Direct do Instagram. Cupom fiscal emitido.', status: 'SUCCESS', createdAt: formatAgo(35) },
      ]
    }

    if (slug === 'operacoes-urgencia-logistica') {
      return [
        { agentName: 'SinergIA Fluxo', action: 'Divergência crítica de Nota Fiscal com valor acima do threshold de segurança da IA.', status: 'WARNING', createdAt: formatAgo(2) },
        { agentName: 'SinergIA Fluxo', action: 'Endereço validado. Motorista despachado para entrega prioritária.', status: 'SUCCESS', createdAt: formatAgo(5) },
        { agentName: 'SinergIA Visão', action: 'Alerta de revisão preventiva emitido por telemetria IoT do ativo #AC-40.', status: 'SUCCESS', createdAt: formatAgo(14) },
        { agentName: 'SinergIA Fluxo', action: 'Packing list e Invoice auditados. Liberação na SEFAZ concluída.', status: 'SUCCESS', createdAt: formatAgo(22) },
      ]
    }

    // Default Fallback
    return [
      { agentName: 'SinergIA Conexão', action: 'Mensagem de cliente detectada com sentimentos sensíveis e insatisfação.', status: 'WARNING', createdAt: formatAgo(2) },
      { agentName: 'SinergIA Crescimento', action: 'Lead qualificado de alto ticket interceptado e integrado ao funil de CRM.', status: 'SUCCESS', createdAt: formatAgo(5) },
      { agentName: 'SinergIA Visão', action: 'Processamento de anomalia comportamental de tráfego web concluído.', status: 'SUCCESS', createdAt: formatAgo(10) },
      { agentName: 'SinergIA Fluxo', action: 'Conciliação automática de recebíveis do gateway executada.', status: 'SUCCESS', createdAt: formatAgo(18) },
      { agentName: 'SinergIA Academia', action: 'Playbook de treinamento cognitivo atualizado no repositório de agentes.', status: 'SUCCESS', createdAt: formatAgo(30) },
    ]
  }

  const displayLogs = localLogs.length > 0 ? localLogs : (logs.length > 0 ? logs : getNicheFallbackLogs())

  // Verificar se há necessidade de intervenção humana (Sentimento Crítico ou Exceção de Regra)
  const needsHumanIntervention = displayLogs.some(log => 
    log.status === 'WARNING' || 
    log.action.toLowerCase().includes('artesão') || 
    log.action.toLowerCase().includes('artesao') || 
    log.action.toLowerCase().includes('crítico') || 
    log.action.toLowerCase().includes('critico') || 
    log.action.toLowerCase().includes('insatisfação') ||
    log.action.toLowerCase().includes('sensível')
  );

  // Formatação amigável das datas dos logs
  const formatLogTime = (createdAt: any) => {
    if (!createdAt) return 'Recent'
    let date: Date
    if (typeof createdAt === 'string') {
      date = new Date(createdAt)
    } else if (createdAt.toDate) {
      date = createdAt.toDate()
    } else if (createdAt.seconds) {
      date = new Date(createdAt.seconds * 1000)
    } else if (createdAt instanceof Date) {
      date = createdAt
    } else {
      return 'Recent'
    }

    if (isNaN(date.getTime())) return 'Recent'
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden pb-12">
      {/* Background Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Admin Status Bar */}
      <div className="border-b border-white/10 bg-slate-950/50 backdrop-blur-xl relative z-20">
        <div className="px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <div>
              <h1 className="text-lg font-black text-white tracking-tight">Cockpit SinergIA</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPactoModal(true)}
              className="h-8 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 gap-1.5 text-xs rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.05)] bg-slate-950/50"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Pacto de Humanidade
            </Button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-400 font-medium">
               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
               Sistemas Operacionais
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-slate-400">
               Nicho: {nicheInfo.shortTitle || nicheInfo.title}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10 space-y-8">
        
        {/* Header Title */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Olá, {lead.name}
            </h2>
            <p className="text-slate-400 mt-2 font-medium flex items-center gap-2 text-sm font-light">
              SinergIA OS rodando com infraestrutura privada para a sua empresa <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/app/client/settings">
              <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 gap-2 text-xs">
                <Settings className="w-3.5 h-3.5" /> Configurações de Deploy
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 gap-2 text-xs shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
              onClick={triggerMockAnomaly}
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Simular Intercorrência
            </Button>
          </div>
        </header>

        {/* BANNER DE PRÉ-IMPLANTAÇÃO PARA CLIENTES CORPORATIVOS */}
        {lead.status === 'waiting_onboarding_call' && (
          <div className="bg-slate-900/60 border border-cyan-500/25 shadow-[0_0_30px_rgba(6,182,212,0.08)] rounded-[2rem] p-6 relative overflow-hidden backdrop-blur-xl transform-gpu will-change-transform animate-in fade-in duration-500">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-500"></div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-cyan-400">
                    AMBIENTE DE PRÉ-IMPLANTAÇÃO (SANDBOX ATIVA)
                  </span>
                </div>
                <h4 className="text-base font-black text-white">Reunião de Homologação de Setup Reservada</h4>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed font-light">
                  Seu horário para a call técnica de deploy assistido da stack <strong className="text-white">Nível {lead.stackLevel || 3}</strong> está confirmado. Enquanto aguarda nossa engenharia, sinta-se livre para testar as malhas cognitivas simuladas e injetar playbooks de teste na base de conhecimento.
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-center py-3 px-5 bg-slate-950 border border-white/5 rounded-2xl">
                <div className="text-center font-mono">
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">Status da Ativação</span>
                  <span className="text-xs font-bold text-cyan-400">AGENDADO</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEÇÃO 1: STATUS DOS AGENTES POR NICHO */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
             <Bot className="w-5 h-5 text-emerald-400 animate-pulse" /> Motores Cognitivos Ativos
          </h3>
          <div className={`grid grid-cols-1 md:grid-cols-${Math.min(3, agents.length)} gap-6`}>
            {agents.map((agent, idx) => (
              <Card key={idx} className="bg-slate-950/40 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 rounded-2xl relative overflow-hidden group transform-gpu will-change-transform shadow-[0_0_30px_rgba(16,185,129,0.02)] hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]">
                <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{agent.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{agent.role}</span>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-0 flex items-center gap-1">
                      <Wifi className="w-3 h-3 animate-pulse" /> OPERACIONAL
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed min-h-[40px] font-light">{agent.desc}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-center text-xs">
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Latência</div>
                      <div className="text-white font-bold font-mono mt-0.5">{agent.ping}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Uptime</div>
                      <div className="text-white font-bold font-mono mt-0.5">{agent.uptime}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* COLUNA ESQUERDA: GRÁFICO FINANCEIRO + TERMINAL DE LOGS */}
          <div className="lg:col-span-2 space-y-8">
            {/* TELEMETRIA DE EMANCIPAÇÃO OPERACIONAL */}
            <Card className="bg-slate-950/40 border border-white/10 backdrop-blur-xl overflow-hidden relative transform-gpu will-change-transform shadow-[0_0_50px_rgba(99,102,241,0.02)]">
              <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400"></div>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white">Telemetria de Emancipação Operacional</h4>
                  <p className="text-xs text-slate-400">Pacto de Humanidade: Liberação do capital intelectual para estratégia e criatividade</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-white/5">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                      Tempo Humano Emancipado
                      <span 
                        title={`Fórmula: (Colaboradores * 0.4) * 8 horas semanais. Baseado nos atritos de latência operacional de ${nicheInfo.shortTitle || 'nicho'}.`}
                        className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[9px] text-slate-500 cursor-help hover:text-white transition-colors"
                      >
                        ?
                      </span>
                    </span>
                    <div className="text-2xl md:text-3xl font-black text-white font-mono tracking-tight">
                      {hoursEmancipated.toLocaleString('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}h
                    </div>
                    <span className="text-[10px] text-slate-400 block font-light">Horas de Carga Braçal Eliminadas</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                      Retorno do Capital Intelectual
                      <span 
                        title={`Fórmula: (Faturamento Mensal * 0.12) * 12 meses. Vazamento de receita estancado por eliminação de no-shows e delays.`}
                        className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[9px] text-slate-500 cursor-help hover:text-white transition-colors"
                      >
                        ?
                      </span>
                    </span>
                    <div className="text-2xl md:text-3xl font-black text-emerald-400 font-mono tracking-tight">
                      {efficiencyGains.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <span className="text-[10px] text-slate-400 block font-light">Capital Intelectual Liberado para Estratégia e Criatividade Humana</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Curva de Recuperação Histórica (LTV & Tempo Salvo)</span>
                  <div className="h-48">
                    <ChartContainer id={areaChartId} config={revenueRecoveryConfig} className="w-full h-full">
                      <AreaChart data={recoveryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="sinergia-gradient-recovered" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis 
                          dataKey="period" 
                          stroke="rgba(255,255,255,0.3)" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.3)" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(val) => `R$ ${val}`}
                        />
                        <ChartTooltip content={<ChartTooltipContent className="bg-slate-950/80 border-white/10 backdrop-blur-md" />} />
                        <Area 
                          type="monotone" 
                          dataKey="recovered" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#sinergia-gradient-recovered)" 
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TERMINAL DE LOGS DE IA EM TEMPO REAL */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <Terminal className="w-5 h-5 text-indigo-400" /> Console de Telemetria Viva
              </h3>
              {warningLog && !isApproved && (
                <div className="bg-slate-900/40 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.05)] hover:border-amber-500/30 transition-all duration-500 rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl transform-gpu will-change-transform">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500"></div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/25 shrink-0">
                        <ShieldAlert className="w-5 h-5 text-amber-500 animate-pulse" />
                      </div>
                      <div>
                        <span className="font-extrabold uppercase tracking-widest text-[9px] bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/30 block w-max">
                          REQUER CURADORIA DO ARTESÃO (HUMAN-IN-THE-LOOP)
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1.5">Interceptação de Fluxo Cognitivo</h4>
                      </div>
                    </div>

                    <div className="bg-slate-950/60 border border-white/5 rounded-xl p-4 space-y-2 text-xs">
                      <div className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">Ocorrência Crítica</div>
                      <div className="text-slate-300 font-mono leading-relaxed">{warningLog.action}</div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                        Rascunho do Agente (Editável)
                      </label>
                      <textarea
                        className="w-full h-32 bg-slate-950/80 border border-white/10 rounded-xl p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all resize-none leading-relaxed"
                        value={draftText}
                        onChange={(e) => setDraftText(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                      <Button
                        variant="outline"
                        className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-xs px-4 py-2 rounded-xl"
                        onClick={() => {
                          const updated = [...localLogs];
                          updated[warningLogIndex] = {
                            ...warningLog,
                            action: 'Alerta ignorado e atendimento direcionado para canal humano especializado.',
                            status: 'SUCCESS'
                          };
                          setLocalLogs(updated);
                        }}
                      >
                        Encaminhar Direct ao Humano
                      </Button>

                      <Button
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 border-0"
                        disabled={isSubmitting}
                        onClick={() => {
                          setIsSubmitting(true);
                          setTimeout(() => {
                            setIsSubmitting(false);
                            setIsApproved(true);
                            
                            const timeNow = new Date();
                            const resolvedLog: OperationLog = {
                              agentName: 'SinergIA Conexão',
                              action: `Pacto de Envio liberado pelo Artesão: "${draftText.substring(0, 60)}..."`,
                              status: 'SUCCESS',
                              createdAt: timeNow
                            };
                            
                            const updated = [...localLogs];
                            updated[warningLogIndex] = {
                              ...warningLog,
                              status: 'SUCCESS',
                              action: 'Fricção resolvida sob curadoria consciente.'
                            };
                            
                            setLocalLogs([resolvedLog, ...updated]);
                          }, 1500);
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Validando &amp; Disparando...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Aprovar Pacto &amp; Liberar Envio</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {isApproved && (
                <div className="bg-emerald-950/30 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)] rounded-2xl p-5 flex items-start justify-between gap-4 text-emerald-400 text-xs md:text-sm font-medium backdrop-blur-xl animate-in fade-in zoom-in duration-300">
                  <div className="flex gap-4">
                    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/25 shrink-0 h-max">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="font-extrabold uppercase tracking-widest text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 block w-max mb-1.5">
                        PACTO EXECUTADO CON SUCESSO
                      </span>
                      <p className="leading-relaxed text-slate-300 font-light">
                        Mensagem de acolhimento validada e transmitida! O fluxo cognitivo do SinergIA OS foi reativado e a harmonia operacional restabelecida com a inteligência humanocêntrica.
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs py-1 px-2.5 h-auto rounded-lg shrink-0"
                    onClick={() => setIsApproved(false)}
                  >
                    Ocultar
                  </Button>
                </div>
              )}
              <Card className="bg-slate-950/40 border border-white/10 backdrop-blur-xl overflow-hidden transform-gpu will-change-transform shadow-[0_0_40px_rgba(99,102,241,0.02)]">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-slate-950/60 text-xs font-black text-slate-500 uppercase tracking-widest">
                          <th className="py-3 px-6">Timestamp</th>
                          <th className="py-3 px-6">Agente</th>
                          <th className="py-3 px-6">Ação Realizada</th>
                          <th className="py-3 px-6 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs md:text-sm font-mono">
                        {displayLogs.map((log, idx) => (
                          <tr key={log.id || idx} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-slate-500 font-semibold whitespace-nowrap">
                              {formatLogTime(log.createdAt)}
                            </td>
                            <td className="py-4 px-6 text-indigo-400 font-bold whitespace-nowrap">
                              {log.agentName}
                            </td>
                            <td className="py-4 px-6 text-slate-300">
                              {log.action}
                            </td>
                            <td className="py-4 px-6 text-right whitespace-nowrap">
                              {log.status === 'WARNING' ? (
                                <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px]">
                                  REQUER ARTESÃO
                                </Badge>
                              ) : (
                                <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-0 text-[10px]">
                                  SUCCESS
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* HISTÓRICO DE CURADORIAS APROVADAS */}
            {(() => {
              const approvedCurations = localLogs.filter(log => 
                log.action.includes('curador') || 
                log.action.includes('curada') || 
                log.action.includes('liberado') || 
                log.action.includes('Pacto de Envio') ||
                log.action.includes('resolvida')
              );
              if (approvedCurations.length === 0) return null;
              return (
                <Card className="bg-slate-950/40 border border-white/10 backdrop-blur-xl overflow-hidden relative transform-gpu will-change-transform shadow-[0_0_30px_rgba(16,185,129,0.01)] hover:shadow-[0_0_35px_rgba(16,185,129,0.04)] rounded-2xl">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-white text-sm">Arquivo do Pacto (Curadorias Aprovadas)</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Mapeamento de exceções e atritos operacionais resolvidos pelo Artesão</p>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-[10px] font-bold">
                        {approvedCurations.length} Eventos Blindados
                      </Badge>
                    </div>
                    <div className="space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar pr-1">
                      {approvedCurations.map((curation, idx) => (
                        <div key={idx} className="bg-slate-950/70 border border-white/5 rounded-xl p-3.5 text-xs flex items-center justify-between gap-4 font-mono animate-in fade-in duration-300">
                          <div className="text-slate-300 truncate max-w-[80%] leading-relaxed flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                            {curation.action}
                          </div>
                          <span className="text-[10px] text-slate-500 shrink-0 font-semibold">{formatLogTime(curation.createdAt)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </div>
          
          {/* COLUNA DIREITA: SONAR RADAR + ALOCAÇÃO COGNITIVA */}
          <div className="space-y-8">
            {/* SONAR (RADAR CHART) */}
            <Card className="bg-slate-950/40 border border-white/10 backdrop-blur-xl overflow-hidden relative group transform-gpu will-change-transform shadow-[0_0_50px_rgba(6,182,212,0.02)]">
              <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 to-indigo-500"></div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Sonar de Interceptação de Intenção
                  </h4>
                  <p className="text-xs text-slate-400">Varredura em tempo real do &quot;Dark Funnel&quot; de leads</p>
                </div>
                
                <div className="flex justify-center items-center h-[260px]">
                  <ChartContainer id={radarChartId} config={darkFunnelConfig} className="w-full h-full aspect-square max-h-[250px]">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={sonarData}>
                      <defs>
                        <linearGradient id="sinergia-gradient-radar" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <PolarGrid stroke="rgba(255,255,255,0.08)" />
                      <PolarAngleAxis dataKey="item" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} />
                      <Radar 
                        name="Intensidade" 
                        dataKey="score" 
                        stroke="#10b981" 
                        fill="url(#sinergia-gradient-radar)" 
                        fillOpacity={0.7} 
                        dot={{ r: 4, fill: "#10b981", stroke: "#020617", strokeWidth: 2 }}
                      />
                      <ChartTooltip content={<ChartTooltipContent className="bg-slate-950/80 border-white/10 backdrop-blur-md" />} />
                    </RadarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* MATRIZ DE ALOCAÇÃO DE CARGA COGNITIVA (BAR CHART EMPILHADO HORIZONTAL) */}
            <Card className="bg-slate-950/40 border border-white/10 backdrop-blur-xl overflow-hidden relative transform-gpu will-change-transform shadow-[0_0_50px_rgba(16,185,129,0.02)]">
              <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-emerald-400 animate-pulse" />
                    Matriz de Alocação Cognitiva
                  </h4>
                  <p className="text-xs text-slate-400">Distribuição de processamento do Swarm AI ativo</p>
                </div>
                
                <div className="h-16">
                  <ChartContainer id={barChartId} config={allocationConfig} className="w-full h-full">
                    <BarChart 
                      data={cognitiveLoadData} 
                      layout="vertical" 
                      margin={{ top: 0, right: 10, left: -40, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="sinergia-gradient-comercial" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="5%" stopColor="#10b981" />
                          <stop offset="95%" stopColor="#059669" />
                        </linearGradient>
                        <linearGradient id="sinergia-gradient-suporte" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="5%" stopColor="#6366f1" />
                          <stop offset="95%" stopColor="#4f46e5" />
                        </linearGradient>
                        <linearGradient id="sinergia-gradient-backoffice" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="5%" stopColor="#06b6d4" />
                          <stop offset="95%" stopColor="#0891b2" />
                        </linearGradient>
                      </defs>
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis type="category" dataKey="category" hide />
                      <ChartTooltip content={<ChartTooltipContent className="bg-slate-950/80 border-white/10 backdrop-blur-md" />} />
                      <Bar dataKey="comercial" stackId="a" fill="url(#sinergia-gradient-comercial)" radius={[4, 0, 0, 4]} />
                      <Bar dataKey="suporte" stackId="a" fill="url(#sinergia-gradient-suporte)" />
                      <Bar dataKey="backoffice" stackId="a" fill="url(#sinergia-gradient-backoffice)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>

                {/* Legendas de consumo */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center border-t border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      SinergIA Crescimento
                    </div>
                    <div className="text-white font-bold font-mono text-sm">42%</div>
                    <div className="text-[9px] text-slate-500">Atração / Vendas</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      SinergIA Conexão
                    </div>
                    <div className="text-white font-bold font-mono text-sm">30%</div>
                    <div className="text-[9px] text-slate-500">Acolhimento / Suporte</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                      SinergIA Fluxo
                    </div>
                    <div className="text-white font-bold font-mono text-sm">24%</div>
                    <div className="text-[9px] text-slate-500">Processamento / ERP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Base References */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Base de Conhecimento */}
          <Card className="bg-slate-950/40 border border-white/5 hover:border-indigo-500/20 transition-all duration-300 transform-gpu will-change-transform shadow-[0_0_20px_rgba(99,102,241,0.01)] hover:shadow-[0_0_30px_rgba(99,102,241,0.05)]">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm md:text-base">Treinamento & Playbooks</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">Injete PDFs de contexto sobre seu negócio para o robô aprender as regras de prospecção e BANT da empresa.</p>
                <Link href="/app/client/settings">
                  <Button variant="link" className="text-indigo-400 hover:text-indigo-300 p-0 h-auto text-xs font-bold pt-2">Acessar Base de Conhecimento &rarr;</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Webhooks config (SinergIA Unified Gateway) */}
          <Card className="bg-slate-950/40 border border-white/5 hover:border-emerald-500/20 transition-all duration-300 transform-gpu will-change-transform shadow-[0_0_20px_rgba(16,185,129,0.01)] hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                <PlayCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="space-y-3 w-full">
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base">SinergIA Unified Gateway</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Direcione os payloads do Shopify, Bling ou HubSpot para o barramento de integração:
                  </p>
                </div>
                <div className="relative flex items-center bg-black/90 border border-white/10 rounded-xl p-3 font-mono text-[9px] text-emerald-400 select-all overflow-x-auto whitespace-nowrap shadow-[inset_0_0_15px_rgba(16,185,129,0.03)]">
                  <span>https://sinergia.business/api/v1/gateways/{lead.companyId}</span>
                </div>
                <div>
                  <Link href="/app/client/settings">
                    <Button variant="link" className="text-emerald-400 hover:text-emerald-300 p-0 h-auto text-xs font-bold">Ver Token de API &rarr;</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>

      {/* CERTIFICADO DIGITAL PACTO DE HUMANIDADE */}
      {showPactoModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-[2.5rem] max-w-xl w-full p-8 space-y-6 relative shadow-[0_0_50px_rgba(16,185,129,0.15)] transform-gpu will-change-transform">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-black text-white tracking-tight">Certificado do Pacto de Humanidade</h3>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Homologação SinergIA OS</p>
            </div>

            <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-6 text-xs text-slate-300 space-y-4 leading-relaxed font-light">
              <p>
                Este documento certifica que a empresa <strong className="text-white font-bold">{lead.name}</strong> opera em conformidade moral com o **Manifesto SinergIA (Tecnologia com Alma)**.
              </p>
              <div className="border-t border-white/5 pt-3 space-y-2.5">
                <div className="flex gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Emancipação do Tempo:</strong> A automação cognitiva é direcionada a eliminar trabalhos repetitivos, protegendo as horas intelectuais da equipe.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Human-in-the-Loop:</strong> Interações críticas que exijam empatia ou tratem de dados complexos aguardarão a validação consciente do Artesão.</span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-3 text-[10px] text-slate-500 font-mono">
                Assinado digitalmente por <strong className="text-slate-300">{lead.name} Adm</strong> em {new Date().toLocaleDateString('pt-BR')}.<br />
                Hash Criptográfico SHA-256:<br />
                <span className="text-[9.5px] text-emerald-400 select-all font-mono font-semibold break-all leading-normal">
                  {lead.companyId}
                </span>
              </div>
            </div>

            <Button
              onClick={() => setShowPactoModal(false)}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black uppercase tracking-wider text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] border-0"
            >
              Confirmar Compromisso Ético
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
