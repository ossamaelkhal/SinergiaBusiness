import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Target, 
  Zap, 
  DollarSign, 
  Clock, 
  Users, 
  BarChart3, 
  Settings, 
  MessageSquare,
  Download,
  Sparkles,
  TrendingUp,
  Shield,
  Lightbulb,
  Rocket
} from 'lucide-react'

const steps = [
  {
    id: 1,
    title: "Perfil do Negócio",
    description: "Vamos conhecer seu negócio e identificar oportunidades",
    icon: Target
  },
  {
    id: 2,
    title: "Análise de Dores",
    description: "Identificamos os principais gargalos e perdas de tempo",
    icon: Clock
  },
  {
    id: 3,
    title: "Seleção de Sistemas",
    description: "Escolhemos os Sistemas de IA ideais para seu caso",
    icon: Zap
  },
  {
    id: 4,
    title: "Projeção de ROI",
    description: "Calculamos o retorno esperado e cronograma",
    icon: TrendingUp
  },
  {
    id: 5,
    title: "Blueprint Personalizado",
    description: "Seu plano completo de transformação digital",
    icon: Rocket
  }
]

const businessTypes = [
  { id: 'clinic', name: 'Clínica/Consultório', icon: '🏥', description: 'Área da saúde e bem-estar' },
  { id: 'accounting', name: 'Escritório Contábil', icon: '📊', description: 'Serviços contábeis e fiscais' },
  { id: 'ecommerce', name: 'E-commerce/Varejo', icon: '🛒', description: 'Vendas online e físicas' },
  { id: 'services', name: 'Serviços Profissionais', icon: '💼', description: 'Consultoria e prestação de serviços' },
  { id: 'education', name: 'Educação', icon: '🎓', description: 'Escolas e cursos' },
  { id: 'restaurant', name: 'Restaurante/Food', icon: '🍽️', description: 'Alimentação e delivery' },
  { id: 'real_estate', name: 'Imobiliária', icon: '🏠', description: 'Mercado imobiliário' },
  { id: 'beauty', name: 'Beleza/Estética', icon: '💄', description: 'Salões e clínicas estéticas' }
]

const painPoints = [
  { id: 'lead_qualification', name: 'Qualificação de Leads', impact: 'Alto', time: '15h/semana' },
  { id: 'customer_service', name: 'Atendimento ao Cliente', impact: 'Alto', time: '25h/semana' },
  { id: 'scheduling', name: 'Agendamentos', impact: 'Médio', time: '8h/semana' },
  { id: 'follow_up', name: 'Follow-up de Clientes', impact: 'Alto', time: '12h/semana' },
  { id: 'reporting', name: 'Relatórios e Análises', impact: 'Médio', time: '10h/semana' },
  { id: 'inventory', name: 'Gestão de Estoque', impact: 'Médio', time: '6h/semana' },
  { id: 'billing', name: 'Cobrança e Faturamento', impact: 'Alto', time: '8h/semana' },
  { id: 'marketing', name: 'Marketing e Campanhas', impact: 'Médio', time: '12h/semana' }
]

const aiSystems = [
  {
    id: 'lead_system',
    name: 'Sistema de Qualificação Inteligente',
    description: 'IA que qualifica leads automaticamente e prioriza oportunidades',
    solves: ['lead_qualification', 'follow_up'],
    roi: 280,
    timeSaved: 15,
    price: 2500,
    icon: Target
  },
  {
    id: 'service_system',
    name: 'Sistema de Atendimento Humanizado',
    description: 'Atendimento 24/7 com IA contextual e escalação inteligente',
    solves: ['customer_service', 'scheduling'],
    roi: 320,
    timeSaved: 25,
    price: 3500,
    icon: MessageSquare
  },
  {
    id: 'operations_system',
    name: 'Sistema de Gestão Operacional',
    description: 'Orquestra processos internos e elimina gargalos',
    solves: ['reporting', 'inventory', 'billing'],
    roi: 450,
    timeSaved: 20,
    price: 4000,
    icon: Settings
  },
  {
    id: 'marketing_system',
    name: 'Sistema de Marketing Inteligente',
    description: 'Campanhas automatizadas e segmentação por IA',
    solves: ['marketing', 'follow_up'],
    roi: 380,
    timeSaved: 12,
    price: 3000,
    icon: BarChart3
  }
]

export default function EnhancedSolutionArchitect({ onClose }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    businessType: '',
    businessSize: '',
    monthlyRevenue: '',
    selectedPains: [],
    selectedSystems: [],
    timeline: ''
  })
  const [analysis, setAnalysis] = useState(null)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      
      // Gerar análise no último step
      if (currentStep === 4) {
        generateAnalysis()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateAnalysis = () => {
    const selectedPainPoints = painPoints.filter(p => formData.selectedPains.includes(p.id))
    const recommendedSystems = aiSystems.filter(s => 
      s.solves.some(solve => formData.selectedPains.includes(solve))
    )

    const totalTimeSaved = recommendedSystems.reduce((acc, sys) => acc + sys.timeSaved, 0)
    const totalInvestment = recommendedSystems.reduce((acc, sys) => acc + sys.price, 0)
    const avgROI = recommendedSystems.reduce((acc, sys) => acc + sys.roi, 0) / recommendedSystems.length
    const monthlyRevenue = parseInt(formData.monthlyRevenue) || 50000
    const projectedIncrease = (avgROI / 100) * monthlyRevenue

    setAnalysis({
      painPoints: selectedPainPoints,
      recommendedSystems,
      totalTimeSaved,
      totalInvestment,
      avgROI,
      projectedIncrease,
      paybackPeriod: Math.ceil(totalInvestment / (projectedIncrease / 12)),
      yearlyGain: projectedIncrease * 12 - totalInvestment
    })
  }

  const downloadBlueprint = () => {
    const blueprint = {
      businessProfile: {
        type: businessTypes.find(b => b.id === formData.businessType)?.name,
        size: formData.businessSize,
        monthlyRevenue: formData.monthlyRevenue
      },
      analysis,
      implementation: {
        phase1: "Configuração inicial e treinamento da equipe (Semana 1-2)",
        phase2: "Implementação dos sistemas principais (Semana 3-6)",
        phase3: "Otimização e ajustes finos (Semana 7-8)",
        phase4: "Monitoramento e expansão (Semana 9+)"
      },
      support: {
        onboarding: "2 semanas de implementação assistida",
        training: "Treinamento completo da equipe",
        support: "Suporte 24/7 por 90 dias",
        optimization: "Revisões mensais de performance"
      }
    }

    const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'blueprint-tropa-virada.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Qual é o tipo do seu negócio?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {businessTypes.map(type => (
                  <Card 
                    key={type.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      formData.businessType === type.id 
                        ? 'bg-purple-500/20 border-purple-500' 
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                    onClick={() => setFormData({...formData, businessType: type.id})}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <h4 className="text-white font-medium text-sm mb-1">{type.name}</h4>
                      <p className="text-white/60 text-xs">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Porte do negócio</h3>
              <div className="grid grid-cols-3 gap-4">
                {['Pequeno (1-10 funcionários)', 'Médio (11-50 funcionários)', 'Grande (50+ funcionários)'].map((size, index) => (
                  <Button
                    key={index}
                    variant={formData.businessSize === size ? "default" : "outline"}
                    onClick={() => setFormData({...formData, businessSize: size})}
                    className="h-auto p-4 text-left"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Faturamento mensal aproximado</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Até R$ 50k', 'R$ 50k - R$ 200k', 'R$ 200k - R$ 500k', 'Acima de R$ 500k'].map((revenue, index) => (
                  <Button
                    key={index}
                    variant={formData.monthlyRevenue === revenue ? "default" : "outline"}
                    onClick={() => setFormData({...formData, monthlyRevenue: revenue})}
                    className="h-auto p-3"
                  >
                    {revenue}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Quais são os principais gargalos do seu negócio?
              </h3>
              <p className="text-white/70 mb-6">Selecione todas as áreas que consomem muito tempo da sua equipe:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {painPoints.map(pain => (
                  <Card
                    key={pain.id}
                    className={`cursor-pointer transition-all hover:scale-[1.02] ${
                      formData.selectedPains.includes(pain.id)
                        ? 'bg-red-500/20 border-red-500'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                    onClick={() => {
                      const newPains = formData.selectedPains.includes(pain.id)
                        ? formData.selectedPains.filter(p => p !== pain.id)
                        : [...formData.selectedPains, pain.id]
                      setFormData({...formData, selectedPains: newPains})
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{pain.name}</h4>
                        {formData.selectedPains.includes(pain.id) && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <Badge className={`${
                          pain.impact === 'Alto' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          Impacto {pain.impact}
                        </Badge>
                        <span className="text-white/60">{pain.time} perdidas</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        const recommendedSystems = aiSystems.filter(s => 
          s.solves.some(solve => formData.selectedPains.includes(solve))
        )

        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Sistemas de IA Recomendados para Seu Negócio
              </h3>
              <p className="text-white/70 mb-6">
                Com base nas suas dores, nossa IA recomenda estes sistemas:
              </p>

              <div className="space-y-4">
                {recommendedSystems.map(system => {
                  const Icon = system.icon
                  const solvedPains = painPoints.filter(p => 
                    system.solves.includes(p.id) && formData.selectedPains.includes(p.id)
                  )

                  return (
                    <Card
                      key={system.id}
                      className={`cursor-pointer transition-all hover:scale-[1.01] ${
                        formData.selectedSystems.includes(system.id)
                          ? 'bg-green-500/20 border-green-500'
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      }`}
                      onClick={() => {
                        const newSystems = formData.selectedSystems.includes(system.id)
                          ? formData.selectedSystems.filter(s => s !== system.id)
                          : [...formData.selectedSystems, system.id]
                        setFormData({...formData, selectedSystems: newSystems})
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-lg">{system.name}</h4>
                              <p className="text-white/70">{system.description}</p>
                            </div>
                          </div>
                          {formData.selectedSystems.includes(system.id) && (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{system.roi}%</div>
                            <div className="text-sm text-white/60">ROI Esperado</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">{system.timeSaved}h</div>
                            <div className="text-sm text-white/60">Horas/Semana</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">R$ {system.price.toLocaleString()}</div>
                            <div className="text-sm text-white/60">Investimento</div>
                          </div>
                        </div>

                        <div>
                          <p className="text-white/80 text-sm mb-2">Resolve estas dores:</p>
                          <div className="flex flex-wrap gap-2">
                            {solvedPains.map(pain => (
                              <Badge key={pain.id} className="bg-green-500/20 text-green-300">
                                {pain.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Cronograma de Implementação</h3>
              <p className="text-white/70 mb-6">Quando você gostaria de começar a transformação?</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'immediate', title: 'Imediato', subtitle: 'Começar esta semana', icon: '🚀' },
                  { id: 'month', title: 'Próximo Mês', subtitle: 'Planejamento detalhado', icon: '📅' },
                  { id: 'quarter', title: 'Próximo Trimestre', subtitle: 'Preparação completa', icon: '📊' }
                ].map(option => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      formData.timeline === option.id
                        ? 'bg-purple-500/20 border-purple-500'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                    onClick={() => setFormData({...formData, timeline: option.id})}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{option.icon}</div>
                      <h4 className="text-white font-semibold mb-2">{option.title}</h4>
                      <p className="text-white/60 text-sm">{option.subtitle}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-6">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                Prévia do Seu ROI
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {formData.selectedSystems.length > 0 
                      ? Math.round(aiSystems.filter(s => formData.selectedSystems.includes(s.id))
                          .reduce((acc, s) => acc + s.roi, 0) / formData.selectedSystems.length)
                      : 0}%
                  </div>
                  <div className="text-sm text-white/60">ROI Médio</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {aiSystems.filter(s => formData.selectedSystems.includes(s.id))
                      .reduce((acc, s) => acc + s.timeSaved, 0)}h
                  </div>
                  <div className="text-sm text-white/60">Horas/Semana</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">
                    R$ {aiSystems.filter(s => formData.selectedSystems.includes(s.id))
                      .reduce((acc, s) => acc + s.price, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-white/60">Investimento</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">3-6</div>
                  <div className="text-sm text-white/60">Meses Payback</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        if (!analysis) return null

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Seu Blueprint de Transformação Digital Está Pronto!
              </h3>
              <p className="text-white/70">
                Análise completa baseada no perfil do seu negócio
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-green-500/20 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{Math.round(analysis.avgROI)}%</div>
                  <div className="text-sm text-white/70">ROI Projetado</div>
                </CardContent>
              </Card>

              <Card className="bg-blue-500/20 border-blue-500/30">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">{analysis.totalTimeSaved}h</div>
                  <div className="text-sm text-white/70">Horas/Semana Economizadas</div>
                </CardContent>
              </Card>

              <Card className="bg-purple-500/20 border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">
                    R$ {Math.round(analysis.projectedIncrease).toLocaleString()}
                  </div>
                  <div className="text-sm text-white/70">Aumento Mensal Projetado</div>
                </CardContent>
              </Card>

              <Card className="bg-orange-500/20 border-orange-500/30">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400">{analysis.paybackPeriod}</div>
                  <div className="text-sm text-white/70">Meses para Payback</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/5 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Sistemas Recomendados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.recommendedSystems.map(system => {
                    const Icon = system.icon
                    return (
                      <div key={system.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{system.name}</h4>
                            <p className="text-white/60 text-sm">{system.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-semibold">{system.roi}% ROI</div>
                          <div className="text-white/60 text-sm">R$ {system.price.toLocaleString()}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button 
                onClick={downloadBlueprint}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar Blueprint Completo
              </Button>
              
              <Button 
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  // Aqui você pode adicionar lógica para agendar uma consulta
                  alert('Funcionalidade de agendamento será implementada em breve!')
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Agendar Consultoria
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.businessType && formData.businessSize && formData.monthlyRevenue
      case 2:
        return formData.selectedPains.length > 0
      case 3:
        return formData.selectedSystems.length > 0
      case 4:
        return formData.timeline
      default:
        return true
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] bg-slate-900/95 border-white/20 overflow-hidden">
        <CardHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-2xl flex items-center">
                <Target className="w-8 h-8 mr-3 text-purple-400" />
                Arquiteto de Soluções IA
              </CardTitle>
              <CardDescription className="text-white/70">
                Descubra a solução perfeita para transformar seu negócio
              </CardDescription>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Progresso</span>
              <span className="text-white/70 text-sm">{currentStep} de {steps.length}</span>
            </div>
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          </div>

          {/* Steps */}
          <div className="flex items-center justify-between mt-4 overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    isActive ? 'bg-purple-500/20 text-purple-300' :
                    isCompleted ? 'bg-green-500/20 text-green-300' :
                    'text-white/50'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-purple-500' :
                      isCompleted ? 'bg-green-500' :
                      'bg-white/20'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <Icon className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="hidden md:block">
                      <div className="text-sm font-medium">{step.title}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-white/30 mx-2" />
                  )}
                </div>
              )
            })}
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[60vh]">
          {renderStep()}
        </CardContent>

        <div className="border-t border-white/10 p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {currentStep === steps.length ? 'Finalizar' : 'Próximo'}
              {currentStep < steps.length && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

