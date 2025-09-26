'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Gift, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ConversionTracker } from '@/components/ConversionTracker'

const leadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  company: z.string().min(2, 'Nome da empresa é obrigatório'),
  employees: z.string().min(1, 'Selecione o número de funcionários'),
  interest: z.string().min(1, 'Selecione uma área de interesse')
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadCaptureFormProps {
  source?: string
  campaign?: string
  onSuccess?: () => void
}

export function LeadCaptureForm({ source = 'website', campaign = 'organic', onSuccess }: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      source,
      campaign
    }
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would typically send the data to your backend
      console.log('Lead data:', { ...data, source, campaign })
      
      setIsSuccess(true)
      onSuccess?.()
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSuccess(false)
        // reset()
      }, 3000)
    } catch (error) {
      console.error('Error submitting lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Obrigado por se interessar!</h3>
        <p className="text-green-700 text-center">
          Entraremos em contato em breve para discutir como podemos ajudar sua empresa.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Gift className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Quero receber mais informações</h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input 
                id="name" 
                placeholder="Digite seu nome" 
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="(00) 00000-0000" 
                {...register('phone')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <Label htmlFor="company">Nome da empresa</Label>
              <Input 
                id="company" 
                placeholder="Qual o nome da sua empresa?" 
                {...register('company')}
                className={errors.company ? 'border-red-500' : ''}
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
            </div>

            <div>
              <Label htmlFor="employees">Número de funcionários</Label>
              <Select onValueChange={(value) => setValue('employees', value)} value={watch('employees')}>
                <SelectTrigger className={errors.employees ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1 a 10 funcionários</SelectItem>
                  <SelectItem value="11-50">11 a 50 funcionários</SelectItem>
                  <SelectItem value="51-200">51 a 200 funcionários</SelectItem>
                  <SelectItem value="201-500">201 a 500 funcionários</SelectItem>
                  <SelectItem value="500+">Mais de 500 funcionários</SelectItem>
                </SelectContent>
              </Select>
              {errors.employees && <p className="text-red-500 text-sm mt-1">{errors.employees.message}</p>}
            </div>

            <div>
              <Label htmlFor="interest">Área de interesse</Label>
              <Select onValueChange={(value) => setValue('interest', value)} value={watch('interest')}>
                <SelectTrigger className={errors.interest ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Vendas</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="operations">Operações</SelectItem>
                  <SelectItem value="hr">Recursos Humanos</SelectItem>
                  <SelectItem value="finance">Financeiro</SelectItem>
                  <SelectItem value="it">TI</SelectItem>
                </SelectContent>
              </Select>
              {errors.interest && <p className="text-red-500 text-sm mt-1">{errors.interest.message}</p>}
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" />
                Enviar informações
              </span>
            )}
          </Button>
        </form>
      </div>
      
      <ConversionTracker />
    </div>
  )
}
