'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { 
  Menu, X, Sparkles, LayoutDashboard, LogOut, ChevronDown, Check,
  BookOpen, Users, Code2, Link2, GraduationCap
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getAllNiches } from '@/data/niches'
import { getCurrentLead, getCurrentPartner } from '@/actions/leads'
import { toast } from 'sonner'

export function Header() {
  const { user, userRole, logout, loading } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Hydration profiling states to prevent layout shift (CLS)
  const [leadInfo, setLeadInfo] = useState<{ companyName: string, archetype: string } | null>(null)
  const [partnerInfo, setPartnerInfo] = useState<{ email: string, name: string, agencyName: string, partnerToken: string } | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Profile data fetching inside client context
  useEffect(() => {
    if (!user) {
      setLeadInfo(null)
      setPartnerInfo(null)
      return
    }

    const fetchProfileData = async () => {
      setLoadingProfile(true)
      try {
        if (userRole === 'client') {
          const leadData = await getCurrentLead()
          setLeadInfo(leadData)
        } else if (userRole === 'ambassador' || userRole === 'agency') {
          const partnerData = await getCurrentPartner()
          setPartnerInfo(partnerData)
        }
      } catch (error) {
        console.error("Erro ao carregar perfil no Header:", error)
      } finally {
        setLoadingProfile(false)
      }
    }

    fetchProfileData()
  }, [user, userRole])

  const handleLogout = async () => {
    try {
      await logout()
      setMobileMenuOpen(false)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const getDashboardRoute = () => {
    if (userRole === 'admin') return '/admin'
    if (userRole === 'client') return '/app/client'
    if (userRole === 'ambassador') return '/hub/ambassador'
    if (userRole === 'agency') return '/hub/developer'
    return '/app/discover'
  }

  const copyLink = () => {
    if (partnerInfo?.partnerToken) {
      const url = `${window.location.origin}/?aff=${partnerInfo.partnerToken}`
      navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link de Indicação copiado!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Pre-loading skeleton style to prevent CLS (Layout Shift)
  if (loading || loadingProfile) {
    return (
      <header className="fixed top-0 left-0 w-full z-[100] py-4 px-4 transform-gpu will-change-transform">
        <div className="max-w-5xl mx-auto bg-slate-950/80 border border-white/5 backdrop-blur-md rounded-full px-6 py-4 flex items-center justify-between shadow-2xl">
          {/* Logo Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-slate-900 animate-pulse rounded-xl" />
            <div className="w-24 h-5 bg-slate-900 animate-pulse rounded-full" />
          </div>
          {/* Nav Skeleton */}
          <div className="hidden md:flex items-center gap-6">
            <div className="w-16 h-4 bg-slate-900 animate-pulse rounded-full" />
            <div className="w-24 h-4 bg-slate-900 animate-pulse rounded-full" />
            <div className="w-16 h-4 bg-slate-900 animate-pulse rounded-full" />
          </div>
          {/* CTA Skeleton */}
          <div className="w-36 h-9 bg-slate-900 animate-pulse rounded-full" />
        </div>
      </header>
    )
  }

  const renderNavLinks = () => {
    if (!user || userRole === 'prospect') {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-1 focus:outline-none tracking-wide">
                Soluções <ChevronDown className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-slate-950/95 border border-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl mt-2" align="center">
              <div className="text-[10px] font-black text-slate-500 px-3 py-2 tracking-widest uppercase">Operação Cognitiva por Setor</div>
              <div className="grid gap-1 mt-1">
                {getAllNiches().map((niche) => {
                  const NicheIcon = niche.icon
                  return (
                    <Link key={niche.slug} href={`/solutions/${niche.slug}`}>
                      <DropdownMenuItem className="cursor-pointer hover:bg-white/5 focus:bg-white/5 text-slate-300 focus:text-white px-3 py-2.5 rounded-xl flex gap-3 group transition-all">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all shrink-0">
                          <NicheIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs leading-tight text-white tracking-wide">{niche.shortTitle}</div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5 font-light">{niche.subtitle}</div>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                  )
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/partners" className="text-sm font-bold text-slate-300 hover:text-white transition-colors tracking-wide">
            Seja um Parceiro
          </Link>
          <Link href="/partners#simulador" className="text-sm font-bold text-slate-300 hover:text-white transition-colors tracking-wide">
            Preços
          </Link>
        </>
      )
    }

    if (userRole === 'client') {
      return (
        <>
          <Link href="/app/client" className="text-sm font-bold text-slate-300 hover:text-white transition-colors tracking-wide flex items-center gap-1.5">
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            Meu Cockpit
          </Link>
          <Link href="/app/client/settings" className="text-sm font-bold text-slate-300 hover:text-white transition-colors tracking-wide flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" />
            Suporte do Artesão
          </Link>
        </>
      )
    }

    if (userRole === 'ambassador' || userRole === 'agency') {
      const dashboardRoute = userRole === 'agency' ? '/hub/developer' : '/hub/ambassador';
      return (
        <>
          <Link href={dashboardRoute} className="text-sm font-bold text-slate-300 hover:text-white transition-colors tracking-wide flex items-center gap-1.5">
            <Users className="w-4 h-4 text-cyan-400" />
            Nexus Hub
          </Link>
          <Link href={`${dashboardRoute}#carteira`} className="text-sm font-bold text-slate-300 hover:text-white transition-colors tracking-wide flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Minha Carteira
          </Link>
          <Link href="/partners" className="text-sm font-bold text-slate-300 hover:text-white transition-colors tracking-wide flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            Central Academy
          </Link>
        </>
      )
    }

    return null
  }

  const renderCTA = () => {
    if (!user || userRole === 'prospect') {
      return (
        <Link href="/apply">
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-tight rounded-full px-6 shadow-none transition-all duration-300">
            Auditar Meu Índice de Fricção
          </Button>
        </Link>
      )
    }

    if (userRole === 'client') {
      let neonShadow = 'shadow-neon-pacto'
      let borderColor = 'border-emerald-500/30'
      let textColor = 'text-emerald-400'
      
      if (leadInfo?.archetype === 'Oprimida por Burocracia') {
        neonShadow = 'shadow-neon-friction'
        borderColor = 'border-rose-500/30'
        textColor = 'text-rose-400'
      } else if (leadInfo?.archetype === 'Desconectada do Cliente') {
        neonShadow = 'shadow-neon-identity'
        borderColor = 'border-fuchsia-500/30'
        textColor = 'text-fuchsia-400'
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={`h-11 hover:bg-white/5 rounded-full text-white font-bold gap-2.5 px-4 border ${borderColor} ${neonShadow} backdrop-blur-md transition-all transform-gpu will-change-transform`}>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-[10px] font-black text-slate-950">
                 {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className={`text-xs ${textColor} font-black truncate max-w-[140px]`}>
                {leadInfo?.companyName || user.displayName || 'Artesão'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 bg-slate-950/95 border border-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl mt-2" align="end">
            <div className="flex flex-col space-y-1 p-3 border-b border-white/5 mb-2">
              <p className="text-xs font-bold text-white truncate">{user.displayName || user.email}</p>
              <p className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded w-max mt-1 ${
                leadInfo?.archetype === 'Oprimida por Burocracia' 
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                  : leadInfo?.archetype === 'Desconectada do Cliente'
                  ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {leadInfo?.archetype || 'Cliente SinergIA'}
              </p>
            </div>
            
            <Link href="/app/client">
              <DropdownMenuItem className="cursor-pointer hover:bg-emerald-500/10 text-emerald-400 focus:text-emerald-300 focus:bg-emerald-500/10 py-3 gap-2 rounded-xl font-bold transition-all">
                <LayoutDashboard className="w-4 h-4" /> Acessar Cockpit
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator className="bg-white/5 my-2" />
            
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-rose-400 hover:bg-rose-500/10 focus:bg-rose-500/10 focus:text-rose-300 py-3 gap-2 rounded-xl transition-all">
              <LogOut className="w-4 h-4" /> Finalizar Sessão
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    if (userRole === 'ambassador' || userRole === 'agency') {
      return (
        <div className="flex items-center gap-3">
          <Button 
            onClick={copyLink} 
            className="bg-fuchsia-600/10 hover:bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/30 shadow-neon-identity rounded-full px-5 transition-all text-xs font-bold gap-1.5 transform-gpu will-change-transform"
          >
            <Link2 className="w-3.5 h-3.5" />
            {copied ? "Copiado!" : "Copiar Link Nexus"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 hover:bg-white/5 rounded-full text-white p-0 border border-white/10 transition-all">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-[10px] font-black text-slate-950">
                   {user.email?.charAt(0).toUpperCase()}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 bg-slate-950/95 border border-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl mt-2" align="end">
              <div className="flex flex-col space-y-1 p-3 border-b border-white/5 mb-2">
                <p className="text-xs font-bold text-white truncate">{partnerInfo?.name || user.displayName || user.email}</p>
                <p className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded w-max mt-1">
                  PARCEIRO NEXUS
                </p>
              </div>

              <Link href={userRole === 'agency' ? '/hub/developer' : '/hub/ambassador'}>
                <DropdownMenuItem className="cursor-pointer hover:bg-cyan-500/10 text-cyan-400 focus:text-cyan-300 focus:bg-cyan-500/10 py-3 gap-2 rounded-xl font-bold transition-all">
                  <LayoutDashboard className="w-4 h-4" /> Acessar Nexus Hub
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator className="bg-white/5 my-2" />

              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-rose-400 hover:bg-rose-500/10 focus:bg-rose-500/10 focus:text-rose-300 py-3 gap-2 rounded-xl transition-all">
                <LogOut className="w-4 h-4" /> Finalizar Sessão
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }

    return null
  }

  const renderMobileLinks = () => {
    if (!user || userRole === 'prospect') {
      return (
        <>
          <Link onClick={() => setMobileMenuOpen(false)} href="/partners" className="text-slate-200 hover:text-white font-bold p-2 transition-colors">Seja um Parceiro</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/partners#simulador" className="text-slate-200 hover:text-white font-bold p-2 transition-colors">Preços</Link>
          
          <div className="text-slate-500 font-black uppercase text-[9px] px-2 tracking-widest pt-4 border-t border-white/5">Setores de IA</div>
          <div className="grid grid-cols-2 gap-2 pl-2">
            {getAllNiches().map((niche) => {
              const NicheIcon = niche.icon
              return (
                <Link 
                  key={niche.slug}
                  onClick={() => setMobileMenuOpen(false)} 
                  href={`/solutions/${niche.slug}`} 
                  className="text-slate-300 py-1.5 flex items-center gap-2 text-xs font-bold hover:text-white"
                >
                  <NicheIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0"/> 
                  {niche.shortTitle}
                </Link>
              )
            })}
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-3">
            <Link onClick={() => setMobileMenuOpen(false)} href="/apply" className="w-full">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl transition-all">
                Auditar Meu Índice de Fricção
              </Button>
            </Link>
          </div>
        </>
      )
    }

    if (userRole === 'client') {
      return (
        <>
          <Link onClick={() => setMobileMenuOpen(false)} href="/app/client" className="text-slate-200 hover:text-white font-bold p-2 transition-colors flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            Meu Cockpit
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/app/client/settings" className="text-slate-200 hover:text-white font-bold p-2 transition-colors flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            Suporte do Artesão
          </Link>

          <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-3">
            <div className={`p-4 rounded-xl border bg-slate-900/50 backdrop-blur-md flex items-center gap-3 ${
              leadInfo?.archetype === 'Oprimida por Burocracia' 
                ? 'border-rose-500/20 shadow-neon-friction' 
                : leadInfo?.archetype === 'Desconectada do Cliente'
                ? 'border-fuchsia-500/20 shadow-neon-identity'
                : 'border-emerald-500/20 shadow-neon-pacto'
            }`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xs font-black text-slate-950">
                 {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-extrabold text-white truncate">{leadInfo?.companyName || user.displayName || 'Artesão'}</div>
                <div className="text-[9px] text-slate-400 font-light mt-0.5">{leadInfo?.archetype || 'Cliente'}</div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full border-white/10 text-rose-400 hover:bg-rose-500/10 h-12 rounded-xl transition-all" onClick={handleLogout}>
              Desconectar
            </Button>
          </div>
        </>
      )
    }

    if (userRole === 'ambassador' || userRole === 'agency') {
      const dashboardRoute = userRole === 'agency' ? '/hub/developer' : '/hub/ambassador';
      return (
        <>
          <Link onClick={() => setMobileMenuOpen(false)} href={dashboardRoute} className="text-slate-200 hover:text-white font-bold p-2 transition-colors flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            Nexus Hub
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href={`${dashboardRoute}#carteira`} className="text-slate-200 hover:text-white font-bold p-2 transition-colors flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Minha Carteira
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/partners" className="text-slate-200 hover:text-white font-bold p-2 transition-colors flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            Central Academy
          </Link>

          <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-3">
            <Button 
              onClick={copyLink} 
              className="w-full bg-fuchsia-600/10 hover:bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/30 shadow-neon-identity rounded-xl h-12 transition-all font-bold gap-1.5"
            >
              <Link2 className="w-4 h-4" />
              {copied ? "Link Copiado!" : "Copiar Link Nexus"}
            </Button>
            
            <Button variant="outline" className="w-full border-white/10 text-rose-400 hover:bg-rose-500/10 h-12 rounded-xl transition-all" onClick={handleLogout}>
              Desconectar
            </Button>
          </div>
        </>
      )
    }

    return null
  }

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-4 px-4 md:px-6 transform-gpu will-change-transform">
      <div className={`mx-auto transition-all duration-500 ${
        isScrolled 
          ? 'max-w-5xl bg-slate-950/75 border border-white/10 backdrop-blur-xl rounded-full shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(16,185,129,0.12)]' 
          : 'max-w-7xl bg-slate-950/40 border border-white/5 backdrop-blur-md rounded-2xl md:rounded-3xl'
      }`}>
        <div className={`flex items-center justify-between transition-all duration-500 px-4 md:px-8 ${
          isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
        }`}>
          
          {/* Logo SinergIA */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="text-xl md:text-2xl font-black text-white tracking-wider uppercase">
              Sinerg<span className="text-emerald-400">IA</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {renderNavLinks()}
          </nav>

          {/* Desktop Auth Buttons / CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {renderCTA()}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-slate-950/95 border border-white/10 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden animate-in slide-in-from-top-5 duration-300">
          <nav className="flex flex-col p-6 space-y-4">
            {renderMobileLinks()}
          </nav>
        </div>
      )}
    </header>
  )
}
