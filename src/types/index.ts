export interface GeneratorOptions {
  scene: string;
  location: string;
  timeOfDay: string;
  weather: string;
  visualArtifacts: string[];
}

export interface SavedPrompt {
  id: string;
  scene: string;
  location: string;
  time_of_day: string;
  weather: string;
  visual_artifacts: string[];
  generated_prompt: string;
  created_at: string;
}

export const LOCATIONS = [
  'Parking Lot',
  'Convenience Store',
  'Bank ATM',
  'Office Building Lobby',
  'Subway Station',
  'Shopping Mall',
  'Gas Station',
  'Apartment Building',
  'Warehouse',
  'School Hallway',
];

export const TIME_OPTIONS = [
  'Early Morning (5-7 AM)',
  'Morning Rush (7-9 AM)',
  'Mid-Morning (9-12 PM)',
  'Afternoon (12-5 PM)',
  'Evening (5-8 PM)',
  'Night (8 PM-12 AM)',
  'Late Night (12-5 AM)',
];

export const WEATHER_OPTIONS = [
  'Clear',
  'Cloudy',
  'Rainy',
  'Foggy',
  'Snowy',
  'Stormy',
];

export const VISUAL_ARTIFACTS = [
  'Frame skips',
  'Lens distortion',
  'Motion blur',
  'Overexposure',
  'Underexposure',
  'Pixelation',
  'Compression artifacts',
  'Lens flare',
  'Fish-eye effect',
  'Chromatic aberration',
  'Scan lines',
  'Static noise',
  'Interlacing',
  'Date/Time overlay',
  'Camera ID overlay',
  'Grid overlay',
  'Low frame rate',
  'Grainy texture',
  'Vignetting',
  'Color banding',
];
