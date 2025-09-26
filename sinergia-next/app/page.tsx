import React from 'react';
import EnhancedHeroSection from '@/components/landing/EnhancedHeroSection';
import SocialProofSection from '@/components/landing/SocialProofSection';
import ForWhomSection from '@/components/landing/ForWhomSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import OfferSection from '@/components/landing/OfferSection';
import GuaranteeSection from '@/components/landing/GuaranteeSection';
import FaqSection from '@/components/landing/FaqSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import Footer from '@/components/landing/Footer';
import ScrollSpyNav from '@/components/landing/ScrollSpyNav';

// Next.js: Componentes de cliente (que usam hooks de estado/efeito ou interatividade)
// precisam da diretiva "use client". A Landing Page com ScrollSpyNav e outros estados se enquadra.
"use client";

const sectionIds = ['para-quem', 'beneficios', 'como-funciona', 'oferta', 'faq'];

// NOTA: O hook useScrollSpy será migrado e adaptado em breve.
// Por enquanto, o activeSection será estático ou virá de um placeholder.
// O header da Landing Page será simplificado e adaptado para Next.js.

export default function LandingPage() {
  // A lógica do useScrollSpy será integrada após a migração do hook
  const activeSection = 'para-quem'; // Placeholder temporário

  return (
    <div className="bg-secondary-background">
      {/* HEADER: Adaptado para Next.js. Navegação pode ser um componente separado */}
      <header className="fixed top-0 w-full bg-secondary-background/80 backdrop-blur-md z-50 border-b border-secondary-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Ícone Sparkles virá do lucide-react, após instalação no Next.js */}
              <div className="w-10 h-10 bg-primary-base rounded-lg flex items-center justify-center shadow-md">
                {/* <Sparkles className="w-6 h-6 text-white" /> */} {"✨"}
              </div>
              <span className="text-2xl font-bold text-secondary-text-primary">SinergIA</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {/* Links adaptados para next/link */} 
              <a href="#beneficios" className="text-secondary-text-secondary hover:text-primary-base transition-colors">Benefícios</a>
              <a href="#como-funciona" className="text-secondary-text-secondary hover:text-primary-base transition-colors">Como Funciona</a>
              <a href="#faq" className="text-secondary-text-secondary hover:text-primary-base transition-colors">FAQ</a>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              {/* Buttons adaptados para next/link e shadcn/ui */}
              {/* <Button variant="ghost">Entrar</Button> */}
              <button className="px-4 py-2 text-secondary-text-secondary hover:text-primary-base">Entrar</button>
              {/* <Button variant="primary" asChild><a href="#oferta">Começar Agora →</a></Button> */}
              <button className="px-4 py-2 bg-primary-base text-white rounded-md">Começar Agora →</button>
            </div>
            <button className="md:hidden text-secondary-text-primary">
              {/* <Menu className="w-6 h-6" /> */} {"☰"}
            </button>
          </div>
        </div>
      </header>

      {/* O ScrollSpyNav será adaptado */}
      <ScrollSpyNav activeSection={activeSection} />

      <main>
        <EnhancedHeroSection />
        <SocialProofSection />
        <ForWhomSection />
        <BenefitsSection />
        <HowItWorksSection />
        <OfferSection />
        <GuaranteeSection />
        <FaqSection />
        <FinalCTASection />
      </main>

      <Footer />
      
    </div>
  )
}
