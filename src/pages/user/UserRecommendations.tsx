import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sidebar } from "@/components/layout/PanelShell";
import PanelShell from "@/components/layout/PanelShell";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  MapPin, 
  Star, 
  Save, 
  Filter, 
  Download,
  Eye,
  Target,
  Zap,
  Leaf,
  DollarSign,
  Users
} from "lucide-react";

interface RecommendationSite {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  overallScore: number;
  scores: {
    renewable: number;
    infrastructure: number;
    demand: number;
    economic: number;
    environmental: number;
  };
  capacity: number;
  cost: number;
  jobs: number;
  co2Reduction: number;
  status: 'recommended' | 'good' | 'fair';
}

const recommendations: RecommendationSite[] = [
  {
    id: "1",
    name: "Coastal Wind Farm Complex",
    location: "Gulf Coast, Texas",
    coordinates: [29.7604, -95.3698],
    overallScore: 92,
    scores: {
      renewable: 95,
      infrastructure: 88,
      demand: 90,
      economic: 85,
      environmental: 96
    },
    capacity: 500,
    cost: 850000000,
    jobs: 1200,
    co2Reduction: 450000,
    status: 'recommended'
  },
  {
    id: "2",
    name: "Solar Valley Industrial Hub",
    location: "Phoenix Metro, Arizona",
    coordinates: [33.4484, -112.0740],
    overallScore: 87,
    scores: {
      renewable: 92,
      infrastructure: 82,
      demand: 85,
      economic: 90,
      environmental: 88
    },
    capacity: 350,
    cost: 620000000,
    jobs: 850,
    co2Reduction: 320000,
    status: 'recommended'
  },
  {
    id: "3",
    name: "Hydro Hub Northwest",
    location: "Seattle Metro, Washington",
    coordinates: [47.6062, -122.3321],
    overallScore: 84,
    scores: {
      renewable: 88,
      infrastructure: 90,
      demand: 78,
      economic: 82,
      environmental: 92
    },
    capacity: 280,
    cost: 520000000,
    jobs: 650,
    co2Reduction: 280000,
    status: 'good'
  },
  {
    id: "4",
    name: "Great Lakes Energy Center",
    location: "Chicago Metro, Illinois",
    coordinates: [41.8781, -87.6298],
    overallScore: 79,
    scores: {
      renewable: 75,
      infrastructure: 85,
      demand: 88,
      economic: 78,
      environmental: 82
    },
    capacity: 400,
    cost: 720000000,
    jobs: 950,
    co2Reduction: 380000,
    status: 'good'
  },
  {
    id: "5",
    name: "Mountain Wind Corridor",
    location: "Denver Metro, Colorado",
    coordinates: [39.7392, -104.9903],
    overallScore: 76,
    scores: {
      renewable: 82,
      infrastructure: 72,
      demand: 75,
      economic: 80,
      environmental: 85
    },
    capacity: 320,
    cost: 580000000,
    jobs: 720,
    co2Reduction: 290000,
    status: 'fair'
  }
];

const UserRecommendations: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<RecommendationSite | null>(null);
  const [sortBy, setSortBy] = useState<'score' | 'capacity' | 'cost'>('score');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommended': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'recommended': return 'Top Pick';
      case 'good': return 'Good';
      case 'fair': return 'Fair';
      default: return 'Unknown';
    }
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    switch (sortBy) {
      case 'score': return b.overallScore - a.overallScore;
      case 'capacity': return b.capacity - a.capacity;
      case 'cost': return a.cost - b.cost;
      default: return 0;
    }
  });

  return (
    <PanelShell
      title="AI Recommendations"
      sidebar={<Sidebar items={[
        { label: "Dashboard", href: "/user/dashboard", icon: "activity" },
        { label: "Map Workspace", href: "/user/map", icon: "map" },
        { label: "Recommendations", href: "/user/recommendations", icon: "trending-up" },
        { label: "Impact", href: "/user/impact", icon: "target" },
        { label: "Collaboration", href: "/user/collaboration", icon: "users" },
      ]} />}
    >
      <div className="space-y-6">
        {/* Header with Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sites Analyzed</p>
                  <p className="text-xl font-bold">247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Top Recommendations</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Capacity</p>
                  <p className="text-xl font-bold">1.85 GW</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CO₂ Reduction</p>
                  <p className="text-xl font-bold">1.72M t</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-background border border-border rounded px-2 py-1 text-sm"
                  >
                    <option value="score">Score</option>
                    <option value="capacity">Capacity</option>
                    <option value="cost">Cost</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Table */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Ranked Site Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Site Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Overall Score</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>Jobs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRecommendations.map((site, index) => (
                  <motion.tr
                    key={site.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-muted/30 cursor-pointer"
                    onClick={() => setSelectedSite(site)}
                  >
                    <TableCell className="font-medium">#{index + 1}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{site.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {site.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {site.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16">
                          <Progress value={site.overallScore} className="h-2" />
                        </div>
                        <span className="font-medium">{site.overallScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>{site.capacity} MW</TableCell>
                    <TableCell>${(site.cost / 1000000).toFixed(0)}M</TableCell>
                    <TableCell>{site.jobs.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`${getStatusColor(site.status)} text-white`}
                      >
                        {getStatusText(site.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Save className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Selected Site Details */}
        {selectedSite && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Scoring Breakdown */}
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardHeader>
                <CardTitle>Scoring Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Renewable Resources</span>
                    <span className="font-medium">{selectedSite.scores.renewable}%</span>
                  </div>
                  <Progress value={selectedSite.scores.renewable} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Infrastructure</span>
                    <span className="font-medium">{selectedSite.scores.infrastructure}%</span>
                  </div>
                  <Progress value={selectedSite.scores.infrastructure} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Demand Proximity</span>
                    <span className="font-medium">{selectedSite.scores.demand}%</span>
                  </div>
                  <Progress value={selectedSite.scores.demand} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Economic Viability</span>
                    <span className="font-medium">{selectedSite.scores.economic}%</span>
                  </div>
                  <Progress value={selectedSite.scores.economic} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Environmental Impact</span>
                    <span className="font-medium">{selectedSite.scores.environmental}%</span>
                  </div>
                  <Progress value={selectedSite.scores.environmental} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Site Actions */}
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardHeader>
                <CardTitle>Site Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">{selectedSite.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedSite.location}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Capacity</p>
                      <p className="font-medium">{selectedSite.capacity} MW</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Investment</p>
                      <p className="font-medium">${(selectedSite.cost / 1000000).toFixed(0)}M</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Jobs Created</p>
                      <p className="font-medium">{selectedSite.jobs.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CO₂ Reduction</p>
                      <p className="font-medium">{(selectedSite.co2Reduction / 1000).toFixed(0)}k t</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" onClick={async () => {
                    try {
                      const { api } = await import("@/lib/api");
                      if (!selectedSite) return;
                      await api.saveScenario({
                        name: selectedSite.name,
                        notes: `${selectedSite.location} • ${selectedSite.capacity} MW` ,
                        score: selectedSite.overallScore,
                      });
                      alert('Saved scenario to server');
                    } catch (e: any) {
                      alert(`Save failed: ${e?.message || 'Unknown error'}`);
                    }
                  }}>
                    <Save className="h-4 w-4 mr-2" />
                    Save as Scenario
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </PanelShell>
  );
};

export default UserRecommendations;
