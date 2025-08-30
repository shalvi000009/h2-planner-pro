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
        <div className="relative flex items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg group h-64">
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url('...')` }}
          ></div>
          <div className="relative flex flex-col items-center text-white p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
            {/* ... */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;