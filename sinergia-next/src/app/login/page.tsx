'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

type LoginFormInputs = {
  email: string;
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    setAuthError('');
    try {
      await login(auth, data.email, data.password);
      router.push('/dashboard');
    } catch (error: any) {
      // ... (error handling)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Bem-vindo de Volta</h1>
        <p className="text-balance text-muted-foreground">
          Acesse seu painel para continuar a revolução.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email", { required: "O e-mail é obrigatório" })} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <Link href="/forgot-password"className="ml-auto inline-block text-sm underline">Esqueceu a senha?</Link>
          </div>
          <Input id="password" type="password" {...register("password", { required: "A senha é obrigatória" })} />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>
        {authError && <p className="text-sm text-destructive text-center">{authError}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Não tem uma conta?{" "}
        <Link href="/signup" className="underline">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
