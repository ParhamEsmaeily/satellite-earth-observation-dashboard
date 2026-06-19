export interface ImageryCapture {
  id: string;
  region: string;
  sensor: string;
  date: string;
  status: 'Processed' | 'Processing' | 'Failed';
}

export const latestImagery: ImageryCapture[] = [
  { id: 'img1', region: 'Port of Vancouver', sensor: 'C-band SAR', date: '2023-10-25 14:00Z', status: 'Processed' },
  { id: 'img2', region: 'Amazon Deforestation', sensor: 'X-band SAR', date: '2023-10-25 13:45Z', status: 'Processed' },
  { id: 'img3', region: 'Fukushima Coastal', sensor: 'Optical', date: '2023-10-25 12:30Z', status: 'Processing' },
  { id: 'img4', region: 'Suez Canal Anchorage', sensor: 'C-band SAR', date: '2023-10-25 10:15Z', status: 'Processed' },
];
