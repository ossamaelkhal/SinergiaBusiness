'use client'

import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    id: 1,
    name: 'Carlos Silva',
    position: 'CEO',
    company: 'TechSolutions Ltda',
    avatar: '/testimonials/carlos-silva.jpg',
    content: 'A SinergIA transformou completamente nossos processos. Em 30 dias, aumentamos nossa eficiência em 40% e reduzimos custos operacionais em R$ 15.000/mês.',
    results: {
      roi: '320%',
      savings: 'R$ 15.000',
      efficiency: '40%'
    },
    rating: 5,
    industry: 'Tecnologia',
    employees: '25-50'
  },
  {
    id: 2,
    name: 'Ana Rodrigues',
    position: 'Diretora Comercial',
    company: 'Vendas Pro',
    avatar: '/testimonials/ana-rodrigues.jpg',
    content: 'O sistema de IA multiagente da SinergIA nos ajudou a qualificar 3x mais leads e aumentar nossa taxa de conversão de 12% para 28%.',
    results: {
      roi: '280%',
      leads: '3x mais',
      conversion: '28%'
    },
    rating: 5,
    industry: 'Vendas',
    employees: '10-25'
  },
  {
    id: 3,
    name: 'Roberto Santos',
    position: 'Gerente de Operações',
    company: 'LogiMax',
    avatar: '/testimonials/roberto-santos.jpg',
    content: 'Automatizamos 80% dos nossos processos manuais. A economia de tempo nos permitiu focar em estratégia e crescimento.',
    results: {
      roi: '350%',
      automation: '80%',
      time: '120h/mês'
    },
    rating: 5,
    industry: 'Logística',
    employees: '50-100'
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Resultados Comprovados
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Empresas que Transformaram seus Resultados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como nossos clientes alcançaram ROI de até 350% em menos de 60 dias
            </p>
          </div>

          {/* Estatísticas Gerais */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Empresas Transformadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">320%</div>
              <div className="text-gray-600">ROI Médio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">30</div>
              <div className="text-gray-600">Dias para Resultados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
          </div>

          {/* Depoimento Principal */}
          <div className="relative">
            <Card className="p-8 md:p-12 bg-white shadow-xl">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                
                {/* Conteúdo do Depoimento */}
                <div className="lg:col-span-2">
                  <Quote className="w-12 h-12 text-primary/20 mb-6" />
                  
                  <blockquote className="text-xl text-gray-700 leading-relaxed mb-6">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Avaliação */}
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                    <span className="text-gray-600 ml-2">5.0/5.0</span>
                  </div>

                  {/* Autor */}
                  <div className="flex items-center gap-4">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-gray-600">
                        {currentTestimonial.position} • {currentTestimonial.company}
                      </div>
                      <div className="text-sm text-gray-500">
                        {currentTestimonial.industry} • {currentTestimonial.employees} funcionários
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resultados */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Resultados Alcançados:
                  </h4>
                  
                  {Object.entries(currentTestimonial.results).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700 capitalize">
                        {key === 'roi' && 'ROI'}
                        {key === 'savings' && 'Economia'}
                        {key === 'efficiency' && 'Eficiência'}
                        {key === 'leads' && 'Leads'}
                        {key === 'conversion' && 'Conversão'}
                        {key === 'automation' && 'Automação'}
                        {key === 'time' && 'Tempo Economizado'}
                      </span>
                      <span className="font-bold text-green-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Controles de Navegação */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <Button
                    key={index}
                    variant={index === currentIndex ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().min(2),
  employees: z.string(),
  interest: z.string(),
  source: z.string().optional(),
  campaign: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = leadSchema.parse(body)

    // Aqui você integraria com seu CRM (HubSpot, Pipedrive, etc.)
    // Por exemplo, usando a API do HubSpot:
    const hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          firstname: validatedData.name.split(' ')[0],
          lastname: validatedData.name.split(' ').slice(1).join(' '),
          email: validatedData.email,
          phone: validatedData.phone,
          company: validatedData.company,
          employees: validatedData.employees,
          interest_area: validatedData.interest,
          lead_source: validatedData.source,
          campaign: validatedData.campaign,
        }
      })
    })

    // Enviar email de notificação para o time de vendas
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'leads@sinergia.ai',
        to: ['vendas@sinergia.ai'],
        subject: `Novo Lead: ${validatedData.company}`,
        html: `
          <h2>Novo Lead Capturado</h2>
          <p><strong>Nome:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Telefone:</strong> ${validatedData.phone}</p>
          <p><strong>Empresa:</strong> ${validatedData.company}</p>
          <p><strong>Funcionários:</strong> ${validatedData.employees}</p>
          <p><strong>Interesse:</strong> ${validatedData.interest}</p>
          <p><strong>Fonte:</strong> ${validatedData.source}</p>
          <p><strong>Campanha:</strong> ${validatedData.campaign}</p>
        `
      })
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Lead capturado com sucesso!' 
    })

  } catch (error) {
    console.error('Erro ao processar lead:', error)
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
