// A página principal é um Server Component por padrão, o que é ótimo para SEO.
// Os componentes que usam hooks, como a BenefitsSection, já têm a diretiva 'use client' internamente.

import { BenefitsSection } from '@/components/benefits-section';
import { EnhancedHeroSection } from '@/components/enhanced-hero-section';
import { FaqSection } from '@/components/faq-section';
import { GuaranteeSection } from '@/components/guarantee-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { OfferSection } from '@/components/offer-section';
import { SocialProofSection } from '@/components/social-proof-section';
// O Footer será adicionado pelo LayoutProvider, então não precisamos importá-lo aqui.

export default function Home() {
  return (
    // O LayoutProvider no layout.tsx já adiciona o Header e o Footer quando apropriado.
    // Usamos um fragmento <> pois a tag <main> já está no LayoutProvider.
    <>
      <EnhancedHeroSection />
      <SocialProofSection />
      <BenefitsSection />
      <HowItWorksSection />
      <OfferSection />
      <GuaranteeSection />
      <FaqSection />
    </>
  );
}
