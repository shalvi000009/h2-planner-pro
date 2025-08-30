import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Droplets, Zap, Wind, Leaf, ArrowRight } from "lucide-react";

const cycleSteps = [
  {
    icon: Wind,
    title: "Renewable Energy",
    description: "Solar, wind, and hydro power generate clean electricity",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Zap,
    title: "Electrolysis",
    description: "Clean electricity splits water into hydrogen and oxygen",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Droplets,
    title: "Hydrogen Storage",
    description: "Compressed or liquefied hydrogen for energy storage",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Leaf,
    title: "Clean Fuel",
    description: "Hydrogen powers vehicles, industry, and buildings",
    color: "from-orange-500 to-red-500"
  }
];

const HydrogenCycle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The <span className="gradient-text">Green Hydrogen Cycle</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From renewable energy to clean fuel - see how green hydrogen creates a sustainable energy ecosystem.
          </p>
        </motion.div>

        {/* Cycle visualization */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cycleSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:bg-card/70">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (mobile) */}
                {index < cycleSteps.length - 1 && (
                  <div className="hidden md:block lg:hidden absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Clean Energy</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-secondary mb-2">Zero</div>
            <div className="text-sm text-muted-foreground">CO₂ Emissions</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-accent mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Energy Storage</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HydrogenCycle;
