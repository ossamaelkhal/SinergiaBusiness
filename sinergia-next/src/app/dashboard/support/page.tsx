'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { LifeBuoy, Mail } from 'lucide-react';
import { toast } from 'sonner';

// Futuramente, esta função iria para o firestoreService.ts
async function submitFeedback(message: string, userId: string, userEmail: string) {
  // Lógica para salvar no Firestore (simulada por enquanto)
  console.log('Feedback enviado:', { userId, userEmail, message });
  return new Promise(resolve => setTimeout(resolve, 500));
}

type FeedbackFormInputs = {
  message: string;
}

export default function SupportPage() {
  const { currentUser } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FeedbackFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FeedbackFormInputs> = async (data) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      await submitFeedback(data.message, currentUser.uid, currentUser.email || 'N/A');
      toast.success("Seu feedback foi enviado com sucesso! Agradecemos a sua contribuição.");
      reset();
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar seu feedback. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Suporte e Feedback</h1>
        <p className="text-muted-foreground">Estamos aqui para ajudar a construir o futuro do seu negócio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Contato Direto
            </CardTitle>
            <CardDescription>
              Para questões urgentes ou suporte personalizado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Email de Suporte:</strong></p>
            <a href="mailto:suporte@sinergia.com" className="text-primary hover:underline">suporte@sinergia.com</a>
            <p className="mt-4"><strong>Horário de Atendimento:</strong></p>
            <p>Segunda a Sexta, das 9h às 18h (BRT).</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LifeBuoy className="mr-2 h-5 w-5" />
              Envie seu Feedback
            </CardTitle>
            <CardDescription>
              Sua opinião é crucial para a evolução da SinergIA.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="message">Sua mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Encontrou um bug? Tem uma ideia para uma nova funcionalidade? Adoraríamos saber."
                  {...register("message", { required: "A mensagem não pode estar vazia." })}
                  className="min-h-[120px]"
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Feedback'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
