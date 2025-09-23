import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import SolutionArchitect from './components/SolutionArchitect.jsx'
import ROICalculator from './components/ROICalculator.jsx'
import EnhancedROICalculator from './components/EnhancedROICalculator.jsx'
import DashboardDemo from './components/DashboardDemo.jsx'
import FlowSimulator from './components/FlowSimulator.jsx'
import EnhancedFlowSimulator from './components/EnhancedFlowSimulator.jsx'
import EnhancedSolutionArchitect from './components/EnhancedSolutionArchitect.jsx'
import NicheSolutionsModal from './components/NicheSolutionsModal.jsx'
import CommunityForum from './components/CommunityForum.jsx'
import AmbassadorProgram from './components/AmbassadorProgram.jsx'
import SalesTrainingSimulator from './components/SalesTrainingSimulator.jsx'
import SalesGamification from './components/SalesGamification.jsx'
import SalesManagementDashboard from './components/SalesManagementDashboard.jsx'
import EnhancedFooter from './components/EnhancedFooter.jsx'
import InteractiveTestimonials from './components/InteractiveTestimonials.jsx'
import EnhancedHeroSection from './components/EnhancedHeroSection.jsx'
import AISystemModal from './components/AISystemModal.jsx'
import { 
  Clock, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  Brain, 
  Rocket,
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
  Briefcase
} from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSolutionArchitect, setShowSolutionArchitect] = useState(false)
  const [showEnhancedSolutionArchitect, setShowEnhancedSolutionArchitect] = useState(false)
  const [showROICalculator, setShowROICalculator] = useState(false)
  const [showEnhancedROICalculator, setShowEnhancedROICalculator] = useState(false)
  const [showDashboardDemo, setShowDashboardDemo] = useState(false)
  const [showFlowSimulator, setShowFlowSimulator] = useState(false)
  const [showEnhancedFlowSimulator, setShowEnhancedFlowSimulator] = useState(false)
  const [showCommunityForum, setShowCommunityForum] = useState(false)
  const [showAmbassadorProgram, setShowAmbassadorProgram] = useState(false)
  const [showSalesTrainingSimulator, setShowSalesTrainingSimulator] = useState(false)
  const [showSalesGamification, setShowSalesGamification] = useState(false)
  const [showSalesManagementDashboard, setShowSalesManagementDashboard] = useState(false)
  const [showAISystemModal, setShowAISystemModal] = useState(false)
  const [showNicheSolutionsModal, setShowNicheSolutionsModal] = useState(false)
  const [selectedNiche, setSelectedNiche] = useState(null)
  const [selectedAISystem, setSelectedAISystem] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [timeRescued, setTimeRescued] = useState(0)
  const [leadsGenerated, setLeadsGenerated] = useState(0)
  // Animação dos contadores
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRescued(prev => prev < 2847 ? prev + 23 : 2847)
      setLeadsGenerated(prev => prev < 15420 ? prev + 127 : 15420)
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    {
      name: "Dr. Carlos Mendes",
      role: "Clínica Vida Saudável",
      content: "Em 30 dias, economizamos 15 horas semanais e aumentamos nossa taxa de agendamentos em 240%. O Ladrão de Tempo não consegue mais nos alcançar!",
      avatar: "👨‍⚕️",
      metrics: "240% ↑ agendamentos"
    },
    {
      name: "Ana Paula Silva",
      role: "Escritório Contábil Silva & Associados",
      content: "Nossos clientes agora recebem relatórios automáticos e nossa equipe foca no que realmente importa. ROI de 380% em 60 dias!",
      avatar: "👩‍💼",
      metrics: "380% ROI"
    },
    {
      name: "Roberto Costa",
      role: "E-commerce TechStore",
      content: "Automatizamos todo o atendimento pós-venda. Vendas aumentaram 190% e o tempo de resposta caiu para menos de 2 minutos.",
      avatar: "👨‍💻",
      metrics: "190% ↑ vendas"
    }
  ]

  const battleStats = [
    { icon: Clock, label: "Horas Resgatadas Hoje", value: timeRescued, suffix: "h" },
    { icon: Target, label: "Leads Qualificados", value: leadsGenerated, suffix: "" },
    { icon: TrendingUp, label: "ROI Médio dos Clientes", value: 340, suffix: "%" },
    { icon: Users, label: "PMEs Libertadas", value: 1247, suffix: "" }
  ]

  const aiSystems = [
    {
      title: "Sistema de Qualificação Inteligente",
      description: "Identifica e qualifica leads automaticamente, priorizando oportunidades de alto valor",
      icon: Target,
      niche: "Vendas & Marketing",
      roi: "280%",
      timesSaved: "12h/semana",
      features: ["Scoring automático", "Segmentação inteligente", "Follow-up personalizado"]
    },
    {
      title: "Sistema de Atendimento Humanizado",
      description: "Atendimento 24/7 com IA que entende contexto e emociona clientes",
      icon: MessageSquare,
      niche: "Atendimento",
      roi: "320%",
      timesSaved: "25h/semana",
      features: ["Respostas contextuais", "Escalação inteligente", "Satisfação 95%+"]
    },
    {
      title: "Sistema de Gestão Operacional",
      description: "Orquestra processos internos e elimina gargalos operacionais",
      icon: Settings,
      niche: "Operações",
      roi: "450%",
      timesSaved: "30h/semana",
      features: ["Fluxos automatizados", "Alertas inteligentes", "Dashboards em tempo real"]
    }
  ]

  const niches = [
    {
      title: "Clínicas & Consultórios",
      description: "Sistemas especializados para área da saúde",
      icon: "🏥",
      solutions: ["Agendamento inteligente", "Prontuário automatizado", "Follow-up de pacientes"],
      caseStudy: "Dr. Carlos: +240% agendamentos"
    },
    {
      title: "Escritórios Contábeis",
      description: "Automação para serviços contábeis e fiscais",
      icon: "📊",
      solutions: ["Coleta automática de documentos", "Relatórios inteligentes", "Comunicação com clientes"],
      caseStudy: "Silva & Associados: 380% ROI"
    },
    {
      title: "E-commerce & Varejo",
      description: "Sistemas para vendas online e físicas",
      icon: "🛒",
      solutions: ["Atendimento pós-venda", "Gestão de estoque", "Marketing automatizado"],
      caseStudy: "TechStore: +190% vendas"
    },
    {
      title: "Serviços Profissionais",
      description: "Soluções para consultores e prestadores",
      icon: "💼",
      solutions: ["Captação de leads", "Gestão de projetos", "Cobrança automatizada"],
      caseStudy: "Consultoria ABC: +150% clientes"
    }
  ]

  const gamificationLevels = [
    { level: "Iniciante", badge: "🥉", description: "Primeiros passos contra o Ladrão de Tempo", requirement: "1 sistema ativo" },
    { level: "Guerreiro", badge: "🥈", description: "Dominando a arte da automação", requirement: "3 sistemas + 50h economizadas" },
    { level: "Mestre", badge: "🥇", description: "Líder na batalha pela eficiência", requirement: "5 sistemas + 200h economizadas" },
    { level: "Lenda", badge: "💎", description: "Inspiração para toda a comunidade", requirement: "10 sistemas + 500h economizadas" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-wider">TROPA DA VIRADA</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#sistemas" className="text-white/80 hover:text-yellow-400 transition-all duration-300 relative group">
                Sistemas de IA
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#nichos" className="text-white/80 hover:text-yellow-400 transition-all duration-300 relative group">
                Nichos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#academia" className="text-white/80 hover:text-yellow-400 transition-all duration-300 relative group">
                Aura Academy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button 
                onClick={() => setShowCommunityForum(true)}
                className="text-white/80 hover:text-yellow-400 transition-all duration-300 relative group"
              >
                Comunidade
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => setShowAmbassadorProgram(true)}
                className="text-white/80 hover:text-yellow-400 transition-all duration-300 relative group"
              >
                Embaixadores
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="border-white/20 hover:bg-white/10 focus:text-white active:text-white">
                Entrar
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg">
                Começar Batalha
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <nav className="flex flex-col space-y-4 mt-4">
                <a href="#sistemas" className="text-white/80 hover:text-white transition-colors">Sistemas de IA</a>
                <a href="#nichos" className="text-white/80 hover:text-white transition-colors">Nichos</a>
                <a href="#academia" className="text-white/80 hover:text-white transition-colors">Aura Academy</a>
                <a href="#comunidade" className="text-white/80 hover:text-white transition-colors">Comunidade</a>
                <a href="#embaixadores" className="text-white/80 hover:text-white transition-colors">Embaixadores</a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="outline" className="border-white/20 hover:bg-white/10 focus:text-white active:text-white">
                    Entrar
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg">
                    Começar Batalha
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* Manifesto Section */}
      <section className="py-16 px-4 bg-black/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/path/to/your/background-pattern.svg" alt="Background Pattern" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center justify-center">
            <Shield className="w-10 h-10 text-orange-400 mr-3" />
            Nosso Manifesto: A Guerra Contra o Ladrão de Tempo
          </h2>
          <div className="max-w-4xl mx-auto">
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Todos os dias, o <strong className="text-red-400">Ladrão de Tempo</strong> se infiltra no seu negócio, 
                disfarçado de tarefas repetitivas, processos manuais e gargalos operacionais. 
                Ele rouba o recurso mais valioso que você tem: <strong className="text-orange-400">tempo para inovar, criar e expandir.</strong>
              </p>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                <strong className="text-orange-400">A Tropa da Virada é sua aliada nesta batalha.</strong> Nossa missão é 
                equipar seu negócio com Sistemas Operacionais de IA que transformam o caos em ordem, 
                libertando sua equipe para focar no que realmente impulsiona o crescimento.
              </p>
            <div className="bg-gradient-to-r from-orange-500/20 to-purple-600/20 border border-orange-500/30 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
              <p className="text-xl font-semibold text-white">
                "Não vendemos automação. Vendemos liberdade para o seu negócio prosperar."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Systems Section */}
      <section id="sistemas" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sistemas Operacionais de IA
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Não são apenas automações. São ecossistemas inteligentes que orquestram múltiplas funcionalidades, 
              aprendem com seus dados e evoluem constantemente para maximizar seus resultados.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiSystems.map((system, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 animate-pulse">
                      <system.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {system.niche}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{system.title}</CardTitle>
                  <CardDescription className="text-white/70">
                    {system.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="transform group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{system.roi}</div>
                      <div className="text-sm text-white/60">ROI Médio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{system.timesSaved}</div>
                      <div className="text-sm text-white/60">Tempo Economizado</div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {system.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-white/80">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg"
                    onClick={() => {
                      setSelectedAISystem(system)
                      setShowAISystemModal(true)
                    }}
                  >
                    Descobrir Sistema
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ferramentas Interativas
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-6">
              Experimente o poder da IA antes mesmo de contratar. Nossas ferramentas interativas 
              demonstram como podemos transformar seu negócio.
            </p>
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-green-400 font-semibold">
                ✅ Todas as ferramentas são 100% gratuitas
              </p>
              <p className="text-white/80 text-sm mt-1">
                Acesso imediato sem cadastro, sem cartão de crédito, sem compromisso
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                  onClick={() => setShowEnhancedSolutionArchitect(true)}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300 animate-pulse">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Arquiteto de Soluções IA</CardTitle>
                <CardDescription className="text-white/70">
                  Descubra a solução perfeita para seu negócio através de um questionário inteligente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Análise personalizada de necessidades
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Cálculo automático de ROI
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Roadmap de implementação
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  <Cpu className="w-4 h-4 mr-2" />
                  Descobrir Minha Solução
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                  onClick={() => setShowEnhancedROICalculator(true)}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300 animate-pulse">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Calculadora de ROI</CardTitle>
                <CardDescription className="text-white/70">
                  Calcule o retorno sobre investimento específico para seu negócio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Cálculo baseado em dados reais
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Projeção de economia de tempo
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Relatório PDF personalizado
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular ROI
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                  onClick={() => setShowDashboardDemo(true)}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300 animate-pulse">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Dashboard Demo</CardTitle>
                <CardDescription className="text-white/70">
                  Explore dashboards interativos com dados em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Métricas em tempo real
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Visualizações interativas
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Análise de performance
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ver Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                  onClick={() => setShowEnhancedFlowSimulator(true)}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Simulador de Fluxos</CardTitle>
                <CardDescription className="text-white/70">
                  Monte fluxos de automação com drag & drop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Interface drag & drop
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Simulação em tempo real
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Exportar para n8n
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  <Cpu className="w-4 h-4 mr-2" />
                  Criar Fluxo
                </Button>
              </CardContent>
            </Card>-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  <Cpu className="w-4 h-4 mr-2" />
                  Criar Fluxo
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-white/80 mb-6">
              Todas as ferramentas são gratuitas e não requerem cadastro
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setShowSolutionArchitect(true)}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Começar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Niches Section */}
      <section id="nichos" className="py-16 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Soluções Especializadas por Nicho
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Cada setor tem suas particularidades. Nossos Sistemas de IA são especializados 
              para resolver os problemas específicos do seu nicho de mercado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {niches.map((niche, index) => {
              const nicheIds = ['clinic', 'accounting', 'ecommerce', 'services']
              const nicheId = nicheIds[index] || 'clinic'
              
              return (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group cursor-pointer">
                  <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300 animate-pulse">
                    {niche.icon === '🏥' && <Shield className="w-8 h-8 text-white" />}
                    {niche.icon === '📊' && <BarChart3 className="w-8 h-8 text-white" />}
                    {niche.icon === '🛒' && <ShoppingCart className="w-8 h-8 text-white" />}
                    {niche.icon === '💼' && <Briefcase className="w-8 h-8 text-white" />}
                  </div>
                    <CardTitle className="text-white text-lg">{niche.title}</CardTitle>
                    <CardDescription className="text-white/70">
                      {niche.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {niche.solutions.map((solution, idx) => (
                        <div key={idx} className="flex items-center text-sm text-white/80">
                          <ChevronRight className="w-4 h-4 text-orange-400 mr-2" />
                          {solution}
                        </div>
                      ))}
                    </div>
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
                      <div className="text-sm text-green-300 font-semibold">
                        📈 Caso de Sucesso:
                      </div>
                      <div className="text-sm text-white/80">
                        {niche.caseStudy}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-white/20 text-white hover:bg-white/10"
                      onClick={() => {
                        setSelectedNiche(nicheId)
                        setShowNicheSolutionsModal(true)
                      }}
                    >
                      Ver Soluções
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Relatórios de Batalha: Vitórias Contra o Ladrão de Tempo
            </h2>
            <p className="text-lg text-white/80">
              Histórias reais de PMEs que venceram a guerra pela eficiência
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonials[currentTestimonial].avatar}</div>
                  <div>
                    <div className="text-xl font-semibold text-white">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-white/60">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      {testimonials[currentTestimonial].metrics}
                    </Badge>
                  </div>
                </div>
                <blockquote className="text-lg text-white/90 italic leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-orange-500' : 'bg-white/30'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sistema de Evolução: Torne-se um Mestre da Eficiência
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Cada hora economizada, cada processo otimizado, cada vitória contra o Ladrão de Tempo 
              te leva para o próximo nível. Acompanhe sua evolução e inspire outros empreendedores.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {gamificationLevels.map((level, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="text-4xl mb-2">{level.badge}</div>
                  <CardTitle className="text-white">{level.level}</CardTitle>
                  <CardDescription className="text-white/70">
                    {level.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-white/60">
                    Requisito: {level.requirement}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700">
              <Trophy className="w-5 h-5 mr-2" />
              Começar Minha Jornada
            </Button>
          </div>
        </div>
      </section>

      {/* Aura Academy Section - Precursora do Movimento */}
      <section id="academia" className="py-20 px-4 bg-gradient-to-b from-black/40 to-purple-900/20">
        <div className="container mx-auto">
          {/* Header com Manifesto da Academia */}
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-orange-500/20 to-purple-600/20 text-orange-300 border-orange-500/30 mb-6 text-lg px-6 py-2">
              🎯 A PRECURSORA DO MOVIMENTO
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">
                Aura Academy
              </span><br />
              Formando a Elite de Vendas em IA
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8 leading-relaxed">
              <strong>Não somos apenas uma academia de vendas.</strong> Somos o epicentro da revolução que está criando 
              a maior força de vendas especializada em IA do Brasil. Aqui, você não aprende só a vender - 
              você se torna um <strong className="text-orange-400">Arquiteto de Transformação Digital</strong>.
            </p>
            
            {/* Estatísticas da Academia */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-orange-400">2.847</div>
                <div className="text-sm text-white/60">Vendedores Certificados</div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-400">R$ 47M</div>
                <div className="text-sm text-white/60">Vendas Geradas pelos Alunos</div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-blue-400">340%</div>
                <div className="text-sm text-white/60">Aumento Médio em Vendas</div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-purple-400">94%</div>
                <div className="text-sm text-white/60">Taxa de Aprovação</div>
              </div>
            </div>
          </div>

          {/* Trilhas de Capacitação */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Trilhas de Especialização em Vendas de IA
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Trilha Iniciante */}
              <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      INICIANTE
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">Fundamentos de Vendas em IA</CardTitle>
                  <CardDescription className="text-white/70">
                    Base sólida para entender o mercado de IA e começar a vender com confiança
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Psicologia do Cliente de IA (8h)
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Mapeamento de Dores e Oportunidades (6h)
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Apresentação de ROI Irresistível (4h)
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Simulações de Venda Reais (12h)
                    </div>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
                    <div className="text-sm text-blue-300 font-semibold">💰 Potencial de Ganhos:</div>
                    <div className="text-lg font-bold text-white">R$ 8.000 - R$ 15.000/mês</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Começar Trilha
                  </Button>
                </CardContent>
              </Card>

              {/* Trilha Avançada */}
              <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30 backdrop-blur-sm border-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                        AVANÇADO
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        MAIS POPULAR
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl">Especialista em Soluções Complexas</CardTitle>
                  <CardDescription className="text-white/70">
                    Domine vendas consultivas de alto valor e torne-se referência no mercado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Arquitetura de Soluções Personalizadas (10h)
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Negociação de Contratos Complexos (8h)
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Gestão de Pipeline B2B (6h)
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Mentorias 1:1 com Top Performers (16h)
                    </div>
                  </div>
                  <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 mb-4">
                    <div className="text-sm text-orange-300 font-semibold">💰 Potencial de Ganhos:</div>
                    <div className="text-lg font-bold text-white">R$ 25.000 - R$ 50.000/mês</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Começar Trilha
                  </Button>
                </CardContent>
              </Card>

              {/* Trilha Elite */}
              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      ELITE
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">Líder de Vendas & Mentor</CardTitle>
                  <CardDescription className="text-white/70">
                    Forme sua própria equipe e construa um império de vendas em IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Liderança de Equipes de Vendas (12h)
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Estratégias de Expansão Territorial (8h)
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Programa de Mentoria Avançada (20h)
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Participação nos Lucros da Empresa
                    </div>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3 mb-4">
                    <div className="text-sm text-purple-300 font-semibold">💰 Potencial de Ganhos:</div>
                    <div className="text-lg font-bold text-white">R$ 80.000+ /mês</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Candidatar-se
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Metodologia Exclusiva */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Metodologia A.U.R.A: Aprovação Garantida
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">A</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Análise</h4>
                  <p className="text-white/70 text-sm">
                    Diagnóstico profundo das necessidades do cliente usando IA para mapear oportunidades
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">U</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Urgência</h4>
                  <p className="text-white/70 text-sm">
                    Criação de senso de urgência através do "Ladrão de Tempo" e demonstração de perdas
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">R</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Resultado</h4>
                  <p className="text-white/70 text-sm">
                    Apresentação de ROI concreto com métricas específicas e casos de sucesso similares
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">A</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Ação</h4>
                  <p className="text-white/70 text-sm">
                    Fechamento consultivo com próximos passos claros e implementação garantida
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Programa de Certificação */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Certificações Reconhecidas pelo Mercado
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-white">Consultor Certificado em IA</CardTitle>
                  <CardDescription className="text-white/70">
                    Certificação básica para iniciar vendas de soluções de IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      40 horas de treinamento
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Prova prática de vendas
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Certificado digital verificável
                    </div>
                  </div>
                  <Badge className="w-full bg-green-500/20 text-green-300 border-green-500/30 justify-center py-2">
                    Nível Básico
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30 backdrop-blur-sm border-2">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-white">Especialista em Soluções IA</CardTitle>
                  <CardDescription className="text-white/70">
                    Certificação avançada para vendas consultivas complexas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      80 horas de treinamento
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Projeto real de implementação
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Mentoria individual
                    </div>
                  </div>
                  <Badge className="w-full bg-orange-500/20 text-orange-300 border-orange-500/30 justify-center py-2">
                    Nível Avançado
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-white">Master Trainer IA</CardTitle>
                  <CardDescription className="text-white/70">
                    Certificação máxima para formar outros vendedores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      120 horas de treinamento
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Formar 10 vendedores certificados
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Participação nos lucros
                    </div>
                  </div>
                  <Badge className="w-full bg-purple-500/20 text-purple-300 border-purple-500/30 justify-center py-2">
                    Nível Master
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA da Academia */}
          <div className="text-center bg-gradient-to-r from-orange-500/20 to-purple-600/20 border border-orange-500/30 rounded-2xl p-12 mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Pronto para Liderar a Revolução da IA?
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
              A Aura Academy não é apenas uma escola de vendas. É o berço da maior transformação 
              do mercado brasileiro de IA. Seja parte da elite que está moldando o futuro.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-lg px-8 py-6">
                <Rocket className="w-5 h-5 mr-2" />
                Candidatar-se à Academia
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6">
                <Play className="w-5 h-5 mr-2" />
                Assistir Aula Gratuita
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/60">
              <div className="flex items-center justify-center">
                <Timer className="w-4 h-4 mr-2" />
                Processo seletivo rigoroso
              </div>
              <div className="flex items-center justify-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Investimento com ROI garantido
              </div>
              <div className="flex items-center justify-center">
                <UserCheck className="w-4 h-4 mr-2" />
                Acompanhamento vitalício
              </div>
            </div>
          </div>

          {/* Ferramentas Práticas de Treinamento */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Ferramentas Práticas de Treinamento
            </h3>
            <p className="text-lg text-white/80 text-center mb-12 max-w-3xl mx-auto">
              Experimente nossas ferramentas exclusivas de treinamento. Desenvolvidas para acelerar 
              seu aprendizado e maximizar seus resultados em vendas de IA.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Simulador de Vendas */}
              <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 backdrop-blur-sm hover:bg-blue-500/25 transition-all duration-300 group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      INTERATIVO
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">Simulador de Vendas IA</CardTitle>
                  <CardDescription className="text-white/70">
                    Pratique cenários reais de vendas com feedback instantâneo e pontuação detalhada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Cenários por nível de dificuldade
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Feedback em tempo real
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Sistema de pontuação avançado
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Análise de performance detalhada
                    </div>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
                    <div className="text-sm text-blue-300 font-semibold">🎯 Benefícios:</div>
                    <div className="text-sm text-white/80">Melhore suas técnicas de vendas sem pressão real</div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    onClick={() => setShowSalesTrainingSimulator(true)}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Iniciar Simulação
                  </Button>
                </CardContent>
              </Card>

              {/* Sistema de Gamificação */}
              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm hover:bg-purple-500/25 transition-all duration-300 group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      GAMIFICADO
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">Sistema de Gamificação</CardTitle>
                  <CardDescription className="text-white/70">
                    Acompanhe sua evolução, conquiste badges e compete com outros vendedores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Sistema de níveis e XP
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Badges e conquistas exclusivas
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Ranking de vendedores
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Missões e desafios semanais
                    </div>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3 mb-4">
                    <div className="text-sm text-purple-300 font-semibold">🏆 Benefícios:</div>
                    <div className="text-sm text-white/80">Mantenha-se motivado e engajado no aprendizado</div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => setShowSalesGamification(true)}
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Ver Meu Progresso
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-white/80 mb-6">
                Ferramentas exclusivas para alunos da Aura Academy. Cadastre-se para ter acesso completo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explorar Todas as Ferramentas
                </Button>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                  onClick={() => setShowSalesManagementDashboard(true)}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Dashboard de Gestão
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Testimonials Section */}
      <InteractiveTestimonials />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500/20 to-purple-600/20 border-y border-orange-500/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Derrotar o Ladrão de Tempo?
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            Junte-se aos milhares de empreendedores que já descobriram o poder dos Sistemas Operacionais de IA. 
            Comece sua jornada de transformação hoje mesmo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-lg px-8 py-6">
              <Rocket className="w-5 h-5 mr-2" />
              Solicitar Demonstração Gratuita
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6">
              <MessageSquare className="w-5 h-5 mr-2" />
              Falar com Especialista
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/60">
            <div className="flex items-center justify-center">
              <Timer className="w-4 h-4 mr-2" />
              Implementação em 72h
            </div>
            <div className="flex items-center justify-center">
              <DollarSign className="w-4 h-4 mr-2" />
              ROI garantido em 30 dias
            </div>
            <div className="flex items-center justify-center">
              <Shield className="w-4 h-4 mr-2" />
              Suporte 24/7
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />

      {/* Solution Architect Modal */}
      {showSolutionArchitect && (
        <SolutionArchitect onClose={() => setShowSolutionArchitect(false)} />
      )}

      {/* ROI Calculator Modal */}
      {showROICalculator && (
        <ROICalculator onClose={() => setShowROICalculator(false)} />
      )}

      {/* Dashboard Demo Modal */}
      {showDashboardDemo && (
        <DashboardDemo onClose={() => setShowDashboardDemo(false)} />
      )}

      {/* Flow Simulator Modal */}
      {showFlowSimulator && (
        <FlowSimulator onClose={() => setShowFlowSimulator(false)} />
      )}

      {/* Community Forum Modal */}
      {showCommunityForum && (
        <CommunityForum onClose={() => setShowCommunityForum(false)} />
      )}

      {/* Ambassador Program Modal */}
      {showAmbassadorProgram && (
        <AmbassadorProgram onClose={() => setShowAmbassadorProgram(false)} />
      )}

      {/* Sales Training Simulator Modal */}
      {showSalesTrainingSimulator && (
        <SalesTrainingSimulator onClose={() => setShowSalesTrainingSimulator(false)} />
      )}

      {/* Sales Gamification Modal */}
      {showSalesGamification && (
        <SalesGamification onClose={() => setShowSalesGamification(false)} />
      )}

      {/* Enhanced Solution Architect Modal */}
      {showEnhancedSolutionArchitect && (
        <EnhancedSolutionArchitect onClose={() => setShowEnhancedSolutionArchitect(false)} />
      )}

      {/* Enhanced Flow Simulator Modal */}
      {showEnhancedFlowSimulator && (
        <EnhancedFlowSimulator onClose={() => setShowEnhancedFlowSimulator(false)} />
      )}

      {/* Sales Management Dashboard Modal */}
      {showSalesManagementDashboard && (
        <SalesManagementDashboard onClose={() => setShowSalesManagementDashboard(false)} />
      )}

      {/* Enhanced ROI Calculator Modal */}
      {showEnhancedROICalculator && (
        <EnhancedROICalculator 
          isOpen={showEnhancedROICalculator}
          onClose={() => setShowEnhancedROICalculator(false)}
        />
      )}

      {/* Niche Solutions Modal */}
      {showNicheSolutionsModal && (
        <NicheSolutionsModal 
          niche={selectedNiche}
          onClose={() => {
            setShowNicheSolutionsModal(false)
            setSelectedNiche(null)
          }}
        />
      )}

      {/* AI System Modal */}
      {showAISystemModal && (
        <AISystemModal 
          system={selectedAISystem}
          isOpen={showAISystemModal}
          onClose={() => {
            setShowAISystemModal(false)
            setSelectedAISystem(null)
          }}
        />
      )}
    </div>
  )
}

export default App

