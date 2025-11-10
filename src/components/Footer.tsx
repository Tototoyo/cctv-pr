import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-green-400/20 bg-gray-950/80 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm font-mono">
              © {new Date().getFullYear()} CCTV Prompt Generator
            </p>
            <p className="text-slate-600 text-xs mt-1">
              Powered by Google Gemini AI & Supabase
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-green-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-green-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-slate-400 hover:text-green-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-green-400/10 text-center">
          <p className="text-xs text-slate-500 font-mono">
            This tool generates prompts for AI video generation. Results may vary based on the AI model used.
          </p>
        </div>
      </div>
    </footer>
  );
}
