import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const RationalCalculator: React.FC = () => {
  const [calcType, setCalcType] = useState<'decimal' | 'fraction'>('decimal');

  // Decimal states
  const [decA, setDecA] = useState<string>('-4.8');
  const [decOp, setDecOp] = useState<'+' | '-'>('+');
  const [decB, setDecB] = useState<string>('1.35');

  // Fraction states
  const [fracNumA, setFracNumA] = useState<string>('-2');
  const [fracDenA, setFracDenA] = useState<string>('3');
  const [fracOp, setFracOp] = useState<'+' | '-'>('-');
  const [fracNumB, setFracNumB] = useState<string>('1');
  const [fracDenB, setFracDenB] = useState<string>('4');

  // Helper gcd
  const gcd = (a: number, b: number): number => {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  };

  // Helper lcm
  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  // Decimal calculation logic
  const numA = parseFloat(decA) || 0;
  const numB = parseFloat(decB) || 0;
  const decResult = decOp === '+' ? numA + numB : numA - numB;
  const decResultFormatted = Math.round(decResult * 1000) / 1000;

  // Fraction calculation logic
  const nA = parseInt(fracNumA, 10) || 0;
  const dA = parseInt(fracDenA, 10) || 1;
  const nB = parseInt(fracNumB, 10) || 0;
  const dB = parseInt(fracDenB, 10) || 1;

  const validFractions = dA !== 0 && dB !== 0;
  const commonDen = validFractions ? lcm(dA, dB) : 1;
  const scaleA = commonDen / dA;
  const scaleB = commonDen / dB;
  const scaledNumA = nA * scaleA;
  const scaledNumB = nB * scaleB;

  const combinedNum = fracOp === '+' ? scaledNumA + scaledNumB : scaledNumA - scaledNumB;
  const divisor = validFractions ? gcd(combinedNum, commonDen) : 1;
  const simplifiedNum = validFractions ? combinedNum / divisor : 0;
  const simplifiedDen = validFractions ? commonDen / divisor : 1;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Rational Step-by-Step Solver
            </h3>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
              Lesson 5 Manipulative
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Break down signed decimals and fractions into exact sign rules, place values, and common denominators.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => { setCalcType('decimal'); sounds.playClick(); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              calcType === 'decimal'
                ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            Signed Decimals
          </button>
          <button
            onClick={() => { setCalcType('fraction'); sounds.playClick(); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              calcType === 'fraction'
                ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            Signed Fractions
          </button>
        </div>
      </div>

      {calcType === 'decimal' ? (
        <div className="space-y-6 my-4">
          {/* Inputs */}
          <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">First Decimal</label>
              <input
                type="text"
                value={decA}
                onChange={(e) => setDecA(e.target.value)}
                className="w-28 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-center text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-5">
              <select
                value={decOp}
                onChange={(e) => { setDecOp(e.target.value as '+' | '-'); sounds.playClick(); }}
                className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
              >
                <option value="+">+</option>
                <option value="-">-</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Second Decimal</label>
              <input
                type="text"
                value={decB}
                onChange={(e) => setDecB(e.target.value)}
                className="w-28 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-center text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-5 text-slate-400 font-bold text-lg">=</div>

            <div className="pt-5">
              <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg font-mono font-bold text-lg text-emerald-700 dark:text-emerald-300">
                {decResultFormatted}
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Textbook Presets:</span>
            {[
              { label: '(-4.8) + 1.35', a: '-4.8', op: '+', b: '1.35' },
              { label: '(-3.75) + (-2.5)', a: '-3.75', op: '+', b: '-2.5' },
              { label: '(-2.6) - (-5.9)', a: '-2.6', op: '-', b: '-5.9' },
            ].map(p => (
              <button
                key={p.label}
                onClick={() => {
                  sounds.playClick();
                  setDecA(p.a);
                  setDecOp(p.op as '+' | '-');
                  setDecB(p.b);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md font-mono text-slate-700 dark:text-slate-300 transition"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Step-by-Step Breakdown */}
          <div className="p-4 bg-slate-900 text-slate-100 rounded-xl space-y-3 font-mono text-xs sm:text-sm">
            <div className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <Sparkles className="w-4 h-4" />
              Step-by-Step Mathematical Algorithm:
            </div>
            {decOp === '-' && (
              <div className="p-2 bg-slate-800 rounded border border-slate-700">
                <span className="text-sky-300 font-semibold font-sans">Step 1 (Keep, Change, Change):</span>
                <div>({numA}) - ({numB}) &rarr; ({numA}) + ({-numB})</div>
              </div>
            )}
            <div className="p-2 bg-slate-800 rounded border border-slate-700">
              <span className="text-sky-300 font-semibold font-sans">Step {decOp === '-' ? '2' : '1'} (Sign Analysis):</span>
              <div>
                First absolute value: |{numA}| = {Math.abs(numA)}
                <br />
                Second term absolute value: |{decOp === '-' ? -numB : numB}| = {Math.abs(decOp === '-' ? -numB : numB)}
              </div>
              <div className="mt-1 text-slate-300">
                {Math.sign(numA) === Math.sign(decOp === '-' ? -numB : numB) ? (
                  <span className="text-emerald-400 font-sans">Like signs! Sum the magnitudes and keep the shared sign.</span>
                ) : (
                  <span className="text-amber-300 font-sans">
                    Different signs! Subtract magnitudes: {Math.max(Math.abs(numA), Math.abs(decOp === '-' ? -numB : numB))} - {Math.min(Math.abs(numA), Math.abs(decOp === '-' ? -numB : numB))}. The result inherits the sign of the larger absolute value.
                  </span>
                )}
              </div>
            </div>
            <div className="p-2 bg-emerald-950/60 border border-emerald-700/60 rounded text-emerald-200">
              <span className="font-bold font-sans">Final Decimal Answer:</span> {decResultFormatted}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 my-4">
          {/* Fraction Inputs */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            {/* Frac A */}
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={fracNumA}
                onChange={(e) => setFracNumA(e.target.value)}
                className="w-16 px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono font-bold text-center text-slate-900 dark:text-white"
              />
              <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-600 my-1" />
              <input
                type="text"
                value={fracDenA}
                onChange={(e) => setFracDenA(e.target.value)}
                className="w-16 px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono font-bold text-center text-slate-900 dark:text-white"
              />
            </div>

            {/* Op */}
            <div>
              <select
                value={fracOp}
                onChange={(e) => { setFracOp(e.target.value as '+' | '-'); sounds.playClick(); }}
                className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
              >
                <option value="+">+</option>
                <option value="-">-</option>
              </select>
            </div>

            {/* Frac B */}
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={fracNumB}
                onChange={(e) => setFracNumB(e.target.value)}
                className="w-16 px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono font-bold text-center text-slate-900 dark:text-white"
              />
              <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-600 my-1" />
              <input
                type="text"
                value={fracDenB}
                onChange={(e) => setFracDenB(e.target.value)}
                className="w-16 px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono font-bold text-center text-slate-900 dark:text-white"
              />
            </div>

            <div className="text-slate-400 font-bold text-lg">=</div>

            {/* Result */}
            <div className="flex flex-col items-center p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg font-mono font-bold text-emerald-700 dark:text-emerald-300">
              <div>{simplifiedNum}</div>
              {simplifiedDen !== 1 && simplifiedNum !== 0 && (
                <>
                  <div className="w-12 h-0.5 bg-emerald-500 my-1" />
                  <div>{simplifiedDen}</div>
                </>
              )}
            </div>
          </div>

          {/* Presets */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Textbook Presets:</span>
            {[
              { label: '(-2/3) + (-1/4)', na: '-2', da: '3', op: '+', nb: '-1', db: '4' },
              { label: '(-5/6) - (-1/3)', na: '-5', da: '6', op: '-', nb: '-1', db: '3' },
              { label: '(-1/2) - 1/4', na: '-1', da: '2', op: '-', nb: '1', db: '4' },
            ].map(p => (
              <button
                key={p.label}
                onClick={() => {
                  sounds.playClick();
                  setFracNumA(p.na);
                  setFracDenA(p.da);
                  setFracOp(p.op as '+' | '-');
                  setFracNumB(p.nb);
                  setFracDenB(p.db);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md font-mono text-slate-700 dark:text-slate-300 transition"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Breakdown */}
          <div className="p-4 bg-slate-900 text-slate-100 rounded-xl space-y-3 font-mono text-xs sm:text-sm">
            <div className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <Sparkles className="w-4 h-4" />
              Fraction Calculation Steps:
            </div>
            <div className="p-2 bg-slate-800 rounded border border-slate-700">
              <span className="text-sky-300 font-semibold font-sans">1. Find Least Common Denominator (LCD):</span>
              <div>LCD of {dA} and {dB} is <span className="text-emerald-400 font-bold">{commonDen}</span></div>
            </div>
            <div className="p-2 bg-slate-800 rounded border border-slate-700">
              <span className="text-sky-300 font-semibold font-sans">2. Convert Numerators:</span>
              <div>
                ({nA}/{dA}) &rarr; ({scaledNumA}/{commonDen})
                <br />
                ({nB}/{dB}) &rarr; ({scaledNumB}/{commonDen})
              </div>
            </div>
            <div className="p-2 bg-slate-800 rounded border border-slate-700">
              <span className="text-sky-300 font-semibold font-sans">3. Apply Integer Arithmetic to Numerators:</span>
              <div>
                ({scaledNumA}) {fracOp} ({scaledNumB}) = <span className="text-amber-300 font-bold">{combinedNum}</span>
              </div>
            </div>
            <div className="p-2 bg-emerald-950/60 border border-emerald-700/60 rounded text-emerald-200">
              <span className="font-bold font-sans">4. Simplified Rational Result:</span>
              <div>
                {simplifiedNum} {simplifiedDen !== 1 && simplifiedNum !== 0 ? `/ ${simplifiedDen}` : ''}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
