import { useState, useEffect } from 'react';
import { Clock, MapPin, Cloud, Copy, Check } from 'lucide-react';
import type { SavedPrompt } from '../types';
import { getRecentPrompts } from '../services/supabaseService';

export function PromptGallery() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = async () => {
    setLoading(true);
    const data = await getRecentPrompts(12);
    setPrompts(data);
    setLoading(false);
  };

  const copyPrompt = async (prompt: SavedPrompt) => {
    try {
      await navigator.clipboard.writeText(prompt.generated_prompt);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="bg-gray-900/50 border border-green-400/20 rounded-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="bg-gray-900/50 border border-green-400/20 rounded-lg p-8">
        <p className="text-center text-slate-400">
          No prompts yet. Generate your first one above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-green-400 mb-4">Recent Prompts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="bg-gray-900/50 border border-green-400/10 rounded-lg p-4 hover:border-green-400/30 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-slate-300 font-semibold line-clamp-2 mb-2">
                  {prompt.scene}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {prompt.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {prompt.time_of_day}
                  </span>
                  <span className="flex items-center gap-1">
                    <Cloud className="w-3 h-3" />
                    {prompt.weather}
                  </span>
                </div>
              </div>
              <button
                onClick={() => copyPrompt(prompt)}
                className="p-2 bg-gray-950 border border-green-400/20 rounded-md hover:bg-green-400/10 transition-all flex-shrink-0 ml-2"
                title="Copy prompt"
              >
                {copiedId === prompt.id ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>

            <p className="text-slate-400 text-xs line-clamp-3 mb-3 font-mono">
              {prompt.generated_prompt}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>{formatDate(prompt.created_at)}</span>
              <span className="text-green-400/50">
                {prompt.visual_artifacts.length} artifacts
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
