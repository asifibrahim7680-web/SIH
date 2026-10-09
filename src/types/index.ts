export type NavigationTab = 
  | 'home' 
  | 'forecast-dashboard' 
  | 'how-it-works' 
  | 'analytics' 
  | 'regime-detection' 
  | 'about';

export type LeadTimeHorizon = '24h' | '48h' | '72h' | '120h';

export type LayerMode = 'raw-nwp' | 'corrected-ai' | 'uncertainty' | 'observations';

export type CanvasMapMode = 'satellite' | 'contours' | 'mesh';

export interface WeatherStation {
  id: string;
  name: string;
  subname?: string;
  region: string;
  regime: string;
  rawRainMm: number;
  correctedRainMm: number;
  status: 'Calibrated' | 'Adjusted';
  p10: number;
  p90: number;
  lat: number;
  lon: number;
  elevationM: number;
  xPct: number; // For interactive SVG positioning (0-100)
  yPct: number; // For interactive SVG positioning (0-100)
}

export interface RegimeClass {
  id: string;
  name: string;
  description: string;
  probability: number;
  color: string;
  isPrimary?: boolean;
  isSecondary?: boolean;
  specialistNet?: string;
  kernel?: string;
  sampleCount: number;
  rawNwpRmse: number;
  aiCorrectedRmse: number;
  reductionPct: number;
  csi35: number;
  far: number;
  biasOffsetMm: string;
  status: 'Optimal' | 'Nominal';
}

export interface RegionDomain {
  id: string;
  name: string;
  shortName: string;
  bbox: string;
  peakIntensity: number;
  biasRecoveryMm: number;
  activeRegime: string;
  regimeConf: number;
  reliabilityScore: number;
  stations: WeatherStation[];
}

export interface DiurnalPoint {
  dateLabel: string;
  subLabel?: string;
  rawNwp: number;
  correctedAi: number;
  observation?: number;
  isToday?: boolean;
}

export interface AttributionItem {
  id: string;
  feature: string;
  description: string;
  scorePct: number;
  levelColor: string;
}

export interface RadarMetric {
  axis: string;
  observed: number; // 0 to 100
  baseline: number; // 0 to 100
}
