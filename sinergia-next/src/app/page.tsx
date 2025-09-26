import { EnhancedHeroSection } from '@/components/enhanced-hero-section';
import { SocialProofSection } from '@/components/social-proof-section';
import { BenefitsSection } from '@/components/benefits-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { OfferSection } from '@/components/offer-section';
import { FaqSection } from '@/components/faq-section'; // Importa a nova seção
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <EnhancedHeroSection />
        <SocialProofSection />
        <BenefitsSection />
        <HowItWorksSection />
        <OfferSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
