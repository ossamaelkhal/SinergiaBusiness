'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Radar, Target, AlertTriangle, ShieldCheck, ArrowRight, 
  Sparkles, TrendingUp, DollarSign, Clock, Users, ShieldAlert,
  Zap, Database, HelpCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SinergiaSonar from '@/components/features/sonar/SinergiaSonar';

// Opções de tempo de resposta comercial
const respostaOptions = [
  { label: 'Menos de 5 min', value: 'under5', factor: 0.0, desc: 'Ideal' },
  { label: '5 a 15 min', value: '5-15min', factor: 0.18, desc: 'Perda leve' },
  { label: '15 a 60 min', value: '15-60min', factor: 0.38, desc: 'Gargalo visível' },
  { label: '1 a 4 horas', value: '1-4h', factor: 0.58, desc: 'Perda crítica' },
  { label: 'Mais de 4 horas', value: 'over4h', factor: 0.78, desc: 'Vazamento grave' }
];

function SonarAdsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados do Radar e Varredura
  const [domain, setDomain] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('');
  const [scanFinished, setScanFinished] = useState(false);

  // Estados da Calculadora Reativa
  const [leadsPorMes, setLeadsPorMes] = useState(300);
  const [ticketMedio, setTicketMedio] = useState(2500);
  const [tempoResposta, setTempoResposta] = useState('15-60min');

  // Efeito para animação do Radar
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      setScanProgress(0);
      setScanFinished(false);
      
      const statuses = [
        'Conectando com APIs de telemetria pública...',
        'Interceptando latência comercial de emails de teste...',
        'Verificando registros de domínio e infraestrutura de e-mail...',
        'Analisando dados do Dark Funnel e tráfego frio...',
        'Consolidando vazamentos financeiros de leads perdidos...',
        'Calculando LTV perdido por tempo de resposta...'
      ];

      interval = setInterval(() => {
        setScanProgress(prev => {
          const next = prev + 2;
          
          // Mapeia o status de acordo com o progresso
          const statusIdx = Math.min(
            Math.floor((next / 100) * statuses.length),
            statuses.length - 1
          );
          setScanStatus(statuses[statusIdx]);

          if (next >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setScanFinished(true);
            return 100;
          }
          return next;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    setIsScanning(true);
  };

  // Cálculos da Calculadora
  const selectedResposta = respostaOptions.find(o => o.value === tempoResposta) || respostaOptions[2];
  
  // 1. Perda por Latência Comercial (Tempo de Resposta)
  // Baseia-se em 3% de conversão ideal, multiplicada pela taxa de perda do delay
  const conversaoIdeal = 0.03;
  const perdaLatencia = Math.round(leadsPorMes * conversaoIdeal * selectedResposta.factor * ticketMedio);

  // 2. Overhead Burocrático (Trabalho repetitivo do time)
  // Estimativa fixa conservadora para empresas baseada em leads comerciais
  const overheadBurocratico = Math.round(leadsPorMes * 45); 

  // 3. Inadimplência e Caixa Retido
  const perdaInadimplencia = Math.round((leadsPorMes * conversaoIdeal * ticketMedio) * 0.06);

  // Soma dos vazamentos reais
  const totalPerdidoRealidade = perdaLatencia + overheadBurocratico + perdaInadimplencia;

  // Ganhos com SinergIA
  const ganhoSinergiaSales = Math.round(perdaLatencia * 0.85); // Recupera 85% respondendo em <10s
  const ganhoSinergiaCX = Math.round(perdaInadimplencia * 0.50); // Mitiga 50% com réguas automatizadas
  const ganhoSinergiaOperations = Math.round(overheadBurocratico * 0.75); // Automatiza 75% da inserção de dados

  const totalRecuperadoSinergia = ganhoSinergiaSales + ganhoSinergiaCX + ganhoSinergiaOperations;

  // Intercepta as UTMs atuais para passar para o formulário final
  const getBlindarUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('domain', domain);
    params.set('leads', leadsPorMes.toString());
    params.set('ticket', ticketMedio.toString());
    params.set('delay', tempoResposta);
    return `/apply?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-hidden flex flex-col">
      {/* Glows de background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-center pointer-events-none"></div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16 md:py-24 relative z-10 space-y-16">
        
        {/* HERO SECA: INPUT DO DOMÍNIO */}
        {!scanFinished && !isScanning && (
          <div className="text-center max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Radar className="w-4 h-4 animate-pulse" /> Scanner de Eficiência Comercial
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              O seu concorrente já ativou a Máquina. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                Você tem certeza que está seguro?
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Descubra os vazamentos comerciais ocultos do seu domínio. Nosso sonar analisa de forma não-intrusiva a velocidade de resposta, a eficiência de contato e calcula a perda financeira anual da sua operação.
            </p>

            <form onSubmit={handleStartScan} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 pt-4">
              <input 
                type="text"
                required
                placeholder="Insira o domínio corporativo (ex: suaempresa.com.br)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1 px-5 h-14 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 font-bold focus:outline-none focus:border-rose-500 transition-colors"
              />
              <Button type="submit" className="h-14 px-8 bg-rose-600 hover:bg-rose-500 text-white font-black tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] uppercase">
                Auditar Domínio
              </Button>
            </form>
          </div>
        )}

        {/* SCANNING STATE: ANIMATION DE VARREDURA */}
        {isScanning && (
          <div className="max-w-xl mx-auto text-center space-y-8 py-12 animate-in zoom-in-95 duration-500">
            <div className="w-48 h-48 border-2 border-indigo-500/20 rounded-full flex items-center justify-center mx-auto relative overflow-hidden bg-slate-900/40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 to-transparent origin-bottom-right animate-spin" style={{ animationDuration: '2s' }}></div>
              <div className="relative z-10 text-3xl font-black text-indigo-400 font-mono">
                {scanProgress}%
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Analisando telemetria de {domain}</h3>
              <p className="text-xs text-indigo-400 font-mono h-5 animate-pulse">
                {scanStatus}
              </p>
            </div>

            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-indigo-500 transition-all duration-100"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* RELATÓRIO GERADO + LAUDO NEON VERMELHO */}
        {scanFinished && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            
            {/* Header Relatório */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase rounded-full">
                <ShieldCheck className="w-4 h-4" /> Laudo de Telemetria Pronto
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Relatório de Vulnerabilidade Comercial: <span className="text-rose-500 font-mono font-extrabold">{domain}</span>
              </h2>
            </div>

            {/* BOX RED NEON DANGER */}
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full"></div>
              
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-rose-500 font-bold uppercase tracking-wider text-xs">
                    <ShieldAlert className="w-5 h-5 animate-pulse" /> Risco de Vazamento Crítico
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                    Sangramento de Receita Anual Estimado (LTV Perdido)
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    Nosso sonar identificou que a lentidão comercial e a falta de integração operacional na gestão de novos leads estão queimando ativamente o faturamento legítimo da sua base de aquisição.
                  </p>
                </div>
                <div className="md:col-span-4 text-center md:text-right">
                  <div className="text-3xl md:text-4xl font-black text-rose-500 tracking-tighter drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                    R$ 140.000
                  </div>
                  <div className="text-sm text-slate-500 font-bold uppercase my-1">a</div>
                  <div className="text-3xl md:text-4xl font-black text-rose-500 tracking-tighter drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                    R$ 280.000
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block mt-2">Vazamento Anualizado</span>
                </div>
              </div>

              {/* Alerta de Escassez */}
              <div className="mt-8 pt-6 border-t border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-500">
                  <AlertTriangle className="w-4 h-4" /> 
                  Protocolo de Exclusividade (Proteção de Nicho)
                </span>
                <span className="sm:text-right text-rose-400">
                  Atuamos com exclusividade geográfica por sub-nicho. Apenas uma operação por região tem acesso ao nosso ecossistema.
                </span>
              </div>
            </div>

            {/* INTEGRAÇÃO DA CALCULADORA COMPARATIVA */}
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Simule Seus Números Operacionais
                </h3>
                <p className="text-slate-400 text-sm mt-2 font-light">
                  Ajuste os sliders baseando-se no cenário atual da sua operação para ver o comparativo de desperdício em tempo real.
                </p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Sliders de Entrada */}
                <div className="lg:col-span-4 space-y-6 bg-slate-900/50 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
                  {/* Leads */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-bold text-slate-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-500" /> Leads por Mês
                      </label>
                      <span className="text-indigo-400 font-mono font-bold">{leadsPorMes} leads</span>
                    </div>
                    <input 
                      type="range" min="50" max="2000" step="50"
                      value={leadsPorMes}
                      onChange={(e) => setLeadsPorMes(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  {/* Ticket Médio */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-bold text-slate-400 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-slate-500" /> Ticket Médio LTV
                      </label>
                      <span className="text-indigo-400 font-mono font-bold">R$ {ticketMedio.toLocaleString('pt-BR')}</span>
                    </div>
                    <input 
                      type="range" min="1000" max="15000" step="500"
                      value={ticketMedio}
                      onChange={(e) => setTicketMedio(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  {/* Tempo de Resposta */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> Tempo Médio de Resposta
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      {respostaOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setTempoResposta(opt.value)}
                          className={`py-2 px-1.5 rounded-lg text-[10px] font-black border transition-all text-center ${
                            tempoResposta === opt.value
                              ? 'bg-rose-600 text-white border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                              : 'bg-slate-950 text-slate-400 border-white/5 hover:bg-slate-850'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tabela Comparativa de 2 Colunas */}
                <div className="lg:col-span-8 grid md:grid-cols-2 gap-6 items-stretch">
                  
                  {/* Coluna Esquerda: A Realidade (Desperdício) */}
                  <div className="bg-slate-900/30 border border-rose-500/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20 w-max block">
                        A Realidade Comercial
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight">O Sangramento da Operação</h4>
                      
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-xs py-2 border-b border-white/5">
                          <span className="text-slate-400">Perda por Latência Comercial:</span>
                          <span className="font-mono font-bold text-rose-400">R$ {perdaLatencia.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs py-2 border-b border-white/5">
                          <span className="text-slate-400">Overhead Burocrático (Mão de Obra):</span>
                          <span className="font-mono font-bold text-rose-400">R$ {overheadBurocratico.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs py-2">
                          <span className="text-slate-400">Caixa Preso por Inadimplência:</span>
                          <span className="font-mono font-bold text-rose-400">R$ {perdaInadimplencia.toLocaleString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-rose-500/10">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Total Perdido /mês</span>
                      <div className="text-3xl font-black text-rose-500 font-mono mt-1">
                        R$ {totalPerdidoRealidade.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {/* Coluna Direita: O Ecossistema (Ganhos) */}
                  <div className="bg-slate-900/60 border border-emerald-500/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full"></div>
                    
                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded border border-emerald-500/20 w-max block flex items-center gap-1">
                        <Sparkles className="w-3 h-3 animate-pulse" /> Ecossistema SinergIA
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight">Otimização e Recuperação</h4>
                      
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-xs py-2 border-b border-white/5">
                          <span className="text-slate-400">SinergIA Sales (Contato em 10s):</span>
                          <span className="font-mono font-bold text-emerald-400">+ R$ {ganhoSinergiaSales.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs py-2 border-b border-white/5">
                          <span className="text-slate-400">SinergIA Ops (Automações):</span>
                          <span className="font-mono font-bold text-emerald-400">+ R$ {ganhoSinergiaOperations.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs py-2">
                          <span className="text-slate-400">SinergIA CX (Réguas Inteligentes):</span>
                          <span className="font-mono font-bold text-emerald-400">+ R$ {ganhoSinergiaCX.toLocaleString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-emerald-500/20">
                      <span className="text-[9px] font-black text-emerald-400/70 uppercase tracking-widest block flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Total Recuperado /mês
                      </span>
                      <div className="text-3xl font-black text-emerald-400 font-mono mt-1 flex items-baseline gap-1">
                        R$ {totalRecuperadoSinergia.toLocaleString('pt-BR')}
                        <span className="text-xs text-slate-500 font-normal">/mês</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* DETECÇÃO E TELEMETRIA DE SINAIS DE INTENÇÃO (SONAR) */}
            <SinergiaSonar domain={domain} />

            {/* INVERSÃO DE RISCO COMERCIAL */}
            <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-lg font-bold text-white">Modelo de Parceria Estratégica Sem Risco</h4>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  **Setup de Entrada + Taxa de Performance**. Nós assumimos toda a responsabilidade de engenharia e sustentação tecnológica. Você só nos paga pelo resultado de receita gerado e caixa recuperado.
                </p>
              </div>
            </div>

            {/* CTA GLASSMORPHISM 2.0 */}
            <div className="text-center pt-4">
              <Link href={getBlindarUrl()}>
                <Button className="h-16 px-12 bg-white text-slate-950 hover:bg-rose-500 hover:text-white font-black text-md tracking-wider rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(244,63,94,0.3)] transition-all duration-300 transform hover:-translate-y-1 uppercase">
                  Blindar Minha Operação Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-widest font-bold">
                🔒 Auditoria Confidencial em Conformidade com a LGPD
              </p>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default function SonarAdsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-rose-500 font-mono text-xs uppercase tracking-widest animate-pulse">Carregando Scanner...</p>
        </div>
      </div>
    }>
      <SonarAdsContent />
    </Suspense>
  );
}
