import React from 'react';
import { Button } from './ui/button';

const FinalCTASection = () => {
  return (
    <section className="bg-primary-base">
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Pronto para Construir seu Motor de Aquisição?
        </h2>
        <p className="text-lg text-primary-text-secondary max-w-2xl mx-auto mb-8">
          Pare de depender de canais caros e imprevisíveis. Chegou a hora de transformar parcerias estratégicas no seu ativo mais valioso. Clique no botão abaixo e garanta seu acesso.
        </p>
        <Button 
          variant="secondary" 
          size="lg"
          className="text-primary-base font-bold shadow-lg transform hover:scale-105 transition-transform"
          asChild
        >
          <a href="#oferta">Quero Escalar com Parcerias →</a>
        </Button>
      </div>
    </section>
  );
};

export default FinalCTASection;
