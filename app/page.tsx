import SANKALPHeader from "@/components/landing/SANKALPHeader";
import SANKALPHero from "@/components/landing/SANKALPHero";
import StatisticsStrip from "@/components/landing/StatisticsStrip";
import ChallengesSection from "@/components/landing/ChallengesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import FooterSection from "@/components/landing/FooterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F8FC]">
      {/* Government utility bar + main navigation */}
      <SANKALPHeader />

      <main id="main-content" className="flex flex-col flex-1">
        {/* Hero section */}
        <SANKALPHero />

        {/* Statistics strip */}
        <StatisticsStrip />

        {/* Challenges section */}
        <ChallengesSection />

        {/* How It Works section */}
        <HowItWorksSection />

        {/* FAQ section */}
        <FAQSection />

        {/* CTA section */}
        <CTASection />

      </main>

      {/* Footer section */}
      <FooterSection />
    </div>
  );
}

