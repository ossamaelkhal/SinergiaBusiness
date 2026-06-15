import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  ShieldCheck, 
  Cpu, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Heart, 
  ArrowRight,
  AlertTriangle,
  Brain
} from 'lucide-react'
import { getSandboxLeadById } from '@/lib/firebase-admin-helper'
import { Button } from '@/components/ui/button'

// Garantir que o Next.js não pré-renderize esta rota de forma estática no build
export const dynamic = 'force-dynamic'

interface SandboxPageProps {
  params: {
    companyId: string
  }
}

export default async function SandboxPage({ params }: SandboxPageProps) {
  const { companyId } = params
  
  // Buscar os dados do lead de sandbox
  const lead = await getSandboxLeadById(companyId)
  
  if (!lead) {
    notFound()
  }

  // Formatador de Moeda
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden flex flex-col justify-between py-12 md:py-24">
      {/* Background Glowing HSL Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] mix-blend-screen" />
        {/* Subtly animated middle orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e50d_1px,transparent_1px),linear-gradient(to_bottom,#4f46e50d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full my-auto">
        {/* Header - Brand */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 shadow-xl text-xs font-black text-slate-300 mb-6 uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>SinergIA Crescimento • Outbound Mirror</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Diagnóstico de Alocação de Consciência
          </h1>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">
            Olá, <strong className="text-white font-semibold">{lead.ownerName || 'Diretor'}</strong>. Mapeamos as métricas de fricção e desperdício operacional da <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold">{lead.name}</span>.
          </p>
        </div>

        {/* Main Glassmorphic Panel (Mapa de Energia & Calculadora de Alma) */}
        <div className="bg-slate-900/30 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 transform-gpu will-change-transform shadow-[0_0_60px_rgba(99,102,241,0.08)] space-y-10 animate-in fade-in zoom-in-95 duration-500 delay-200">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Mapa de Energia da Empresa</h3>
                <p className="text-xs text-slate-400 mt-1">Consciência vs Carga Braçal Repetitiva</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 shadow-[inset_0_0_10px_rgba(16,185,129,0.05)]">
              <ShieldCheck className="w-4 h-4" />
              Arquétipo: {lead.archetype}
            </div>
          </div>

          {/* Metric Dashboard Display Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* CARD 1: TIME LOSS */}
            <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-violet-500/20 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-violet-400" />
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Semanal</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-light">Horas de Intelecto Aprisionadas</span>
                <div className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight group-hover:text-violet-300 transition-colors">
                  {lead.imprisonedIntellectHours}h
                </div>
                <span className="text-[10px] text-slate-500 block leading-relaxed pt-2 font-light">
                  Estimativa de tempo que sua equipe de {lead.employeeCount} colaboradores passa resolvendo digitações manuais e tarefas repetitivas evitáveis.
                </span>
              </div>
            </div>

            {/* CARD 2: FINANCIAL LEAKAGE */}
            <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Anual Preditivo</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-light">Vazamento Financeiro Estimado</span>
                <div className="text-4xl md:text-5xl font-black text-emerald-400 font-mono tracking-tight">
                  {formatCurrency(lead.yearlyRevenueLeak)}
                </div>
                <span className="text-[10px] text-slate-500 block leading-relaxed pt-2 font-light">
                  Perda estimada devido a no-shows de agendas, latência humana de resposta inicial a leads e falhas de conciliação com sistemas ERPs.
                </span>
              </div>
            </div>

          </div>

          {/* Calculadora de Alma Alert Message */}
          <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-start gap-4">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                O Diagnóstico de Propósito
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Com base no nicho <strong className="text-white font-semibold">{lead.nicheTitle || lead.nicheSlug}</strong>, confirmamos que a operação está no limite da carga braçal. Isso gera um pico invisível de estresse, atrito de dados e burnout. A SinergIA OS propõe a libertação estratégica por meio da automação com alma.
              </p>
            </div>
          </div>

          {/* CTA Box / Action */}
          <div className="pt-6 border-t border-white/5 flex flex-col items-center text-center space-y-6">
            <div className="space-y-2">
              <h4 className="text-md font-bold text-white flex items-center justify-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
                Seu Slot de Homologação Está Disponível
              </h4>
              <p className="text-xs text-slate-400 max-w-lg leading-relaxed font-light">
                Ao reivindicar seu slot, iniciaremos o provisionamento privado da nossa inteligência multi-agente de Crescimento e Conexão para a sua operação.
              </p>
            </div>
            
            <Link 
              href={`/apply?companyId=${companyId}&niche=${lead.nicheSlug}`}
              className="w-full md:w-auto"
            >
              <Button className="w-full md:w-auto py-7 px-10 bg-gradient-to-r from-emerald-500 to-indigo-500 hover:from-emerald-600 hover:to-indigo-600 font-bold rounded-2xl shadow-[0_0_35px_rgba(16,185,129,0.2)] hover:shadow-[0_0_45px_rgba(99,102,241,0.35)] transition-all flex items-center justify-center gap-3 text-white border-0 text-sm tracking-wider uppercase">
                <span>Reivindicar Meu Slot SinergIA OS</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>

        {/* Small Bottom Brand Info */}
        <div className="text-center mt-12 text-[10px] text-slate-600 font-medium tracking-widest uppercase flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>SinergIA OS • Tecnologia com Alma</span>
        </div>
      </div>
    </div>
  )
}
