import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  X, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users,
  Target,
  MessageSquare,
  Settings,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

const AISystemModal = ({ system, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  if (!isOpen || !system) return null

  const systemDetails = {
    "Sistema de Qualificação Inteligente": {
      problem: "Você perde tempo qualificando leads manualmente e muitas oportunidades escapam",
      solution: "IA analisa comportamento, histórico e perfil para qualificar automaticamente",
      benefits: [
        "Identifica leads quentes em segundos",
        "Prioriza oportunidades de alto valor",
        "Reduz tempo de qualificação em 85%",
        "Aumenta taxa de conversão em 280%"
      ],
      process: [
        "Lead entra no sistema",
        "IA analisa dados e comportamento",
        "Score automático é atribuído",
        "Lead é direcionado para ação apropriada"
      ],
      realWorldExample: {
        company: "Clínica Vida Saudável",
        before: "15 horas/semana qualificando pacientes manualmente",
        after: "2 horas/semana com qualificação automática",
        result: "240% aumento em agendamentos qualificados"
      }
    },
    "Sistema de Atendimento Humanizado": {
      problem: "Clientes esperam respostas 24/7 mas você não pode estar sempre disponível",
      solution: "IA conversa naturalmente, entende contexto e resolve 95% das dúvidas",
      benefits: [
        "Atendimento 24/7 sem pausas",
        "Respostas contextuais e empáticas",
        "Escalação inteligente para humanos",
        "95%+ satisfação dos clientes"
      ],
      process: [
        "Cliente inicia conversa",
        "IA entende contexto e intenção",
        "Resposta personalizada é gerada",
        "Escalação para humano se necessário"
      ],
      realWorldExample: {
        company: "E-commerce TechStore",
        before: "Tempo de resposta: 4-8 horas",
        after: "Tempo de resposta: menos de 2 minutos",
        result: "190% aumento nas vendas"
      }
    },
    "Sistema de Gestão Operacional": {
      problem: "Processos internos desorganizados geram gargalos e retrabalho constante",
      solution: "IA orquestra fluxos, automatiza tarefas e otimiza recursos em tempo real",
      benefits: [
        "Fluxos automatizados end-to-end",
        "Alertas inteligentes preventivos",
        "Dashboards em tempo real",
        "Eliminação de gargalos operacionais"
      ],
      process: [
        "Processo é iniciado",
        "IA identifica próximos passos",
        "Tarefas são automatizadas",
        "Alertas são enviados se necessário"
      ],
      realWorldExample: {
        company: "Silva & Associados",
        before: "Relatórios manuais levavam 2 dias",
        after: "Relatórios automáticos em 30 minutos",
        result: "380% ROI em 60 dias"
      }
    }
  }

  const details = systemDetails[system.title] || {}

  const startDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentStep(current => {
            if (current >= details.process.length - 1) {
              setIsPlaying(false)
              clearInterval(interval)
              return current
            }
            return current + 1
          })
          return 0
        }
        return prev + 2
      })
    }, 50)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center">
              <system.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{system.title}</h2>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                {system.niche}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Problema e Solução */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-red-500/10 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  O Problema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">{details.problem}</p>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Nossa Solução
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">{details.solution}</p>
              </CardContent>
            </Card>
          </div>

          {/* Benefícios */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-400" />
              Benefícios Transformadores
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {details.benefits?.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demonstração do Processo */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Play className="w-5 h-5 mr-2 text-orange-400" />
                Como Funciona na Prática
              </h3>
              <div className="flex space-x-2">
                <Button 
                  onClick={startDemo} 
                  disabled={isPlaying}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Executando...' : 'Iniciar Demo'}
                </Button>
                <Button onClick={resetDemo} variant="outline" className="border-white/20 text-white">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {details.process?.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                    currentStep === index 
                      ? 'bg-orange-500/20 border border-orange-500/50 scale-105' 
                      : currentStep > index 
                        ? 'bg-green-500/10 border border-green-500/30' 
                        : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentStep === index 
                      ? 'bg-orange-500 text-white animate-pulse' 
                      : currentStep > index 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/20 text-white/60'
                  }`}>
                    {currentStep > index ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{step}</p>
                    {currentStep === index && (
                      <Progress value={progress} className="mt-2 h-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Caso Real */}
          {details.realWorldExample && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-orange-400" />
                Caso Real de Sucesso
              </h3>
              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400">{details.realWorldExample.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-red-400 font-bold text-lg">ANTES</div>
                      <p className="text-white/80 text-sm">{details.realWorldExample.before}</p>
                    </div>
                    <div className="text-center">
                      <ArrowRight className="w-8 h-8 text-orange-400 mx-auto" />
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-bold text-lg">DEPOIS</div>
                      <p className="text-white/80 text-sm">{details.realWorldExample.after}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">{details.realWorldExample.result}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Métricas */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-white/5 border-white/20 text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-400">{system.roi}</div>
                <div className="text-white/60">ROI Médio</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/20 text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-400">{system.timesSaved}</div>
                <div className="text-white/60">Tempo Economizado</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/20 text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-400">95%+</div>
                <div className="text-white/60">Taxa de Sucesso</div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-3 text-lg">
              Quero Implementar Este Sistema
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AISystemModal

