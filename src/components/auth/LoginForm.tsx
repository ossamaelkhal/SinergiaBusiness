'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      await signIn(data.email, data.password)
      
      // Tracking de conversão para Google Ads
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'login', {
          method: 'email',
          event_category: 'engagement',
          event_label: 'successful_login'
        })
      }
    } catch (error) {
      console.error('Erro no login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-transparent border-0">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo E-mail */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-300">
            E-mail
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="pl-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-rose-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Campo Senha */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-slate-300">
            Senha
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-rose-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Link Esqueci a Senha */}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Esqueci minha senha
          </Link>
        </div>

        {/* Botão de Login */}
        <Button
          type="submit"
          className="w-full h-12 text-base font-bold tracking-tight bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Entrando...
            </>
          ) : (
            'Entrar no Cockpit'
          )}
        </Button>

        {/* Link para Cadastro */}
        <div className="text-center pt-4 border-t border-white/10 mt-6">
          <p className="text-sm text-slate-400">
            Ainda não tem uma conta?{' '}
            <Link
              href="/signup"
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}