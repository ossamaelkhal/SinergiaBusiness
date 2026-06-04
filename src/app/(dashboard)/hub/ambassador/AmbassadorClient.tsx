'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  Copy, TrendingUp, Users, DollarSign, Award, ShieldCheck, 
  LogOut, ExternalLink, ArrowRight, RefreshCw, Send, CheckCircle2,
  Clock, XCircle, ChevronRight, UserCheck, Calendar
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { requestWithdrawalAction } from '@/actions/withdrawals';

interface LeadItem {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  planId: string;
  revenue: string;
}

interface WithdrawalItem {
  id: string;
  amount: number;
  pixKey: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface AmbassadorClientProps {
  partnerUid: string;
  partnerName: string;
  partnerEmail: string;
  leads: LeadItem[];
  withdrawals: WithdrawalItem[];
  metrics: {
    leadsCapturadosCount: number;
    emNegociacaoCount: number;
    licencasAtivasCount: number;
    totalComissoes: number;
    totalSacado: number;
    totalPendente: number;
    saldoDisponivel: number;
  };
}

export function AmbassadorClient({
  partnerUid,
  partnerName,
  partnerEmail,
  leads,
  withdrawals,
  metrics
}: AmbassadorClientProps) {
  const router = useRouter();
  const [selectedDest, setSelectedDest] = useState<'home' | 'sonar' | 'labs'>('home');
  const [origin, setOrigin] = useState('https://sinergia.ai');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form de Saque
  const [pixKeyType, setPixKeyType] = useState('cpf_cnpj');
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const getLink = () => {
    switch (selectedDest) {
      case 'sonar':
        return `${origin}/sonar?aff=${partnerUid}`;
      case 'labs':
        return `${origin}/demo/flow-simulator?aff=${partnerUid}`;
      default:
        return `${origin}/?aff=${partnerUid}`;
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getLink());
    setCopied(true);
    toast.success("Link copiado com sucesso!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = 'sinergia_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      toast.success("Sessão encerrada.");
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError('Por favor, informe um valor de saque válido e maior que zero.');
      return;
    }

    if (parsedAmount > metrics.saldoDisponivel) {
      setFormError(`O valor solicitado excede o saldo disponível de R$ ${metrics.saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.`);
      return;
    }

    if (!pixKey.trim()) {
      setFormError('Por favor, insira uma chave Pix válida.');
      return;
    }

    setLoading(true);
    try {
      const response = await requestWithdrawalAction(parsedAmount, pixKey);
      if (response.success) {
        toast.success(`Solicitação de saque de R$ ${parsedAmount.toFixed(2)} enviada com sucesso!`);
        setAmount('');
        setPixKey('');
        router.refresh(); // Recarrega os dados do Server Component
      } else {
        setFormError(response.error || 'Erro ao processar solicitação de saque.');
        toast.error(response.error || 'Erro ao solicitar saque.');
      }
    } catch (err: any) {
      setFormError('Falha de conexão com o servidor. Tente novamente.');
      toast.error('Erro de conexão ao solicitar saque.');
    } finally {
      setLoading(false);
    }
  };

  // Determinar tier do parceiro
  const getTier = () => {
    const activeCount = metrics.licencasAtivasCount;
    if (activeCount >= 10) return { name: 'Elite Partner', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' };
    if (activeCount >= 3) return { name: 'Vanguard Partner', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    return { name: 'Affiliate Partner', color: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10' };
  };

  const tier = getTier();

  const getStatusBadge = (status: string) => {
    const clean = status.toLowerCase();
    if (clean === 'active_client' || clean === 'closed') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" /> Ativo
        </span>
      );
    }
    if (['qualified', 'waiting_call', 'waiting_onboarding_call', 'new', 'contacted'].includes(clean)) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Clock className="w-3.5 h-3.5 animate-pulse" /> Negociando
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
        <Users className="w-3.5 h-3.5" /> Triagem (VIP)
      </span>
    );
  };

  const getLeadPlan = (lead: LeadItem) => {
    const plan = lead.planId || '';
    const revenue = (lead.revenue || '').toLowerCase();
    if (plan === 'enterprise' || revenue.includes('enterprise') || revenue.includes('acima') || revenue.includes('2 milhões') || revenue.includes('2m')) {
      return { label: 'SinergIA Enterprise', commission: 'R$ 15.000,00' };
    }
    if (plan === 'standard' || revenue.includes('standard') || revenue.includes('500 mil') || revenue.includes('100 mil a')) {
      return { label: 'SinergIA Standard', commission: 'R$ 4.500,00' };
    }
    return { label: 'Piloto PoC', commission: 'R$ 300,00' };
  };

  const getWithdrawalStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Pago
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" /> Recusado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 animate-pulse" /> Pendente
          </span>
        );
    }
  };

  const totalLeads = leads.length;
  const conversionRate = totalLeads > 0 ? (metrics.licencasAtivasCount / totalLeads) * 100 : 0;

  return (
    <div className="space-y-8 text-slate-300 relative">
      {/* Liquid Glass Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-fuchsia-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* HEADER IDENTITY */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 bg-slate-900/60 rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="z-10 text-white space-y-2">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border ${tier.color}`}>
            <Award className="w-4 h-4" /> {tier.name}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-300">
            Ambassador Engine
          </h2>
          <p className="text-slate-400 font-medium">
            Bem-vindo(a), <span className="text-white font-bold">{partnerName}</span>. Acompanhe sua esteira de indicações.
          </p>
        </div>

        <div className="z-10 flex flex-col items-end gap-3 w-full md:w-auto">
          <button 
            onClick={handleLogout} 
            className="text-xs text-slate-500 flex items-center gap-1.5 hover:text-rose-400 transition-colors py-2 px-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-rose-500/5"
          >
            <LogOut className="w-3.5 h-3.5"/> Desconectar
          </button>
        </div>
      </div>

      {/* BLOCO 1: CENTRAL DE DISTRIBUIÇÃO */}
      <Card className="border border-white/10 bg-slate-900/40 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-indigo-400" /> Links de Divulgação Parametrizados
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Selecione o destino público desejado. O sistema injetará automaticamente seu ID para rastreamento de comissões.
              </p>
            </div>
            <div className="flex bg-slate-950/80 p-1 rounded-xl border border-white/10 self-stretch md:self-auto">
              <button
                onClick={() => setSelectedDest('home')}
                className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${selectedDest === 'home' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Home
              </button>
              <button
                onClick={() => setSelectedDest('sonar')}
                className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${selectedDest === 'sonar' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Sonar
              </button>
              <button
                onClick={() => setSelectedDest('labs')}
                className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${selectedDest === 'labs' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Labs
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-3 bg-slate-950 rounded-2xl p-2.5 border border-white/15">
            <div className="flex-1 px-4 py-3 text-sm font-mono text-slate-300 select-all truncate bg-slate-950/50 rounded-xl flex items-center">
              {getLink()}
            </div>
            <Button 
              onClick={copyLink} 
              className={`h-12 px-6 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 ${copied ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copiado!' : 'Copiar Link'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* BLOCO 2: TELEMETRIA DE CONVERSÃO DO FUNIL */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-slate-900/40 border-white/10 backdrop-blur-md relative group hover:border-indigo-500/30 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Contatos Totais</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-4xl font-extrabold text-white font-mono">{metrics.leadsCapturadosCount}</div>
              <p className="text-xs text-slate-500 mt-2">Leads em triagem de perfil (prospect_vip)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-white/10 backdrop-blur-md relative group hover:border-indigo-500/30 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Mesa Comercial</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-4xl font-extrabold text-white font-mono">{metrics.emNegociacaoCount}</div>
              <p className="text-xs text-slate-500 mt-2">Agendamento ou validação em andamento</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-white/10 backdrop-blur-md relative group hover:border-indigo-500/30 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Contratos Ativos</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-4xl font-extrabold text-white font-mono">{metrics.licencasAtivasCount}</div>
              <p className="text-xs text-emerald-400 font-medium flex items-center mt-2">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Conversão: {conversionRate.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PIPELINE GRÁFICO DO FUNIL */}
      <Card className="border border-white/10 bg-slate-900/40 backdrop-blur-2xl">
        <CardContent className="p-6 md:p-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Pipeline Visual da Esteira</h4>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Etapa 1 */}
            <div className="w-full bg-slate-950/60 p-5 rounded-2xl border border-white/5 text-center flex-1 flex flex-col justify-center items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">1. Triagem</span>
              <div className="text-2xl font-black text-white mt-1">{metrics.leadsCapturadosCount}</div>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mt-2">Aguardando Validação</span>
            </div>

            <ChevronRight className="w-6 h-6 text-slate-600 hidden md:block" />

            {/* Etapa 2 */}
            <div className="w-full bg-slate-950/60 p-5 rounded-2xl border border-white/5 text-center flex-1 flex flex-col justify-center items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">2. Onboarding Call</span>
              <div className="text-2xl font-black text-white mt-1">{metrics.emNegociacaoCount}</div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mt-2">Mesa Comercial</span>
            </div>

            <ChevronRight className="w-6 h-6 text-slate-600 hidden md:block" />

            {/* Etapa 3 */}
            <div className="w-full bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/20 text-center flex-1 flex flex-col justify-center items-center shadow-[0_0_20px_rgba(99,102,241,0.05)]">
              <span className="text-xs font-bold text-indigo-400 uppercase">3. Licença Ativa</span>
              <div className="text-2xl font-black text-indigo-400 mt-1">{metrics.licencasAtivasCount}</div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-2">Faturado & Pago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BLOCO 3: LIVRO RAZÃO & FORM PIX */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* FINANCE LEDGER */}
        <Card className="border border-white/10 bg-slate-900/40 backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" /> Extrato Financeiro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Faturado</span>
                <div className="text-xl font-bold text-slate-300 mt-1 font-mono">
                  R$ {metrics.totalComissoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pago / Sacado</span>
                <div className="text-xl font-bold text-slate-400 mt-1 font-mono">
                  R$ {metrics.totalSacado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Aguardando Aprovação</span>
                <div className="text-xl font-bold text-amber-500/80 mt-1 font-mono">
                  R$ {metrics.totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-950/80 rounded-2xl border border-emerald-500/20 relative shadow-[0_0_30px_rgba(16,185,129,0.08)] mt-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                Saldo Disponível para Saque
              </span>
              <div className="text-4xl font-black text-white font-mono drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                R$ {metrics.saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-slate-500 block mt-2">
                * Valores com base em contratos liquidados. Saques sujeitos à auditoria fiscal.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* PIX WITHDRAWAL FORM */}
        <Card className="border border-white/10 bg-slate-900/40 backdrop-blur-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-indigo-400" /> Resgate via Chave PIX
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
              {formError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-xs font-medium">
                  {formError}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="withdrawal-amount" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Valor do Resgate (R$)
                </Label>
                <Input
                  id="withdrawal-amount"
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-slate-950 border-white/10 text-white rounded-xl focus:border-indigo-500 font-mono text-lg"
                  required
                />
                <span className="text-[10px] text-slate-500 block">
                  Disponível para saque: R$ {metrics.saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pix-type" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tipo de Chave Pix
                </Label>
                <select
                  id="pix-type"
                  value={pixKeyType}
                  onChange={(e) => setPixKeyType(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 text-white rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="cpf_cnpj">CPF ou CNPJ</option>
                  <option value="email">E-mail</option>
                  <option value="phone">Telefone</option>
                  <option value="random">Chave Aleatória (EVP)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pix-key" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Chave Pix de Destino
                </Label>
                <Input
                  id="pix-key"
                  placeholder="Insira sua chave Pix"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  className="bg-slate-950 border-white/10 text-white rounded-xl focus:border-indigo-500"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading || metrics.saldoDisponivel <= 0}
                className="w-full h-12 mt-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold rounded-xl uppercase tracking-wider shadow-lg disabled:opacity-40"
              >
                {loading ? 'Processando Resgate...' : 'Solicitar Resgate'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* TABLE 1: HISTÓRICO DE INDICAÇÕES */}
      <Card className="border border-white/10 bg-slate-900/40 backdrop-blur-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-400" /> Registro de Indicações
          </CardTitle>
          <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-400">
            {totalLeads} {totalLeads === 1 ? 'indicação' : 'indicações'}
          </span>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {leads.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border border-dashed border-white/5 rounded-2xl">
              Nenhuma indicação registrada até o momento. Compartilhe seus links acima para começar!
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Contato</th>
                  <th className="pb-3">Plano Pretendido</th>
                  <th className="pb-3 text-center">Status</th>
                  <th className="pb-3 text-right">Comissão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {leads.map((lead) => {
                  const plan = getLeadPlan(lead);
                  return (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4">
                        <div className="font-bold text-white">{lead.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{lead.email}</div>
                      </td>
                      <td className="py-4">
                        <div className="text-slate-300 font-medium">{plan.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 font-mono">ID: {lead.id}</div>
                      </td>
                      <td className="py-4 text-center">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="py-4 text-right font-bold text-slate-300 font-mono">
                        {lead.status.toLowerCase() === 'active_client' || lead.status.toLowerCase() === 'closed' ? (
                          <span className="text-emerald-400">{plan.commission}</span>
                        ) : (
                          <span className="text-slate-500">{plan.commission} (Pendente)</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* TABLE 2: HISTÓRICO DE SAQUES */}
      <Card className="border border-white/10 bg-slate-900/40 backdrop-blur-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" /> Histórico de Resgates
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {withdrawals.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border border-dashed border-white/5 rounded-2xl">
              Nenhuma solicitação de saque registrada.
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Data</th>
                  <th className="pb-3">Destino (Chave Pix)</th>
                  <th className="pb-3 text-center">Status</th>
                  <th className="pb-3 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 text-slate-400">
                      {new Date(withdrawal.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-4">
                      <div className="text-white font-medium truncate max-w-[200px]">{withdrawal.pixKey}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {withdrawal.id}</div>
                    </td>
                    <td className="py-4 text-center">
                      {getWithdrawalStatusBadge(withdrawal.status)}
                    </td>
                    <td className="py-4 text-right font-bold text-white font-mono">
                      R$ {withdrawal.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
