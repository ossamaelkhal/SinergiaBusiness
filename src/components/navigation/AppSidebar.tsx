'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import {
  LayoutDashboard, Users, Settings, BarChart3, FileText, Bot,
  Code2, Key, Webhook, Layers, ShieldCheck, Rocket, Sparkles,
  ChevronLeft, ChevronRight, Home, LogOut, CreditCard, BookOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: string
}

const NAV_CONFIG: Record<string, { title: string; items: NavItem[] }> = {
  admin: {
    title: 'Master Control',
    items: [
      { label: 'Telemetria', href: '/admin', icon: BarChart3 },
      { label: 'Gestão de Leads', href: '/admin/leads', icon: Users },
      { label: 'Embaixadores', href: '/hub/ambassador', icon: Rocket },
      { label: 'Tech Partners', href: '/hub/developer', icon: Code2 },
      { label: 'Cockpit Cliente', href: '/app/client', icon: LayoutDashboard },
      { label: 'Configurações', href: '/admin', icon: Settings },
    ]
  },
  client: {
    title: 'Cockpit',
    items: [
      { label: 'Visão Geral', href: '/app/client', icon: LayoutDashboard },
      { label: 'Playbooks', href: '/app/client', icon: BookOpen },
      { label: 'Gestão do Bot', href: '/app/client', icon: Bot },
      { label: 'Ver Planos', href: '/checkout', icon: CreditCard },
    ]
  },
  ambassador: {
    title: 'Partner Hub',
    items: [
      { label: 'Dashboard', href: '/hub/ambassador', icon: BarChart3 },
      { label: 'Materiais', href: '/partners', icon: FileText },
      { label: 'Programa', href: '/partners', icon: Rocket, badge: 'Info' },
    ]
  },
  agency: {
    title: 'Dev Console',
    items: [
      { label: 'Console', href: '/hub/developer', icon: Code2 },
      { label: 'API Keys', href: '/hub/developer', icon: Key },
      { label: 'Webhooks', href: '/hub/developer', icon: Webhook },
      { label: 'Tenants', href: '/hub/developer', icon: Layers },
    ]
  },
  prospect: {
    title: 'Descoberta',
    items: [
      { label: 'Sala VIP', href: '/app/discover', icon: Sparkles },
      { label: 'Ver Planos', href: '/checkout', icon: CreditCard },
      { label: 'Soluções', href: '/solutions', icon: Layers },
    ]
  }
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, userRole, logout } = useAuth()
  const pathname = usePathname()

  const role = userRole || 'prospect'
  const config = NAV_CONFIG[role] || NAV_CONFIG.prospect

  const handleLogout = async () => {
    try {
      await logout()
    } catch (e) { console.error(e) }
  }

  return (
    <aside 
      className={`fixed left-0 top-20 bottom-0 z-[90] bg-slate-950 border-r border-white/5 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[60px]' : 'w-[260px]'
      }`}
    >
      {/* Sidebar Header */}
      <div className={`px-4 py-5 border-b border-white/5 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div>
            <div className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em]">{config.title}</div>
            <div className="text-[10px] text-slate-600 mt-0.5 uppercase tracking-wider">{role}</div>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-md bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-emerald-500/30 transition-all"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {config.items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.label}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              } ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-300'}`} />
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="ml-auto px-1.5 py-0.5 text-[9px] font-black bg-indigo-500/20 text-indigo-400 rounded uppercase">{item.badge}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className={`border-t border-white/5 p-3 space-y-2 ${collapsed ? 'px-1.5' : ''}`}>
        <Link href="/" title="Voltar ao Site">
          <Button variant="ghost" className={`w-full justify-start text-slate-600 hover:text-white hover:bg-white/5 gap-2 ${collapsed ? 'justify-center px-0' : ''}`}>
            <Home className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="text-xs">Voltar ao Site</span>}
          </Button>
        </Link>
        {user && (
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className={`w-full justify-start text-rose-500/60 hover:text-rose-400 hover:bg-rose-500/5 gap-2 ${collapsed ? 'justify-center px-0' : ''}`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="text-xs">Sair</span>}
          </Button>
        )}
      </div>
    </aside>
  )
}
