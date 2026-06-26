'use client'

import React, { useState, useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Clock, Sparkles, Users, Sliders, AlertTriangle, ArrowRight, ShieldCheck, Loader2, Building, Mail, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { nichesData } from '@/data/niches'
import { triggerOutboundSandbox } from '@/actions/growth'

interface HeroProps {
    onDemoClick?: () => void
}

export default function Hero({ onDemoClick }: HeroProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [submitError, setSubmitError] = useState('')

    // Interactive States
    const [nicheSlug, setNicheSlug] = useState('commerce-omnichannel-vendas')
    const [employeeCount, setEmployeeCount] = useState(10)
    const [hasInteracted, setHasInteracted] = useState(false)

    // Form inputs
    const [ownerName, setOwnerName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    // Fetch niche metrics
    const selectedNiche = useMemo(() => {
        return nichesData[nicheSlug] || nichesData['commerce-omnichannel-vendas']
    }, [nicheSlug])

    // Real-time calculations
    const calculations = useMemo(() => {
        const monthlyRevenue = selectedNiche.financialMetrics?.billedRevenue || 150000
        const imprisonedIntellectHours = Math.round((employeeCount * 0.4) * 8)
        const yearlyRevenueLeak = Math.round((monthlyRevenue * 0.12) * 12)
        return {
            imprisonedIntellectHours,
            yearlyRevenueLeak
        }
    }, [selectedNiche, employeeCount])

    const formatCurrency = (val: number) => {
        return val.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 0
        })
    }

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeCount(Number(e.target.value))
        setHasInteracted(true)
    }

    const handleNicheChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNicheSlug(e.target.value)
        setHasInteracted(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitError('')

        if (!ownerName.trim() || !companyName.trim() || !email.trim() || !phone.trim()) {
            setSubmitError('Por favor, preencha todos os campos para conter o vazamento.')
            return
        }

        startTransition(async () => {
            try {
                const res = await triggerOutboundSandbox({
                    name: companyName,
                    email,
                    phone,
                    nicheSlug,
                    employeeCount,
                    ownerName
                })

                if (res.success && 'companyId' in res && res.companyId) {
                    router.push(`/sandbox/${res.companyId}`)
                } else {
                    const errorRes = res as any
                    setSubmitError(errorRes.error || 'Erro ao inicializar o cockpit.')
                }
            } catch (err: any) {
                console.error(err)
                setSubmitError(err.message || 'Erro de conexão no servidor.')
            }
        })
    }

    return (
        <section className="w-full pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 bg-slate-950 overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse" />
            
            {/* Tech Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-25 z-0" />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_85%)] pointer-events-none z-0" />
            <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-12 lg:gap-16 items-center transform-gpu">
                
                {/* Left Side: Headline & Mission */}
                <div className="text-left space-y-6 flex flex-col">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">Tecnologia com Alma, Crescimento com Consciência</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-golden-xl font-black tracking-tighter text-white leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Não aprisione o tempo.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">
                            Semeie Emancipação.
                        </span>
                    </h1>

                    {/* Sub-headline */}
                    <p className="max-w-[550px] text-slate-400 text-sm md:text-golden-base leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        O Manifesto SinergIA defende a libertação operacional. Ajuste os controles à direita para medir a latência oculta e o vazamento financeiro da sua equipe e receba um link criptografado do seu Cockpit de Emancipação.
                    </p>

                    {/* Left decoration / Stats cards */}
                    <div className="grid grid-cols-2 gap-4 pt-6 max-w-[500px]">
                        <div className={`p-5 rounded-2xl bg-slate-900/40 border transition-all duration-500 transform-gpu ${hasInteracted ? 'border-rose-500/40 shadow-neon-friction' : 'border-white/5'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className={`w-4 h-4 ${hasInteracted ? 'text-rose-400' : 'text-slate-400'}`} />
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${hasInteracted ? 'text-rose-400' : 'text-slate-400'}`}>Burocracia Estimada</span>
                            </div>
                            <div className="text-2xl font-black text-white font-mono">{calculations.imprisonedIntellectHours}h<span className="text-xs text-slate-500 font-normal">/semana</span></div>
                            <span className="text-[9px] text-slate-500 font-light block mt-1">Intelecto oprimido em tarefas braçais</span>
                        </div>

                        <div className={`p-5 rounded-2xl bg-slate-900/40 border transition-all duration-500 transform-gpu ${hasInteracted ? 'border-rose-500/40 shadow-neon-friction' : 'border-white/5'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className={`w-4 h-4 ${hasInteracted ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${hasInteracted ? 'text-rose-400' : 'text-slate-400'}`}>Vazamento Anual</span>
                            </div>
                            <div className="text-xl font-black text-white font-mono">{formatCurrency(calculations.yearlyRevenueLeak)}</div>
                            <span className="text-[9px] text-slate-500 font-light block mt-1">Dinheiro escorrendo por delay operacional</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Interactive "Black Mirror" Sandbox Card */}
                <div className="w-full flex justify-center lg:justify-end">
                    <div className="w-full rounded-[2.5rem] bg-slate-900/60 border border-white/10 backdrop-blur-xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-fuchsia-500/30">
                        {/* Bleeding Neon friction bar at top when interacted */}
                        <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${hasInteracted ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-white/5'}`} />

                        {/* Interactive Header */}
                        <div>
                            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                                <Sliders className="w-4 h-4" /> Telemetria de Entrada
                            </div>
                            <h3 className="text-xl font-black text-white">Audite Sua Fricção em Tempo Real</h3>
                            <p className="text-slate-400 text-xs mt-1 font-light leading-relaxed">
                                Selecione seu nicho operacional e arraste o slider para estancar o vazamento.
                            </p>
                        </div>

                        {/* Dropdown Nicho */}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider">Nicho de Atuação</label>
                            <select
                                value={nicheSlug}
                                onChange={handleNicheChange}
                                className="w-full bg-slate-950 border border-white/10 text-slate-200 text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 transition-colors cursor-pointer"
                            >
                                {Object.values(nichesData).map((n) => (
                                    <option key={n.slug} value={n.slug}>
                                        {n.shortTitle || n.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Slider Colaboradores */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-black text-slate-500 uppercase tracking-wider text-[10px]">Tamanho do Time (Colaboradores)</span>
                                <span className="text-indigo-400 font-mono font-black">{employeeCount} pessoas</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={employeeCount}
                                onChange={handleSliderChange}
                                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>

                        {/* Live calculation displays */}
                        <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                                <div className="space-y-0.5">
                                    <p className="text-xs text-slate-400">Tempo Preso em Burocracia:</p>
                                    <p className="text-sm font-bold text-white leading-normal">
                                        Seu time está preso em processos braçais por <strong className="text-rose-400 font-extrabold font-mono text-base">{calculations.imprisonedIntellectHours} horas</strong> toda semana.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="w-full h-px bg-white/5" />

                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 animate-pulse" />
                                <div className="space-y-0.5">
                                    <p className="text-xs text-slate-400">Vazamento Invisível de Caixa:</p>
                                    <p className="text-sm font-bold text-white leading-normal">
                                        Perda estimada de <strong className="text-rose-400 font-extrabold font-mono text-base">{formatCurrency(calculations.yearlyRevenueLeak)}</strong> por ano.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Revealed with Fuchsia shadow (`shadow-neon-identity`) */}
                        {hasInteracted && (
                            <form 
                                onSubmit={handleSubmit} 
                                className="border-t border-white/10 pt-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 text-left"
                            >
                                <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20 shadow-neon-identity space-y-2">
                                    <h4 className="text-xs font-black text-fuchsia-400 uppercase tracking-widest flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5" /> Contenção de Perdas Ativa
                                    </h4>
                                    <p className="text-[10px] text-slate-400 leading-relaxed">
                                        Para onde enviamos o código de contenção e o link exclusivo do seu Cockpit de Emancipação?
                                    </p>
                                </div>

                                {submitError && (
                                    <p className="text-xs text-rose-400 font-semibold text-center bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg">
                                        {submitError}
                                    </p>
                                )}

                                <div className="space-y-3">
                                    {/* Nome Proprietário */}
                                    <div className="relative">
                                        <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            required
                                            disabled={isPending}
                                            placeholder="Seu Nome Completo"
                                            value={ownerName}
                                            onChange={(e) => setOwnerName(e.target.value)}
                                            className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500/40 transition-colors disabled:opacity-50"
                                        />
                                    </div>

                                    {/* Nome Empresa */}
                                    <div className="relative">
                                        <Building className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            required
                                            disabled={isPending}
                                            placeholder="Nome da sua Empresa"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500/40 transition-colors disabled:opacity-50"
                                        />
                                    </div>

                                    {/* E-mail */}
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                        <input
                                            type="email"
                                            required
                                            disabled={isPending}
                                            placeholder="E-mail Corporativo"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500/40 transition-colors disabled:opacity-50"
                                        />
                                    </div>

                                    {/* WhatsApp */}
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                        <input
                                            type="tel"
                                            required
                                            disabled={isPending}
                                            placeholder="WhatsApp de Contato (com DDD)"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500/40 transition-colors disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-12 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-neon-identity flex items-center justify-center gap-2 border-0 hover:scale-[1.02]"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                                            <span>Estancando Vazamento...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Salvar Diagnóstico e Entrar</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </section>
    )
}
