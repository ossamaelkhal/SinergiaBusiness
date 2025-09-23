import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  X, 
  ArrowRight, 
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
  Rocket,
  Calendar,
  FileText,
  Phone,
  Mail,
  Database,
  Bot,
  Cpu,
  Star,
  Award,
  PlayCircle
} from 'lucide-react'

const nicheData = {
  clinic: {
    title: "Clínicas & Consultórios",
    icon: "🏥",
    description: "Soluções especializadas para área da saúde e bem-estar",
    problems: [
      "Agendamentos manuais consomem 8h/dia da recepção",
      "Prontuários em papel geram perda de informações",
      "Follow-up de pacientes é inconsistente",
      "Relatórios médicos demoram horas para serem gerados",
      "Cobrança de convênios é complexa e demorada"
    ],
    solutions: [
      {
        id: 'smart_scheduling',
        name: 'Sistema de Agendamento Inteligente',
        description: 'IA que gerencia agenda, confirma consultas e otimiza horários automaticamente',
        features: [
          'Agendamento 24/7 via WhatsApp e site',
          'Confirmação automática de consultas',
          'Reagendamento inteligente em caso de cancelamento',
          'Integração com calendário do médico',
          'Lembretes automáticos para pacientes'
        ],
        roi: 340,
        timeSaved: 8,
        price: 1500,
        payback: 2,
        icon: Calendar,
        caseStudy: {
          client: "Dr. Carlos Mendes - Clínica Vida Saudável",
          results: [
            "240% aumento em agendamentos",
            "15 horas/semana economizadas",
            "95% redução em no-shows",
            "ROI de 340% em 60 dias"
          ]
        }
      },
      {
        id: 'digital_records',
        name: 'Prontuário Digital Inteligente',
        description: 'Sistema que digitaliza e organiza prontuários com IA para análise médica',
        features: [
          'Digitalização automática de documentos',
          'Reconhecimento de texto em exames',
          'Histórico completo do paciente',
          'Alertas de medicações e alergias',
          'Relatórios médicos automáticos'
        ],
        roi: 280,
        timeSaved: 6,
        price: 2000,
        payback: 3,
        icon: FileText,
        caseStudy: {
          client: "Clínica São Lucas",
          results: [
            "80% redução no tempo de consulta",
            "100% dos prontuários digitalizados",
            "50% menos erros médicos",
            "ROI de 280% em 90 dias"
          ]
        }
      },
      {
        id: 'patient_followup',
        name: 'Sistema de Follow-up Automatizado',
        description: 'IA que monitora pacientes e envia lembretes personalizados',
        features: [
          'Acompanhamento pós-consulta automático',
          'Lembretes de medicação personalizados',
          'Pesquisas de satisfação automáticas',
          'Alertas para retornos necessários',
          'Relatórios de aderência ao tratamento'
        ],
        roi: 420,
        timeSaved: 4,
        price: 1200,
        payback: 1,
        icon: Users,
        caseStudy: {
          client: "Dr. Ana Paula - Cardiologia",
          results: [
            "85% melhora na aderência ao tratamento",
            "60% aumento em retornos",
            "4 horas/semana economizadas",
            "ROI de 420% em 30 dias"
          ]
        }
      }
    ],
    totalROI: 347,
    totalTimeSaved: 18,
    totalInvestment: 4700,
    paybackPeriod: 2
  },
  accounting: {
    title: "Escritórios Contábeis",
    icon: "📊",
    description: "Automação para serviços contábeis e fiscais",
    problems: [
      "Coleta de documentos dos clientes é manual e demorada",
      "Classificação fiscal consome 12h/dia do contador",
      "Relatórios são gerados manualmente",
      "Comunicação com clientes é reativa",
      "Prazos fiscais geram stress constante"
    ],
    solutions: [
      {
        id: 'document_automation',
        name: 'Sistema de Coleta Automática',
        description: 'IA que coleta, organiza e classifica documentos fiscais automaticamente',
        features: [
          'Coleta automática via email e WhatsApp',
          'Classificação fiscal inteligente',
          'Validação automática de documentos',
          'Organização por cliente e período',
          'Alertas de documentos pendentes'
        ],
        roi: 380,
        timeSaved: 12,
        price: 2500,
        payback: 2,
        icon: Database,
        caseStudy: {
          client: "Silva & Associados Contabilidade",
          results: [
            "90% redução no tempo de coleta",
            "12 horas/dia economizadas",
            "100% dos documentos organizados",
            "ROI de 380% em 60 dias"
          ]
        }
      },
      {
        id: 'smart_reports',
        name: 'Relatórios Inteligentes',
        description: 'Sistema que gera relatórios contábeis e fiscais automaticamente',
        features: [
          'Geração automática de DRE e Balanço',
          'Relatórios personalizados por cliente',
          'Análise de indicadores financeiros',
          'Alertas de irregularidades',
          'Envio automático para clientes'
        ],
        roi: 450,
        timeSaved: 8,
        price: 3000,
        payback: 2,
        icon: BarChart3,
        caseStudy: {
          client: "Contábil Excelência",
          results: [
            "75% redução no tempo de relatórios",
            "8 horas/dia economizadas",
            "50% aumento na satisfação do cliente",
            "ROI de 450% em 45 dias"
          ]
        }
      },
      {
        id: 'client_communication',
        name: 'Comunicação Proativa com Clientes',
        description: 'IA que mantém clientes informados sobre obrigações e prazos',
        features: [
          'Lembretes automáticos de prazos',
          'Relatórios mensais personalizados',
          'Alertas de oportunidades fiscais',
          'Chat bot para dúvidas frequentes',
          'Portal do cliente automatizado'
        ],
        roi: 320,
        timeSaved: 6,
        price: 1800,
        payback: 2,
        icon: MessageSquare,
        caseStudy: {
          client: "Contabilidade Moderna",
          results: [
            "95% redução em ligações de dúvidas",
            "6 horas/semana economizadas",
            "40% aumento na retenção de clientes",
            "ROI de 320% em 75 dias"
          ]
        }
      }
    ],
    totalROI: 383,
    totalTimeSaved: 26,
    totalInvestment: 7300,
    paybackPeriod: 2
  },
  ecommerce: {
    title: "E-commerce & Varejo",
    icon: "🛒",
    description: "Sistemas para vendas online e físicas",
    problems: [
      "Atendimento pós-venda consome toda a equipe",
      "Gestão de estoque é manual e imprecisa",
      "Campanhas de marketing são genéricas",
      "Análise de vendas é superficial",
      "Recuperação de carrinho abandonado é inexistente"
    ],
    solutions: [
      {
        id: 'post_sale_automation',
        name: 'Atendimento Pós-Venda Automatizado',
        description: 'IA que gerencia todo o pós-venda, desde entrega até satisfação',
        features: [
          'Acompanhamento automático de pedidos',
          'Resolução inteligente de problemas',
          'Pesquisas de satisfação automáticas',
          'Gestão de trocas e devoluções',
          'Upsell e cross-sell inteligente'
        ],
        roi: 290,
        timeSaved: 15,
        price: 2200,
        payback: 3,
        icon: Users,
        caseStudy: {
          client: "TechStore E-commerce",
          results: [
            "190% aumento nas vendas",
            "15 horas/semana economizadas",
            "85% redução em reclamações",
            "ROI de 290% em 90 dias"
          ]
        }
      },
      {
        id: 'smart_inventory',
        name: 'Gestão Inteligente de Estoque',
        description: 'IA que prevê demanda e otimiza estoque automaticamente',
        features: [
          'Previsão de demanda por IA',
          'Reposição automática de produtos',
          'Alertas de produtos em falta',
          'Análise de giro de estoque',
          'Otimização de compras'
        ],
        roi: 350,
        timeSaved: 10,
        price: 2800,
        payback: 2,
        icon: Database,
        caseStudy: {
          client: "Moda & Estilo Online",
          results: [
            "40% redução em produtos parados",
            "10 horas/semana economizadas",
            "25% aumento no giro de estoque",
            "ROI de 350% em 60 dias"
          ]
        }
      },
      {
        id: 'smart_marketing',
        name: 'Marketing Automatizado Inteligente',
        description: 'IA que cria e executa campanhas personalizadas automaticamente',
        features: [
          'Segmentação inteligente de clientes',
          'Campanhas personalizadas automáticas',
          'Recuperação de carrinho abandonado',
          'Email marketing comportamental',
          'Análise de performance em tempo real'
        ],
        roi: 420,
        timeSaved: 12,
        price: 3200,
        payback: 2,
        icon: Target,
        caseStudy: {
          client: "Casa & Decoração Shop",
          results: [
            "180% aumento na conversão",
            "12 horas/semana economizadas",
            "60% aumento no ticket médio",
            "ROI de 420% em 45 dias"
          ]
        }
      }
    ],
    totalROI: 353,
    totalTimeSaved: 37,
    totalInvestment: 8200,
    paybackPeriod: 2
  },
  services: {
    title: "Serviços Profissionais",
    icon: "💼",
    description: "Soluções para consultores e prestadores",
    problems: [
      "Captação de leads é inconsistente",
      "Gestão de projetos é caótica",
      "Cobrança é manual e demorada",
      "Propostas são genéricas",
      "Follow-up de clientes é esquecido"
    ],
    solutions: [
      {
        id: 'lead_generation',
        name: 'Sistema de Captação Inteligente',
        description: 'IA que identifica, qualifica e nutre leads automaticamente',
        features: [
          'Prospecção automática em redes sociais',
          'Qualificação inteligente de leads',
          'Sequências de nutrição personalizadas',
          'Agendamento automático de reuniões',
          'CRM integrado com IA'
        ],
        roi: 380,
        timeSaved: 20,
        price: 2800,
        payback: 2,
        icon: Target,
        caseStudy: {
          client: "Consultoria ABC",
          results: [
            "150% aumento em clientes",
            "20 horas/semana economizadas",
            "300% melhora na qualificação",
            "ROI de 380% em 60 dias"
          ]
        }
      },
      {
        id: 'project_management',
        name: 'Gestão Automatizada de Projetos',
        description: 'IA que planeja, monitora e executa projetos automaticamente',
        features: [
          'Planejamento automático de projetos',
          'Alocação inteligente de recursos',
          'Monitoramento de progresso em tempo real',
          'Alertas de desvios e riscos',
          'Relatórios automáticos para clientes'
        ],
        roi: 320,
        timeSaved: 15,
        price: 2500,
        payback: 3,
        icon: Settings,
        caseStudy: {
          client: "Projetos & Soluções",
          results: [
            "50% redução no tempo de projeto",
            "15 horas/semana economizadas",
            "90% dos projetos no prazo",
            "ROI de 320% em 90 dias"
          ]
        }
      },
      {
        id: 'automated_billing',
        name: 'Cobrança Automatizada',
        description: 'Sistema que gerencia todo o ciclo de cobrança automaticamente',
        features: [
          'Geração automática de propostas',
          'Contratos inteligentes',
          'Faturamento automático',
          'Cobrança recorrente',
          'Relatórios financeiros em tempo real'
        ],
        roi: 450,
        timeSaved: 8,
        price: 1800,
        payback: 1,
        icon: DollarSign,
        caseStudy: {
          client: "Consultoria Premium",
          results: [
            "80% redução no tempo de cobrança",
            "8 horas/semana economizadas",
            "95% redução em inadimplência",
            "ROI de 450% em 30 dias"
          ]
        }
      }
    ],
    totalROI: 383,
    totalTimeSaved: 43,
    totalInvestment: 7100,
    paybackPeriod: 2
  }
}

export default function NicheSolutionsModal({ niche, onClose }) {
  const [selectedSolution, setSelectedSolution] = useState(null)
  const [showCaseStudy, setShowCaseStudy] = useState(false)
  
  const data = nicheData[niche]
  if (!data) return null

  const renderSolutionDetail = (solution) => {
    const Icon = solution.icon
    
    return (
      <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">{solution.name}</CardTitle>
                <CardDescription className="text-white/70">
                  {solution.description}
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              ROI {solution.roi}%
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{solution.roi}%</div>
              <div className="text-sm text-white/60">ROI Esperado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{solution.timeSaved}h</div>
              <div className="text-sm text-white/60">Horas/Semana</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">R$ {solution.price.toLocaleString()}</div>
              <div className="text-sm text-white/60">Investimento</div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-white font-semibold mb-3">Funcionalidades Principais:</h4>
            <div className="space-y-2">
              {solution.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-white/80">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Caso de Sucesso Real
            </h4>
            <p className="text-white/80 text-sm mb-2">{solution.caseStudy.client}</p>
            <div className="grid grid-cols-2 gap-2">
              {solution.caseStudy.results.map((result, index) => (
                <div key={index} className="text-xs text-green-300">
                  ✓ {result}
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              onClick={() => setShowCaseStudy(solution)}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Ver Demo
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Proposta
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] bg-slate-900/95 border-white/20 overflow-hidden">
        <CardHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{data.icon}</div>
              <div>
                <CardTitle className="text-white text-2xl">{data.title}</CardTitle>
                <CardDescription className="text-white/70">
                  {data.description}
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Resumo Executivo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-green-500/20 border-green-500/30">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-green-400">{data.totalROI}%</div>
                <div className="text-xs text-white/70">ROI Médio</div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/20 border-blue-500/30">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-400">{data.totalTimeSaved}h</div>
                <div className="text-xs text-white/70">Horas/Semana</div>
              </CardContent>
            </Card>

            <Card className="bg-purple-500/20 border-purple-500/30">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-purple-400">R$ {data.totalInvestment.toLocaleString()}</div>
                <div className="text-xs text-white/70">Investimento</div>
              </CardContent>
            </Card>

            <Card className="bg-orange-500/20 border-orange-500/30">
              <CardContent className="p-4 text-center">
                <Shield className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-orange-400">{data.paybackPeriod}</div>
                <div className="text-xs text-white/70">Meses Payback</div>
              </CardContent>
            </Card>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Problemas Identificados */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Target className="w-6 h-6 mr-2 text-red-400" />
              Principais Dores Identificadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.problems.map((problem, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-white/80 text-sm">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Soluções */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Rocket className="w-6 h-6 mr-2 text-green-400" />
              Soluções Especializadas
            </h3>
            <div className="space-y-6">
              {data.solutions.map((solution, index) => (
                <div key={solution.id}>
                  {renderSolutionDetail(solution)}
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <div className="border-t border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="text-white/70 text-sm">
              💡 Todas as soluções incluem implementação assistida e suporte 24/7
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar Portfólio
              </Button>
              <Button
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Users className="w-4 h-4 mr-2" />
                Agendar Consultoria
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

