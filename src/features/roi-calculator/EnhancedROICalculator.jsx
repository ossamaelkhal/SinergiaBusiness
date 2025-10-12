import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  X, 
  Calculator, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Users,
  ArrowRight,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const EnhancedROICalculator = ({ isOpen, onClose }) => {
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
    { id: 'manual_tasks', name: 'Tarefas manuais repetitivas', impact: 0.3 },
    { id: 'slow_response', name: 'Tempo de resposta lento', impact: 0.25 },
    { id: 'data_entry', name: 'Entrada manual de dados', impact: 0.35 },
    { id: 'follow_up', name: 'Follow-up inconsistente', impact: 0.2 },
    { id: 'reporting', name: 'Relatórios demorados', impact: 0.4 },
    { id: 'scheduling', name: 'Agendamentos desorganizados', impact: 0.3 }
  ]

  const calculateROI = () => {
    setIsCalculating(true)
    
    setTimeout(() => {
      const businessType = businessTypes.find(bt => bt.id === formData.businessType)
      const monthlyRevenue = parseFloat(formData.monthlyRevenue) || 0
      const employees = parseInt(formData.employees) || 1
      const hoursPerWeek = parseFloat(formData.hoursPerWeek) || 0
      const hourlyRate = parseFloat(formData.hourlyRate) || 50

      // Cálculos baseados na lógica de negócio
      const weeklyTimeSaved = hoursPerWeek * 0.7 // 70% de economia em tarefas automatizáveis
      const monthlyTimeSaved = weeklyTimeSaved * 4.33
      const yearlyCostSavings = monthlyTimeSaved * 12 * hourlyRate

      // Impacto nos processos selecionados
      const processImpact = formData.currentProcesses.length * 0.15
      const painPointImpact = formData.painPoints.reduce((acc, ppId) => {
        const painPoint = painPoints.find(pp => pp.id === ppId)
        return acc + (painPoint?.impact || 0)
      }, 0)

      // ROI com multiplicador do tipo de negócio
      const baseROI = (yearlyCostSavings + (monthlyRevenue * 12 * processImpact)) * businessType.multiplier
      const investmentCost = 12000 // Custo médio anual da solução
      const netROI = baseROI - investmentCost
      const roiPercentage = ((netROI / investmentCost) * 100)

      // Benefícios adicionais
      const revenueIncrease = monthlyRevenue * 12 * (0.15 + painPointImpact)
      const efficiencyGain = weeklyTimeSaved / hoursPerWeek * 100

      setResults({
        timeSaved: {
          weekly: weeklyTimeSaved,
          monthly: monthlyTimeSaved,
          yearly: monthlyTimeSaved * 12
        },
        costSavings: {
          monthly: monthlyTimeSaved * hourlyRate,
          yearly: yearlyCostSavings
        },
        revenueIncrease: {
          monthly: revenueIncrease / 12,
          yearly: revenueIncrease
        },
        roi: {
          investment: investmentCost,
          return: baseROI,
          net: netROI,
          percentage: roiPercentage,
          paybackMonths: investmentCost / (monthlyTimeSaved * hourlyRate + revenueIncrease / 12)
        },
        efficiency: efficiencyGain,
        businessType: businessType.name
      })
      
      setIsCalculating(false)
      setStep(4)
    }, 2000)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }))
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(Math.round(value))
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Calculadora de ROI Inteligente</h2>
              <p className="text-white/70">Descubra o potencial de economia do seu negócio</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70">Progresso</span>
              <span className="text-white/70">{step}/4</span>
            </div>
            <Progress value={(step / 4) * 100} className="h-2" />
          </div>

          {/* Step 1: Business Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Qual é o tipo do seu negócio?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {businessTypes.map(type => (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        formData.businessType === type.id 
                          ? 'bg-orange-500/20 border-orange-500/50' 
                          : 'bg-white/10 border-white/20 hover:bg-white/15'
                      }`}
                      onClick={() => handleInputChange('businessType', type.id)}
                    >
                      <CardContent className="p-4">
                        <h4 className="text-white font-semibold">{type.name}</h4>
                        <p className="text-white/70 text-sm mt-1">
                          Processos típicos: {type.processes.join(', ')}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!formData.businessType}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Business Data */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Dados do seu negócio</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 mb-2">Faturamento mensal (R$)</label>
                  <input
                    type="number"
                    value={formData.monthlyRevenue}
                    onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="Ex: 50000"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Número de funcionários</label>
                  <input
                    type="number"
                    value={formData.employees}
                    onChange={(e) => handleInputChange('employees', e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="Ex: 5"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Horas gastas em tarefas repetitivas (por semana)</label>
                  <input
                    type="number"
                    value={formData.hoursPerWeek}
                    onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="Ex: 20"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Custo médio por hora (R$)</label>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="Ex: 75"
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button onClick={() => setStep(1)} variant="outline" className="border-white/20 text-white">
                  Voltar
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={!formData.monthlyRevenue || !formData.hoursPerWeek}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Processes and Pain Points */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Quais processos você quer automatizar?</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {businessTypes.find(bt => bt.id === formData.businessType)?.processes.map(process => (
                    <label key={process} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15">
                      <input
                        type="checkbox"
                        checked={formData.currentProcesses.includes(process)}
                        onChange={(e) => handleArrayChange('currentProcesses', process, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-white">{process}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Principais dores do seu negócio</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {painPoints.map(painPoint => (
                    <label key={painPoint.id} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15">
                      <input
                        type="checkbox"
                        checked={formData.painPoints.includes(painPoint.id)}
                        onChange={(e) => handleArrayChange('painPoints', painPoint.id, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-white">{painPoint.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button onClick={() => setStep(2)} variant="outline" className="border-white/20 text-white">
                  Voltar
                </Button>
                <Button 
                  onClick={calculateROI}
                  disabled={formData.currentProcesses.length === 0}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isCalculating ? 'Calculando...' : 'Calcular ROI'}
                  <Calculator className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && results && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Seu Potencial de ROI</h3>
                <p className="text-white/70">Baseado nos dados do seu {results.businessType}</p>
              </div>

              {/* ROI Highlight */}
              <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    {results.roi.percentage > 0 ? '+' : ''}{formatNumber(results.roi.percentage)}%
                  </div>
                  <div className="text-white/80">ROI em 12 meses</div>
                  <div className="text-sm text-white/60 mt-2">
                    Payback em {formatNumber(results.roi.paybackMonths)} meses
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Results */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-400">{formatNumber(results.timeSaved.yearly)}h</div>
                    <div className="text-white/80 text-sm">Horas economizadas/ano</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">{formatCurrency(results.costSavings.yearly)}</div>
                    <div className="text-white/80 text-sm">Economia em custos/ano</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-400">{formatCurrency(results.revenueIncrease.yearly)}</div>
                    <div className="text-white/80 text-sm">Aumento de receita/ano</div>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Breakdown */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Resumo Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/80">Economia em tempo:</span>
                      <span className="text-white font-semibold">{formatNumber(results.timeSaved.monthly)}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Economia em custos:</span>
                      <span className="text-green-400 font-semibold">{formatCurrency(results.costSavings.monthly)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Aumento de receita:</span>
                      <span className="text-purple-400 font-semibold">{formatCurrency(results.revenueIncrease.monthly)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <div className="flex justify-between">
                        <span className="text-white font-semibold">Benefício total mensal:</span>
                        <span className="text-orange-400 font-bold text-lg">
                          {formatCurrency(results.costSavings.monthly + results.revenueIncrease.monthly)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700">
                  Quero Implementar Agora
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Relatório PDF
                </Button>
              </div>

              <div className="text-center">
                <Button 
                  onClick={() => {
                    setStep(1)
                    setFormData({
                      businessType: '',
                      monthlyRevenue: '',
                      employees: '',
                      hoursPerWeek: '',
                      hourlyRate: '',
                      currentProcesses: [],
                      painPoints: []
                    })
                    setResults(null)
                  }}
                  variant="ghost" 
                  className="text-white/70 hover:text-white"
                >
                  Fazer Nova Simulação
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnhancedROICalculator

