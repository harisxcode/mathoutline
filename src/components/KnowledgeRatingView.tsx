import React from 'react';
import { Award, CheckCircle, Star, Compass, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

interface KnowledgeRatingViewProps {
  ratings: Record<string, number>;
  onUpdateRating: (goalId: string, level: number) => void;
  completedLessons: string[];
  masteredFlashcardsCount: number;
}

const RATING_GOALS = [
  { id: 'g1', title: 'Representing Positive & Negative Integers in Real Life', lesson: 'Lesson 1' },
  { id: 'g2', title: 'Modeling Opposites and Additive Inverses (Sum = 0)', lesson: 'Lesson 1' },
  { id: 'g3', title: 'Finding Absolute Value |x| as Distance from Zero', lesson: 'Lesson 2' },
  { id: 'g4', title: 'Adding Integers with the Same Sign', lesson: 'Lesson 2' },
  { id: 'g5', title: 'Adding Integers with Different Signs (Stronger Absolute Value)', lesson: 'Lesson 2' },
  { id: 'g6', title: 'Grouping Opposites & Multi-Term Commutative Strategies', lesson: 'Lesson 3' },
  { id: 'g7', title: 'Explaining What a Zero Pair Is to a Classmate', lesson: 'Lesson 4' },
  { id: 'g8', title: 'Subtracting Integers by Adding the Opposite (Keep, Change, Change)', lesson: 'Lesson 4' },
  { id: 'g9', title: 'Adding and Subtracting Signed Decimals (Place Value)', lesson: 'Lesson 5' },
  { id: 'g10', title: 'Adding and Subtracting Signed Fractions (Common Denominators)', lesson: 'Lesson 5' }
];

export const KnowledgeRatingView: React.FC<KnowledgeRatingViewProps> = ({
  ratings,
  onUpdateRating,
  completedLessons,
  masteredFlashcardsCount
}) => {
  const getRating = (id: string) => ratings[id] || 2;

  const totalPoints = RATING_GOALS.reduce((acc, g) => acc + getRating(g.id), 0);
  const maxPoints = RATING_GOALS.length * 4;
  const masteryPercentage = Math.round((totalPoints / maxPoints) * 100);

  const handleRate = (goalId: string, val: number) => {
    sounds.playClick();
    onUpdateRating(goalId, val);
  };

  const scaleDescriptions = [
    { level: 1, label: '1 - Beginning', desc: "I don't understand yet. I need direct instruction and lots of help." },
    { level: 2, label: '2 - Developing', desc: "I understand parts of it, but need counter models or help on complex signs." },
    { level: 3, label: '3 - Proficient', desc: "I understand and can solve integer & rational problems independently." },
    { level: 4, label: '4 - Advanced', desc: "I have mastered this completely and could explain and teach it to a classmate!" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-2xl p-6 md:p-8 text-white shadow-sm space-y-3">
        <div className="text-xs uppercase font-extrabold tracking-widest text-amber-200">
          Carnegie Learning &bull; Topic 1 Self-Assessment
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-white">
          Knowledge Rating Scale &bull; "I CAN" Standard
        </h2>
        <div className="p-3 bg-white/10 rounded-xl border border-white/20 text-sm font-semibold max-w-2xl">
          Core Focus: "I CAN add and subtract rational numbers."
        </div>
      </div>

      {/* Progress & Rating Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Rating Checklist (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Student Self-Assessment Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Rate your confidence on each topic from 1 (Beginning) to 4 (Can Teach a Classmate!).
            </p>
          </div>

          <div className="space-y-3">
            {RATING_GOALS.map((g, idx) => {
              const currentScore = getRating(g.id);

              return (
                <div
                  key={g.id}
                  className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase text-indigo-600 dark:text-indigo-400">
                      {g.lesson} &bull; Goal #{idx + 1}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {g.title}
                    </div>
                  </div>

                  {/* 1-4 Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {[1, 2, 3, 4].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleRate(g.id, level)}
                        className={`w-9 h-9 rounded-lg font-mono font-bold text-xs transition ${
                          currentScore === level
                            ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 shadow-sm scale-105'
                            : 'bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                        }`}
                        title={scaleDescriptions[level - 1].desc}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scale Legend & Badges (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Rating Scale Legend */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Rating Scale Rubric
            </h4>
            <div className="space-y-2.5">
              {scaleDescriptions.map(s => (
                <div key={s.level} className="text-xs space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white">
                    {s.label}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 leading-snug">
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mastery Snapshot */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Curriculum Mastery Snapshot
            </h4>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Overall Topic Index</span>
                <span className="font-mono font-bold text-amber-400">{masteryPercentage}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${masteryPercentage}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Lessons Completed:</span>
                <span className="font-bold text-white">{completedLessons.length} / 5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Flashcards Mastered:</span>
                <span className="font-bold text-white">{masteredFlashcardsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
