import { BenefitsSection } from '@/components/benefits-section';
import { EnhancedHeroSection } from '@/components/enhanced-hero-section';
import { FaqSection } from '@/components/faq-section';
import { Footer } from '@/components/footer';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { OfferSection } from '@/components/offer-section';
import { SocialProofSection } from '@/components/social-proof-section';
import { LandingPageHeader } from '@/components/landing-page/header';

export default function Home() {
  return (
    // O LayoutProvider no layout.tsx cuidará de adicionar o Header
    <main>
      <EnhancedHeroSection />
      <SocialProofSection />
      <BenefitsSection />
      <HowItWorksSection />
      <OfferSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
