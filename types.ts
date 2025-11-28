export interface TrendData {
  category: string;
  insights: string[];
  keywords: string[];
  sources: { title: string; uri: string }[];
}

export interface CalendarEvent {
  title: string;
  date: string;
  type: 'Movie' | 'Holiday' | 'Game' | 'Social';
  impact: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface DesignPrediction {
  themeName: string;
  targetAgeGroup: string;
  colorPalette: string[];
  visualElements: string[];
  reasoning: string;
  estimatedDemand: number; // 0-100
}

export interface AnalysisState {
  isLoading: boolean;
  data: string | null;
  error: string | null;
  sources?: { title: string; uri: string }[];
}

export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  MARKET_TRENDS = 'MARKET_TRENDS', // Shopee, Competitors, Keywords
  CALENDAR = 'CALENDAR', // Movies, Seasons
  PSYCHOLOGY = 'PSYCHOLOGY', // Age groups, Colors
  PREDICTOR = 'PREDICTOR', // Synthesis
}