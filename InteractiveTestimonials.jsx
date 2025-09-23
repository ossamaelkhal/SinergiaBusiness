import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote,
  TrendingUp,
  Clock,
  Users,
  Play,
  Pause
} from 'lucide-react'

const InteractiveTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      name: "Dr. Carlos Mendes",
      role: "Clínica Vida Saudável",
      content: "Em 30 dias, economizamos 15 horas semanais e aumentamos nossa taxa de agendamentos em 240%. O Ladrão de Tempo não consegue mais nos alcançar!",
      avatar: "👨‍⚕️",
      metrics: "240% ↑ agendamentos",
      industry: "Saúde",
      timesSaved: "15h/semana",
      roi: "240%",
      beforeAfter: {
        before: "Agendamentos manuais, prontuários em papel, follow-up inconsistente",
        after: "Sistema automatizado, prontuários digitais, follow-up inteligente"
      }
    },
    {
      name: "Ana Paula Silva",
      role: "Escritório Contábil Silva & Associados",
      content: "Nossos clientes agora recebem relatórios automáticos e nossa equipe foca no que realmente importa. ROI de 380% em 60 dias!",
      avatar: "👩‍💼",
      metrics: "380% ROI",
      industry: "Contabilidade",
      timesSaved: "25h/semana",
      roi: "380%",
      beforeAfter: {
        before: "Relatórios manuais, coleta de documentos demorada, comunicação fragmentada",
        after: "Relatórios automáticos, coleta digital, comunicação centralizada"
      }
    },
    {
      name: "Roberto Costa",
      role: "E-commerce TechStore",
      content: "Automatizamos todo o atendimento pós-venda. Vendas aumentaram 190% e o tempo de resposta caiu para menos de 2 minutos.",
      avatar: "👨‍💻",
      metrics: "190% ↑ vendas",
      industry: "E-commerce",
      timesSaved: "30h/semana",
      roi: "190%",
      beforeAfter: {
        before: "Atendimento manual, respostas lentas, follow-up inconsistente",
        after: "Atendimento 24/7, respostas instantâneas, follow-up automatizado"
      }
    },
    {
      name: "Mariana Oliveira",
      role: "Consultoria Estratégica MO",
      content: "Conseguimos escalar nossos serviços sem contratar mais pessoas. A IA cuida da operação enquanto focamos na estratégia dos clientes.",
      avatar: "👩‍💼",
      metrics: "300% ↑ capacidade",
      industry: "Consultoria",
      timesSaved: "20h/semana",
      roi: "300%",
      beforeAfter: {
        before: "Processos manuais, capacidade limitada, sobrecarga da equipe",
        after: "Processos automatizados, capacidade escalável, foco estratégico"
      }
    }
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentTestimonial]

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-900/50 to-purple-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vitórias Contra o Ladrão de Tempo
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Histórias reais de PMEs que se libertaram das tarefas repetitivas e 
            transformaram suas operações com nossos Sistemas de IA
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/10 border-white/20 backdrop-blur-md overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Lado esquerdo - Depoimento */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-6">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {current.industry}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="text-white/60 hover:text-white"
                      >
                        {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Quote className="w-8 h-8 text-orange-400 mb-4" />
                  
                  <blockquote className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                    "{current.content}"
                  </blockquote>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-4xl">{current.avatar}</div>
                    <div>
                      <div className="font-semibold text-white">{current.name}</div>
                      <div className="text-white/70">{current.role}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{current.roi}</div>
                      <div className="text-sm text-white/60">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{current.timesSaved}</div>
                      <div className="text-sm text-white/60">Tempo Economizado</div>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-sm text-white/60">Satisfação</div>
                    </div>
                  </div>
                </div>

                {/* Lado direito - Antes e Depois */}
                <div className="bg-black/20 p-8 md:p-12">
                  <h3 className="text-xl font-bold text-white mb-6">Transformação</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Antes (Com o Ladrão de Tempo)
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {current.beforeAfter.before}
                      </p>
                    </div>

                    <div className="border-l-2 border-gradient-to-b from-orange-500 to-purple-600 pl-4">
                      <h4 className="text-green-400 font-semibold mb-2 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Depois (Libertado pela IA)
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {current.beforeAfter.after}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-gradient-to-r from-orange-500/20 to-purple-600/20 border border-orange-500/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400 mb-1">
                        {current.metrics}
                      </div>
                      <div className="text-sm text-white/70">Resultado Principal</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controles de navegação */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-orange-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Estatísticas gerais */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">280%</div>
              <div className="text-sm text-white/60">ROI Médio</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-1">22h</div>
              <div className="text-sm text-white/60">Tempo Economizado/Semana</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-1">1.247</div>
              <div className="text-sm text-white/60">PMEs Libertadas</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-yellow-400 mb-1">4.9</div>
              <div className="text-sm text-white/60">Satisfação Média</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveTestimonials

