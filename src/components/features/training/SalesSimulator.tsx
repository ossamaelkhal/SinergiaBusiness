'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { X, MessageSquare, Mic, Play, Award, CheckCircle, AlertCircle } from 'lucide-react'

interface Message {
    id: number
    role: 'ai' | 'user'
    content: string
    feedback?: string
    score?: number
}

interface Scenario {
    id: string
    title: string
    description: string
    difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
    initialMessage: string
}

interface SalesSimulatorProps {
    isOpen?: boolean
    onClose: () => void
}

const scenarios: Scenario[] = [
    {
        id: 'cold-call',
        title: 'Prospecção Fria',
        description: 'Tente agendar uma reunião com um diretor ocupado.',
        difficulty: 'Avançado',
        initialMessage: 'Alô? Quem fala? Eu estou entrando numa reunião agora.'
    },
    {
        id: 'objection',
        title: 'Contorno de Objeções',
        description: 'O cliente acha sua solução cara. Reverte a situação.',
        difficulty: 'Intermediário',
        initialMessage: 'A proposta está interessante, mas o preço está muito acima do nosso orçamento.'
    },
    {
        id: 'qualification',
        title: 'Qualificação de Lead',
        description: 'Descubra se o lead tem fit e orçamento.',
        difficulty: 'Iniciante',
        initialMessage: 'Oi, vi seu anúncio no Instagram e fiquei curioso. Como funciona?'
    }
]

export default function SalesSimulator({ isOpen = true, onClose }: SalesSimulatorProps) {
    const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputText, setInputText] = useState('')
    const [score, setScore] = useState(0)

    const handleStartScenario = (scenario: Scenario) => {
        setSelectedScenario(scenario)
        setMessages([{
            id: 1,
            role: 'ai',
            content: scenario.initialMessage
        }])
        setScore(100)
    }

    const handleSendMessage = () => {
        if (!inputText.trim()) return

        const newMessage: Message = {
            id: messages.length + 1,
            role: 'user',
            content: inputText
        }

        setMessages(prev => [...prev, newMessage])
        setInputText('')

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: messages.length + 2,
                role: 'ai',
                content: "Entendo seu ponto. Mas considerando o ROI que apresentamos, o custo se paga em 3 meses. O que acha de fazermos um teste piloto?",
                feedback: "Boa argumentação baseada em valor!",
                score: 95
            }
            setMessages(prev => [...prev, aiResponse])
            setScore(prev => Math.round((prev + 95) / 2))
        }, 1000)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Liquid Glass Background Accents */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-orange-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 pointer-events-none"></div>

            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl max-w-5xl w-full h-[85vh] flex flex-col shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/40 backdrop-blur-xl z-20">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                            <Mic className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center">
                                Tropa Simulator <span className="ml-3 text-[10px] bg-amber-500 text-amber-950 px-2 py-0.5 rounded-sm font-black uppercase tracking-widest shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse">Hot</span>
                            </h2>
                            <p className="text-amber-200/60 text-sm">Treine pitch, objeções e fechamento contra IAs hostis</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl flex items-center justify-center transition-all text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex flex-col relative z-10">
                    {!selectedScenario ? (
                        <div className="flex-1 p-8 md:p-12 overflow-y-auto animate-in fade-in zoom-in-95 duration-500">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <h3 className="text-3xl font-black text-white mb-4">Selecione seu Campo de Batalha</h3>
                                <p className="text-slate-400 font-light">Prepare-se para simulações de vendas de alta pressão. As IAs irão testar seus argumentos, paciência e poder de persuasão.</p>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {scenarios.map(scenario => (
                                    <div
                                        key={scenario.id}
                                        onClick={() => handleStartScenario(scenario)}
                                        className="group bg-white/5 border border-white/10 hover:border-amber-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:-translate-y-1 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-amber-500/50 group-hover:bg-amber-500/20 transition-colors">
                                                    <MessageSquare className="w-5 h-5 text-amber-400" />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border ${
                                                    scenario.difficulty === 'Iniciante' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
                                                    scenario.difficulty === 'Intermediário' ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' :
                                                    'border-red-500/30 text-red-400 bg-red-500/10'
                                                }`}>
                                                    {scenario.difficulty}
                                                </span>
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">{scenario.title}</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">{scenario.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Chat Area */}
                            <div className="flex-1 flex flex-col border-r border-white/10 relative">
                                {/* Chat Header */}
                                <div className="p-4 bg-slate-900/60 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-3"></div>
                                        <div>
                                            <p className="text-white font-bold text-sm">{selectedScenario.title}</p>
                                            <p className="text-slate-500 text-xs">Oponente IA Ativo</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar bg-slate-950/30">
                                    {messages.map(msg => (
                                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group hover:scale-[1.02] transition-transform`}>
                                            <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl border ${
                                                msg.role === 'user' 
                                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-50 rounded-br-sm shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                                                : 'bg-white/5 border-white/10 text-slate-300 rounded-bl-sm'
                                            }`}>
                                                <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
                                                {msg.feedback && (
                                                    <div className="mt-3 text-xs font-medium flex items-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        {msg.feedback}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 md:p-6 border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
                                    <div className="flex gap-3 relative">
                                        <input
                                            type="text"
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className="flex-1 bg-slate-950 border border-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 transition-all shadow-inner"
                                            placeholder="Digite sua resposta e pressione Enter..."
                                        />
                                        <button 
                                            onClick={handleSendMessage} 
                                            className="bg-amber-500 hover:bg-amber-400 text-amber-950 w-14 rounded-xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95"
                                        >
                                            <Play className="w-5 h-5 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Panel */}
                            <div className="w-80 bg-slate-900/80 backdrop-blur-md p-6 flex flex-col border-l border-white/5 shadow-2xl z-10 relative">
                                {/* Overlap gradient */}
                                <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>

                                <div className="mb-8 relative z-10">
                                    <h4 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-4 flex items-center">
                                        <Award className="w-4 h-4 mr-2 text-amber-500" />
                                        Score de Persuasão
                                    </h4>
                                    <div className="bg-slate-950 border border-white/5 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-amber-500/5"></div>
                                        <div className="text-4xl font-black text-amber-400 relative z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">{score}</div>
                                        <div className="text-slate-500 text-xs ml-1 mt-3 relative z-10">/100</div>
                                    </div>
                                    <Progress value={score} className="h-2 mt-4 bg-slate-800" />
                                </div>

                                <div className="space-y-4 mb-auto relative z-10">
                                    <h4 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">Telemetria de Vendas</h4>
                                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                                        <p className="text-blue-200/80 text-sm leading-relaxed">
                                            <AlertCircle className="w-4 h-4 inline mr-2 text-blue-400 mb-0.5" />
                                            Tente usar <strong>perguntas abertas</strong> para entender melhor a dor do cliente, focando no modelo Challenger Sale.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 relative z-10">
                                    <button
                                        className="w-full h-12 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl font-bold flex items-center justify-center transition-all"
                                        onClick={() => setSelectedScenario(null)}
                                    >
                                        Abandonar Simulação
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
