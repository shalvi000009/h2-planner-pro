import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Share2, 
  RotateCcw, 
  Download,
  Plus,
  Trash2,
  Play,
  Pause,
  Settings,
  Map,
  BarChart3,
  Zap
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Scenarios = () => {
  const [selectedInfrastructure, setSelectedInfrastructure] = useState<string | null>(null);
  const [placedItems, setPlacedItems] = useState<Array<{
    id: number;
    type: string;
    position: { x: number; y: number };
  }>>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const infrastructureTypes = [
    { id: "plant", name: "H2 Plant", icon: "🏭", cost: "$250M", co2: "120K tons/year" },
    { id: "storage", name: "Storage", icon: "🛢️", cost: "$80M", co2: "40K tons/year" },
    { id: "pipeline", name: "Pipeline", icon: "🔗", cost: "$50M/km", co2: "20K tons/year" },
    { id: "hub", name: "Distribution Hub", icon: "📦", cost: "$120M", co2: "60K tons/year" },
  ];

  const savedScenarios = [
    {
      id: 1,
      name: "Northern Europe Expansion",
      date: "2024-03-15",
      score: 88,
      items: 5,
      co2: "450K tons",
      investment: "$780M"
    },
    {
      id: 2,
      name: "Mediterranean Network",
      date: "2024-03-10",
      score: 75,
      items: 3,
      co2: "280K tons",
      investment: "$520M"
    },
    {
      id: 3,
      name: "Central Hub Strategy",
      date: "2024-03-05",
      score: 92,
      items: 7,
      co2: "620K tons",
      investment: "$950M"
    }
  ];

  const handlePlaceInfrastructure = () => {
    if (selectedInfrastructure) {
      const newItem = {
        id: Date.now(),
        type: selectedInfrastructure,
        position: { x: Math.random() * 100, y: Math.random() * 100 }
      };
      setPlacedItems([...placedItems, newItem]);
      toast({
        title: "Infrastructure Added",
        description: `${selectedInfrastructure} has been placed on the map.`,
      });
    }
  };

  const handleReset = () => {
    setPlacedItems([]);
    setSelectedInfrastructure(null);
    toast({
      title: "Scenario Reset",
      description: "All infrastructure has been removed.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Scenario Saved",
      description: "Your scenario has been saved successfully.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Scenario link has been copied to clipboard.",
    });
  };

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
    toast({
      title: isSimulating ? "Simulation Paused" : "Simulation Started",
      description: isSimulating ? "Impact calculation paused." : "Calculating real-time impact...",
    });
  };

  // Calculate impact metrics
  const totalCO2 = placedItems.length * 80; // Simplified calculation
  const totalInvestment = placedItems.length * 150; // Simplified calculation
  const sustainabilityScore = Math.min(100, placedItems.length * 15);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Scenario Builder</h1>
          <p className="text-muted-foreground">
            Create and test hydrogen infrastructure scenarios with real-time impact analysis
          </p>
        </div>

        <Tabs defaultValue="builder" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder">Build Scenario</TabsTrigger>
            <TabsTrigger value="saved">Saved Scenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Panel - Infrastructure Selection */}
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Infrastructure Types
                  </h3>
                  <div className="space-y-2">
                    {infrastructureTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => setSelectedInfrastructure(type.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedInfrastructure === type.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{type.icon}</span>
                            <div>
                              <div className="font-medium">{type.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {type.cost} • {type.co2}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="energy" 
                    className="w-full mt-4"
                    onClick={handlePlaceInfrastructure}
                    disabled={!selectedInfrastructure}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Map
                  </Button>
                </Card>

                {/* Impact Calculator */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Impact Calculator
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Sustainability Score</span>
                        <span className="text-lg font-bold gradient-text">{sustainabilityScore}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${sustainabilityScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">CO₂ Avoided</span>
                        <span className="font-semibold">{totalCO2}K tons/year</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Investment</span>
                        <span className="font-semibold">${totalInvestment}M</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Items Placed</span>
                        <span className="font-semibold">{placedItems.length}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={sustainabilityScore > 80 ? "default" : sustainabilityScore > 50 ? "secondary" : "outline"}
                      className="w-full justify-center"
                    >
                      {sustainabilityScore > 80 ? "High Impact" : sustainabilityScore > 50 ? "Medium Impact" : "Low Impact"}
                    </Badge>
                  </div>
                </Card>

                {/* Actions */}
                <div className="space-y-2">
                  <Button 
                    variant={isSimulating ? "destructive" : "default"}
                    className="w-full"
                    onClick={toggleSimulation}
                  >
                    {isSimulating ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause Simulation
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run Simulation
                      </>
                    )}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Scenario
                  </Button>
                </div>
              </div>

              {/* Right Panel - Map Visualization */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5">
                    {/* Placeholder for interactive map */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Map className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Select infrastructure from the left panel and click on the map to place it.
                          Drag items to reposition them.
                        </p>
                        {placedItems.length > 0 && (
                          <div className="mt-6 space-y-2">
                            <p className="text-sm font-semibold">Placed Infrastructure:</p>
                            {placedItems.map((item, idx) => (
                              <Badge key={item.id} variant="outline" className="mr-2">
                                {infrastructureTypes.find(t => t.id === item.type)?.icon} 
                                {" "}{infrastructureTypes.find(t => t.id === item.type)?.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Simulation Overlay */}
                  {isSimulating && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                        <p className="text-sm font-semibold">Running Simulation...</p>
                        <p className="text-xs text-muted-foreground">Calculating optimal configurations</p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedScenarios.map((scenario) => (
                <Card key={scenario.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{scenario.name}</h3>
                      <p className="text-sm text-muted-foreground">{scenario.date}</p>
                    </div>
                    <Badge variant="outline" className="gradient-text">
                      Score: {scenario.score}
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Infrastructure</span>
                      <span>{scenario.items} items</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">CO₂ Avoided</span>
                      <span>{scenario.co2}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Investment</span>
                      <span>{scenario.investment}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Zap className="h-4 w-4 mr-1" />
                      Load
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Create New Scenario</h3>
                  <p className="text-sm text-muted-foreground">
                    Start building your hydrogen infrastructure network
                  </p>
                </div>
                <Button variant="energy">
                  <Plus className="h-4 w-4 mr-2" />
                  New Scenario
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Scenarios;