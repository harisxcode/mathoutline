import React, { useState } from 'react';
import { Compass, Sparkles, Calculator } from 'lucide-react';
import { ZeroPairSandbox } from './Manipulatives/ZeroPairSandbox';
import { NumberLineExplorer } from './Manipulatives/NumberLineExplorer';
import { RationalCalculator } from './Manipulatives/RationalCalculator';
import { sounds } from '../utils/audio';

type ManipulativeId = 'counter' | 'number-line' | 'rational';

export const ManipulativesHub: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ManipulativeId>('counter');

  const tools = [
    {
      id: 'counter' as ManipulativeId,
      name: 'Zero Pair Counter Lab',
      icon: Sparkles,
      desc: 'Two-color positive (+1 yellow) and negative (-1 red) chip manipulative with neutralization pairing.'
    },
    {
      id: 'number-line' as ManipulativeId,
      name: 'Vector Number Line',
      icon: Compass,
      desc: 'Animated directional jump arrows for adding & subtracting signed integers, with Thermometer & Elevation modes.'
    },
    {
      id: 'rational' as ManipulativeId,
      name: 'Rational Number Solver',
      icon: Calculator,
      desc: 'Step-by-step breakdown of signed decimal and fraction operations with LCD calculations and sign rules.'
    }
  ];

  const handleSelectTool = (id: ManipulativeId) => {
    sounds.playClick();
    setActiveTool(id);
  };

  return (
    <div className="space-y-6">
      {/* Tool Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tools.map((t) => {
          const Icon = t.icon;
          const isSelected = activeTool === t.id;

          return (
            <button
              key={t.id}
              onClick={() => handleSelectTool(t.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400 dark:text-amber-600' : 'text-indigo-500'}`} />
                <span className="font-bold text-sm">{t.name}</span>
              </div>
              <p className={`text-xs leading-relaxed ${isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                {t.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Manipulative Canvas */}
      <div>
        {activeTool === 'counter' && <ZeroPairSandbox />}
        {activeTool === 'number-line' && <NumberLineExplorer />}
        {activeTool === 'rational' && <RationalCalculator />}
      </div>
    </div>
  );
};
