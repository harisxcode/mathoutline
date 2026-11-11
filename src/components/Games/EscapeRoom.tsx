import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { KeyRound, Lock, Unlock, HelpCircle, Sparkles, CheckCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { ESCAPE_ROOM_CHAMBERS } from '../../data/curriculumData';
import { sounds } from '../../utils/audio';

export const EscapeRoom: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  const [currentChamberIdx, setCurrentChamberIdx] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [unlockedChambers, setUnlockedChambers] = useState<number[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isEscaped, setIsEscaped] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const chamber = ESCAPE_ROOM_CHAMBERS[currentChamberIdx];

  const handleSelectChoice = (val: string) => {
    sounds.playClick();
    setSelectedChoice(val);
    setStatusMessage(null);
  };

  const handleAttemptUnlock = () => {
    if (!selectedChoice) return;

    if (selectedChoice === chamber.targetAnswer) {
      sounds.playCorrect();
      sounds.playVictory();
      const updatedUnlocked = [...unlockedChambers, chamber.id];
      setUnlockedChambers(updatedUnlocked);
      setStatusMessage({ text: 'Runic mechanism aligns! The chamber unseals!', isError: false });

      if (currentChamberIdx === ESCAPE_ROOM_CHAMBERS.length - 1) {
        setIsEscaped(true);
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        if (onComplete) onComplete(500);
      } else {
        setTimeout(() => {
          setCurrentChamberIdx(prev => prev + 1);
          setSelectedChoice(null);
          setShowHint(false);
          setStatusMessage(null);
        }, 1200);
      }
    } else {
      sounds.playIncorrect();
      setStatusMessage({ text: 'The ancient glyph remains immovable. Recheck your signs and values!', isError: true });
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setCurrentChamberIdx(0);
    setSelectedChoice(null);
    setUnlockedChambers([]);
    setShowHint(false);
    setIsEscaped(false);
    setStatusMessage(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-500" />
              The Integer Escape Room Challenge
            </h3>
            <span className="text-xs text-amber-700 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
              Curriculum Activity #8
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Navigate 4 locked chambers using additive inverses, absolute distance, zero pairs, and rational operations to break free!
          </p>
        </div>

        {/* Progress Chambers */}
        <div className="flex items-center gap-1.5">
          {ESCAPE_ROOM_CHAMBERS.map((ch, idx) => {
            const isUnlocked = unlockedChambers.includes(ch.id);
            const isCurrent = currentChamberIdx === idx;
            return (
              <div
                key={ch.id}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition ${
                  isUnlocked
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
                title={ch.title}
              >
                {isUnlocked ? <Unlock className="w-3.5 h-3.5" /> : idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {!isEscaped ? (
        <div className="my-6 space-y-6">
          {/* Chamber Lore and Atmospheric Header */}
          <div className="p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-md relative overflow-hidden">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              {chamber.title} &bull; {chamber.theme}
            </div>
            <p className="text-sm text-slate-300 italic mb-4 leading-relaxed">
              "{chamber.lore}"
            </p>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                Ancient Chamber Cipher:
              </div>
              <div className="text-base sm:text-lg font-mono font-bold text-white">
                {chamber.riddle}
              </div>
            </div>
          </div>

          {/* Interactive Unlock Panel */}
          <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              <span>Align The Keystone Dial:</span>
              <button
                type="button"
                onClick={() => setShowHint(prev => !prev)}
                className="flex items-center gap-1 text-amber-600 hover:text-amber-700 transition"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHint ? 'Hide Clue' : 'Examine Rune Clue'}
              </button>
            </div>

            {showHint && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Crypt Inscription Hint:</span> {chamber.hint}
                </div>
              </div>
            )}

            {/* Dial Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {chamber.interactiveData.choices.map((choice: string) => {
                const isSelected = selectedChoice === choice;
                return (
                  <button
                    key={choice}
                    onClick={() => handleSelectChoice(choice)}
                    className={`py-4 px-3 rounded-xl border-2 font-mono font-bold text-lg text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105'
                        : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {/* Unlock Button & Status */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              {statusMessage ? (
                <div className={`text-xs font-semibold ${statusMessage.isError ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {statusMessage.text}
                </div>
              ) : <div />}

              <button
                onClick={handleAttemptUnlock}
                disabled={!selectedChoice}
                className={`px-8 py-3 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2 ${
                  selectedChoice
                    ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer transform hover:scale-105'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Unlock className="w-4 h-4" />
                Turn Keystone Mechanism
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Victory Screen */
        <div className="py-12 text-center max-w-lg mx-auto space-y-5">
          <div className="w-20 h-20 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Temple Escaped! Master of Rationals!
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              You cracked all four sealed chambers with flawless mathematical logic: opposites, absolute value distances, zero pair transformations, and rational calculations!
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition"
          >
            Play Escape Room Again
          </button>
        </div>
      )}
    </div>
  );
};
