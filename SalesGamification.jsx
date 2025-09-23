import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  X,
  Trophy,
  Star,
  Target,
  TrendingUp,
  Users,
  Award,
  Crown,
  Zap,
  Flame,
  Shield,
  Sword,
  Gem,
  Medal,
  CheckCircle,
  Lock,
  Unlock,
  ArrowUp,
  Calendar,
  DollarSign,
  Clock,
  BarChart3,
  Lightbulb,
  MessageSquare,
  Phone,
  Mail,
  Handshake,
  Gift,
  Sparkles
} from 'lucide-react'

const SalesGamification = ({ onClose }) => {
  const [currentUser] = useState({
    name: "João Silva",
    level: 12,
    xp: 8750,
    xpToNext: 1250,
    totalSales: 247500,
    rank: 4,
    streak: 15,
    badges: [
      { id: 1, name: "Primeiro Fechamento", icon: Target, earned: true, date: "2024-01-15" },
      { id: 2, name: "Vendedor do Mês", icon: Crown, earned: true, date: "2024-02-01" },
      { id: 3, name: "Especialista em IA", icon: Zap, earned: true, date: "2024-02-15" },
      { id: 4, name: "Mentor Certificado", icon: Users, earned: true, date: "2024-03-01" },
      { id: 5, name: "Conquistador de Objeções", icon: Shield, earned: false },
      { id: 6, name: "Master Closer", icon: Sword, earned: false },
      { id: 7, name: "Lenda das Vendas", icon: Gem, earned: false }
    ]
  })

  const [selectedTab, setSelectedTab] = useState('overview')
  const [achievements, setAchievements] = useState([])

  const levels = [
    { level: 1, title: "Aprendiz", xpRequired: 0, color: "text-gray-400", bgColor: "bg-gray-500/20" },
    { level: 5, title: "Vendedor", xpRequired: 2500, color: "text-green-400", bgColor: "bg-green-500/20" },
    { level: 10, title: "Especialista", xpRequired: 5000, color: "text-blue-400", bgColor: "bg-blue-500/20" },
    { level: 15, title: "Expert", xpRequired: 10000, color: "text-purple-400", bgColor: "bg-purple-500/20" },
    { level: 20, title: "Master", xpRequired: 20000, color: "text-orange-400", bgColor: "bg-orange-500/20" },
    { level: 25, title: "Lenda", xpRequired: 40000, color: "text-yellow-400", bgColor: "bg-yellow-500/20" }
  ]

  const leaderboard = [
    { rank: 1, name: "Maria Santos", level: 18, xp: 15420, sales: 485000, badge: Crown, streak: 28 },
    { rank: 2, name: "Carlos Silva", level: 16, xp: 12350, sales: 398000, badge: Trophy, streak: 22 },
    { rank: 3, name: "Ana Costa", level: 15, xp: 11200, sales: 367000, badge: Medal, streak: 19 },
    { rank: 4, name: "João Silva", level: 12, xp: 8750, sales: 247500, badge: Star, streak: 15 },
    { rank: 5, name: "Roberto Lima", level: 11, xp: 7890, sales: 234000, badge: Target, streak: 12 }
  ]

  const missions = [
    {
      id: 1,
      title: "Feche 3 Vendas Esta Semana",
      description: "Complete 3 fechamentos até domingo",
      progress: 2,
      target: 3,
      xpReward: 500,
      deadline: "2024-03-10",
      difficulty: "Médio",
      type: "weekly"
    },
    {
      id: 2,
      title: "Supere Objeção de Preço",
      description: "Converta um lead que inicialmente recusou por preço",
      progress: 0,
      target: 1,
      xpReward: 300,
      deadline: "2024-03-15",
      difficulty: "Difícil",
      type: "skill"
    },
    {
      id: 3,
      title: "Mantenha Sequência de 20 Dias",
      description: "Faça pelo menos 1 atividade de vendas por 20 dias consecutivos",
      progress: 15,
      target: 20,
      xpReward: 800,
      deadline: "2024-03-20",
      difficulty: "Fácil",
      type: "streak"
    },
    {
      id: 4,
      title: "Mentor um Novo Vendedor",
      description: "Ajude um colega iniciante a fazer sua primeira venda",
      progress: 0,
      target: 1,
      xpReward: 1000,
      deadline: "2024-03-31",
      difficulty: "Médio",
      type: "mentorship"
    }
  ]

  const rewards = [
    {
      id: 1,
      title: "Bônus de Performance",
      description: "10% extra na próxima comissão",
      cost: 2000,
      type: "bonus",
      icon: DollarSign,
      available: true
    },
    {
      id: 2,
      title: "Dia de Folga Extra",
      description: "1 dia de folga adicional",
      cost: 3000,
      type: "time",
      icon: Calendar,
      available: true
    },
    {
      id: 3,
      title: "Mentoria 1:1 com CEO",
      description: "1 hora de mentoria exclusiva",
      cost: 5000,
      type: "mentorship",
      icon: Users,
      available: false
    },
    {
      id: 4,
      title: "Equipamento Premium",
      description: "Notebook ou smartphone top de linha",
      cost: 10000,
      type: "equipment",
      icon: Gift,
      available: false
    }
  ]

  const getCurrentLevelInfo = () => {
    const currentLevel = levels.find(l => currentUser.level >= l.level && 
      (levels.find(next => next.level > l.level) ? currentUser.level < levels.find(next => next.level > l.level).level : true))
    return currentLevel || levels[0]
  }

  const getNextLevelInfo = () => {
    const nextLevel = levels.find(l => l.level > currentUser.level)
    return nextLevel
  }

  const getMissionDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Fácil': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'Médio': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'Difícil': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getMissionTypeIcon = (type) => {
    switch(type) {
      case 'weekly': return Calendar
      case 'skill': return Lightbulb
      case 'streak': return Flame
      case 'mentorship': return Users
      default: return Target
    }
  }

  const currentLevelInfo = getCurrentLevelInfo()
  const nextLevelInfo = getNextLevelInfo()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Sistema de Gamificação</h2>
              <p className="text-white/60">Acompanhe sua evolução como vendedor</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-white/20">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
              { id: 'missions', label: 'Missões', icon: Target },
              { id: 'leaderboard', label: 'Ranking', icon: Trophy },
              { id: 'badges', label: 'Conquistas', icon: Award },
              { id: 'rewards', label: 'Recompensas', icon: Gift }
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
              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">#{currentUser.rank}</div>
                    <div className="text-sm text-white/60">Ranking Geral</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">Nível {currentUser.level}</div>
                    <div className="text-sm text-white/60">{currentLevelInfo.title}</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">R$ {(currentUser.totalSales / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-white/60">Vendas Totais</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
                  <CardContent className="p-6 text-center">
                    <Flame className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{currentUser.streak}</div>
                    <div className="text-sm text-white/60">Dias Consecutivos</div>
                  </CardContent>
                </Card>
              </div>

              {/* Level Progress */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <ArrowUp className="w-5 h-5 mr-2 text-orange-400" />
                    Progresso de Nível
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full ${currentLevelInfo.bgColor} flex items-center justify-center`}>
                          <span className={`text-lg font-bold ${currentLevelInfo.color}`}>{currentUser.level}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{currentLevelInfo.title}</div>
                          <div className="text-white/60 text-sm">{currentUser.xp.toLocaleString()} XP</div>
                        </div>
                      </div>
                      {nextLevelInfo && (
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="text-white font-semibold text-right">{nextLevelInfo.title}</div>
                            <div className="text-white/60 text-sm text-right">{nextLevelInfo.xpRequired.toLocaleString()} XP</div>
                          </div>
                          <div className={`w-12 h-12 rounded-full ${nextLevelInfo.bgColor} flex items-center justify-center`}>
                            <span className={`text-lg font-bold ${nextLevelInfo.color}`}>{nextLevelInfo.level}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {nextLevelInfo && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Progresso para o próximo nível</span>
                          <span className="text-white">{currentUser.xpToNext} XP restantes</span>
                        </div>
                        <Progress 
                          value={((nextLevelInfo.xpRequired - currentUser.xpToNext) / nextLevelInfo.xpRequired) * 100} 
                          className="h-3"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-400" />
                    Conquistas Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentUser.badges.filter(badge => badge.earned).slice(-4).map((badge) => (
                      <div key={badge.id} className="bg-gradient-to-br from-orange-500/20 to-purple-600/20 border border-orange-500/30 rounded-lg p-4 text-center">
                        <badge.icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <div className="text-white font-semibold text-sm">{badge.name}</div>
                        <div className="text-white/60 text-xs">{badge.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Missions Tab */}
          {selectedTab === 'missions' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Missões Ativas</h3>
                <p className="text-white/60">Complete missões para ganhar XP e desbloquear recompensas</p>
              </div>

              <div className="grid gap-6">
                {missions.map((mission) => {
                  const MissionIcon = getMissionTypeIcon(mission.type)
                  const progressPercentage = (mission.progress / mission.target) * 100
                  
                  return (
                    <Card key={mission.id} className="bg-white/10 border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                              <MissionIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-white mb-1">{mission.title}</h4>
                              <p className="text-white/70 mb-3">{mission.description}</p>
                              
                              <div className="flex items-center space-x-4 mb-3">
                                <Badge className={getMissionDifficultyColor(mission.difficulty)}>
                                  {mission.difficulty}
                                </Badge>
                                <div className="flex items-center space-x-1 text-orange-400">
                                  <Star className="w-4 h-4" />
                                  <span className="text-sm font-semibold">{mission.xpReward} XP</span>
                                </div>
                                <div className="flex items-center space-x-1 text-white/60">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-sm">até {mission.deadline}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-white/60">Progresso</span>
                                  <span className="text-white">{mission.progress}/{mission.target}</span>
                                </div>
                                <Progress value={progressPercentage} className="h-2" />
                              </div>
                            </div>
                          </div>
                          
                          {progressPercentage === 100 ? (
                            <Button className="bg-green-500 hover:bg-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Resgatar
                            </Button>
                          ) : (
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              Em Progresso
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {selectedTab === 'leaderboard' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Ranking de Vendedores</h3>
                <p className="text-white/60">Veja como você se compara aos outros vendedores</p>
              </div>

              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <Card key={user.rank} className={`border-white/20 ${
                    user.name === currentUser.name ? 'bg-orange-500/20 border-orange-500/30' : 'bg-white/10'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                            user.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                            user.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                            'bg-white/20 text-white'
                          }`}>
                            <span className="text-lg font-bold">#{user.rank}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <user.badge className={`w-6 h-6 ${
                              user.rank === 1 ? 'text-yellow-400' :
                              user.rank === 2 ? 'text-gray-300' :
                              user.rank === 3 ? 'text-orange-400' :
                              'text-white/60'
                            }`} />
                            <div>
                              <div className="text-white font-semibold">{user.name}</div>
                              <div className="text-white/60 text-sm">Nível {user.level}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-8 text-center">
                          <div>
                            <div className="text-lg font-bold text-white">{user.xp.toLocaleString()}</div>
                            <div className="text-xs text-white/60">XP Total</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-400">R$ {(user.sales / 1000).toFixed(0)}K</div>
                            <div className="text-xs text-white/60">Vendas</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-orange-400">{user.streak}</div>
                            <div className="text-xs text-white/60">Sequência</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Badges Tab */}
          {selectedTab === 'badges' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Suas Conquistas</h3>
                <p className="text-white/60">Desbloqueie badges especiais conforme evolui</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentUser.badges.map((badge) => (
                  <Card key={badge.id} className={`text-center ${
                    badge.earned 
                      ? 'bg-gradient-to-br from-orange-500/20 to-purple-600/20 border-orange-500/30' 
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        badge.earned 
                          ? 'bg-gradient-to-r from-orange-500 to-purple-600' 
                          : 'bg-white/10'
                      }`}>
                        {badge.earned ? (
                          <badge.icon className="w-8 h-8 text-white" />
                        ) : (
                          <Lock className="w-8 h-8 text-white/40" />
                        )}
                      </div>
                      <h4 className={`font-semibold mb-2 ${badge.earned ? 'text-white' : 'text-white/40'}`}>
                        {badge.name}
                      </h4>
                      {badge.earned && (
                        <div className="text-xs text-white/60">
                          Conquistado em {badge.date}
                        </div>
                      )}
                      {!badge.earned && (
                        <div className="text-xs text-white/40">
                          Bloqueado
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {selectedTab === 'rewards' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Loja de Recompensas</h3>
                <p className="text-white/60">Troque seus XP por recompensas incríveis</p>
                <div className="mt-4">
                  <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-lg px-4 py-2">
                    <Star className="w-4 h-4 mr-2" />
                    {currentUser.xp.toLocaleString()} XP disponíveis
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className={`${
                    reward.available && currentUser.xp >= reward.cost
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          reward.available && currentUser.xp >= reward.cost
                            ? 'bg-gradient-to-r from-orange-500 to-purple-600'
                            : 'bg-white/10'
                        }`}>
                          <reward.icon className={`w-6 h-6 ${
                            reward.available && currentUser.xp >= reward.cost ? 'text-white' : 'text-white/40'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`text-lg font-semibold mb-2 ${
                            reward.available && currentUser.xp >= reward.cost ? 'text-white' : 'text-white/40'
                          }`}>
                            {reward.title}
                          </h4>
                          <p className={`text-sm mb-4 ${
                            reward.available && currentUser.xp >= reward.cost ? 'text-white/70' : 'text-white/40'
                          }`}>
                            {reward.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Star className={`w-4 h-4 ${
                                reward.available && currentUser.xp >= reward.cost ? 'text-orange-400' : 'text-white/40'
                              }`} />
                              <span className={`font-semibold ${
                                reward.available && currentUser.xp >= reward.cost ? 'text-white' : 'text-white/40'
                              }`}>
                                {reward.cost.toLocaleString()} XP
                              </span>
                            </div>
                            
                            <Button 
                              size="sm"
                              disabled={!reward.available || currentUser.xp < reward.cost}
                              className={
                                reward.available && currentUser.xp >= reward.cost
                                  ? 'bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700'
                                  : ''
                              }
                            >
                              {!reward.available ? (
                                <>
                                  <Lock className="w-4 h-4 mr-2" />
                                  Bloqueado
                                </>
                              ) : currentUser.xp >= reward.cost ? (
                                <>
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Resgatar
                                </>
                              ) : (
                                'XP Insuficiente'
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesGamification

