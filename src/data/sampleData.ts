export type HydrogenAsset = {
  id: string;
  name: string;
  type: 'plant' | 'storage' | 'pipeline' | 'hub';
  lat: number;
  lng: number;
  status: 'operational' | 'under-construction' | 'planned';
  capacity?: string;
  description?: string;
};

export type RenewableSource = {
  id: string;
  name: string;
  type: 'wind' | 'solar' | 'hydro';
  lat: number;
  lng: number;
  status: 'operational' | 'under-construction' | 'planned';
  capacity: string;
  description?: string;
};

export type DemandCenter = {
  id: string;
  name: string;
  type: 'city' | 'industrial' | 'port';
  lat: number;
  lng: number;
  demand: string;
  description?: string;
};

export type TransportRoute = {
  id: string;
  name: string;
  type: 'road' | 'rail' | 'pipeline';
  coordinates: [number, number][];
  description?: string;
};

export const hydrogenAssets: HydrogenAsset[] = [
  { id: 'h1', name: 'Hamburg H2 Plant', type: 'plant', lat: 53.5511, lng: 9.9937, status: 'operational', capacity: '200 MW', description: 'Large electrolyser plant.' },
  { id: 'h2', name: 'Rotterdam Storage', type: 'storage', lat: 51.9225, lng: 4.47917, status: 'planned', capacity: '500 tons', description: 'Salt cavern storage.' },
];

export const renewableSources: RenewableSource[] = [
  { id: 'r1', name: 'North Sea Offshore Wind', type: 'wind', lat: 53.0, lng: 3.0, status: 'operational', capacity: '800 MW', description: 'Offshore wind farm.' },
  { id: 'r2', name: 'Andalucia Solar Park', type: 'solar', lat: 37.3891, lng: -5.9845, status: 'planned', capacity: '150 MW', description: 'Utility-scale solar.' },
];

export const demandCenters: DemandCenter[] = [
  { id: 'd1', name: 'Hamburg Port', type: 'port', lat: 53.5461, lng: 9.9661, demand: '120 MW', description: 'Major maritime port demand.' },
  { id: 'd2', name: 'Berlin Industrial Park', type: 'industrial', lat: 52.5200, lng: 13.4050, demand: '200 MW', description: 'Manufacturing demand cluster.' },
];

export const transportRoutes: TransportRoute[] = [
  { id: 't1', name: 'Hamburg-Rotterdam Pipeline', type: 'pipeline', coordinates: [[53.5511, 9.9937], [51.9225, 4.47917]], description: 'Major hydrogen pipeline.' },
  { id: 't2', name: 'Berlin-Hamburg Rail', type: 'rail', coordinates: [[52.5200, 13.4050], [53.5511, 9.9937]], description: 'Freight rail corridor.' },
];

export default {};
