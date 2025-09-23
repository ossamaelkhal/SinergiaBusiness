import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import ROICalculator from './components/ROICalculator.jsx'
import FlowSimulator from './components/FlowSimulator.jsx'
import SolutionArchitect from './components/SolutionArchitect.jsx'
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Clock, 
  Star, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  BarChart3, 
  Settings, 
  Lightbulb, 
  Trophy, 
  Timer, 
  DollarSign, 
  MessageSquare, 
  UserCheck,
  Sparkles, 
  ChevronRight, 
  Menu, 
  X, 
  Calculator, 
  Cpu, 
  ShoppingCart,
  Briefcase, 
  Database, 
  Plug, 
  Workflow,
  Building2,
  Stethoscope,
  FileText,
  GraduationCap,
  Home,
  Scissors,
  Utensils,
  Activity,
  Wifi,
  Shield,
  Rocket,
  Globe
} from 'lucide-react'
import sinergiaLogo from './assets/sinergia-logo.png'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Estados dos modais funcionais
  const [showROICalculator, setShowROICalculator] = useState(false)
  const [showFlowSimulator, setShowFlowSimulator] = useState(false)
  const [showSolutionArchitect, setShowSolutionArchitect] = useState(false)
  
  const [currentMetrics, setCurrentMetrics] = useState({
    hoursRescued: 2847,
    leadsQualified: 15420,
    avgROI: 340,
    businessesActive: 1247
  })

  // Scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animated metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics(prev => ({
        hoursRescued: prev.hoursRescued + Math.floor(Math.random() * 3),
        leadsQualified: prev.leadsQualified + Math.floor(Math.random() * 5),
        avgROI: prev.avgROI + (Math.random() > 0.5 ? 1 : 0),
        businessesActive: prev.businessesActive + Math.floor(Math.random() * 2)
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const aiSystems = [
    {
      id: 'qualifica',
      name: 'SinergIA Qualifica',
      subtitle: 'Otimização de Leads Premium',
      description: 'Identifica, qualifica e prioriza leads de alto valor com precisão cirúrgica, garantindo que sua equipe de vendas foque nas oportunidades mais lucrativas.',
      roi: '+280%',
      timeSaved: '12h/semana',
      icon: Target,
      color: 'from-blue-500 to-cyan-400',
      features: [
        'Scoring preditivo avançado',
        'Segmentação estratégica de mercado',
        'Automação de follow-up personalizada'
      ]
    },
    {
      id: 'atende',
      name: 'SinergIA Atende',
      subtitle: 'Experiência do Cliente Elevada',
      description: 'Atendimento 24/7 com IA que compreende nuances, resolve complexidades e encanta clientes, liberando sua equipe para interações de alto valor.',
      roi: '+320%',
      timeSaved: '25h/semana',
      icon: MessageSquare,
      color: 'from-cyan-500 to-teal-400',
      features: [
        'Respostas contextuais inteligentes',
        'Escalação proativa para humanos',
        'Satisfação do cliente acima de 95%'
      ]
    },
    {
      id: 'opera',
      name: 'SinergIA Opera',
      subtitle: 'Excelência Operacional Automatizada',
      description: 'Orquestra processos internos, elimina gargalos e otimiza fluxos de trabalho, transformando a eficiência operacional em vantagem competitiva.',
      roi: '+450%',
      timeSaved: '30h/semana',
      icon: Settings,
      color: 'from-teal-500 to-green-400',
      features: [
        'Fluxos de trabalho inteligentes',
        'Alertas preditivos e proativos',
        'Dashboards executivos em tempo real'
      ]
    }
  ]

  const niches = [
    {
      id: 'clinics',
      name: 'Clínicas & Consultórios',
      description: 'Sistemas especializados para área da saúde',
      roi: '320%',
      timeSaved: '18h/semana',
      icon: Stethoscope,
      testimonial: 'Dr. Carlos: +240% agendamentos',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'accounting',
      name: 'Escritórios Contábeis',
      description: 'Automação para serviços contábeis e fiscais',
      roi: '380%',
      timeSaved: '25h/semana',
      icon: FileText,
      testimonial: 'Silva & Associados: 380% ROI',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce & Varejo',
      description: 'Sistemas para vendas online e físicas',
      roi: '280%',
      timeSaved: '22h/semana',
      icon: ShoppingCart,
      testimonial: 'TechStore: +190% vendas',
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 'services',
      name: 'Serviços Profissionais',
      description: 'Soluções para consultores e prestadores',
      roi: '250%',
      timeSaved: '20h/semana',
      icon: Briefcase,
      testimonial: 'Consultoria ABC: +150% clientes',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'restaurants',
      name: 'Restaurantes & Food Service',
      description: 'Automação para o setor alimentício',
      roi: '290%',
      timeSaved: '15h/semana',
      icon: Utensils,
      testimonial: 'Bistrô Gourmet: +130% pedidos',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 'education',
      name: 'Educação & Cursos',
      description: 'Sistemas para instituições de ensino',
      roi: '310%',
      timeSaved: '16h/semana',
      icon: GraduationCap,
      testimonial: 'Escola Futuro: +290% matrículas',
      color: 'from-yellow-500 to-green-500'
    },
    {
      id: 'realestate',
      name: 'Imobiliárias',
      description: 'Soluções para o mercado imobiliário',
      roi: '340%',
      timeSaved: '24h/semana',
      icon: Home,
      testimonial: 'Imóveis Prime: +220% vendas',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'beauty',
      name: 'Beleza & Estética',
      description: 'Automação para salões e clínicas estéticas',
      roi: '270%',
      timeSaved: '14h/semana',
      icon: Scissors,
      testimonial: 'Estética Bella: +160% clientes',
      color: 'from-teal-500 to-cyan-500'
    }
  ]

  const interactiveTools = [
    {
      id: 'roi-calculator',
      name: 'Calculadora de ROI',
      description: 'Calcule o retorno personalizado para seu negócio',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'flow-simulator',
      name: 'Simulador de Fluxos',
      description: 'Visualize a automação dos seus processos',
      icon: Workflow,
      color: 'from-cyan-500 to-teal-400'
    },
    {
      id: 'solution-architect',
      name: 'Arquiteto de Soluções',
      description: 'Projete sua solução de IA personalizada',
      icon: Cpu,
      color: 'from-teal-500 to-green-400'
    }
  ]

  const integrations = [
    { name: 'HubSpot CRM', status: 'connected', icon: '🔗' },
    { name: 'Google Analytics', status: 'connected', icon: '📊' },
    { name: 'Zapier', status: 'connected', icon: '⚡' },
    { name: 'WhatsApp Business', status: 'connected', icon: '💬' },
    { name: 'Shopify', status: 'available', icon: '🛒' },
    { name: 'Salesforce', status: 'available', icon: '☁️' }
  ]

  return (
    <div className="min-h-screen animated-bg">
      {/* Navigation */}
      <nav className={`nav-premium ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="logo-premium">
              <div className="logo-icon">
                <img src={sinergiaLogo} alt="SinergIA" className="w-8 h-8" />
              </div>
              <span>SinergIA</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#sistemas" className="nav-link">Sistemas de IA</a>
              <a href="#nichos" className="nav-link">Nichos</a>
              <a href="#ferramentas" className="nav-link">Ferramentas</a>
              <a href="#integracoes" className="nav-link">Integrações</a>
              <a href="#comunidade" className="nav-link">Comunidade</a>
              <a href="#embaixadores" className="nav-link">Embaixadores</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Entrar
              </Button>
              <button className="btn-premium">
                <Rocket className="w-4 h-4 mr-2" />
                Começar Sinergia
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#sistemas" className="block nav-link">Sistemas de IA</a>
              <a href="#nichos" className="block nav-link">Nichos</a>
              <a href="#ferramentas" className="block nav-link">Ferramentas</a>
              <a href="#integracoes" className="block nav-link">Integrações</a>
              <a href="#comunidade" className="block nav-link">Comunidade</a>
              <a href="#embaixadores" className="block nav-link">Embaixadores</a>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Entrar
                </Button>
                <button className="btn-premium w-full">
                  <Rocket className="w-4 h-4 mr-2" />
                  Começar Sinergia
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-premium pt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 text-cyan-300 border-cyan-400/30">
                <Sparkles className="w-4 h-4 mr-2" />
                SinergIA: Inovação em IA para o Seu Negócio
              </Badge>
              
              <h1 className="hero-title">
                Sinergia: Onde a Inovação Encontra a Eficiência
              </h1>
              
              <p className="hero-subtitle">
                Sistemas Operacionais de IA que otimizam processos, transformando desafios em 
                <span className="text-gradient font-semibold"> crescimento exponencial</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button className="btn-premium glow-effect">
                  <Brain className="w-5 h-5 mr-2" />
                  Descobrir Sinergia
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Ver Demo Interativo
                </Button>
              </div>
            </div>

            {/* Real-time Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="metric-card">
                <div className="metric-value">{currentMetrics.hoursRescued.toLocaleString()}</div>
                <div className="metric-label">Horas Resgatadas Hoje</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{currentMetrics.leadsQualified.toLocaleString()}</div>
                <div className="metric-label">Leads Qualificados</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{currentMetrics.avgROI}%</div>
                <div className="metric-label">ROI Médio dos Clientes</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{currentMetrics.businessesActive.toLocaleString()}</div>
                <div className="metric-label">PMEs Libertadas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Systems Section */}
      <section id="sistemas" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Sistemas de IA <span className="text-gradient">Especializados</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Cada sistema é projetado para dominar uma área específica do seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiSystems.map((system, index) => {
              const Icon = system.icon
              return (
                <div 
                  key={system.id} 
                  className="card-premium animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${system.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <Badge className="mb-4 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 text-cyan-300 border-cyan-400/30">
                    Vendas & Crescimento
                  </Badge>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{system.name}</h3>
                  <p className="text-cyan-300 font-semibold mb-4">{system.subtitle}</p>
                  <p className="text-white/70 mb-6 leading-relaxed">{system.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gradient">{system.roi}</div>
                      <div className="text-sm text-white/60">ROI Médio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gradient">{system.timeSaved}</div>
                      <div className="text-sm text-white/60">Tempo Economizado</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {system.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-white/80">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn-premium w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Explorar Sistema
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Niches Section */}
      <section id="nichos" className="py-20 bg-gradient-to-b from-transparent to-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Soluções por <span className="text-gradient">Nicho de Mercado</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Sistemas especializados para cada setor, com resultados comprovados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {niches.map((niche, index) => {
              const Icon = niche.icon
              return (
                <div 
                  key={niche.id} 
                  className="card-premium group cursor-pointer animate-fade-in-up"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${niche.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{niche.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{niche.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-gradient">{niche.roi}</div>
                      <div className="text-xs text-white/50">ROI</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gradient">{niche.timeSaved}</div>
                      <div className="text-xs text-white/50">Economizadas</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-cyan-300 mb-4">{niche.testimonial}</div>
                  
                  <button className="btn-premium w-full text-sm py-2">
                    Ver Soluções
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section id="ferramentas" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ferramentas <span className="text-gradient">Interativas</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Experimente o poder da IA antes mesmo de implementar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {interactiveTools.map((tool, index) => {
              const Icon = tool.icon
              const handleClick = () => {
                if (tool.id === 'roi-calculator') setShowROICalculator(true)
                else if (tool.id === 'flow-simulator') setShowFlowSimulator(true)
                else if (tool.id === 'solution-architect') setShowSolutionArchitect(true)
              }
              
              return (
                <div 
                  key={tool.id} 
                  className="card-premium group cursor-pointer animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                  onClick={handleClick}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{tool.name}</h3>
                  <p className="text-white/70 mb-6">{tool.description}</p>
                  
                  <button className="btn-premium w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Experimentar Agora
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integracoes" className="py-20 bg-gradient-to-b from-black/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Integrações <span className="text-gradient">Empresariais</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Conecte-se com mais de 5000 aplicações e sistemas
            </p>
          </div>

          {/* Real-time Status */}
          <div className="glass-card max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Wifi className="w-6 h-6 text-green-400" />
                <span className="text-white font-semibold">Status em Tempo Real</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Ativo
                </Badge>
              </div>
              <div className="text-sm text-white/60">
                Última atualização: {new Date().toLocaleTimeString('pt-BR')}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{integration.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{integration.name}</div>
                      <div className="text-white/50 text-xs">
                        {integration.status === 'connected' ? 'Conectado' : 'Disponível'}
                      </div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    integration.status === 'connected' ? 'bg-green-400' : 'bg-gray-400'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button className="btn-premium">
              <Plug className="w-4 h-4 mr-2" />
              Ver Todas as Integrações
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Pronto para <span className="text-gradient">Transformar</span> seu Negócio?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Junte-se a mais de 1.200 empresas que já descobriram o poder da automação inteligente
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-premium glow-effect animate-pulse-glow">
                <Rocket className="w-5 h-5 mr-2" />
                Começar Sinergia Agora
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar com Especialista
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-white/60">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-sm">Segurança Garantida</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-sm">ROI Comprovado</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                <span className="text-sm">Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="logo-premium mb-4">
                <div className="logo-icon">
                  <img src={sinergiaLogo} alt="SinergIA" className="w-8 h-8" />
                </div>
                <span>SinergIA</span>
              </div>
              <p className="text-white/60 text-sm">
                Transformando negócios através da automação inteligente
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">SinergIA Qualifica</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SinergIA Atende</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SinergIA Opera</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2025 SinergIA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modais Funcionais */}
      <ROICalculator 
        isOpen={showROICalculator} 
        onClose={() => setShowROICalculator(false)} 
      />
      <FlowSimulator 
        isOpen={showFlowSimulator} 
        onClose={() => setShowFlowSimulator(false)} 
      />
      <SolutionArchitect 
        isOpen={showSolutionArchitect} 
        onClose={() => setShowSolutionArchitect(false)} 
      />
    </div>
  )
}

export default App
