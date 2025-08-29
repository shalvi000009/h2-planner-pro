import { AlertCircle, TrendingUp, Globe } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: AlertCircle,
      title: "Infrastructure Gap",
      description: "Current hydrogen infrastructure is insufficient to meet 2050 net-zero targets. Strategic placement is crucial.",
      color: "text-destructive"
    },
    {
      icon: TrendingUp,
      title: "Investment Optimization",
      description: "Billions in investments need optimal allocation to maximize impact and minimize costs.",
      color: "text-accent"
    },
    {
      icon: Globe,
      title: "Sustainability Goals",
      description: "Aligning infrastructure development with renewable energy sources and demand centers is complex.",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The <span className="gradient-text">Challenge</span> We're Solving
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Green hydrogen is key to decarbonization, but infrastructure development faces critical challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className={`inline-flex p-3 rounded-lg bg-card mb-4 ${problem.color}`}>
                <problem.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              An AI-powered platform that analyzes renewable energy potential, demand centers, and existing infrastructure 
              to recommend optimal hydrogen facility placements, maximizing impact while minimizing costs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;