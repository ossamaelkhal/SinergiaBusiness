"use client";

import React from 'react';
import EnhancedROICalculator from '../features/roi-calculator/EnhancedROICalculator.jsx';
import { Button } from '@/components/ui/button';
import ScrollAnimator from '@/components/animations/ScrollAnimator'; // Importando nosso coreógrafo

// --- Componentes de Seção --- //

const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center text-center text-foreground bg-background overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
    <div className="relative z-10 p-8">
      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 text-accent gradient-text animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
        Orquestrando o Sucesso na Vastidão Digital
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-muted-foreground animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out delay-200">
        Descubra como a SinergIA transforma dados dispersos em uma sinfonia de resultados.
      </p>
      <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out delay-400">
        <Button size="lg" variant="default">Inicie a sua Jornada</Button>
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-4">No Mar de Dados, Você Está à Deriva?</h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Empresas se afogam em informações, mas continuam sedentas por insights. Ferramentas desconectadas, equipes dessincronizadas e oportunidades perdidas são a maré que puxa seu crescimento para baixo.
      </p>
    </div>
  </section>
);

const SolutionSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-4">SinergIA: O Maestro da Sua Orquestra Digital</h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
        Nossa plataforma é o maestro que rege seus dados, ferramentas e equipes em uma única e poderosa sinfonia. Cada elemento, da análise de marketing à gestão de projetos, toca em perfeita harmonia, gerando uma melodia de eficiência e crescimento.
      </p>
    </div>
  </section>
);

const CalculatorSection = () => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Quantifique a Magia: A Pérola do ROI</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Chega de achismos. Use nossa calculadora para ter uma previsão clara do impacto que a SinergIA pode gerar no seu negócio.
        </p>
      </div>
      <div className="max-w-4xl mx-auto p-8 rounded-lg glassmorphism">
        <EnhancedROICalculator isOpen={true} onClose={() => {}} />
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="py-20 bg-background text-foreground">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-4">Pronto para Compor sua Obra-Prima Digital?</h2>
      <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
        Agende uma demonstração e descubra como a SinergIA pode ser o maestro que sua empresa precisa para alcançar a excelência.
      </p>
      <Button size="lg" variant="secondary">Agende uma Demonstração</Button>
    </div>
  </section>
);

// --- A Página Orquestrada --- //

export default function HomePage() {
  return (
    <main className="bg-background">
      <HeroSection />
      
      <ScrollAnimator>
        <ProblemSection />
      </ScrollAnimator>
      
      <ScrollAnimator>
        <SolutionSection />
      </ScrollAnimator>
      
      <ScrollAnimator>
        <CalculatorSection />
      </ScrollAnimator>
      
      <ScrollAnimator>
        <CtaSection />
      </ScrollAnimator>
    </main>
  );
}
