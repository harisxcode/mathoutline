import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Share2, Globe, X, Copy, Check, ExternalLink, Github } from 'lucide-react';
import { sounds } from '../utils/audio';

export type MainNavSection = 'lessons' | 'games' | 'flashcards' | 'manipulatives' | 'rating';

interface HeaderProps {
  currentSection: MainNavSection;
  onNavigate: (section: MainNavSection) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  isDark,
  onToggleTheme
}) => {
  const [isMuted, setIsMuted] = React.useState<boolean>(sounds.getMuted());
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyUrl = () => {
    sounds.playCorrect();
    navigator.clipboard.writeText('https://ais-pre-7q7v57jtwy4nqoasz7jpn2-131130976640.us-west2.run.app');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const navItems: { id: MainNavSection; label: string }[] = [
    { id: 'lessons', label: 'Lessons' },
    { id: 'games', label: 'Games' },
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'manipulatives', label: 'Manipulatives' },
    { id: 'rating', label: 'Knowledge Scale' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => { sounds.playClick(); onNavigate('lessons'); }}
          className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition text-left"
        >
          <span className="text-amber-600 dark:text-amber-400 font-mono">🍁🦃</span>
          <span>Rational Realm</span>
        </button>

        {/* Zone 2: 4-5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { sounds.playClick(); onNavigate(item.id); }}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentSection === item.id
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 font-bold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => { sounds.playClick(); setShowShareModal(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-xs whitespace-nowrap shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share &amp; URL</span>
          </button>

          <button
            onClick={handleToggleSound}
            aria-label="Toggle Sound Effects"
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Share / GitHub Pages Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Live URL &amp; GitHub Pages
                </h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Shared URL Box */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                1. Your Live Web Application URL
              </label>
              <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <input
                  type="text"
                  readOnly
                  value="https://ais-pre-7q7v57jtwy4nqoasz7jpn2-131130976640.us-west2.run.app"
                  className="flex-1 bg-transparent text-xs font-mono text-slate-800 dark:text-slate-200 select-all outline-hidden px-1"
                />
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <a
                  href="https://ais-pre-7q7v57jtwy4nqoasz7jpn2-131130976640.us-west2.run.app"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                This URL is live, globally accessible, and ready to share with students and teachers immediately.
              </p>
            </div>

            {/* GitHub Pages Setup */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <Github className="w-4 h-4" />
                2. GitHub Pages Deployment (Pre-Configured)
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <p>
                  GitHub Pages support has already been configured with relative asset paths (<code className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">base: './'</code>) and an automated GitHub Actions deployment workflow (<code className="font-mono text-indigo-600 dark:text-indigo-400">.github/workflows/deploy.yml</code>).
                </p>
                <div className="bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono text-[11px] space-y-1">
                  <div className="text-slate-400"># Option A: Automated via GitHub Actions</div>
                  <div>git push origin main</div>
                  <div className="text-slate-400 pt-1"># Option B: Single command deployment via gh-pages</div>
                  <div>npm run deploy</div>
                </div>
                <p className="text-[11px] text-slate-500">
                  In your repository: go to <strong>Settings &rarr; Pages &rarr; Source &rarr; GitHub Actions</strong> to enable live auto-deploy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile nav strip below header on small screens */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-x-auto text-xs font-semibold">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { sounds.playClick(); onNavigate(item.id); }}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              currentSection === item.id
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
