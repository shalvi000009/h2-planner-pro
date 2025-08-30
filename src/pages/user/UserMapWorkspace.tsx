import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Sidebar } from "@/components/layout/PanelShell";
import PanelShell from "@/components/layout/PanelShell";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Map as MapIcon, 
  Layers, 
  Zap, 
  Truck, 
  Flame, 
  Target, 
  Plus, 
  Minus, 
  RotateCcw,
  Download,
  Share2,
  Settings,
  Save,
  X,
  Info,
  AlertCircle
} from "lucide-react";
import Map, { Source, Layer, Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token (load from Vite env)
const MAPBOX_TOKEN = (import.meta as any).env?.VITE_MAPBOX_TOKEN || "";

interface Site {
  id: string;
  name: string;
  coordinates: [number, number];
  type: 'renewable' | 'demand' | 'transport' | 'plant';
  capacity?: number;
  demand?: number;
  score?: number;
  scoreBreakdown?: {
    renewableProximity: number;
    demandDensity: number;
    transport: number;
    regulationPenalty: number;
  };
}

interface LayerToggle {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  enabled: boolean;
}

// Client-side pseudo-data
const renewableSites: Site[] = [
  { id: "r1", name: "Wind Farm Alpha", coordinates: [-74.0060, 40.7128], type: 'renewable', capacity: 100 },
  { id: "r2", name: "Solar Valley", coordinates: [-118.2437, 34.0522], type: 'renewable', capacity: 75 },
  { id: "r3", name: "Hydro Dam Beta", coordinates: [-122.3321, 47.6062], type: 'renewable', capacity: 120 },
  { id: "r4", name: "Geothermal Plant", coordinates: [-87.6298, 41.8781], type: 'renewable', capacity: 50 },
];

const demandCenters: Site[] = [
  { id: "d1", name: "Metro Area A", coordinates: [-74.0060, 40.7128], type: 'demand', demand: 1500 },
  { id: "d2", name: "Industrial Zone B", coordinates: [-118.2437, 34.0522], type: 'demand', demand: 2200 },
  { id: "d3", name: "Port City C", coordinates: [-122.3321, 47.6062], type: 'demand', demand: 1800 },
  { id: "d4", name: "Tech Hub D", coordinates: [-87.6298, 41.8781], type: 'demand', demand: 1200 },
];

const transportHubs: Site[] = [
  { id: "t1", name: "Pipeline Junction", coordinates: [-74.0060, 40.7128], type: 'transport' },
  { id: "t2", name: "Rail Terminal", coordinates: [-118.2437, 34.0522], type: 'transport' },
  { id: "t3", name: "Port Facility", coordinates: [-122.3321, 47.6062], type: 'transport' },
  { id: "t4", name: "Highway Hub", coordinates: [-87.6298, 41.8781], type: 'transport' },
];

const UserMapWorkspace: React.FC = () => {
  const mapRef = useRef<any>(null);
  const [viewState, setViewState] = useState({
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 4,
    pitch: 45,
    bearing: 0
  });
  
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isPlacingPlant, setIsPlacingPlant] = useState(false);
  const [placedPlants, setPlacedPlants] = useState<Site[]>([]);
  const [showImpactModal, setShowImpactModal] = useState(false);
  const [impactScore, setImpactScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState<any>(null);

  const layers: LayerToggle[] = [
    { id: "renewables", name: "Renewables", icon: <Zap className="h-4 w-4" />, color: "bg-yellow-500", enabled: true },
    { id: "transport", name: "Transport", icon: <Truck className="h-4 w-4" />, color: "bg-blue-500", enabled: true },
    { id: "demand", name: "Demand Centers", icon: <Flame className="h-4 w-4" />, color: "bg-red-500", enabled: true },
    { id: "recommended", name: "Recommended Sites", icon: <Target className="h-4 w-4" />, color: "bg-green-500", enabled: true },
  ];

  const [layerToggles, setLayerToggles] = useState<LayerToggle[]>(layers);

  // Client-side scoring function
  const scoreSite = (candidate: [number, number], renewables: Site[], demand: Site[], transport: Site[]) => {
    // Calculate distances to nearest facilities
    const distToNearestRenewable = Math.min(...renewables.map(r => 
      Math.sqrt(Math.pow(candidate[0] - r.coordinates[0], 2) + Math.pow(candidate[1] - r.coordinates[1], 2))
    ));
    
    const distToNearestTransport = Math.min(...transport.map(t => 
      Math.sqrt(Math.pow(candidate[0] - t.coordinates[0], 2) + Math.pow(candidate[1] - t.coordinates[1], 2))
    ));
    
    const localDemand = demand.reduce((sum, d) => {
      const dist = Math.sqrt(Math.pow(candidate[0] - d.coordinates[0], 2) + Math.pow(candidate[1] - d.coordinates[1], 2));
      return sum + (d.demand || 0) / (1 + dist);
    }, 0);

    // Simple normalized scoring 0-100
    const proxRenew = 1 / (1 + distToNearestRenewable * 10); // Scale factor for demo
    const demandScore = Math.min(1, localDemand / 1000);
    const transportScore = 1 / (1 + distToNearestTransport * 10);
    const regulationPenalty = Math.random() > 0.1 ? 1 : 0.2; // 10% chance of protected zone

    const raw = (0.45 * proxRenew) + (0.35 * demandScore) + (0.2 * transportScore);
    const finalScore = Math.round(raw * 100 * regulationPenalty);

    return {
      score: finalScore,
      breakdown: {
        renewableProximity: Math.round(proxRenew * 100),
        demandDensity: Math.round(demandScore * 100),
        transport: Math.round(transportScore * 100),
        regulationPenalty: regulationPenalty
      }
    };
  };

  const handleMapClick = (event: any) => {
    if (!isPlacingPlant) return;

    const { lng, lat } = event.lngLat;
    const coordinates: [number, number] = [lng, lat];

    // Calculate score
    const scoring = scoreSite(coordinates, renewableSites, demandCenters, transportHubs);
    
    // Create new plant
    const newPlant: Site = {
      id: `plant-${Date.now()}`,
      name: `Hydrogen Plant ${placedPlants.length + 1}`,
      coordinates,
      type: 'plant',
      score: scoring.score,
      scoreBreakdown: scoring.breakdown
    };

    setPlacedPlants(prev => [...prev, newPlant]);
    setImpactScore(scoring.score);
    setScoreBreakdown(scoring.breakdown);
    setShowImpactModal(true);
    setIsPlacingPlant(false);

    // Auto-hide modal after 3 seconds
    setTimeout(() => setShowImpactModal(false), 3000);
  };

  const toggleLayer = (layerId: string) => {
    setLayerToggles(prev => 
      prev.map(layer => 
        layer.id === layerId 
          ? { ...layer, enabled: !layer.enabled }
          : layer
      )
    );
  };

  const saveScenario = async () => {
    try {
      const { api } = await import("@/lib/api");
      const avgScore = placedPlants.length
        ? Math.round((placedPlants.reduce((s, p) => s + (p.score || 0), 0) / placedPlants.length))
        : 0;
      await api.saveScenario({
        name: `Scenario ${new Date().toLocaleString()}`,
        notes: placedPlants.map(p => p.name).join(", "),
        score: avgScore,
      });
      alert('Scenario saved to server!');
    } catch (e: any) {
      alert(`Save failed: ${e?.message || 'Unknown error'}`);
    }
  };

  return (
    <PanelShell
      title="Map Workspace"
      sidebar={<Sidebar items={[
        { label: "Dashboard", href: "/user/dashboard", icon: "activity" },
        { label: "Map Workspace", href: "/user/map", icon: "map" },
        { label: "Recommendations", href: "/user/recommendations", icon: "trending-up" },
        { label: "Impact", href: "/user/impact", icon: "target" },
        { label: "Collaboration", href: "/user/collaboration", icon: "users" },
      ]} />}
    >
      <div className="h-full flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Layer Controls */}
        <div className="lg:w-80 space-y-4">
          {/* Layer Controls */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {layerToggles.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${layer.color}`} />
                    <Label className="text-sm font-medium">{layer.name}</Label>
                  </div>
                  <Switch
                    checked={layer.enabled}
                    onCheckedChange={() => toggleLayer(layer.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Plant Placement */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle>Plant Placement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Click "Place Plant" then tap on the map
                </p>
                <Button
                  variant={isPlacingPlant ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPlacingPlant(!isPlacingPlant)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isPlacingPlant ? "Cancel Placement" : "Place Plant"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Map Tools */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle>Map Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Minus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative">
          <Map
            ref={mapRef}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            onClick={handleMapClick}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: '100%', height: '100%' }}
            cursor={isPlacingPlant ? 'crosshair' : 'default'}
          >
            <NavigationControl position="top-right" />

            {/* Renewable Sites */}
            {layerToggles.find(l => l.id === 'renewables')?.enabled && renewableSites.map(site => (
              <Marker key={site.id} longitude={site.coordinates[0]} latitude={site.coordinates[1]}>
                <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
              </Marker>
            ))}

            {/* Demand Centers */}
            {layerToggles.find(l => l.id === 'demand')?.enabled && demandCenters.map(site => (
              <Marker key={site.id} longitude={site.coordinates[0]} latitude={site.coordinates[1]}>
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
              </Marker>
            ))}

            {/* Transport Hubs */}
            {layerToggles.find(l => l.id === 'transport')?.enabled && transportHubs.map(site => (
              <Marker key={site.id} longitude={site.coordinates[0]} latitude={site.coordinates[1]}>
                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
              </Marker>
            ))}

            {/* Placed Plants */}
            {placedPlants.map(plant => (
              <Marker key={plant.id} longitude={plant.coordinates[0]} latitude={plant.coordinates[1]}>
                <div 
                  className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center"
                  onClick={() => setSelectedSite(plant)}
                >
                  <Zap className="h-4 w-4 text-white" />
                </div>
              </Marker>
            ))}
          </Map>

          {/* Impact Score Modal */}
          <AnimatePresence>
            {showImpactModal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-6 max-w-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Impact Score</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowImpactModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className={`text-3xl font-bold mb-2 ${
                      impactScore >= 80 ? 'text-green-500' : 
                      impactScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}
                  >
                    {impactScore}/100
                  </motion.div>
                  <p className="text-sm text-muted-foreground">Site Impact Score</p>
                </div>

                {scoreBreakdown && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Renewable proximity (45%)</span>
                        <span>{scoreBreakdown.renewableProximity}%</span>
                      </div>
                      <Progress value={scoreBreakdown.renewableProximity} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Demand density (35%)</span>
                        <span>{scoreBreakdown.demandDensity}%</span>
                      </div>
                      <Progress value={scoreBreakdown.demandDensity} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Transport (20%)</span>
                        <span>{scoreBreakdown.transport}%</span>
                      </div>
                      <Progress value={scoreBreakdown.transport} className="h-2" />
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Regulation penalty: {scoreBreakdown.regulationPenalty === 1 ? 'None' : 'Protected zone'}
                    </div>
                  </div>
                )}

                {impactScore >= 80 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <div className="flex items-center gap-2 text-green-500">
                      <Target className="h-4 w-4" />
                      <span className="text-sm font-medium">Excellent location!</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Map Controls Overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Button variant="outline" size="sm" className="w-10 h-10 p-0">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-card/80 backdrop-blur-sm border border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="text-sm">Renewables</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-sm">Demand</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-sm">Transport</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-sm">Plants ({placedPlants.length})</span>
                    </div>
                  </div>
                  <Button onClick={saveScenario} disabled={placedPlants.length === 0}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Scenario
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Info Panel */}
        {selectedSite && (
          <div className="lg:w-80">
            <Card className="bg-card/50 backdrop-blur-sm border border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Site Details</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedSite(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{selectedSite.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedSite.coordinates[0].toFixed(4)}, {selectedSite.coordinates[1].toFixed(4)}
                    </p>
                  </div>
                  
                  {selectedSite.score && (
                    <div className="space-y-3">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {selectedSite.score}/100
                        </div>
                        <div className="text-sm text-muted-foreground">Impact Score</div>
                      </div>
                      
                      {selectedSite.scoreBreakdown && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Score Breakdown:</h4>
                          <div className="text-xs space-y-1">
                            <div>Renewable proximity: {selectedSite.scoreBreakdown.renewableProximity}%</div>
                            <div>Demand density: {selectedSite.scoreBreakdown.demandDensity}%</div>
                            <div>Transport: {selectedSite.scoreBreakdown.transport}%</div>
                            <div>Regulation: {selectedSite.scoreBreakdown.regulationPenalty === 1 ? 'No penalty' : 'Protected zone'}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <Button className="w-full">
                    <Info className="h-4 w-4 mr-2" />
                    View Full Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PanelShell>
  );
};

export default UserMapWorkspace;
