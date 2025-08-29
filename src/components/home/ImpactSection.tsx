import { Leaf, DollarSign, Users, Battery } from "lucide-react";
import { Card } from "@/components/ui/card";

const ImpactSection = () => {
  const impacts = [
    {
      icon: Leaf,
      value: "2.5M+",
      label: "Tons CO₂ Avoided Annually",
      description: "Equivalent to removing 500,000 cars from roads",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: DollarSign,
      value: "$1.2B",
      label: "Investment Optimized",
      description: "Strategic allocation for maximum ROI",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      value: "15,000+",
      label: "Green Jobs Created",
      description: "Direct and indirect employment opportunities",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Battery,
      value: "500 GW",
      label: "Clean Energy Capacity",
      description: "Renewable energy integration potential",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Projected <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform enables data-driven decisions that accelerate the transition to clean energy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-border"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${impact.gradient} mb-4`}>
                <impact.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">{impact.value}</div>
              <div className="text-sm font-semibold mb-2">{impact.label}</div>
              <p className="text-xs text-muted-foreground">{impact.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            * Projections based on full implementation of recommended infrastructure by 2030
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;