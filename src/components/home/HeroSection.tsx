import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Map, BarChart3, Lightbulb } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
      
      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="gradient-text">Mapping the Future</span>
          <br />
          <span className="text-foreground">of Hydrogen Infrastructure</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Optimize green hydrogen production, storage, and distribution networks. 
          Make data-driven decisions for sustainable energy infrastructure development.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/map">
            <Button variant="hero" size="lg" className="group">
              Explore Map
              <Map className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="group">
              View Dashboard
              <BarChart3 className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          <Link to="/scenarios">
            <Button variant="secondary" size="lg" className="group">
              Build Scenarios
              <Lightbulb className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-primary mb-2">2.5M+</div>
            <div className="text-sm text-muted-foreground">Tons CO₂ Avoided</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-secondary mb-2">$1.2B</div>
            <div className="text-sm text-muted-foreground">Investment Optimized</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-accent mb-2">15K+</div>
            <div className="text-sm text-muted-foreground">Jobs Created</div>
          </div>
        </div>
        
        <div className="mt-12">
          <Link to="/recommendations" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group">
            <span className="text-sm font-medium">See AI Recommendations</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;