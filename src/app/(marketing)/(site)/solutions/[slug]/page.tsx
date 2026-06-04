import { getNicheBySlug, getAllNiches } from '@/data/niches';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, AlertTriangle, CheckCircle2, ChevronRight, 
  PlayCircle, ShieldCheck, Sparkles, Zap, Shield, Check, Lock, HelpCircle 
} from 'lucide-react';
import { NicheCTAButton } from '@/components/features/solutions/NicheCTAButton';
import { ROICalculator } from '@/components/sections/ROICalculator';


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

        {/* HERO SECTION */}
        <section className="container mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bgMaps[niche.color]} ${borderMaps[niche.color]} border text-xs font-black uppercase tracking-widest ${textMaps[niche.color]}`}>
                <Icon className="w-4 h-4" /> Automação Inteligente Especializada
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                O Sistema Operacional Autónomo feito para <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${niche.color === 'emerald' ? 'from-emerald-400 to-cyan-400' : niche.color === 'indigo' ? 'from-indigo-400 to-purple-400' : niche.color === 'fuchsia' ? 'from-fuchsia-400 to-rose-400' : niche.color === 'amber' ? 'from-amber-400 to-orange-400' : niche.color === 'cyan' ? 'from-cyan-400 to-teal-400' : 'from-rose-400 to-red-400'}`}>
                  {niche.shortTitle}
                </span>
              </h1>
              
              <p className="text-lg text-slate-300 font-light leading-relaxed">
                Substitua a latência de atendimento e a burocracia manual de processos por agentes cognitivos integrados que blindam a sua receita 24 horas por dia.
              </p>

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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
                {niche.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md hover:bg-slate-900/60 transition-all hover:border-white/10">
                    <div className={`text-3xl font-black mb-1 ${textMaps[niche.color]}`}>{metric.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic Box */}
            <div className="lg:col-span-5 relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900/30 backdrop-blur-xl flex flex-col justify-between p-8 group">
              <div className={`absolute inset-0 bg-gradient-to-tr ${glowMaps[niche.color]} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center space-y-6">
                <div className={`w-28 h-28 rounded-3xl ${bgMaps[niche.color]} border ${borderMaps[niche.color]} flex items-center justify-center shadow-2xl animate-pulse`}>
                  <Icon className={`w-14 h-14 ${textMaps[niche.color]}`} />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">Configuração Ativa</h3>
                  <span className={`text-xs font-mono ${textMaps[niche.color]}`}>{'// ' + niche.slug + '.sys'}</span>
                </div>
              </div>

              {/* Live telemetry teaser */}
              <div className="relative z-10 bg-slate-950/90 border border-white/10 p-5 rounded-2xl w-full flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Teste Piloto (PoC)</span>
                  <div className="text-2xl font-black text-white">R$ 997 <span className="text-xs text-slate-500 font-normal">/ setup</span></div>
                </div>
                <a href="#pricing-section">
                  <Button size="sm" className={`h-10 rounded-xl font-bold ${
                    niche.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950' :
                    niche.color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-400 text-indigo-950' :
                    niche.color === 'fuchsia' ? 'bg-fuchsia-500 hover:bg-fuchsia-400 text-fuchsia-950' :
                    niche.color === 'amber' ? 'bg-amber-500 hover:bg-amber-400 text-amber-950' :
                    niche.color === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-400 text-cyan-950' :
                    'bg-rose-500 hover:bg-rose-400 text-rose-950'
                  }`}>Ver Detalhes</Button>
                </a>
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

        {/* ANCORAGEM DE PREÇOS E PILOTO TÁTICO */}
        <section id="pricing-section" className="border-t border-white/5 py-24 bg-slate-900/20 relative overflow-hidden">

          <div className="container mx-auto px-6">
            
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className={`text-xs font-bold uppercase tracking-widest ${textMaps[niche.color]} bg-white/5 border ${borderMaps[niche.color]} px-4 py-1.5 rounded-full`}>
                Tabela de Investimentos
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight">
                Estrutura de Modelos de Investimento
              </h2>
              <p className="text-slate-400 mt-4 leading-relaxed font-light">
                Modelos de contratação realistas de mercado construídos para garantir viabilidade imediata, consistência técnica e alinhamento de ROI.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              
              {/* Tabela 1: Piloto PoC */}
              <div className="bg-slate-950 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between hover:bg-slate-900/40 transition-all group relative">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Mitigação Límbica de Risco
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Piloto de Validação (PoC)</h3>
                    <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
                      Instalamos 1 agente cognitivo treinado rodando ativo no seu canal em até 7 dias. Teste o funcionamento prático com tráfego real.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <span className="text-4xl font-black text-white">R$ 997</span>
                    <span className="text-slate-500 text-xs font-medium"> / setup único</span>
                    <span className="text-[10px] text-emerald-400 block mt-1 font-bold uppercase tracking-wider">
                      ✓ 100% convertido em crédito no projeto final
                    </span>
                  </div>

                  <ul className="space-y-3 pt-6 border-t border-white/5 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 1 Agente de atendimento ou triagem</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Integração com WhatsApp ou Instagram</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Painel básico de monitoramento de logs</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 7 dias de sustentação ativa inclusos</li>
                  </ul>
                </div>

                <div className="pt-8">
                  <NicheCTAButton slug={niche.slug} text="Ativar Piloto PoC" variant="outline" color={niche.color} className="w-full" />
                </div>
              </div>

              {/* Tabela 2: Integração Standard (Recomendada) */}
              <div className={`bg-slate-900 border-2 ${borderMaps[niche.color]} rounded-[2rem] p-8 flex flex-col justify-between hover:bg-slate-900/80 transition-all relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-32 h-32 ${bgMaps[niche.color]} blur-3xl rounded-full opacity-30`} />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className={`inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-[10px] font-black ${textMaps[niche.color]} uppercase tracking-widest`}>
                      Mais Contratado (Regional)
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Integração Standard</h3>
                    <p className="text-xs text-slate-300 mt-2 font-light leading-relaxed">
                      Sua operação blindada de ponta a ponta. Solução padrão com implantação completa do fluxo comercial ou financeiro no seu nicho.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <div className="text-slate-400 text-xs">Setup de Implantação</div>
                    <div className="text-3xl font-black text-white">R$ 15.000</div>
                    <div className="text-slate-400 text-xs mt-2">Mensalidade (SaaS / Manutenção)</div>
                    <div className="text-2xl font-black text-white">R$ 1.990<span className="text-xs text-slate-500 font-normal">/mês</span></div>
                  </div>

                  <ul className="space-y-3 pt-6 border-t border-white/5 text-xs text-slate-200">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Até 3 Agentes Cognitivos em Swarm</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Conexão com banco de dados CRM / ERP</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Relatório ativo de leads e faturamento</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Suporte com SLA de 24h úteis</li>
                  </ul>
                </div>

                <div className="pt-8 relative z-10">
                  <NicheCTAButton slug={niche.slug} text="Solicitar Implantação" variant="primary" color={niche.color} className="w-full" />
                </div>
              </div>

              {/* Tabela 3: Esquadrão Customizado (Enterprise) */}
              <div className="bg-slate-950 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between hover:bg-slate-900/40 transition-all group relative">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Alta Complexidade B2B
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Esquadrão Custom</h3>
                    <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
                      Sistemas customizados integrando bases massivas de dados, APIs fechadas e fine-tuning de LLM próprio com segurança dedicada.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <div className="text-slate-400 text-xs">Setup a partir de</div>
                    <div className="text-3xl font-black text-white">R$ 50.000</div>
                    <div className="text-slate-400 text-xs mt-2">Mensalidade Recorrente</div>
                    <div className="text-2xl font-black text-white">Sob Demanda</div>
                  </div>

                  <ul className="space-y-3 pt-6 border-t border-white/5 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Múltiplos agentes com conexões complexas</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Fine-tuning dedicado e segurança de dados</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Acordo SLA customizado com suporte imediato</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Auditoria legal sob LGPD e conformidade</li>
                  </ul>
                </div>

                <div className="pt-8">
                  <NicheCTAButton slug={niche.slug} text="Falar com Especialista" variant="outline" color={niche.color} className="w-full" />
                </div>
              </div>

            </div>
          </div>
        </section>

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
