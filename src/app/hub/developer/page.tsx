import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Terminal, Database, KeySquare, Layers, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "DevHub | SinergIA Tech Partners",
  description: "Ambiente para desenvolvedores e agências de integração.",
};

export default function DeveloperHubPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 text-slate-300 p-4 sm:p-6 lg:p-8 font-mono">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Dev Header */}
                    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6 border-dashed">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Terminal className="w-5 h-5 text-indigo-400" />
                                <h1 className="text-2xl font-black text-white tracking-widest uppercase">TechPartner Console</h1>
                            </div>
                            <p className="text-xs text-slate-500">v1.4.0-stable | Webhook & API Management</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-none border border-emerald-500/30">API: ONLINE</Badge>
                            <Badge className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-none border border-indigo-500/30">Tokens: Ilimitados</Badge>
                        </div>
                    </header>

                    {/* API Keys */}
                    <section>
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-l-2 border-indigo-500 pl-2">
                            <KeySquare className="w-4 h-4" /> Credenciais de Interoperabilidade
                        </h2>
                        <Card className="bg-slate-900/50 border-white/10 rounded-sm">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 border border-white/5 p-4 rounded-sm">
                                        <div>
                                            <div className="text-xs font-bold text-slate-500 mb-1">Production API Key</div>
                                            <div className="text-sm text-slate-300 tracking-wider">sk_live_xxxxxxxxxxxxxxxxxxxxxx</div>
                                        </div>
                                        <Button size="sm" variant="outline" className="rounded-none border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10">
                                            Roll Key
                                        </Button>
                                    </div>
                                    <div className="text-xs text-slate-500 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Use esta chave nos Headers: Authorization: Bearer &#123;KEY&#125;
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Connected Clients */}
                        <Card className="bg-slate-900/50 border-white/10 rounded-sm">
                            <CardHeader className="pb-3 border-b border-white/5">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-emerald-400" /> Tenants Gerenciados
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="text-4xl font-black text-white mb-2">0</div>
                                <p className="text-xs text-slate-500">Agências Tech podem atrelar contas de clientes para gerenciar billing e bots via API.</p>
                            </CardContent>
                        </Card>

                        {/* Webhook Endpoint */}
                        <Card className="bg-slate-900/50 border-white/10 rounded-sm">
                            <CardHeader className="pb-3 border-b border-white/5">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Database className="w-4 h-4 text-rose-400" /> Webhook Listener
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-3">
                                <div className="text-xs font-bold text-slate-500">URL Endpoint</div>
                                <div className="p-2 bg-slate-950 border border-white/5 text-xs text-slate-300 overflow-x-auto whitespace-nowrap">
                                    https://your-n8n-instance.com/webhook/sinergia
                                </div>
                                <Button size="sm" className="w-full rounded-none bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                                    Editar Endpoint
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Compute limits */}
                        <Card className="bg-slate-900/50 border-white/10 rounded-sm">
                            <CardHeader className="pb-3 border-b border-white/5">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-cyan-400" /> Compute
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="text-xl font-bold text-white mb-2">99.9% Uptime</div>
                                <p className="text-xs text-slate-500 mb-4">A latência atual do cluster B2B SinergIA é de ~240ms por requisição NLP.</p>
                                <Button variant="link" className="p-0 h-auto text-xs text-cyan-400 rounded-none hover:text-cyan-300">
                                    Ver Logs &rarr;
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </ProtectedRoute>
    );
}
