import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, TrendingUp, Zap, DollarSign, Target, Download, Filter } from "lucide-react";
import { useState } from "react";

const Recommendations = () => {
  const [filterScore, setFilterScore] = useState("all");

  const recommendations = [
    {
      id: 1,
      location: "Rotterdam Port, Netherlands",
      coordinates: { lat: 51.9225, lng: 4.4792 },
      score: "high",
      scoreValue: 95,
      reasons: [
        "Major shipping hub with high hydrogen demand",
        "Excellent renewable energy access (offshore wind)",
        "Existing gas infrastructure for conversion",
        "Strong industrial cluster"
      ],
      metrics: {
        co2Avoided: "450K tons/year",
        investment: "$280M",
        jobsCreated: "1,200",
        paybackPeriod: "7 years"
      },
      type: "Production Plant"
    },
    {
      id: 2,
      location: "Hamburg Industrial Zone, Germany",
      coordinates: { lat: 53.5511, lng: 9.9937 },
      score: "high",
      scoreValue: 92,
      reasons: [
        "Strategic location for Northern European distribution",
        "High industrial demand from steel and chemical sectors",
        "Access to wind power from North Sea",
        "Rail and pipeline connectivity"
      ],
      metrics: {
        co2Avoided: "380K tons/year",
        investment: "$240M",
        jobsCreated: "950",
        paybackPeriod: "8 years"
      },
      type: "Storage & Distribution Hub"
    },
    {
      id: 3,
      location: "Lyon Valley, France",
      coordinates: { lat: 45.7640, lng: 4.8357 },
      score: "medium",
      scoreValue: 78,
      reasons: [
        "Central location for European distribution",
        "Growing demand from transport sector",
        "Nuclear and hydro power availability",
        "Existing industrial infrastructure"
      ],
      metrics: {
        co2Avoided: "220K tons/year",
        investment: "$180M",
        jobsCreated: "650",
        paybackPeriod: "10 years"
      },
      type: "Production Plant"
    },
    {
      id: 4,
      location: "Barcelona Port, Spain",
      coordinates: { lat: 41.3851, lng: 2.1734 },
      score: "high",
      scoreValue: 88,
      reasons: [
        "Mediterranean shipping hub",
        "Excellent solar resource potential",
        "Growing demand from maritime sector",
        "EU Green Deal priority region"
      ],
      metrics: {
        co2Avoided: "320K tons/year",
        investment: "$200M",
        jobsCreated: "800",
        paybackPeriod: "9 years"
      },
      type: "Green Ammonia Facility"
    },
    {
      id: 5,
      location: "Copenhagen Area, Denmark",
      coordinates: { lat: 55.6761, lng: 12.5683 },
      score: "medium",
      scoreValue: 75,
      reasons: [
        "Leader in renewable energy integration",
        "Strong policy support",
        "District heating integration potential",
        "Baltic Sea connectivity"
      ],
      metrics: {
        co2Avoided: "180K tons/year",
        investment: "$150M",
        jobsCreated: "500",
        paybackPeriod: "11 years"
      },
      type: "Storage Facility"
    }
  ];

  const getScoreBadgeVariant = (score: string) => {
    switch(score) {
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getScoreColor = (score: string) => {
    switch(score) {
      case "high": return "text-primary";
      case "medium": return "text-secondary";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const filteredRecommendations = filterScore === "all" 
    ? recommendations 
    : recommendations.filter(r => r.score === filterScore);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI-Powered Recommendations</h1>
          <p className="text-muted-foreground">
            Optimal locations for hydrogen infrastructure based on sustainability and impact analysis
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Score:</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterScore === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterScore("all")}
            >
              All
            </Button>
            <Button
              variant={filterScore === "high" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterScore("high")}
            >
              High Potential
            </Button>
            <Button
              variant={filterScore === "medium" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterScore("medium")}
            >
              Medium Potential
            </Button>
          </div>
          <div className="flex-1"></div>
          <Button variant="energy" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.id} className="p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{rec.location}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={getScoreBadgeVariant(rec.score)}>
                      {rec.score.toUpperCase()} POTENTIAL
                    </Badge>
                    <span className="text-sm text-muted-foreground">{rec.type}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(rec.score)}`}>
                    {rec.scoreValue}
                  </div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Reasons */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Key Advantages
                  </h4>
                  <ul className="space-y-1">
                    {rec.reasons.map((reason, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">CO₂ Avoided</div>
                    <div className="text-sm font-semibold">{rec.metrics.co2Avoided}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Investment</div>
                    <div className="text-sm font-semibold">{rec.metrics.investment}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Jobs Created</div>
                    <div className="text-sm font-semibold">{rec.metrics.jobsCreated}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Payback Period</div>
                    <div className="text-sm font-semibold">{rec.metrics.paybackPeriod}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Detailed Analysis
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <h3 className="text-lg font-semibold mb-4">Portfolio Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold gradient-text">1.55M</div>
              <div className="text-sm text-muted-foreground">Total CO₂ Avoided (tons/year)</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">$1.05B</div>
              <div className="text-sm text-muted-foreground">Total Investment Required</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">4,100</div>
              <div className="text-sm text-muted-foreground">Total Jobs Created</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">8.5 years</div>
              <div className="text-sm text-muted-foreground">Avg. Payback Period</div>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;