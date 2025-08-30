import { motion } from "framer-motion";
import { Map, TrendingUp, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Map,
    title: "Interactive Map Workspace",
    description: "Explore hydrogen infrastructure with layer toggles, drag-drop plant placement, and real-time impact scoring.",
    href: "/map",
    color: "from-primary to-primary/80"
  },
  {
    icon: TrendingUp,
    title: "AI Recommendations",
    description: "Get ranked site recommendations with scoring breakdown and map markers linked to detailed analysis.",
    href: "/recommendations",
    color: "from-secondary to-secondary/80"
  },
  {
    icon: Target,
    title: "Impact Dashboard",
    description: "Track CO₂ reduction progress, net-zero gauge animations, and regional leaderboards.",
    href: "/dashboard",
    color: "from-accent to-accent/80"
  }
];

const FeatureCards = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Powerful Tools</span> for Hydrogen Planning
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to plan, optimize, and visualize green hydrogen infrastructure development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link to={feature.href}>
                <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:bg-card/70">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
