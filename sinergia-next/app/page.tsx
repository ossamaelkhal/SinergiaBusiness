"use client";

import React from 'react';
import EnhancedHeroSection from '@/components/enhanced-hero-section';
import SocialProofSection from '@/components/social-proof-section';
// import ForWhomSection from '@/components/ForWhomSection'; 
import BenefitsSection from '@/components/benefits-section';
import HowItWorksSection from '@/components/how-it-works-section';
import OfferSection from '@/components/offer-section';
import GuaranteeSection from '@/components/guarantee-section';
import FaqSection from '@/components/faq-section';
// import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/footer';
// import ScrollSpyNav from '@/components/ScrollSpyNav';

const sectionIds = ['para-quem', 'beneficios', 'como-funciona', 'oferta', 'faq'];

export default function LandingPage() {
  const activeSection = 'para-quem'; 

  return (
    <div className="bg-secondary-background">
      <header className="fixed top-0 w-full bg-secondary-background/80 backdrop-blur-md z-50 border-b border-secondary-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-base rounded-lg flex items-center justify-center shadow-md">
                {"✨"}
              </div>
              <span className="text-2xl font-bold text-secondary-text-primary">SinergIA</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#beneficios" className="text-secondary-text-secondary hover:text-primary-base transition-colors">Benefícios</a>
              <a href="#como-funciona" className="text-secondary-text-secondary hover:text-primary-base transition-colors">Como Funciona</a>
              <a href="#faq" className="text-secondary-text-secondary hover:text-primary-base transition-colors">FAQ</a>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 text-secondary-text-secondary hover:text-primary-base">Entrar</button>
              <button className="px-4 py-2 bg-primary-base text-white rounded-md">Começar Agora →</button>
            </div>
            <button className="md:hidden text-secondary-text-primary">
              {"☰"}
            </button>
          </div>
        </div>
      </header>

      {/* <ScrollSpyNav activeSection={activeSection} /> */}

      <main>
        <EnhancedHeroSection />
        <SocialProofSection />
        {/* <ForWhomSection /> */}
        <BenefitsSection />
        <HowItWorksSection />
        <OfferSection />
        <GuaranteeSection />
        <FaqSection />
        {/* <FinalCTASection /> */}
      </main>

      <Footer />
      
    </div>
  )
}
