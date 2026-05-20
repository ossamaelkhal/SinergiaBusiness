import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, Users, Code2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "SinergIA Partners | Multiplique a Receita da sua Agência",
  description: "Faça parte da revolução da IA. Ofereça Automação e Chatbots para seus clientes sem precisar programar.",
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500 selection:text-white">
      {/* Hero Section (Glassmorphism 2.0 theme) */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-medium text-emerald-300 tracking-wide uppercase">Programa de Parcerias Aberto</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
              Torne-se uma Agência <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300">Movida a IA</span>
            </h1>
            
            <p className="text-lg md:text-xl text-indigo-100/80 max-w-2xl font-light leading-relaxed drop-shadow-sm">
              Traga a prateleira de soluções da SinergIA para dentro do seu portfólio. Aumente o ticket médio e escale seus lucros sem aumentar o custo de folha de pagamento.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Button size="lg" className="h-14 px-8 text-base bg-white text-slate-900 hover:bg-indigo-50 font-bold tracking-tight rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105">
                Quero ser Parceiro <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/10 rounded-xl backdrop-blur-md transition-all">
                Ver Playbooks
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PAS Framework: Problem & Agitation */}
      <section className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white border-l-4 border-rose-500 pl-4">
                            Sua agência está deixando dinheiro na mesa.
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Serviços tradicionais de marketing estão cada vez mais comoditizados. É difícil cobrar tickets altos apenas por tráfego ou social media. 
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed font-medium">
                            Enquanto isso, seus clientes exigem Chatbots de IA avançados e Automação B2B. Se você não os fornecer, outro concorrente com infraestrutura de IA roubará sua conta.
                        </p>
                    </div>
                    <div className="bg-slate-900/60 p-8 rounded-2xl border border-white/10 relative overflow-hidden backdrop-blur-md">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
                        <ul className="space-y-4">
                            <li className="flex items-start text-slate-300">
                                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                    <span className="text-rose-600 font-bold text-xs">X</span>
                                </div>
                                Dificuldade de escalar margem de lucro.
                            </li>
                            <li className="flex items-start text-slate-300">
                                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                    <span className="text-rose-600 font-bold text-xs">X</span>
                                </div>
                                Sem codadores seniores na equipe.
                            </li>
                            <li className="flex items-start text-slate-300">
                                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                    <span className="text-rose-600 font-bold text-xs">X</span>
                                </div>
                                Clientes saindo (Churn) por falta de inovação tecnológica.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-slate-950 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-6 border border-indigo-500/20">
                    <Users className="w-8 h-8 text-indigo-400" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                    A Solução: SinergIA Partners
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed">
                    Nós construímos a tecnologia. Você entrega o valor (e fica com os lucros recorrentes).
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-slate-900/60 p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all group backdrop-blur-md">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                        <TrendingUp className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">White-Label Growth</h3>
                    <p className="text-slate-400">
                        Revenda nossas automações B2B e Chatbots sob a sua própria marca e precifique como desejar.
                    </p>
                </div>
                <div className="bg-slate-900/60 p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all group backdrop-blur-md">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                        <Code2 className="w-6 h-6 text-blue-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Zero Código Necessário</h3>
                    <p className="text-slate-400">
                        Entregamos Playbooks validados prontos para implantar no cliente final. Focados em vendas e retenção.
                    </p>
                </div>
                <div className="bg-slate-900/60 p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all group backdrop-blur-md">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                        <Users className="w-6 h-6 text-amber-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Comissões Recorrentes</h3>
                    <p className="text-slate-400">
                        Até 30% LTV em indicados diretos ou Setup Fee de 100% no modelo White-Label. Você decide o modelo.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Tiers / Gamification Section */}
      <section className="py-24 bg-slate-950 border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-4 block">Gamificação de Vendas</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                    A Escada de Partnership
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed">
                    Quanto mais você escala seus clientes, maiores são suas margens. Conheça os níveis do SinergIA Elite Program.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-slate-900/60 p-8 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-indigo-500/30 transition-all backdrop-blur-md">
                    <div className="absolute top-0 w-full h-2 left-0 bg-slate-700"></div>
                    <h3 className="text-2xl font-bold text-slate-300 mb-2 mt-4">Scout</h3>
                    <p className="text-sm text-slate-500 mb-6 border-b pb-4">Nível Inicial</p>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold text-white">20%</span>
                        <span className="text-slate-500 ml-2">LTV</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" /> Material de Vendas (Swipe File)
                        </li>
                        <li className="flex items-center text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" /> Acesso ao SinergIA Bot Básico
                        </li>
                    </ul>
                </div>

                <div className="bg-slate-900/80 p-8 rounded-2xl border-2 border-indigo-500 relative shadow-[0_0_30px_rgba(99,102,241,0.15)] transform md:-translate-y-4 backdrop-blur-md">
                    <div className="absolute top-0 w-full h-2 left-0 bg-indigo-500"></div>
                    <div className="absolute top-4 right-4 bg-indigo-500/20 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">POPULAR</div>
                    <h3 className="text-2xl font-bold text-white mb-2 mt-4">Vanguard</h3>
                    <p className="text-sm text-slate-500 mb-6 border-b pb-4">A partir de 5 clientes ativos</p>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold text-indigo-400">25%</span>
                        <span className="text-slate-500 ml-2">LTV</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3" /> Suporte Prioritário B2B
                        </li>
                        <li className="flex items-center text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3" /> Automações White-Label
                        </li>
                        <li className="flex items-center text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3" /> Dashboards Personalizados
                        </li>
                    </ul>
                </div>

                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-amber-400 transition-all">
                    <div className="absolute top-0 w-full h-2 left-0 bg-amber-400"></div>
                    <h3 className="text-2xl font-bold text-white mb-2 mt-4">Elite</h3>
                    <p className="text-sm text-slate-400 mb-6 border-b border-slate-700 pb-4">A partir de 20 clientes ativos</p>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold text-amber-400">30%</span>
                        <span className="text-slate-400 ml-2">LTV</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-amber-400 mr-3" /> Retenha 100% do Setup Fee
                        </li>
                        <li className="flex items-center text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-amber-400 mr-3" /> Ações de Co-Marketing
                        </li>
                        <li className="flex items-center text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-amber-400 mr-3" /> Agente de IA para operar sua Agência
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Pronto para liderar a Era da IA?</h2>
            <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">Preencha sua aplicação. Nosso time B2B analisará seu perfil operacional e agendará o setup da parceria.</p>
            <Button size="lg" className="h-14 px-8 text-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl active:scale-95 transition-all">
                Aplicar para Parceria <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
        </div>
      </section>

    </div>
  );
}
