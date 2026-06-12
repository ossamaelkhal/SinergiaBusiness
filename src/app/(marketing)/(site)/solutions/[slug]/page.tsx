import { getNicheBySlug, getAllNiches } from '@/data/niches';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, AlertTriangle, CheckCircle2, ChevronRight, 
  PlayCircle, ShieldCheck, Sparkles, Zap, Shield, Check, Lock, HelpCircle, Clock
} from 'lucide-react';
import { NicheCTAButton } from '@/components/features/solutions/NicheCTAButton';
import { ROICalculator } from '@/components/sections/ROICalculator';
import SinergiaPricingOS from '@/components/sections/SinergiaPricingOS';
import { NichePersonalizer } from '@/components/features/solutions/NichePersonalizer';


const formatHumanLatency = (seconds: number): string => {
  if (seconds >= 3600) {
    const hours = seconds / 3600;
    return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }
  if (seconds >= 60) {
    const minutes = seconds / 60;
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }
  return `${seconds}s`;
};



export function generateStaticParams() {
  const niches = getAllNiches();
  return niches.map((niche) => ({
    slug: niche.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const niche = getNicheBySlug(params.slug);
  if (!niche) return { title: 'Solução não encontrada | SinergIA' };
  
  return {
    title: `SinergIA OS | Automação Cognitiva para ${niche.shortTitle}`,
    description: niche.subtitle,
  };
}

export default function NicheSolutionPage({ 
  params, 
  searchParams 
}: { 
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const niche = getNicheBySlug(params.slug);

  // Helper to preserve active query parameters on simulator redirection
  const buildSimulatorUrl = () => {
    const query = new URLSearchParams();
    query.set('niche', params.slug);
    
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, val]) => {
        if (val !== undefined && key !== 'niche') {
          if (Array.isArray(val)) {
            val.forEach(v => query.append(key, v));
          } else {
            query.set(key, val);
          }
        }
      });
    }
    
    return `/demo/flow-simulator?${query.toString()}`;
  };

  if (!niche) {
    notFound();
  }

  const Icon = niche.icon;

  const hooksList = [
    {
      badge: "O Piloto Automático",
      title: niche.hooks.pilotoAutomatico.title,
      description: niche.hooks.pilotoAutomatico.description,
      impact: "Execução Autônoma 24/7",
      features: ["Qualificação Conversacional no WhatsApp", "Sincronização Ativa com ERP/CRM", "Disparo Imediato de Ações"]
    },
    {
      badge: "O Resgate Ativo",
      title: niche.hooks.resgateAtivo.title,
      description: niche.hooks.resgateAtivo.description,
      impact: "Recuperação de Receita Perdida",
      features: ["Varredura Preventiva de Inadimplência", "Reengajamento Amigável de Inativos", "Regulagem de Cobrança Sem Fricção"]
    },
    {
      badge: "O Backoffice",
      title: niche.hooks.backoffice.title,
      description: niche.hooks.backoffice.description,
      impact: "Blindagem Operacional Sem Erros",
      features: ["Visão Computacional e OCR Avançado", "Validação Sefaz e Regras de Negócio", "Eliminação Completa de Gargalos Manuais"]
    }
  ];

  // Color mapping utilities
  const bgMaps: Record<string, string> = {
    emerald: "bg-emerald-500/10",
    indigo: "bg-indigo-500/10",
    fuchsia: "bg-fuchsia-500/10",
    amber: "bg-amber-500/10",
    cyan: "bg-cyan-500/10",
    rose: "bg-rose-500/10",
  };

  const textMaps: Record<string, string> = {
    emerald: "text-emerald-400",
    indigo: "text-indigo-400",
    fuchsia: "text-fuchsia-400",
    amber: "text-amber-400",
    cyan: "text-cyan-400",
    rose: "text-rose-400",
  };

  const borderMaps: Record<string, string> = {
    emerald: "border-emerald-500/20",
    indigo: "border-indigo-500/20",
    fuchsia: "border-fuchsia-500/20",
    amber: "border-amber-500/20",
    cyan: "border-cyan-500/20",
    rose: "border-rose-500/20",
  };

  const glowMaps: Record<string, string> = {
    emerald: "from-emerald-500/20 to-emerald-950/20",
    indigo: "from-indigo-500/20 to-indigo-950/20",
    fuchsia: "from-fuchsia-500/20 to-fuchsia-950/20",
    amber: "from-amber-500/20 to-amber-950/20",
    cyan: "from-cyan-500/20 to-cyan-950/20",
    rose: "from-rose-500/20 to-rose-950/20",
  };

  const glowSecondaryMaps: Record<string, string> = {
    emerald: "bg-emerald-500/5",
    indigo: "bg-indigo-500/5",
    fuchsia: "bg-fuchsia-500/5",
    amber: "bg-amber-500/5",
    cyan: "bg-cyan-500/5",
    rose: "bg-rose-500/5",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden selection:bg-slate-800">
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b ${glowMaps[niche.color]} opacity-40 blur-[150px]`} />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-t from-slate-900/50 to-indigo-950/10 opacity-30 blur-[130px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Breadcrumb */}
        <div className="container mx-auto px-6 pt-12 pb-6">
          <Link href="/solutions" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Catálogo Geral de Soluções
          </Link>
        </div>

        {/* Personalização Baseada no Arquétipo Cultural (Next.js Static Build Safe) */}
        <NichePersonalizer />


        {/* HERO SECTION */}
        <section className="container mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bgMaps[niche.color]} ${borderMaps[niche.color]} border text-xs font-black uppercase tracking-widest ${textMaps[niche.color]}`}>
                <Icon className="w-4 h-4" /> Automação Inteligente Especializada
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                {niche.headline || niche.title}
              </h1>
              
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-slate-200 font-bold leading-relaxed">
                  {niche.subtitle}
                </p>
                
                <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
                  {niche.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* Roll down to pricing/form section */}
                <a href="#pricing-section" className="w-full sm:w-auto">
                  <Button className={`h-16 px-8 w-full rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] ${
                    niche.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-[0_0_20px_rgba(52,211,153,0.2)]' :
                    niche.color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-400 text-indigo-950 shadow-[0_0_20px_rgba(99,102,241,0.2)]' :
                    niche.color === 'fuchsia' ? 'bg-fuchsia-500 hover:bg-fuchsia-400 text-fuchsia-950 shadow-[0_0_20px_rgba(217,70,239,0.2)]' :
                    niche.color === 'amber' ? 'bg-amber-500 hover:bg-amber-400 text-amber-950 shadow-[0_0_20px_rgba(245,158,11,0.2)]' :
                    niche.color === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-400 text-cyan-950 shadow-[0_0_20px_rgba(6,182,212,0.2)]' :
                    'bg-rose-500 hover:bg-rose-400 text-rose-950 shadow-[0_0_20px_rgba(225,29,72,0.2)]'
                  }`}>
                    Diagnosticar Minha Operação
                  </Button>
                </a>
                <Link href={buildSimulatorUrl()} className="w-full sm:w-auto">
                  <Button variant="outline" className="h-16 px-8 w-full rounded-2xl bg-white/5 hover:bg-white/10 border-white/10 text-white font-bold tracking-wider">
                    <PlayCircle className="w-5 h-5 mr-2 shrink-0" /> Simular Fluxos
                  </Button>
                </Link>
              </div>

              {/* Metric highlights render horizontally in glass mirror cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {niche.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md hover:bg-slate-900/60 transition-all hover:border-white/10">
                    <div className={`text-3xl font-black mb-1 ${textMaps[niche.color]}`}>{metric.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic Box: Dashboard de Telemetria Operacional */}
            <div className="lg:col-span-5 relative rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900/30 backdrop-blur-xl flex flex-col justify-between p-6 md:p-8 group space-y-6">
              <div className={`absolute inset-0 bg-gradient-to-tr ${glowMaps[niche.color]} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${bgMaps[niche.color]} border ${borderMaps[niche.color]} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${textMaps[niche.color]}`} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500">{"// ENGINE ACTIVE"}</span>
                    <h3 className="text-sm font-black text-white font-mono uppercase tracking-wider">{niche.slug}.sys</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </div>
              </div>

              {/* Latency Comparison */}
              <div className="relative z-10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Latência de Contato</span>
                  <span className="text-[10px] text-slate-500 font-mono">Simulando SLA</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/60 border border-white/5 p-4 rounded-xl">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block mb-1">Time Humano</span>
                    <span className="text-base font-extrabold text-red-400 line-through">
                      {formatHumanLatency(niche.financialMetrics.estimatedLatency)}
                    </span>
                  </div>
                  <div className={`bg-slate-950/60 border ${borderMaps[niche.color]} p-4 rounded-xl`}>
                    <span className={`text-[9px] ${textMaps[niche.color]} uppercase tracking-wider font-bold block mb-1`}>SinergIA OS</span>
                    <span className="text-base font-black text-white flex items-center gap-1">
                      {niche.financialMetrics.optimizedLatency}s
                      <Sparkles className={`w-3.5 h-3.5 ${textMaps[niche.color]} animate-pulse`} />
                    </span>
                  </div>
                </div>
              </div>

              {/* CAC Comparison */}
              <div className="relative z-10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Custo de Aquisição (CAC)</span>
                  <span className="text-[10px] text-slate-500 font-mono">Eficiência Financeira</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/60 border border-white/5 p-4 rounded-xl">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block mb-1">CAC Basal</span>
                    <span className="text-base font-extrabold text-red-400 line-through">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(niche.financialMetrics.currentCAC)}
                    </span>
                  </div>
                  <div className={`bg-slate-950/60 border ${borderMaps[niche.color]} p-4 rounded-xl`}>
                    <span className={`text-[9px] ${textMaps[niche.color]} uppercase tracking-wider font-bold block mb-1`}>CAC SinergIA</span>
                    <span className="text-base font-black text-emerald-400">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(niche.financialMetrics.projectedCAC)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="relative z-10 pt-2 border-t border-white/5">
                <Link href={buildSimulatorUrl()} className="w-full">
                  <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 border-white/10 text-white font-bold tracking-wider text-xs h-12 rounded-xl flex items-center justify-center gap-2">
                    <PlayCircle className="w-4 h-4 shrink-0" /> Abrir Simulador de Tráfego do Setor
                  </Button>
                </Link>
              </div>
            </div>


          </div>
        </section>

        {/* MATRIZ DE ENGENHARIA COGNITIVA (Dores vs Módulos) */}
        <section className="border-t border-white/5 py-24 bg-slate-900/10">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className={`text-xs font-bold uppercase tracking-widest ${textMaps[niche.color]} bg-white/5 border ${borderMaps[niche.color]} px-4 py-1.5 rounded-full`}>
                Matriz de Engenharia de Processos
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">
                Mapeamento de Gargalos & Soluções
              </h2>
              <p className="text-slate-400 mt-4 leading-relaxed font-light">
                Entenda o cruzamento cirúrgico de como o ecossistema cognitivo da SinergIA elimina as fricções clássicas da sua operação comercial e financeira.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
              
              {/* Left Column (Dores) */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-rose-500 font-bold uppercase tracking-wider text-xs mb-4">
                  <AlertTriangle className="w-5 h-5" /> Gargalos Setoriais Ocorrentes
                </div>
                {niche.painPoints.map((pain, idx) => (
                  <div key={idx} className="bg-slate-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm hover:border-white/10 transition-colors">
                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      {pain.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      {pain.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Column (Soluções SinergIA) */}
              <div className="space-y-6">
                <div className={`flex items-center gap-2 ${textMaps[niche.color]} font-bold uppercase tracking-wider text-xs mb-4`}>
                  <ShieldCheck className="w-5 h-5 animate-pulse" /> Módulos Autónomos Aplicados
                </div>
                {hooksList.map((sol, idx) => (
                  <div key={idx} className={`bg-gradient-to-br from-white/5 to-white/0 border rounded-2xl p-6 ${borderMaps[niche.color]} relative overflow-hidden group backdrop-blur-sm`}>
                    <div className={`absolute top-0 right-0 w-32 h-32 ${bgMaps[niche.color]} rounded-full filter blur-[50px] opacity-10 group-hover:opacity-30 transition-opacity`} />
                    <div className="relative z-10">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/10 ${textMaps[niche.color]} mb-3 inline-block`}>
                        {sol.badge}
                      </span>
                      <h4 className="text-xl font-bold text-white mb-1">{sol.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">{sol.description}</p>
                      
                      <div className="mb-4 py-2 border-y border-white/5 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 uppercase font-black">Métrica Alvo:</span>
                        <span className={`font-mono font-bold ${textMaps[niche.color]}`}>{sol.impact}</span>
                      </div>
                      
                      <ul className="space-y-1.5">
                        {sol.features.map((feat, fidx) => (
                          <li key={fidx} className="flex items-center text-xs text-slate-400">
                            <CheckCircle2 className={`w-3.5 h-3.5 mr-2 ${textMaps[niche.color]}`} />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* TARGET SEGMENTATION (Grandes Alvos vs Pequenos Alvos) */}
        {niche.subNicheGroup && (
          <section className="py-24 border-t border-white/5 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className={`text-xs font-bold uppercase tracking-widest ${textMaps[niche.color]} bg-white/5 border ${borderMaps[niche.color]} px-4 py-1.5 rounded-full`}>
                  Segmentação de Escopo
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">
                  Tamanho da Operação vs Solução
                </h2>
                <p className="text-slate-400 mt-4 leading-relaxed font-light">
                  Mapeamos os subsetores ideais de implantação sob duas frentes estratégicas: escala rápida para pequenos negócios e integração robusta para grandes alvos.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Pequenos Alvos Card */}
                <div className="bg-slate-900/30 p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between relative backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">MPEs e Profissionais</span>
                        <h3 className="text-2xl font-black text-white tracking-tight">
                          Ciclo Rápido (Pequenos Alvos)
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                        Setup Expresso
                      </span>
                    </div>
                    
                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                      Escopo simplificado focado em ativar contatos imediatos, qualificar e fechar conversas rápidas via inteligência artificial em canais de mensageria.
                    </p>

                    <div className="space-y-2 pt-4 border-t border-white/5">
                      {niche.subNicheGroup.pequenosAlvos.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          <span className="text-slate-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grandes Alvos Card */}
                <div className={`bg-gradient-to-br from-white/5 to-white/0 border ${borderMaps[niche.color]} p-8 rounded-[2rem] flex flex-col justify-between relative backdrop-blur-sm overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-t ${glowMaps[niche.color]} opacity-10 pointer-events-none`} />
                  <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className={`text-xs font-bold ${textMaps[niche.color]} uppercase tracking-widest block mb-1`}>Grandes Empresas & Franquias</span>
                        <h3 className="text-2xl font-black text-white tracking-tight">
                          Alta Complexidade Enterprise
                        </h3>
                      </div>
                      <span className={`text-xs font-mono font-bold px-2 py-1 rounded bg-white/10 border border-white/20 text-white shrink-0`}>
                        Enterprise B2B
                      </span>
                    </div>
                    
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      Operações profundas com conexões de dados complexas, APIs legadas, OCR documental pesado ou conformidades de conformidade jurídica internacional.
                    </p>

                    <div className="space-y-2 pt-4 border-t border-white/5">
                      {niche.subNicheGroup.grandesAlvos.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${bgMaps[niche.color]} shrink-0`} />
                          <span className="text-slate-200 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* CALCULADORA DE ROI INTEGRADA AO NICHO */}
        <ROICalculator nicheSlug={niche.slug} />

        {/* SIMULADOR DE ALOCAÇÃO DE INFRAESTRUTURA SINERGIA OS */}
        <SinergiaPricingOS nicheColor={niche.color} nicheSlug={niche.slug} />

        {/* CTA DE FECHAMENTO (Persistência de Contexto) */}
        <section className="container mx-auto px-6 py-24 text-center">
          <div className="max-w-4xl mx-auto bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-12 relative overflow-hidden backdrop-blur-md">
            <div className={`absolute -top-12 -right-12 w-48 h-48 ${glowSecondaryMaps[niche.color]} opacity-20 filter blur-3xl rounded-full`} />
            
            <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Blindagem Imediata para o Setor de <span className={textMaps[niche.color]}>{niche.shortTitle}</span>
              </h2>
              
              <p className="text-slate-400 text-md font-light leading-relaxed">
                Preencha nossa triagem rápida em 3 passos para validarmos a viabilidade da sua operação técnica e direcionar o esquadrão cognitivo correto para sua empresa.
              </p>

              <div className="pt-4 flex justify-center">
                <NicheCTAButton 
                  slug={niche.slug} 
                  text={`Solicitar Diagnóstico para ${niche.shortTitle}`} 
                  variant="primary" 
                  color={niche.color} 
                />
              </div>

              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                Auditoria Confidencial de Dados nos Termos da LGPD
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
