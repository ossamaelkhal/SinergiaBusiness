'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { Check, Shield, Lock, CreditCard, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { sendWebhookEvent } from '@/utils/webhook'
import { ConversionTracker } from '@/components/ConversionTracker'

const PLANS = {
  playbooks: {
    id: 'playbooks',
    name: 'SinergIA Playbooks',
    price: 297.00,
    features: ['Acesso a 15 automações n8n', 'Treinamento Aura Academy', 'Suporte Comunitário', 'Atualizações mensais']
  },
  setup: {
    id: 'setup',
    name: 'Máquina Autônoma (Setup)',
    price: 4997.00,
    features: ['Especialista dedicado', 'Construção da esteira sob medida', 'Chatbots WhatsApp treinados no seu BANT', 'Telemetria Integrada no seu CRM']
  }
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof PLANS>('playbooks')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    document: '',
    phone: ''
  })
  
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix')
  const [pixPayload, setPixPayload] = useState<any>(null)

  useEffect(() => {
    const planParam = searchParams.get('plan') as keyof typeof PLANS
    if (planParam && PLANS[planParam]) {
      setSelectedPlan(planParam)
    }
  }, [searchParams])

  const plan = PLANS[selectedPlan]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  const handleGeneratePix = async () => {
    setLoading(true)
    
    await sendWebhookEvent({
      source: 'checkout',
      leadData: {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.phone,
        company: formData.document
      },
      eventData: {
        plan: selectedPlan,
        price: plan.price,
        payment_method: 'pix',
        status: 'pending'
      }
    });

    // Simulate API call to /api/checkout/pix mapping Mercado Pago payload
    setTimeout(() => {
      setPixPayload({
        qr_code: '00020126440014BR.GOV.BCB.PIX0122contato@sinergia.ai5204000053039865406297.005802BR5915Sinergia AI LTDA6009Sao Paulo62070503***6304E2D3',
        qr_code_base64: 'iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAQMAAAAGz+h2AAAABlBMVEX///8AAABVwtN+AAABkklEQVRIjWNgQAL/IQZ/IP7/AwoQ7oAQ/Bf8j3/A/wQG2EA/hEEA2EEB/wH/EwzQQD+EAQYAA2AAgA==',
        id: Math.floor(Math.random() * 10000000000).toString()
      })
      setLoading(false)
    }, 1500)
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      if (paymentMethod === 'pix') {
        handleGeneratePix()
      } else {
        // Handle Credit Card integration
        alert('Integração de cartão não configurada neste ambiente de Teste.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Banner */}
      <div className="w-full bg-emerald-500/10 border-b border-emerald-500/20 px-6 py-4 flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-500" />
          <span className="text-emerald-400 font-bold tracking-tight text-sm">Ambiente 100% Seguro</span>
        </div>
        <div className="text-sm font-medium text-slate-400 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Powered by Mercado Pago
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Form */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Finalize seu Setup</h1>
            <p className="text-slate-400">Preencha seus dados para receber o acesso imediato à máquina de vendas.</p>
          </div>

          <form onSubmit={handlePayment} className="space-y-8">
            {/* Step 1: Personal Info */}
            <div className={`space-y-6 ${step === 2 && 'opacity-50 pointer-events-none grayscale'}`}>
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">1</span>
                <h2 className="text-xl font-bold text-white">Dados da Empresa</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Nome Completo</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all" placeholder="João da Silva" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">E-mail Profissional</label>
                  <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all" placeholder="joao@empresa.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">CPF / CNPJ</label>
                  <input required value={formData.document} onChange={e => setFormData({...formData, document: e.target.value})} type="text" className="w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all" placeholder="00.000.000/0001-00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">WhatsApp</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="text" className="w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all" placeholder="(11) 99999-9999" />
                </div>
              </div>

              {step === 1 && (
                <Button type="submit" className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl transition-all">
                  Continuar para Pagamento
                </Button>
              )}
            </div>

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ConversionTracker event="InitiateCheckout" value={plan.price} />
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">2</span>
                  <h2 className="text-xl font-bold text-white">Pagamento Seguro</h2>
                </div>

                {!pixPayload ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        onClick={() => setPaymentMethod('pix')}
                        className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'pix' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                      >
                        <QrCode className="w-8 h-8" />
                        <span className="font-bold">PIX Copia e Cola</span>
                      </div>
                      <div 
                        onClick={() => setPaymentMethod('credit_card')}
                        className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'credit_card' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                      >
                        <CreditCard className="w-8 h-8" />
                        <span className="font-bold">Cartão de Crédito</span>
                      </div>
                    </div>
                    <Button disabled={loading} type="submit" className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all flex justify-center items-center">
                      {loading ? <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : `Pagar ${formatCurrency(plan.price)}`}
                    </Button>
                    <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm text-slate-500 hover:text-white transition-colors underline decoration-slate-700 underline-offset-4">
                      Voltar e editar dados
                    </button>
                  </>
                ) : (
                  <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex flex-col items-center text-center space-y-6">
                    <h3 className="text-xl font-bold text-white">Pedido #SIN{pixPayload.id} Criado!</h3>
                    <p className="text-slate-400">Escaneie o QR Code abaixo no app do seu banco ou copie e cole a linha digitável. A liberação do sistema é instantânea após aprovação.</p>
                    
                    <div className="p-4 bg-white rounded-xl">
                      {/* Placeholder for QR Code since this is a simulation */}
                      <img src={`data:image/png;base64,${pixPayload.qr_code_base64}`} alt="QR Code PIX" className="w-48 h-48 mx-auto grayscale-0" />
                    </div>

                    <div className="w-full space-y-2">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-widest text-left block">Código Copia e Cola</label>
                      <div className="flex">
                        <input readOnly value={pixPayload.qr_code} className="flex-1 h-12 bg-slate-900 border border-white/10 rounded-l-lg px-4 text-xs font-mono text-slate-300 outline-none" />
                        <button type="button" onClick={() => navigator.clipboard.writeText(pixPayload.qr_code)} className="h-12 px-6 bg-emerald-800 hover:bg-emerald-700 border border-l-0 border-white/10 rounded-r-lg text-white font-bold text-sm transition-colors">
                          COPIAR
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 w-full flex items-center justify-center gap-2 text-sm text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Aguardando confirmação do pagamento...
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-6">
            <h3 className="text-lg font-bold text-white mb-6">Resumo do Pedido</h3>
            
            <div className="space-y-4 mb-6">
              <label className="text-sm font-medium text-slate-400 mb-2 block">Escolha seu Nível de Implantação:</label>
              <div 
                onClick={() => setSelectedPlan('playbooks')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedPlan === 'playbooks' ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-transparent border-white/10 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-bold ${selectedPlan === 'playbooks' ? 'text-emerald-400' : 'text-white'}`}>{PLANS.playbooks.name}</span>
                  <span className={`font-bold ${selectedPlan === 'playbooks' ? 'text-emerald-400' : 'text-white'}`}>{formatCurrency(PLANS.playbooks.price)}</span>
                </div>
                <span className="text-xs text-slate-500">Mão na Massa. Acesso ao repositório.</span>
              </div>

              <div 
                onClick={() => setSelectedPlan('setup')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedPlan === 'setup' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-transparent border-white/10 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-bold ${selectedPlan === 'setup' ? 'text-teal-400' : 'text-white'}`}>{PLANS.setup.name}</span>
                  <span className={`font-bold ${selectedPlan === 'setup' ? 'text-teal-400' : 'text-white'}`}>{formatCurrency(PLANS.setup.price)}</span>
                </div>
                <span className="text-xs text-slate-500">Feito por nós. Setup completo da operação.</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">O que está incluído</h4>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-300 items-start">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 mt-6 pt-6 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-slate-400">Total a pagar</span>
                <span className="text-3xl font-black text-white">{formatCurrency(plan.price)}</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 opacity-60">
              {/* Fake trusted badges */}
              <div className="h-6 flex items-center gap-1 text-[10px] font-bold text-slate-400 px-2 border border-slate-700 rounded bg-slate-800"><Check className="w-3 h-3 text-emerald-500"/> SSL SECURE</div>
              <div className="h-6 flex items-center gap-1 text-[10px] font-bold text-slate-400 px-2 border border-slate-700 rounded bg-slate-800"><Shield className="w-3 h-3 text-emerald-500"/> MERCADO PAGO</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <CheckoutContent />
    </Suspense>
  )
}
