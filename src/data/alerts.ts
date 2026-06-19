export interface Alert {
  id: string;
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  region: string;
  time: string;
}

export const recentAlerts: Alert[] = [
  { id: 'a1', type: 'Flood Change Detected', severity: 'High', region: 'Amazon Deforestation Sector 7', time: '15 mins ago' },
  { id: 'a2', type: 'Infrastructure Change', severity: 'High', region: 'Fukushima Coastal Monitoring', time: '1 hour ago' },
  { id: 'a3', type: 'Maritime Anomaly', severity: 'Medium', region: 'South China Sea', time: '3 hours ago' },
  { id: 'a4', type: 'Land Clearing', severity: 'Low', region: 'Boreal Forest Zone C', time: '5 hours ago' },
];
