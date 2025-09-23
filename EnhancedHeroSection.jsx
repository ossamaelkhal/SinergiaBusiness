import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Sparkles, 
  Play, 
  ArrowRight, 
  Clock, 
  Target, 
  TrendingUp, 
  Users,
  Zap,
  Shield,
  Rocket
} from 'lucide-react'

const EnhancedHeroSection = () => {
  const [timeRescued, setTimeRescued] = useState(0)
  const [leadsGenerated, setLeadsGenerated] = useState(0)
  const [currentStat, setCurrentStat] = useState(0)

  // Animação dos contadores
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRescued(prev => prev < 2847 ? prev + 23 : 2847)
      setLeadsGenerated(prev => prev < 15420 ? prev + 127 : 15420)
    }, 100)
    return () => clearInterval(timer)
  }, [])

  // Rotação das estatísticas
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const battleStats = [
    { icon: Clock, label: "Horas Resgatadas Hoje", value: timeRescued, suffix: "h", color: "text-blue-400" },
    { icon: Target, label: "Leads Qualificados", value: leadsGenerated, suffix: "", color: "text-green-400" },
    { icon: TrendingUp, label: "ROI Médio dos Clientes", value: 340, suffix: "%", color: "text-purple-400" },
    { icon: Users, label: "PMEs Libertadas", value: 1247, suffix: "", color: "text-orange-400" }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background com gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Partículas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge de destaque */}
          <div className="mb-8 flex justify-center">
            <Badge className="bg-gradient-to-r from-orange-500/20 to-purple-600/20 border-orange-500/30 text-orange-300 px-6 py-2 text-sm font-medium animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              Revolução da IA para PMEs Brasileiras
            </Badge>
          </div>

          {/* Título principal com efeito gradiente */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-orange-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
              TROPA DA
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              VIRADA
            </span>
          </h1>

          {/* Subtítulo com animação */}
          <div className="mb-8 space-y-4">
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              Declaramos guerra ao <span className="text-red-400 font-bold animate-pulse">Ladrão de Tempo</span>
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Sistemas Operacionais de IA que libertam PMEs brasileiras das tarefas repetitivas, 
              transformando tempo perdido em <span className="text-green-400 font-semibold">crescimento exponencial</span>
            </p>
          </div>

          {/* Estatísticas em tempo real */}
          <div className="mb-12">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center animate-pulse">
                    {React.createElement(battleStats[currentStat].icon, { className: "w-6 h-6 text-white" })}
                  </div>
                <div className="text-left">
                  <div className={`text-2xl font-bold ${battleStats[currentStat].color}`}>
                    {battleStats[currentStat].value.toLocaleString()}{battleStats[currentStat].suffix}
                  </div>
                  <div className="text-sm text-white/70">{battleStats[currentStat].label}</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs principais */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Começar Batalha Agora
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Ver Demo Interativo
            </Button>
          </div>

          {/* Indicadores de confiança */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {battleStats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  {React.createElement(stat.icon, { className: `w-8 h-8 ${stat.color}` })}
                </div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {index < 2 ? (index === 0 ? timeRescued : leadsGenerated).toLocaleString() : stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnhancedHeroSection

