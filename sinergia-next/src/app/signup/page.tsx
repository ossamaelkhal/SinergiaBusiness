'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

type SignUpFormInputs = {
  email: string;
  password: string;
}

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>();
  const router = useRouter();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    setLoading(true);
    setAuthError('');
    try {
      await signup(auth, data.email, data.password);
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
        <h1 className="text-3xl font-bold">Crie Sua Conta</h1>
        <p className="text-balance text-muted-foreground">
          Comece a transformar seu negócio em minutos.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email", { required: "O e-mail é obrigatório" })} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...register("password", { required: "A senha é obrigatória", minLength: 6 })} />
          {errors.password && <p className="text-sm text-destructive">A senha deve ter no mínimo 6 caracteres.</p>}
        </div>
        {authError && <p className="text-sm text-destructive text-center">{authError}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Criando conta..." : "Criar Conta Gratuitamente"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Já tem uma conta?{" "}
        <Link href="/login" className="underline">
          Entrar
        </Link>
      </div>
    </div>
  );
}
