import React, { useState } from 'react';
import { Plus, Minus, Trash2, Sparkles, HelpCircle, CheckCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface Counter {
  id: string;
  type: 'positive' | 'negative';
  pairedWith?: string;
}

export const ZeroPairSandbox: React.FC = () => {
  const [counters, setCounters] = useState<Counter[]>([
    { id: 'p1', type: 'positive' },
    { id: 'p2', type: 'positive' },
    { id: 'p3', type: 'positive' },
    { id: 'n1', type: 'negative' },
    { id: 'n2', type: 'negative' },
  ]);
  const [pairedMode, setPairedMode] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>('3 + (-2)');

  const positiveCount = counters.filter(c => c.type === 'positive').length;
  const negativeCount = counters.filter(c => c.type === 'negative').length;
  const zeroPairsPossible = Math.min(positiveCount, negativeCount);
  const netValue = positiveCount - negativeCount;

  const addPositive = () => {
    sounds.playClick();
    setCounters(prev => [...prev, { id: 'p-' + Math.random().toString(36).substr(2, 6), type: 'positive' }]);
    setPairedMode(false);
  };

  const addNegative = () => {
    sounds.playClick();
    setCounters(prev => [...prev, { id: 'n-' + Math.random().toString(36).substr(2, 6), type: 'negative' }]);
    setPairedMode(false);
  };

  const addZeroPair = () => {
    sounds.playBooster();
    const pId = 'p-' + Math.random().toString(36).substr(2, 6);
    const nId = 'n-' + Math.random().toString(36).substr(2, 6);
    setCounters(prev => [
      ...prev,
      { id: pId, type: 'positive' },
      { id: nId, type: 'negative' }
    ]);
  };

  const removeCounter = (id: string) => {
    sounds.playClick();
    setCounters(prev => prev.filter(c => c.id !== id));
  };

  const handlePairUp = () => {
    sounds.playZeroPairNeutralize();
    setPairedMode(true);
  };

  const handleClear = () => {
    sounds.playClick();
    setCounters([]);
    setPairedMode(false);
  };

  const loadPreset = (preset: string) => {
    sounds.playClick();
    setActivePreset(preset);
    setPairedMode(false);
    if (preset === '4 + (-6)') {
      setCounters([
        { id: 'p1', type: 'positive' },
        { id: 'p2', type: 'positive' },
        { id: 'p3', type: 'positive' },
        { id: 'p4', type: 'positive' },
        { id: 'n1', type: 'negative' },
        { id: 'n2', type: 'negative' },
        { id: 'n3', type: 'negative' },
        { id: 'n4', type: 'negative' },
        { id: 'n5', type: 'negative' },
        { id: 'n6', type: 'negative' }
      ]);
    } else if (preset === '3 - 5 (Need Zero Pairs!)') {
      // 3 positive + 2 zero pairs to take away 5
      setCounters([
        { id: 'p1', type: 'positive' },
        { id: 'p2', type: 'positive' },
        { id: 'p3', type: 'positive' },
        { id: 'p4', type: 'positive' },
        { id: 'p5', type: 'positive' },
        { id: 'n1', type: 'negative' },
        { id: 'n2', type: 'negative' }
      ]);
    } else if (preset === '(-5) + (-3)') {
      setCounters([
        { id: 'n1', type: 'negative' },
        { id: 'n2', type: 'negative' },
        { id: 'n3', type: 'negative' },
        { id: 'n4', type: 'negative' },
        { id: 'n5', type: 'negative' },
        { id: 'n6', type: 'negative' },
        { id: 'n7', type: 'negative' },
        { id: 'n8', type: 'negative' }
      ]);
    } else {
      setCounters([
        { id: 'p1', type: 'positive' },
        { id: 'p2', type: 'positive' },
        { id: 'p3', type: 'positive' },
        { id: 'n1', type: 'negative' },
        { id: 'n2', type: 'negative' }
      ]);
    }
  };

  const positives = counters.filter(c => c.type === 'positive');
  const negatives = counters.filter(c => c.type === 'negative');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Two-Color Counter &amp; Zero Pair Lab
            </h3>
            <span className="text-xs text-amber-700 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
              Lesson 1 &amp; 4 Manipulative
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Yellow counters represent <span className="font-semibold text-amber-600">+1</span>. Red counters represent <span className="font-semibold text-rose-600">-1</span>. Pair them to neutralize zero pairs!
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-medium text-slate-500 mr-1">Presets:</span>
          {['3 + (-2)', '4 + (-6)', '3 - 5 (Need Zero Pairs!)', '(-5) + (-3)'].map(p => (
            <button
              key={p}
              onClick={() => loadPreset(p)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                activePreset === p
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Control Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <button
          onClick={addPositive}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 dark:bg-amber-950/30 dark:border-amber-700/50 dark:text-amber-200 rounded-lg text-sm font-semibold transition"
        >
          <div className="w-5 h-5 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-xs font-bold text-amber-950">
            +
          </div>
          Add Yellow (+1)
        </button>

        <button
          onClick={addNegative}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-900 dark:bg-rose-950/30 dark:border-rose-700/50 dark:text-rose-200 rounded-lg text-sm font-semibold transition"
        >
          <div className="w-5 h-5 rounded-full bg-rose-500 border border-rose-600 flex items-center justify-center text-xs font-bold text-white">
            -
          </div>
          Add Red (-1)
        </button>

        <button
          onClick={addZeroPair}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-900 dark:bg-purple-950/30 dark:border-purple-700/50 dark:text-purple-200 rounded-lg text-sm font-semibold transition"
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          Add Zero Pair (Net 0)
        </button>

        <button
          onClick={handlePairUp}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-700/50 dark:text-emerald-200 rounded-lg text-sm font-semibold transition"
        >
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Pair Up Zero Pairs
        </button>
      </div>

      {/* Counter Workspace Board */}
      <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-5 border border-slate-200 dark:border-slate-800 min-h-[220px] relative">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">
            Click any counter to remove it. Total Counters: <span className="font-semibold">{counters.length}</span>
          </div>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Board
          </button>
        </div>

        {counters.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-36 text-slate-400 text-sm">
            <p>The board is empty. Add yellow or red counters above to begin modeling!</p>
          </div>
        ) : !pairedMode ? (
          /* Freeform Grid */
          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-3 items-center">
            {counters.map((c) => (
              <button
                key={c.id}
                onClick={() => removeCounter(c.id)}
                title="Click to remove counter"
                className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base transition-all transform hover:scale-110 shadow-sm ${
                  c.type === 'positive'
                    ? 'bg-amber-400 border-2 border-amber-500 text-amber-950 hover:border-amber-600'
                    : 'bg-rose-500 border-2 border-rose-600 text-white hover:border-rose-700'
                }`}
              >
                {c.type === 'positive' ? '+1' : '-1'}
              </button>
            ))}
          </div>
        ) : (
          /* Paired Mode Grouping */
          <div className="space-y-6">
            {zeroPairsPossible > 0 && (
              <div>
                <div className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Neutralized Zero Pairs ({zeroPairsPossible} pairs = 0 net sum)
                </div>
                <div className="flex flex-wrap gap-3 p-3 bg-purple-50/70 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800/40">
                  {Array.from({ length: zeroPairsPossible }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 rounded-full border border-purple-300 dark:border-purple-700 shadow-xs"
                    >
                      <div className="w-9 h-9 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center font-bold text-xs text-amber-950">
                        +1
                      </div>
                      <span className="text-xs text-slate-400 font-bold">+</span>
                      <div className="w-9 h-9 rounded-full bg-rose-500 border border-rose-600 flex items-center justify-center font-bold text-xs text-white">
                        -1
                      </div>
                      <span className="text-xs text-purple-600 font-bold px-1">= 0</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Remaining Unpaired Counters (The Net Answer)
              </div>
              <div className="flex flex-wrap gap-2.5 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                {positiveCount > negativeCount ? (
                  positives.slice(zeroPairsPossible).map(c => (
                    <div
                      key={c.id}
                      className="w-10 h-10 rounded-full bg-amber-400 border-2 border-amber-500 flex items-center justify-center font-bold text-sm text-amber-950 shadow-sm"
                    >
                      +1
                    </div>
                  ))
                ) : negativeCount > positiveCount ? (
                  negatives.slice(zeroPairsPossible).map(c => (
                    <div
                      key={c.id}
                      className="w-10 h-10 rounded-full bg-rose-500 border-2 border-rose-600 flex items-center justify-center font-bold text-sm text-white shadow-sm"
                    >
                      -1
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-emerald-600 font-medium py-1">
                    All counters neutralized into zero pairs! Final Sum = 0.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Equation Bar */}
      <div className="mt-4 p-4 bg-slate-900 text-white dark:bg-slate-950 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Positive</div>
            <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">+{positiveCount}</div>
          </div>
          <span className="text-xl text-slate-500 font-bold">+</span>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Negative</div>
            <div className="text-xl font-bold font-mono text-rose-400 tabular-nums">-{negativeCount}</div>
          </div>
          <span className="text-xl text-slate-500 font-bold">=</span>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Net Value</div>
            <div className={`text-2xl font-bold font-mono tabular-nums ${
              netValue > 0 ? 'text-amber-400' : netValue < 0 ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {netValue > 0 ? `+${netValue}` : netValue}
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-300 max-w-sm text-right bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
          <span className="font-semibold text-white">Rule in Action:</span> {
            positiveCount === 0 && negativeCount === 0
              ? 'Add counters to see the mathematical deduction.'
              : positiveCount === negativeCount
              ? 'Exact opposites cancel each other out to zero.'
              : positiveCount > negativeCount
              ? `Positive dominates by ${positiveCount - negativeCount} counter(s). Result is positive.`
              : `Negative dominates by ${negativeCount - positiveCount} counter(s). Result is negative.`
          }
        </div>
      </div>
    </div>
  );
};
