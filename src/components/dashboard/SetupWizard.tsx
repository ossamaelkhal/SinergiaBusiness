'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Bot, Rocket, ShieldCheck, CheckCircle2, Factory } from "lucide-react"
import { saveLeadPreferences } from '@/actions/leads'

interface SetupWizardProps {
  leadId?: string;
  onComplete: () => void;
}

export function SetupWizard({ leadId, onComplete }: SetupWizardProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form Data
  const [niche, setNiche] = useState('')
  const [tone, setTone] = useState('')
  const [objective, setObjective] = useState('')

  const handleFinish = async () => {
    setLoading(true)
    try {
      if (leadId) {
        await saveLeadPreferences(leadId, { niche, tone, objective });
      }
    } catch (error) {
      console.error("Falha ao salvar preferências no SetupWizard:", error);
    } finally {
      setLoading(false)
      onComplete()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
          <Activity className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-3xl font-black text-white mb-3 tracking-tight">SinergIA Onboarding</h2>
        <p className="text-slate-400">Em menos de 2 minutos, forjaremos a alma do seu agente sintético.</p>
      </div>

      <div className="flex items-center justify-between mb-8 px-4 relative">
        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-800 -z-10 translate-y-[-50%]">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500" 
            style={{ width: `${(step - 1) * 50}%` }}
          />
        </div>
        {[1, 2, 3].map((num) => (
          <div 
            key={num} 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 bg-slate-950 ${
              step >= num 
                ? 'border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]' 
                : 'border-slate-800 text-slate-600'
            }`}
          >
            {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
          </div>
        ))}
      </div>

      <Card className="bg-slate-900 border-white/5 border-t-white/10 shadow-2xl">
        <CardContent className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Factory className="text-indigo-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-white">1. Qual é o seu nicho primário?</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['Clínica/Saúde', 'Advocacia', 'Ecommerce', 'Infoprodutos', 'Imobiliária', 'Outro'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setNiche(item)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                      niche === item 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                        : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold">{item}</div>
                  </button>
                ))}
              </div>
              <Button 
                onClick={() => setStep(2)} 
                disabled={!niche}
                className="w-full mt-8 bg-white text-slate-950 hover:bg-slate-200 uppercase font-black tracking-wider"
              >
                Próxima Etapa
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Bot className="text-amber-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-white">2. Qual o tom de voz do seu Agente?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'formal', label: 'C-Level / Formal', desc: 'Respostas curtas, corteses, diretas e extremamente profissionais.' },
                  { id: 'casual', label: 'Consultivo / Casual', desc: 'Usa emojis, gera empatia, parece um vendedor carismático do WhatsApp.' },
                  { id: 'agressive', label: 'Closer Agressivo', desc: 'Focado em contornar objeções e empurrar logo para a reunião/checkout.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTone(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] flex flex-col ${
                      tone === item.id 
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                        : 'bg-slate-950 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`font-bold mb-1 ${tone === item.id ? 'text-amber-400' : 'text-slate-300'}`}>{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-400 hover:text-white">Voltar</Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!tone}
                  className="flex-1 bg-white text-slate-950 hover:bg-slate-200 uppercase font-black"
                >
                  Próxima Etapa
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Rocket className="text-emerald-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-white">3. Qual a métrica de sucesso primária?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'BANT', label: 'Qualificação BANT Extremamente Rigorosa' },
                  { id: 'CALENDAR', label: 'Agendar o máximo de reuniões (Volume)' },
                  { id: 'FAQ', label: 'Responder dúvidas e reduzir tickets do suporte' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setObjective(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                      objective === item.id 
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                        : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold">{item.label}</div>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-slate-950 border border-white/5 rounded-xl">
                 <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400">
                      Ao finalizar, a <strong className="text-white">SinergIA Engine</strong> via n8n irá provisionar automaticamente 
                      os Webhooks do seu painel e compilar o seu clone do Botpress num pipeline de <strong className="text-white">48h (TTFV)</strong>.
                    </p>
                 </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="ghost" onClick={() => setStep(2)} className="text-slate-400 hover:text-white" disabled={loading}>Voltar</Button>
                <Button 
                  onClick={handleFinish} 
                  disabled={!objective || loading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 uppercase font-black"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                       <Activity className="w-4 h-4 animate-spin" /> Injetando Parâmetros...
                    </div>
                  ) : 'Forjar Agente B2B'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
