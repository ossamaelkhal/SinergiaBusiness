'use client'

import React from 'react'
import { Link2, Network, FolderKanban, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuraAcademy() {
    return (
        <section id="academy" className="w-full py-24 bg-slate-950/80 relative border-y border-white/5">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5">
                        <Network className="h-4 w-4 text-indigo-400" />
                        <span className="text-xs font-bold text-indigo-400 tracking-wide uppercase">
                            Rede de Distribuidores
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                        SinergIA Partners Hub
                    </h2>
                    <p className="max-w-[700px] text-slate-400 md:text-xl font-medium">
                        Não compre apenas o software. Torne-se um arquiteto de vendas. Aprenda as minúcias e ganhe fatias de lucro revendendo as engrenagens que mudaram seu negócio.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all text-center flex flex-col items-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                        <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative z-10">
                            <FolderKanban className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 relative z-10">Playbook Repositório</h3>
                        <p className="text-slate-400 mb-0 relative z-10">
                            Acesso vitalício à livraria de prompts e cópias JSON do n8n para importar nas máquinas dos seus clientes num instante.
                        </p>
                    </div>

                    <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all text-center flex flex-col items-center">
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                        <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative z-10">
                            <Link2 className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 relative z-10">Link Rastreado Automático</h3>
                        <p className="text-slate-400 mb-0 relative z-10">
                            Cada afiliado gera links únicos. O sistema captura a atribuição e joga a fatia da comissão na sua esteira de saque.
                        </p>
                    </div>

                    <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all text-center flex flex-col items-center">
                        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                        <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative z-10">
                            <Users className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 relative z-10">Oasis Comunitário</h3>
                        <p className="text-slate-400 mb-0 relative z-10">
                            Junte-se ao canal privado e discuta otimizações diretamente com nossa diretoria executiva e clientes-chave.
                        </p>
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <Link href="#training" className="block w-full sm:w-auto">
                        <Button className="w-full sm:w-auto px-10 h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:scale-105">
                            Quero me tornar SinergIA Partner
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
