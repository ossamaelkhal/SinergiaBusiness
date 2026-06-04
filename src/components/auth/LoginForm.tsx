'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, ShieldCheck, Key, ArrowRight, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { requestMagicCodeAction, verifyMagicCodeAction } from '@/actions/auth';

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  // Enviar código para o E-mail / WhatsApp
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setFeedback({ message: 'Por favor, insira um e-mail válido.', isError: true });
      return;
    }

    setIsLoading(true);
    try {
      const result = await requestMagicCodeAction(cleanEmail);
      if (result.success) {
        setStep('code');
        setFeedback({ 
          message: 'Se o seu e-mail estiver cadastrado, você receberá um código de acesso seguro no WhatsApp ou E-mail em instantes.', 
          isError: false 
        });
        toast.success("Código de segurança enviado!");
      } else {
        setFeedback({ message: result.error || 'Erro ao solicitar código de acesso.', isError: true });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ message: 'Erro de conexão com o servidor. Tente novamente.', isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  // Validar código inserido pelo usuário
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const cleanCode = code.trim();
    if (!cleanCode || cleanCode.length !== 6 || isNaN(Number(cleanCode))) {
      setFeedback({ message: 'Por favor, insira o código numérico de 6 dígitos.', isError: true });
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyMagicCodeAction(email.trim(), cleanCode);
      if (result.success) {
        toast.success("Autenticação autorizada com sucesso!");
        
        // Redirecionamento dinâmico retornado pela Server Action
        const destination = result.redirectUrl || '/app/discover';
        
        // Tracking opcional
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'login', {
            method: 'magic_code',
            event_category: 'engagement',
            event_label: 'successful_login'
          });
        }

        router.push(destination);
      } else {
        setFeedback({ message: result.error || 'Código incorreto ou expirado.', isError: true });
        toast.error(result.error || 'Falha ao autenticar.');
      }
    } catch (err) {
      console.error(err);
      setFeedback({ message: 'Erro de conexão ao validar o código.', isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div 
          className={`p-4 rounded-2xl text-xs font-medium border leading-relaxed ${
            feedback.isError 
              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
              : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
          }`}
        >
          {feedback.message}
        </div>
      )}

      {step === 'email' ? (
        <form onSubmit={handleRequestCode} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-xs font-bold uppercase tracking-wider text-slate-400">
              E-mail Corporativo
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
              <Input
                id="login-email"
                type="email"
                placeholder="nome@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-slate-950 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500 rounded-xl"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-sm font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando Chave...
              </>
            ) : (
              <>
                Solicitar Chave de Acesso
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>E-mail</span>
              <button 
                type="button" 
                onClick={() => { setStep('email'); setFeedback(null); }}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold uppercase flex items-center gap-1 normal-case"
              >
                <ArrowLeft className="w-3 h-3" /> Alterar e-mail
              </button>
            </Label>
            <Input
              type="email"
              value={email}
              disabled
              className="h-12 bg-slate-950/60 border-white/5 text-slate-500 rounded-xl cursor-not-allowed font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-code" className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Código de Acesso (6 dígitos)
            </Label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
              <Input
                id="login-code"
                placeholder="482015"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="pl-10 h-12 bg-slate-950 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 font-mono tracking-widest text-center text-lg font-black rounded-xl"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white border-0 shadow-lg shadow-indigo-500/20 transition-all rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Autenticando...
              </>
            ) : (
              <>
                Confirmar Autenticação
                <Sparkles className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}

      {/* Link para Cadastro */}
      <div className="text-center pt-4 border-t border-white/5 mt-6">
        <p className="text-xs text-slate-500">
          Ainda não tem uma conta?{' '}
          <Link
            href="/signup"
            className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
          >
            Criar conta
          </Link>
        </p>
      </div>

      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-600 pt-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        Acesso criptografado sem senha por OTP
      </div>
    </div>
  );
}