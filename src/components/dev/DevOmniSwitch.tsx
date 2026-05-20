'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { 
  Settings2, UserCircle2, Briefcase, 
  Code2, Users, LayoutDashboard, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { User } from 'firebase/auth'

export function DevOmniSwitch() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { user, userRole, loading } = useAuth()
  const router = useRouter()

  // Evitar hydration mismatch renderizando apenas no client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Só exibir o OmniSwitch se estiver local ou se for explicitamente admin
  // Simplificado para DEV MOCK sempre aparecer
  const isDevMock = typeof window !== 'undefined' && localStorage.getItem('SINERGIA_DEV_MOCK_ROLE') !== null;
  const showOmniSwitch = isClient && (process.env.NODE_ENV === 'development' || isDevMock || userRole === 'admin')

  if (!showOmniSwitch) return null

  // Função mágica de teletransporte
  const handleTeleport = async (role: string, path: string) => {
    if (typeof window !== 'undefined') {
      const email = `test+${role}@sinergia.com`
      localStorage.setItem('SINERGIA_DEV_MOCK_ROLE', role)
      localStorage.setItem('SINERGIA_DEV_MOCK_EMAIL', email)
      
      toast.success(`Teleportando para Nave: ${role.toUpperCase()} 🚀`)
      
      // Forçar recarregamento brusco para reconstruir os providers
      window.location.href = path
    }
  }

  const clearMock = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('SINERGIA_DEV_MOCK_ROLE')
      localStorage.removeItem('SINERGIA_DEV_MOCK_EMAIL')
      window.location.href = '/'
    }
  }

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-2.5rem)]'}`}>
      <div className="bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)] rounded-2xl overflow-hidden flex flex-col w-[340px] md:w-[600px]">
        
        {/* Toggle Bar */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-10 flex items-center justify-between px-4 bg-slate-950/50 hover:bg-slate-800/80 transition-colors border-b border-white/5"
        >
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">OmniSwitch Dev</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full uppercase border border-white/10">Atual: {userRole || 'Visitante'}</span>
            {isOpen ? <ChevronDown className="w-4 h-4 text-emerald-500" /> : <ChevronUp className="w-4 h-4 text-emerald-500" />}
          </div>
        </button>

        {/* Action Panel */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          
          <Button 
            onClick={() => handleTeleport('prospect', '/app/discover')}
            variant="outline" 
            className="h-auto py-3 px-2 flex flex-col gap-2 bg-slate-800/50 hover:bg-slate-700 border-white/10 text-slate-300 hover:text-white"
          >
            <UserCircle2 className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Prospect VIP</span>
          </Button>

          <Button 
            onClick={() => handleTeleport('client', '/app/client')}
            variant="outline" 
            className="h-auto py-3 px-2 flex flex-col gap-2 bg-slate-800/50 hover:bg-slate-700 border-white/10 text-slate-300 hover:text-white"
          >
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Dashboard Client</span>
          </Button>

          <Button 
            onClick={() => handleTeleport('ambassador', '/hub/ambassador')}
            variant="outline" 
            className="h-auto py-3 px-2 flex flex-col gap-2 bg-slate-800/50 hover:bg-slate-700 border-white/10 text-slate-300 hover:text-white"
          >
            <Users className="w-5 h-5 text-cyan-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Embaixador Hub</span>
          </Button>

          <Button 
            onClick={() => handleTeleport('agency', '/hub/developer')}
            variant="outline" 
            className="h-auto py-3 px-2 flex flex-col gap-2 bg-slate-800/50 hover:bg-slate-700 border-white/10 text-slate-300 hover:text-white"
          >
            <Code2 className="w-5 h-5 text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Developer API</span>
          </Button>
          
        </div>

        <div className="px-4 pb-4 pt-2 border-t border-white/5 flex gap-2">
           <Button 
            onClick={() => handleTeleport('admin', '/admin')}
            variant="default" 
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold h-8 text-[10px] uppercase tracking-widest shadow-none"
          >
            <LayoutDashboard className="w-3 h-3 mr-1" /> Forçar Admin
          </Button>
          <Button 
            onClick={clearMock}
            variant="ghost" 
            className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white h-8 text-[10px] uppercase px-3"
          >
            <RefreshCw className="w-3 h-3" />
          </Button>
        </div>

      </div>
    </div>
  )
}
