'use client';

import React, { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Server, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { submitApplication } from '@/actions/leads';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getSandboxLeadAction } from '@/actions/growth';

function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp('(?:^|;)\\s*' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[1]) : '';
}

function getGaClientId(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|;)\s*_ga=([^;]+)/);
  if (!match) return '';
  
  const value = decodeURIComponent(match[1]);
  const parts = value.split('.');
  if (parts.length >= 4) {
    // Ex: GA1.1.123456789.1717000000 -> partes finais: 123456789.1717000000
    return `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
  }
  return value;
}

function ApplyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainParam = searchParams.get('domain') || '';
  const companyIdParam = searchParams.get('companyId') || '';

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    revenue: '',
    teamSize: '',
    bottleneck: '',
    name: '',
    email: '',
    document: '',
    phone: '',
    domain: domainParam
  });

  const mapRevenue = (rev: number) => {
    if (rev < 100000) return 'Até R$ 100 mil';
    if (rev <= 500000) return 'De R$ 100 mil a R$ 500 mil';
    if (rev <= 2000000) return 'De R$ 500 mil a R$ 2 milhões';
    return 'Acima de R$ 2 milhões';
  };

  const mapTeamSize = (employees: number) => {
    if (employees <= 5) return '1 a 5 pessoas';
    if (employees <= 20) return '6 a 20 pessoas';
    if (employees <= 50) return '21 a 50 pessoas';
    return 'Mais de 50 pessoas';
  };

  useEffect(() => {
    if (companyIdParam) {
      const loadSandbox = async () => {
        try {
          const res = await getSandboxLeadAction(companyIdParam);
          if (res.success && res.lead) {
            const l = res.lead;
            const approxMonthlyRevenue = l.yearlyRevenueLeak ? Math.round(l.yearlyRevenueLeak / 1.44) : 150000;
            const resolvedRevenue = mapRevenue(approxMonthlyRevenue);
            const resolvedTeam = mapTeamSize(l.employeeCount || 10);
            
            setFormData(prev => ({
              ...prev,
              name: l.ownerName || '',
              email: l.email || '',
              phone: l.phone || '',
              revenue: resolvedRevenue,
              teamSize: resolvedTeam,
              bottleneck: 'Sistemas desconectados e muito trabalho manual interno',
              domain: l.name || '',
            }));
            setStep(4); // Pula direto para o passo 4 (dados pessoais)
          }
        } catch (e) {
          console.error("Erro ao pré-carregar lead de sandbox:", e);
        }
      };
      loadSandbox();
    }
  }, [companyIdParam]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    
    const utm_source = searchParams.get('utm_source') || '';
    const utm_medium = searchParams.get('utm_medium') || '';
    const utm_campaign = searchParams.get('utm_campaign') || '';
    const utm_content = searchParams.get('utm_content') || '';
    const gclid = searchParams.get('gclid') || '';
    const nichoSlug = searchParams.get('nicho') || '';
    
    const fbc = getCookie('_fbc');
    const fbp = getCookie('_fbp');
    const ga_client_id = getGaClientId();

    const userData = {
      name: formData.name,
      email: formData.email,
      document: formData.document,
      phone: formData.phone,
      revenue: formData.revenue,
      teamSize: formData.teamSize,
      bottleneck: formData.bottleneck,
      nichoSlug
    };

    const trackingData = {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      fbc,
      fbp,
      ga_client_id,
      gclid
    };

    try {
      const res = await submitApplication({ 
        userData,
        trackingData
      });
      
      if (res.success) {
        router.push('/app/discover');
      } else {
        setFormError(res.error || 'Erro ao processar aplicação. Verifique os dados inseridos.');
      }
    } catch (err: any) {
      console.error("Erro ao enviar formulário de aplicação:", err);
      setFormError(err.message || 'Erro de conexão no servidor. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
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
              Auditoria de Fricção Operacional
            </div>
            <h1 className="text-5xl font-black text-white leading-tight">
              Mapeamento de Gargalos & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">Simulação de Retorno.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Mapeie os vazamentos de faturamento da sua operação e ative o seu Blueprint do SinergIA OS para visualizar e simular o retorno da automação cognitiva em tempo real.
            </p>
            
            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Implementação sem Complicação</h4>
                  <p className="text-sm text-slate-500">Integração gradual e suporte dedicado para não interromper sua rotina comercial.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0">
                  <Server className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Estrutura Segura</h4>
                  <p className="text-sm text-slate-500">Seus dados e históricos comerciais são protegidos sob rígidos padrões de segurança.</p>
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
                    className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
             )}

             {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-black text-white mb-2">Qual o faturamento mensal médio atual?</h3>
                  <p className="text-sm text-slate-400 mb-8">Precisamos saber o volume da sua operação para entender a complexidade dos fluxos.</p>
                  
                  <div className="space-y-3">
                     {['Até R$ 100 mil', 'De R$ 100 mil a R$ 500 mil', 'De R$ 500 mil a R$ 2 milhões', 'Acima de R$ 2 milhões'].map((opt) => (
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
                  <h3 className="text-2xl font-black text-white mb-2">Qual o tamanho da sua equipe comercial/operação hoje?</h3>
                  <p className="text-sm text-slate-400 mb-8">Para entendermos como as automações podem apoiar ou otimizar a rotina atual do time.</p>
                  
                  <div className="space-y-3">
                     {['1 a 5 pessoas', '6 a 20 pessoas', '21 a 50 pessoas', 'Mais de 50 pessoas'].map((opt) => (
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
                  <h3 className="text-2xl font-black text-white mb-2">Qual é o seu maior gargalo operacional hoje?</h3>
                  <p className="text-sm text-slate-400 mb-8">Onde estão os maiores pontos de fricção ou perdas?</p>
                  
                  <div className="space-y-3">
                     {[
                       'Demora no atendimento comercial (oportunidades esfriam)', 
                       'Contatos repetitivos e desqualificados sobrecarregando o time', 
                       'Dificuldade em acompanhar e cobrar faturamento atrasado', 
                       'Sistemas desconectados e muito trabalho manual interno'
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
                  <h3 className="text-2xl font-black text-white mb-2">Configuração da Credencial</h3>
                  <p className="text-sm text-slate-400 mb-8">Preencha os dados abaixo para autenticar sua sessão e acessar o simulador de agentes do SinergIA OS.</p>
                  
                  {formError && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in duration-300">
                      <ShieldAlert className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-0.5">Falha no Processamento</span>
                        <span>{formError}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-5">
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nome Completo</label>
                        <input 
                           type="text" 
                           required 
                           disabled={isSubmitting}
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                           className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-55" 
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">CNPJ / CPF da Empresa</label>
                        <input 
                           type="text" 
                           required 
                           disabled={isSubmitting}
                           placeholder="00.000.000/0001-00"
                           value={formData.document}
                           onChange={(e) => setFormData({...formData, document: e.target.value})}
                           className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-55" 
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">E-mail Corporativo</label>
                        <input 
                           type="email" 
                           required 
                           disabled={isSubmitting}
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-55" 
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">WhatsApp de Contato (Com DDD)</label>
                        <input 
                           type="tel" 
                           required 
                           disabled={isSubmitting}
                           value={formData.phone}
                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                           className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-55" 
                        />
                     </div>
                  </div>

                  <div className="flex justify-between items-center mt-10">
                    <Button variant="ghost" type="button" disabled={isSubmitting} onClick={prevStep} className="text-slate-500 hover:text-white">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="h-14 px-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black rounded-xl transition-all hover:scale-105 uppercase tracking-widest flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" /> Ativando Blueprint...
                        </>
                      ) : (
                        <>
                          Ativar Blueprint e Iniciar Simulação <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
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
                    Nosso sistema já processou os seus dados. Um de nossos especialistas analisará seu perfil de faturamento em relação ao seu gargalo atual.
                  </p>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-8 text-left">
                     <p className="text-sm font-medium text-slate-300 mb-2">Próximos passos:</p>
                     <ul className="space-y-2 text-sm text-slate-500">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Você receberá um e-mail de confirmação em breve.</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Entraremos em contato via WhatsApp para marcar uma conversa.</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Mapearemos os fluxos de integração ideais para sua operação.</li>
                     </ul>
                  </div>
                  <Link href="/">
                    <Button variant="outline" className="h-12 px-8 border-white/10 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl">
                      Voltar à Página Inicial
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

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest animate-pulse">Carregando Formulário...</p>
        </div>
      </div>
    }>
      <ApplyContent />
    </Suspense>
  );
}
