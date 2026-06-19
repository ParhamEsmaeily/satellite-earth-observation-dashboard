export interface Region {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // Calibrated percentage coordinates
  status: 'active' | 'alert' | 'idle';
  lastCapture: string;
}

export const regions: Region[] = [
  {
    id: 'reg-1',
    name: 'Port of Vancouver',
    coordinates: { x: 14, y: 25 }, // Geographically accurate West Coast Canada location
    status: 'active',
    lastCapture: '2 hours ago',
  },
  {
    id: 'reg-2',
    name: 'Amazon Basin',
    coordinates: { x: 30.0, y: 62.0 }, // Heart of the Amazon Basin, Brazil
    status: 'alert',
    lastCapture: '15 mins ago',
  },
  {
    id: 'reg-3',
    name: 'Coastal Kenya',
    coordinates: { x: 60.5, y: 57.5 }, // East African coastline, Kenya
    status: 'active',
    lastCapture: '1 hour ago',
  },
  {
    id: 'reg-4',
    name: 'Bangladesh Region',
    coordinates: { x: 73.0, y: 45.0 }, // Top of the Bay of Bengal, Bangladesh
    status: 'alert',
    lastCapture: '3 hours ago',
  },
  {
    id: 'reg-5',
    name: 'Mekong Delta',
    coordinates: { x: 77.0, y: 53.0 }, // Southern tip of Vietnam
    status: 'active',
    lastCapture: '30 mins ago',
  },
  {
    id: 'reg-6',
    name: 'Australia East Coast',
    coordinates: { x: 88.0, y: 69.5 }, // Southeast Australia coastline (Sydney area)
    status: 'active',
    lastCapture: '4 hours ago',
  }
];
