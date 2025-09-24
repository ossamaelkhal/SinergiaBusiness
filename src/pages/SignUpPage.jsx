import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importa o useAuth

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup } = useAuth(); // Pega a função de signup do contexto
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError('');
    try {
      await signup(data.email, data.password); // Usa a função do contexto
      navigate('/dashboard');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setAuthError('Este e-mail já está em uso por outra conta.');
          break;
        case 'auth/invalid-email':
          setAuthError('O formato do e-mail é inválido.');
          break;
        case 'auth/weak-password':
          setAuthError('A senha é muito fraca. Tente uma senha mais forte.');
          break;
        default:
          setAuthError('Ocorreu um erro ao criar a conta. Tente novamente mais tarde.');
          break;
      }
      console.error("Erro no cadastro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
             <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary-base rounded-lg flex items-center justify-center shadow-md">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-secondary-text-primary">SinergIA</span>
            </div>
            <h1 className="text-3xl font-bold text-secondary-text-primary">Crie sua conta</h1>
            <p className="text-balance text-secondary-text-secondary">
              Comece a construir seu motor de aquisição B2B hoje mesmo.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email", { required: "O e-mail é obrigatório" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "A senha é obrigatória", minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" } })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            
            <Button type="submit" className="w-full" variant="primary" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link to="/login" className="underline">
              Entrar
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-primary-light lg:block">
        {/* Imagem ou citação */}
      </div>
    </div>
  );
}
