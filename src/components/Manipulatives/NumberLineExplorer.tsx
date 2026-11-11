import React, { useState } from 'react';
import { ArrowRight, Compass, Thermometer, Mountain, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/audio';

type Mode = 'number-line' | 'thermometer' | 'elevation';

export const NumberLineExplorer: React.FC = () => {
  const [startVal, setStartVal] = useState<number>(-3);
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const [secondVal, setSecondVal] = useState<number>(7);
  const [viewMode, setViewMode] = useState<Mode>('number-line');

  // Compute final result
  const result = operation === '+' ? startVal + secondVal : startVal - secondVal;

  // Keep Change Change representation
  const kccOperation = '+';
  const kccSecondVal = -secondVal;

  const minTick = -12;
  const maxTick = 12;
  const totalSpan = maxTick - minTick;

  // Percentage on number line: minTick -> 0%, maxTick -> 100%
  const getPercent = (val: number) => {
    const clamped = Math.max(minTick, Math.min(maxTick, val));
    return ((clamped - minTick) / totalSpan) * 100;
  };

  const handleStartChange = (val: number) => {
    sounds.playClick();
    setStartVal(val);
  };

  const handleSecondChange = (val: number) => {
    sounds.playClick();
    setSecondVal(val);
  };

  const handleReset = () => {
    sounds.playClick();
    setStartVal(0);
    setOperation('+');
    setSecondVal(5);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Interactive Vector Number Line
            </h3>
            <span className="text-xs text-sky-700 dark:text-sky-400 font-medium bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded">
              Lessons 1, 2, 3 &amp; 4
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Watch directional vectors hop across the line. Positive hops move <span className="text-emerald-600 font-semibold">RIGHT</span>, negative hops move <span className="text-rose-600 font-semibold">LEFT</span>.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => { setViewMode('number-line'); sounds.playClick(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              viewMode === 'number-line'
                ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Standard Line
          </button>
          <button
            onClick={() => { setViewMode('thermometer'); sounds.playClick(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              viewMode === 'thermometer'
                ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            Temperature (°F)
          </button>
          <button
            onClick={() => { setViewMode('elevation'); sounds.playClick(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              viewMode === 'elevation'
                ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <Mountain className="w-3.5 h-3.5" />
            Elevation (Sea Level)
          </button>
        </div>
      </div>

      {/* Interactive Sliders and Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Start Position (a): <span className="text-slate-900 dark:text-white font-mono text-base font-bold">{startVal}</span>
          </label>
          <input
            type="range"
            min={-10}
            max={10}
            step={1}
            value={startVal}
            onChange={(e) => handleStartChange(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
            <span>-10</span>
            <span>0</span>
            <span>+10</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Operation
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setOperation('+'); sounds.playClick(); }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-bold border transition ${
                operation === '+'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              + Addition
            </button>
            <button
              onClick={() => { setOperation('-'); sounds.playClick(); }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-bold border transition ${
                operation === '-'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              - Subtraction
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Second Value (b): <span className="text-slate-900 dark:text-white font-mono text-base font-bold">{secondVal}</span>
          </label>
          <input
            type="range"
            min={-10}
            max={10}
            step={1}
            value={secondVal}
            onChange={(e) => handleSecondChange(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
            <span>-10</span>
            <span>0</span>
            <span>+10</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas for Vector Number Line */}
      <div className="my-6 p-4 bg-slate-900 text-white rounded-xl shadow-inner relative overflow-hidden">
        {/* Context Badge */}
        <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
          <span>
            {viewMode === 'number-line' && 'Cartesian Coordinate 1D Line'}
            {viewMode === 'thermometer' && 'Mercury Thermometer Scale (°F)'}
            {viewMode === 'elevation' && 'Topographic Altitude Reference (0 = Sea Level)'}
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Vector SVG */}
        <div className="py-8 px-4 relative">
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 1000 120" preserveAspectRatio="none">
            {/* Main Axis Line */}
            <line x1="20" y1="80" x2="980" y2="80" stroke="#475569" strokeWidth="3" />
            <polygon points="15,80 25,75 25,85" fill="#475569" />
            <polygon points="985,80 975,75 975,85" fill="#475569" />

            {/* Zero Axis Marker */}
            {(() => {
              const zeroX = 20 + (getPercent(0) / 100) * 960;
              return (
                <g>
                  <line x1={zeroX} y1="65" x2={zeroX} y2="95" stroke="#38bdf8" strokeWidth="4" />
                  <text x={zeroX} y="112" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
                    0
                  </text>
                </g>
              );
            })()}

            {/* Ticks */}
            {Array.from({ length: totalSpan + 1 }).map((_, i) => {
              const tickVal = minTick + i;
              if (tickVal === 0) return null;
              const tickX = 20 + (getPercent(tickVal) / 100) * 960;
              const isMajor = tickVal % 2 === 0;
              return (
                <g key={tickVal}>
                  <line
                    x1={tickX}
                    y1={isMajor ? 72 : 76}
                    x2={tickX}
                    y2={isMajor ? 88 : 84}
                    stroke={isMajor ? '#94a3b8' : '#64748b'}
                    strokeWidth={isMajor ? '2' : '1'}
                  />
                  {isMajor && (
                    <text x={tickX} y="108" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      {tickVal}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Vector 1: 0 to startVal */}
            {startVal !== 0 && (() => {
              const zeroX = 20 + (getPercent(0) / 100) * 960;
              const startX = 20 + (getPercent(startVal) / 100) * 960;
              const yPos = 48;
              return (
                <g>
                  <line
                    x1={zeroX}
                    y1={yPos}
                    x2={startX}
                    y2={yPos}
                    stroke="#38bdf8"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                  />
                  <circle cx={zeroX} cy={yPos} r="4" fill="#38bdf8" />
                  <circle cx={startX} cy={yPos} r="5" fill="#38bdf8" />
                  <text
                    x={(zeroX + startX) / 2}
                    y={yPos - 8}
                    fill="#38bdf8"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Start: {startVal}
                  </text>
                </g>
              );
            })()}

            {/* Vector 2: startVal to result */}
            {(() => {
              const startX = 20 + (getPercent(startVal) / 100) * 960;
              const resultX = 20 + (getPercent(result) / 100) * 960;
              const yPos = 24;
              const isRight = resultX >= startX;
              const arrowColor = isRight ? '#10b981' : '#f43f5e';
              return (
                <g>
                  <line
                    x1={startX}
                    y1={yPos}
                    x2={resultX}
                    y2={yPos}
                    stroke={arrowColor}
                    strokeWidth="4"
                  />
                  <circle cx={startX} cy={yPos} r="4" fill={arrowColor} />
                  {/* Arrowhead */}
                  <polygon
                    points={
                      isRight
                        ? `${resultX},${yPos} ${resultX - 10},${yPos - 5} ${resultX - 10},${yPos + 5}`
                        : `${resultX},${yPos} ${resultX + 10},${yPos - 5} ${resultX + 10},${yPos + 5}`
                    }
                    fill={arrowColor}
                  />
                  <text
                    x={(startX + resultX) / 2}
                    y={yPos - 8}
                    fill={arrowColor}
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {operation} ({secondVal}) &rarr; {isRight ? 'Move Right' : 'Move Left'}
                  </text>

                  {/* Landing Pin */}
                  <line
                    x1={resultX}
                    y1={yPos}
                    x2={resultX}
                    y2={80}
                    stroke={arrowColor}
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                  <circle cx={resultX} cy={80} r="7" fill={arrowColor} stroke="#ffffff" strokeWidth="2" />
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Dynamic Readout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 pt-4 border-t border-slate-800">
          <div className="text-center sm:text-left">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Mathematical Equation</div>
            <div className="text-2xl font-mono font-bold text-white mt-1 tabular-nums">
              ({startVal}) {operation} ({secondVal}) = <span className="text-emerald-400">{result}</span>
            </div>
          </div>

          {operation === '-' && (
            <div className="bg-indigo-950/70 border border-indigo-700/60 p-2.5 rounded-lg text-xs text-indigo-200">
              <span className="font-bold text-amber-300">Keep, Change, Change Rule:</span>
              <div className="font-mono mt-0.5">
                ({startVal}) - ({secondVal}) &hArr; ({startVal}) + ({kccSecondVal}) = {result}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Real-World Context Insight Box */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-sm">
        <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
          <span className="text-sky-600 font-mono text-base">&bull;</span>
          Real-World Translation:
        </h4>
        <p className="text-slate-600 dark:text-slate-300">
          {viewMode === 'thermometer' ? (
            <>
              Starting temperature was <span className="font-semibold text-slate-900 dark:text-white">{startVal}°F</span>.
              {operation === '+' ? (
                secondVal >= 0 ? ` It warmed up by ${secondVal}°F.` : ` The temperature dropped by ${Math.abs(secondVal)}°F.`
              ) : (
                secondVal >= 0 ? ` Taking away ${secondVal}°F cools the system down.` : ` Subtracting a drop of ${Math.abs(secondVal)}°F is equivalent to warming up!`
              )}
              {' '}The final thermometer reading is <span className="font-bold text-emerald-600 dark:text-emerald-400">{result}°F</span>.
            </>
          ) : viewMode === 'elevation' ? (
            <>
              An expedition begins at <span className="font-semibold text-slate-900 dark:text-white">{startVal} ft</span> {startVal < 0 ? 'below sea level' : 'altitude'}.
              They travel {operation === '+' ? (secondVal >= 0 ? `upward by ${secondVal} ft` : `downward by ${Math.abs(secondVal)} ft`) : `with a difference of ${secondVal} ft`}.
              Final elevation: <span className="font-bold text-emerald-600 dark:text-emerald-400">{result} ft</span>.
            </>
          ) : (
            <>
              Starting at <span className="font-semibold text-slate-900 dark:text-white">{startVal}</span> on the number line. Moving {result >= startVal ? 'right' : 'left'} by <span className="font-semibold text-slate-900 dark:text-white">{Math.abs(result - startVal)} units</span> places you precisely at <span className="font-bold text-emerald-600 dark:text-emerald-400">{result}</span>.
            </>
          )}
        </p>
      </div>
    </div>
  );
};
