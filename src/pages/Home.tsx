import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import ImpactSection from "@/components/home/ImpactSection";
import FeatureCards from "@/components/home/FeatureCards";
import HydrogenCycle from "@/components/home/HydrogenCycle";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureCards />
        <ProblemSection />
        <HydrogenCycle />
        <ImpactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;