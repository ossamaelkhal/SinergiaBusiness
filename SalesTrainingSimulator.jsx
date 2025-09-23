import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  XCircle,
  Star,
  Trophy,
  Target,
  Users,
  Clock,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Lightbulb,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

const SalesTrainingSimulator = ({ onClose }) => {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [completedScenarios, setCompletedScenarios] = useState([])

  const scenarios = [
    {
      id: 1,
      title: "Primeira Abordagem - E-commerce",
      difficulty: "Iniciante",
      client: "Maria Silva - Dona de loja de roupas online",
      context: "Cliente com 50 pedidos/mês, gastando 20h/semana em atendimento manual",
      steps: [
        {
          situation: "Você está fazendo a primeira ligação para Maria. Ela atende meio desconfiada.",
          clientSpeech: "Alô? Quem é?",
          options: [
            {
              text: "Oi Maria! Eu sou João da Tropa da Virada, temos uma solução incrível de IA para você!",
              score: 2,
              feedback: "Muito direto e vendedor. Pode assustar o cliente logo de cara.",
              type: "poor"
            },
            {
              text: "Olá Maria, meu nome é João. Você tem alguns minutos? Gostaria de entender melhor como funciona seu atendimento online.",
              score: 8,
              feedback: "Excelente! Abordagem consultiva, pedindo permissão e focando no cliente.",
              type: "excellent"
            },
            {
              text: "Oi, sou da Tropa da Virada. Vi que você tem uma loja online e posso te ajudar a automatizar.",
              score: 5,
              feedback: "Razoável, mas ainda muito focado no produto. Falta descobrir as dores primeiro.",
              type: "average"
            }
          ]
        },
        {
          situation: "Maria aceita conversar. Ela menciona que está muito cansada com o atendimento manual.",
          clientSpeech: "Olha, eu realmente estou sobrecarregada. Passo o dia inteiro respondendo WhatsApp e ainda tenho que cuidar do estoque, das postagens...",
          options: [
            {
              text: "Perfeito! Nossa IA resolve isso em 72 horas. Quer ver uma demonstração?",
              score: 3,
              feedback: "Muito apressado. Não explorou a dor o suficiente.",
              type: "poor"
            },
            {
              text: "Entendo perfeitamente, Maria. Quantas horas por dia você diria que gasta só com atendimento?",
              score: 9,
              feedback: "Perfeita! Quantificando a dor para criar urgência e valor.",
              type: "excellent"
            },
            {
              text: "Imagino como deve ser difícil. Muitos dos nossos clientes passavam pela mesma situação.",
              score: 6,
              feedback: "Boa empatia, mas perdeu a chance de quantificar a dor.",
              type: "average"
            }
          ]
        },
        {
          situation: "Maria revela que gasta 4-5 horas por dia só no atendimento. Você precisa criar urgência.",
          clientSpeech: "Umas 4 ou 5 horas por dia só respondendo cliente. E final de semana então... não tenho descanso.",
          options: [
            {
              text: "Maria, você está perdendo R$ 2.400 por mês só em tempo. Vamos resolver isso hoje?",
              score: 7,
              feedback: "Boa quantificação, mas muito direto para o fechamento.",
              type: "good"
            },
            {
              text: "5 horas por dia são 150 horas por mês, Maria. Se você pudesse recuperar esse tempo, o que faria com ele?",
              score: 10,
              feedback: "PERFEITO! Quantificou a dor e criou uma visão de futuro positiva.",
              type: "excellent"
            },
            {
              text: "Realmente é muito tempo. Nossa solução pode reduzir isso para 30 minutos por dia.",
              score: 5,
              feedback: "Apresentou a solução cedo demais. Faltou explorar o impacto emocional.",
              type: "average"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Objeção de Preço - Clínica",
      difficulty: "Avançado",
      client: "Dr. Roberto - Clínica odontológica",
      context: "Cliente interessado, mas achou o investimento alto (R$ 2.500/mês)",
      steps: [
        {
          situation: "Dr. Roberto gostou da apresentação, mas hesita no investimento.",
          clientSpeech: "Olha, gostei muito da solução, mas R$ 2.500 por mês é bem salgado para minha clínica...",
          options: [
            {
              text: "Doutor, posso fazer um desconto especial de 20% para fechar hoje.",
              score: 3,
              feedback: "Erro grave! Desvalorizou o produto e não tratou a objeção real.",
              type: "poor"
            },
            {
              text: "Entendo sua preocupação, Dr. Roberto. Me ajuda a entender: quanto a clínica fatura por mês?",
              score: 9,
              feedback: "Excelente! Vai contextualizar o investimento com o faturamento.",
              type: "excellent"
            },
            {
              text: "Dr. Roberto, vamos ver o ROI: você economiza 20h/semana, isso vale quanto?",
              score: 7,
              feedback: "Boa abordagem de ROI, mas poderia ser mais consultiva.",
              type: "good"
            }
          ]
        },
        {
          situation: "Dr. Roberto revela que fatura R$ 80.000/mês, mas tem muitos custos.",
          clientSpeech: "Olha, faturamos uns R$ 80 mil por mês, mas você sabe como é... aluguel, funcionários, equipamentos...",
          options: [
            {
              text: "Perfeito! R$ 2.500 é apenas 3% do seu faturamento. É um investimento mínimo!",
              score: 4,
              feedback: "Muito simplista. Não considerou a realidade dos custos dele.",
              type: "poor"
            },
            {
              text: "Entendo, Dr. Roberto. E se eu te disser que nossos clientes aumentam o faturamento em média 25% no primeiro ano?",
              score: 8,
              feedback: "Boa! Mudou o foco de custo para investimento com retorno.",
              type: "excellent"
            },
            {
              text: "Compreendo os custos. Vamos calcular: 20h economizadas por semana, quanto vale sua hora?",
              score: 6,
              feedback: "Razoável, mas focou só na economia, não no crescimento.",
              type: "average"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Fechamento Complexo - Escritório Contábil",
      difficulty: "Elite",
      client: "Sra. Ana - Escritório com 200 clientes",
      context: "Negociação avançada, múltiplos decisores, contrato anual",
      steps: [
        {
          situation: "Sra. Ana quer envolver o sócio na decisão. Como você conduz?",
          clientSpeech: "Preciso conversar com meu sócio antes de decidir. É um investimento grande...",
          options: [
            {
              text: "Sem problemas! Quando vocês podem se reunir? Posso apresentar para os dois juntos.",
              score: 8,
              feedback: "Boa! Não pressionou e se ofereceu para apresentar para ambos.",
              type: "excellent"
            },
            {
              text: "Ana, entendo. Mas essa oferta especial é só até hoje. Não posso garantir o mesmo preço depois.",
              score: 3,
              feedback: "Pressão desnecessária. Pode quebrar a confiança construída.",
              type: "poor"
            },
            {
              text: "Claro! Que tal eu preparar um relatório executivo para vocês analisarem?",
              score: 7,
              feedback: "Boa ideia, mas perdeu a chance de agendar uma reunião conjunta.",
              type: "good"
            }
          ]
        }
      ]
    }
  ]

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1)
      }, 1000)
    } else if (!isActive && timeElapsed !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, timeElapsed])

  const handleOptionSelect = (option, index) => {
    setSelectedOption(index)
    setFeedback(option)
    setScore(score + option.score)
    
    setTimeout(() => {
      if (currentStep < scenarios[currentScenario].steps.length - 1) {
        setCurrentStep(currentStep + 1)
        setSelectedOption(null)
        setFeedback(null)
      } else {
        // Cenário completo
        const scenarioScore = Math.round((score / (scenarios[currentScenario].steps.length * 10)) * 100)
        setCompletedScenarios([...completedScenarios, {
          id: scenarios[currentScenario].id,
          score: scenarioScore,
          time: timeElapsed
        }])
        setIsActive(false)
      }
    }, 3000)
  }

  const startScenario = () => {
    setIsActive(true)
    setCurrentStep(0)
    setScore(0)
    setTimeElapsed(0)
    setSelectedOption(null)
    setFeedback(null)
  }

  const resetSimulator = () => {
    setCurrentScenario(0)
    setCurrentStep(0)
    setScore(0)
    setTimeElapsed(0)
    setIsActive(false)
    setSelectedOption(null)
    setFeedback(null)
    setCompletedScenarios([])
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-400'
    if (score >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBadge = (score) => {
    if (score >= 8) return { text: 'EXCELENTE', color: 'bg-green-500/20 text-green-300 border-green-500/30' }
    if (score >= 6) return { text: 'BOM', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' }
    return { text: 'PRECISA MELHORAR', color: 'bg-red-500/20 text-red-300 border-red-500/30' }
  }

  const currentScenarioData = scenarios[currentScenario]
  const currentStepData = currentScenarioData.steps[currentStep]
  const isScenarioComplete = currentStep >= currentScenarioData.steps.length - 1 && feedback

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Simulador de Vendas IA</h2>
              <p className="text-white/60">Treine suas habilidades com cenários reais</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Status Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{formatTime(timeElapsed)}</div>
                <div className="text-sm text-white/60">Tempo</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <Trophy className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{score}</div>
                <div className="text-sm text-white/60">Pontuação</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{currentStep + 1}/{currentScenarioData.steps.length}</div>
                <div className="text-sm text-white/60">Progresso</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{completedScenarios.length}</div>
                <div className="text-sm text-white/60">Completos</div>
              </CardContent>
            </Card>
          </div>

          {/* Scenario Selection */}
          {!isActive && currentStep === 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Escolha seu Cenário de Treinamento</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {scenarios.map((scenario, index) => (
                  <Card 
                    key={scenario.id} 
                    className={`bg-white/10 border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/15 ${
                      currentScenario === index ? 'border-orange-500/50 bg-orange-500/10' : ''
                    }`}
                    onClick={() => setCurrentScenario(index)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${
                          scenario.difficulty === 'Iniciante' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                          scenario.difficulty === 'Avançado' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                          'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        }`}>
                          {scenario.difficulty}
                        </Badge>
                        {completedScenarios.find(c => c.id === scenario.id) && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <CardTitle className="text-white text-lg">{scenario.title}</CardTitle>
                      <CardDescription className="text-white/70">
                        <strong>{scenario.client}</strong><br />
                        {scenario.context}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-white/60">
                          {scenario.steps.length} etapas
                        </div>
                        {completedScenarios.find(c => c.id === scenario.id) && (
                          <div className="text-sm text-green-400 font-semibold">
                            {completedScenarios.find(c => c.id === scenario.id).score}%
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                  onClick={startScenario}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Iniciar Simulação
                </Button>
              </div>
            </div>
          )}

          {/* Active Simulation */}
          {isActive && (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Progresso do Cenário</span>
                  <span className="text-sm text-white/60">{currentStep + 1} de {currentScenarioData.steps.length}</span>
                </div>
                <Progress value={((currentStep + 1) / currentScenarioData.steps.length) * 100} className="h-2" />
              </div>

              {/* Current Scenario Info */}
              <Card className="bg-gradient-to-r from-orange-500/20 to-purple-600/20 border-orange-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{currentScenarioData.title}</h3>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      {currentScenarioData.difficulty}
                    </Badge>
                  </div>
                  <p className="text-white/80 mb-2">
                    <strong>Cliente:</strong> {currentScenarioData.client}
                  </p>
                  <p className="text-white/80">
                    <strong>Contexto:</strong> {currentScenarioData.context}
                  </p>
                </CardContent>
              </Card>

              {/* Current Step */}
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-2">Situação:</h4>
                      <p className="text-white/80">{currentStepData.situation}</p>
                    </div>
                    
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <MessageSquare className="w-5 h-5 text-green-400 mr-2" />
                        <h4 className="text-lg font-semibold text-white">Cliente fala:</h4>
                      </div>
                      <p className="text-white/80 italic">"{currentStepData.clientSpeech}"</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-white">Como você responderia?</h4>
                      {currentStepData.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className={`w-full text-left p-4 h-auto border-white/20 text-white hover:bg-white/10 ${
                            selectedOption === index ? 
                              option.type === 'excellent' ? 'border-green-500/50 bg-green-500/10' :
                              option.type === 'good' ? 'border-yellow-500/50 bg-yellow-500/10' :
                              option.type === 'average' ? 'border-blue-500/50 bg-blue-500/10' :
                              'border-red-500/50 bg-red-500/10'
                            : ''
                          }`}
                          onClick={() => !selectedOption && handleOptionSelect(option, index)}
                          disabled={selectedOption !== null}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div className="flex-1 text-left">
                              {option.text}
                            </div>
                            {selectedOption === index && (
                              <div className="flex items-center space-x-2">
                                <span className={`text-sm font-semibold ${getScoreColor(option.score)}`}>
                                  {option.score}/10
                                </span>
                                {option.type === 'excellent' ? <ThumbsUp className="w-5 h-5 text-green-400" /> :
                                 option.type === 'poor' ? <ThumbsDown className="w-5 h-5 text-red-400" /> :
                                 <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                              </div>
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback */}
              {feedback && (
                <Card className={`border-2 ${
                  feedback.type === 'excellent' ? 'bg-green-500/20 border-green-500/50' :
                  feedback.type === 'good' ? 'bg-yellow-500/20 border-yellow-500/50' :
                  feedback.type === 'average' ? 'bg-blue-500/20 border-blue-500/50' :
                  'bg-red-500/20 border-red-500/50'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-white">Feedback</h4>
                      <Badge className={getScoreBadge(feedback.score).color}>
                        {getScoreBadge(feedback.score).text}
                      </Badge>
                    </div>
                    <p className="text-white/90 mb-4">{feedback.feedback}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-orange-400" />
                        <span className="text-white font-semibold">{feedback.score}/10 pontos</span>
                      </div>
                      {feedback.type === 'excellent' && (
                        <div className="flex items-center space-x-2 text-green-400">
                          <Trophy className="w-5 h-5" />
                          <span className="font-semibold">Resposta Perfeita!</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Scenario Complete */}
          {isScenarioComplete && (
            <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 mt-6">
              <CardContent className="p-8 text-center">
                <Trophy className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Cenário Completo!</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-white">{Math.round((score / (currentScenarioData.steps.length * 10)) * 100)}%</div>
                    <div className="text-sm text-white/60">Pontuação Final</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{formatTime(timeElapsed)}</div>
                    <div className="text-sm text-white/60">Tempo Total</div>
                  </div>
                  <div className="md:col-span-1 col-span-2">
                    <div className="text-2xl font-bold text-white">{score}/{currentScenarioData.steps.length * 10}</div>
                    <div className="text-sm text-white/60">Pontos</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                    onClick={resetSimulator}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Tentar Outro Cenário
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={onClose}>
                    Finalizar Treinamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          {!isScenarioComplete && (
            <div className="flex justify-center space-x-4 mt-8">
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => setIsActive(!isActive)}
              >
                {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isActive ? 'Pausar' : 'Continuar'}
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={resetSimulator}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesTrainingSimulator

