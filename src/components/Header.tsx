'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { 
  Menu, X, Sparkles, LayoutDashboard, LogOut, ChevronDown, Check,
  BookOpen, Users, Code2
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
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Pre-loading skeleton style
  if (loading) {
    return (
      <header className="fixed top-0 left-0 w-full z-[100] py-4">
        <div className="max-w-5xl mx-auto bg-slate-950/80 border border-white/5 backdrop-blur-md rounded-full px-6 py-4 flex items-center justify-between shadow-2xl">
          <div className="w-32 h-6 bg-slate-800 animate-pulse rounded-full" />
          <div className="w-24 h-6 bg-slate-800 animate-pulse rounded-full" />
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-4 px-4 md:px-6">
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
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 hover:bg-white/5 rounded-full text-white font-bold gap-2 px-3 border border-white/5 hover:border-white/10 transition-all">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                       {user.email?.charAt(0).toUpperCase()}
                    </div>
                    Área do Cliente
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 bg-slate-950/95 border border-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl mt-2" align="end">
                  <div className="flex flex-col space-y-1 p-3 border-b border-white/5 mb-2">
                    <p className="text-xs font-bold text-white truncate">{user.displayName || user.email}</p>
                    <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded w-max mt-1">
                      {userRole || 'PROSPECT'}
                    </p>
                  </div>
                  
                  <Link href={getDashboardRoute()}>
                    <DropdownMenuItem className="cursor-pointer hover:bg-emerald-500/10 text-emerald-400 focus:text-emerald-300 focus:bg-emerald-500/10 py-3 gap-2 rounded-xl font-bold transition-all">
                      <LayoutDashboard className="w-4 h-4" /> Acessar Meu Painel
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator className="bg-white/5 my-2" />
                  
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-rose-400 hover:bg-rose-500/10 focus:bg-rose-500/10 focus:text-rose-300 py-3 gap-2 rounded-xl transition-all">
                    <LogOut className="w-4 h-4" /> Finalizar Sessão
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-tight rounded-full px-6 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_35px_rgba(52,211,153,0.5)] transition-all duration-300">
                  Área do Cliente
                </Button>
              </Link>
            )}
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
            <Link onClick={() => setMobileMenuOpen(false)} href="/partners" className="text-slate-200 hover:text-white font-bold p-2 transition-colors">Seja um Parceiro</Link>
            
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
              {user ? (
                <>
                   <Link onClick={() => setMobileMenuOpen(false)} href={getDashboardRoute()} className="w-full">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl transition-all">
                      Acessar Meu Painel
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full border-white/10 text-rose-400 hover:bg-rose-500/10 h-12 rounded-xl transition-all" onClick={handleLogout}>
                    Desconectar
                  </Button>
                </>
              ) : (
                <>
                  <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="w-full">
                    <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 h-12 rounded-xl transition-all">
                      Área do Cliente
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
