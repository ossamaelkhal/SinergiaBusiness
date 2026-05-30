import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Lock, Sparkles, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Sala de Descoberta | SinergIA",
  description: "Seu motor de aquisição está quase pronto.",
};

export default function DiscoverPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 text-slate-300 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="max-w-4xl mx-auto space-y-12 relative z-10 pt-12">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-bold uppercase tracking-widest border border-amber-500/20 mb-4">
                            <Lock className="w-4 h-4" /> Conta Pendente de Ativação
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            Você está a um passo da <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Operação Autônoma</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Seu ambiente SinergIA já foi reservado. Ative sua licença para desbloquear os Agentes de IA, os Playbooks de Vendas e o cockpit de telemetria completo.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-slate-900/60 border-white/10 backdrop-blur-md">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Sparkles className="text-emerald-400 w-5 h-5"/> O que está te esperando:
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-300 leading-tight">Acesso integral ao SinergiaBot de Prospecção</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-300 leading-tight">Playbook de Copywriting para IA B2B</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-300 leading-tight">Integração Webhook direta para seu n8n/Make</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 backdrop-blur-md flex flex-col justify-center">
                            <CardContent className="p-8 text-center space-y-6">
                                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30">
                                    <Zap className="w-8 h-8 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Desbloquear Setup</h3>
                                    <p className="text-sm text-slate-400">Implemente no seu negócio e corte R$ 45.000/ano em custos braçais hoje.</p>
                                </div>
                                <Link href="/checkout" className="block w-full">
                                    <Button className="w-full h-14 text-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(52,211,153,0.3)] border-0">
                                        Ativar Licença SinergIA <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
