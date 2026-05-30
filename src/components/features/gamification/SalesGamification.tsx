import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  X, Trophy, Star, Target, Crown, Zap, Shield, Sword, Gem, Medal,
  CheckCircle, Lock, ArrowUp, Calendar, DollarSign, Clock,
  BarChart3, Lightbulb, Flame, Users, Award, Gift, Sparkles, LucideIcon
} from 'lucide-react'
import { useAuth } from '@/providers/AuthProvider'
import { addWithdrawalRequest } from '@/services/firestoreService'
import { toast } from 'sonner'

interface BadgeItem {
  id: number
  name: string
  icon: LucideIcon
  earned: boolean
  date?: string
}

interface User {
  name: string
  level: number
  xp: number
  xpToNext: number
  totalSales: number
  rank: number
  streak: number
  badges: BadgeItem[]
}

interface Level {
  level: number
  title: string
  xpRequired: number
  color: string
  bgColor: string
}

interface LeaderboardUser {
  rank: number
  name: string
  level: number
  xp: number
  sales: number
  badge: LucideIcon
  streak: number
}

interface Mission {
  id: number
  title: string
  description: string
  progress: number
  target: number
  xpReward: number
  deadline: string
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  type: 'weekly' | 'skill' | 'streak' | 'mentorship'
}

interface Reward {
  id: number
  title: string
  description: string
  cost: number
  type: 'bonus' | 'time' | 'mentorship' | 'equipment'
  icon: LucideIcon
  available: boolean
}

interface SalesGamificationProps {
  onClose: () => void
}

const SalesGamification: React.FC<SalesGamificationProps> = ({ onClose }) => {
  const [currentUser] = useState<User>({
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

  const { user } = useAuth()
  const [pixKey, setPixKey] = useState('')
  const [amount, setAmount] = useState('2450.00')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRequestWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pixKey.trim()) {
      toast.error('Por favor, insira a sua chave PIX.')
      return
    }
    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Valor solicitado inválido.')
      return
    }

    setIsSubmitting(true)
    try {
      await addWithdrawalRequest({
        partnerId: user?.uid || 'mock-uid-123456',
        partnerName: user?.displayName || user?.email?.split('@')[0] || 'João Silva',
        amount: parsedAmount,
        pixKey: pixKey
      })
      toast.success('Solicitação de saque registrada no Firestore!')
      setPixKey('')
    } catch (error) {
      console.error('Erro ao enviar saque:', error)
      toast.error('Falha ao registrar saque no Firestore.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const [selectedTab, setSelectedTab] = useState<'overview' | 'missions' | 'leaderboard' | 'badges' | 'rewards'>('overview')

  const levels: Level[] = [
    { level: 1, title: "Aprendiz", xpRequired: 0, color: "text-gray-400", bgColor: "bg-gray-500/20" },
    { level: 5, title: "Vendedor", xpRequired: 2500, color: "text-green-400", bgColor: "bg-green-500/20" },
    { level: 10, title: "Especialista", xpRequired: 5000, color: "text-blue-400", bgColor: "bg-blue-500/20" },
    { level: 15, title: "Expert", xpRequired: 10000, color: "text-purple-400", bgColor: "bg-purple-500/20" },
    { level: 20, title: "Master", xpRequired: 20000, color: "text-orange-400", bgColor: "bg-orange-500/20" },
    { level: 25, title: "Lenda", xpRequired: 40000, color: "text-yellow-400", bgColor: "bg-yellow-500/20" }
  ]

  const leaderboard: LeaderboardUser[] = [
    { rank: 1, name: "Maria Santos", level: 18, xp: 15420, sales: 485000, badge: Crown, streak: 28 },
    { rank: 2, name: "Carlos Silva", level: 16, xp: 12350, sales: 398000, badge: Trophy, streak: 22 },
    { rank: 3, name: "Ana Costa", level: 15, xp: 11200, sales: 367000, badge: Medal, streak: 19 },
    { rank: 4, name: "João Silva", level: 12, xp: 8750, sales: 247500, badge: Star, streak: 15 },
    { rank: 5, name: "Roberto Lima", level: 11, xp: 7890, sales: 234000, badge: Target, streak: 12 }
  ]

  const missions: Mission[] = [
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

  const rewards: Reward[] = [
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

  const getCurrentLevelInfo = (): Level => {
    const currentLevel = levels.find(l => currentUser.level >= l.level && 
      (levels.find(next => next.level > l.level) ? currentUser.level < levels.find(next => next.level > l.level)!.level : true))
    return currentLevel || levels[0]
  }

  const getNextLevelInfo = (): Level | undefined => {
    const nextLevel = levels.find(l => l.level > currentUser.level)
    return nextLevel
  }

  const getMissionDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Fácil': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'Médio': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'Difícil': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getMissionTypeIcon = (type: string) => {
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
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Liquid Glass Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 pointer-events-none"></div>

      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl w-full max-w-7xl h-[90vh] flex flex-col shadow-[0_0_50px_rgba(56,189,248,0.15)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/40 backdrop-blur-xl z-20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <Trophy className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center">
                Portal SinergIA Partners
              </h2>
              <p className="text-emerald-200/60 text-sm">Dashboard de Afiliados. Rastreie links, comissões e repasses via Mercado Pago.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl flex items-center justify-center transition-all text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-white/10 bg-slate-900/20 relative z-20">
          <nav className="flex space-x-8 px-6 overflow-x-auto custom-scrollbar">
            {[
              { id: 'overview', label: 'Panorama Geral', icon: BarChart3 },
              { id: 'link', label: 'Meu Link Automático', icon: Flame },
              { id: 'leaderboard', label: 'Top Afiliados', icon: Trophy },
              { id: 'rewards', label: 'Carteira de Comissões', icon: DollarSign }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-all whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'border-sky-500 text-sky-400 font-bold drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                    : 'border-transparent text-slate-400 hover:text-white hover:border-white/20'
                }`}
                onClick={() => setSelectedTab(tab.id as any)}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10 custom-scrollbar">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 hover:border-indigo-500/50 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <div className="w-14 h-14 mx-auto mb-4 bg-indigo-500/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    <Trophy className="w-7 h-7 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-black text-white drop-shadow-md">#{currentUser.rank}</div>
                  <div className="text-sm text-indigo-200/60 mt-1 uppercase tracking-wider font-semibold">Ranking Geral</div>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/50 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <div className="w-14 h-14 mx-auto mb-4 bg-cyan-500/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Users className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-black text-white drop-shadow-md">1,420</div>
                  <div className="text-sm text-cyan-200/60 mt-1 uppercase tracking-wider font-semibold">Cliques no Link</div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <div className="w-14 h-14 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <DollarSign className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-white drop-shadow-md">R$ 2.450</div>
                  <div className="text-sm text-emerald-200/60 mt-1 uppercase tracking-wider font-semibold">Comissão Liberada</div>
                </div>

                <div className="bg-gradient-to-br from-fuchsia-500/10 to-transparent border border-fuchsia-500/20 hover:border-fuchsia-500/50 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]">
                  <div className="w-14 h-14 mx-auto mb-4 bg-fuchsia-500/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                    <CheckCircle className="w-7 h-7 text-fuchsia-400" />
                  </div>
                  <div className="text-3xl font-black text-white drop-shadow-md">32</div>
                  <div className="text-sm text-fuchsia-200/60 mt-1 uppercase tracking-wider font-semibold">Vendas Fechadas</div>
                </div>
              </div>

              {/* Level Progress */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sky-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center mb-6 relative z-10">
                  <ArrowUp className="w-5 h-5 mr-2 text-sky-400" />
                  <h3 className="text-xl font-bold text-white">Progresso de Nível</h3>
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-2xl ${currentLevelInfo.bgColor} flex items-center justify-center border border-white/10 shadow-lg`}>
                        <span className={`text-xl font-black ${currentLevelInfo.color}`}>{currentUser.level}</span>
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">{currentLevelInfo.title}</div>
                        <div className="text-slate-400 font-medium">{currentUser.xp.toLocaleString()} XP</div>
                      </div>
                    </div>
                    
                    {nextLevelInfo && (
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-white font-bold text-lg">{nextLevelInfo.title}</div>
                          <div className="text-slate-400 font-medium">{nextLevelInfo.xpRequired.toLocaleString()} XP</div>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl ${nextLevelInfo.bgColor} flex items-center justify-center border border-white/10 shadow-lg opacity-80`}>
                          <span className={`text-xl font-black ${nextLevelInfo.color}`}>{nextLevelInfo.level}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {nextLevelInfo && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-slate-400">Progresso para o próximo nível</span>
                        <span className="text-sky-300 drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]">{currentUser.xpToNext} XP restantes</span>
                      </div>
                      <Progress 
                        value={((nextLevelInfo.xpRequired - currentUser.xpToNext) / nextLevelInfo.xpRequired) * 100} 
                        className="h-3 bg-slate-800"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <div className="flex items-center mb-6">
                  <Award className="w-5 h-5 mr-2 text-sky-400" />
                  <h3 className="text-xl font-bold text-white">Conquistas Recentes</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentUser.badges.filter(badge => badge.earned).slice(-4).reverse().map((badge) => (
                    <div key={badge.id} className="bg-white/5 border border-white/10 hover:border-sky-500/30 rounded-2xl p-5 text-center transition-all group hover:bg-white/10">
                      <div className="w-12 h-12 mx-auto mb-3 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-500/20 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                        <badge.icon className="w-6 h-6 text-sky-400" />
                      </div>
                      <div className="text-white font-bold text-sm mb-1">{badge.name}</div>
                      <div className="text-slate-400 text-xs font-medium">{badge.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Affiliate Link Tab (Formerly Missions) */}
          {(selectedTab as any) === 'link' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center max-w-2xl mx-auto mb-10">
                 <h3 className="text-3xl font-black text-white mb-3">Seu Link Rastreável</h3>
                 <p className="text-slate-400">Toda máquina precisa de tração. Copie o seu link abaixo, espalhe nas suas redes, e toda conversão cai direto na sua conta do Mercado Pago.</p>
               </div>

               <div className="max-w-3xl mx-auto bg-slate-900/60 border border-emerald-500/30 rounded-[2rem] p-10 flex flex-col hover:bg-white/5 transition-colors relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                 <div className="absolute top-0 right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none"></div>
                 
                 <div className="relative z-10 mb-8">
                    <label className="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-4">Link de Checkout SinergIA</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                       <input 
                         type="text" 
                         readOnly 
                         value={`${typeof window !== 'undefined' ? window.location.origin : 'https://sinergia.business'}/solutions/?ref=${currentUser.name.toLowerCase().replace(' ', '_')}`}
                         className="flex-1 w-full h-16 bg-white/5 border border-white/20 rounded-xl px-4 font-mono text-white tracking-wider outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
                       />
                       <button className="h-16 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
                          Copiar Link
                       </button>
                    </div>
                 </div>

                 <div className="grid sm:grid-cols-2 gap-4 relative z-10 p-6 bg-slate-950/80 rounded-2xl border border-white/5">
                    <div>
                       <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Comissão Split Automático</div>
                       <div className="text-xl font-bold text-white">40% <span className="text-sm font-normal text-slate-400">por venda de Playbook</span></div>
                    </div>
                    <div>
                       <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Status do Split API</div>
                       <div className="inline-flex items-center text-emerald-400 text-sm font-bold">
                          <CheckCircle className="w-4 h-4 mr-2" /> Conta Conectada
                       </div>
                    </div>
                 </div>
               </div>
             </div>
          )}

          {/* Leaderboard Tab */}
          {selectedTab === 'leaderboard' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h3 className="text-3xl font-black text-white mb-3">Ranking Global</h3>
                <p className="text-slate-400">Prove seu valor na arena. Apenas os melhores vendedores chegam ao topo do Nexus Gamification.</p>
              </div>

              <div className="space-y-3 max-w-5xl mx-auto">
                {leaderboard.map((user, index) => (
                  <div key={user.rank} className={`border rounded-2xl p-4 transition-all hover:scale-[1.01] ${
                    user.name === currentUser.name 
                      ? 'bg-sky-500/10 border-sky-500/30 shadow-[0_0_20px_rgba(56,189,248,0.15)] relative overflow-hidden' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}>
                    {user.name === currentUser.name && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl drop-shadow-md ${
                          user.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-amber-50 shadow-[0_0_15px_rgba(251,191,36,0.5)]' :
                          user.rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-slate-50 shadow-[0_0_15px_rgba(203,213,225,0.4)]' :
                          user.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-50 shadow-[0_0_15px_rgba(249,115,22,0.4)]' :
                          'bg-white/5 text-slate-400 border border-white/10'
                        }`}>
                          #{user.rank}
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border bg-slate-900 ${
                            user.rank === 1 ? 'border-amber-500' :
                            user.rank === 2 ? 'border-slate-300' :
                            user.rank === 3 ? 'border-orange-500' :
                            'border-slate-700'
                          }`}>
                              <user.badge className={`w-5 h-5 ${
                                user.rank === 1 ? 'text-amber-500' :
                                user.rank === 2 ? 'text-slate-300' :
                                user.rank === 3 ? 'text-orange-500' :
                                'text-slate-500'
                              }`} />
                          </div>
                          <div>
                            <div className="text-white font-bold text-lg">{user.name} {user.name === currentUser.name && <span className="ml-2 text-xs bg-sky-500 text-sky-950 px-2 py-0.5 rounded font-black uppercase tracking-wider">Você</span>}</div>
                            <div className="text-slate-400 text-sm font-medium">Nível {user.level}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="hidden md:flex items-center space-x-12 px-6">
                        <div className="text-center">
                          <div className="text-xl font-black text-white">{user.xp.toLocaleString()}</div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">XP Total</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-black text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">R$ {(user.sales / 1000).toFixed(0)}K</div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Faturamento</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-black text-purple-400 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">{user.streak}🔥</div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Sequência</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badges Tab */}
          {selectedTab === 'badges' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h3 className="text-3xl font-black text-white mb-3">Suas Conquistas</h3>
                <p className="text-slate-400">Colecione insígnias e mostre seu status de veterano no sistema.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {currentUser.badges.map((badge) => (
                  <div key={badge.id} className={`text-center rounded-3xl p-8 border hover:-translate-y-2 transition-all duration-300 relative overflow-hidden ${
                    badge.earned 
                      ? 'bg-gradient-to-b from-white/10 to-transparent border-sky-500/30 hover:border-sky-500/60 shadow-[0_0_30px_rgba(56,189,248,0.1)] group' 
                      : 'bg-white/5 border-white/5 opacity-70 grayscale hover:grayscale-0'
                  }`}>
                    {badge.earned && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full mix-blend-screen filter blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}
                    
                    <div className={`w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center relative z-10 ${
                      badge.earned 
                        ? 'bg-gradient-to-br from-sky-400 to-cyan-600 shadow-[0_0_20px_rgba(56,189,248,0.4)]' 
                        : 'bg-slate-800 border border-slate-700'
                    }`}>
                      {badge.earned ? (
                        <badge.icon className="w-10 h-10 text-white drop-shadow-md" />
                      ) : (
                        <Lock className="w-8 h-8 text-slate-500" />
                      )}
                    </div>
                    
                    <h4 className={`font-bold text-lg mb-2 relative z-10 leading-tight ${badge.earned ? 'text-white' : 'text-slate-400'}`}>
                      {badge.name}
                    </h4>
                    
                    {badge.earned ? (
                      <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400 relative z-10">
                        Obtido: {badge.date}
                      </div>
                    ) : (
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 relative z-10">
                        Requisito pendente
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rewards / Withdraw Tab */}
          {selectedTab === 'rewards' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h3 className="text-3xl font-black text-white mb-3">Carteira de Comissões</h3>
                <p className="text-slate-400 mb-6">Solicite saques direto para a sua chave PIX através da API oficial do Mercado Pago conectada na plataforma.</p>
                
                <div className="inline-flex items-center bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                   <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center mr-3">
                     <DollarSign className="w-4 h-4 text-emerald-400" />
                   </div>
                   <div className="text-left">
                     <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Disponível para Saque</div>
                     <div className="text-2xl font-black text-white">R$ 2.450,00</div>
                   </div>
                </div>
              </div>

              <div className="max-w-md mx-auto relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                 <form onSubmit={handleRequestWithdrawal} className="relative bg-slate-900 border border-white/10 p-8 rounded-3xl flex flex-col w-full space-y-4">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                       <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center mb-4">
                       <h4 className="text-xl font-bold text-white mb-2">Pix Direto Mercado Pago</h4>
                       <p className="text-slate-400 text-sm">Transferência instantânea para a chave cadastrada. Livre de taxas.</p>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block text-left">Chave PIX</label>
                       <input 
                         type="text"
                         required
                         value={pixKey}
                         onChange={(e) => setPixKey(e.target.value)}
                         placeholder="CPF, E-mail, Celular ou Chave Aleatória"
                         className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-500/50 transition-colors"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block text-left">Valor do Saque (R$)</label>
                       <input 
                         type="number"
                         step="0.01"
                         required
                         value={amount}
                         onChange={(e) => setAmount(e.target.value)}
                         placeholder="2450.00"
                         className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white outline-none focus:border-emerald-500/50 transition-colors"
                       />
                    </div>
                    
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-lg rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center"
                    >
                      {isSubmitting ? 'Processando...' : 'Solicitar Transferência'}
                    </Button>
                 </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesGamification
