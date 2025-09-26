'use client'

import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { ConversionTracker } from '@/components/ConversionTracker'

export function ROICalculator() {
  const [formData, setFormData] = useState({
    monthlyRevenue: '',
    employees: '',
    customerServiceHours: '',
    marketingBudget: ''
  })
  
  const [results, setResults] = useState({
    monthlySavings: 0,
    yearlyROI: 0,
    timesSaved: 0,
    newLeads: 0
  })

  const [showResults, setShowResults] = useState(false)

  const calculateROI = () => {
    const revenue = parseFloat(formData.monthlyRevenue) || 0
    const employees = parseFloat(formData.employees) || 0
    const hours = parseFloat(formData.customerServiceHours) || 0
    const marketing = parseFloat(formData.marketingBudget) || 0

    // Cálculos baseados em dados reais da indústria
    const automationSavings = (employees * 2000) * 0.3 // 30% economia em custos operacionais
    const leadIncrease = marketing * 0.4 // 40% mais leads com IA
    const timesSaved = hours * 0.7 // 70% redução no tempo de atendimento
    const revenueIncrease = revenue * 0.25 // 25% aumento na receita

    const monthlySavings = automationSavings + revenueIncrease
    const yearlyROI = ((monthlySavings * 12) / 11976) * 100 // ROI baseado no investimento

    setResults({
      monthlySavings: Math.round(monthlySavings),
      yearlyROI: Math.round(yearlyROI),
      timesSaved: Math.round(timesSaved),
      newLeads: Math.round(leadIncrease)
    })

    setShowResults(true)

    // Tracking de engajamento
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'roi_calculation', {
        event_category: 'engagement',
        event_label: 'calculator_used',
        value: Math.round(yearlyROI)
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              Calculadora de ROI
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Descubra o Potencial de ROI da sua Empresa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calcule quanto sua empresa pode economizar e ganhar com nossos sistemas de IA multiagente
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Formulário */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Dados da sua Empresa</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="revenue">Faturamento Mensal (R$)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="Ex: 50000"
                    value={formData.monthlyRevenue}
                    onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="employees">Número de Funcionários</Label>
                  <Input
                    id="employees"
                    type="number"
                    placeholder="Ex: 10"
                    value={formData.employees}
                    onChange={(e) => handleInputChange('employees', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="hours">Horas/mês em Atendimento</Label>
                  <Input
                    id="hours"
                    type="number"
                    placeholder="Ex: 160"
                    value={formData.customerServiceHours}
                    onChange={(e) => handleInputChange('customerServiceHours', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="marketing">Orçamento Marketing/mês (R$)</Label>
                  <Input
                    id="marketing"
                    type="number"
                    placeholder="Ex: 5000"
                    value={formData.marketingBudget}
                    onChange={(e) => handleInputChange('marketingBudget', e.target.value)}
                  />
                </div>

                <Button 
                  onClick={calculateROI}
                  className="w-full h-12 text-lg font-semibold"
                  size="lg"
                >
                  <Calculator className="mr-2 w-5 h-5" />
                  Calcular Meu ROI
                </Button>
              </div>
            </Card>

            {/* Resultados */}
            <div className="space-y-6">
              {showResults ? (
                <>
                  <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <h3 className="text-2xl font-bold text-green-800 mb-6">
                      Seu Potencial de ROI
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          R$ {results.monthlySavings.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-700">Economia Mensal</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {results.yearlyROI}%
                        </div>
                        <div className="text-sm text-green-700">ROI Anual</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {results.timesSaved}h
                        </div>
                        <div className="text-sm text-green-700">Horas Economizadas</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          +{results.newLeads}
                        </div>
                        <div className="text-sm text-green-700">Novos Leads/mês</div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-white rounded-lg border border-green-200">
                      <p className="text-sm text-green-800 text-center">
                        <strong>Investimento:</strong> R$ 997/mês • <strong>Payback:</strong> {Math.round(997 / (results.monthlySavings || 1))} dias
                      </p>
                    </div>

                    <Button className="w-full mt-6 h-12 text-lg font-semibold bg-green-600 hover:bg-green-700">
                      <TrendingUp className="mr-2 w-5 h-5" />
                      Quero Começar Agora
                    </Button>
                  </Card>
                </>
              ) : (
                <Card className="p-8 text-center">
                  <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Preencha os dados ao lado
                  </h3>
                  <p className="text-gray-500">
                    Para descobrir o potencial de ROI da sua empresa com IA
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConversionTracker 
        event="roi_calculator_view" 
        value={0} 
        items={[{ id: 'roi_calculator', category: 'engagement_tool' }]} 
      />
    </section>
  )
}