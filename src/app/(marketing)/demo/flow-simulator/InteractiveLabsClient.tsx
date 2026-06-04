"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { nichesData } from '@/data/niches';
import { submitApplication } from '@/actions/leads';
import FlowBuilder from '@/components/features/flow-simulator/FlowBuilder';
import FlowDemo from '@/components/features/flow-simulator/FlowDemo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Sparkles, Zap, Workflow, ArrowLeft, ArrowRight, ShieldCheck,
  Building2, Phone, Mail, User, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

export default function InteractiveLabsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNicheParam = searchParams.get('niche') || '';

  // Mapeia e valida o nicho
  const resolveNicheSlug = (param: string): string => {
    const clean = param.toLowerCase().trim();
    if (nichesData[clean]) return clean;
    if (clean === 'saude') return 'faturamento-saude-bemestar';
    if (clean === 'varejo' || clean === 'commerce') return 'commerce-omnichannel-vendas';
    if (clean === 'logistica' || clean === 'infra') return 'operacoes-urgencia-logistica';
    if (clean === 'bpo' || clean === 'financas' || clean === 'credito') return 'bpo-financeiro-credito-tem';
    if (clean === 'servicos') return 'servicos-tecnicos-comerciais';
    if (clean === 'reputacao' || clean === 'cobranca' || clean === 'cs') return 'reputacao-recuperacao-retencao';
    return 'commerce-omnichannel-vendas'; // Default fallback
  };

  const activeSlug = resolveNicheSlug(rawNicheParam);
  const activeNiche = nichesData[activeSlug];

  // Configuração de cores baseada no nicho
  const accentColors: Record<string, {
    text: string,
    bg: string,
    border: string,
    glow: string,
    button: string
  }> = {
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      glow: "from-emerald-500/20 to-emerald-950/20",
      button: "bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
    },
    indigo: {
      text: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      glow: "from-indigo-500/20 to-indigo-950/20",
      button: "bg-indigo-500 hover:bg-indigo-400 text-indigo-950 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
    },
    fuchsia: {
      text: "text-fuchsia-400",
      bg: "bg-fuchsia-500/10",
      border: "border-fuchsia-500/20",
      glow: "from-fuchsia-500/20 to-fuchsia-950/20",
      button: "bg-fuchsia-500 hover:bg-fuchsia-400 text-fuchsia-950 shadow-[0_0_20px_rgba(217,70,239,0.3)]"
    },
    amber: {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      glow: "from-amber-500/20 to-amber-950/20",
      button: "bg-amber-500 hover:bg-amber-400 text-amber-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
    },
    cyan: {
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      glow: "from-cyan-500/20 to-cyan-950/20",
      button: "bg-cyan-500 hover:bg-cyan-400 text-cyan-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
    },
    rose: {
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      glow: "from-rose-500/20 to-rose-950/20",
      button: "bg-rose-500 hover:bg-rose-400 text-rose-950 shadow-[0_0_20px_rgba(225,29,72,0.3)]"
    }
  };

  const currentColors = accentColors[activeNiche.color] || accentColors.fuchsia;

  const NICHE_BASELINES: Record<string, number> = {
    'faturamento-saude-bemestar': 12400,
    'commerce-omnichannel-vendas': 18900,
    'operacoes-urgencia-logistica': 22500,
    'bpo-financeiro-credito-tem': 28200,
    'servicos-tecnicos-comerciais': 14700,
    'reputacao-recuperacao-retencao': 16500,
  };

  // Estados de captura de lead
  const [interactionCount, setInteractionCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasConverted, setHasConverted] = useState(false);

  const baseline = NICHE_BASELINES[activeSlug] || 18900;
  const prejuizoAcumulado = baseline + (interactionCount * 1250);

  // Estados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    document: '',
    revenue: 'poc'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Sincroniza query parameter ao trocar de nicho localmente
  const handleNicheChange = (slug: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('niche', slug);
    router.push(`/demo/flow-simulator?${currentParams.toString()}`);
  };

  const handleInteraction = () => {
    if (hasConverted || isModalOpen) return;
    setInteractionCount(prev => {
      const next = prev + 1;
      if (next >= 3) {
        setIsModalOpen(true);
      }
      return next;
    });
  };

  const handleCompilar = () => {
    if (hasConverted) {
      router.push('/app/discover');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.document) {
      setFormError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setIsSubmitting(true);
    setFormError('');

    try {
      const payload = {
        userData: {
          name: formData.name,
          email: formData.email,
          document: formData.document,
          phone: formData.phone,
          revenue: formData.revenue,
          nichoSlug: activeSlug,
          auditedLoss: prejuizoAcumulado
        },
        trackingData: {
          utm_source: searchParams.get('utm_source') || '',
          utm_medium: searchParams.get('utm_medium') || '',
          utm_campaign: searchParams.get('utm_campaign') || '',
          utm_content: searchParams.get('utm_content') || '',
          gclid: searchParams.get('gclid') || '',
          ga_client_id: searchParams.get('ga_client_id') || '',
          sinergia_affiliate_id: searchParams.get('aff') || searchParams.get('ref') || searchParams.get('partner') || (typeof window !== 'undefined' ? localStorage.getItem('sinergia_affiliate_id') : '') || ''
        }
      };

      const result = await submitApplication(payload);
      if (result.success) {
        setHasConverted(true);
        setIsModalOpen(false);
        // Autenticado silenciosamente via Server Action, joga o lead diretamente para a plataforma
        router.push('/app/discover');
      } else {
        setFormError(result.error || 'Erro ao enviar dados da aplicação.');
      }
    } catch (err) {
      console.error('Erro na submissão do formulário do labs:', err);
      setFormError('Erro de conexão ao processar dados. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden flex flex-col">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-b ${currentColors.glow} opacity-30 blur-[150px]`} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 opacity-20 blur-[130px]" />
      </div>

      {/* Header Fixo do Hub */}
      <header className="relative z-10 border-b border-white/10 bg-slate-900/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mr-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Link>
            <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
            <div>
              <h1 className="text-xl font-black tracking-wider text-white uppercase flex items-center gap-2">
                SinergIA <span className={`text-xs px-2 py-0.5 rounded ${currentColors.bg} ${currentColors.text} border ${currentColors.border}`}>Labs</span>
              </h1>
              <p className="text-xs text-slate-400">Playground de Automação & Simulação Cognitiva</p>
            </div>
          </div>

          {/* Seletor Rápido de Nicho */}
          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden md:inline-block">Segmento Ativo:</label>
            <select
              value={activeSlug}
              onChange={(e) => handleNicheChange(e.target.value)}
              className="bg-slate-900 border border-white/15 text-slate-200 text-xs font-bold rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              {Object.values(nichesData).map((n) => (
                <option key={n.slug} value={n.slug}>
                  {n.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 relative z-10 flex flex-col justify-center">
        {/* Banner do Nicho Adaptativo */}
        <div className="mb-6 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="relative z-10 max-w-2xl">
            <span className={`text-[10px] uppercase tracking-widest font-black ${currentColors.text} bg-white/5 border ${currentColors.border} px-3 py-1 rounded-full mb-3 inline-block`}>
              Simulação de Cenário B2B
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
              Labs personalizado para <span className={currentColors.text}>{activeNiche.shortTitle}</span>
            </h2>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              {activeNiche.subtitle} Explore os robôs ou monte fluxos de IA. Ao final, compile a infraestrutura para realizar o deploy simulado.
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col items-stretch w-full md:w-auto gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`h-12 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all ${currentColors.button}`}
            >
              Liberar Blueprint Completo
            </button>
          </div>
        </div>

        {/* Dashboard de Experiência Tática */}
        <div className="w-full flex-1 flex flex-col">
          <Tabs defaultValue="construtor" className="w-full flex flex-col flex-1 gap-4">
            <div className="flex justify-between items-center bg-slate-900/60 border border-white/10 p-1.5 rounded-xl self-start">
              <TabsList className="bg-transparent border-0 gap-1 p-0 flex h-auto">
                <TabsTrigger
                  value="construtor"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white font-bold text-xs px-4 py-2.5 rounded-lg border-0 transition-colors uppercase tracking-wider text-slate-400"
                >
                  <Workflow className="w-4 h-4 mr-2" />
                  Mapeamento Cognitivo
                </TabsTrigger>
                <TabsTrigger
                  value="simulador"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white font-bold text-xs px-4 py-2.5 rounded-lg border-0 transition-colors uppercase tracking-wider text-slate-400"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Homologação de Agente
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start w-full">
              <div className="lg:col-span-3 flex flex-col w-full">
                {/* Abas com os componentes embutidos */}
                <TabsContent value="construtor" className="mt-0 outline-none">
                  <FlowBuilder
                    isInline={true}
                    nicheSlug={activeSlug}
                    onInteraction={handleInteraction}
                    onCompilar={handleCompilar}
                  />
                </TabsContent>

                <TabsContent value="simulador" className="mt-0 outline-none">
                  <FlowDemo
                    isInline={true}
                    nicheSlug={activeSlug}
                    onInteraction={handleInteraction}
                    onCompilar={handleCompilar}
                  />
                </TabsContent>
              </div>

              {/* Coluna Tática Lateral (1/4): Floating HUD de Auditoria Cognitiva */}
              <div className="lg:col-span-1 bg-slate-900/80 border border-white/10 p-5 rounded-2xl backdrop-blur-md sticky top-6 space-y-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                  <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Auditoria Cognitiva</h3>
                </div>

                {/* Contador Dinâmico A - Vermelho Neon */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Vazamento Mensal Oculto</span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  </div>
                  <div 
                    key={interactionCount}
                    className="text-2xl md:text-3xl font-black text-red-500 tracking-tight drop-shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse"
                  >
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prejuizoAcumulado)}
                    <span className="text-[10px] text-red-400/70 font-medium block mt-0.5">estimado em perdas invisíveis</span>
                  </div>
                </div>

                {/* Contador Dinâmico B - Verde Esmeralda Translúcido */}
                <div className="space-y-3 bg-emerald-950/20 border border-emerald-500/10 rounded-xl p-4">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    Eficiência SinergIA
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Tempo de Resposta:</span>
                      <span className="font-bold text-emerald-400">3 segundos</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1">
                      <div className="bg-emerald-500 h-1 rounded-full w-[98%] animate-pulse" />
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Capacidade de Follow-up:</span>
                      <span className="font-bold text-emerald-400">Infinito</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1">
                      <div className="bg-emerald-500 h-1 rounded-full w-full" />
                    </div>
                  </div>
                </div>

                {/* Métricas de Credibilidade e Resposta Direta */}
                <div className="space-y-4 pt-3 border-t border-white/10">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Métricas de Resposta Direta</h4>

                  {/* 1. Inércia de Follow-up */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-300">Inércia de Follow-up</span>
                      <span className="text-red-400">-44% Conversão</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                      44% dos leads esfriam porque humanos desistem no primeiro &quot;não&quot;. A SinergIA executa réguas persistentes imunes à rejeição até fechar.
                    </p>
                  </div>

                  {/* 2. Chaveamento Cognitivo */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-300">Chaveamento Cognitivo</span>
                      <span className="text-red-400">23 min Perdidos</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                      Tempo perdido por sua equipe para recuperar o foco a cada interrupção de WhatsApp. Isolamos sua retaguarda em massa.
                    </p>
                  </div>

                  {/* 3. Janela das Horas Escuras */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-300">Janela das Horas Escuras</span>
                      <span className="text-red-400">35% de Perda</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                      Oportunidades de alto ticket que chegam à noite e fins de semana. Sua empresa aberta 24/7 com tempo de resposta de 3 segundos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </main>

      {/* Modal Premium de Conversão de Alto Impacto */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-slate-900/90 border border-white/10 text-slate-100 backdrop-blur-3xl shadow-2xl p-6 rounded-2xl">
          <DialogHeader className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)] mb-2">
              <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tight text-white text-center">
              Mapeamento Estrutural Concluído.
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-sm font-light text-center leading-relaxed">
              Sua empresa possui um vazamento estimado de <strong className="text-red-400 font-black">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prejuizoAcumulado)}</strong> mensais em oportunidades invisíveis causadas por delay humano e falhas de follow-up. Nossa infraestrutura se auto-configura instantaneamente para o seu negócio. Se em 30 dias os agentes não pagarem o próprio setup, devolvemos 100% do seu investimento. O risco é nosso, o lucro é seu.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
            {formError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="labs-name" className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" /> Nome Completo
              </Label>
              <Input
                id="labs-name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-950 border-white/10 text-white rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="labs-email" className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" /> E-mail Corporativo
              </Label>
              <Input
                id="labs-email"
                type="email"
                placeholder="nome@empresa.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-950 border-white/10 text-white rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="labs-phone" className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-indigo-400" /> WhatsApp
              </Label>
              <Input
                id="labs-phone"
                placeholder="(DDD) 99999-9999"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-slate-950 border-white/10 text-white rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="labs-document" className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" /> CNPJ ou CPF
              </Label>
              <Input
                id="labs-document"
                placeholder="00.000.000/0000-00"
                value={formData.document}
                onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                className="bg-slate-950 border-white/10 text-white rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="labs-revenue" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Faturamento Operacional
              </Label>
              <select
                id="labs-revenue"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 text-white rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="poc">Piloto PoC (Até R$ 100k/mês)</option>
                <option value="standard">SinergIA Standard (R$ 100k a R$ 500k/mês)</option>
                <option value="enterprise">SinergIA Enterprise (Acima de R$ 500k/mês)</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 mt-2 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-xl uppercase tracking-wider shadow-lg shadow-indigo-500/20"
            >
              {isSubmitting ? 'Gerando Acesso...' : '[ Ativar Configuração e Liberar Blueprint Técnico ]'}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-2 border-t border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Sessão criptografada e homologada via Silent Auth
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
