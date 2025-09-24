import React from 'react';
import { Button } from './ui/button'; // Assumindo que o botão venha do nosso Design System
import { Star } from 'lucide-react';

const EnhancedHeroSection = () => {
  return (
    <section className="bg-secondary-background text-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 1.1 HEADLINE MAGNÉTICA */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary-text-primary leading-tight"
          style={{ fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-4xl)' }}
        >
          Como Dobrar Sua Base de Clientes em 90 Dias Sem Gastar Rios de Dinheiro em Anúncios
        </h1>

        {/* 1.2 SUBHEADLINE DE CREDIBILIDADE */}
        <p 
          className="mt-4 text-lg sm:text-xl text-secondary-text-secondary"
          style={{ fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-lg)' }}
        >
          O Método de Parceria Estratégica usado por +350 Empresas B2B para Gerar Leads Qualificados de Forma Previsível
        </p>

        {/* 1.3 CTA PRINCIPAL IMPOSSÍVEL DE IGNORAR */}
        <div className="mt-8">
          <Button 
            variant="primary" 
            size="lg"
            className="w-full sm:w-auto text-lg"
          >
            Quero Dobrar Meus Clientes →
          </Button>
        </div>

        {/* 1.4 PROVA SOCIAL IMEDIATA */}
        <div className="mt-6 text-secondary-text-secondary flex items-center justify-center space-x-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
            ))}
          </div>
          <span><strong>+350</strong> Parceiros Ativos</span>
          <span className="hidden sm:inline">|</span>
          <span><strong>98%</strong> de Satisfação</span>
        </div>

        {/* 1.5 INDICADOR DE URGÊNCIA REAL (Exemplo) */}
        {/* Este componente seria controlado por estado/props */}
        <div className="mt-8 text-sm text-semantic-warning">
          <strong>Atenção:</strong> Vagas para o programa de parceria são limitadas. Próxima turma em <strong>12 dias</strong>.
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
