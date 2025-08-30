import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ScaleControl, ZoomControl, useMap, Tooltip } from 'react-leaflet';
import { Icon, LatLngExpression, Map as LeafletMap, LatLngBounds } from 'leaflet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import MapLayers from '@/components/MapLayers';
import {
  hydrogenAssets,
  renewableSources,
  demandCenters,
  transportRoutes,
  HydrogenAsset,
  RenewableSource,
  DemandCenter,
  TransportRoute
} from '@/data/sampleData';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
// TS-safe delete of the private prop used by leaflet default icons
delete ((Icon.Default.prototype as unknown) as Record<string, unknown>)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different asset types (memoized to avoid recreation)
const createCustomIcon = (color: string, symbol: string) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="28" height="44" viewBox="0 0 28 44" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.3 0 0 6.3 0 14S14 44 14 44 28 23.7 28 14 21.7 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="9" fill="white"/>
      <text x="14" y="18" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="${color}">${symbol}</text>
    </svg>
  `)}`,
  iconSize: [28, 44],
  iconAnchor: [14, 44],
  popupAnchor: [1, -36],
});

const defaultIcons = {
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
  }
};

// Small binder component to provide the map instance to the parent via callback
const MapBinder: React.FC<{ onReady: (m: LeafletMap) => void }> = ({ onReady }) => {
  const map = useMap();
  useEffect(() => onReady(map), [map, onReady]);
  return null;
};

const MapExplorer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [layers, setLayers] = useState({
    hydrogen: true,
    renewable: true,
    demand: true,
    transport: true,
  });
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  // keep react-router hook before any early returns
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Memoize icons so they are stable between renders
  const icons = useMemo(() => defaultIcons, []);

  // Fit map to all features when map is ready
  useEffect(() => {
    if (!mapInstance) return;

    const bounds = new LatLngBounds([]);
    const add = (lat: number, lng: number) => bounds.extend([lat, lng]);

    hydrogenAssets.forEach(a => add(a.lat, a.lng));
    renewableSources.forEach(r => add(r.lat, r.lng));
    demandCenters.forEach(d => add(d.lat, d.lng));
    transportRoutes.forEach(t => t.coordinates.forEach(c => add(c[0], c[1])));

    if (bounds.isValid()) {
      mapInstance.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [mapInstance]);

  const handleLayerToggle = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'operational': return 'default';
      case 'under-construction': return 'secondary';
      case 'planned': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600';
      case 'under-construction': return 'text-yellow-600';
      case 'planned': return 'text-blue-600';
      default: return 'text-gray-600';
    }
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
        /* map instance is captured by MapBinder which uses useMap() */
        zoomControl={false}
      >
        <MapBinder onReady={setMapInstance} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ScaleControl position="bottomleft" />
        <ZoomControl position="topright" />

        {/* Hydrogen Assets Layer */}
        {layers.hydrogen && hydrogenAssets.map((asset: HydrogenAsset) => (
          <Marker
            key={asset.id}
            position={[asset.lat, asset.lng]}
            icon={icons.hydrogen[asset.type]}
          >
            <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>
              {asset.name}
            </Tooltip>
            <Popup className="custom-popup">
              <div className="p-2 min-w-[250px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{asset.name}</h3>
                  <Badge variant={getStatusBadgeVariant(asset.status)} className={getStatusColor(asset.status)}>
                    {asset.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Type:</span> {asset.type}</p>
                  {asset.capacity && <p><span className="font-medium">Capacity:</span> {asset.capacity}</p>}
                  <p className="text-gray-600 mt-2">{asset.description}</p>
                </div>
                <div className="mt-3 flex items-center justify-end space-x-2">
                  <button onClick={() => mapInstance?.setView([asset.lat, asset.lng], 12)} className="text-sm text-gray-700 px-2 py-1 bg-gray-100 rounded">Center</button>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${asset.lat},${asset.lng}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">Open in Maps</a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Renewable Sources Layer */}
    {layers.renewable && renewableSources.map((source: RenewableSource) => (
          <Marker
            key={source.id}
            position={[source.lat, source.lng]}
      icon={icons.renewable[source.type]}
          >
      <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>{source.name}</Tooltip>
            <Popup>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{source.name}</h3>
                  <Badge variant={getStatusBadgeVariant(source.status)} className={getStatusColor(source.status)}>
                    {source.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Type:</span> {source.type}</p>
                  <p><span className="font-medium">Capacity:</span> {source.capacity}</p>
                  <p className="text-gray-600 mt-2">{source.description}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Demand Centers Layer */}
        {layers.demand && demandCenters.map((center: DemandCenter) => (
          <Marker
            key={center.id}
            position={[center.lat, center.lng]}
            icon={icons.demand[center.type]}
          >
            <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>{center.name}</Tooltip>
            <Popup>
              <div className="p-2 min-w-[250px]">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{center.name}</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Type:</span> {center.type}</p>
                  <p><span className="font-medium">Demand:</span> {center.demand}</p>
                  <p className="text-gray-600 mt-2">{center.description}</p>
                </div>
                <div className="mt-3 flex items-center justify-end space-x-2">
                  <button onClick={() => mapInstance?.setView([center.lat, center.lng], 12)} className="text-sm text-gray-700 px-2 py-1 bg-gray-100 rounded">Center</button>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">Open in Maps</a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Transport Routes Layer */}
        {layers.transport && transportRoutes.map((route: TransportRoute) => {
          const color = route.type === 'road' ? '#3b82f6' : 
                      route.type === 'rail' ? '#8b5cf6' : '#06b6d4';
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
                    <p><span className="font-medium">Type:</span> {route.type}</p>
                    <p className="text-gray-600 mt-2">{route.description}</p>
                  </div>
                </div>
              </Popup>
            </Polyline>
          );
        })}
      </MapContainer>

      {/* Back to Home button */}
      <div className="absolute top-20 left-4 z-[1100]">
        <button onClick={() => navigate('/')} className="bg-black text-white shadow rounded px-3 py-2 text-sm">Back to Home</button>
      </div>

      {/* Layer Controls */}
      <MapLayers layers={layers} onLayerToggle={handleLayerToggle} />

      {/* Legend */}
      <Card className="absolute bottom-4 left-80 bg-white shadow-lg z-[1000] w-72">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3 text-black">Legend & details</h4>
          <div className="grid grid-cols-1 gap-3 text-sm text-black">
            <div className="flex items-start gap-3">
              <span className="w-4 h-4 rounded-full bg-emerald-500 shrink-0 mt-1" aria-hidden />
              <div>
                <div className="font-medium">Hydrogen Infrastructure</div>
                <div className="text-xs text-black">Plants, storage, hubs — production and bulk storage sites.</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-4 h-4 rounded-full bg-amber-400 shrink-0 mt-1" aria-hidden />
              <div>
                <div className="font-medium">Renewable Energy</div>
                <div className="text-xs text-black">Wind, solar and hydro resources feeding production.</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-4 h-4 rounded-full bg-red-500 shrink-0 mt-1" aria-hidden />
              <div>
                <div className="font-medium">Demand Centers</div>
                <div className="text-xs text-black">City loads, industrial parks and port terminals.</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-8 h-1 rounded bg-sky-500 shrink-0 mt-2" aria-hidden />
              <div>
                <div className="font-medium">Transport Routes</div>
                <div className="text-xs text-black">Road, rail or pipeline corridors connecting assets.</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapExplorer;