import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { GeneratorOptions } from '../types';
import { LOCATIONS, TIME_OPTIONS, WEATHER_OPTIONS, VISUAL_ARTIFACTS } from '../types';

interface PromptGeneratorProps {
  onGenerate: (options: GeneratorOptions) => void;
  isGenerating: boolean;
}

export function PromptGenerator({ onGenerate, isGenerating }: PromptGeneratorProps) {
  const [scene, setScene] = useState('');
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [timeOfDay, setTimeOfDay] = useState(TIME_OPTIONS[0]);
  const [weather, setWeather] = useState(WEATHER_OPTIONS[0]);
  const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([
    'Date/Time overlay',
    'Camera ID overlay',
    'Low frame rate',
  ]);

  const toggleArtifact = (artifact: string) => {
    setSelectedArtifacts((prev) =>
      prev.includes(artifact)
        ? prev.filter((a) => a !== artifact)
        : [...prev, artifact]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scene.trim()) return;

    onGenerate({
      scene,
      location,
      timeOfDay,
      weather,
      visualArtifacts: selectedArtifacts,
    });
  };

  return (
    <div className="bg-gray-900/50 border border-green-400/20 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
        <Sparkles className="w-6 h-6" />
        Generate CCTV Prompt
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Scene Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Scene Description *
          </label>
          <textarea
            value={scene}
            onChange={(e) => setScene(e.target.value)}
            placeholder="Describe what's happening in the scene..."
            className="w-full px-4 py-3 bg-gray-950 border border-green-400/20 rounded-md text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-green-400/50 min-h-[100px] font-mono"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 bg-gray-950 border border-green-400/20 rounded-md text-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 font-mono"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Time of Day */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Time of Day
          </label>
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="w-full px-4 py-3 bg-gray-950 border border-green-400/20 rounded-md text-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 font-mono"
          >
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Weather */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Weather
          </label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="w-full px-4 py-3 bg-gray-950 border border-green-400/20 rounded-md text-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 font-mono"
          >
            {WEATHER_OPTIONS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* Visual Artifacts */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Visual Artifacts ({selectedArtifacts.length} selected)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {VISUAL_ARTIFACTS.map((artifact) => (
              <button
                key={artifact}
                type="button"
                onClick={() => toggleArtifact(artifact)}
                className={`px-3 py-2 text-xs rounded-md transition-all ${
                  selectedArtifacts.includes(artifact)
                    ? 'bg-green-400/20 border-green-400 text-green-400 border-2'
                    : 'bg-gray-950 border border-slate-700 text-slate-400 hover:border-green-400/50'
                }`}
              >
                {artifact}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating || !scene.trim()}
          className="w-full px-6 py-4 bg-green-400 text-gray-950 font-bold rounded-md hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-950"></div>
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Prompt
            </>
          )}
        </button>
      </form>
    </div>
  );
}
