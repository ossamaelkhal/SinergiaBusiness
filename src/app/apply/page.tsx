'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Server, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    revenue: '',
    teamSize: '',
    bottleneck: '',
    name: '',
    email: '',
    phone: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (e) {} // silent fail para UX
    setStep(5); // Success step
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans relative overflow-hidden flex flex-col">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full p-6 relative z-10 flex justify-between items-center border-b border-white/5">
        <div className="font-black text-2xl tracking-tighter">
          <span className="text-white">Sinerg</span><span className="text-emerald-400">IA</span>
        </div>
        <Link href="/">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Authority & Proof */}
          <div className="hidden lg:block space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              Sessão Confidencial
            </div>
            <h1 className="text-5xl font-black text-white leading-tight">
              O primeiro passo para a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Autonomia.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Devido à alta demanda e ao nosso protocolo de exclusividade de nicho, nós filtramos rigorosamente com quem trabalhamos. Queremos garantir que o SinergIA OS traga um ROI de pelo menos 10x para a sua operação.
            </p>
            
            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Implementação Rápida</h4>
                  <p className="text-sm text-slate-500">Se aprovado, seu ecossistema estará operacional em 48 horas.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0">
                  <Server className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Infraestrutura Privada</h4>
                  <p className="text-sm text-slate-500">Seus dados e seus leads nunca são compartilhados ou usados em modelos públicos.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Application Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
             {/* Progress Bar */}
             {step < 5 && (
               <div className="w-full h-1 bg-slate-800 rounded-full mb-10 overflow-hidden">
                 <div 
                   className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 ease-out"
                   style={{ width: `${(step / 4) * 100}%` }}
                 ></div>
               </div>
             )}

             {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-black text-white mb-2">Qual o faturamento mensal médio atual?</h3>
                  <p className="text-sm text-slate-400 mb-8">Precisamos saber o volume da sua operação para dimensionar a capacidade dos servidores (TTFV).</p>
                  
                  <div className="space-y-3">
                     {['Até R$ 50.000', 'De R$ 50k a R$ 200k', 'De R$ 200k a R$ 500k', 'Acima de R$ 500.000'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setFormData({...formData, revenue: opt}); nextStep(); }}
                          className="w-full text-left px-6 py-4 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-300 font-medium transition-all group"
                        >
                          {opt}
                        </button>
                     ))}
                  </div>
                </div>
             )}

             {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-black text-white mb-2">Qual o tamanho do seu time de vendas hoje?</h3>
                  <p className="text-sm text-slate-400 mb-8">Para calcularmos quantos Agentes de IA serão necessários para substituir ou escalar o gargalo.</p>
                  
                  <div className="space-y-3">
                     {['Apenas eu (Autônomo)', '1 a 3 vendedores', '4 a 10 vendedores', 'Mais de 10 vendedores'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setFormData({...formData, teamSize: opt}); nextStep(); }}
                          className="w-full text-left px-6 py-4 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-slate-300 font-medium transition-all"
                        >
                          {opt}
                        </button>
                     ))}
                  </div>
                  <Button variant="ghost" onClick={prevStep} className="mt-6 text-slate-500 hover:text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                  </Button>
                </div>
             )}

             {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-black text-white mb-2">Qual é o seu maior gargalo hoje?</h3>
                  <p className="text-sm text-slate-400 mb-8">Seja brutalmente honesto. Onde o dinheiro está vazando?</p>
                  
                  <div className="space-y-3">
                     {[
                       'Leads desqualificados (muito curioso)', 
                       'Demora no atendimento (lead esfria)', 
                       'Dificuldade de escalar (dependo de pessoas)', 
                       'Custo alto com SDRs e time comercial'
                     ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setFormData({...formData, bottleneck: opt}); nextStep(); }}
                          className="w-full text-left px-6 py-4 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-slate-300 font-medium transition-all"
                        >
                          {opt}
                        </button>
                     ))}
                  </div>
                  <Button variant="ghost" onClick={prevStep} className="mt-6 text-slate-500 hover:text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                  </Button>
                </div>
             )}

             {step === 4 && (
                <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-black text-white mb-2">Última etapa.</h3>
                  <p className="text-sm text-slate-400 mb-8">Para onde enviamos o link de agendamento ou aprovação do setup?</p>
                  
                  <div className="space-y-5">
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nome do C-Level / Responsável</label>
                        <input type="text" required className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">E-mail Corporativo</label>
                        <input type="email" required className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">WhatsApp (Com DDD)</label>
                        <input type="tel" required className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                     </div>
                  </div>

                  <div className="flex justify-between items-center mt-10">
                    <Button variant="ghost" type="button" onClick={prevStep} className="text-slate-500 hover:text-white">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                    </Button>
                    <Button type="submit" className="h-14 px-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black rounded-xl transition-all hover:scale-105 uppercase tracking-widest">
                      Enviar Aplicação <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
             )}

             {step === 5 && (
                <div className="animate-in zoom-in-95 fade-in duration-700 text-center py-8">
                  <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">Aplicação Recebida!</h3>
                  <p className="text-slate-400 leading-relaxed mb-8">
                    Nosso sistema já processou os seus dados. Um de nossos diretores analisará seu perfil de faturamento em relação ao seu gargalo atual.
                  </p>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-8 text-left">
                     <p className="text-sm font-medium text-slate-300 mb-2">Próximos passos:</p>
                     <ul className="space-y-2 text-sm text-slate-500">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Você receberá um e-mail em até 1 hora.</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Caso aprovado, agendaremos a reunião de Setup.</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> SinergIA OS será implementado em 48h (TTFV).</li>
                     </ul>
                  </div>
                  <Link href="/">
                    <Button variant="outline" className="h-12 px-8 border-white/10 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl">
                      Voltar ao Painel
                    </Button>
                  </Link>
                </div>
             )}

          </div>
        </div>
      </main>
    </div>
  );
}
