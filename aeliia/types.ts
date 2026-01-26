export interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum PricingTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE'
}

export interface AudioVisualizerProps {
  isPlaying: boolean;
  volume: number;
}

export interface User {
  name: string;
  email: string;
  isPremium: boolean;
}

export interface UserProfile {
  name: string;
  age: string;
  gender: string;
  mood?: string;
}