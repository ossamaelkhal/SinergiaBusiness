'use client'

import React, { useState, useEffect } from 'react'
import { Terminal, ShieldAlert, MousePointer, CheckCircle2, Heart } from 'lucide-react'

export default function LiveCurationTerminal() {
    const [step, setStep] = useState(0) // 0: Normal logs, 1: Flash Alert, 2: Editing copy, 3: Clicking, 4: Success, 5: Return to Normal
    const [typedCopy, setTypedCopy] = useState('')

    const targetCopy = 'Pedimos desculpas pelo atraso da sua rota. Nosso time de apoio já está acionando o motorista e sua entrega é nossa prioridade absoluta.'

    useEffect(() => {
        let timer: NodeJS.Timeout

        const runLoop = () => {
            // Stage 0: Normal logs running
            setStep(0)
            setTypedCopy('')
            
            // Go to Stage 1: Warning after 1.5s
            timer = setTimeout(() => {
                setStep(1)
                
                // Go to Stage 2: Typing after 1.5s
                timer = setTimeout(() => {
                    setStep(2)
                    
                    // Typing effect
                    let currentLength = 0
                    const typeInterval = setInterval(() => {
                        if (currentLength < targetCopy.length) {
                            currentLength += 3 // Type 3 chars at a time for speed
                            setTypedCopy(targetCopy.substring(0, currentLength))
                        } else {
                            clearInterval(typeInterval)
                            
                            // Go to Stage 3: Click button after 1s
                            timer = setTimeout(() => {
                                setStep(3)
                                
                                // Go to Stage 4: Success after 0.8s
                                timer = setTimeout(() => {
                                    setStep(4)
                                    
                                    // Reset loop after 2s
                                    timer = setTimeout(() => {
                                        runLoop()
                                    }, 2000)
                                }, 800)
                            }, 1000)
                        }
                    }, 40)
                }, 1500)
            }, 2000)
        }

        runLoop()

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <section className="w-full py-16 bg-slate-950 relative overflow-hidden flex flex-col items-center">
            {/* HSL decorative orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-4xl w-full px-6 relative z-10 space-y-6">
                
                {/* Header info */}
                <div className="text-center space-y-2">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center justify-center gap-1.5 animate-neon-artesao-pulsar px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full w-max mx-auto shadow-neon-artesao">
                        <Heart className="w-3.5 h-3.5 fill-amber-500" /> Janela de Curadoria do Artesão
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                        Sintonia da Malha: Operações Reais agora
                    </h2>
                    <p className="text-slate-400 text-xs md:text-sm font-light max-w-lg mx-auto">
                        Veja o Manifesto em ação: nossa malha de IA monitora desvios de tom e solicita curadoria humana imediata quando detecta latências ou frieza comunicacional.
                    </p>
                </div>

                {/* Glassmorphic terminal console */}
                <div className="bg-slate-900/40 border border-white/10 backdrop-blur-xl rounded-[2rem] p-6 font-mono text-xs md:text-sm text-slate-300 shadow-2xl relative min-h-[380px] flex flex-col justify-between overflow-hidden">
                    
                    {/* Top window dots */}
                    <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                        <span className="text-[10px] text-slate-500 ml-2 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Terminal className="w-4 h-4 text-slate-400" /> telemetry_worker_node_4.log
                        </span>
                    </div>

                    {/* Terminal logs list */}
                    <div className="flex-1 space-y-3 relative">
                        {/* Static logs */}
                        <div className="opacity-45">
                            <span>[15:42:01] </span>
                            <span className="text-slate-400">[SYSTEM] Inicializando orquestrador de fluxo em nuvem...</span>
                        </div>
                        <div className="opacity-45">
                            <span>[15:42:02] </span>
                            <span className="text-slate-400">[SQL] Carregando chaves de integração do cliente logístico...</span>
                        </div>
                        <div className="opacity-75">
                            <span>[15:42:03] </span>
                            <span className="text-indigo-400">[CX-ROUTE] Lead de tráfego WhatsApp capturado: &quot;Entregas expressas&quot;</span>
                        </div>

                        {/* Stage 0: normal running */}
                        {step === 0 && (
                            <div className="animate-pulse">
                                <span>[15:42:04] </span>
                                <span className="text-emerald-400">[PROCESSED] IA enviando resposta automática de rotina...</span>
                            </div>
                        )}

                        {/* Stage 1: warning flashes in amber */}
                        {step >= 1 && (
                            <div className={`p-4 rounded-xl border transition-all duration-300 ${step === 1 ? 'bg-amber-500/10 border-amber-500/30 animate-pulse shadow-neon-artesao' : 'bg-slate-950 border-white/5'}`}>
                                <div className="flex items-center gap-2 text-amber-500 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-2">
                                    <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                                    <span>[ALERTA EMOCIONAL: LATÊNCIA DETECTADA EM CLIENTE LOGÍSTICO - FLUXO INTERROMPIDO ETHICAMENTE]</span>
                                </div>
                                <div className="space-y-1 mt-1 text-slate-400 text-xs font-light">
                                    <p className="text-[10px] uppercase font-bold text-slate-500">Rascunho Original (IA Fria):</p>
                                    <p className="italic bg-black/40 px-3 py-2 rounded-lg border border-white/5 text-rose-300">
                                        &quot;Sua entrega está atrasada. Favor aguardar nova rota operacional.&quot;
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Stage 2 & 3: Typing and Curation */}
                        {step >= 2 && step <= 3 && (
                            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-xs space-y-2 animate-in fade-in duration-300 text-left">
                                <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider block">Curadoria do Artesão em Tempo Real</span>
                                <div className="bg-slate-950 p-3 rounded-lg border border-white/10 relative text-emerald-400 font-medium">
                                    {typedCopy}
                                    <span className="w-1.5 h-4 bg-emerald-400 inline-block animate-pulse ml-0.5" />
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-[9px] text-slate-500 font-light">
                                        SinergIA OS valida tom acolhedor e empatia.
                                    </span>
                                    <div className="relative">
                                        <button 
                                            type="button" 
                                            className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg border transition-all ${step === 3 ? 'bg-amber-500 border-amber-600 text-slate-950 scale-95 shadow-neon-artesao' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}
                                        >
                                            [Aprovar Pacto & Liberar]
                                        </button>
                                        
                                        {/* Simulated Mouse Cursor Sliding in */}
                                        {step === 2 && (
                                            <div className="absolute right-[-40px] bottom-[-20px] animate-in slide-in-from-bottom-right-8 duration-700 delay-300 text-white pointer-events-none flex items-center gap-1.5">
                                                <MousePointer className="w-4 h-4 fill-white text-slate-950" />
                                                <span className="text-[8px] bg-slate-950 px-1 py-0.5 rounded border border-white/10 font-bold uppercase">Artesão</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Stage 4: Success and Resolved */}
                        {step === 4 && (
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 shadow-neon-pacto flex items-start gap-3 text-xs animate-in zoom-in-95 duration-300 text-left">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">✓ FLUXO LIBERADO COM SUCESSO</span>
                                    <p className="text-slate-300 leading-relaxed font-light">
                                        O rascunho de IA foi substituído pelo texto acolhedor assinado pelo artesão. Mensagem disparada com sucesso para o cliente final.
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* bottom watermark */}
                    <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[9px] font-bold text-slate-600 tracking-widest uppercase">
                        <span>Pacto de Humanidade V.2</span>
                        <span>SinergIA OS Core Node</span>
                    </div>

                </div>

            </div>
        </section>
    )
}
