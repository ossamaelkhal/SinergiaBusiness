import React, { useState } from 'react'
import { X, Cpu, Plus, Trash2, ArrowRight, CheckCircle, Zap, Target, Settings, MessageSquare, BarChart3, Users, Clock, DollarSign } from 'lucide-react'

const SolutionArchitect = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [solutionData, setSolutionData] = useState({
    businessInfo: {
      name: '',
      industry: '',
      size: '',
      mainGoals: []
    },
    currentChallenges: [],
    desiredOutcomes: [],
    selectedModules: [],
    integrations: [],
    timeline: '',
    budget: ''
  })
  const [generatedSolution, setGeneratedSolution] = useState(null)

  if (!isOpen) return null

  const industries = [
    'Clínicas e Consultórios',
    'Escritórios Contábeis',
    'E-commerce e Varejo',
    'Serviços Profissionais',
    'Restaurantes e Food Service',
    'Educação e Cursos',
    'Imobiliárias',
    'Beleza e Estética',
    'Tecnologia',
    'Manufatura',
    'Outro'
  ]

  const companySizes = [
    { id: 'micro', name: 'Microempresa (1-9 funcionários)', multiplier: 1 },
    { id: 'small', name: 'Pequena (10-49 funcionários)', multiplier: 1.5 },
    { id: 'medium', name: 'Média (50-249 funcionários)', multiplier: 2.5 },
    { id: 'large', name: 'Grande (250+ funcionários)', multiplier: 4 }
  ]

  const availableModules = [
    {
      id: 'qualifica',
      name: 'SinergIA Qualifica',
      description: 'Otimização e qualificação de leads',
      icon: Target,
      color: 'from-blue-500 to-cyan-400',
      features: ['Lead Scoring', 'Segmentação Automática', 'Follow-up Inteligente'],
      price: 497
    },
    {
      id: 'atende',
      name: 'SinergIA Atende',
      description: 'Atendimento automatizado 24/7',
      icon: MessageSquare,
      color: 'from-cyan-500 to-teal-400',
      features: ['Chatbot Inteligente', 'Escalação Automática', 'Análise de Sentimento'],
      price: 697
    },
    {
      id: 'opera',
      name: 'SinergIA Opera',
      description: 'Automação de processos operacionais',
      icon: Settings,
      color: 'from-teal-500 to-green-400',
      features: ['Workflow Automation', 'Dashboards Executivos', 'Alertas Preditivos'],
      price: 897
    },
    {
      id: 'analytics',
      name: 'SinergIA Analytics',
      description: 'Inteligência de negócios avançada',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-400',
      features: ['Relatórios Automáticos', 'Previsões IA', 'KPIs Personalizados'],
      price: 397
    }
  ]

  const commonChallenges = [
    'Processos manuais demorados',
    'Perda de leads por demora no atendimento',
    'Dificuldade em acompanhar clientes',
    'Falta de dados para decisões',
    'Equipe sobrecarregada',
    'Comunicação interna deficiente',
    'Controle de qualidade inconsistente',
    'Relatórios demorados para gerar',
    'Dificuldade em escalar operações',
    'Alto custo operacional'
  ]

  const desiredOutcomes = [
    'Reduzir tempo de resposta ao cliente',
    'Aumentar taxa de conversão de leads',
    'Melhorar satisfação do cliente',
    'Reduzir custos operacionais',
    'Aumentar produtividade da equipe',
    'Ter dados em tempo real',
    'Automatizar tarefas repetitivas',
    'Melhorar qualidade do atendimento',
    'Escalar operações sem aumentar custos',
    'Ter previsibilidade nos resultados'
  ]

  const integrationOptions = [
    { name: 'WhatsApp Business', category: 'Comunicação' },
    { name: 'HubSpot CRM', category: 'CRM' },
    { name: 'Salesforce', category: 'CRM' },
    { name: 'Google Analytics', category: 'Analytics' },
    { name: 'Zapier', category: 'Automação' },
    { name: 'Shopify', category: 'E-commerce' },
    { name: 'WooCommerce', category: 'E-commerce' },
    { name: 'Mailchimp', category: 'Email Marketing' },
    { name: 'Slack', category: 'Comunicação' },
    { name: 'Trello', category: 'Gestão de Projetos' }
  ]

  const generateSolution = () => {
    const selectedModuleObjects = availableModules.filter(module => 
      solutionData.selectedModules.includes(module.id)
    )
    
    const sizeMultiplier = companySizes.find(size => size.id === solutionData.businessInfo.size)?.multiplier || 1
    const basePrice = selectedModuleObjects.reduce((sum, module) => sum + module.price, 0)
    const totalPrice = Math.round(basePrice * sizeMultiplier)
    
    // Calcular ROI estimado baseado nos módulos selecionados
    const estimatedROI = selectedModuleObjects.length * 120 + (sizeMultiplier * 50)
    const monthlyBenefit = Math.round(totalPrice * (estimatedROI / 100) / 12)
    const paybackMonths = Math.round(totalPrice / monthlyBenefit)

    const solution = {
      modules: selectedModuleObjects,
      totalPrice,
      estimatedROI,
      monthlyBenefit,
      paybackMonths,
      implementationTime: `${selectedModuleObjects.length * 2}-${selectedModuleObjects.length * 3} semanas`,
      features: selectedModuleObjects.flatMap(module => module.features),
      integrations: solutionData.integrations,
      customRecommendations: generateRecommendations()
    }

    setGeneratedSolution(solution)
    setCurrentStep(5)
  }

  const generateRecommendations = () => {
    const recommendations = []
    
    if (solutionData.currentChallenges.includes('Processos manuais demorados')) {
      recommendations.push('Implementar automação de workflows para reduzir 70% do trabalho manual')
    }
    
    if (solutionData.currentChallenges.includes('Perda de leads por demora no atendimento')) {
      recommendations.push('Configurar resposta automática em menos de 30 segundos')
    }
    
    if (solutionData.desiredOutcomes.includes('Ter dados em tempo real')) {
      recommendations.push('Dashboard executivo com métricas atualizadas a cada 5 minutos')
    }
    
    if (solutionData.businessInfo.size === 'micro' || solutionData.businessInfo.size === 'small') {
      recommendations.push('Começar com módulos essenciais e expandir gradualmente')
    }

    return recommendations
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      generateSolution()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleSelection = (array, item, field) => {
    setSolutionData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-400 rounded-xl flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Arquiteto de Soluções SinergIA</h2>
              <p className="text-white/60 text-sm">Projete sua solução de IA personalizada</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-2 mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-teal-500 to-green-400 text-white' 
                    : 'bg-white/10 text-white/40'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 5 && (
                  <div className={`w-12 h-1 mx-2 rounded ${
                    step < currentStep ? 'bg-gradient-to-r from-teal-500 to-green-400' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-white/60">
            {currentStep === 1 && 'Informações do Negócio'}
            {currentStep === 2 && 'Desafios Atuais'}
            {currentStep === 3 && 'Objetivos Desejados'}
            {currentStep === 4 && 'Configuração da Solução'}
            {currentStep === 5 && 'Solução Personalizada'}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Informações do seu negócio</h3>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Nome da empresa</label>
                <input
                  type="text"
                  value={solutionData.businessInfo.name}
                  onChange={(e) => setSolutionData(prev => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo, name: e.target.value }
                  }))}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-teal-500 focus:outline-none"
                  placeholder="Digite o nome da sua empresa"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Setor de atuação</label>
                <select
                  value={solutionData.businessInfo.industry}
                  onChange={(e) => setSolutionData(prev => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo, industry: e.target.value }
                  }))}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-teal-500 focus:outline-none"
                >
                  <option value="">Selecione o setor</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry} className="bg-gray-800">
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Porte da empresa</label>
                <div className="space-y-2">
                  {companySizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSolutionData(prev => ({
                        ...prev,
                        businessInfo: { ...prev.businessInfo, size: size.id }
                      }))}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        solutionData.businessInfo.size === size.id
                          ? 'border-teal-500 bg-teal-500/10 text-white'
                          : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Quais são seus principais desafios?</h3>
              <p className="text-white/60">Selecione todos os desafios que sua empresa enfrenta atualmente:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {commonChallenges.map((challenge) => (
                  <button
                    key={challenge}
                    onClick={() => toggleSelection(solutionData.currentChallenges, challenge, 'currentChallenges')}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      solutionData.currentChallenges.includes(challenge)
                        ? 'border-red-500 bg-red-500/10 text-white'
                        : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        solutionData.currentChallenges.includes(challenge)
                          ? 'border-red-500 bg-red-500'
                          : 'border-white/40'
                      }`}>
                        {solutionData.currentChallenges.includes(challenge) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>{challenge}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Quais resultados você deseja alcançar?</h3>
              <p className="text-white/60">Selecione os objetivos mais importantes para seu negócio:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {desiredOutcomes.map((outcome) => (
                  <button
                    key={outcome}
                    onClick={() => toggleSelection(solutionData.desiredOutcomes, outcome, 'desiredOutcomes')}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      solutionData.desiredOutcomes.includes(outcome)
                        ? 'border-green-500 bg-green-500/10 text-white'
                        : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        solutionData.desiredOutcomes.includes(outcome)
                          ? 'border-green-500 bg-green-500'
                          : 'border-white/40'
                      }`}>
                        {solutionData.desiredOutcomes.includes(outcome) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>{outcome}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Configure sua solução</h3>
              
              <div>
                <h4 className="text-white font-medium mb-4">Módulos SinergIA</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableModules.map((module) => {
                    const Icon = module.icon
                    return (
                      <button
                        key={module.id}
                        onClick={() => toggleSelection(solutionData.selectedModules, module.id, 'selectedModules')}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          solutionData.selectedModules.includes(module.id)
                            ? 'border-teal-500 bg-teal-500/10 text-white'
                            : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold">{module.name}</h5>
                              <span className="text-sm text-green-400">R$ {module.price}/mês</span>
                            </div>
                            <p className="text-sm text-white/60 mb-2">{module.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {module.features.slice(0, 2).map((feature) => (
                                <span key={feature} className="text-xs bg-white/10 px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Integrações desejadas</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {integrationOptions.map((integration) => (
                    <button
                      key={integration.name}
                      onClick={() => toggleSelection(solutionData.integrations, integration.name, 'integrations')}
                      className={`p-3 rounded-lg border text-sm transition-all ${
                        solutionData.integrations.includes(integration.name)
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30'
                      }`}
                    >
                      <div className="font-medium">{integration.name}</div>
                      <div className="text-xs text-white/50">{integration.category}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && generatedSolution && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Sua Solução SinergIA Personalizada</h3>
                <p className="text-white/60">Baseada nas suas necessidades e objetivos específicos</p>
              </div>

              {/* Solution Overview */}
              <div className="bg-gradient-to-br from-teal-500/10 to-green-500/10 border border-teal-500/20 rounded-xl p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">R$ {generatedSolution.totalPrice.toLocaleString()}</div>
                    <div className="text-sm text-white/60">Investimento Mensal</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{generatedSolution.estimatedROI}%</div>
                    <div className="text-sm text-white/60">ROI Estimado</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{generatedSolution.paybackMonths}</div>
                    <div className="text-sm text-white/60">Meses Payback</div>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{generatedSolution.implementationTime}</div>
                    <div className="text-sm text-white/60">Implementação</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-lg text-white mb-1">Benefício Mensal Estimado</div>
                  <div className="text-3xl font-bold text-green-400">R$ {generatedSolution.monthlyBenefit.toLocaleString()}</div>
                </div>
              </div>

              {/* Modules */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Módulos Incluídos</h4>
                <div className="space-y-3">
                  {generatedSolution.modules.map((module) => {
                    const Icon = module.icon
                    return (
                      <div key={module.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-semibold text-white">{module.name}</h5>
                              <span className="text-green-400 font-semibold">R$ {module.price}/mês</span>
                            </div>
                            <p className="text-white/60 text-sm">{module.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Recomendações Personalizadas</h4>
                <div className="space-y-2">
                  {generatedSolution.customRecommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-teal-500 to-green-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-green-500 transition-all flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Solicitar Proposta Detalhada
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  Agendar Consultoria
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {currentStep < 5 && (
          <div className="flex items-center justify-between p-6 border-t border-white/10">
            <button
              onClick={currentStep > 1 ? handleBack : onClose}
              className="px-4 py-2 text-white/60 hover:text-white transition-colors"
            >
              {currentStep > 1 ? 'Voltar' : 'Cancelar'}
            </button>
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && (!solutionData.businessInfo.name || !solutionData.businessInfo.industry || !solutionData.businessInfo.size)) ||
                (currentStep === 2 && solutionData.currentChallenges.length === 0) ||
                (currentStep === 3 && solutionData.desiredOutcomes.length === 0) ||
                (currentStep === 4 && solutionData.selectedModules.length === 0)
              }
              className="bg-gradient-to-r from-teal-500 to-green-400 text-white px-6 py-2 rounded-lg font-semibold hover:from-teal-600 hover:to-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {currentStep === 4 ? 'Gerar Solução' : 'Próximo'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SolutionArchitect

