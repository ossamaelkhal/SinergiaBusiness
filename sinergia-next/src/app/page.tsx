// A página principal é um Server Component por padrão, o que é ótimo para SEO.
import { BenefitsSection } from '@/components/benefits-section';
import { EnhancedHeroSection } from '@/components/enhanced-hero-section';
import { FaqSection } from '@/components/faq-section';
import { GuaranteeSection } from '@/components/guarantee-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { LandingPageHeader } from '@/components/landing-page/header';
import { OfferSection } from '@/components/offer-section';
import { SocialProofSection } from '@/components/social-proof-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingPageHeader />
      <main className="flex-1">
        <EnhancedHeroSection />
        <SocialProofSection />
        <BenefitsSection />
        <HowItWorksSection />
        <OfferSection />
        <GuaranteeSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
