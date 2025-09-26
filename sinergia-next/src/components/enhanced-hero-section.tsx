import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export function EnhancedHeroSection() {
  return (
    <section className="bg-background text-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
          Como Dobrar Sua Base de Clientes em 90 Dias Sem Gastar Rios de Dinheiro em Anúncios
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
          O Método de Parceria Estratégica usado por +350 Empresas B2B para Gerar Leads Qualificados de Forma Previsível
        </p>
        <div className="mt-8">
          <Button size="lg" className="w-full sm:w-auto text-lg">
            Quero Dobrar Meus Clientes →
          </Button>
        </div>
        <div className="mt-6 text-muted-foreground flex items-center justify-center space-x-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
            ))}
          </div>
          <span><strong>+350</strong> Parceiros Ativos</span>
          <span className="hidden sm:inline">|</span>
          <span><strong>98%</strong> de Satisfação</span>
        </div>
        <div className="mt-8 text-sm text-yellow-600">
          <strong>Atenção:</strong> Vagas para o programa de parceria são limitadas. Próxima turma em <strong>12 dias</strong>.
        </div>
      </div>
    </section>
  );
}
