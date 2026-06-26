'use client'

import React, { useState, useMemo } from 'react'
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
  Brain,
  Sliders
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { nichesData } from '@/data/niches'

interface LeadData {
  companyId: string
  name: string
  email: string
  phone: string
  nicheSlug: string
  employeeCount: number
  ownerName: string
  status: string
  archetype: string
  imprisonedIntellectHours: number
  yearlyRevenueLeak: number
  nicheTitle: string
}

interface SandboxClientProps {
  lead: LeadData
}

export default function SandboxClient({ lead }: SandboxClientProps) {
  const nicheSlug = lead.nicheSlug || 'commerce-omnichannel-vendas'
  const niche = nichesData[nicheSlug] || nichesData['commerce-omnichannel-vendas']
  
  // Interactive Slider States
  const [employeeCount, setEmployeeCount] = useState(lead.employeeCount || 10)
  const [monthlyRevenue, setMonthlyRevenue] = useState(niche.financialMetrics.billedRevenue || 150000)

  // Recalculating dynamic metrics in real time
  const report = useMemo(() => {
    const imprisonedIntellectHours = Math.round((employeeCount * 0.4) * 8)
    const yearlyRevenueLeak = Math.round((monthlyRevenue * 0.12) * 12)
    return {
      imprisonedIntellectHours,
      yearlyRevenueLeak
    }
  }, [employeeCount, monthlyRevenue])

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e50d_1px,transparent_1px),linear-gradient(to_bottom,#4f46e50d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full my-auto">
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

        {/* Main Grid: Interactive panel left, Calculations output right */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Panel: Sliders */}
          <div className="lg:col-span-6 bg-slate-900/40 p-8 md:p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-xl transform-gpu will-change-transform shadow-[0_0_40px_rgba(99,102,241,0.02)] space-y-8 flex flex-col justify-center">
            <div>
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1.5 mb-2">
                <Sliders className="w-4 h-4" /> Parâmetros de Simulação
              </span>
              <h3 className="text-xl font-bold text-white">Ajuste os dados da sua PME</h3>
              <p className="text-slate-400 text-xs mt-1 font-light leading-relaxed">
                Mude os valores abaixo para recalcular instantaneamente as perdas operacionais estimadas.
              </p>
            </div>

            {/* Slider 1: Colaboradores */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Colaboradores na Operação:</span>
                <span className="text-violet-400 font-mono font-bold text-sm">{employeeCount} pessoas</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                step="1"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-violet-400"
              />
            </div>

            {/* Slider 2: Faturamento Mensal */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Faturamento Mensal Estimado:</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">{formatCurrency(monthlyRevenue)} / mês</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="2000000" 
                step="10000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>

          {/* Right Panel: Metric Output Cards */}
          <div className="lg:col-span-6 bg-slate-900/30 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 transform-gpu will-change-transform shadow-[0_0_60px_rgba(99,102,241,0.08)] flex flex-col justify-between space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Mapeamento de Atritos</h3>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                Arquétipo: {lead.archetype}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 flex-1">
              {/* CARD 1: TIME LOSS */}
              <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-violet-500/20 transition-all duration-300 flex flex-col justify-between">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500"></div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block font-light">Consciência Oprimida</span>
                  <div className="text-3xl md:text-4xl font-black text-white font-mono tracking-tight transition-colors">
                    {report.imprisonedIntellectHours}h
                  </div>
                  <span className="text-[9px] text-slate-500 block leading-relaxed pt-2 font-light">
                    Horas semanais que seu time passa em digitações burocráticas e tarefas redundantes.
                  </span>
                </div>
              </div>

              {/* CARD 2: FINANCIAL LEAKAGE */}
              <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block font-light">Vazamento Anual</span>
                  <div className="text-3xl md:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                    {formatCurrency(report.yearlyRevenueLeak)}
                  </div>
                  <span className="text-[9px] text-slate-500 block leading-relaxed pt-2 font-light">
                    Perdas por latência humana, falhas de ERP e no-shows operacionais.
                  </span>
                </div>
              </div>
            </div>

            {/* Calculadora de Alma Alert Message */}
            <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4 flex items-start gap-3.5 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-slate-400 leading-relaxed font-light">
                Com base no nicho <strong className="text-white font-semibold">{lead.nicheTitle || lead.nicheSlug}</strong>, confirmamos que a operação está no limite da carga braçal. A SinergIA OS propõe a libertação estratégica por meio da automação com alma.
              </p>
            </div>

            {/* CTA Box / Action */}
            <div className="pt-4 border-t border-white/5 flex flex-col items-center text-center space-y-4">
              <Link 
                href={`/apply?companyId=${lead.companyId}&niche=${lead.nicheSlug}`}
                className="w-full"
              >
                <Button className="w-full py-6 bg-gradient-to-r from-emerald-500 to-indigo-500 hover:from-emerald-600 hover:to-indigo-600 font-bold rounded-xl shadow-[0_0_35px_rgba(16,185,129,0.15)] hover:shadow-[0_0_45px_rgba(99,102,241,0.25)] transition-all flex items-center justify-center gap-2 text-white border-0 text-xs tracking-wider uppercase">
                  <span>Reivindicar Meu Slot SinergIA OS</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* Small Bottom Brand Info */}
        <div className="text-center text-[10px] text-slate-600 font-medium tracking-widest uppercase flex items-center justify-center gap-1.5 mt-8">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>SinergIA OS • Tecnologia com Alma</span>
        </div>
      </div>
    </div>
  )
}
