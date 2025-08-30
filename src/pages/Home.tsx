import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import ImpactSection from "@/components/home/ImpactSection";


const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <ProblemSection />
        <ImpactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;