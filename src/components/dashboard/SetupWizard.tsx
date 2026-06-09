'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Bot, Rocket, ShieldCheck, CheckCircle2 } from "lucide-react"
import { saveLeadPreferences } from '@/actions/leads'

interface SetupWizardProps {
  leadId?: string;
  onComplete: (frictionIndex: number, blueprintId: string, malhas: string[], stackLevel: number, selectedTools: string[]) => void;
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
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Respostas da Auditoria de Fricção
  const [ans1, setAns1] = useState('')
  const [ans2, setAns2] = useState('')
  const [ans3, setAns3] = useState('')
  const [selectedTools, setSelectedTools] = useState<string[]>([])

  const handleToggleTool = (toolId: string) => {
    setSelectedTools(prev =>
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  const handleFinish = async () => {
    setLoading(true)
    
    // Cálculo do índice de fricção baseado nas respostas
    let score = 30; // base inicial
    
    if (ans1 === 'fds-lost') score += 25;
    else if (ans1 === 'slow-human') score += 15;
    else if (ans1 === 'senior-dependent') score += 10;

    if (ans2 === 'manual-typing') score += 20;
    else if (ans2 === 'no-integration') score += 15;
    else if (ans2 === 'automated-flow') score += 5;

    if (ans3 === 'cherry-picking') score += 20;
    else if (ans3 === 'no-show') score += 15;
    else if (ans3 === 'abandoned') score += 20;

    const frictionIndex = Math.min(95, score);

    // Mapeamento dinâmico de Blueprints e Malhas com base nas dores
    let blueprintId = 'agenda-guardian';
    let malhas = ['Intercepção e Resgate 24/7'];

    if (ans3 === 'abandoned' || ans1 === 'fds-lost') {
      blueprintId = 'cart-rescuer';
      malhas = ['Intercepção e Resgate 24/7'];
    } else if (ans2 === 'manual-typing' || ans2 === 'no-integration') {
      blueprintId = 'credit-desk-ocr';
      malhas = ['Backoffice e Conciliação'];
    } else if (ans3 === 'cherry-picking') {
      blueprintId = 'realtor-roleta-qualifier';
      malhas = ['Intercepção e Resgate 24/7'];
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
          stackLevel
        });
      }
    } catch (error) {
      console.error("Falha ao salvar preferências no SetupWizard:", error);
    } finally {
      setLoading(false)
      onComplete(frictionIndex, blueprintId, malhas, stackLevel, selectedTools)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6">
          <Activity className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Auditoria de Fricção Operacional</h2>
        <p className="text-slate-400">Responda aos cenários reais para medir a perda de eficiência da sua empresa.</p>
      </div>

      <div className="flex items-center justify-between mb-8 px-4 relative">
        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-800 -z-10 translate-y-[-50%]">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500" 
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
        {[1, 2, 3, 4].map((num) => (
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
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Bot className="text-indigo-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-white">1. Como sua empresa lida com o atendimento fora do horário comercial?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'fds-lost', label: 'Perda nos Fins de Semana', desc: 'Os leads recebidos no fim de semana ou feriados esperam até segunda-feira de manhã para atendimento.' },
                  { id: 'senior-dependent', label: 'Dependência de Seniores', desc: 'O próprio dono ou um vendedor sênior monitora no celular pessoal, trabalhando noites e fins de semana.' },
                  { id: 'slow-human', label: 'Escala Humana Lenta', desc: 'Temos plantão, mas o tempo de resposta passa de 1 hora e a conversão cai significativamente.' }
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

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Bot className="text-indigo-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-white">2. Como é feito o fluxo de digitação de pedidos e conferência de documentos?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'manual-typing', label: 'Retrabalho e Digitação Manual', desc: 'Vendedores digitam dados à mão do WhatsApp para o ERP/CRM, gerando erros e lentidão.' },
                  { id: 'no-integration', label: 'Falta de Integração / Caixa Preso', desc: 'Planilhas comerciais não conversam com o financeiro, exigindo conferência de comprovantes e notas.' },
                  { id: 'automated-flow', label: 'Gargalo de APIs Instáveis', desc: 'Temos integrações simples, mas elas caem constantemente e exigem manutenção de TI dedicada.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAns2(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] flex flex-col ${
                      ans2 === item.id 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                        : 'bg-slate-950 border-white/5 hover:border-white/20'
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

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Rocket className="text-indigo-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-white">3. Qual é a maior fonte de perda comercial no seu funil hoje?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'cherry-picking', label: 'Lead Cherry-Picking', desc: 'Vendedores escolhem leads de maior ticket no painel e ignoram/desperdiçam o restante.' },
                  { id: 'no-show', label: 'Ineficiência e No-Show', desc: 'Clientes agendam reuniões, demonstrações ou consultas e faltam, gerando tempo ocioso.' },
                  { id: 'abandoned', label: 'Abandono de Carrinho / Checkout', desc: 'Clientes iniciam compras, pedem link de faturamento e desaparecem no final.' }
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

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Rocket className="text-indigo-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-white">4. Selecione os sistemas e ERPs integrados na sua operação:</h3>
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
                <Button variant="ghost" onClick={() => setStep(3)} className="text-slate-400 hover:text-white" disabled={loading}>Voltar</Button>
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
