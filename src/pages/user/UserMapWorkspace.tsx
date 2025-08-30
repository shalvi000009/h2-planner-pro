import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sidebar } from "@/components/layout/PanelShell";
import PanelShell from "@/components/layout/PanelShell";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Map, 
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
  Settings
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example";

interface LayerToggle {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  enabled: boolean;
}

interface PlantSite {
  id: string;
  name: string;
  lat: number;
  lng: number;
  capacity: number;
  impactScore: number;
  cost: number;
}

const UserMapWorkspace: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedSite, setSelectedSite] = useState<PlantSite | null>(null);
  const [impactScore, setImpactScore] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const layers: LayerToggle[] = [
    { id: "renewables", name: "Renewables", icon: <Zap className="h-4 w-4" />, color: "bg-yellow-500", enabled: true },
    { id: "transport", name: "Transport", icon: <Truck className="h-4 w-4" />, color: "bg-blue-500", enabled: true },
    { id: "demand", name: "Demand Heatmap", icon: <Flame className="h-4 w-4" />, color: "bg-red-500", enabled: false },
    { id: "recommended", name: "Recommended Sites", icon: <Target className="h-4 w-4" />, color: "bg-green-500", enabled: true },
  ];

  const [layerToggles, setLayerToggles] = useState<LayerToggle[]>(layers);

  // Sample plant sites
  const plantSites: PlantSite[] = [
    { id: "1", name: "Coastal Wind Farm", lat: 40.7128, lng: -74.0060, capacity: 100, impactScore: 85, cost: 1500000 },
    { id: "2", name: "Solar Valley", lat: 34.0522, lng: -118.2437, capacity: 75, impactScore: 78, cost: 1200000 },
    { id: "3", name: "Hydro Hub", lat: 47.6062, lng: -122.3321, capacity: 120, impactScore: 92, cost: 1800000 },
  ];

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-98.5795, 39.8283], // Center of US
      zoom: 4,
      pitch: 45,
      bearing: 0
    });

    map.current.on("load", () => {
      // Add custom layers here
      addMapLayers();
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const addMapLayers = () => {
    if (!map.current) return;

    // Add renewable energy sources layer
    map.current.addSource("renewables", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-74.0060, 40.7128] },
            properties: { type: "wind", capacity: 100 }
          },
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-118.2437, 34.0522] },
            properties: { type: "solar", capacity: 75 }
          }
        ]
      }
    });

    map.current.addLayer({
      id: "renewables-layer",
      type: "circle",
      source: "renewables",
      paint: {
        "circle-radius": 15,
        "circle-color": "#fbbf24",
        "circle-opacity": 0.8,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff"
      }
    });

    // Add transport infrastructure
    map.current.addSource("transport", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [[-74.0060, 40.7128], [-118.2437, 34.0522]]
            },
            properties: { type: "pipeline" }
          }
        ]
      }
    });

    map.current.addLayer({
      id: "transport-layer",
      type: "line",
      source: "transport",
      paint: {
        "line-color": "#3b82f6",
        "line-width": 3,
        "line-opacity": 0.7
      }
    });
  };

  const toggleLayer = (layerId: string) => {
    setLayerToggles(prev => 
      prev.map(layer => 
        layer.id === layerId 
          ? { ...layer, enabled: !layer.enabled }
          : layer
      )
    );

    if (map.current) {
      const layer = map.current.getLayer(`${layerId}-layer`);
      if (layer) {
        if (map.current.getLayoutProperty(`${layerId}-layer`, 'visibility') === 'none') {
          map.current.setLayoutProperty(`${layerId}-layer`, 'visibility', 'visible');
        } else {
          map.current.setLayoutProperty(`${layerId}-layer`, 'visibility', 'none');
        }
      }
    }
  };

  const handlePlantDrop = (event: React.DragEvent) => {
    if (!map.current) return;

    const rect = mapContainer.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const lngLat = map.current.unproject([x, y]);

    // Calculate impact score based on location
    const score = Math.floor(Math.random() * 40) + 60; // 60-100
    setImpactScore(score);

    // Show impact animation
    setIsDragging(false);
    setTimeout(() => setIsDragging(false), 2000);
  };

  const handleDragStart = () => {
    setIsDragging(true);
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
        {/* Map Controls Panel */}
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
                  Drag hydrogen plant to map
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  draggable
                  onDragStart={handleDragStart}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plant
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

        {/* Map Container */}
        <div className="flex-1 relative">
          <div
            ref={mapContainer}
            className="w-full h-[600px] lg:h-full rounded-lg overflow-hidden border border-border"
            onDrop={handlePlantDrop}
            onDragOver={(e) => e.preventDefault()}
          />

          {/* Impact Score Animation */}
          <AnimatePresence>
            {isDragging && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {impactScore}
                  </div>
                  <div className="text-sm text-muted-foreground">Impact Score</div>
                </div>
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
        </div>

        {/* Site Details Panel */}
        {selectedSite && (
          <div className="lg:w-80">
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardHeader>
                <CardTitle>Site Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{selectedSite.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedSite.lat.toFixed(4)}, {selectedSite.lng.toFixed(4)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="font-semibold">{selectedSite.capacity} MW</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Impact Score</p>
                      <Badge variant="secondary">{selectedSite.impactScore}</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Cost</p>
                    <p className="font-semibold">${selectedSite.cost.toLocaleString()}</p>
                  </div>
                  
                  <Button className="w-full">View Full Analysis</Button>
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
