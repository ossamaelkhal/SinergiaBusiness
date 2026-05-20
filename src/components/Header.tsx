'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { 
  Menu, X, Sparkles, LayoutDashboard, Rocket, 
  Stethoscope, Scale, ShoppingCart, GraduationCap, Building2, LogOut
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getAllNiches } from '@/data/niches'

export function Header() {
  const { user, userRole, logout, loading } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
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

  // Pre-loading skeleton style
  if (loading) {
    return (
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="w-32 h-8 bg-slate-800 animate-pulse rounded" />
          <div className="w-10 h-10 bg-slate-800 animate-pulse rounded-full" />
        </div>
      </header>
    )
  }

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo SinergIA */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-widest uppercase">Sinerg<span className="text-emerald-400">IA</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              Nossa Visão
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1 focus:outline-none">
                  Soluções Nichadas
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 bg-slate-900 border border-slate-800 uppercase p-2 mt-2 shadow-2xl" align="start">
                <div className="text-xs font-black text-slate-500 px-2 py-2 tracking-widest">Sistemas Feitos para:</div>
                {getAllNiches().map((niche) => {
                  const NicheIcon = niche.icon
                  return (
                    <Link key={niche.slug} href={`/solutions/${niche.slug}`}>
                      <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 text-slate-300 focus:text-white px-3 py-3 rounded-md flex gap-3 group">
                        <NicheIcon className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-bold">{niche.shortTitle}</div>
                          <div className="text-[10px] text-slate-500 lowercase truncate max-w-[180px]">{niche.subtitle}</div>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/partners" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              Programa de Embaixadores
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 hover:bg-slate-800 rounded-lg text-white font-bold gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs border border-slate-600">
                       {user.email?.charAt(0).toUpperCase()}
                    </div>
                    Sua Conta
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-900 border-slate-800 p-2 shadow-2xl" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2 border-b border-white/5 mb-2">
                    <p className="text-sm font-bold text-white truncate">{user.displayName || user.email}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-black">NAVE: {userRole || 'PROSPECT'}</p>
                  </div>
                  
                  <Link href={getDashboardRoute()}>
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 text-emerald-400 focus:text-emerald-300 focus:bg-slate-800 py-3 gap-2 rounded-lg font-bold">
                      <LayoutDashboard className="w-4 h-4" /> Acessar Meu Painel
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/admin">
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 text-amber-500 focus:text-amber-400 focus:bg-slate-800 py-3 gap-2 rounded-lg">
                      Configurações Subordinadas
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator className="bg-white/10 my-2" />
                  
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-rose-400 focus:bg-rose-500/10 focus:text-rose-300 py-3 gap-2 rounded-lg">
                    <LogOut className="w-4 h-4" /> Finalizar Sessão
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10 font-bold tracking-wide">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-white hover:bg-slate-200 text-slate-950 font-black tracking-tight rounded-full px-6 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all">
                    Iniciar Contrato
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-white/10 shadow-2xl">
          <nav className="flex flex-col p-4 space-y-4">
            <Link onClick={() => setMobileMenuOpen(false)} href="/" className="text-slate-300 hover:text-white font-bold p-2">A Visão B2B</Link>
            <div className="text-slate-500 font-bold uppercase text-xs p-2 tracking-widest mt-4 border-t border-white/5 pt-4">Nossas Soluções</div>
            {getAllNiches().map((niche) => {
              const NicheIcon = niche.icon
              return (
                <Link 
                  key={niche.slug}
                  onClick={() => setMobileMenuOpen(false)} 
                  href={`/solutions/${niche.slug}`} 
                  className="text-slate-300 pl-4 py-2 flex items-center gap-2"
                >
                  <NicheIcon className="w-4 h-4 text-emerald-500"/> 
                  {niche.shortTitle}
                </Link>
              )
            })}
            <Link onClick={() => setMobileMenuOpen(false)} href="/partners" className="text-slate-300 font-bold p-2 mt-4 border-t border-white/5 pt-4">Programa Parceiros Tech</Link>
            
            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-3">
              {user ? (
                <>
                   <Link onClick={() => setMobileMenuOpen(false)} href={getDashboardRoute()}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12">
                      Acessar Meu Painel
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full border-slate-700 text-rose-400 hover:bg-slate-800 h-12" onClick={handleLogout}>
                    Desconectar
                  </Button>
                </>
              ) : (
                <>
                  <Link onClick={() => setMobileMenuOpen(false)} href="/login">
                    <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 h-12">
                      Fazer Login
                    </Button>
                  </Link>
                  <Link onClick={() => setMobileMenuOpen(false)} href="/signup">
                    <Button className="w-full bg-white text-slate-900 font-bold h-12">
                      Contratar Inteligência
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
