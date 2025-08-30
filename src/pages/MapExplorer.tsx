import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon, Marker as LeafletMarker } from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import MapLayers from '@/components/ui/Maplayer';
import {
  hydrogenAssets,
  renewableSources,
  demandCenters,
  transportRoutes,
  type HydrogenAsset,
  type RenewableSource,
  type DemandCenter,
  type TransportRoute,
} from '@/data/mapData';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet (no-op if not present)
if ('_getIconUrl' in Icon.Default.prototype) {
  try {
    delete (Icon.Default.prototype as any)._getIconUrl;
  } catch (e) {
    // Ignore if property is not configurable
    console.warn('Could not delete _getIconUrl:', e);
  }
}

// Create a custom SVG-based Leaflet icon
const createCustomIcon = (color: string, symbol: string) => {
  // Sanitize the symbol to prevent XSS in the embedded SVG
  const sanitizedSymbol = symbol.replace(/[<>"'&]/g, (char) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '&': '&amp;',
    };
    return entities[char] || char;
  });

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5S12.5 41 12.5 41 25 19.4 25 12.5 19.4 0 12.5 0z" fill="${color}"/>
        <circle cx="12.5" cy="12.5" r="8" fill="white"/>
        <text x="12.5" y="17" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="${color}">${sanitizedSymbol}</text>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

const icons = {
  hydrogen: {
    plant: createCustomIcon('#10b981', 'H'),
    storage: createCustomIcon('#059669', 'S'),
    pipeline: createCustomIcon('#047857', 'P'),
    hub: createCustomIcon('#065f46', 'H'),
  },
  renewable: {
    wind: createCustomIcon('#eab308', 'W'),
    solar: createCustomIcon('#f59e0b', 'S'),
    hydro: createCustomIcon('#d97706', 'H'),
  },
  demand: {
    city: createCustomIcon('#ef4444', 'C'),
    industrial: createCustomIcon('#dc2626', 'I'),
    port: createCustomIcon('#b91c1c', 'P'),
  },
};

type BadgeVariant = 'default' | 'secondary' | 'outline';

const MapExplorer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [layers, setLayers] = useState({
    hydrogen: true,
    renewable: true,
    demand: true,
    transport: true,
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLayerToggle = (layer: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const getStatusBadgeVariant = (status: string): BadgeVariant => {
    switch (status) {
      case 'operational':
        return 'default';
      case 'under-construction':
        return 'secondary';
      case 'planned':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600';
      case 'under-construction':
        return 'text-yellow-600';
      case 'planned':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  // Read query params and center/mark map accordingly
  const MapQueryCenter = () => {
    const map = useMap();
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const lat = parseFloat(params.get('lat') || '');
      const lng = parseFloat(params.get('lng') || '');
      const rawLabel = params.get('label') || 'Selected Location';
      // Sanitize the label to prevent XSS in bindPopup HTML
      const label = rawLabel.replace(/[<>"']/g, (char) => {
        const entities: Record<string, string> = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        };
        return entities[char] || char;
      });

      if (!isNaN(lat) && !isNaN(lng)) {
        const pos: LatLngExpression = [lat, lng];
        map.setView(pos, 10, { animate: true });
        // Add a one-time marker layer
        const tempMarker = new LeafletMarker(pos, { icon: icons.hydrogen.plant });
        tempMarker.bindPopup(`<b>${label}</b>`);
        tempMarker.addTo(map);
        setTimeout(() => {
          tempMarker.openPopup();
        }, 300);
      }
    }, [map]);
    return null;
  };

  if (isLoading) {
    return (
      <div className="h-screen relative bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Card className="p-6">
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-medium">Loading Interactive Map...</span>
              </div>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        </div>
        <div className="absolute top-4 right-4 z-20">
          <Card className="w-80">
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen relative">
      <MapContainer
        center={[53.0, 0.0] as LatLngExpression}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        {/* Center map if lat/lng provided via query params */}
        <MapQueryCenter />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Hydrogen Assets Layer */}
        {layers.hydrogen &&
          hydrogenAssets.map((asset: HydrogenAsset) => (
            <Marker
              key={asset.id}
              position={[asset.lat, asset.lng]}
              icon={icons.hydrogen[asset.type]}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[250px]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{asset.name}</h3>
                    <Badge
                      variant={getStatusBadgeVariant(asset.status)}
                      className={getStatusColor(asset.status)}
                    >
                      {asset.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Type:</span> {asset.type}
                    </p>
                    {asset.capacity && (
                      <p>
                        <span className="font-medium">Capacity:</span> {asset.capacity}
                      </p>
                    )}
                    <p className="text-gray-600 mt-2">{asset.description}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Renewable Sources Layer */}
        {layers.renewable &&
          renewableSources.map((source: RenewableSource) => (
            <Marker
              key={source.id}
              position={[source.lat, source.lng]}
              icon={icons.renewable[source.type]}
            >
              <Popup>
                <div className="p-2 min-w-[250px]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{source.name}</h3>
                    <Badge
                      variant={getStatusBadgeVariant(source.status)}
                      className={getStatusColor(source.status)}
                    >
                      {source.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Type:</span> {source.type}
                    </p>
                    <p>
                      <span className="font-medium">Capacity:</span> {source.capacity}
                    </p>
                    <p className="text-gray-600 mt-2">{source.description}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Demand Centers Layer */}
        {layers.demand &&
          demandCenters.map((center: DemandCenter) => (
            <Marker
              key={center.id}
              position={[center.lat, center.lng]}
              icon={icons.demand[center.type]}
            >
              <Popup>
                <div className="p-2 min-w-[250px]">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{center.name}</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Type:</span> {center.type}
                    </p>
                    <p>
                      <span className="font-medium">Demand:</span> {center.demand}
                    </p>
                    <p className="text-gray-600 mt-2">{center.description}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Transport Routes Layer */}
        {layers.transport &&
          transportRoutes.map((route: TransportRoute) => {
            const color =
              route.type === 'road'
                ? '#3b82f6'
                : route.type === 'rail'
                ? '#8b5cf6'
                : '#06b6d4';
            return (
              <Polyline
                key={route.id}
                positions={route.coordinates as LatLngExpression[]}
                color={color}
                weight={4}
                opacity={0.7}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{route.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Type:</span> {route.type}
                      </p>
                      <p className="text-gray-600 mt-2">{route.description}</p>
                    </div>
                  </div>
                </Popup>
              </Polyline>
            );
          })}
      </MapContainer>

      {/* Layer Controls */}
      <MapLayers
        layers={layers}
        onLayerToggle={handleLayerToggle}
        counts={{
          hydrogen: hydrogenAssets.length,
          renewable: renewableSources.length,
          demand: demandCenters.length,
          transport: transportRoutes.length,
        }}
      />

      {/* Legend */}
      <Card className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm shadow-lg z-[1000]">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3 text-gray-900">Legend</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Hydrogen Infrastructure</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span>Renewable Energy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Demand Centers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-2 bg-blue-500 rounded"></div>
              <span>Transport Routes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapExplorer;