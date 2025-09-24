import React from 'react';
import { Shield } from 'lucide-react';

const GuaranteeSection = () => {
  return (
    <section className="bg-secondary-background py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-secondary-hover border-2 border-dashed border-secondary-border rounded-lg p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <Shield className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary-text-primary mb-4">
            Sua Satisfação ou seu Dinheiro de Volta. Risco Zero.
          </h2>
          <p className="text-secondary-text-secondary text-lg sm:text-xl">
            Nós temos total confiança de que a SinergIA vai transformar a forma como você gera novas oportunidades de negócio. Por isso, oferecemos uma garantia incondicional de 7 dias. Se, por qualquer motivo, você não ficar 100% satisfeito, basta nos enviar um email e nós reembolsaremos o valor total do seu investimento. Sem perguntas, sem burocracia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
