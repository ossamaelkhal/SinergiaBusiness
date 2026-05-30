import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAllNiches } from "@/data/niches"
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react"

export const metadata = {
    title: "Soluções Especializadas por Nicho | SinergIA",
    description: "Plataformas e Agentes de Inteligência Artificial desenhados para as maiores dores do seu setor.",
}

export default function SolutionsHubPage() {
    const niches = getAllNiches()

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30 overflow-hidden relative">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
                <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-fuchsia-500/10 blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 mb-6 backdrop-blur-md">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>Inteligência de Negócio Direcionada</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500">
                        Soluções por <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nicho</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-light">
                        Não entregamos ferramentas genéricas. Desenhamos a arquitetura de IA exata para curar as maiores dores operacionais e financeiras do seu setor específico.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {niches.map((niche, i) => {
                        const Icon = niche.icon
                        
                        // Map specific colors for the glow and borders
                        const colorMap: Record<string, string> = {
                            emerald: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
                            indigo: "group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
                            fuchsia: "group-hover:border-fuchsia-500/50 group-hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]",
                            amber: "group-hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
                            cyan: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
                            rose: "group-hover:border-rose-500/50 group-hover:shadow-[0_0_30px_rgba(225,29,72,0.15)]",
                        }
                        
                        const iconBgMap: Record<string, string> = {
                            emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                            indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                            fuchsia: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
                            amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                            cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
                            rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
                        }

                        // Determine grid placement for visual variety
                        const isLarge = i === 0 || i === 3
                        
                        return (
                            <Link 
                                href={`/solutions/${niche.slug}`} 
                                key={niche.slug}
                                className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${colorMap[niche.color]} ${isLarge ? 'md:col-span-2' : ''}`}
                            >
                                {/* Hover Glow Effect inside card */}
                                <div className={`absolute -inset-px opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl ${
                                    niche.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-transparent' :
                                    niche.color === 'indigo' ? 'bg-gradient-to-r from-indigo-500 to-transparent' :
                                    niche.color === 'fuchsia' ? 'bg-gradient-to-r from-fuchsia-500 to-transparent' :
                                    niche.color === 'amber' ? 'bg-gradient-to-r from-amber-500 to-transparent' :
                                    niche.color === 'cyan' ? 'bg-gradient-to-r from-cyan-500 to-transparent' :
                                    'bg-gradient-to-r from-rose-500 to-transparent'
                                }`} />

                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${iconBgMap[niche.color]} shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 border border-white/10">
                                            <ArrowRight className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                        {niche.shortTitle}
                                    </h3>
                                    
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                                        {niche.subtitle}
                                    </p>
                                    
                                    <div className="flex items-center gap-2 mt-auto">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">Ver Soluções</span>
                                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

