import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Zap, 
  MapPin, 
  Truck,
  Settings
} from 'lucide-react';

type LayerState = {
  hydrogen: boolean;
  renewable: boolean;
  demand: boolean;
  transport: boolean;
};

type LayerKey = keyof LayerState;

interface LayerControlsProps {
  layers: LayerState;
  onLayerToggle: (layer: LayerKey) => void;
}

const MapLayers = ({ layers, onLayerToggle }: LayerControlsProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const layerConfig = [
    {
      key: 'hydrogen' as const,
      label: 'Hydrogen Assets',
      icon: Factory,
      color: 'bg-green-500',
      description: 'Plants, storage, pipelines, hubs',
      count: 4
    },
    {
      key: 'renewable' as const,
      label: 'Renewable Sources',
      icon: Zap,
      color: 'bg-yellow-500',
      description: 'Solar, wind, hydro facilities',
      count: 4
    },
    {
      key: 'demand' as const,
      label: 'Demand Centers',
      icon: MapPin,
      color: 'bg-red-500',
      description: 'Cities, industrial areas, ports',
      count: 4
    },
    {
      key: 'transport' as const,
      label: 'Transport Routes',
      icon: Truck,
      color: 'bg-blue-500',
      description: 'Roads, rail, shipping lanes',
      count: 3
    }
  ];

  return (
    <Card className="absolute top-4 right-4 w-80 z-[1000] bg-white/95 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Map Layers
          </CardTitle>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {layerConfig.map(({ key, label, icon: Icon, color, description, count }) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{label}</span>
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
              </div>
              <Switch
                checked={layers[key]}
                onCheckedChange={() => onLayerToggle(key)}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          ))}
          
          <div className="pt-3 border-t">
            <p className="text-xs text-gray-500 text-center">
              Toggle layers to customize your view
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default MapLayers;