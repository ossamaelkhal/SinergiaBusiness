import React, { useState, useEffect } from 'react'
import { X, Workflow, Play, Pause, RotateCcw, CheckCircle, Clock, ArrowRight, Zap, Users, MessageSquare, BarChart3 } from 'lucide-react'

const FlowSimulator = ({ isOpen, onClose }) => {
  const [selectedFlow, setSelectedFlow] = useState(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [simulationResults, setSimulationResults] = useState(null)

  const flowTemplates = [
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

  const stepIcons = {
    trigger: Clock,
    ai: Zap,
    integration: BarChart3,
    automation: Workflow,
    notification: MessageSquare,
    validation: CheckCircle,
    escalation: Users,
    approval: CheckCircle
  }

  const stepColors = {
    trigger: 'from-blue-500 to-cyan-400',
    ai: 'from-purple-500 to-pink-400',
    integration: 'from-green-500 to-emerald-400',
    automation: 'from-orange-500 to-red-400',
    notification: 'from-cyan-500 to-teal-400',
    validation: 'from-emerald-500 to-green-400',
    escalation: 'from-indigo-500 to-purple-400',
    approval: 'from-yellow-500 to-orange-400'
  }

  useEffect(() => {
    let interval
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
  }, [isSimulating, currentStep, selectedFlow])

  const calculateResults = () => {
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
  }

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-400 rounded-xl flex items-center justify-center">
              <Workflow className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Simulador de Fluxos SinergIA</h2>
              <p className="text-white/60 text-sm">Visualize como a automação transforma seus processos</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6">
          {!selectedFlow ? (
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Escolha um fluxo para simular</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flowTemplates.map((flow) => (
                  <div
                    key={flow.id}
                    onClick={() => setSelectedFlow(flow)}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                        {flow.category}
                      </div>
                      <div className="text-green-400 text-sm font-semibold">
                        {flow.efficiency} eficiência
                      </div>
                    </div>
                    
                    <h4 className="text-white font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                      {flow.name}
                    </h4>
                    <p className="text-white/60 text-sm mb-4">{flow.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-white/40">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {flow.estimatedTime}
                      </div>
                      <div className="text-white/40">
                        {flow.steps.length} etapas
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Flow Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <button
                    onClick={() => setSelectedFlow(null)}
                    className="text-white/60 hover:text-white text-sm mb-2 flex items-center"
                  >
                    ← Voltar aos fluxos
                  </button>
                  <h3 className="text-xl font-bold text-white">{selectedFlow.name}</h3>
                  <p className="text-white/60">{selectedFlow.description}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  {!isSimulating && currentStep === 0 && (
                    <button
                      onClick={startSimulation}
                      className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-500 transition-all flex items-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Simulação
                    </button>
                  )}
                  
                  {(isSimulating || currentStep > 0) && (
                    <button
                      onClick={resetSimulation}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reiniciar
                    </button>
                  )}
                </div>
              </div>

              {/* Flow Visualization */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <div className="space-y-4">
                  {selectedFlow.steps.map((step, index) => {
                    const Icon = stepIcons[step.type] || Workflow
                    const isActive = index === currentStep && isSimulating
                    const isCompleted = index < currentStep || (!isSimulating && simulationResults)
                    const isUpcoming = index > currentStep
                    
                    return (
                      <div key={step.id} className="flex items-center space-x-4">
                        {/* Step Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          isActive 
                            ? `bg-gradient-to-br ${stepColors[step.type]} animate-pulse` 
                            : isCompleted
                            ? 'bg-gradient-to-br from-green-500 to-emerald-400'
                            : 'bg-white/10'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <Icon className={`w-6 h-6 ${isActive ? 'text-white' : isUpcoming ? 'text-white/40' : 'text-white/60'}`} />
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-semibold ${
                              isActive ? 'text-white' : isCompleted ? 'text-green-300' : 'text-white/60'
                            }`}>
                              {step.name}
                            </h4>
                            <div className={`text-sm ${
                              isActive ? 'text-cyan-300' : isCompleted ? 'text-green-300' : 'text-white/40'
                            }`}>
                              {step.duration}s
                            </div>
                          </div>
                          <p className={`text-sm ${
                            isActive ? 'text-white/80' : isCompleted ? 'text-white/70' : 'text-white/40'
                          }`}>
                            {step.description}
                          </p>
                          <p className={`text-xs mt-1 ${
                            isActive ? 'text-cyan-300' : isCompleted ? 'text-green-300' : 'text-white/30'
                          }`}>
                            {step.automation}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-24">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                isCompleted 
                                  ? 'w-full bg-gradient-to-r from-green-500 to-emerald-400'
                                  : isActive
                                  ? 'w-1/2 bg-gradient-to-r from-cyan-500 to-teal-400 animate-pulse'
                                  : 'w-0'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Arrow */}
                        {index < selectedFlow.steps.length - 1 && (
                          <div className="flex justify-center">
                            <ArrowRight className={`w-5 h-5 ${
                              isCompleted ? 'text-green-400' : isActive ? 'text-cyan-400' : 'text-white/20'
                            }`} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Results */}
              {simulationResults && (
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    Simulação Concluída!
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{simulationResults.totalTime}s</div>
                      <div className="text-sm text-white/60">Tempo Automatizado</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{simulationResults.manualTime}s</div>
                      <div className="text-sm text-white/60">Tempo Manual</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{simulationResults.timeSaved}s</div>
                      <div className="text-sm text-white/60">Tempo Economizado</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">R$ {simulationResults.costSaving.toFixed(2)}</div>
                      <div className="text-sm text-white/60">Economia por Execução</div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">Impacto Projetado (mensal)</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Execuções estimadas: </span>
                        <span className="text-white font-semibold">500x</span>
                      </div>
                      <div>
                        <span className="text-white/60">Tempo total economizado: </span>
                        <span className="text-green-400 font-semibold">{Math.round(simulationResults.timeSaved * 500 / 3600)}h</span>
                      </div>
                      <div>
                        <span className="text-white/60">Economia mensal: </span>
                        <span className="text-yellow-400 font-semibold">R$ {(simulationResults.costSaving * 500).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FlowSimulator

