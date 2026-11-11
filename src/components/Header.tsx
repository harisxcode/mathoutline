import React from 'react';
import { Volume2, VolumeX, Moon, Sun } from 'lucide-react';
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
