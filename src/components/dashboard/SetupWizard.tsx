'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Bot, Rocket, ShieldCheck, CheckCircle2, Heart } from "lucide-react"
import { saveLeadPreferences } from '@/actions/leads'

interface SetupWizardProps {
  leadId?: string;
  onComplete: (
    frictionIndex: number, 
    blueprintId: string, 
    malhas: string[], 
    stackLevel: number, 
    selectedTools: string[],
    archetype: 'Oprimida por Burocracia' | 'Desconectada do Cliente' | 'Visionária Cautelosa'
  ) => void;
}

const toolsOptions = [
  { id: 'shopify', name: 'Shopify', level: 1, category: 'SaaS Nativo' },
  { id: 'bling', name: 'Bling', level: 1, category: 'SaaS Nativo' },
  { id: 'hubspot', name: 'Hubspot', level: 1, category: 'SaaS Nativo' },
  { id: 'rdstation', name: 'RD Station', level: 2, category: 'Híbrido' },
  { id: 'salesforce', name: 'Salesforce', level: 2, category: 'Híbrido' },
  { id: 'zoho', name: 'Zoho', level: 2, category: 'Híbrido' },
  { id: 'totvs', name: 'TOTVS', level: 3, category: 'Corporativo/Legado' },
  { id: 'sap', name: 'SAP', level: 3, category: 'Corporativo/Legado' },
  { id: 'senior', name: 'Senior Sistemas', level: 3, category: 'Corporativo/Legado' },
  { id: 'sefaz', name: 'Portais Fiscais / SEFAZ', level: 3, category: 'Corporativo/Legado' }
];

export function SetupWizard({ leadId, onComplete }: SetupWizardProps) {
  const [step, setStep] = useState(1) // 1 a 5: Perguntas de Reflexão, 6: Sistemas & Conexões
  const [loading, setLoading] = useState(false)

  // Respostas da Auditoria de Fricção e Maturidade Cultural
  const [ans1, setAns1] = useState('') // Tempo & Foco Humano
  const [ans2, setAns2] = useState('') // Tomada de Decisão
  const [ans3, setAns3] = useState('') // Relacionamento com Cliente
  const [ans4, setAns4] = useState('') // Crescimento vs Sobrecarga
  const [ans5, setAns5] = useState('') // Papel da IA
  const [selectedTools, setSelectedTools] = useState<string[]>([])

  const handleToggleTool = (toolId: string) => {
    setSelectedTools(prev =>
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  const handleFinish = async () => {
    setLoading(true)
    
    // Cálculo do arquétipo cultural com base nas respostas
    let bCount = 0; // Oprimida por Burocracia
    let dCount = 0; // Desconectada do Cliente
    let cCount = 0; // Visionária Cautelosa

    if (ans1 === 'software-op') bCount++;
    else if (ans1 === 'people-lost') dCount++;
    else if (ans1 === 'cautious-innov') cCount++;

    if (ans2 === 'slow-reports') bCount++;
    else if (ans2 === 'scattered-data') dCount++;
    else if (ans2 === 'achometro') cCount++;

    if (ans3 === 'billing-errors') bCount++;
    else if (ans3 === 'slow-response') dCount++;
    else if (ans3 === 'quality-drop') cCount++;

    if (ans4 === 'team-burnout') bCount++;
    else if (ans4 === 'support-collapse') dCount++;
    else if (ans4 === 'heavy-hiring') cCount++;

    if (ans5 === 'replace-humans') dCount++;
    else if (ans5 === 'emancipate-team' || ans5 === 'cautious-support') cCount++;

    let archetype: 'Oprimida por Burocracia' | 'Desconectada do Cliente' | 'Visionária Cautelosa' = 'Visionária Cautelosa';
    if (bCount > dCount && bCount > cCount) {
      archetype = 'Oprimida por Burocracia';
    } else if (dCount > bCount && dCount > cCount) {
      archetype = 'Desconectada do Cliente';
    }

    // Cálculo do índice de fricção
    let score = 30; // base inicial
    if (ans1 === 'software-op') score += 15;
    if (ans2 === 'slow-reports') score += 10;
    if (ans3 === 'billing-errors') score += 15;
    if (ans4 === 'team-burnout') score += 20;

    if (ans1 === 'people-lost') score += 15;
    if (ans2 === 'scattered-data') score += 10;
    if (ans3 === 'slow-response') score += 20;
    if (ans4 === 'support-collapse') score += 20;
    if (ans5 === 'replace-humans') score += 10;

    if (ans1 === 'cautious-innov') score += 5;
    if (ans2 === 'achometro') score += 15;
    if (ans3 === 'quality-drop') score += 10;
    if (ans4 === 'heavy-hiring') score += 10;

    const frictionIndex = Math.min(95, score);

    // Mapeamento dinâmico de Blueprints e Malhas com base nas dores e arquétipos
    let blueprintId = 'agenda-guardian';
    let malhas = ['SinergIA Crescimento'];

    if (archetype === 'Oprimida por Burocracia') {
      blueprintId = 'credit-desk-ocr';
      malhas = ['SinergIA Fluxo'];
    } else if (archetype === 'Desconectada do Cliente') {
      blueprintId = 'cart-rescuer';
      malhas = ['SinergIA Conexão'];
    }

    // Calcular o stackLevel final via Math.max dos sistemas selecionados
    const toolComplexityMap: Record<string, number> = {
      shopify: 1, bling: 1, hubspot: 1,
      rdstation: 2, salesforce: 2, zoho: 2,
      totvs: 3, sap: 3, senior: 3, sefaz: 3
    };

    const levels = selectedTools.map(t => toolComplexityMap[t] || 1);
    const stackLevel = levels.length > 0 ? Math.max(...levels) : 1;

    try {
      if (leadId) {
        await saveLeadPreferences(leadId, { 
          niche: ans1, 
          tone: ans2, 
          objective: ans3,
          frictionIndex,
          blueprintId,
          malhas,
          selectedTools,
          stackLevel,
          archetype
        });
      }
    } catch (error) {
      console.error("Falha ao salvar preferências no SetupWizard:", error);
    } finally {
      setLoading(false)
      onComplete(frictionIndex, blueprintId, malhas, stackLevel, selectedTools, archetype)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6">
          <Heart className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Diagnóstico de Maturidade Cultural</h2>
        <p className="text-slate-400">Responda com honestidade radical para mapearmos a alma digital do seu negócio.</p>
      </div>

      {/* Indicador de Passos */}
      <div className="flex items-center justify-between mb-8 px-4 relative">
        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-800 -z-10 translate-y-[-50%]">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500" 
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          />
        </div>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div 
            key={num} 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 bg-slate-950 ${
              step >= num 
                ? 'border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                : 'border-slate-800 text-slate-600'
            }`}
          >
            {step > num ? <CheckCircle2 className="w-5 h-5 text-indigo-400" /> : num}
          </div>
        ))}
      </div>

      <Card className="bg-slate-900 border-white/5 border-t-white/10 shadow-2xl">
        <CardContent className="p-8">
          
          {/* PASSO 1: Foco Humano */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Bot className="text-indigo-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-white">1. Tempo & Foco Humano: Seu time gasta mais tempo operando softwares ou cuidando de pessoas?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'software-op', label: 'Operando softwares e copiando dados', desc: 'Nosso time digita dados manualmente entre sistemas, planilhas e plataformas legadas.' },
                  { id: 'people-lost', label: 'Tentando atender pessoas, mas sem tempo real', desc: 'Passamos o dia respondendo mensagens no WhatsApp sem conseguir dar a atenção profunda que os clientes merecem.' },
                  { id: 'cautious-innov', label: 'Focando em relacionamento, mas com receio', desc: 'Queremos focar em relacionamento e inovação, mas temos receio de perder o controle operacional do back-office.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAns1(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                      ans1 === item.id 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                        : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold mb-1">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
              <Button 
                onClick={() => setStep(2)} 
                disabled={!ans1}
                className="w-full mt-8 bg-white text-slate-950 hover:bg-slate-200 uppercase font-black tracking-wider"
              >
                Próxima Etapa
              </Button>
            </div>
          )}

          {/* PASSO 2: Tomada de Decisão */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Bot className="text-indigo-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-white">2. Tomada de Decisão: Como as decisões nascem no dia a dia da sua empresa?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'slow-reports', label: 'Relatórios lentos e engessados', desc: 'Dependemos de compilar planilhas comerciais e financeiras manuais. Leva dias para termos números consolidados.' },
                  { id: 'achometro', label: 'Achômetro ou pura intuição', desc: 'Decidimos com base no feeling do fundador ou em observações gerais, sem histórico de dados estruturado.' },
                  { id: 'scattered-data', label: 'Dados espalhados e inconsistentes', desc: 'Temos softwares acumulando dados, mas eles não se conversam. Não confiamos 100% no que lemos.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAns2(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                      ans2 === item.id 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                        : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold mb-1">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-400 hover:text-white">Voltar</Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!ans2}
                  className="flex-1 bg-white text-slate-950 hover:bg-slate-200 uppercase font-black"
                >
                  Próxima Etapa
                </Button>
              </div>
            </div>
          )}

          {/* PASSO 3: Relacionamento com Cliente */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Bot className="text-indigo-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-white">3. Relacionamento: Qual é a maior dor ou atrito que seu cliente enfrenta na sua jornada hoje?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'billing-errors', label: 'Erros e lentidão no faturamento ou processos', desc: 'Demora na conferência de comprovantes, emissão de links, notas fiscais ou cadastros operacionais.' },
                  { id: 'slow-response', label: 'Demora na resposta inicial e atendimento frio', desc: 'Leads esperam horas (ou fins de semana inteiros) por resposta, ou caem em chatbots estáticos robóticos.' },
                  { id: 'quality-drop', label: 'Oscilação de qualidade na escala de atendimento', desc: 'O atendimento é excelente quando feito por mim ou por seniores, mas desaba conforme contratamos juniores.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAns3(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                      ans3 === item.id 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                        : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold mb-1">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Button variant="ghost" onClick={() => setStep(2)} className="text-slate-400 hover:text-white">Voltar</Button>
                <Button 
                  onClick={() => setStep(4)} 
                  disabled={!ans3}
                  className="flex-1 bg-white text-slate-950 hover:bg-slate-200 uppercase font-black"
                >
                  Próxima Etapa
                </Button>
              </div>
            </div>
          )}

          {/* PASSO 4: Crescimento vs Sobrecarga */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Bot className="text-indigo-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-white">4. Escala: Se o volume de clientes duplicar amanhã, o que acontece com sua empresa?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'team-burnout', label: 'Colapso operacional e burnout da equipe', desc: 'As pessoas não aguentarão o volume de digitação manual de relatórios, cotações e conciliações.' },
                  { id: 'support-collapse', label: 'Vazamento massivo de leads e reclamações', desc: 'Não daremos conta de responder a todos no tempo correto. Leads serão abandonados e vendas serão perdidas.' },
                  { id: 'heavy-hiring', label: 'Necessidade de contratação preventiva pesada', desc: 'Teremos que inflar o headcount rapidamente, aumentando custos e reduzindo a nossa margem de lucro.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAns4(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                      ans4 === item.id 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                        : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold mb-1">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Button variant="ghost" onClick={() => setStep(3)} className="text-slate-400 hover:text-white">Voltar</Button>
                <Button 
                  onClick={() => setStep(5)} 
                  disabled={!ans4}
                  className="flex-1 bg-white text-slate-950 hover:bg-slate-200 uppercase font-black"
                >
                  Próxima Etapa
                </Button>
              </div>
            </div>
          )}

          {/* PASSO 5: Filosofia da IA */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Bot className="text-indigo-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-white">5. Filosofia da IA: Qual é o principal papel que você enxerga para a IA na sua empresa?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'emancipate-team', label: 'Emancipar o time de tarefas repetitivas', desc: 'Liberar as pessoas da carga manual para que foquem em estratégia, criatividade e acolhimento humano.' },
                  { id: 'replace-humans', label: 'Substituição total de pessoas e robotização rápida', desc: 'Substituir funcionários para cortar custos e robotizar os pontos de contato a qualquer custo.' },
                  { id: 'cautious-support', label: 'Coadjuvante sob supervisão rígida', desc: 'Uma ferramenta restrita a tarefas pontuais, sem autonomia real, sob supervisão severa de um artesão.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAns5(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                      ans5 === item.id 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                        : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold mb-1">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Button variant="ghost" onClick={() => setStep(4)} className="text-slate-400 hover:text-white">Voltar</Button>
                <Button 
                  onClick={() => setStep(6)} 
                  disabled={!ans5}
                  className="flex-1 bg-white text-slate-950 hover:bg-slate-200 uppercase font-black"
                >
                  Próxima Etapa
                </Button>
              </div>
            </div>
          )}

          {/* PASSO 6: Sistemas & Conexões */}
          {step === 6 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Rocket className="text-indigo-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-white">Sistemas & Conexões (Ferramentas que centralizam sua operação)</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {toolsOptions.map((tool) => {
                  const isSelected = selectedTools.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => handleToggleTool(tool.id)}
                      className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                          : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/10'
                      }`}
                    >
                      <div className="font-bold text-sm text-white">{tool.name}</div>
                      <div className="flex justify-between items-center w-full mt-2 text-[10px]">
                        <span className="text-slate-500">{tool.category}</span>
                        <span className={`font-semibold ${tool.level === 3 ? 'text-rose-400' : tool.level === 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          Nível {tool.level}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-slate-950 border border-white/5 rounded-xl">
                 <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400">
                      Sistemas legados de <strong className="text-rose-400">Nível 3 (como TOTVS e SAP)</strong> exigem homologação dedicada e auditoria de escopo fechado com nossa engenharia comercial.
                    </p>
                 </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="ghost" onClick={() => setStep(5)} className="text-slate-400 hover:text-white" disabled={loading}>Voltar</Button>
                <Button 
                  onClick={handleFinish} 
                  disabled={selectedTools.length === 0 || loading}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white uppercase font-black"
                >
                  {loading ? (
                    <div className="flex items-center gap-2 justify-center">
                       <Activity className="w-4 h-4 animate-spin" /> Analisando Complexidade...
                    </div>
                  ) : 'Finalizar Auditoria'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
