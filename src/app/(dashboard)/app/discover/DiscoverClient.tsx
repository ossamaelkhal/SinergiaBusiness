'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Play, 
  Send, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Activity, 
  Zap, 
  Calendar, 
  ShieldCheck, 
  Laptop, 
  Cpu, 
  FileText 
} from "lucide-react"
import { nichesData } from '@/data/niches'
import { SetupWizard } from "@/components/dashboard/SetupWizard"
import { toast } from 'sonner'
import Link from 'next/link'

interface LeadData {
  id?: string
  name: string
  email: string
  nichoSlug: string
  document?: string
  phone?: string
  revenue?: string
  isFallback?: boolean
}

interface DiscoverClientProps {
  lead: LeadData
}

interface ChatMessage {
  id: string
  text: string
  sender: 'bot' | 'user'
  timestamp: string
}

interface TelemetryLog {
  id: string
  text: string
  type: 'info' | 'success' | 'warn'
  timestamp: string
}

export default function DiscoverClient({ lead }: DiscoverClientProps) {
  const [step, setStep] = useState(1) // 1: Provision, 2: WhatsApp Chatbot, 3: SetupWizard, 4: Unlock Checkout
  
  // Niche info resolving
  const activeNicheSlug = lead.nichoSlug || 'commerce-omnichannel-vendas'
  const nicheInfo = nichesData[activeNicheSlug] || nichesData['commerce-omnichannel-vendas']

  // Step 1: Provisioning states
  const [progress, setProgress] = useState(0)
  const [provisionLogs, setProvisionLogs] = useState<string[]>([])
  const [provisionCompleted, setProvisionCompleted] = useState(false)

  // Step 2: Chatbot Simulation states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>([])
  const [hasSentMessage, setHasSentMessage] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Step 4: Booking states
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  // Trigger Step 1: Provisioning effect
  useEffect(() => {
    if (step !== 1) return

    const logTemplates = [
      `[SYSTEM] Inicializando cluster cognitivo SinergIA OS...`,
      `[SYSTEM] Acoplando nós do cluster no banco de dados regional...`,
      `[CONFIG] Carregando playbook de automação: "${nicheInfo.shortTitle || nicheInfo.title}"`,
      `[PIPELINE] Mapeando ganchos UTMs e Meta Pixel: ${lead.name}...`,
      `[SECURITY] Gerando chaves criptográficas para API de sessão...`,
      `[ENGINE] Montando fluxo para o gargalo comercial detectado...`,
      `[SUCCESS] Nós cognitivos ativos. Simulador pronto para teste.`
    ]

    let currentProgress = 0
    let logIndex = 0

    const progressInterval = setInterval(() => {
      currentProgress += 5
      if (currentProgress > 100) {
        currentProgress = 100
        clearInterval(progressInterval)
        setProvisionCompleted(true)
      }
      setProgress(currentProgress)
    }, 200)

    const logInterval = setInterval(() => {
      if (logIndex < logTemplates.length) {
        setProvisionLogs(prev => [...prev, logTemplates[logIndex]])
        logIndex++
      } else {
        clearInterval(logInterval)
      }
    }, 550)

    return () => {
      clearInterval(progressInterval)
      clearInterval(logInterval)
    }
  }, [step, nicheInfo, lead.name])

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isTyping])

  // Setup initial chatbot welcome message
  useEffect(() => {
    if (step !== 2) return

    const hookName = nicheInfo.hooks?.pilotoAutomatico?.title || "Aura Sales"
    setChatMessages([
      {
        id: 'welcome-1',
        text: `Olá, ${lead.name}! Eu sou a IA do SinergIA OS para o nicho de ${nicheInfo.shortTitle || nicheInfo.title}.`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: 'welcome-2',
        text: `Meu módulo piloto (**${hookName}**) já está provisionado em ambiente de homologação. Digite qualquer pergunta ou envie dados de teste (como um CEP ou dúvida) para ver como respondo em milissegundos!`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ])

    setTelemetryLogs([
      {
        id: 'tel-init-1',
        text: `[SYSTEM] Homologação iniciada para lead ID: ${lead.id || 'N/A'}`,
        type: 'info',
        timestamp: new Date().toLocaleTimeString('pt-BR')
      },
      {
        id: 'tel-init-2',
        text: `[Meta CAPI] Deduplication ID pareado com Meta Pixel`,
        type: 'success',
        timestamp: new Date().toLocaleTimeString('pt-BR')
      }
    ])
  }, [step, nicheInfo, lead.name, lead.id])

  // Chat message submit handler
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userText = inputText.trim()
    setInputText('')
    setHasSentMessage(true)

    // Add user message
    const timestampStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: timestampStr
    }])

    // Add Telemetry Event Logs
    setTelemetryLogs(prev => [
      ...prev,
      {
        id: `tel-${Date.now()}-1`,
        text: `[n8n Webhook] POST /webhook/sinergia-bot - 202 Accepted`,
        type: 'info',
        timestamp: new Date().toLocaleTimeString('pt-BR')
      },
      {
        id: `tel-${Date.now()}-2`,
        text: `[Meta CAPI] Evento Lead Enviado. EventId: ${lead.id || 'fallback-id'}`,
        type: 'success',
        timestamp: new Date().toLocaleTimeString('pt-BR')
      }
    ])

    // Mock bot response logic based on niche
    setIsTyping(true)
    setTimeout(() => {
      let botResponseText = ''
      
      const slug = lead.nichoSlug
      if (slug === 'faturamento-saude-bemestar') {
        botResponseText = `Olá! Confirmamos a agenda do consultório para o dia sugerido. Prefere confirmar no horário da manhã (09:00) ou à tarde (14:30)?`
      } else if (slug === 'commerce-omnichannel-vendas') {
        botResponseText = `Olá! O frete para o CEP consultado foi calculado via Correios em R$ 12,50 (Prazo: 3 dias úteis). Gostaria de gerar o PIX copia-e-cola de R$ 145,00 para fechar agora?`
      } else if (slug === 'operacoes-urgencia-logistica') {
        botResponseText = `Entendido! Sua ordem de serviço emergencial foi gerada. Nossa frota está a caminho e o tempo estimado de chegada é de 18 minutos.`
      } else if (slug === 'bpo-financeiro-credito-tem') {
        botResponseText = `Identificamos a duplicata na SEFAZ e realizamos a validação cadastral. O limite de crédito foi pré-aprovado com sucesso para sua operação.`
      } else if (slug === 'servicos-tecnicos-comerciais') {
        botResponseText = `Orçamento preliminar calculado em R$ 3.890,00 com base nas fotos fornecidas. Deseja agendar a visita técnica de homologação presencial?`
      } else if (slug === 'reputacao-recuperacao-retencao') {
        botResponseText = `Olá, compreendemos sua solicitação. O estorno já foi solicitado pelo gateway de pagamentos seguro e a comissão de recuperação está garantida.`
      } else {
        botResponseText = `Entendido! O SinergIA OS já processou a sua mensagem com sucesso e as automações associadas ao seu CRM foram disparadas.`
      }

      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }])
      setIsTyping(false)

      // Add success telemetry log
      setTelemetryLogs(prev => [
        ...prev,
        {
          id: `tel-${Date.now()}-3`,
          text: `[Google Sheets] Dados salvos e integrados na planilha mestre`,
          type: 'success',
          timestamp: new Date().toLocaleTimeString('pt-BR')
        },
        {
          id: `tel-${Date.now()}-4`,
          text: `[WhatsApp API] Resposta entregue e lida pelo usuário`,
          type: 'success',
          timestamp: new Date().toLocaleTimeString('pt-BR')
        }
      ])
    }, 1800)
  }

  // Booking call handler
  const handleBookCall = () => {
    setBookingConfirmed(true)
    toast.success("Agenda reservada com os engenheiros C-Level da SinergIA!")
  }

  // Dynamic pricing calculation based on lead revenue
  const getPricingTier = () => {
    const rev = (lead.revenue || '').toLowerCase()
    
    // Faturamento > 2M
    if (rev.includes('acima') || rev.includes('2 milhões') || rev.includes('2m')) {
      return {
        name: 'Esquadrão IA Enterprise',
        price: 'R$ 50.000 / ano',
        desc: 'Para corporações com alta demanda de tráfego, múltiplos playbooks estruturados e suporte com SLA restrito de 1h.',
        planId: 'enterprise'
      }
    }
    // Faturamento intermediário: 100k a 2M
    if (rev.includes('500 mil') || rev.includes('100 mil a')) {
      return {
        name: 'Integração Standard Regional',
        price: 'R$ 15.000 / ano',
        desc: 'Construção da esteira sob medida para empresas em expansão, com WhatsApp BBD qualificador e integração direta no CRM.',
        planId: 'setup'
      }
    }
    // Faturamento < 100k (Até 100 mil) or fallback
    return {
      name: 'Piloto de Validação PoC',
      price: 'R$ 997 / ano',
      desc: 'Perfeito para validação acelerada. Acesso aos playbooks prontos e canais compartilhados de teste da infraestrutura SinergIA.',
      planId: 'playbooks'
    }
  }

  const pricing = getPricingTier()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-4 sm:p-6 lg:p-8 relative overflow-hidden flex flex-col items-center">
      {/* Liquid background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[130px] animate-pulse" />
      </div>

      <div className="max-w-5xl w-full mx-auto space-y-12 relative z-10 pt-8 pb-16">
        
        {/* Onboarding steps indicator header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs font-mono uppercase tracking-widest text-slate-400">
            <Zap className="w-3.5 h-3.5 text-emerald-400" /> Passo {step} de 4
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Seu Motor Cognitivo está <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">sendo forjado</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            O SinergIA OS lê seu nicho e gera fluxos simulados reais para você ver e tocar nos agentes autônomos.
          </p>
        </div>

        {/* Dynamic step rendering container */}
        
        {/* STEP 1: PROVISIONING TERMINAL */}
        {step === 1 && (
          <Card className="bg-slate-900/60 border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl animate-in fade-in duration-500">
            <CardHeader className="bg-slate-950/40 border-b border-white/5 py-4 px-6 flex flex-row items-center gap-3">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <CardTitle className="text-sm font-bold text-slate-200">Terminal de Provisionamento Dedicado</CardTitle>
              <span className="ml-auto w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="font-mono text-xs md:text-sm bg-slate-950 p-6 rounded-2xl border border-white/5 space-y-2.5 h-64 overflow-y-auto custom-scrollbar text-slate-400 shadow-inner">
                {provisionLogs.map((log, idx) => (
                  <div key={idx} className="animate-in fade-in duration-300">
                    <span className="text-indigo-500 font-bold mr-2">&gt;&gt;</span>
                    {log}
                  </div>
                ))}
                {!provisionCompleted && (
                  <div className="flex items-center gap-1.5 text-indigo-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    <span>Compilando nós de IA...</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                  <span>Instalando Playbooks e API</span>
                  <span className="text-indigo-400">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2.5 bg-slate-950 border border-white/5" />
              </div>

              <Button
                disabled={!provisionCompleted}
                onClick={() => setStep(2)}
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2"
              >
                Acessar Canal de Homologação <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* STEP 2: WHATSAPP MOCK INTERACTIVE SIMULATION */}
        {step === 2 && (
          <div className="grid lg:grid-cols-3 gap-6 items-stretch animate-in fade-in duration-500">
            {/* WhatsApp Chat View */}
            <div className="lg:col-span-2 flex flex-col bg-slate-900/60 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl relative h-[580px]">
              {/* Chat Header */}
              <div className="bg-slate-950/80 border-b border-white/10 px-6 py-4 flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Canal de Homologação</h3>
                  <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Aura CX Piloto</p>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar flex flex-col relative z-10">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300 w-full`}>
                    <div className={`max-w-[80%] p-3.5 shadow-md rounded-2xl text-xs md:text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-500 text-slate-950 rounded-tr-sm font-medium' 
                        : 'bg-slate-800/80 border border-white/5 text-slate-200 rounded-tl-sm'
                    }`}>
                      {msg.text}
                      <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-950/60' : 'text-slate-500'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/80 border border-white/5 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-slate-950/80 border-t border-white/10 flex gap-2 relative z-10 w-full">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Envie uma mensagem (ex: CEP 01310-200 ou Dúvida)..."
                  className="flex-1 h-12 bg-white/5 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 text-xs md:text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    inputText.trim() 
                      ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' 
                      : 'bg-white/5 text-slate-600 border border-white/10'
                  }`}
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </form>
            </div>

            {/* Live Telemetry View */}
            <div className="bg-slate-900/60 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col h-[580px] shadow-2xl justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <Activity className="w-5 h-5 text-indigo-400 animate-pulse" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Telemetria Server-Side</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Confira as conexões de microsserviços sendo executadas em tempo real a cada interação com a IA de homologação.
                </p>

                <div className="space-y-3 font-mono text-[10px] bg-slate-950 p-4 rounded-xl border border-white/5 h-64 overflow-y-auto custom-scrollbar text-slate-400">
                  {telemetryLogs.map((log) => (
                    <div key={log.id} className="animate-in fade-in duration-300">
                      <span className="text-slate-600 mr-1">[{log.timestamp}]</span>
                      <span className={
                        log.type === 'success' ? 'text-emerald-400' :
                        log.type === 'warn' ? 'text-amber-400' : 'text-indigo-400'
                      }>
                        {log.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="p-3.5 bg-slate-950 border border-white/5 rounded-xl flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-500">
                    O simulador do canal é uma réplica idêntica de produção para o nicho de <strong>{nicheInfo.shortTitle}</strong>.
                  </p>
                </div>

                <Button
                  disabled={!hasSentMessage}
                  onClick={() => setStep(3)}
                  className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black uppercase tracking-wider text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)] flex items-center justify-center gap-1.5"
                >
                  Configuração Final (Tom de Voz) <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SETUPWIZARD INTEGRATION */}
        {step === 3 && (
          <div className="animate-in fade-in duration-500">
            <SetupWizard leadId={lead.id} onComplete={() => setStep(4)} />
          </div>
        )}

        {/* STEP 4: ANCORAGEM COMERCIAL E CHECKOUT */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 fade-in duration-700">
            
            {/* Main Activation Card */}
            <Card className="bg-slate-900 border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-indigo-500"></div>
              
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <Zap className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Implementação Recomendada</h3>
                  <h2 className="text-3xl font-black text-white">{pricing.name}</h2>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    {pricing.desc}
                  </p>
                </div>

                {/* Investment / Price Anchor */}
                <div className="py-6 px-8 bg-slate-950 rounded-2xl border border-white/5 max-w-sm mx-auto space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Taxa de Setup + Licença Anual</div>
                  <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                    {pricing.price}
                  </div>
                  <div className="text-[10px] text-emerald-400/80 font-medium">Split Automático Conectado &bull; Sem taxa oculta</div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-4 max-w-md mx-auto">
                  <Link href={`/checkout?plan=${pricing.planId}`} className="block w-full">
                    <Button className="w-full h-14 text-base font-black bg-emerald-500 hover:bg-emerald-400 text-emerald-950 uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] border-0">
                      Ativar Minha Licença Agora <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>

                  {!bookingConfirmed ? (
                    <Button 
                      variant="outline" 
                      onClick={handleBookCall}
                      className="w-full h-14 text-sm font-bold border-white/10 hover:bg-white/5 text-slate-300 hover:text-white rounded-xl flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-indigo-400" /> Agendar Call Técnica de Deploy
                    </Button>
                  ) : (
                    <div className="py-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs font-bold text-indigo-400 flex items-center justify-center gap-2 animate-in fade-in zoom-in-95">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Call Técnica de 30m agendada! Link enviado ao seu WhatsApp.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trust and safety details */}
            <div className="grid grid-cols-3 gap-4 text-center opacity-65">
              <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">100% Protegido</span>
              </div>
              <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col items-center">
                <Laptop className="w-5 h-5 text-emerald-400 mb-1.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Provisionado</span>
              </div>
              <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col items-center">
                <Cpu className="w-5 h-5 text-emerald-400 mb-1.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Engines Ativas</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
