import { useState } from 'react';
import { Copy, Check, Download, Share2 } from 'lucide-react';

interface PromptDisplayProps {
  prompt: string;
}

export function PromptDisplay({ prompt }: PromptDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const downloadPrompt = () => {
    const blob = new Blob([prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cctv-prompt-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!prompt) return null;

  return (
    <div className="bg-gray-900/50 border border-green-400/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-green-400">Generated Prompt</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="p-2 bg-gray-950 border border-green-400/20 rounded-md hover:bg-green-400/10 transition-all"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <Copy className="w-5 h-5 text-slate-400" />
            )}
          </button>
          <button
            onClick={downloadPrompt}
            className="p-2 bg-gray-950 border border-green-400/20 rounded-md hover:bg-green-400/10 transition-all"
            title="Download as text file"
          >
            <Download className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="bg-gray-950 border border-green-400/20 rounded-md p-4">
        <pre className="text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
          {prompt}
        </pre>
      </div>

      <div className="mt-4 p-3 bg-green-400/10 border border-green-400/20 rounded-md">
        <p className="text-xs text-slate-400 flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Use this prompt with AI video generators like Runway, Pika, or Sora
        </p>
      </div>
    </div>
  );
}
