import React, { useState } from 'react';
import { Rocket, Palette, DollarSign, Award, KeyRound, Hexagon } from 'lucide-react';
import { OrbitIntegers } from './Games/OrbitIntegers';
import { MysteryPicture } from './Games/MysteryPicture';
import { RagsToRiches } from './Games/RagsToRiches';
import { JeopardyGame } from './Games/JeopardyGame';
import { EscapeRoom } from './Games/EscapeRoom';
import { HexingoGame } from './Games/HexingoGame';
import { sounds } from '../utils/audio';

type GameId = 'orbit' | 'mystery' | 'rags' | 'jeopardy' | 'escape' | 'hexingo';

interface GamesHubProps {
  onScoreEarned: (gameId: string, score: number) => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({ onScoreEarned }) => {
  const [selectedGame, setSelectedGame] = useState<GameId>('orbit');

  const games = [
    {
      id: 'orbit' as GameId,
      title: 'Orbit Integers',
      badge: 'Speed Racing',
      icon: Rocket,
      color: 'text-indigo-600 dark:text-indigo-400',
      description: 'Race your starship by quickly answering signed integer addition & subtraction equations with combo boosts.'
    },
    {
      id: 'mystery' as GameId,
      title: 'Mystery Picture',
      badge: 'Pixel Mosaic',
      icon: Palette,
      color: 'text-amber-600 dark:text-amber-400',
      description: 'Solve integer problems on a 36-tile grid to uncover the hidden Autumn Harvest pixel art.'
    },
    {
      id: 'rags' as GameId,
      title: 'Rags to Riches',
      badge: '$1M Ladder',
      icon: DollarSign,
      color: 'text-emerald-600 dark:text-emerald-400',
      description: 'Climb 15 levels of increasing integer complexity with 50:50, Ask Class, and Teacher Hint lifelines.'
    },
    {
      id: 'jeopardy' as GameId,
      title: 'Jeopardy',
      badge: 'Classroom Trivia',
      icon: Award,
      color: 'text-purple-600 dark:text-purple-400',
      description: 'Choose categories and wager points in 1-player or 2-team classroom competition mode.'
    },
    {
      id: 'escape' as GameId,
      title: 'Escape Room',
      badge: 'Puzzle Chambers',
      icon: KeyRound,
      color: 'text-orange-600 dark:text-orange-400',
      description: 'Crack 4 mystical chambers using opposites, absolute value distances, zero pairs, and rational equations.'
    },
    {
      id: 'hexingo' as GameId,
      title: 'Hexingo',
      badge: 'Rational Numbers',
      icon: Hexagon,
      color: 'text-teal-600 dark:text-teal-400',
      description: 'Claim hexagonal territory on the board by computing signed decimal and fraction operations.'
    }
  ];

  const handleSelectGame = (id: GameId) => {
    sounds.playClick();
    setSelectedGame(id);
  };

  return (
    <div className="space-y-6">
      {/* Game Selector Shelf */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {games.map((g) => {
          const Icon = g.icon;
          const isSelected = selectedGame === g.id;

          return (
            <button
              key={g.id}
              onClick={() => handleSelectGame(g.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md scale-102'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-amber-400 dark:text-amber-600' : g.color}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400'
                }`}>
                  {g.badge}
                </span>
              </div>
              <div className="font-bold text-xs sm:text-sm tracking-tight">
                {g.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Game Canvas */}
      <div>
        {selectedGame === 'orbit' && <OrbitIntegers onComplete={(score) => onScoreEarned('orbit', score)} />}
        {selectedGame === 'mystery' && <MysteryPicture onComplete={(score) => onScoreEarned('mystery', score)} />}
        {selectedGame === 'rags' && <RagsToRiches onComplete={(score) => onScoreEarned('rags', score)} />}
        {selectedGame === 'jeopardy' && <JeopardyGame onComplete={(score) => onScoreEarned('jeopardy', score)} />}
        {selectedGame === 'escape' && <EscapeRoom onComplete={(score) => onScoreEarned('escape', score)} />}
        {selectedGame === 'hexingo' && <HexingoGame onComplete={(score) => onScoreEarned('hexingo', score)} />}
      </div>
    </div>
  );
};
