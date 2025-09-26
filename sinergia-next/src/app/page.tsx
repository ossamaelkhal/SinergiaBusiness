import { BenefitsSection } from '@/components/benefits-section';
import { EnhancedHeroSection } from '@/components/enhanced-hero-section';
import { FaqSection } from '@/components/faq-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { OfferSection } from '@/components/offer-section';
import { SocialProofSection } from '@/components/social-proof-section';
import { GuaranteeSection } from '@/components/guarantee-section'; // Componente que faltava

export default function Home() {
  return (
    // O LayoutProvider no layout.tsx já adiciona o Header e o Footer quando apropriado
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
