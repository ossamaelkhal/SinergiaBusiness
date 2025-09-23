import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  X,
  Users,
  TrendingUp,
  Target,
  DollarSign,
  Calendar,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Award,
  Trophy,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  Download,
  Plus,
  Edit,
  Eye,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Zap,
  Crown,
  Shield,
  Briefcase,
  UserPlus,
  UserCheck,
  UserX,
  Settings,
  Bell,
  RefreshCw
} from 'lucide-react'
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts'

const SalesManagementDashboard = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedTeam, setSelectedTeam] = useState('all')

  // Dados simulados
  const teamStats = {
    totalSellers: 47,
    activeSellers: 42,
    newThisMonth: 8,
    totalRevenue: 1247500,
    monthlyGrowth: 23.5,
    avgTicket: 2850,
    conversionRate: 18.7
  }

  const salesData = [
    { month: 'Jan', vendas: 85000, meta: 100000, vendedores: 35 },
    { month: 'Fev', vendas: 125000, meta: 120000, vendedores: 38 },
    { month: 'Mar', vendas: 165000, meta: 140000, vendedores: 42 },
    { month: 'Abr', vendas: 195000, meta: 160000, vendedores: 45 },
    { month: 'Mai', vendas: 235000, meta: 180000, vendedores: 47 }
  ]

  const topPerformers = [
    {
      id: 1,
      name: "Maria Santos",
      avatar: "👩‍💼",
      level: "Elite",
      sales: 45000,
      deals: 18,
      conversion: 24.5,
      streak: 28,
      badge: Crown,
      growth: 15.2
    },
    {
      id: 2,
      name: "Carlos Silva",
      avatar: "👨‍💻",
      level: "Avançado",
      sales: 38500,
      deals: 15,
      conversion: 21.3,
      streak: 22,
      badge: Trophy,
      growth: 12.8
    },
    {
      id: 3,
      name: "Ana Costa",
      avatar: "👩‍🎯",
      level: "Avançado",
      sales: 35200,
      deals: 14,
      conversion: 19.8,
      streak: 19,
      badge: Star,
      growth: 8.7
    },
    {
      id: 4,
      name: "Roberto Lima",
      avatar: "👨‍💼",
      level: "Intermediário",
      sales: 28900,
      deals: 12,
      conversion: 17.5,
      streak: 15,
      badge: Target,
      growth: 22.1
    },
    {
      id: 5,
      name: "Julia Mendes",
      avatar: "👩‍💻",
      level: "Iniciante",
      sales: 22100,
      deals: 9,
      conversion: 15.2,
      streak: 12,
      badge: Shield,
      growth: 35.4
    }
  ]

  const teamPerformance = [
    { team: 'E-commerce', vendedores: 12, vendas: 285000, meta: 250000, performance: 114 },
    { team: 'Clínicas', vendedores: 15, vendas: 342000, meta: 300000, performance: 114 },
    { team: 'Contabilidade', vendedores: 10, vendas: 198000, meta: 200000, performance: 99 },
    { team: 'Serviços', vendedores: 8, vendas: 165000, meta: 150000, performance: 110 },
    { team: 'Outros', vendedores: 2, vendas: 45000, meta: 50000, performance: 90 }
  ]

  const conversionFunnel = [
    { stage: 'Leads', value: 2450, color: '#3b82f6' },
    { stage: 'Qualificados', value: 1225, color: '#10b981' },
    { stage: 'Propostas', value: 490, color: '#f59e0b' },
    { stage: 'Negociação', value: 245, color: '#ef4444' },
    { stage: 'Fechados', value: 122, color: '#8b5cf6' }
  ]

  const recentActivities = [
    {
      id: 1,
      seller: "Maria Santos",
      action: "Fechou venda",
      client: "TechStore Plus",
      value: 4500,
      time: "2 min atrás",
      type: "success"
    },
    {
      id: 2,
      seller: "Carlos Silva",
      action: "Agendou demonstração",
      client: "Clínica Vida",
      value: null,
      time: "15 min atrás",
      type: "info"
    },
    {
      id: 3,
      seller: "Ana Costa",
      action: "Perdeu oportunidade",
      client: "Escritório Legal",
      value: 2800,
      time: "1h atrás",
      type: "warning"
    },
    {
      id: 4,
      seller: "Roberto Lima",
      action: "Novo lead qualificado",
      client: "Farmácia Central",
      value: null,
      time: "2h atrás",
      type: "info"
    }
  ]

  const getPerformanceColor = (performance) => {
    if (performance >= 110) return 'text-green-400'
    if (performance >= 90) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getPerformanceBadge = (performance) => {
    if (performance >= 110) return { text: 'EXCELENTE', color: 'bg-green-500/20 text-green-300 border-green-500/30' }
    if (performance >= 90) return { text: 'BOM', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' }
    return { text: 'ABAIXO', color: 'bg-red-500/20 text-red-300 border-red-500/30' }
  }

  const getLevelColor = (level) => {
    switch(level) {
      case 'Elite': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'Avançado': return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'Intermediário': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'Iniciante': return 'bg-green-500/20 text-green-300 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Gestão de Vendedores</h2>
              <p className="text-white/60">Dashboard executivo da Aura Academy</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-white/20">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
              { id: 'team', label: 'Equipe', icon: Users },
              { id: 'performance', label: 'Performance', icon: TrendingUp },
              { id: 'pipeline', label: 'Pipeline', icon: Target },
              { id: 'training', label: 'Treinamento', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  selectedTab === tab.id
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
                onClick={() => setSelectedTab(tab.id)}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{teamStats.activeSellers}</div>
                    <div className="text-sm text-white/60">Vendedores Ativos</div>
                    <div className="text-xs text-green-400 mt-1">+{teamStats.newThisMonth} este mês</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">R$ {(teamStats.totalRevenue / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-white/60">Receita Total</div>
                    <div className="text-xs text-green-400 mt-1">+{teamStats.monthlyGrowth}% vs mês anterior</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
                  <CardContent className="p-6 text-center">
                    <Target className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{teamStats.conversionRate}%</div>
                    <div className="text-sm text-white/60">Taxa de Conversão</div>
                    <div className="text-xs text-green-400 mt-1">+2.3% vs mês anterior</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">R$ {teamStats.avgTicket.toLocaleString()}</div>
                    <div className="text-sm text-white/60">Ticket Médio</div>
                    <div className="text-xs text-green-400 mt-1">+8.7% vs mês anterior</div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Sales Evolution */}
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <LineChart className="w-5 h-5 mr-2 text-orange-400" />
                      Evolução de Vendas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsLineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Line type="monotone" dataKey="vendas" stroke="#f97316" strokeWidth={3} />
                        <Line type="monotone" dataKey="meta" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Team Performance */}
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-orange-400" />
                      Performance por Equipe
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teamPerformance.map((team, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-white font-medium">{team.team}</span>
                              <Badge className={getPerformanceBadge(team.performance).color}>
                                {team.performance}%
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-semibold">R$ {(team.vendas / 1000).toFixed(0)}K</div>
                              <div className="text-white/60 text-sm">{team.vendedores} vendedores</div>
                            </div>
                          </div>
                          <Progress value={team.performance} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-orange-400" />
                    Atividades Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            activity.type === 'success' ? 'bg-green-400' :
                            activity.type === 'warning' ? 'bg-yellow-400' :
                            'bg-blue-400'
                          }`} />
                          <div>
                            <div className="text-white font-medium">
                              <span className="text-orange-400">{activity.seller}</span> {activity.action}
                            </div>
                            <div className="text-white/60 text-sm">{activity.client}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.value && (
                            <div className="text-white font-semibold">R$ {activity.value.toLocaleString()}</div>
                          )}
                          <div className="text-white/60 text-sm">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Team Tab */}
          {selectedTab === 'team' && (
            <div className="space-y-8">
              {/* Team Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    <input
                      type="text"
                      placeholder="Buscar vendedor..."
                      className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
                <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adicionar Vendedor
                </Button>
              </div>

              {/* Top Performers */}
              <div className="space-y-4">
                {topPerformers.map((seller, index) => (
                  <Card key={seller.id} className={`bg-white/10 border-white/20 ${
                    index === 0 ? 'border-yellow-500/50 bg-yellow-500/10' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
                              {seller.avatar}
                            </div>
                            {index === 0 && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Crown className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-semibold text-white">{seller.name}</h3>
                              <Badge className={getLevelColor(seller.level)}>
                                {seller.level}
                              </Badge>
                              <seller.badge className={`w-5 h-5 ${
                                index === 0 ? 'text-yellow-400' :
                                index === 1 ? 'text-gray-300' :
                                index === 2 ? 'text-orange-400' :
                                'text-white/60'
                              }`} />
                            </div>
                            <div className="text-white/60 text-sm">
                              Sequência de {seller.streak} dias • {seller.deals} vendas este mês
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-8 text-center">
                          <div>
                            <div className="text-xl font-bold text-green-400">R$ {(seller.sales / 1000).toFixed(0)}K</div>
                            <div className="text-xs text-white/60">Vendas</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-blue-400">{seller.conversion}%</div>
                            <div className="text-xs text-white/60">Conversão</div>
                          </div>
                          <div>
                            <div className={`text-xl font-bold flex items-center justify-center ${
                              seller.growth > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {seller.growth > 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                              {Math.abs(seller.growth)}%
                            </div>
                            <div className="text-xs text-white/60">Crescimento</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {selectedTab === 'performance' && (
            <div className="space-y-8">
              {/* Performance Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Meta vs Realizado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Meta Mensal</span>
                        <span className="text-white font-semibold">R$ 200K</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Realizado</span>
                        <span className="text-green-400 font-semibold">R$ 235K</span>
                      </div>
                      <Progress value={117.5} className="h-3" />
                      <div className="text-center">
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          117.5% da Meta
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Conversão por Nível</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-300">Elite</span>
                        <span className="text-white">24.5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-300">Avançado</span>
                        <span className="text-white">19.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-300">Intermediário</span>
                        <span className="text-white">15.8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-300">Iniciante</span>
                        <span className="text-white">12.3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Atividade da Equipe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Ligações Hoje</span>
                        <span className="text-white">247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Demos Agendadas</span>
                        <span className="text-white">18</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Propostas Enviadas</span>
                        <span className="text-white">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Vendas Fechadas</span>
                        <span className="text-green-400">8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-400" />
                    Performance Individual (Últimos 30 dias)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={topPerformers}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="sales" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Pipeline Tab */}
          {selectedTab === 'pipeline' && (
            <div className="space-y-8">
              {/* Pipeline Overview */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Target className="w-5 h-5 mr-2 text-orange-400" />
                      Funil de Conversão
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {conversionFunnel.map((stage, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium">{stage.stage}</span>
                            <span className="text-white">{stage.value.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-3">
                            <div 
                              className="h-3 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${(stage.value / conversionFunnel[0].value) * 100}%`,
                                backgroundColor: stage.color
                              }}
                            />
                          </div>
                          {index < conversionFunnel.length - 1 && (
                            <div className="text-right text-sm text-white/60">
                              {Math.round((conversionFunnel[index + 1].value / stage.value) * 100)}% conversão
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-orange-400" />
                      Tempo Médio por Etapa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white">Lead → Qualificado</span>
                        <span className="text-blue-400 font-semibold">2.3 dias</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white">Qualificado → Proposta</span>
                        <span className="text-green-400 font-semibold">4.7 dias</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white">Proposta → Negociação</span>
                        <span className="text-yellow-400 font-semibold">6.2 dias</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white">Negociação → Fechamento</span>
                        <span className="text-purple-400 font-semibold">3.8 dias</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pipeline Actions */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-orange-400" />
                    Ações Recomendadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                        <div>
                          <h4 className="text-white font-semibold">Oportunidades Paradas</h4>
                          <p className="text-white/70 text-sm">23 leads sem atividade há mais de 5 dias</p>
                          <Button size="sm" className="mt-2 bg-yellow-500 hover:bg-yellow-600">
                            Revisar Leads
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                        <Target className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="text-white font-semibold">Follow-up Necessário</h4>
                          <p className="text-white/70 text-sm">15 propostas aguardando retorno</p>
                          <Button size="sm" className="mt-2 bg-blue-500 hover:bg-blue-600">
                            Agendar Follow-ups
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <h4 className="text-white font-semibold">Oportunidades Quentes</h4>
                          <p className="text-white/70 text-sm">8 negociações próximas do fechamento</p>
                          <Button size="sm" className="mt-2 bg-green-500 hover:bg-green-600">
                            Priorizar Fechamento
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                        <Trophy className="w-5 h-5 text-purple-400 mt-0.5" />
                        <div>
                          <h4 className="text-white font-semibold">Meta do Mês</h4>
                          <p className="text-white/70 text-sm">Faltam R$ 15K para bater a meta</p>
                          <Button size="sm" className="mt-2 bg-purple-500 hover:bg-purple-600">
                            Ver Estratégia
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Training Tab */}
          {selectedTab === 'training' && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Centro de Treinamento da Equipe</h3>
                <p className="text-white/60 max-w-3xl mx-auto">
                  Acompanhe o progresso de treinamento da sua equipe e identifique oportunidades de desenvolvimento
                </p>
              </div>

              {/* Training Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                  <CardContent className="p-6 text-center">
                    <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">89%</div>
                    <div className="text-sm text-white/60">Taxa de Conclusão</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">34</div>
                    <div className="text-sm text-white/60">Certificados Emitidos</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">127h</div>
                    <div className="text-sm text-white/60">Horas de Treinamento</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">4.8</div>
                    <div className="text-sm text-white/60">Avaliação Média</div>
                  </CardContent>
                </Card>
              </div>

              {/* Training Progress */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-400" />
                    Progresso por Vendedor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.slice(0, 5).map((seller, index) => (
                      <div key={seller.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-sm">
                            {seller.avatar}
                          </div>
                          <div>
                            <div className="text-white font-medium">{seller.name}</div>
                            <div className="text-white/60 text-sm">{seller.level}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-white font-semibold">{85 + index * 3}%</div>
                            <div className="text-white/60 text-xs">Conclusão</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white font-semibold">{12 - index}</div>
                            <div className="text-white/60 text-xs">Módulos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white font-semibold">{Math.floor(Math.random() * 20) + 15}h</div>
                            <div className="text-white/60 text-xs">Tempo</div>
                          </div>
                          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesManagementDashboard

