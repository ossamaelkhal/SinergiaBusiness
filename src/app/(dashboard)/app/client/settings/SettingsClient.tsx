'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  ArrowLeft, Cpu, Save, ShieldCheck, Eye, EyeOff, 
  UploadCloud, FileText, Trash2, HelpCircle, Loader2, 
  CheckCircle2, Bot, Database, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { saveClientCredentialsAction, saveClientContextAction } from '@/actions/leads';

interface SettingsClientProps {
  lead: {
    id: string;
    companyId: string;
    name: string;
    email: string;
    nichoSlug: string;
    integration_keys: {
      whatsapp_api_url?: string;
      whatsapp_access_token?: string;
      crm_api_token?: string;
    };
    knowledge_base: Array<{
      id: string;
      name: string;
      size: number;
      uploadedAt: string;
    }>;
    raw_text_context: string;
  };
}

export default function SettingsClient({ lead }: SettingsClientProps) {
  const router = useRouter();
  
  // Estados de Integrações
  const [whatsappUrl, setWhatsappUrl] = useState(lead.integration_keys?.whatsapp_api_url || '');
  const [whatsappToken, setWhatsappToken] = useState(lead.integration_keys?.whatsapp_access_token || '');
  const [crmToken, setCrmToken] = useState(lead.integration_keys?.crm_api_token || '');
  
  // Visibilidade de chaves
  const [showWhatsappToken, setShowWhatsappToken] = useState(false);
  const [showCrmToken, setShowCrmToken] = useState(false);
  
  // Loading de Integrações
  const [savingKeys, setSavingKeys] = useState(false);

  // Estados de Base de Conhecimento
  const [rawTextContext, setRawTextContext] = useState(lead.raw_text_context || '');
  const [files, setFiles] = useState<Array<{ id: string; name: string; size: number; uploadedAt: string }>>(lead.knowledge_base || []);
  
  // Loading de Contexto
  const [savingContext, setSavingContext] = useState(false);

  // Dropzone Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handler para Salvar Credenciais
  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingKeys(true);
    
    try {
      const response = await saveClientCredentialsAction(lead.id, {
        whatsapp_api_url: whatsappUrl.trim(),
        whatsapp_access_token: whatsappToken.trim(),
        crm_api_token: crmToken.trim()
      });

      if (response.success) {
        toast.success("Credenciais de integração salvas com sucesso!");
        router.refresh();
      } else {
        toast.error(response.error || "Falha ao salvar credenciais.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro de conexão ao salvar credenciais.");
    } finally {
      setSavingKeys(false);
    }
  };

  // Handler para Salvar Base de Conhecimento (Text + Files)
  const handleSaveContext = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingContext(true);

    try {
      const response = await saveClientContextAction(lead.id, rawTextContext, files);
      if (response.success) {
        toast.success("Base de conhecimento atualizada com sucesso!");
        router.refresh();
      } else {
        toast.error(response.error || "Falha ao salvar a base de conhecimento.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro de conexão ao salvar base de conhecimento.");
    } finally {
      setSavingContext(false);
    }
  };

  // Simular upload de arquivo local
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFilesArray = Array.from(e.target.files).map(file => ({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString()
      }));

      setFiles(prev => [...prev, ...newFilesArray]);
      toast.success(`${newFilesArray.length} arquivo(s) adicionado(s) à fila. Lembre-se de salvar!`);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast.success("Arquivo removido da fila. Lembre-se de salvar!");
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8 text-slate-300 relative pb-12">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
        <div className="space-y-2">
          <Link href="/app/client" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Cockpit Operacional
          </Link>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
             <Cpu className="w-7 h-7 text-emerald-400" /> Configurações de Deploy
          </h2>
          <p className="text-slate-400 text-xs font-medium">
             Customize o cérebro do robô e as conexões de mensageria da empresa <span className="text-white font-bold">{lead.name}</span>.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
           Auditoria Ativa
        </div>
      </header>

      {/* SEÇÃO 1: MATRIX DE TOKENS E INTEGRAÇÕES */}
      <Card className="border border-white/10 bg-slate-900/40 backdrop-blur-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400"></div>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2.5">
            <Database className="w-5 h-5 text-emerald-400" /> Integrações e Credenciais de Produção
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">
            Configure as credenciais de produção para que o robô consiga ler/escrever dados nos canais reais de atendimento e CRM.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveCredentials} className="space-y-6">
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="whatsapp-url" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  WhatsApp Gateway API URL
                </Label>
                <Input
                  id="whatsapp-url"
                  placeholder="https://api.suainstancia.com"
                  value={whatsappUrl}
                  onChange={(e) => setWhatsappUrl(e.target.value)}
                  className="bg-slate-950 border-white/10 text-white rounded-xl focus:border-emerald-500 font-mono text-sm"
                />
                <span className="text-[10px] text-slate-500 block">
                  A URL do endpoint base de sua API do WhatsApp (ex: Evolution, Z-API, Baileys Wrapper).
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp-token" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  WhatsApp Access Token
                </Label>
                <div className="relative">
                  <Input
                    id="whatsapp-token"
                    type={showWhatsappToken ? "text" : "password"}
                    placeholder="Token de acesso"
                    value={whatsappToken}
                    onChange={(e) => setWhatsappToken(e.target.value)}
                    className="bg-slate-950 border-white/10 text-white rounded-xl focus:border-emerald-500 font-mono text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowWhatsappToken(!showWhatsappToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showWhatsappToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  Token secreto para autenticação na instância do WhatsApp.
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crm-token" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  CRM API Token (Pipedrive/HubSpot)
                </Label>
                <div className="relative">
                  <Input
                    id="crm-token"
                    type={showCrmToken ? "text" : "password"}
                    placeholder="Token da API do CRM"
                    value={crmToken}
                    onChange={(e) => setCrmToken(e.target.value)}
                    className="bg-slate-950 border-white/10 text-white rounded-xl focus:border-emerald-500 font-mono text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCrmToken(!showCrmToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showCrmToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  Chave de acesso pessoal do CRM para sincronização das qualificações BANT.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <span className="text-[10px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Dados criptografados no servidor. Cérebro blindado.
              </span>
              <Button
                type="submit"
                disabled={savingKeys}
                className="h-11 px-6 rounded-xl font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all"
              >
                {savingKeys ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Salvar Credenciais
                  </>
                )}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>

      {/* SEÇÃO 2: CÉREBRO CUSTOMIZADO / BASE DE CONHECIMENTO */}
      <Card className="border border-white/10 bg-slate-900/40 backdrop-blur-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 to-purple-400"></div>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2.5">
            <Bot className="w-5 h-5 text-indigo-400" /> Base de Conhecimento do Agente (Cérebro Customizado)
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">
            Adicione o conhecimento proprietário da empresa. Forneça o FAQ, tabelas de preço e metadados de manuais para treinar a IA.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveContext} className="space-y-6">
            
            {/* TEXT AREA FAQ */}
            <div className="space-y-2">
              <Label htmlFor="raw-context" className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Conhecimento Textual / FAQ Corrido
              </Label>
              <textarea
                id="raw-context"
                rows={12}
                placeholder="Cole aqui a tabela de preços, scripts de atendimento, perguntas frequentes, termos de garantia e regras operacionais da empresa..."
                value={rawTextContext}
                onChange={(e) => setRawTextContext(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 text-slate-200 text-sm font-light rounded-xl p-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed font-sans placeholder-slate-600"
              />
              <span className="text-[10px] text-slate-500 block">
                O robô utilizará este texto com prioridade máxima para responder a dúvidas e contornar objeções dos clientes.
              </span>
            </div>

            {/* DRAG & DROP FILE ZONE */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Documentos Adicionais Catalogados (Metadados)
              </Label>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-slate-950/40 hover:bg-slate-950/80 hover:border-indigo-500/40 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  multiple 
                  className="hidden" 
                  accept=".pdf,.docx,.txt"
                />
                <UploadCloud className="w-10 h-10 text-slate-500 group-hover:text-indigo-400 transition-colors animate-bounce" />
                <span className="text-sm font-bold text-white">Arraste ou clique para anexar manuais</span>
                <span className="text-xs text-slate-500">Arquivos válidos: PDF, DOCX, TXT. Os metadados serão informados ao robô.</span>
              </div>
            </div>

            {/* LIST OF FILES */}
            {files.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Arquivos na Fila ({files.length})</span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {files.map((file) => (
                    <div 
                      key={file.id} 
                      className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-white/5 group hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <FileText className="w-5 h-5 text-indigo-400 shrink-0" />
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">{file.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{formatBytes(file.size)}</div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file.id)}
                        className="h-8 w-8 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <span className="text-[10px] text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                Dica: Incorpore detalhes de nicho para otimizar os fluxos.
              </span>
              <Button
                type="submit"
                disabled={savingContext}
                className="h-11 px-6 rounded-xl font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all"
              >
                {savingContext ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Salvar Conhecimento
                  </>
                )}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
      
    </div>
  );
}
