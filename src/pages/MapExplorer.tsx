import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Layers, Info, MapPin, Wind, Sun, Droplet, Factory, Database, Truck } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapExplorer = () => {
  const [selectedLayers, setSelectedLayers] = useState({
    plants: true,
    storage: true,
    pipelines: false,
    distribution: true,
    solar: false,
    wind: false,
    hydro: false,
    demand: true,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState<L.Map | null>(null);

  const layers = [
    { id: "plants", label: "Hydrogen Plants", icon: Factory, color: "text-primary" },
    { id: "storage", label: "Storage Facilities", icon: Database, color: "text-secondary" },
    { id: "pipelines", label: "Pipelines", icon: Truck, color: "text-purple-500" },
    { id: "distribution", label: "Distribution Hubs", icon: MapPin, color: "text-orange-500" },
    { id: "solar", label: "Solar Zones", icon: Sun, color: "text-yellow-500" },
    { id: "wind", label: "Wind Zones", icon: Wind, color: "text-cyan-500" },
    { id: "hydro", label: "Hydro Zones", icon: Droplet, color: "text-blue-500" },
    { id: "demand", label: "Demand Centers", icon: Factory, color: "text-red-500" },
  ];

  useEffect(() => {
    // Initialize map
    if (!map) {
      const leafletMap = L.map("map").setView([51.505, -0.09], 5);
      
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(leafletMap);

      // Add sample markers
      const sampleLocations = [
        { lat: 51.505, lng: -0.09, type: "plant", name: "London H2 Plant" },
        { lat: 48.8566, lng: 2.3522, type: "storage", name: "Paris Storage Facility" },
        { lat: 52.52, lng: 13.405, type: "demand", name: "Berlin Industrial Zone" },
        { lat: 50.1109, lng: 8.6821, type: "solar", name: "Frankfurt Solar Farm" },
        { lat: 53.5511, lng: 9.9937, type: "wind", name: "Hamburg Wind Park" },
      ];

      sampleLocations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng])
          .bindPopup(`<b>${loc.name}</b><br>Type: ${loc.type}`)
          .addTo(leafletMap);
      });

      setMap(leafletMap);
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  const toggleLayer = (layerId: string) => {
    setSelectedLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)] pt-16">
        {/* Sidebar */}
        <div className="w-80 bg-card border-r border-border p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Search */}
            <div>
              <Label htmlFor="search">Search Location</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search city or region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Layers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4" />
                <Label>Map Layers</Label>
              </div>
              <div className="space-y-3">
                {layers.map((layer) => (
                  <div key={layer.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={layer.id}
                      checked={selectedLayers[layer.id as keyof typeof selectedLayers]}
                      onCheckedChange={() => toggleLayer(layer.id)}
                    />
                    <Label
                      htmlFor={layer.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <layer.icon className={`h-4 w-4 ${layer.color}`} />
                      {layer.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <Card className="p-4 bg-card/50">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4" />
                <span className="text-sm font-semibold">Legend</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span>Under Construction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <span>Planned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span>High Demand</span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <Button variant="energy" className="w-full">
                Export Map Data
              </Button>
              <Button variant="outline" className="w-full">
                Reset View
              </Button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div id="map" className="w-full h-full"></div>
          
          {/* Map Controls Overlay */}
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 space-y-2">
            <Button size="sm" variant="ghost" className="w-full justify-start">
              <MapPin className="h-4 w-4 mr-2" />
              My Location
            </Button>
            <Button size="sm" variant="ghost" className="w-full justify-start">
              <Layers className="h-4 w-4 mr-2" />
              3D View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapExplorer;