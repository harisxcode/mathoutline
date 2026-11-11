import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { DollarSign, HelpCircle, Users, Sparkles, Trophy, RotateCcw, AlertTriangle } from 'lucide-react';
import { RAGS_TO_RICHES_QUESTIONS } from '../../data/curriculumData';
import { sounds } from '../../utils/audio';

export const RagsToRiches: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  const [currentLevel, setCurrentLevel] = useState<number>(0); // 0 to 14
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost' | 'walked'>('playing');
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    askClass: true,
    hint: true
  });
  const [classPoll, setClassPoll] = useState<number[] | null>(null);
  const [hintActive, setHintActive] = useState<boolean>(false);

  const question = RAGS_TO_RICHES_QUESTIONS[currentLevel];

  const handleSelectOption = (idx: number) => {
    if (eliminatedOptions.includes(idx)) return;
    sounds.playClick();
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;

    if (selectedOption === question.correctIndex) {
      sounds.playCorrect();
      if (currentLevel === 14) {
        sounds.playVictory();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
        setGameState('won');
        if (onComplete) onComplete(1000000);
      } else {
        sounds.playBooster();
        setCurrentLevel(prev => prev + 1);
        setSelectedOption(null);
        setEliminatedOptions([]);
        setClassPoll(null);
        setHintActive(false);
      }
    } else {
      sounds.playIncorrect();
      setGameState('lost');
    }
  };

  const handleUse5050 = () => {
    if (!lifelines.fiftyFifty) return;
    sounds.playClick();
    const incorrectIndices = question.options
      .map((_, i) => i)
      .filter(i => i !== question.correctIndex);
    // Shuffle and pick 2 to eliminate
    const shuffled = incorrectIndices.sort(() => Math.random() - 0.5);
    setEliminatedOptions(shuffled.slice(0, 2));
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
  };

  const handleUseAskClass = () => {
    if (!lifelines.askClass) return;
    sounds.playClick();
    // Generate realistic poll skewed to correct
    const poll = [15, 10, 8, 7];
    const correctPercent = Math.floor(Math.random() * 20) + 65; // 65-85%
    const remainder = 100 - correctPercent;
    const split3 = [
      Math.floor(remainder * 0.5),
      Math.floor(remainder * 0.3),
      remainder - Math.floor(remainder * 0.5) - Math.floor(remainder * 0.3)
    ];

    let wrongCounter = 0;
    const finalPoll = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      if (i === question.correctIndex) {
        finalPoll[i] = correctPercent;
      } else {
        finalPoll[i] = split3[wrongCounter++];
      }
    }

    setClassPoll(finalPoll);
    setLifelines(prev => ({ ...prev, askClass: false }));
  };

  const handleUseHint = () => {
    if (!lifelines.hint) return;
    sounds.playClick();
    setHintActive(true);
    setLifelines(prev => ({ ...prev, hint: false }));
  };

  const handleWalkAway = () => {
    sounds.playClick();
    setGameState('walked');
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentLevel(0);
    setSelectedOption(null);
    setGameState('playing');
    setEliminatedOptions([]);
    setLifelines({ fiftyFifty: true, askClass: true, hint: true });
    setClassPoll(null);
    setHintActive(false);
  };

  // Compute safe prize if lost
  const getGuaranteedPrize = () => {
    if (currentLevel >= 10) return '$32,000';
    if (currentLevel >= 5) return '$1,000';
    return '$0';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      {/* Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              Rags to Riches: Adding &amp; Subtracting Integers
            </h3>
            <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
              Curriculum Game Break
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Climb the 15-question ladder to $1,000,000. Use your lifelines wisely and master every integer rule!
          </p>
        </div>

        {gameState === 'playing' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleWalkAway}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
            >
              Walk Away with {currentLevel > 0 ? RAGS_TO_RICHES_QUESTIONS[currentLevel - 1].prize : '$0'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-start">
        {/* Main Stage (Left / 8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {gameState === 'playing' ? (
            <>
              {/* Lifelines Toolbar */}
              <div className="flex items-center gap-2 p-2.5 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
                  Lifelines:
                </span>
                <button
                  onClick={handleUse5050}
                  disabled={!lifelines.fiftyFifty}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    lifelines.fiftyFifty
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>50:50</span>
                </button>
                <button
                  onClick={handleUseAskClass}
                  disabled={!lifelines.askClass}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    lifelines.askClass
                      ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Ask Class
                </button>
                <button
                  onClick={handleUseHint}
                  disabled={!lifelines.hint}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    lifelines.hint
                      ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Teacher Hint
                </button>
              </div>

              {/* Class Poll readout if triggered */}
              {classPoll && (
                <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 text-xs">
                  <div className="font-bold text-sky-900 dark:text-sky-200 mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-sky-600" />
                    Class Poll Results:
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['A', 'B', 'C', 'D'].map((letter, i) => (
                      <div key={letter} className="text-center bg-white dark:bg-slate-900 p-1.5 rounded border border-sky-100 dark:border-sky-800">
                        <span className="font-bold">{letter}:</span> {classPoll[i]}%
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hint readout */}
              {hintActive && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                  <span className="font-bold">Teacher Clue:</span> {question.hint}
                </div>
              )}

              {/* Question Screen */}
              <div className="p-6 bg-slate-900 text-white rounded-xl shadow-md border border-slate-800 text-center relative">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                  Question {currentLevel + 1} of 15 &bull; For {question.prize}
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-sans py-3 leading-snug">
                  {question.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option, idx) => {
                  const isEliminated = eliminatedOptions.includes(idx);
                  const isSelected = selectedOption === idx;
                  const label = ['A', 'B', 'C', 'D'][idx];

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isEliminated}
                      className={`p-4 rounded-xl border-2 text-left font-semibold transition-all flex items-center gap-3 ${
                        isEliminated
                          ? 'opacity-20 border-slate-200 dark:border-slate-800 cursor-not-allowed bg-slate-100 dark:bg-slate-950 text-slate-400'
                          : isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-[1.01]'
                          : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-slate-950 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        {label}
                      </span>
                      <span className="text-base font-mono">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Submit action */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedOption === null}
                  className={`px-8 py-3 rounded-xl font-bold text-sm shadow-md transition ${
                    selectedOption !== null
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transform hover:scale-105'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Final Answer!
                </button>
              </div>
            </>
          ) : (
            /* Outcome Displays */
            <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
                {gameState === 'won' ? '🏆' : gameState === 'walked' ? '💰' : '⚠️'}
              </div>

              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                {gameState === 'won' && 'GRAND PRIZE CHAMPION! $1,000,000!'}
                {gameState === 'walked' && `You Walked Away with ${currentLevel > 0 ? RAGS_TO_RICHES_QUESTIONS[currentLevel - 1].prize : '$0'}!`}
                {gameState === 'lost' && `Incorrect Answer! You Leave with ${getGuaranteedPrize()}!`}
              </h4>

              <div className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                <span className="font-semibold text-slate-900 dark:text-white">Explanation:</span> {question.explanation}
              </div>

              <div className="pt-4">
                <button
                  onClick={handleRestart}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition"
                >
                  Play Rags to Riches Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Money Ladder (Right / 4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 rounded-xl p-4 border border-slate-800 text-white">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider pb-3 border-b border-slate-800 text-center">
            Prize Money Ladder
          </div>
          <div className="space-y-1 mt-3">
            {[...RAGS_TO_RICHES_QUESTIONS].reverse().map((q, revIdx) => {
              const originalIdx = 14 - revIdx;
              const isCurrent = originalIdx === currentLevel;
              const isMilestone = originalIdx === 4 || originalIdx === 9 || originalIdx === 14;
              const isCompleted = originalIdx < currentLevel;

              return (
                <div
                  key={q.level}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-colors ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 font-bold scale-[1.02] shadow-sm'
                      : isCompleted
                      ? 'text-emerald-400 opacity-60'
                      : isMilestone
                      ? 'text-amber-300 font-bold bg-slate-800/80'
                      : 'text-slate-400'
                  }`}
                >
                  <span className="w-6">{q.level}</span>
                  <span className="tabular-nums">{q.prize}</span>
                  {isMilestone && <span className="text-[10px] uppercase font-sans text-amber-400">Milestone</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
