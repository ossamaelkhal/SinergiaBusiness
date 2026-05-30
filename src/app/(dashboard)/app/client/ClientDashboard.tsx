'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  PlayCircle 
} from "lucide-react"
import { nichesData } from '@/data/niches'
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
  comercial: { label: "Comercial (Aura Sales)", color: "#10b981" },
  suporte: { label: "Atendimento (Aura CX)", color: "#6366f1" },
  backoffice: { label: "Backoffice (Aura Ops)", color: "#06b6d4" },
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
}

interface ClientDashboardProps {
  lead: LeadData
}

export default function ClientDashboard({ lead }: ClientDashboardProps) {
  const [logs, setLogs] = useState<OperationLog[]>([])

  const radarChartId = React.useId()
  const areaChartId = React.useId()
  const barChartId = React.useId()

  // Buscar os playbooks e o nicho ativo
  const activeNicheSlug = lead.nichoSlug || 'commerce-omnichannel-vendas'
  const nicheInfo = nichesData[activeNicheSlug] || nichesData['commerce-omnichannel-vendas']

  useEffect(() => {
    // Escuta em tempo real dos logs de operação da empresa do cliente
    const unsubscribe = getOperationLogsStream(lead.companyId, (streamedLogs) => {
      setLogs(streamedLogs)
    })
    return () => unsubscribe()
  }, [lead.companyId])

  // Agentes dinâmicos baseados no nicho
  const getNicheAgents = () => {
    const slug = lead.nichoSlug
    const hooks = nicheInfo.hooks || {
      pilotoAutomatico: { title: 'Aura Sales', description: 'Qualificador de Leads e fechamento autônomo' },
      resgateAtivo: { title: 'Aura Support', description: 'Monitoramento de inativos' },
      backoffice: { title: 'Aura Backoffice', description: 'Processador de fluxos' }
    }

    return [
      {
        name: hooks.pilotoAutomatico.title,
        desc: hooks.pilotoAutomatico.description,
        ping: '34ms',
        uptime: '99.98%',
        role: 'Commercial Engine'
      },
      {
        name: hooks.resgateAtivo.title,
        desc: hooks.resgateAtivo.description,
        ping: '42ms',
        uptime: '99.95%',
        role: 'Retention Engine'
      },
      {
        name: hooks.backoffice.title,
        desc: hooks.backoffice.description,
        ping: '28ms',
        uptime: '100.00%',
        role: 'Operations Engine'
      }
    ]
  }

  const agents = getNicheAgents()

  // Logs fallback temáticos por nicho caso a coleção do Firestore esteja vazia
  const getNicheFallbackLogs = (): OperationLog[] => {
    const slug = lead.nichoSlug
    const timeNow = new Date()
    
    const formatAgo = (mins: number) => new Date(timeNow.getTime() - mins * 60 * 1000)

    if (slug === 'faturamento-saude-bemestar') {
      return [
        { agentName: 'Aura Health (CX)', action: 'Paciente detectado sem retorno há 30 dias. Mensagem de reengajamento enviada.', status: 'SUCCESS', createdAt: formatAgo(4) },
        { agentName: 'Aura Health (CX)', action: 'Consulta agendada confirmada pelo paciente via WhatsApp.', status: 'SUCCESS', createdAt: formatAgo(12) },
        { agentName: 'Aura Backoffice', action: 'Auditoria de guias médicas TISS/TUSS concluída para a operadora SulAmérica.', status: 'SUCCESS', createdAt: formatAgo(25) },
        { agentName: 'Aura Health (CX)', action: 'Paciente solicitou cancelamento. Vaga remanejada automaticamente para lista de espera.', status: 'SUCCESS', createdAt: formatAgo(45) },
      ]
    }
    
    if (slug === 'commerce-omnichannel-vendas') {
      return [
        { agentName: 'Aura Sales', action: 'Abandono de carrinho detectado. Recuperação de Pix enviada via WhatsApp.', status: 'SUCCESS', createdAt: formatAgo(3) },
        { agentName: 'Aura Auditor', action: 'Divergência de frete de R$ 14,80 detectada na API dos Correios e contestada no ERP.', status: 'SUCCESS', createdAt: formatAgo(10) },
        { agentName: 'Aura BPO', action: 'Áudio com lista de compras recebido no atacado. Carrinho gerado no ERP em 42s.', status: 'SUCCESS', createdAt: formatAgo(18) },
        { agentName: 'Aura Sales', action: 'Venda de Playbook fechada no Direct do Instagram. Cupom fiscal emitido.', status: 'SUCCESS', createdAt: formatAgo(35) },
      ]
    }

    if (slug === 'operacoes-urgencia-logistica') {
      return [
        { agentName: 'Aura Dispatcher', action: 'Endereço validado. Motorista despachado para entrega prioritária.', status: 'SUCCESS', createdAt: formatAgo(5) },
        { agentName: 'Aura Monitor', action: 'Alerta de revisão preventiva emitido por telemetria IoT do ativo #AC-40.', status: 'SUCCESS', createdAt: formatAgo(14) },
        { agentName: 'Aura DocValidator', action: 'Packing list e Invoice auditados. Liberação na SEFAZ concluída.', status: 'SUCCESS', createdAt: formatAgo(22) },
        { agentName: 'Aura Dispatcher', action: 'Ordem de serviço de urgência gerada. Entrega finalizada.', status: 'SUCCESS', createdAt: formatAgo(40) },
      ]
    }

    // Default Fallback
    return [
      { agentName: 'Aura Sales', action: 'Lead qualificado interceptado e integrado ao funil do Pipefy.', status: 'SUCCESS', createdAt: formatAgo(5) },
      { agentName: 'Aura Support', action: 'Respostas de FAQ enviadas automaticamente via chat bot.', status: 'SUCCESS', createdAt: formatAgo(15) },
      { agentName: 'Aura Backoffice', action: 'Webhook de telemetria recebido do n8n com status 200 OK.', status: 'SUCCESS', createdAt: formatAgo(30) },
      { agentName: 'Aura Support', action: 'Boleto pendente de R$ 1.200 recuperado via mensagens ativas.', status: 'SUCCESS', createdAt: formatAgo(50) },
    ]
  }

  const displayLogs = logs.length > 0 ? logs : getNicheFallbackLogs()

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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
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
          <div className="flex items-center gap-4">
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
            <p className="text-slate-400 mt-2 font-medium flex items-center gap-2 text-sm">
              SinergIA OS rodando com infraestrutura privada para a sua empresa <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </p>
          </div>
          <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 gap-2">
            <Settings className="w-4 h-4" /> Configurações de Deploy
          </Button>
        </header>

        {/* SEÇÃO 1: STATUS DOS AGENTES POR NICHO */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
             <Bot className="w-5 h-5 text-emerald-400" /> Motores Cognitivos Ativos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors rounded-2xl relative overflow-hidden group">
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
                  <p className="text-slate-400 text-xs leading-relaxed min-h-[40px]">{agent.desc}</p>
                  
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
            {/* CURVA DE RECUPERAÇÃO FINANCEIRA */}
            <Card className="bg-slate-900/60 border border-white/10 backdrop-blur-md overflow-hidden relative">
              <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400"></div>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-white">Curva de Recuperação Financeira</h4>
                    <p className="text-xs text-slate-400">Receita blindada e no-shows evitados acumulados (6 semanas)</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-sm">
                    Total: R$ 45.000
                  </Badge>
                </div>
                
                <div className="h-64">
                  <ChartContainer id={areaChartId} config={revenueRecoveryConfig} className="w-full h-full">
                    <AreaChart data={recoveryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
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
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="recovered" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRecovered)" 
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* TERMINAL DE LOGS DE IA EM TEMPO REAL */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <Terminal className="w-5 h-5 text-indigo-400" /> Console de Telemetria Viva
              </h3>
              <Card className="bg-slate-900/60 border border-white/10 backdrop-blur-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-slate-950/40 text-xs font-black text-slate-500 uppercase tracking-widest">
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
                            <td className="py-4 px-6 text-right">
                              <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-0 text-[10px]">
                                SUCCESS
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
          
          {/* COLUNA DIREITA: SONAR RADAR + ALOCAÇÃO COGNITIVA */}
          <div className="space-y-8">
            {/* SONAR MILITAR (RADAR CHART) */}
            <Card className="bg-slate-900/60 border border-white/10 backdrop-blur-md overflow-hidden relative group">
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
                      <PolarGrid stroke="rgba(255,255,255,0.08)" />
                      <PolarAngleAxis dataKey="item" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} />
                      <Radar 
                        name="Intensidade" 
                        dataKey="score" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.25} 
                        dot={{ r: 4, fill: "#10b981", stroke: "#020617", strokeWidth: 2 }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RadarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* MATRIZ DE ALOCAÇÃO DE CARGA COGNITIVA (BAR CHART EMPILHADO HORIZONTAL) */}
            <Card className="bg-slate-900/60 border border-white/10 backdrop-blur-md overflow-hidden relative">
              <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-emerald-400" />
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
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis type="category" dataKey="category" hide />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="comercial" stackId="a" fill="#10b981" radius={[4, 0, 0, 4]} />
                      <Bar dataKey="suporte" stackId="a" fill="#6366f1" />
                      <Bar dataKey="backoffice" stackId="a" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>

                {/* Legendas de consumo */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center border-t border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Aura Sales
                    </div>
                    <div className="text-white font-bold font-mono text-sm">42%</div>
                    <div className="text-[9px] text-slate-500">Comercial / BANT</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      Aura CX
                    </div>
                    <div className="text-white font-bold font-mono text-sm">30%</div>
                    <div className="text-[9px] text-slate-500">Suporte / Clientes</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      Aura Ops
                    </div>
                    <div className="text-white font-bold font-mono text-sm">24%</div>
                    <div className="text-[9px] text-slate-500">Workflows / ERP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Base References */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Base de Conhecimento */}
          <Card className="bg-slate-900 border-white/5 hover:border-white/10 transition-colors">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white">Treinamento & Playbooks</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Injete PDFs de contexto sobre seu negócio para o robô aprender as regras de prospecção e BANT da empresa.</p>
                <Button variant="link" className="text-indigo-400 hover:text-indigo-300 p-0 h-auto text-xs font-bold pt-2">Acessar Base de Conhecimento &rarr;</Button>
              </div>
            </CardContent>
          </Card>

          {/* Webhooks config */}
          <Card className="bg-slate-900 border-white/5 hover:border-white/10 transition-colors">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                <PlayCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white">Console Webhook do CRM</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Conecte o seu CRM (Pipedrive, Hubspot, Kommo) para receber as qualificações e agendamentos instantaneamente.</p>
                <Button variant="link" className="text-emerald-400 hover:text-emerald-300 p-0 h-auto text-xs font-bold pt-2">Ver Token de API &rarr;</Button>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  )
}
