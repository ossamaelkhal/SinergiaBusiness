'use client'

import { Brain, Zap, Target, Shield, BarChart3, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Brain,
    title: 'IA Multiagente Avançada',
    description: 'Sistemas especializados que trabalham em conjunto para otimizar cada área do seu negócio.',
    benefits: ['Automação inteligente', 'Aprendizado contínuo', 'Decisões baseadas em dados'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Target,
    title: 'Qualifica - Otimização de Leads',
    description: 'Sistema especializado em qualificação e nutrição de leads com precisão cirúrgica.',
    benefits: ['3x mais conversões', 'Qualificação automática', 'Nutrição personalizada'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Users,
    title: 'Atende - Experiência do Cliente',
    description: 'Atendimento 24/7 com IA que entende contexto e resolve problemas complexos.',
    benefits: ['Atendimento 24/7', '95% satisfação', 'Resolução inteligente'],
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Zap,
    title: 'Opera - Excelência Operacional',
    description: 'Automação completa de processos operacionais com monitoramento em tempo real.',
    benefits: ['80% menos trabalho manual', 'Processos otimizados', 'Monitoramento contínuo'],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: BarChart3,
    title: 'Analytics Preditivo',
    description: 'Dashboards inteligentes que antecipam tendências e oportunidades de negócio.',
    benefits: ['Previsões precisas', 'Insights acionáveis', 'ROI mensurável'],
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Shield,
    title: 'Segurança Enterprise',
    description: 'Proteção de dados de nível empresarial com compliance total.',
    benefits: ['LGPD compliant', 'Criptografia avançada', 'Auditoria completa'],
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Tecnologia de Ponta
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              3 Sistemas Especializados, Resultados Extraordinários
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma combina três sistemas de IA especializados que trabalham em sinergia 
              para transformar completamente sua operação
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                        <div className={`w-2 h-2 ${feature.color.replace('text-', 'bg-')} rounded-full mr-3`} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>

          {/* CTA Bottom */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pronto para Transformar sua Empresa?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Agende uma demonstração personalizada e veja como nossos sistemas podem 
                gerar ROI imediato para seu negócio
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Agendar Demonstração
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Ver Casos de Sucesso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}