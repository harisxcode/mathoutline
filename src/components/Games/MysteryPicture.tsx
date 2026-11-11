import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Palette, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';
import { MYSTERY_PICTURE_TEMPLATES } from '../../data/curriculumData';
import { sounds } from '../../utils/audio';

export const MysteryPicture: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  const template = MYSTERY_PICTURE_TEMPLATES[0];
  const [revealed, setRevealed] = useState<boolean[]>(new Array(template.tiles.length).fill(false));
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const solvedCount = revealed.filter(Boolean).length;
  const isComplete = solvedCount === template.tiles.length;

  const handleSelectTile = (idx: number) => {
    sounds.playClick();
    setSelectedIdx(idx);
    setUserAnswer('');
    setMessage(null);
  };

  const handleCheckAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedIdx === null) return;

    const tile = template.tiles[selectedIdx];
    const parsed = parseInt(userAnswer.trim(), 10);

    if (parsed === tile.answer) {
      sounds.playCorrect();
      const nextRevealed = [...revealed];
      nextRevealed[selectedIdx] = true;
      setRevealed(nextRevealed);
      setMessage({ text: `Correct! ${tile.problem} = ${tile.answer}`, type: 'success' });
      setUserAnswer('');

      // Check overall completion
      if (nextRevealed.filter(Boolean).length === template.tiles.length) {
        sounds.playVictory();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        if (onComplete) onComplete(100);
      } else {
        // Find next unrevealed tile
        const nextUnrevealed = nextRevealed.findIndex((r, i) => !r && i > selectedIdx);
        if (nextUnrevealed !== -1) {
          setSelectedIdx(nextUnrevealed);
        } else {
          const firstUnrevealed = nextRevealed.findIndex(r => !r);
          setSelectedIdx(firstUnrevealed !== -1 ? firstUnrevealed : null);
        }
      }
    } else {
      sounds.playIncorrect();
      setMessage({ text: `Not quite. Try Keep Change Change or zero pair models!`, type: 'error' });
    }
  };

  const handleRevealAll = () => {
    sounds.playBooster();
    setRevealed(new Array(template.tiles.length).fill(true));
  };

  const handleReset = () => {
    sounds.playClick();
    setRevealed(new Array(template.tiles.length).fill(false));
    setSelectedIdx(0);
    setUserAnswer('');
    setMessage(null);
  };

  const currentTile = selectedIdx !== null ? template.tiles[selectedIdx] : null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Palette className="w-5 h-5 text-amber-500" />
              Mystery Picture Integers: {template.name} {template.icon}
            </h3>
            <span className="text-xs text-amber-700 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
              Curriculum Game Break
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Solve each signed integer expression to reveal the mystery pixel mosaic tile by tile!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400">Progress</div>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {solvedCount} / {template.tiles.length} Tiles
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
            title="Reset Puzzle"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-start">
        {/* The 6x6 Mosaic Grid */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="grid grid-cols-6 gap-1 p-2 bg-slate-900 rounded-2xl shadow-lg border-4 border-slate-800 max-w-[420px] w-full aspect-square">
            {template.tiles.map((tile, i) => {
              const isRevealed = revealed[i];
              const isSelected = selectedIdx === i;

              return (
                <button
                  key={i}
                  onClick={() => handleSelectTile(i)}
                  style={{
                    backgroundColor: isRevealed ? tile.color : undefined
                  }}
                  className={`w-full h-full rounded-md flex items-center justify-center font-mono transition-all duration-300 relative ${
                    isRevealed
                      ? 'shadow-xs border border-white/20 text-white font-bold text-xs'
                      : isSelected
                      ? 'bg-amber-400/90 text-slate-950 border-2 border-amber-300 font-bold scale-105 z-10 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] border border-slate-700/60'
                  }`}
                >
                  {isRevealed ? '' : (
                    <span className="p-0.5 leading-none text-center">
                      {tile.problem}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Color Key Guide */}
          <div className="flex flex-wrap gap-3 mt-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-[#92400e]" />
              <span className="text-slate-600 dark:text-slate-400">Answer -7 (Deep Brown)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-[#f59e0b]" />
              <span className="text-slate-600 dark:text-slate-400">Answer 0 (Gold)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-[#b45309]" />
              <span className="text-slate-600 dark:text-slate-400">Answer +3 (Rust)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-[#ea580c]" />
              <span className="text-slate-600 dark:text-slate-400">Answer +6 (Flame Orange)</span>
            </div>
          </div>
        </div>

        {/* Solver Interactive Station */}
        <div className="lg:col-span-5 space-y-4">
          {isComplete ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/60 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
                Mystery Mosaic Unveiled!
              </h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                You successfully solved all 36 signed integer expressions and reconstructed the Autumn Harvest artwork!
              </p>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition"
              >
                Play Again
              </button>
            </div>
          ) : currentTile ? (
            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <span>Tile #{selectedIdx! + 1} Selected</span>
                {revealed[selectedIdx!] && (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Already Solved
                  </span>
                )}
              </div>

              <div className="text-center py-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-400">Calculate expression:</div>
                <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white mt-1">
                  {currentTile.problem} = ?
                </div>
              </div>

              {!revealed[selectedIdx!] && (
                <form onSubmit={handleCheckAnswer} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Your Integer Answer:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="1"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="e.g. -7 or 3"
                        className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-sm transition"
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                  {message && (
                    <div className={`p-2.5 rounded-lg text-xs font-semibold ${
                      message.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  {/* Quick Integer Pad */}
                  <div className="pt-2">
                    <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Quick Choices:</div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[-7, 0, 3, 6].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => { setUserAnswer(String(num)); sounds.playClick(); }}
                          className="py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded font-mono font-bold text-sm text-slate-800 dark:text-slate-200"
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              )}

              {/* Dev/Teacher Shortcut to reveal all if needed */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
                <span>Click tiles on the left to jump</span>
                <button
                  type="button"
                  onClick={handleRevealAll}
                  className="hover:text-amber-500 transition"
                >
                  Reveal All Art
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
