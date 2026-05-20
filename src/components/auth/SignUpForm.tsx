'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User as UserIcon } from 'lucide-react'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const signUpSchema = z.object({
    email: z
        .string()
        .min(1, 'E-mail é obrigatório')
        .email('E-mail inválido'),
    password: z
        .string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    role: z.enum(['prospect', 'ambassador', 'agency'])
})

type SignUpFormData = z.infer<typeof signUpSchema>

export function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { signUp } = useAuth() 
    const searchParams = useSearchParams()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            role: 'prospect'
        }
    })

    useEffect(() => {
        const roleParam = searchParams.get('role')
        if (roleParam === 'ambassador' || roleParam === 'agency' || roleParam === 'prospect') {
            setValue('role', roleParam)
        }
    }, [searchParams, setValue])

    const onSubmit = async (data: SignUpFormData) => {
        try {
            setIsLoading(true)
            await signUp(data.email, data.password, undefined, data.role)
        } catch (error) {
            console.error('Erro no cadastro:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-transparent border-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Campo Objetivo (Role) */}
                <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-medium text-slate-300">
                        Qual seu objetivo principal?
                    </Label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                        <select
                            id="role"
                            className="w-full bg-slate-900 border border-slate-800 text-white rounded-md h-10 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
                            {...register('role')}
                        >
                            <option value="prospect">Quero testar a SinergIA na minha empresa</option>
                            <option value="ambassador">Quero ser um Parceiro de Vendas (Embaixador)</option>
                            <option value="agency">Sou Agência / Desenvolvedor (Tech Partner)</option>
                        </select>
                    </div>
                    {errors.role && (
                        <p className="text-sm text-rose-500" role="alert">
                            {errors.role.message}
                        </p>
                    )}
                </div>

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

                {/* Botão de Cadastro */}
                <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold tracking-tight bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Construindo ambiente...
                        </>
                    ) : (
                        'Acessar Sistema SinergIA'
                    )}
                </Button>

                {/* Link para Login */}
                <div className="text-center pt-4 border-t border-white/10 mt-6">
                    <p className="text-sm text-slate-400">
                        Já tem uma conta?{' '}
                        <Link
                            href="/login"
                            className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                        >
                            Fazer Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
