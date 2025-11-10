import { Camera } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-green-400/20 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="w-8 h-8 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold text-green-400 tracking-wider">
                CCTV PROMPT GENERATOR
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                AI-Powered Surveillance Scene Creator
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-slate-500 font-mono">
            <span>STATUS: ONLINE</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
