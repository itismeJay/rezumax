import { CompanyLogos } from "@/components/homepage/CompanyLogos";
import { CTASection } from "@/components/homepage/CTASection";
import { FeaturesSection } from "@/components/homepage/FeaturesSection";
import { Footer } from "@/components/homepage/Footer";
import { HeroSection } from "@/components/homepage/HeroSection";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { LiveScorePreview } from "@/components/homepage/LiveScorePreview";
import { WhyDevelopers } from "@/components/homepage/WhyDevelopers";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CompanyLogos />
      <HowItWorks />
      <FeaturesSection />
      <WhyDevelopers />
      <LiveScorePreview />
      <CTASection />
      <Footer />
    </div>
  );
}
