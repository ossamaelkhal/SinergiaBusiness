import React from 'react'
import { 
  BarChart, 
  Wallet, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  DollarSign
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export const metadata = {
  title: 'SinergIA Admin Master Control',
  description: 'Painel Central de Gestão e Telemetria SinergIA',
}

export default function AdminPage() {
  // Mock Data for the Admin Control
  const revenueMetrics = [
    { title: 'Faturamento Total', value: 'R$ 142.500', trend: '+15%', isUp: true },
    { title: 'Playbooks Vendidos', value: '184', trend: '+8%', isUp: true },
    { title: 'Setups Enterprise', value: '12', trend: '+20%', isUp: true },
    { title: 'MRR (Agentes Inativos)', value: 'R$ 45.000', trend: '-2%', isUp: false },
  ]

  const funnelMetrics = [
    { stage: 'Acessos Originais', count: '14,250', conversion: '-' },
    { stage: 'Leads na Calc. ROI', count: '3,120', conversion: '21.8%' },
    { stage: 'Qualificados (BANT)', count: '854', conversion: '27.3%' },
    { stage: 'Agendamentos (CTAs)', count: '142', conversion: '16.6%' },
    { stage: 'Pagamentos Aprovados', count: '86', conversion: '60.5%' },
  ]

  const withdrawalRequests = [
    { id: 'REQ-1042', partner: 'João Silva', amount: 'R$ 2.450,00', pixKey: 'joao.silva@email.com', status: 'pending', date: 'Há 2h' },
    { id: 'REQ-1041', partner: 'Agência Growth', amount: 'R$ 5.800,00', pixKey: '45.123.456/0001-90', status: 'pending', date: 'Há 5h' },
    { id: 'REQ-1040', partner: 'Maria Costa', amount: 'R$ 890,00', pixKey: '11999999999', status: 'approved', date: 'Ontem' },
    { id: 'REQ-1039', partner: 'Carlos Digital', amount: 'R$ 1.250,00', pixKey: 'carlos@digital.com', status: 'rejected', date: 'Ontem' },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Admin Status Bar */}
        <div className="border-b border-white/10 bg-slate-950/50 backdrop-blur-xl relative z-20">
          <div className="px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <h1 className="text-lg font-black text-white tracking-tight">C-Level Telemetry</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-400 font-medium">
                 <Activity className="w-3 h-3 animate-pulse" />
                 n8n: Operacional
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-8 relative z-10 space-y-8">

          {/* Top Financial Dashboard */}
          <section>
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Wallet className="w-6 h-6 text-emerald-500" /> Finanças e Faturamento
               </h2>
               <select className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-300 outline-none">
                  <option>Últimos 30 dias</option>
                  <option>Últimos 7 dias</option>
                  <option>Este Ano</option>
               </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {revenueMetrics.map((metric, idx) => (
                <Card key={idx} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-6">
                    <div className="text-sm text-slate-400 font-medium mb-2">{metric.title}</div>
                    <div className="text-3xl font-black text-white mb-4">{metric.value}</div>
                    <div className={`flex items-center text-sm font-bold ${metric.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {metric.isUp ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                      {metric.trend} <span className="text-slate-500 ml-1 font-normal">vs período anterior</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
             {/* Automated Funnel Metrics */}
             <section className="lg:col-span-2">
               <Card className="bg-slate-900/60 border-white/10 backdrop-blur-md h-full">
                 <CardContent className="p-8">
                   <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                           <BarChart className="w-5 h-5 text-indigo-400" /> Funil Automático Global
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Tráfego total da máquina processado via SinergIA Bot & ROI Calc</p>
                      </div>
                      <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10">Ao Vivo</Badge>
                   </div>

                   <div className="space-y-6 relative">
                      {/* Visual Line connector */}
                      <div className="absolute top-4 bottom-4 left-6 w-px bg-slate-800 z-0"></div>

                      {funnelMetrics.map((step, idx) => (
                        <div key={idx} className="relative z-10 flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-full border-4 border-slate-950 flex items-center justify-center font-bold text-sm ${
                            idx === 0 ? 'bg-slate-800 text-slate-400' : 
                            idx === funnelMetrics.length - 1 ? 'bg-emerald-500 text-emerald-950' : 'bg-indigo-500/20 border-indigo-500 text-indigo-400'
                          }`}>
                             {idx + 1}
                          </div>
                          <div className="flex-1 bg-slate-900/80 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:border-white/20 transition-colors cursor-default">
                             <div>
                                <div className="text-slate-300 font-medium">{step.stage}</div>
                                {idx > 0 && <div className="text-xs text-slate-500 mt-1">Conversão: <span className="font-bold text-indigo-400">{step.conversion}</span></div>}
                             </div>
                             <div className="text-2xl font-black text-white">{step.count}</div>
                          </div>
                        </div>
                      ))}
                   </div>
                 </CardContent>
               </Card>
             </section>

             {/* Affiliates Withdrawal Panel */}
             <section>
               <Card className="bg-slate-900/60 border-white/10 backdrop-blur-md h-full flex flex-col">
                 <CardContent className="p-8 flex-1 flex flex-col">
                   <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                           <CreditCard className="w-5 h-5 text-teal-400" /> Gateway Afiliados
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Aprovações Pendentes API Mercado Pago</p>
                      </div>
                   </div>

                   <div className="space-y-4 flex-1 overflow-y-auto">
                      {withdrawalRequests.map((req) => (
                         <div key={req.id} className="bg-white/5 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                               <div>
                                 <div className="font-bold text-white text-sm">{req.partner}</div>
                                 <div className="text-xs text-slate-500 font-mono mt-0.5">{req.id} &bull; {req.date}</div>
                               </div>
                               {req.status === 'pending' && <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-0 flex items-center gap-1"><Clock className="w-3 h-3"/> Aguardando</Badge>}
                               {req.status === 'approved' && <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-0 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Pago PIX</Badge>}
                               {req.status === 'rejected' && <Badge className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-0 flex items-center gap-1"><XCircle className="w-3 h-3"/> Recusado</Badge>}
                            </div>
                            
                            <div className="flex items-center gap-2 mb-4 bg-slate-950 rounded-lg p-2 border border-slate-800">
                               <TrendingUp className="w-4 h-4 text-slate-500" />
                               <span className="text-lg font-black text-teal-400">{req.amount}</span>
                               <span className="text-xs text-slate-500 ml-auto truncate max-w-[100px]">{req.pixKey}</span>
                            </div>

                            {req.status === 'pending' && (
                               <div className="flex gap-2">
                                  <Button size="sm" className="flex-1 bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold">
                                     Aprovar PIX
                                  </Button>
                                  <Button size="sm" variant="outline" className="flex-1 bg-transparent border-slate-700 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30">
                                     Recusar
                                  </Button>
                               </div>
                            )}
                         </div>
                      ))}
                   </div>
                   
                   <div className="mt-6 pt-6 border-t border-white/10 text-center">
                      <Button variant="link" className="text-slate-400 hover:text-white">
                         Ver Histórico Completo de Sócios &rarr;
                      </Button>
                   </div>
                 </CardContent>
               </Card>
             </section>
          </div>

        </main>
      </div>
    </ProtectedRoute>
  )
}
