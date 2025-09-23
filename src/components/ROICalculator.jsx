import React, { useState } from 'react'
import { X, Calculator, DollarSign, Clock, TrendingUp, Users, ArrowRight, Download, CheckCircle } from 'lucide-react'

const ROICalculator = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessType: '',
    monthlyRevenue: '',
    employees: '',
    hoursPerWeek: '',
    hourlyRate: '',
    currentProcesses: [],
    painPoints: []
  })
  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  if (!isOpen) return null

  const businessTypes = [
    { id: 'clinic', name: 'Clínica/Consultório', multiplier: 1.8, processes: ['Agendamentos', 'Prontuários', 'Follow-up'] },
    { id: 'accounting', name: 'Escritório Contábil', multiplier: 2.2, processes: ['Relatórios', 'Documentos', 'Comunicação'] },
    { id: 'ecommerce', name: 'E-commerce/Varejo', multiplier: 1.9, processes: ['Atendimento', 'Estoque', 'Marketing'] },
    { id: 'services', name: 'Serviços Profissionais', multiplier: 2.0, processes: ['Captação', 'Projetos', 'Cobrança'] },
    { id: 'other', name: 'Outro', multiplier: 1.5, processes: ['Vendas', 'Operações', 'Atendimento'] }
  ]

  const painPoints = [
    'Processos manuais repetitivos',
    'Perda de leads por demora no atendimento',
    'Dificuldade em acompanhar clientes',
    'Relatórios demorados para gerar',
    'Equipe sobrecarregada',
    'Falta de dados para decisões',
    'Comunicação interna deficiente',
    'Controle de qualidade inconsistente'
  ]

  const calculateROI = () => {
    setIsCalculating(true)
    
    setTimeout(() => {
      const selectedBusiness = businessTypes.find(b => b.id === formData.businessType)
      const monthlyRevenue = parseFloat(formData.monthlyRevenue) || 0
      const employees = parseInt(formData.employees) || 1
      const hoursPerWeek = parseFloat(formData.hoursPerWeek) || 0
      const hourlyRate = parseFloat(formData.hourlyRate) || 50
      
      // Cálculos baseados em dados reais
      const timeSavedPerWeek = hoursPerWeek * 0.6 // 60% de economia de tempo
      const monthlySavings = timeSavedPerWeek * 4 * hourlyRate
      const revenueIncrease = monthlyRevenue * (selectedBusiness?.multiplier || 1.5) * 0.15 // 15% aumento
      const totalMonthlyBenefit = monthlySavings + revenueIncrease
      const annualBenefit = totalMonthlyBenefit * 12
      const investmentCost = 2500 // Custo médio da implementação
      const roi = ((annualBenefit - investmentCost) / investmentCost) * 100
      const paybackMonths = investmentCost / totalMonthlyBenefit

      setResults({
        timeSavedPerWeek: Math.round(timeSavedPerWeek),
        monthlySavings: Math.round(monthlySavings),
        revenueIncrease: Math.round(revenueIncrease),
        totalMonthlyBenefit: Math.round(totalMonthlyBenefit),
        annualBenefit: Math.round(annualBenefit),
        roi: Math.round(roi),
        paybackMonths: Math.round(paybackMonths * 10) / 10,
        investmentCost
      })
      
      setIsCalculating(false)
      setStep(4)
    }, 2000)
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      calculateROI()
    }
  }

  const handleProcessToggle = (process) => {
    setFormData(prev => ({
      ...prev,
      currentProcesses: prev.currentProcesses.includes(process)
        ? prev.currentProcesses.filter(p => p !== process)
        : [...prev.currentProcesses, process]
    }))
  }

  const handlePainPointToggle = (painPoint) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(painPoint)
        ? prev.painPoints.filter(p => p !== painPoint)
        : [...prev.painPoints, painPoint]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Calculadora de ROI SinergIA</h2>
              <p className="text-white/60 text-sm">Descubra o potencial de retorno para seu negócio</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-2 mb-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum <= step 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white' 
                    : 'bg-white/10 text-white/40'
                }`}>
                  {stepNum < step ? <CheckCircle className="w-4 h-4" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-12 h-1 mx-2 rounded ${
                    stepNum < step ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-white/60">
            {step === 1 && 'Informações do Negócio'}
            {step === 2 && 'Processos Atuais'}
            {step === 3 && 'Pontos de Dor'}
            {step === 4 && 'Resultados'}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Conte-nos sobre seu negócio</h3>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Tipo de Negócio</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {businessTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData(prev => ({ ...prev, businessType: type.id }))}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        formData.businessType === type.id
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30'
                      }`}
                    >
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-white/60">ROI médio: +{Math.round(type.multiplier * 100)}%</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Faturamento Mensal (R$)</label>
                  <input
                    type="number"
                    value={formData.monthlyRevenue}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyRevenue: e.target.value }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:outline-none"
                    placeholder="Ex: 50000"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Número de Funcionários</label>
                  <input
                    type="number"
                    value={formData.employees}
                    onChange={(e) => setFormData(prev => ({ ...prev, employees: e.target.value }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:outline-none"
                    placeholder="Ex: 5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Horas gastas em processos manuais/semana</label>
                  <input
                    type="number"
                    value={formData.hoursPerWeek}
                    onChange={(e) => setFormData(prev => ({ ...prev, hoursPerWeek: e.target.value }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:outline-none"
                    placeholder="Ex: 20"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Custo por hora da equipe (R$)</label>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:outline-none"
                    placeholder="Ex: 75"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quais processos você executa atualmente?</h3>
              <p className="text-white/60 mb-6">Selecione todos os processos que sua equipe realiza manualmente:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {businessTypes.find(b => b.id === formData.businessType)?.processes.concat([
                  'Atendimento ao cliente',
                  'Geração de relatórios',
                  'Controle de estoque',
                  'Gestão financeira',
                  'Marketing digital',
                  'Vendas e prospecção'
                ]).map((process) => (
                  <button
                    key={process}
                    onClick={() => handleProcessToggle(process)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      formData.currentProcesses.includes(process)
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        formData.currentProcesses.includes(process)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-white/40'
                      }`}>
                        {formData.currentProcesses.includes(process) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>{process}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quais são seus principais desafios?</h3>
              <p className="text-white/60 mb-6">Identifique os pontos de dor que mais impactam seu negócio:</p>
              
              <div className="grid grid-cols-1 gap-3">
                {painPoints.map((painPoint) => (
                  <button
                    key={painPoint}
                    onClick={() => handlePainPointToggle(painPoint)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      formData.painPoints.includes(painPoint)
                        ? 'border-red-500 bg-red-500/10 text-white'
                        : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        formData.painPoints.includes(painPoint)
                          ? 'border-red-500 bg-red-500'
                          : 'border-white/40'
                      }`}>
                        {formData.painPoints.includes(painPoint) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>{painPoint}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && results && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Seu Potencial de ROI com SinergIA</h3>
                <p className="text-white/60">Baseado nas informações fornecidas, aqui está sua projeção:</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{results.roi}%</div>
                  <div className="text-sm text-white/60">ROI Anual</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{results.timeSavedPerWeek}h</div>
                  <div className="text-sm text-white/60">Horas/Semana Economizadas</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">R$ {results.totalMonthlyBenefit.toLocaleString()}</div>
                  <div className="text-sm text-white/60">Benefício Mensal</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{results.paybackMonths}</div>
                  <div className="text-sm text-white/60">Meses para Payback</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Detalhamento dos Benefícios</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Economia com automação (mensal)</span>
                    <span className="text-green-400 font-semibold">R$ {results.monthlySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Aumento de receita (mensal)</span>
                    <span className="text-blue-400 font-semibold">R$ {results.revenueIncrease.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Benefício total anual</span>
                      <span className="text-white font-bold text-lg">R$ {results.annualBenefit.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Investimento inicial</span>
                    <span className="text-white/60">R$ {results.investmentCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Relatório Completo
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-500 transition-all flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Começar Implementação
                </button>
              </div>
            </div>
          )}

          {isCalculating && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-white mb-2">Calculando seu ROI...</h3>
              <p className="text-white/60">Analisando dados e projetando resultados personalizados</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 4 && !isCalculating && (
          <div className="flex items-center justify-between p-6 border-t border-white/10">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
              className="px-4 py-2 text-white/60 hover:text-white transition-colors"
            >
              {step > 1 ? 'Voltar' : 'Cancelar'}
            </button>
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && (!formData.businessType || !formData.monthlyRevenue)) ||
                (step === 2 && formData.currentProcesses.length === 0) ||
                (step === 3 && formData.painPoints.length === 0)
              }
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {step === 3 ? 'Calcular ROI' : 'Próximo'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ROICalculator

