import React, { useState, useEffect } from 'react'
import { X, Workflow, Play, Pause, RotateCcw, CheckCircle, Clock, ArrowRight, Zap, Users, MessageSquare, BarChart3, LucideIcon } from 'lucide-react'

interface FlowStep {
    id: number
    name: string
    description: string
    type: string
    duration: number
    automation: string
}

interface FlowTemplate {
    id: string
    name: string
    description: string
    category: string
    estimatedTime: string
    efficiency: string
    steps: FlowStep[]
}

interface SimulationResults {
    totalTime: number
    manualTime: number
    timeSaved: number
    costSaving: number
    efficiency: string
    stepsCompleted: number
}

interface FlowDemoProps {
    isOpen: boolean
    onClose: () => void
}

const FlowDemo: React.FC<FlowDemoProps> = ({ isOpen, onClose }) => {
    const [selectedFlow, setSelectedFlow] = useState<FlowTemplate | null>(null)
    const [isSimulating, setIsSimulating] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [simulationResults, setSimulationResults] = useState<SimulationResults | null>(null)

    const flowTemplates: FlowTemplate[] = [
        {
            id: 'lead-qualification',
            name: 'Qualificação de Leads',
            description: 'Processo automatizado de captura, qualificação e distribuição de leads',
            category: 'Vendas',
            estimatedTime: '2-5 minutos',
            efficiency: '85%',
            steps: [
                {
                    id: 1,
                    name: 'Captura de Lead',
                    description: 'Lead preenche formulário no site',
                    type: 'trigger',
                    duration: 30,
                    automation: 'Formulário inteligente com validação automática'
                },
                {
                    id: 2,
                    name: 'Análise Inicial',
                    description: 'IA analisa dados do lead',
                    type: 'ai',
                    duration: 15,
                    automation: 'Scoring automático baseado em 50+ critérios'
                },
                {
                    id: 3,
                    name: 'Enriquecimento de Dados',
                    description: 'Busca informações complementares',
                    type: 'integration',
                    duration: 20,
                    automation: 'Integração com bases de dados empresariais'
                },
                {
                    id: 4,
                    name: 'Classificação',
                    description: 'Lead é classificado por potencial',
                    type: 'ai',
                    duration: 10,
                    automation: 'Algoritmo de machine learning'
                },
                {
                    id: 5,
                    name: 'Distribuição',
                    description: 'Lead é direcionado para vendedor adequado',
                    type: 'automation',
                    duration: 5,
                    automation: 'Distribuição baseada em perfil e disponibilidade'
                },
                {
                    id: 6,
                    name: 'Notificação',
                    description: 'Vendedor recebe notificação personalizada',
                    type: 'notification',
                    duration: 2,
                    automation: 'WhatsApp, email e dashboard em tempo real'
                }
            ]
        },
        {
            id: 'customer-support',
            name: 'Atendimento ao Cliente',
            description: 'Fluxo completo de atendimento com IA e escalação inteligente',
            category: 'Atendimento',
            estimatedTime: '1-3 minutos',
            efficiency: '92%',
            steps: [
                {
                    id: 1,
                    name: 'Recebimento da Mensagem',
                    description: 'Cliente envia mensagem via WhatsApp/Chat',
                    type: 'trigger',
                    duration: 5,
                    automation: 'Recepção multicanal unificada'
                },
                {
                    id: 2,
                    name: 'Análise de Intenção',
                    description: 'IA identifica o tipo de solicitação',
                    type: 'ai',
                    duration: 10,
                    automation: 'NLP avançado com 95% de precisão'
                },
                {
                    id: 3,
                    name: 'Busca na Base de Conhecimento',
                    description: 'Sistema busca resposta adequada',
                    type: 'ai',
                    duration: 15,
                    automation: 'Base de conhecimento inteligente'
                },
                {
                    id: 4,
                    name: 'Resposta Automática',
                    description: 'IA fornece resposta personalizada',
                    type: 'ai',
                    duration: 20,
                    automation: 'Geração de resposta contextual'
                },
                {
                    id: 5,
                    name: 'Validação de Satisfação',
                    description: 'Sistema verifica se cliente foi atendido',
                    type: 'validation',
                    duration: 30,
                    automation: 'Análise de sentimento em tempo real'
                },
                {
                    id: 6,
                    name: 'Escalação (se necessário)',
                    description: 'Transfere para humano se não resolvido',
                    type: 'escalation',
                    duration: 10,
                    automation: 'Escalação inteligente baseada em contexto'
                }
            ]
        },
        {
            id: 'invoice-processing',
            name: 'Processamento de Faturas',
            description: 'Automação completa do processo de faturamento',
            category: 'Financeiro',
            estimatedTime: '30 segundos',
            efficiency: '98%',
            steps: [
                {
                    id: 1,
                    name: 'Recebimento da Fatura',
                    description: 'Fatura é recebida por email ou upload',
                    type: 'trigger',
                    duration: 5,
                    automation: 'OCR automático para extração de dados'
                },
                {
                    id: 2,
                    name: 'Extração de Dados',
                    description: 'IA extrai informações relevantes',
                    type: 'ai',
                    duration: 15,
                    automation: 'Reconhecimento inteligente de campos'
                },
                {
                    id: 3,
                    name: 'Validação',
                    description: 'Sistema valida dados extraídos',
                    type: 'validation',
                    duration: 10,
                    automation: 'Validação cruzada com base de dados'
                },
                {
                    id: 4,
                    name: 'Categorização',
                    description: 'Fatura é categorizada automaticamente',
                    type: 'ai',
                    duration: 5,
                    automation: 'Classificação baseada em histórico'
                },
                {
                    id: 5,
                    name: 'Aprovação',
                    description: 'Sistema aprova ou encaminha para aprovação',
                    type: 'approval',
                    duration: 20,
                    automation: 'Regras de aprovação personalizáveis'
                },
                {
                    id: 6,
                    name: 'Integração Contábil',
                    description: 'Dados são enviados para sistema contábil',
                    type: 'integration',
                    duration: 10,
                    automation: 'Integração com ERPs principais'
                }
            ]
        }
    ]

    const stepIcons: Record<string, LucideIcon> = {
        trigger: Clock,
        ai: Zap,
        integration: BarChart3,
        automation: Workflow,
        notification: MessageSquare,
        validation: CheckCircle,
        escalation: Users,
        approval: CheckCircle
    }

    const stepColors: Record<string, string> = {
        trigger: 'from-blue-500 to-cyan-400',
        ai: 'from-purple-500 to-pink-400',
        integration: 'from-green-500 to-emerald-400',
        automation: 'from-orange-500 to-red-400',
        notification: 'from-cyan-500 to-teal-400',
        validation: 'from-emerald-500 to-green-400',
        escalation: 'from-indigo-500 to-purple-400',
        approval: 'from-yellow-500 to-orange-400'
    }

    const calculateResults = React.useCallback(() => {
        if (!selectedFlow) return

        const totalTime = selectedFlow.steps.reduce((acc, step) => acc + step.duration, 0)
        const manualTime = totalTime * 8 // Tempo manual seria 8x maior
        const timeSaved = manualTime - totalTime
        const costSaving = (timeSaved / 60) * 75 // R$ 75/hora

        setSimulationResults({
            totalTime,
            manualTime,
            timeSaved,
            costSaving,
            efficiency: selectedFlow.efficiency,
            stepsCompleted: selectedFlow.steps.length
        })
    }, [selectedFlow])

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isSimulating && selectedFlow && currentStep < selectedFlow.steps.length) {
            interval = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev < selectedFlow.steps.length - 1) {
                        return prev + 1
                    } else {
                        setIsSimulating(false)
                        calculateResults()
                        return prev
                    }
                })
            }, 1500)
        }
        return () => clearInterval(interval)
    }, [isSimulating, currentStep, selectedFlow, calculateResults])



    const startSimulation = () => {
        setCurrentStep(0)
        setSimulationResults(null)
        setIsSimulating(true)
    }

    const resetSimulation = () => {
        setIsSimulating(false)
        setCurrentStep(0)
        setSimulationResults(null)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Liquid Glass Background Accents */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 pointer-events-none"></div>

            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(99,102,241,0.15)] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900/40 backdrop-blur-xl z-20">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                            <Workflow className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold tracking-tight text-white">Visualizador de Operações Autônomas</h2>
                            <p className="text-indigo-200/60 text-sm">Acompanhe dados em tempo real fluindo nas esteiras de IA</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl flex items-center justify-center transition-all text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 md:p-8 flex-1">
                    {!selectedFlow ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Engines Prontas para Deploy</h3>
                                <p className="text-slate-400 font-light">Selecione uma esteira pré-treinada para ver os agentes trabalhando ao vivo.</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {flowTemplates.map((flow) => (
                                    <div
                                        key={flow.id}
                                        onClick={() => setSelectedFlow(flow)}
                                        className="group bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-1 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider rounded-lg">
                                                    {flow.category}
                                                </div>
                                                <div className="flex items-center text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                                                    <Zap className="w-3 h-3 mr-1" />
                                                    {flow.efficiency} Eff.
                                                </div>
                                            </div>

                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                                {flow.name}
                                            </h4>
                                            <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{flow.description}</p>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex items-center text-slate-300 text-sm font-medium">
                                                    <Clock className="w-4 h-4 mr-2 text-indigo-400" />
                                                    {flow.estimatedTime}
                                                </div>
                                                <div className="text-indigo-200/50 text-xs font-bold uppercase tracking-wider">
                                                    {flow.steps.length} Nodos
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Flow Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                <div>
                                    <button
                                        onClick={() => setSelectedFlow(null)}
                                        className="text-slate-400 hover:text-white text-sm font-medium mb-3 flex items-center transition-colors group"
                                    >
                                        <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                        Mudar Engine
                                    </button>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
                                        <h3 className="text-3xl font-black text-white tracking-tight">{selectedFlow.name}</h3>
                                    </div>
                                    <p className="text-slate-400">{selectedFlow.description}</p>
                                </div>

                                <div className="flex items-center space-x-3">
                                    {!isSimulating && currentStep === 0 && (
                                        <button
                                            onClick={startSimulation}
                                            className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center group cursor-pointer"
                                        >
                                            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                            Testar Fluxo Ao Vivo
                                        </button>
                                    )}

                                    {(isSimulating || currentStep > 0) && (
                                        <button
                                            onClick={resetSimulation}
                                            className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center cursor-pointer"
                                        >
                                            <RotateCcw className="w-5 h-5 mr-2" />
                                            Resetar Instância
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Flow Visualization (Left Side 2/3) */}
                                <div className="lg:col-span-2 space-y-4">
                                    {selectedFlow.steps.map((step, index) => {
                                        const Icon = stepIcons[step.type] || Workflow
                                        const isActive = index === currentStep && isSimulating
                                        const isCompleted = index < currentStep || (!isSimulating && simulationResults)
                                        const isUpcoming = index > currentStep

                                        return (
                                            <div key={step.id} className={`relative flex items-center p-4 rounded-2xl border transition-all duration-500 ${isActive ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : isCompleted ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-slate-900/50 border-white/5'}`}>
                                                
                                                {/* Linking line */}
                                                {index < selectedFlow.steps.length - 1 && (
                                                    <div className="absolute left-[39px] top-16 bottom-[-24px] w-0.5 z-0">
                                                        <div className={`h-full w-full ${isCompleted ? 'bg-emerald-500/50' : isActive ? 'bg-gradient-to-b from-indigo-500 to-transparent' : 'bg-slate-800'}`}></div>
                                                    </div>
                                                )}

                                                {/* Step Icon Node */}
                                                <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center border mr-6 transition-all duration-500 flex-shrink-0 ${isActive
                                                    ? `bg-indigo-500 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.6)] animate-pulse`
                                                    : isCompleted
                                                        ? 'bg-emerald-500/20 border-emerald-500/50'
                                                        : 'bg-slate-800 border-slate-700'
                                                    }`}>
                                                    {isCompleted ? (
                                                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                                                    ) : (
                                                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : isUpcoming ? 'text-slate-500' : 'text-emerald-400'}`} />
                                                    )}
                                                </div>

                                                {/* Step Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                                                        <h4 className={`text-lg font-bold truncate ${isActive ? 'text-white' : isCompleted ? 'text-emerald-300' : 'text-slate-500'}`}>
                                                            {step.name}
                                                        </h4>
                                                        <div className={`flex items-center text-xs font-mono px-2 py-1 rounded bg-black/30 border ${isActive ? 'text-indigo-300 border-indigo-500/30' : isCompleted ? 'text-emerald-300 border-emerald-500/30' : 'text-slate-600 border-slate-800'}`}>
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {step.duration}ms
                                                        </div>
                                                    </div>
                                                    <p className={`text-sm mb-2 ${isActive ? 'text-indigo-100' : isCompleted ? 'text-slate-300' : 'text-slate-600'}`}>
                                                        {step.description}
                                                    </p>
                                                    <div className={`inline-flex items-center text-xs px-2 py-1 rounded-lg border ${isActive ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : isCompleted ? 'bg-slate-800/50 text-slate-400 border-slate-700/50' : 'bg-slate-900 border-slate-800 text-slate-700'}`}>
                                                        <Zap className={`w-3 h-3 mr-1 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                                                        {step.automation}
                                                    </div>
                                                </div>

                                                {/* Active Pulse effect container */}
                                                {isActive && (
                                                    <div className="absolute top-1/2 right-4 -translate-y-1/2 flex gap-1">
                                                        <span className="w-1 h-3 bg-indigo-400 rounded-full animate-pulse"></span>
                                                        <span className="w-1 h-4 bg-indigo-500 rounded-full animate-pulse delay-75"></span>
                                                        <span className="w-1 h-2 bg-indigo-300 rounded-full animate-pulse delay-150"></span>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Results sidebar (Right Side 1/3) */}
                                <div className="lg:col-span-1">
                                    <div className="sticky top-24">
                                        {simulationResults ? (
                                            <div className="bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 rounded-3xl p-6 shadow-[0_0_40px_rgba(52,211,153,0.15)] animate-in fade-in zoom-in-95 duration-500">
                                                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                                                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-black text-white">Deploy Pronto</h4>
                                                        <p className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Simulação Validada</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div>
                                                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Latência SinergIA vs Humano</p>
                                                        <div className="flex items-end gap-3">
                                                            <div className="text-3xl font-black text-emerald-400">{simulationResults.totalTime}s</div>
                                                            <div className="text-xl font-bold text-slate-600 line-through pb-1">{simulationResults.manualTime}s</div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Poder Computacional</p>
                                                        <div className="text-3xl font-black text-indigo-400">+{simulationResults.timeSaved}s <span className="text-sm text-indigo-300/60 font-medium">limpos p/ o time</span></div>
                                                    </div>

                                                    <div className="pt-6 border-t border-white/5">
                                                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 relative overflow-hidden flex flex-col items-center">
                                                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full pointer-events-none"></div>
                                                            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2 relative z-10">Desperdício Estancado (Mensal) *</p>
                                                            <div className="text-4xl font-black text-amber-400 relative z-10 w-full text-center">R$ {(simulationResults.costSaving * 500).toLocaleString()}</div>
                                                            <p className="text-slate-500 text-xs mt-3 relative z-10">*Projeção para 500 instâncias/mês.</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button onClick={onClose} className="w-full mt-6 bg-white hover:bg-indigo-50 text-slate-900 font-black h-14 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                                    Agendar Deploy na Empresa
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                                                <Workflow className="w-16 h-16 text-slate-700 mb-6" />
                                                <h4 className="text-xl font-bold text-slate-400 mb-2">Telemetria Abaixada</h4>
                                                <p className="text-slate-500 text-sm">Clique em &quot;Testar Fluxo Ao Vivo&quot; para iniciar os motores de IA e ver as métricas de retorno em tempo real.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FlowDemo
