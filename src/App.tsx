import { useState } from 'react';
import { Header } from './components/Header';
import { PromptGenerator } from './components/PromptGenerator';
import { PromptDisplay } from './components/PromptDisplay';
import { PromptGallery } from './components/PromptGallery';
import { Footer } from './components/Footer';
import { generateCctvPrompt } from './services/openaiService';
import { addPrompt } from './services/supabaseService';
import type { GeneratorOptions } from './types';
import { AlertCircle, Camera, Sparkles, Zap } from 'lucide-react';

function App() {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshGallery, setRefreshGallery] = useState(0);

  const handleGenerate = async (options: GeneratorOptions) => {
    setIsGenerating(true);
    setError(null);

    try {
      const prompt = await generateCctvPrompt(options);
      setGeneratedPrompt(prompt);

      // Save to Supabase
      await addPrompt(options, prompt);
      
      // Trigger gallery refresh
      setRefreshGallery(prev => prev + 1);
    } catch (err) {
      console.error('Generation error:', err);
      setError('Failed to generate prompt. Please check your API keys and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Check if environment variables are set
  const hasOpenAIKey = import.meta.env.VITE_OPENAI_API_KEY;
  const hasSupabaseConfig = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!hasOpenAIKey || !hasSupabaseConfig) {
    return (
      <div className="min-h-screen bg-gray-950 text-slate-300 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 border border-red-400/30 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <h1 className="text-2xl font-bold text-red-400">Configuration Error</h1>
          </div>
          <p className="text-slate-300 mb-4">
            Missing required environment variables. Please configure the following:
          </p>
          <div className="bg-gray-950 border border-slate-700 rounded-md p-4 mb-4">
            <ul className="space-y-2 text-sm font-mono">
              {!hasOpenAIKey && (
                <li className="text-red-400">❌ VITE_OPENAI_API_KEY</li>
              )}
              {!hasSupabaseConfig && (
                <>
                  <li className="text-red-400">❌ VITE_SUPABASE_URL</li>
                  <li className="text-red-400">❌ VITE_SUPABASE_ANON_KEY</li>
                </>
              )}
            </ul>
          </div>
          <p className="text-slate-400 text-sm">
            Create a <code className="bg-gray-950 px-2 py-1 rounded text-green-400">.env</code> file 
            in the project root with these variables. Get OpenAI key from{' '}
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
              platform.openai.com/api-keys
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-slate-300 font-mono">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-12 h-12 text-green-400" />
            <Sparkles className="w-8 h-8 text-green-400 animate-pulse" />
            <Zap className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            AI-Powered CCTV Prompt Generator
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Create realistic surveillance-style video prompts for AI video generation tools. 
            Perfect for filmmaking, training data, and creative projects.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-400/30 rounded-lg">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Generator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <PromptGenerator onGenerate={handleGenerate} isGenerating={isGenerating} />
          <PromptDisplay prompt={generatedPrompt} />
        </div>

        {/* Gallery Section */}
        <div key={refreshGallery}>
          <PromptGallery />
        </div>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/30 border border-green-400/10 rounded-lg p-6">
            <Camera className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-lg font-bold text-slate-200 mb-2">Realistic Details</h3>
            <p className="text-slate-400 text-sm">
              Generate prompts with authentic CCTV characteristics including camera angles, 
              lighting, and visual artifacts.
            </p>
          </div>
          <div className="bg-gray-900/30 border border-green-400/10 rounded-lg p-6">
            <Sparkles className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-lg font-bold text-slate-200 mb-2">AI-Optimized</h3>
            <p className="text-slate-400 text-sm">
              Prompts are structured for optimal results with AI video generators like 
              Runway, Pika, and Sora.
            </p>
          </div>
          <div className="bg-gray-900/30 border border-green-400/10 rounded-lg p-6">
            <Zap className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-lg font-bold text-slate-200 mb-2">Fast & Easy</h3>
            <p className="text-slate-400 text-sm">
              Generate professional prompts in seconds. Save your favorites and 
              access them anytime.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
