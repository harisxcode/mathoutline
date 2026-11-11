import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Hexagon, RotateCcw, Check, Sparkles, Trophy } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface HexCell {
  id: number;
  problem: string;
  answer: string;
  claimedBy: 'player' | null;
  options: string[];
}

const INITIAL_HEX_PROBLEMS: HexCell[] = [
  { id: 1, problem: '(-1.5) + 3.5', answer: '2.0', claimedBy: null, options: ['2.0', '-2.0', '5.0', '-5.0'] },
  { id: 2, problem: '(-3/4) + 1/4', answer: '-1/2', claimedBy: null, options: ['-1/2', '+1/2', '-1', '0'] },
  { id: 3, problem: '(-2.2) - 1.1', answer: '-3.3', claimedBy: null, options: ['-3.3', '-1.1', '+1.1', '+3.3'] },
  { id: 4, problem: '(-1/3) + (-1/3)', answer: '-2/3', claimedBy: null, options: ['-2/3', '0', '+2/3', '-1'] },

  { id: 5, problem: '4.8 - (-1.2)', answer: '6.0', claimedBy: null, options: ['6.0', '3.6', '-3.6', '-6.0'] },
  { id: 6, problem: '(-5/8) + 3/8', answer: '-1/4', claimedBy: null, options: ['-1/4', '-2/8', '+1/4', '-1'] },
  { id: 7, problem: '(-0.75) + (-0.25)', answer: '-1.0', claimedBy: null, options: ['-1.0', '+1.0', '-0.5', '0'] },
  { id: 8, problem: '(-2/5) - (-3/5)', answer: '1/5', claimedBy: null, options: ['1/5', '-1/5', '-5/5', '+5/5'] },

  { id: 9, problem: '(-3.6) + 1.6', answer: '-2.0', claimedBy: null, options: ['-2.0', '+2.0', '-5.2', '+5.2'] },
  { id: 10, problem: '1/2 - 3/4', answer: '-1/4', claimedBy: null, options: ['-1/4', '+1/4', '-2/4', '0'] },
  { id: 11, problem: '(-7.5) - (-2.5)', answer: '-5.0', claimedBy: null, options: ['-5.0', '+5.0', '-10.0', '+10.0'] },
  { id: 12, problem: '(-1/6) + (-5/6)', answer: '-1', claimedBy: null, options: ['-1', '0', '+1', '-4/6'] },

  { id: 13, problem: '5.25 + (-2.25)', answer: '3.0', claimedBy: null, options: ['3.0', '-3.0', '7.5', '-7.5'] },
  { id: 14, problem: '(-4/7) + 4/7', answer: '0', claimedBy: null, options: ['0', '-8/7', '+8/7', '1'] },
  { id: 15, problem: '(-1.8) - 0.2', answer: '-2.0', claimedBy: null, options: ['-2.0', '-1.6', '+1.6', '+2.0'] },
  { id: 16, problem: '(-3/10) - (-7/10)', answer: '2/5', claimedBy: null, options: ['2/5', '-4/10', '-1', '+1'] }
];

export const HexingoGame: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  const [board, setBoard] = useState<HexCell[]>(INITIAL_HEX_PROBLEMS);
  const [activeCell, setActiveCell] = useState<HexCell | null>(board[0]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);

  const claimedCount = board.filter(c => c.claimedBy === 'player').length;
  const isWon = claimedCount >= 10; // Connect majority of board

  const handleSelectCell = (cell: HexCell) => {
    sounds.playClick();
    setActiveCell(cell);
    setSelectedOption(null);
    setErrorFeedback(null);
  };

  const handleClaim = (choice: string) => {
    if (!activeCell || activeCell.claimedBy) return;
    setSelectedOption(choice);

    if (choice === activeCell.answer) {
      sounds.playCorrect();
      sounds.playBooster();
      const updated = board.map(c => c.id === activeCell.id ? { ...c, claimedBy: 'player' as const } : c);
      setBoard(updated);
      setErrorFeedback(null);

      // Check win
      if (updated.filter(c => c.claimedBy === 'player').length >= 10) {
        sounds.playVictory();
        confetti({ particleCount: 110, spread: 80 });
        if (onComplete) onComplete(250);
      } else {
        // Auto select next unclaimed
        const nextUnclaimed = updated.find(c => c.claimedBy === null);
        if (nextUnclaimed) setActiveCell(nextUnclaimed);
      }
    } else {
      sounds.playIncorrect();
      setErrorFeedback('Incorrect! Remember your signs and common denominators.');
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setBoard(INITIAL_HEX_PROBLEMS.map(c => ({ ...c, claimedBy: null })));
    setActiveCell(INITIAL_HEX_PROBLEMS[0]);
    setSelectedOption(null);
    setErrorFeedback(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Hexagon className="w-5 h-5 text-teal-500" />
              Hexingo: Rational Numbers
            </h3>
            <span className="text-xs text-teal-700 dark:text-teal-300 font-medium bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded">
              Curriculum Game Break
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Claim 10 hexagonal territories across the board by computing signed decimal and fraction expressions!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400">Territory Claimed</div>
            <div className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 tabular-nums">
              {claimedCount} / 10 Hexagons
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-start">
        {/* Hex Grid Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-3 max-w-[440px] w-full p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-md">
            {board.map((cell, idx) => {
              const isClaimed = cell.claimedBy === 'player';
              const isSelected = activeCell?.id === cell.id;

              return (
                <button
                  key={cell.id}
                  onClick={() => handleSelectCell(cell)}
                  className={`h-20 rounded-xl font-mono p-1 flex flex-col items-center justify-center transition-all ${
                    isClaimed
                      ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md border-2 border-teal-300'
                      : isSelected
                      ? 'bg-amber-400 text-slate-950 border-2 border-amber-300 scale-105 z-10 font-bold'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <Hexagon className={`w-4 h-4 mb-0.5 ${isClaimed ? 'fill-white' : ''}`} />
                  <span className="text-[11px] font-bold text-center leading-tight">
                    {isClaimed ? cell.answer : cell.problem}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="text-xs text-slate-400 mt-3 text-center">
            Click any hexagon on the grid to challenge and claim its territory.
          </div>
        </div>

        {/* Claim Station */}
        <div className="lg:col-span-5 space-y-4">
          {isWon ? (
            <div className="p-6 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-300 dark:border-teal-800 text-center space-y-3">
              <Trophy className="w-12 h-12 text-teal-600 mx-auto" />
              <h4 className="text-xl font-bold text-teal-900 dark:text-teal-100">
                Hexingo Dominion Achieved!
              </h4>
              <p className="text-sm text-teal-700 dark:text-teal-300">
                You secured over 10 connected hexagonal nodes with pristine signed rational arithmetic.
              </p>
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-sm transition"
              >
                Play Hexingo Again
              </button>
            </div>
          ) : activeCell ? (
            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Node #{activeCell.id}</span>
                {activeCell.claimedBy && (
                  <span className="text-teal-600 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Claimed
                  </span>
                )}
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">Evaluate Rational Expression:</div>
                <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white">
                  {activeCell.problem} = ?
                </div>
              </div>

              {!activeCell.claimedBy ? (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Choose the Correct Rational Answer:
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {activeCell.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleClaim(opt)}
                        className="py-3 px-3 bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-950/40 border-2 border-slate-200 dark:border-slate-800 hover:border-teal-500 rounded-xl font-mono font-bold text-base text-slate-900 dark:text-white transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {errorFeedback && (
                    <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs font-semibold text-rose-700 dark:text-rose-300">
                      {errorFeedback}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-lg text-xs text-teal-800 dark:text-teal-200 font-medium">
                  This hexagon is securely claimed! Select another unclaimed territory on the board.
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
