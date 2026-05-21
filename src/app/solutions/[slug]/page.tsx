import { getNicheBySlug, getAllNiches } from '@/data/niches'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, ChevronRight, MessageSquare, PlayCircle, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'

export function generateStaticParams() {
  const niches = getAllNiches()
  return niches.map((niche) => ({
    slug: niche.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const niche = getNicheBySlug(params.slug)
  if (!niche) return { title: 'Solução não encontrada' }
  return {
    title: `${niche.title} | SinergIA`,
    description: niche.subtitle,
  }
}

export default function NicheSolutionPage({ params }: { params: { slug: string } }) {
  const niche = getNicheBySlug(params.slug)

  if (!niche) {
    notFound()
  }

  const Icon = niche.icon

  const hooksList = [
    {
      badge: "O Piloto Automático",
      title: niche.hooks.pilotoAutomatico.title,
      description: niche.hooks.pilotoAutomatico.description,
      impact: "Execução Autônoma 24/7",
      features: ["Qualificação Fluida no WhatsApp", "Integração Direta com ERP/CRM", "Disparo Imediato de Ações"]
    },
    {
      badge: "O Resgate Ativo",
      title: niche.hooks.resgateAtivo.title,
      description: niche.hooks.resgateAtivo.description,
      impact: "Recuperação de Receita",
      features: ["Varredura de Inadimplência", "Reengajamento de Inativos", "Negociação de Desconto Permitida"]
    },
    {
      badge: "O Backoffice",
      title: niche.hooks.backoffice.title,
      description: niche.hooks.backoffice.description,
      impact: "Blindagem Operacional",
      features: ["OCR e Visão Computacional", "Validação SEFAZ / Receita", "Eliminação de Erro Humano"]
    }
  ]

  // Color mappings
  const bgMaps: Record<string, string> = {
    emerald: "bg-emerald-500/10",
    indigo: "bg-indigo-500/10",
    fuchsia: "bg-fuchsia-500/10",
    amber: "bg-amber-500/10",
    cyan: "bg-cyan-500/10",
    rose: "bg-rose-500/10",
  }

  const textMaps: Record<string, string> = {
    emerald: "text-emerald-400",
    indigo: "text-indigo-400",
    fuchsia: "text-fuchsia-400",
    amber: "text-amber-400",
    cyan: "text-cyan-400",
    rose: "text-rose-400",
  }

  const borderMaps: Record<string, string> = {
    emerald: "border-emerald-500/20",
    indigo: "border-indigo-500/20",
    fuchsia: "border-fuchsia-500/20",
    amber: "border-amber-500/20",
    cyan: "border-cyan-500/20",
    rose: "border-rose-500/20",
  }

  const glowMaps: Record<string, string> = {
    emerald: "from-emerald-500/20 to-emerald-950/20",
    indigo: "from-indigo-500/20 to-indigo-950/20",
    fuchsia: "from-fuchsia-500/20 to-fuchsia-950/20",
    amber: "from-amber-500/20 to-amber-950/20",
    cyan: "from-cyan-500/20 to-cyan-950/20",
    rose: "from-rose-500/20 to-rose-950/20",
  }
  
  const buttonMaps: Record<string, string> = {
    emerald: "bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-[0_0_20px_rgba(52,211,153,0.3)]",
    indigo: "bg-indigo-500 hover:bg-indigo-400 text-indigo-950 shadow-[0_0_20px_rgba(99,102,241,0.3)]",
    fuchsia: "bg-fuchsia-500 hover:bg-fuchsia-400 text-fuchsia-950 shadow-[0_0_20px_rgba(217,70,239,0.3)]",
    amber: "bg-amber-500 hover:bg-amber-400 text-amber-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    cyan: "bg-cyan-500 hover:bg-cyan-400 text-cyan-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    rose: "bg-rose-500 hover:bg-rose-400 text-rose-950 shadow-[0_0_20px_rgba(225,29,72,0.3)]",
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-slate-800">
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-b ${glowMaps[niche.color]} opacity-50 blur-[100px]`} />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Breadcrumb */}
        <div className="container mx-auto px-4 pt-28 pb-8">
          <Link href="/solutions" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Catálogo de Soluções
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bgMaps[niche.color]} ${borderMaps[niche.color]} border text-sm font-bold ${textMaps[niche.color]} mb-8 uppercase tracking-wider`}>
                <Icon className="w-4 h-4" />
                <span>Operação Cognitiva Especializada</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                {niche.title.split(' para ')[0]} para <br/>
                <span className={textMaps[niche.color]}>{niche.title.split(' para ')[1]}</span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed font-light mb-10">
                {niche.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/apply?niche=${niche.slug}&plan=enterprise`} className="flex-1 sm:flex-none">
                  <Button className={`h-14 px-8 w-full rounded-xl font-black text-lg ${buttonMaps[niche.color]}`}>
                    Solicitar Diagnóstico B2B
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/demo/flow-simulator" className="flex-1 sm:flex-none">
                  <Button variant="outline" className="h-14 px-8 w-full rounded-xl bg-white/5 hover:bg-white/10 border-white/10 font-bold">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Testar Demo Ao Vivo
                  </Button>
                </Link>
              </div>

              {/* Metrics Highlights */}
              <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/10">
                {niche.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className={`text-3xl font-black mb-1 ${textMaps[niche.color]}`}>{metric.value}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center group p-8">
               <div className={`absolute inset-0 bg-gradient-to-tr ${glowMaps[niche.color]} opacity-30 group-hover:opacity-50 transition-opacity duration-700`} />
               
               {/* Abstract Visualization of the specific niche tool */}
               <div className="relative z-10 w-full flex flex-col items-center flex-1 justify-center space-y-6">
                 <div className={`w-32 h-32 rounded-3xl ${bgMaps[niche.color]} ${borderMaps[niche.color]} border mx-auto flex items-center justify-center shadow-2xl animate-pulse`}>
                    <Icon className={`w-16 h-16 ${textMaps[niche.color]}`} />
                 </div>
                 <div className="text-center">
                    <div className="text-white font-bold text-xl mb-1">Motor de IA Ativo</div>
                    <div className={`text-sm ${textMaps[niche.color]} font-mono`}>{'// ' + niche.slug + '.sys'}</div>
                 </div>
               </div>
               
               {/* Piloto de Validação Floating Banner */}
               <div className="relative z-10 bg-slate-950/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Piloto de Validação (PoC)</div>
                    <div className="text-2xl font-black text-white">R$ 997<span className="text-sm font-medium text-slate-500"> / setup único</span></div>
                  </div>
                  <Link href={`/apply?niche=${niche.slug}&plan=poc`}>
                     <Button className={`h-12 rounded-xl font-bold ${buttonMaps[niche.color]}`}>Ativar Piloto</Button>
                  </Link>
               </div>
            </div>
          </div>
        </section>

        {/* Manifesto de Valor Section */}
        <section className="py-20 border-b border-white/5 bg-slate-900/10 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Manifesto de Valor SinergIA</h3>
            <p className="text-2xl md:text-3xl font-light text-slate-200 leading-relaxed italic max-w-4xl mx-auto">
              &ldquo;A verdadeira oportunidade da Inteligência Artificial não é usá-la para demitir pessoas ou economizar centavos. É treinar um exército de agentes ávidos para tornar o seu trabalho infinitamente mais valioso, confiável e consistente.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Sparkles className={`w-5 h-5 ${textMaps[niche.color]}`} />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-slate-400">A Marca é uma Promessa e a Consistência é o Nosso Selo</span>
            </div>
          </div>
        </section>

        {/* The Reality (Pain Points) vs The SinergIA Solution */}
        <section className="bg-slate-900/40 border-b border-white/5 py-24 relative overflow-hidden">
           <div className="container mx-auto px-4 relative z-10">
             <div className="text-center max-w-3xl mx-auto mb-20">
               <h2 className="text-3xl md:text-5xl font-black mb-6">Por que o modelo atual está quebrado?</h2>
               <p className="text-lg text-slate-400">
                 {niche.description}
               </p>
             </div>

             <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
               {/* Pains */}
               <div className="space-y-8">
                 <div className="inline-flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider text-sm mb-4">
                   <Zap className="w-5 h-5" /> Garaglos Operacionais
                 </div>
                 {niche.painPoints.map((pain, idx) => (
                   <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                     <h3 className="text-xl font-bold text-white mb-2">{pain.title}</h3>
                     <p className="text-slate-400 leading-relaxed">{pain.description}</p>
                   </div>
                 ))}
               </div>

               {/* Solutions (SinergIA) */}
               <div className="space-y-8">
                 <div className={`inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm mb-4 ${textMaps[niche.color]}`}>
                   <ShieldCheck className="w-5 h-5" /> A Solução Autônoma SinergIA
                 </div>
                  {hooksList.map((sol, idx) => (
                    <div key={idx} className={`bg-gradient-to-br from-white/5 to-white/0 border rounded-2xl p-6 ${borderMaps[niche.color]} relative overflow-hidden group`}>
                      <div className={`absolute top-0 right-0 w-32 h-32 ${bgMaps[niche.color]} rounded-full filter blur-[50px] opacity-30 group-hover:opacity-60 transition-opacity`} />
                      <div className="relative z-10">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 ${textMaps[niche.color]} mb-2 inline-block`}>
                          {sol.badge}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2">{sol.title}</h3>
                        <p className="text-slate-300 leading-relaxed mb-4 text-sm font-light">{sol.description}</p>
                        
                        <div className="mb-6 py-3 border-y border-white/10">
                          <div className={`text-xs font-bold ${textMaps[niche.color]}`}>Impacto Direto:</div>
                          <div className="text-white font-medium text-sm">{sol.impact}</div>
                        </div>
                        
                        <ul className="space-y-2">
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

         {/* Sub-niche Group (Pequenos Alvos vs Grandes Alvos) */}
         {niche.subNicheGroup && (
          <section className="py-24 border-b border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-slate-900/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className={`text-xs font-black uppercase ${textMaps[niche.color]} tracking-widest bg-white/5 border ${borderMaps[niche.color]} px-4 py-1.5 rounded-full`}>
                  Direcionamento Estratégico de Mercado
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
                  Grandes Alvos vs Pequenos Alvos
                </h2>
                <p className="text-slate-400 mt-4 leading-relaxed font-light text-lg">
                  Desenvolvemos a arquitetura ideal sob duas óticas de implantação: velocidade de escala para pequenos negócios e profundidade tecnológica para grandes alvos.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Pequenos Alvos Card */}
                <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 flex flex-col justify-between relative group backdrop-blur-md">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">MPEs & Profissionais</span>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight">
                          Pequenos Alvos (Ciclo Rápido)
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                        Venda Rápida
                      </span>
                    </div>
                    
                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                      Negócios com alta recorrência operacional, focados na eliminação de gargalos de atendimento imediatos e ativação rápida de setup.
                    </p>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      {niche.subNicheGroup.pequenosAlvos.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="text-slate-300 text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grandes Alvos Card */}
                <div className={`bg-gradient-to-br from-white/5 to-white/0 border ${borderMaps[niche.color]} p-8 rounded-[2rem] flex flex-col justify-between relative group backdrop-blur-md overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-t ${glowMaps[niche.color]} opacity-10`} />
                  <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className={`text-xs font-bold ${textMaps[niche.color]} uppercase tracking-widest block mb-1`}>Corporações & Franquias</span>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight">
                          Grandes Alvos (Alto Ticket)
                        </h3>
                      </div>
                      <span className={`text-xs font-mono font-bold px-2 py-1 rounded bg-white/10 border border-white/20 text-white shrink-0`}>
                        Enterprise
                      </span>
                    </div>
                    
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      Sistemas complexos integrando APIs legadas, rotas alfandegárias ou auditorias massivas que demandam alta segurança.
                    </p>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      {niche.subNicheGroup.grandesAlvos.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${bgMaps[niche.color]} shrink-0`} />
                          <span className="text-slate-200 text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Conexão com a SinergIA */}
        <section className="container mx-auto px-4 py-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Como se conectar com a <span className={textMaps[niche.color]}>SinergIA</span></h2>
             <p className="text-xl text-slate-300 font-light leading-relaxed">
                Nós não vendemos playbooks ou tutoriais genéricos. Fornecemos a força de trabalho cognitiva e a consistência profissional que a sua operação exige.
             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto align-stretch">
            {/* Piloto de Validação (PoC) */}
            <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-10 flex flex-col hover:bg-white/5 transition-all duration-300 relative overflow-hidden group">
               <div className="mb-6 relative z-10">
                 <div className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Mitigação Límbica de Risco
                 </div>
                 <h3 className="text-3xl font-black text-white mb-2">Piloto de Validação (PoC)</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">
                    Instalamos o seu primeiro Agente Cognitivo ativo (seu novo &quot;Estagiário Digital&quot;) em até 7 dias no seu canal principal. Valide o retorno real antes do contrato.
                 </p>
               </div>
               
               <div className="mb-8 relative z-10">
                 <span className="text-5xl font-black text-white">R$ 997</span>
                 <span className="text-slate-400 text-sm"> / setup único</span>
                 <div className="text-xs text-emerald-400 font-bold mt-1 uppercase tracking-wider">
                    ★ 100% revertido em crédito para o projeto final
                 </div>
               </div>

               <div className="space-y-4 mb-10 flex-1 relative z-10">
                 <div className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 mr-3 text-slate-500" /> 1 Agente Cognitivo totalmente treinado</div>
                 <div className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 mr-3 text-slate-500" /> Integração ativa com WhatsApp ou Instagram</div>
                 <div className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 mr-3 text-slate-500" /> 14 dias de testes e tráfego de teste inclusos</div>
                 <div className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 mr-3 text-slate-500" /> Relatório analítico de taxa de conversão e alostase</div>
               </div>

               <Link href={`/apply?niche=${niche.slug}&plan=poc`} className="w-full mt-auto relative z-10">
                 <Button className="w-full h-16 rounded-2xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20">
                    Ativar Piloto de Validação
                  </Button>
               </Link>
            </div>

            {/* Custom Squad Plan (Enterprise) */}
            <div className={`bg-gradient-to-br from-white/5 to-white/0 border ${borderMaps[niche.color]} rounded-[2.5rem] p-10 flex flex-col relative overflow-hidden`}>
               <div className={`absolute inset-0 bg-gradient-to-t ${glowMaps[niche.color]} opacity-20`} />
               
               <div className="relative z-10 mb-6">
                 <div className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white uppercase tracking-widest mb-4">
                    Esquadrão Customizado B2B
                 </div>
                 <h3 className="text-3xl font-black text-white mb-2">Esquadrão de IA</h3>
                 <p className="text-slate-300 text-sm leading-relaxed">
                    Desenvolvimento e integração de múltiplos agentes cognitivos em seus sistemas legados. Alinhamento de processos e customização cirúrgica.
                 </p>
               </div>

               <div className="mb-8 relative z-10">
                 <span className="text-4xl font-black text-white">Sob Consulta</span>
                 <div className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">
                    Faturamento baseado em ganho de eficiência (ROI)
                 </div>
               </div>

               <div className="space-y-4 mb-10 flex-1 relative z-10">
                 <div className="flex items-center text-sm text-slate-200"><CheckCircle2 className="w-5 h-5 mr-3 text-emerald-400" /> Mapeamento Técnico de APIs, CRM e ERP legados</div>
                 <div className="flex items-center text-sm text-slate-200"><CheckCircle2 className="w-5 h-5 mr-3 text-emerald-400" /> Ajuste fino de LLMs privados para dados confidenciais</div>
                 <div className="flex items-center text-sm text-slate-200"><CheckCircle2 className="w-5 h-5 mr-3 text-emerald-400" /> SLA de resposta com monitoramento proativo de sentimentos</div>
                 <div className="flex items-center text-sm text-slate-200"><CheckCircle2 className="w-5 h-5 mr-3 text-emerald-400" /> Blindagem Jurídica Completa (Compliance LGPD/SLA)</div>
               </div>

               <div className="mt-auto relative z-10">
                 <Link href={`/apply?niche=${niche.slug}&plan=enterprise`}>
                   <Button className={`w-full h-16 rounded-2xl font-black text-lg ${buttonMaps[niche.color]}`}>
                      <MessageSquare className="w-6 h-6 mr-3" />
                      Solicitar Diagnóstico B2B
                   </Button>
                 </Link>
                 <p className="text-center text-xs text-slate-500 mt-4 uppercase tracking-widest font-bold">
                    Sujeito à avaliação técnica de viabilidade
                 </p>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
