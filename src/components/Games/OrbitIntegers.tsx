import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Rocket, Trophy, Zap, RotateCcw, Flame, CheckCircle, XCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface Question {
  text: string;
  options: number[];
  answer: number;
}

const generateProblem = (difficulty: 'normal' | 'fast'): Question => {
  const types = ['add-like', 'add-diff', 'sub-pos', 'sub-neg', 'multi'];
  const type = types[Math.floor(Math.random() * types.length)];
  let a = 0, b = 0, ans = 0, text = '';

  if (type === 'add-like') {
    // Both negative
    a = -(Math.floor(Math.random() * 12) + 1);
    b = -(Math.floor(Math.random() * 12) + 1);
    ans = a + b;
    text = `(${a}) + (${b})`;
  } else if (type === 'add-diff') {
    // One positive, one negative
    a = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 15) + 2);
    b = (a > 0 ? -1 : 1) * (Math.floor(Math.random() * 15) + 2);
    ans = a + b;
    text = `(${a}) + (${b})`;
  } else if (type === 'sub-pos') {
    // a - b
    a = Math.floor(Math.random() * 20) - 10;
    b = Math.floor(Math.random() * 12) + 1;
    ans = a - b;
    text = `${a} - ${b}`;
  } else if (type === 'sub-neg') {
    // a - (-b)
    a = Math.floor(Math.random() * 20) - 10;
    b = -(Math.floor(Math.random() * 12) + 1);
    ans = a - b;
    text = `(${a}) - (${b})`;
  } else {
    // Multi
    a = -(Math.floor(Math.random() * 8) + 2);
    b = Math.floor(Math.random() * 12) + 3;
    ans = a + b;
    text = `(${a}) + ${b}`;
  }

  // Generate 4 unique options
  const optionsSet = new Set<number>([ans]);
  while (optionsSet.size < 4) {
    const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 6) + 1);
    optionsSet.add(ans + offset);
  }

  return {
    text,
    answer: ans,
    options: Array.from(optionsSet).sort(() => Math.random() - 0.5)
  };
};

export const OrbitIntegers: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<'start' | 'racing' | 'finished'>('start');
  const [currentProblem, setCurrentProblem] = useState<Question>(generateProblem('normal'));
  const [playerDistance, setPlayerDistance] = useState<number>(0);
  const [botDistances, setBotDistances] = useState<number[]>([0, 0, 0]);
  const [combo, setCombo] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streakMax, setStreakMax] = useState<number>(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const goalDistance = 100;

  // Bot movement simulation
  useEffect(() => {
    if (gameState !== 'racing') return;

    const interval = setInterval(() => {
      setBotDistances(prev => {
        const next = prev.map((d, idx) => {
          // bots move forward steadily with minor variance
          const speed = 1.2 + idx * 0.3 + (Math.random() * 0.8);
          return Math.min(goalDistance, d + speed);
        });

        // Check if any bot or player finished
        if (next.some(d => d >= goalDistance)) {
          // if player hasn't reached 100 yet, check finish
          if (playerDistance >= goalDistance) {
            handleFinish(true);
          } else if (next[2] >= goalDistance) { // if fastest bot finishes
            handleFinish(false);
          }
        }
        return next;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [gameState, playerDistance]);

  const handleAnswer = (selected: number) => {
    if (gameState !== 'racing') return;

    if (selected === currentProblem.answer) {
      sounds.playCorrect();
      sounds.playBooster();
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > streakMax) setStreakMax(newCombo);

      const boost = 9 + Math.min(newCombo * 1.5, 9);
      const newDistance = Math.min(goalDistance, playerDistance + boost);
      setPlayerDistance(newDistance);
      setScore(prev => prev + 100 + newCombo * 25);
      setFeedback('correct');

      if (newDistance >= goalDistance) {
        handleFinish(true);
        return;
      }
    } else {
      sounds.playIncorrect();
      setCombo(0);
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentProblem(generateProblem('normal'));
    }, 350);
  };

  const handleFinish = (playerWon: boolean) => {
    setGameState('finished');
    if (playerWon) {
      sounds.playVictory();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
    if (onComplete) onComplete(score);
  };

  const startGame = () => {
    sounds.playClick();
    setPlayerDistance(0);
    setBotDistances([0, 0, 0]);
    setCombo(0);
    setScore(0);
    setStreakMax(0);
    setCurrentProblem(generateProblem('normal'));
    setGameState('racing');
  };

  const bots = [
    { name: 'Comet Cruiser', color: 'bg-amber-400', textColor: 'text-amber-400' },
    { name: 'Astro Falcon', color: 'bg-emerald-400', textColor: 'text-emerald-400' },
    { name: 'Nebula Dart', color: 'bg-purple-400', textColor: 'text-purple-400' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-indigo-500" />
              Orbit Integers: High-Speed Race
            </h3>
            <span className="text-xs text-indigo-700 dark:text-indigo-300 font-medium bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
              Curriculum Game Break
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Solve integer addition and subtraction equations fast to propel your starship past the rivals to the finish line!
          </p>
        </div>

        {gameState === 'racing' && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-400">Score</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">{score}</div>
            </div>
            {combo > 1 && (
              <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white rounded-md text-xs font-bold animate-pulse">
                <Flame className="w-3.5 h-3.5" />
                {combo}x Combo!
              </div>
            )}
          </div>
        )}
      </div>

      {gameState === 'start' && (
        <div className="py-12 text-center max-w-lg mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Rocket className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Ready for Orbit?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Race against 3 automated rival starships. Each correct signed integer answer triggers a hyperdrive boost! Consecutive correct answers trigger Combo Multipliers.
            </p>
          </div>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition transform hover:scale-105"
          >
            Launch Starship Race
          </button>
        </div>
      )}

      {gameState === 'racing' && (
        <div className="space-y-6 my-4">
          {/* Race Track */}
          <div className="p-4 bg-slate-950 rounded-xl space-y-3.5 border border-slate-800">
            {/* Player lane */}
            <div>
              <div className="flex justify-between text-xs text-indigo-300 font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-indigo-400" />
                  Your Starship (Player)
                </span>
                <span className="font-mono">{Math.round(playerDistance)}%</span>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full transition-all duration-300 relative"
                  style={{ width: `${Math.min(100, playerDistance)}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-ping opacity-75" />
                </div>
              </div>
            </div>

            {/* Bots lanes */}
            {bots.map((bot, idx) => (
              <div key={bot.name}>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>{bot.name}</span>
                  <span className="font-mono">{Math.round(botDistances[idx])}%</span>
                </div>
                <div className="h-2.5 bg-slate-800/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${bot.color} rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min(100, botDistances[idx])}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Math Problem Card */}
          <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center relative">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">
              Solve to Boost:
            </div>
            <div className="text-4xl font-bold font-mono text-slate-900 dark:text-white py-2">
              {currentProblem.text} = ?
            </div>

            {feedback && (
              <div className={`mt-2 text-sm font-bold flex items-center justify-center gap-1 ${
                feedback === 'correct' ? 'text-emerald-500' : 'text-rose-500'
              }`}>
                {feedback === 'correct' ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Hyper-boost Engaged! (+{combo}x)
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" /> Speed stalled! Check your sign rules.
                  </>
                )}
              </div>
            )}

            {/* Option Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {currentProblem.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="py-3 px-4 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-900 dark:text-slate-100 font-mono font-bold text-xl rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition shadow-xs active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="py-10 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
              {playerDistance >= goalDistance ? '1st Place Victory!' : 'Race Completed!'}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Final Score: <span className="font-bold text-indigo-600">{score}</span> · Max Streak: <span className="font-bold text-amber-600">{streakMax}</span>
            </p>
          </div>
          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition"
          >
            Race Again
          </button>
        </div>
      )}
    </div>
  );
};
