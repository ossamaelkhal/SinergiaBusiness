'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowRight, 
  Activity, 
  Clock, 
  Workflow, 
  Cpu, 
  Database, 
  Landmark, 
  AlertTriangle,
  HelpCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNicheBySlug } from '@/data/niches';
import { formatBRL } from '@/lib/utils';

const respostaOptions = [
  { label: 'Menos de 5 minutos', value: 'under5', lossFactor: 0.0, desc: 'Ideal. Quase 100% de aproveitamento de leads.' },
  { label: '5 a 15 minutos', value: '5-15min', lossFactor: 0.18, desc: 'Leve perda de tração comercial (~18% perdidos).' },
  { label: '15 a 60 minutos', value: '15-60min', lossFactor: 0.38, desc: 'Gargalo visível. 38% dos leads esfriam antes do contato.' },
  { label: '1 a 4 horas', value: '1-4h', lossFactor: 0.58, desc: 'Perda crítica. Mais da metade dos leads não respondem.' },
  { label: 'Mais de 4 horas', value: 'over4h', lossFactor: 0.78, desc: 'Vazamento grave. 78% de desperdício em aquisição.' }
];

const NICHES_TEAM_SIZES: Record<string, number> = {
  "faturamento-saude-bemestar": 3,
  "commerce-omnichannel-vendas": 3,
  "operacoes-urgencia-logistica": 5,
  "bpo-financeiro-credito-tem": 3,
  "servicos-tecnicos-comerciais": 4,
  "reputacao-recuperacao-retencao": 3,
  "imobiliario": 8,
  "ecommerce": 2
};

export function ROICalculator({ nicheSlug }: { nicheSlug?: string } = {}) {

  // 1. Inputs Gerais
  const [leadsPorMes, setLeadsPorMes] = useState(300);
  const [ticketMedio, setTicketMedio] = useState(2000);
  const [taxaConversaoAtual, setTaxaConversaoAtual] = useState(3.0); // %

  // 2. Tempo de Resposta (Vendas)
  const [tempoResposta, setTempoResposta] = useState('15-60min');

  // 3. Custos de Equipe (Overhead)
  const [tamanhoEquipe, setTamanhoEquipe] = useState(4);
  const [custoVendedor, setCustoVendedor] = useState(4500); // R$ por mês
  const [tempoAdmin, setTempoAdmin] = useState(35); // % de tempo perdido em tarefas repetitivas

  // 4. Financeiro (Inadimplência)
  const [faturamentoFaturado, setFaturamentoFaturado] = useState(80000); // Faturamento via boleto/parcelado
  const [taxaInadimplencia, setTaxaInadimplencia] = useState(6.0); // % de inadimplência ativa

  // 5. Clientes / Contatos inativos (Base)
  const [baseLeadsFrios, setBaseLeadsFrios] = useState(2000); // Base estagnada no CRM

  // 6. Módulos Autônomos Ativos (Configuração de Licenciamento)
  const [moduloPiloto, setModuloPiloto] = useState(true);
  const [moduloResgate, setModuloResgate] = useState(true);
  const [moduloBackoffice, setModuloBackoffice] = useState(true);

  // Buscar dados do nicho para preenchimento dinâmico
  const nicheData = nicheSlug ? getNicheBySlug(nicheSlug) : null;
  const financialMetrics = nicheData?.financialMetrics;

  const currentCAC = financialMetrics?.currentCAC ?? 300;
  const projectedCAC = financialMetrics?.projectedCAC ?? 100;

  // Sincronizar estados com os dados do nicho
  useEffect(() => {
    if (financialMetrics) {
      if (financialMetrics.avgTicket) {
        setTicketMedio(financialMetrics.avgTicket);
      }
      if (financialMetrics.estimatedLatency) {
        const latency = financialMetrics.estimatedLatency;
        if (latency <= 300) setTempoResposta('under5');
        else if (latency <= 900) setTempoResposta('5-15min');
        else if (latency <= 3600) setTempoResposta('15-60min');
        else if (latency <= 14400) setTempoResposta('1-4h');
        else setTempoResposta('over4h');
      }
      if (financialMetrics.leadsPerMonth !== undefined) {
        setLeadsPorMes(financialMetrics.leadsPerMonth);
      }
      if (financialMetrics.billedRevenue !== undefined) {
        setFaturamentoFaturado(financialMetrics.billedRevenue);
      }
      if (financialMetrics.defaultRate !== undefined) {
        setTaxaInadimplencia(financialMetrics.defaultRate);
      }
      if (financialMetrics.coldLeadsBase !== undefined) {
        setBaseLeadsFrios(financialMetrics.coldLeadsBase);
      }
      if (financialMetrics.teamCosts !== undefined) {
        const teamSize = nicheSlug ? (NICHES_TEAM_SIZES[nicheSlug] ?? 4) : 4;
        setTamanhoEquipe(teamSize);
        setCustoVendedor(Math.round(financialMetrics.teamCosts / teamSize));
      }
      setModuloPiloto(true);
      setModuloResgate(true);
      setModuloBackoffice(true);
    }
  }, [nicheSlug, financialMetrics]);

  // --- CÁLCULOS DETALHADOS DE PERDAS (Dinheiro deixado na mesa) ---

  // A. Perda por Latência de Leads
  const selectedResposta = respostaOptions.find(o => o.value === tempoResposta) || respostaOptions[2];
  const fatorPerdaLatencia = selectedResposta.lossFactor;
  // Perda = leads que converteriam se o atendimento fosse imediato (<5m), mas que são perdidos pela lentidão
  const receitaPerdidaLatencia = Math.round(leadsPorMes * (taxaConversaoAtual / 100) * fatorPerdaLatencia * ticketMedio);

  // B. Desperdício Operacional (Overhead)
  // Horas ou salários pagos a vendedores para fazer trabalho de inserção manual, digitação e controle
  const desperdicioOperacional = Math.round(tamanhoEquipe * custoVendedor * (tempoAdmin / 100));

  // C. Caixa Preso por Inadimplência Ativa
  const perdaInadimplencia = Math.round(faturamentoFaturado * (taxaInadimplencia / 100));

  // D. Oportunidades Esquecidas na Base Fria
  // Conversão de 0.3% ao mês de contatos inativos se houvesse régua ativa automática
  const receitaEsquecidaBase = Math.round((baseLeadsFrios * 0.003) * ticketMedio);

  // E. Desperdício por CAC Elevado (antes da SinergIA)
  const desperdicioCAC = Math.round(currentCAC * leadsPorMes);

  // Soma de todas as perdas
  const totalDesperdicio = receitaPerdidaLatencia + desperdicioOperacional + perdaInadimplencia + receitaEsquecidaBase + desperdicioCAC;

  // --- CÁLCULOS DE MONETIZAÇÃO DINÂMICA DA SINERGIA ---
  const infraBase = Math.max(490, Math.round(leadsPorMes * 0.50));
  const activeModulesCount = (moduloPiloto ? 1 : 0) + (moduloResgate ? 1 : 0) + (moduloBackoffice ? 1 : 0);
  const custoSinergia = infraBase + (activeModulesCount * 350);
  const setupSinergia = activeModulesCount * 1500;

  // --- CÁLCULOS DE RECUPERAÇÃO COM SINERGIA ---
  // Taxas de mitigação realistas condicionadas à ativação de cada módulo
  const recuperadoLatencia = moduloPiloto ? Math.round(receitaPerdidaLatencia * 0.85) : 0; // Agente 24h atende em <10 segundos
  const recuperadoOverhead = moduloBackoffice ? Math.round(desperdicioOperacional * 0.75) : 0; // Automações eliminam 75% da digitação
  const recuperadoInadimplencia = moduloResgate ? Math.round(perdaInadimplencia * 0.45) : 0; // Régua de cobrança reduz 45% do atraso
  const recuperadoBase = moduloResgate ? Math.round(receitaEsquecidaBase * 0.70) : 0; // Nutrição automatizada recupera 70% do potencial
  const recuperadoCAC = moduloPiloto ? Math.round((currentCAC - projectedCAC) * leadsPorMes) : 0;

  const totalRecuperado = recuperadoLatencia + recuperadoOverhead + recuperadoInadimplencia + recuperadoBase + recuperadoCAC;
  const netROI = totalRecuperado - custoSinergia;

  // Porcentagem das perdas totais que conseguimos recuperar
  const percentualRecuperado = totalDesperdicio > 0 ? Math.round((totalRecuperado / totalDesperdicio) * 100) : 0;


  return (
    <section id="roi-calculator" className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-6">
            <Calculator className="w-4 h-4" />
            Diagnóstico de Eficiência Comercial
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Raio-X de <span className="text-emerald-400">Receita Oculta</span>
          </h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            Sua empresa pode estar perdendo dinheiro todos os dias com gargalos invisíveis. 
            Preencha os dados reais da sua operação para mapear seus vazamentos financeiros.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: INPUTS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Card 1: Vendas e Latência */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-white/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Vendas & Resposta Comercial</h3>
                    <p className="text-xs text-slate-500">Tempo de atendimento e taxas de conversão de novos contatos</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Leads Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <label className="font-bold text-slate-300 flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-500" /> Volume de Leads /mês
                      </label>
                      <span className="text-base font-black text-indigo-400">{leadsPorMes} leads</span>
                    </div>
                    <input 
                      type="range" min="10" max="3000" step="10" 
                      value={leadsPorMes} 
                      onChange={(e) => setLeadsPorMes(Number(e.target.value))}
                      className="w-full accent-indigo-500" 
                    />
                  </div>

                  {/* Ticket Médio & Conversão */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Ticket Médio (LTV)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-slate-500 font-bold text-sm">R$</span>
                        <input 
                          type="number"
                          value={ticketMedio}
                          onChange={(e) => setTicketMedio(Math.max(0, Number(e.target.value)))}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white font-bold focus:border-indigo-500 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Taxa de Conversão Atual</label>
                      <div className="relative">
                        <input 
                          type="number"
                          step="0.1"
                          value={taxaConversaoAtual}
                          onChange={(e) => setTaxaConversaoAtual(Math.max(0.1, Number(e.target.value)))}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-white font-bold focus:border-indigo-500 focus:outline-none text-sm"
                        />
                        <span className="absolute right-4 top-3 text-slate-500 font-bold text-sm">%</span>
                      </div>
                    </div>
                  </div>

                  {/* Tempo de Resposta Selector */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Tempo Médio de Primeiro Contato</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {respostaOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setTempoResposta(opt.value)}
                          className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all ${
                            tempoResposta === opt.value
                              ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                              : 'bg-slate-950 text-slate-400 border-white/5 hover:bg-slate-800'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 italic">{selectedResposta.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Burocracia e Operacional */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-white/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Workflow className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Overhead & Processos Manuais</h3>
                    <p className="text-xs text-slate-500">Tempo da equipe de vendas desperdiçado em tarefas administrativas</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Vendedores & Custo */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Número de Vendedores</label>
                      <input 
                        type="number"
                        value={tamanhoEquipe}
                        onChange={(e) => setTamanhoEquipe(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-white font-bold focus:border-amber-500 focus:outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Custo Médio p/ Vendedor (Mensal)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-slate-500 font-bold text-sm">R$</span>
                        <input 
                          type="number"
                          value={custoVendedor}
                          onChange={(e) => setCustoVendedor(Math.max(0, Number(e.target.value)))}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white font-bold focus:border-amber-500 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tempo Administativo Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <label className="font-bold text-slate-300">
                        Tempo perdido em planilhas/digitação/follow-up
                      </label>
                      <span className="text-base font-black text-amber-400">{tempoAdmin}% do dia</span>
                    </div>
                    <input 
                      type="range" min="5" max="80" step="5" 
                      value={tempoAdmin} 
                      onChange={(e) => setTempoAdmin(Number(e.target.value))}
                      className="w-full accent-amber-500" 
                    />
                    <p className="text-[11px] text-slate-500 italic">Copiar e colar no WhatsApp, preencher CRM, agendar reuniões e gerar relatórios.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Financeiro e Inadimplência */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-white/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Inadimplência & Caixa Retido</h3>
                    <p className="text-xs text-slate-500">Impacto financeiro de cobranças manuais e falta de réguas</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Faturamento via Boleto/Faturado</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-slate-500 font-bold text-sm">R$</span>
                      <input 
                        type="number"
                        value={faturamentoFaturado}
                        onChange={(e) => setFaturamentoFaturado(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white font-bold focus:border-rose-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Taxa de Inadimplência Média</label>
                    <div className="relative">
                      <input 
                        type="number"
                        step="0.5"
                        value={taxaInadimplencia}
                        onChange={(e) => setTaxaInadimplencia(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-white font-bold focus:border-rose-500 focus:outline-none text-sm"
                      />
                      <span className="absolute right-4 top-3 text-slate-500 font-bold text-sm">%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Base Esquecida */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-white/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Base Inativa (Clientes Frios)</h3>
                    <p className="text-xs text-slate-500">Contatos no CRM que nunca mais receberam ações de reengajamento</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <label className="font-bold text-slate-300">Tamanho da base inativa</label>
                    <span className="text-base font-black text-emerald-400">{baseLeadsFrios.toLocaleString()} contatos</span>
                  </div>
                  <input 
                    type="range" min="100" max="15000" step="100" 
                    value={baseLeadsFrios} 
                    onChange={(e) => setBaseLeadsFrios(Number(e.target.value))}
                    className="w-full accent-emerald-500" 
                  />
                  <p className="text-[11px] text-slate-500 italic">Clientes antigos ou oportunidades perdidas no passado que estão abandonados no CRM.</p>
                </div>
              </CardContent>
            </Card>

            {/* Card 5: Seleção de Módulos Autônomos */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-white/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Módulos Autônomos Ativos</h3>
                    <p className="text-xs text-slate-500">Selecione os módulos a serem provisionados para sua infraestrutura</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Modulo 1: Piloto Automático */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-colors">
                    <input 
                      type="checkbox" 
                      id="moduloPiloto"
                      checked={moduloPiloto}
                      onChange={(e) => setModuloPiloto(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-white/10 accent-indigo-500"
                    />
                    <label htmlFor="moduloPiloto" className="text-xs text-slate-300 cursor-pointer w-full">
                      <strong className="text-white block mb-0.5">O Piloto Automático (WhatsApp/Instagram)</strong>
                      {nicheData?.hooks.pilotoAutomatico.title || "Qualificação e conversação ativa 24/7"}
                    </label>
                  </div>

                  {/* Modulo 2: Resgate Ativo */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-colors">
                    <input 
                      type="checkbox" 
                      id="moduloResgate"
                      checked={moduloResgate}
                      onChange={(e) => setModuloResgate(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-white/10 accent-indigo-500"
                    />
                    <label htmlFor="moduloResgate" className="text-xs text-slate-300 cursor-pointer w-full">
                      <strong className="text-white block mb-0.5">O Resgate Ativo (Inadimplência/Inativos)</strong>
                      {nicheData?.hooks.resgateAtivo.title || "Recuperação de faturamento atrasado e inativos"}
                    </label>
                  </div>

                  {/* Modulo 3: Backoffice */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-colors">
                    <input 
                      type="checkbox" 
                      id="moduloBackoffice"
                      checked={moduloBackoffice}
                      onChange={(e) => setModuloBackoffice(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-white/10 accent-indigo-500"
                    />
                    <label htmlFor="moduloBackoffice" className="text-xs text-slate-300 cursor-pointer w-full">
                      <strong className="text-white block mb-0.5">O Backoffice (Auditoria/OCR)</strong>
                      {nicheData?.hooks.backoffice.title || "Auditoria automática, OCR e SEFAZ"}
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* RIGHT COLUMN: REPORT & RESULTS */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            {/* Main Result Card */}
            <Card className="bg-slate-900 border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"></div>
              <CardContent className="p-8">
                
                <div className="text-center pb-6 border-b border-white/5 mb-6">
                  <span className="text-slate-500 text-xs font-black uppercase tracking-widest">Desperdício Mensal Estimado</span>
                  <div className="text-4xl md:text-5xl font-black text-rose-500 mt-2 tracking-tight">
                    {formatBRL(totalDesperdicio)}
                  </div>
                  <p className="text-slate-400 text-xs mt-2">Dinheiro que a sua operação atual está deixando na mesa</p>
                </div>

                {/* Leakage Breakdown Progress Bars */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Origem do Vazamento Financeiro:</h4>
                  
                  {/* Latency Leak */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Perda por Latência (Comercial)</span>
                      <span className="font-bold text-rose-400">{formatBRL(receitaPerdidaLatencia)}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full" 
                        style={{ width: `${totalDesperdicio > 0 ? (receitaPerdidaLatencia / totalDesperdicio) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Operational Overhead Leak */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Overhead Burocrático (Mão de obra)</span>
                      <span className="font-bold text-rose-400">{formatBRL(desperdicioOperacional)}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full" 
                        style={{ width: `${totalDesperdicio > 0 ? (desperdicioOperacional / totalDesperdicio) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Defaults Leak */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Inadimplência e Contas Atrasadas</span>
                      <span className="font-bold text-rose-400">{formatBRL(perdaInadimplencia)}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-rose-500 rounded-full" 
                        style={{ width: `${totalDesperdicio > 0 ? (perdaInadimplencia / totalDesperdicio) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Inactive Database Leak */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Oportunidades Inativas (Base CRM)</span>
                      <span className="font-bold text-rose-400">{formatBRL(receitaEsquecidaBase)}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full" 
                        style={{ width: `${totalDesperdicio > 0 ? (receitaEsquecidaBase / totalDesperdicio) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* CAC Leak */}
                  {desperdicioCAC > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-300">
                        <span>Desperdício por CAC Elevado</span>
                        <span className="font-bold text-rose-400">{formatBRL(desperdicioCAC)}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500 rounded-full" 
                          style={{ width: `${totalDesperdicio > 0 ? (desperdicioCAC / totalDesperdicio) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* SinergIA Optimization Box */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden mb-6">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 blur-xl rounded-full"></div>
                  
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" /> Projeção de Recuperação SinergIA
                  </div>

                  <div className="text-3xl font-black text-white tracking-tight mb-4">
                    + {formatBRL(totalRecuperado)} <span className="text-xs text-slate-400 font-normal">/mês bruto</span>
                  </div>

                  <div className="space-y-2 border-t border-emerald-500/20 pt-4 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Infraestrutura Cognitiva Base:</span>
                      <span className="font-bold text-white">{formatBRL(infraBase)}/mês</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Módulos Ativos ({activeModulesCount}):</span>
                      <span className="font-bold text-white">{formatBRL(activeModulesCount * 350)}/mês</span>
                    </div>
                    <div className="flex justify-between text-slate-300 border-t border-white/5 pt-2">
                      <span className="font-bold text-emerald-400">Licenciamento de Módulos de Negócio SinergIA:</span>
                      <span className="font-extrabold text-emerald-400">{formatBRL(custoSinergia)}/mês</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="font-bold text-indigo-400">Retorno Líquido Mensal:</span>
                      <span className="font-extrabold text-indigo-400">{formatBRL(netROI)}/mês</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[10px] pt-1 border-t border-white/5 mt-2">
                      <span>Setup de Engenharia (Provisionamento):</span>
                      <span>{formatBRL(setupSinergia)}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-[11px] mt-4 leading-relaxed">
                    Você pode recuperar até <strong className="text-emerald-400">{percentualRecuperado}%</strong> do seu desperdício financeiro mensal aplicando a nossa infraestrutura.
                  </p>
                </div>

                <Link 
                  href={{
                    pathname: '/apply',
                    query: {
                      nicho: nicheSlug || '',
                      modules: [
                        moduloPiloto ? 'piloto' : '',
                        moduloResgate ? 'resgate' : '',
                        moduloBackoffice ? 'backoffice' : ''
                      ].filter(Boolean).join(',')
                    }
                  }} 
                  className="w-full"
                >
                  <Button className="w-full bg-white text-slate-950 hover:bg-emerald-400 font-bold h-14 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                    Receber Laudo Detalhado Grátis
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>

              </CardContent>
            </Card>

            {/* Diagnostic Details / Laudo Técnico */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Laudo de Oportunidades:
              </h4>

              {/* Latency Feedback */}
              {receitaPerdidaLatencia > 0 && (
                <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl text-xs space-y-1.5 leading-relaxed text-slate-300">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 
                    Perda Comercial (Tempo de Resposta)
                  </div>
                  <p>
                    Com tempo de contato em <strong className="text-white">{selectedResposta.label}</strong>, você perde aproximadamente <strong className="text-rose-400">{formatBRL(receitaPerdidaLatencia)}</strong> mensais de receita por leads que esfriam ou fecham com concorrentes mais rápidos.
                  </p>
                </div>
              )}

              {/* Overhead Feedback */}
              {desperdicioOperacional > 0 && (
                <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl text-xs space-y-1.5 leading-relaxed text-slate-300">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 
                    Desperdício de Salário (Burocracia)
                  </div>
                  <p>
                    Seus {tamanhoEquipe} vendedores passam {tempoAdmin}% do tempo copiando dados, organizando planilhas ou fazendo follow-ups manuais. Isso joga <strong className="text-rose-400">{formatBRL(desperdicioOperacional)}</strong> no ralo em salários improdutivos.
                  </p>
                </div>
              )}

              {/* Inadimplência Feedback */}
              {perdaInadimplencia > 0 && (
                <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl text-xs space-y-1.5 leading-relaxed text-slate-300">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> 
                    Caixa Retido por Atrasos
                  </div>
                  <p>
                    A taxa de inadimplência de {taxaInadimplencia}% faz com que <strong className="text-rose-400">{formatBRL(perdaInadimplencia)}</strong> de faturamento legítimo fiquem presos ou perdidos. Cobranças automáticas amigáveis via WhatsApp recuperam esse caixa de forma automática.
                  </p>
                </div>
              )}

              {/* Base Inativa Feedback */}
              {receitaEsquecidaBase > 0 && (
                <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl text-xs space-y-1.5 leading-relaxed text-slate-300">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 
                    Receita Adormecida na Base
                  </div>
                  <p>
                    Sua base com {baseLeadsFrios.toLocaleString()} contatos inativos sem ações de reengajamento representa uma mina de ouro de <strong className="text-emerald-400">{formatBRL(receitaEsquecidaBase)}</strong> por mês em reativações não aproveitadas.
                  </p>
                </div>
              )}

              {/* CAC Feedback */}
              {desperdicioCAC > 0 && (
                <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl text-xs space-y-1.5 leading-relaxed text-slate-300">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> 
                    Desperdício de Aquisição (CAC Elevado)
                  </div>
                  <p>
                    Seu custo de aquisição atual de <strong className="text-white">{formatBRL(currentCAC)}</strong> por cliente pode ser reduzido para <strong className="text-emerald-400">{formatBRL(projectedCAC)}</strong> com automação conversacional. Isso economiza <strong className="text-emerald-400">{formatBRL(recuperadoCAC)}</strong> mensais de verba de marketing.
                  </p>
                </div>
              )}


            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
