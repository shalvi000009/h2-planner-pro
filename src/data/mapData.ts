// Typed demo data for MapExplorer and other map views
// You can replace these arrays with API calls later.

export type HydrogenAsset = {
  id: string;
  name: string;
  type: 'plant' | 'storage' | 'pipeline' | 'hub';
  lat: number;
  lng: number;
  status: 'operational' | 'under-construction' | 'planned';
  capacity?: string; // e.g., "200 MW" or "50 kt/yr"
  description: string;
};

export type RenewableSource = {
  id: string;
  name: string;
  type: 'wind' | 'solar' | 'hydro';
  lat: number;
  lng: number;
  capacity: string; // e.g., "150 MW"
  status: 'operational' | 'under-construction' | 'planned';
  description: string;
};

export type DemandCenter = {
  id: string;
  name: string;
  type: 'city' | 'industrial' | 'port';
  lat: number;
  lng: number;
  demand: string; // e.g., "1.2 TWh/yr"
  description: string;
};

export type TransportRoute = {
  id: string;
  name: string;
  type: 'road' | 'rail' | 'sea';
  coordinates: [number, number][]; // [lat, lng]
  description: string;
};

// UK / North Sea centric demo data to match initial map center
export const hydrogenAssets: HydrogenAsset[] = [
  {
    id: 'h1',
    name: 'Teesside H2 Plant',
    type: 'plant',
    lat: 54.5742,
    lng: -1.2340,
    status: 'operational',
    capacity: '200 MW',
    description: 'Blue/Green hydrogen production facility with carbon capture.'
  },
  {
    id: 'h2',
    name: 'Humber Storage Site',
    type: 'storage',
    lat: 53.7436,
    lng: -0.3350,
    status: 'under-construction',
    capacity: '40 kt',
    description: 'Underground hydrogen storage caverns.'
  },
  {
    id: 'h3',
    name: 'UK H2 Backbone Segment',
    type: 'pipeline',
    lat: 53.8008,
    lng: -1.5491,
    status: 'planned',
    description: 'Planned national hydrogen pipeline corridor.'
  },
  {
    id: 'h4',
    name: 'North Sea Hub',
    type: 'hub',
    lat: 57.1497,
    lng: -2.0943,
    status: 'operational',
    description: 'Regional distribution hub serving offshore assets.'
  }
];

export const renewableSources: RenewableSource[] = [
  {
    id: 'r1',
    name: 'Dogger Bank Wind',
    type: 'wind',
    lat: 54.9,
    lng: 1.5,
    capacity: '3600 MW',
    status: 'under-construction',
    description: 'Large offshore wind farm in the North Sea.'
  },
  {
    id: 'r2',
    name: 'Kent Solar Park',
    type: 'solar',
    lat: 51.2350,
    lng: 0.5820,
    capacity: '150 MW',
    status: 'operational',
    description: 'Utility-scale solar installation in South East England.'
  },
  {
    id: 'r3',
    name: 'Scottish Hydro Station',
    type: 'hydro',
    lat: 56.8169,
    lng: -5.1121,
    capacity: '500 MW',
    status: 'operational',
    description: 'High head hydroelectric power station.'
  }
];

export const demandCenters: DemandCenter[] = [
  {
    id: 'd1',
    name: 'London Metro',
    type: 'city',
    lat: 51.5074,
    lng: -0.1278,
    demand: '2.4 TWh/yr',
    description: 'Urban mobility and residential heating demand.'
  },
  {
    id: 'd2',
    name: 'Midlands Industrial Zone',
    type: 'industrial',
    lat: 52.4862,
    lng: -1.8904,
    demand: '1.2 TWh/yr',
    description: 'Steel, chemicals, and manufacturing cluster.'
  },
  {
    id: 'd3',
    name: 'Port of Liverpool',
    type: 'port',
    lat: 53.4084,
    lng: -2.9916,
    demand: '0.8 TWh/yr',
    description: 'Maritime operations and cold chain logistics.'
  }
];

export const transportRoutes: TransportRoute[] = [
  {
    id: 't1',
    name: 'M62 Corridor',
    type: 'road',
    coordinates: [
      [53.3925, -2.5800],
      [53.8008, -1.5491],
      [53.7940, -1.5350]
    ],
    description: 'East-West freight route across Northern England.'
  },
  {
    id: 't2',
    name: 'East Coast Main Line',
    type: 'rail',
    coordinates: [
      [55.9533, -3.1883],
      [54.9783, -1.6178],
      [53.9583, -1.0803],
      [51.5074, -0.1278]
    ],
    description: 'Major intercity rail artery.'
  },
  {
    id: 't3',
    name: 'North Sea Shipping Lane',
    type: 'sea',
    coordinates: [
      [57.1497, -2.0943],
      [55.0, 1.0],
      [54.0, 2.0]
    ],
    description: 'Typical maritime route for energy logistics.'
  }
];