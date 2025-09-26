'use client'

import { useState } from 'react'
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'

const plans = [
  {
    name: 'Starter',
    description: 'Ideal para pequenas empresas começando com IA',
    monthlyPrice: 497,
    yearlyPrice: 4970,
    savings: '2 meses grátis',
    icon: Zap,
    color: 'border-gray-200',
    buttonColor: 'bg-gray-900 hover:bg-gray-800',
    popular: false,
    features: [
      'Sistema Qualifica básico',
      'Até 1.000 leads/mês',
      'Automação de e-mail',
      'Dashboard básico',
      'Suporte por chat',
      'Integração com 50+ apps',
      'Relatórios mensais'
    ],
    limits: {
      leads: '1.000',
      automations: '10',
      integrations: '50+'
    }
  },
  {
    name: 'Professional',
    description: 'Para empresas que querem resultados acelerados',
    monthlyPrice: 997,
    yearlyPrice: 9970,
    savings: '2 meses grátis',
    icon: Star,
    color: 'border-primary ring-2 ring-primary/20',
    buttonColor: 'bg-primary hover:bg-primary/90',
    popular: true,
    features: [
      'Sistemas Qualifica + Atende',
      'Até 5.000 leads/mês',
      'IA multiagente avançada',
      'Atendimento 24/7',
      'Dashboard avançado',
      'Suporte prioritário',
      'Integração com 500+ apps',
      'Relatórios em tempo real',
      'Análise preditiva',
      'Treinamento personalizado'
    ],
    limits: {
      leads: '5.000',
      automations: 'Ilimitadas',
      integrations: '500+'
    }
  },
  {
    name: 'Enterprise',
    description: 'Solução completa para grandes operações',
    monthlyPrice: 1997,
    yearlyPrice: 19970,
    savings: '2 meses grátis',
    icon: Crown,
    color: 'border-purple-200',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    popular: false,
    features: [
      'Todos os recursos da Professional',
      'Até 20.000 leads/mês',
      'IA multiagente especializada',
      'Atendimento dedicado',
      'Dashboard personalizado',
      'Suporte 24/7',
      'Integração com 1.000+ apps',
      'Relatórios avançados',
      'Análise preditiva avançada',
      'Treinamento exclusivo',
      'Consultoria estratégica',
      'Implementação personalizada'
    ],
    limits: {
      leads: '20.000',
      automations: 'Ilimitadas',
      integrations: '1.000+'
    }
  }
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escolha seu plano
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comece gratuitamente e atualize quando precisar. Sem contratos, sem surpresas.
          </p>
          
          <div className="mt-8 flex items-center justify-center space-x-4">
            <span className={`font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Mensal
            </span>
            <Switch 
              checked={isYearly} 
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Anual
            </span>
            <Badge variant="secondary" className="ml-2">
              Economize até 25%
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card 
                key={plan.name} 
                className={`relative p-8 ${plan.popular ? 'ring-2 ring-primary' : ''} ${plan.color}`}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    Mais Popular
                  </Badge>
                )}
                
                <div className="flex items-center mb-6">
                  <Icon className="w-8 h-8 text-primary mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600 ml-2">/mês</span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-green-600 mt-1">
                      {plan.savings}
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.buttonColor} text-white`}
                  size="lg"
                >
                  Começar agora
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Limites:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Leads/mês:</span>
                      <span className="font-medium">{plan.limits.leads}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Automações:</span>
                      <span className="font-medium">{plan.limits.automations}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Integrações:</span>
                      <span className="font-medium">{plan.limits.integrations}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
