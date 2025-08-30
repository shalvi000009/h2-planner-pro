import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, LogIn, Map } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Transform</span> Energy Infrastructure?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join planners, developers, and policymakers in building the future of sustainable energy. 
            Start exploring our platform today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Link to="/map">
            <Button 
              variant="default" 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-8 py-3"
            >
              <Map className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Explore as Guest
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Link to="/login">
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-2 border-primary/30 hover:border-primary/50 px-8 py-3"
            >
              <LogIn className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Login to Dashboard
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-muted-foreground"
        >
          <p>Free access to core features • No credit card required</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
