import NLAMSHeader from "@/components/landing/NLAMSHeader";
import NLAMSHero from "@/components/landing/NLAMSHero";
import StatisticsStrip from "@/components/landing/StatisticsStrip";
import ScrollIndicator from "@/components/landing/ScrollIndicator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F8FC]">
      {/* Government utility bar + main navigation */}
      <NLAMSHeader />

      <main id="main-content" className="flex flex-col flex-1">
        {/* Hero section */}
        <NLAMSHero />

        {/* Statistics strip */}
        <StatisticsStrip />

        {/* Scroll indicator */}
        <ScrollIndicator />
      </main>
    </div>
  );
}
