'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const faqs = [
  {
    category: 'Geral',
    questions: [
      {
        question: 'O que é a SinergIA e como ela funciona?',
        answer: 'A SinergIA é uma plataforma de IA multiagente que combina três sistemas especializados: Qualifica (otimização de leads), Atende (experiência do cliente) e Opera (excelência operacional). Nossos sistemas trabalham em sinergia para automatizar e otimizar todos os aspectos do seu negócio, gerando ROI mensurável em até 30 dias.'
      },
      {
        question: 'Qual é o ROI médio que posso esperar?',
        answer: 'Nossos clientes alcançam em média 320% de ROI nos primeiros 90 dias. Isso inclui redução de custos operacionais, aumento na conversão de leads, melhoria na retenção de clientes e otimização de processos. O ROI específico varia conforme o tamanho e setor da empresa.'
      },
      {
        question: 'Quanto tempo leva para implementar a solução?',
        answer: 'A implementação completa leva entre 7 a 14 dias úteis, dependendo da complexidade da sua operação. Nosso processo inclui: análise inicial (1-2 dias), configuração dos sistemas (3-5 dias), integração com suas ferramentas (2-3 dias), treinamento da equipe (1-2 dias) e go-live com suporte dedicado.'
      }
    ]
  },
  {
    category: 'Técnico',
    questions: [
      {
        question: 'Como funciona a integração com meus sistemas atuais?',
        answer: 'Nossa plataforma se integra nativamente com mais de 5.000 aplicações através de APIs REST, webhooks e conectores pré-construídos. Suportamos CRMs (HubSpot, Salesforce, Pipedrive), ERPs (SAP, Oracle), e-commerce (Shopify, WooCommerce), marketing (RD Station, Mailchimp) e muito mais.'
      },
      {
        question: 'Os dados da minha empresa ficam seguros?',
        answer: 'Sim, seguimos os mais altos padrões de segurança: criptografia AES-256, compliance com LGPD/GDPR, certificação ISO 27001, backups automáticos, auditoria completa de acesso e infraestrutura em nuvem AWS com 99.9% de uptime garantido.'
      },
      {
        question: 'Posso personalizar os sistemas de IA?',
        answer: 'Absolutamente! Nossos sistemas são altamente configuráveis. Você pode personalizar fluxos de automação, regras de negócio, templates de comunicação, dashboards, relatórios e muito mais. Oferecemos também desenvolvimento de funcionalidades específicas para Enterprise.'
      }
    ]
  },
  {
    category: 'Comercial',
    questions: [
      {
        question: 'Existe período de teste gratuito?',
        answer: 'Sim! Oferecemos 14 dias de teste gratuito com acesso completo à plataforma. Durante o período, você terá suporte dedicado para configuração e uma análise personalizada dos resultados. Não é necessário cartão de crédito para começar.'
      },
      {
        question: 'Posso cancelar a qualquer momento?',
        answer: 'Sim, não temos fidelidade. Você pode cancelar sua assinatura a qualquer momento através do painel administrativo ou entrando em contato conosco. Seus dados ficam disponíveis por 90 dias após o cancelamento para eventual reativação.'
      },
      {
        question: 'Vocês oferecem suporte em português?',
        answer: 'Sim! Nosso suporte é 100% em português, com equipe especializada disponível via chat, e-mail e telefone. Planos Professional e Enterprise incluem suporte prioritário com SLA de resposta garantido.'
      }
    ]
  }
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('Geral')

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const categories = [...new Set(faqs.map(faq => faq.category))]
  const activeFAQs = faqs.find(faq => faq.category === activeCategory)?.questions || []

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              Perguntas Frequentes
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tire suas Dúvidas sobre a SinergIA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontre respostas para as perguntas mais comuns sobre nossa plataforma, 
              implementação e resultados
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {activeFAQs.map((faq, index) => {
              const itemId = `${activeCategory}-${index}`
              const isOpen = openItems.includes(itemId)
              
              return (
                <Card key={itemId} className="overflow-hidden">
                  <button
                    onClick={() => toggleItem(itemId)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-gray-600 mb-6">
                Nossa equipe está pronta para esclarecer qualquer questão e ajudar 
                você a escolher a melhor solução para seu negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Falar com Especialista
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Agendar Demonstração
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.flatMap(category => 
              category.questions.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            )
          })
        }}
      />
    </section>
  )
}