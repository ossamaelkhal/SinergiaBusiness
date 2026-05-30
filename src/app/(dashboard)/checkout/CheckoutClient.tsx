'use client'

import React, { useState, useEffect } from 'react'
import { Check, Shield, Lock, QrCode, Calendar, Clock, ArrowRight, CheckCircle2, Loader2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { generatePaymentSession, bookOnboardingCall, PaymentSessionResponse } from '@/actions/billing'
import { db } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { Badge } from '@/components/ui/badge'

interface LeadData {
  id: string
  name: string
  email: string
  nichoSlug: string
  document?: string
  phone?: string
  revenue?: string
  status: string
}

interface CheckoutClientProps {
  lead: LeadData
  planId: 'playbooks' | 'setup' | 'enterprise'
}

const PLAN_DETAILS = {
  playbooks: {
    name: 'SinergIA Playbooks (PoC)',
    price: 997.00,
    desc: 'Mão na Massa. Acesso imediato ao repositório de playbooks de IA.',
    features: [
      'Acesso a 15 automações n8n prontas',
      'Treinamento completo Aura Academy',
      'Suporte via comunidade do Discord',
      'Updates de segurança e novos nós mensais'
    ]
  },
  setup: {
    name: 'Máquina Autônoma (Standard)',
    price: 15000.00,
    desc: 'Feito por nós. Setup e integração completa na sua infraestrutura regional.',
    features: [
      'Especialista dedicado de implantação',
      'Chatbots WhatsApp treinados no seu BANT',
      'Integração e logs de consumo no seu CRM',
      'Homologação de chaves em 10 dias úteis'
    ]
  },
  enterprise: {
    name: 'Esquadrão Private (Enterprise)',
    price: 50000.00,
    desc: 'Consultoria bespoke sob medida do C-Level para grandes corporações.',
    features: [
      'Squad dedicado (Engenheiro de IA + Arquiteto de Negócios)',
      'Modelos locais LLM customizados e privados',
      'Auditoria completa de TISS/TUSS ou fluxos complexos',
      'SLA de suporte prioritário 24/7 e NDAs estritos'
    ]
  }
}

export default function CheckoutClient({ lead, planId }: CheckoutClientProps) {
  const router = useRouter()
  const plan = PLAN_DETAILS[planId]

  const [loading, setLoading] = useState(true)
  const [sessionData, setSessionData] = useState<PaymentSessionResponse | null>(null)
  
  // Estados para o fluxo PoC (Pix)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutos
  const [copied, setCopied] = useState(false)

  // Estados para o fluxo Corporativo (Booking)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [bookingFinished, setBookingFinished] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  // 1. Inicializar sessão de pagamento / booking no servidor
  useEffect(() => {
    async function initSession() {
      try {
        const res = await generatePaymentSession(lead.id, planId)
        setSessionData(res)
      } catch (err) {
        console.error("Falha ao iniciar faturamento do lead:", err)
      } finally {
        setLoading(false)
      }
    }
    initSession()
  }, [lead.id, planId])

  // 2. Polling Reativo do Firestore para o fluxo PoC (Pix)
  useEffect(() => {
    if (planId !== 'playbooks' || loading) return

    const unsubscribe = onSnapshot(doc(db, 'leads', lead.id), (snapshot) => {
      const data = snapshot.data()
      if (data && data.status === 'active_client') {
        // Redirecionamento instantâneo para o dashboard operacional ativo
        router.push('/app/client')
      }
    })

    return () => unsubscribe()
  }, [lead.id, planId, loading, router])

  // 3. Contagem regressiva do Pix
  useEffect(() => {
    if (planId !== 'playbooks' || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [planId, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleCopyPix = () => {
    if (!sessionData?.pixPayload?.qr_code) return
    navigator.clipboard.writeText(sessionData.pixPayload.qr_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Agendamento de datas de setup corporativo (próximos dias úteis)
  const getNextBusinessDays = () => {
    const days = []
    const options = { weekday: 'long', day: '2-digit', month: '2-digit' } as const
    let current = new Date()
    
    while (days.length < 5) {
      current.setDate(current.getDate() + 1)
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        days.push({
          iso: current.toISOString().split('T')[0],
          formatted: current.toLocaleDateString('pt-BR', options)
        })
      }
    }
    return days
  }

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) return
    setBookingLoading(true)
    try {
      const datetime = `${selectedDate} às ${selectedTime}`
      const res = await bookOnboardingCall(lead.id, datetime)
      if (res.success) {
        setBookingFinished(true)
      } else {
        alert(res.error || 'Erro ao agendar horário.')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto" />
          <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest animate-pulse">
            Configurando Gateway de Cobrança...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Banner */}
      <header className="w-full bg-slate-900/60 border-b border-white/5 px-8 py-4 flex justify-between items-center z-50 relative backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span className="text-white font-black tracking-tight text-sm uppercase">Sessão Comercial Segura</span>
        </div>
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          Criptografia SSL de Ponta a Ponta
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16 w-full flex-1 flex flex-col lg:flex-row gap-12 relative z-10 items-center justify-center">
        
        {/* Lado Esquerdo: Formulário / Informações do Plano */}
        <div className="flex-1 space-y-8 w-full">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Ativação da Licença</span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-1 mb-3">
              Mesa de Faturamento
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-lg leading-relaxed">
              Verifique os detalhes do seu setup e finalize a contratação da sua infraestrutura cognitiva dedicada.
            </p>
          </div>

          {/* VISUAL BIFURCADO */}

          {/* CENÁRIO A: PLANO POC (PAGAMENTO PIX DIRETO) */}
          {planId === 'playbooks' && sessionData?.pixPayload && (
            <div className="bg-slate-900/60 border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400"></div>
              
              <div className="space-y-6 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-white/5">
                  <div className="p-4 bg-white rounded-2xl shrink-0 shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`data:image/png;base64,${sessionData.pixPayload.qr_code_base64}`} 
                      alt="QR Code PIX" 
                      className="w-36 h-36 mx-auto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                      Aguardando Pagamento
                    </Badge>
                    <h3 className="text-2xl font-black text-white">PIX Copia e Cola</h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                      Escaneie o código com o aplicativo do seu banco ou copie a linha digitável abaixo. A ativação da sua conta é instantânea.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block text-left">Código Copia e Cola</label>
                  <div className="flex">
                    <input 
                      readOnly 
                      value={sessionData.pixPayload.qr_code} 
                      className="flex-1 h-14 bg-slate-950 border border-white/10 rounded-l-2xl px-4 text-xs font-mono text-slate-400 outline-none focus:border-emerald-500/30" 
                    />
                    <Button 
                      onClick={handleCopyPix} 
                      className="h-14 px-6 bg-emerald-850 hover:bg-emerald-700 border border-l-0 border-white/10 rounded-r-2xl text-white font-black text-xs uppercase tracking-widest transition-all"
                    >
                      {copied ? 'Copiado!' : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Expirando em: <span className="font-mono text-white font-bold">{formatTime(timeLeft)}</span>
                  </div>
                  <div className="text-emerald-400 flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Verificando compensação automática...
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CENÁRIO B: PLANO STANDARD/ENTERPRISE (BOOKING CONCIERGE) */}
          {(planId === 'setup' || planId === 'enterprise') && (
            <div className="bg-slate-900/60 border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 to-indigo-500"></div>

              {!bookingFinished ? (
                <div className="space-y-6">
                  <div>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider mb-2">
                      Booking Concierge
                    </Badge>
                    <h3 className="text-2xl font-black text-white">Agendamento de Setup Dedicado</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Contratos corporativos exigem validação e deploy assistido. Escolha o melhor slot para a nossa reunião técnica de provisionamento comercial.
                    </p>
                  </div>

                  {/* Seleção de Data */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" /> 1. Escolha a Data
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {getNextBusinessDays().map((day) => (
                        <button
                          key={day.iso}
                          type="button"
                          onClick={() => { setSelectedDate(day.iso); setSelectedTime(''); }}
                          className={`px-3 py-3 rounded-xl border text-center text-xs font-bold transition-all capitalize ${selectedDate === day.iso ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg' : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-white'}`}
                        >
                          {day.formatted.split(',')[0]}
                          <span className="block font-mono text-[10px] text-slate-500 mt-0.5">{day.formatted.split(',')[1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seleção de Horário */}
                  {selectedDate && (
                    <div className="space-y-2 animate-in fade-in duration-300">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> 2. Escolha o Horário (Horário de Brasília)
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {['10:00', '11:30', '14:00', '16:30'].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 rounded-xl border text-center text-xs font-mono font-bold transition-all ${selectedTime === time ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg' : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-white'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ação */}
                  {selectedDate && selectedTime && (
                    <Button
                      disabled={bookingLoading}
                      onClick={handleConfirmBooking}
                      className="w-full h-14 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center justify-center gap-2"
                    >
                      {bookingLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Travar Slot de Setup <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">Setup Agendado com Sucesso!</h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                      Sua mesa comercial de deploy foi provisionada para o dia <span className="text-cyan-400 font-bold">{new Date(selectedDate).toLocaleDateString('pt-BR')} às {selectedTime}</span>.
                    </p>
                  </div>
                  <div className="bg-slate-950 border border-white/5 rounded-2xl p-6 text-left max-w-md mx-auto">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Próximos Passos</h4>
                    <ul className="space-y-3 text-xs text-slate-400">
                      <li className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></div>
                        Você receberá um convite do Google Calendar com o link do Zoom em até 10 minutos.
                      </li>
                      <li className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></div>
                        Nosso arquiteto de negócios ligará para seu WhatsApp cadastrado antes da reunião.
                      </li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => router.push('/')}
                    variant="outline"
                    className="border-white/10 text-slate-300 hover:bg-white/5"
                  >
                    Voltar à Página Inicial
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lado Direito: Resumo do Pedido */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-slate-900/40 border border-white/10 rounded-[32px] p-8 space-y-6 sticky top-6 backdrop-blur-md">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Resumo da Licença</h3>
              <p className="text-xs text-slate-500">Módulo de contratação selecionado no diagnóstico</p>
            </div>
            
            <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Produto</span>
              <h4 className="text-lg font-bold text-white leading-tight">{plan.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{plan.desc}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Incluso no Swarm AI</h4>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-xs text-slate-300 items-start">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custo do Setup Anual</span>
                <span className="text-3xl font-black text-white tracking-tight">{formatCurrency(plan.price)}</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 opacity-50 border-t border-white/5 pt-6 text-[10px] font-bold text-slate-400">
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> SSL SECURE
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> COMPRA CRIPTOGRAFADA
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-white/5 bg-slate-950/40 relative z-10 text-center text-[10px] text-slate-600 font-medium">
        &copy; {new Date().getFullYear()} SinergIA OS Inc. Todos os direitos reservados. Termos de Serviço e Políticas de Privacidade.
      </footer>

    </div>
  )
}
