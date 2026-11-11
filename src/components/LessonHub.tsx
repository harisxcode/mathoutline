import React, { useState } from 'react';
import { BookOpen, CheckCircle, HelpCircle, Sparkles, Key, Compass, Award, ArrowRight, Eye } from 'lucide-react';
import { LESSONS_DATA } from '../data/curriculumData';
import { LessonContent, LessonId } from '../types/curriculum';
import { ZeroPairSandbox } from './Manipulatives/ZeroPairSandbox';
import { NumberLineExplorer } from './Manipulatives/NumberLineExplorer';
import { RationalCalculator } from './Manipulatives/RationalCalculator';
import { sounds } from '../utils/audio';

export const LessonHub: React.FC<{
  completedLessons: string[];
  onCompleteLesson: (lessonId: string) => void;
}> = ({ completedLessons, onCompleteLesson }) => {
  const [activeLessonId, setActiveLessonId] = useState<LessonId>('lesson-1');
  const [activeTab, setActiveTab] = useState<'reading' | 'sandbox' | 'practice' | 'key'>('reading');
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<string, number>>({});
  const [checkpointFeedback, setCheckpointFeedback] = useState<Record<string, boolean>>({});
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceRevealed, setPracticeRevealed] = useState<Record<string, boolean>>({});

  const lesson: LessonContent = LESSONS_DATA.find(l => l.id === activeLessonId) || LESSONS_DATA[0];
  const isLessonFinished = completedLessons.includes(lesson.id);

  const handleSelectLesson = (id: LessonId) => {
    sounds.playClick();
    setActiveLessonId(id);
    setActiveTab('reading');
  };

  const handleCheckpointSelect = (qIdx: number, optIdx: number, correctIdx: number) => {
    sounds.playClick();
    setCheckpointAnswers(prev => ({ ...prev, [`${lesson.id}-q-${qIdx}`]: optIdx }));
    const isCorrect = optIdx === correctIdx;
    if (isCorrect) sounds.playCorrect();
    else sounds.playIncorrect();
    setCheckpointFeedback(prev => ({ ...prev, [`${lesson.id}-q-${qIdx}`]: isCorrect }));
  };

  const handlePracticeSelect = (pId: string, ans: string, correctAns: string | number) => {
    sounds.playClick();
    setPracticeAnswers(prev => ({ ...prev, [pId]: ans }));
    setPracticeRevealed(prev => ({ ...prev, [pId]: true }));
    if (String(ans) === String(correctAns)) {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }
  };

  const handleFinishLesson = () => {
    sounds.playVictory();
    onCompleteLesson(lesson.id);
  };

  return (
    <div className="space-y-6">
      {/* Lesson Selector Ribbon */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {LESSONS_DATA.map(l => {
            const isSelected = l.id === activeLessonId;
            const isDone = completedLessons.includes(l.id);

            return (
              <button
                key={l.id}
                onClick={() => handleSelectLesson(l.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  isSelected
                    ? 'bg-white/20 text-white dark:bg-slate-900 dark:text-white'
                    : isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {isDone ? '✓' : l.lessonNumber}
                </span>
                <span>Lesson {l.lessonNumber}: {l.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-950 rounded-2xl p-6 md:p-8 text-white border border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Course 2 &bull; Module 2 &bull; Topic 1 &bull; Lesson {lesson.lessonNumber}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight mt-1 text-white">
              {lesson.title}
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              {lesson.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFinishLesson}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                isLessonFinished
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {isLessonFinished ? 'Completed!' : 'Mark Lesson Complete'}
            </button>
          </div>
        </div>

        {/* Private Eye Focus Box */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
          <Eye className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">PRIVATE EYE: Be sure to READ the Learning Goals!</span>
            <p className="text-slate-300 mt-0.5 leading-relaxed">{lesson.privateEyeFocus}</p>
          </div>
        </div>

        {/* Learning Goals Checklist */}
        <div className="pt-2">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
            Target Learning Goals:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {lesson.learningGoals.map((goal, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                <span className="text-indigo-400 font-bold">&bull;</span>
                <span>{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        {[
          { id: 'reading', label: '1. Readings & Concepts', icon: BookOpen },
          { id: 'sandbox', label: '2. Hands-on Visual Lab', icon: Compass },
          { id: 'practice', label: '3. Practice Problems', icon: HelpCircle },
          { id: 'key', label: '4. Textbook Answer Key', icon: Key },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); sounds.playClick(); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition ${
                isActive
                  ? 'bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Readings & Concepts */}
      {activeTab === 'reading' && (
        <div className="space-y-6">
          {/* Key Vocabulary Cards */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Key Lesson Vocabulary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lesson.keyVocabulary.map((vocab) => (
                <div
                  key={vocab.term}
                  className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                    {vocab.term}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {vocab.definition}
                  </p>
                  <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400 italic">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Example:</span> {vocab.example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Sections with In-line Checkpoints */}
          {lesson.readingSections.map((sec, secIdx) => (
            <div
              key={sec.title}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {sec.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {sec.content}
              </p>

              {/* Visual Explanation Table if present */}
              {sec.visualExplanation && sec.visualExplanation.type === 'table' && (
                <div className="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold">
                      <tr>
                        <th className="p-3">Context</th>
                        <th className="p-3 text-emerald-600 dark:text-emerald-400">Positive Integer (+)</th>
                        <th className="p-3 text-rose-600 dark:text-rose-400">Negative Integer (-)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                      {sec.visualExplanation.data.map((row: any, rIdx: number) => (
                        <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td className="p-3 font-sans font-semibold text-slate-800 dark:text-slate-200">{row.context}</td>
                          <td className="p-3 text-emerald-700 dark:text-emerald-300">{row.positive}</td>
                          <td className="p-3 text-rose-700 dark:text-rose-300">{row.negative}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Check Understanding Question */}
              {sec.checkQuestion && (
                <div className="mt-4 p-4 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/40 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Checkpoint: Test Your Understanding
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {sec.checkQuestion.question}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sec.checkQuestion.options.map((opt, oIdx) => {
                      const qKey = `${lesson.id}-q-${secIdx}`;
                      const isSelected = checkpointAnswers[qKey] === oIdx;
                      const hasAnswered = checkpointAnswers[qKey] !== undefined;
                      const isCorrect = oIdx === sec.checkQuestion!.correctIndex;

                      let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200';
                      if (hasAnswered) {
                        if (isCorrect) btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                        else if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={hasAnswered}
                          onClick={() => handleCheckpointSelect(secIdx, oIdx, sec.checkQuestion!.correctIndex)}
                          className={`p-2.5 rounded-lg border text-xs text-left font-medium transition ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {checkpointAnswers[`${lesson.id}-q-${secIdx}`] !== undefined && (
                    <div className="text-xs text-slate-600 dark:text-slate-300 pt-1">
                      <span className="font-bold">Explanation:</span> {sec.checkQuestion.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Visual Lab */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6">
          {lesson.id === 'lesson-1' && (
            <>
              <ZeroPairSandbox />
              <NumberLineExplorer />
            </>
          )}
          {lesson.id === 'lesson-2' && (
            <>
              <NumberLineExplorer />
              <ZeroPairSandbox />
            </>
          )}
          {lesson.id === 'lesson-3' && (
            <>
              <NumberLineExplorer />
              <ZeroPairSandbox />
            </>
          )}
          {lesson.id === 'lesson-4' && (
            <>
              <ZeroPairSandbox />
              <NumberLineExplorer />
            </>
          )}
          {lesson.id === 'lesson-5' && (
            <>
              <RationalCalculator />
              <NumberLineExplorer />
            </>
          )}
        </div>
      )}

      {/* Tab 3: Practice Problems */}
      {activeTab === 'practice' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Lesson {lesson.lessonNumber} Textbook Practice Set
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Work through these authentic textbook exercises to solidify your mastery.
            </p>
          </div>

          <div className="space-y-5">
            {lesson.practiceQuestions.map((q, idx) => {
              const isRevealed = practiceRevealed[q.id];
              const selectedAns = practiceAnswers[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Problem #{idx + 1}
                    </span>
                    <span className="text-[11px] text-slate-400 italic">
                      Hint: {q.hint}
                    </span>
                  </div>

                  <div className="text-base font-semibold text-slate-900 dark:text-white">
                    {q.question}
                  </div>

                  {q.options && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                      {q.options.map((opt) => {
                        const isChosen = selectedAns === opt;
                        const isCorrect = String(opt) === String(q.answer);

                        let optClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200';
                        if (isRevealed) {
                          if (isCorrect) optClass = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                          else if (isChosen) optClass = 'bg-rose-500 text-white border-rose-600 font-bold';
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isRevealed}
                            onClick={() => handlePracticeSelect(q.id, opt, q.answer)}
                            className={`p-3 rounded-lg border font-mono font-bold text-sm text-center transition ${optClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isRevealed && (
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        Answer: {q.answer}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300">
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Textbook Answer Key */}
      {activeTab === 'key' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Lesson {lesson.lessonNumber} Textbook Answer Key Highlights
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Official textbook key summaries from Pg. 183 to Pg. 247 for checking your written workbook exercises.
          </p>

          <div className="space-y-3 pt-2">
            {lesson.answerKeyHighlights.map((highlight, hIdx) => (
              <div
                key={hIdx}
                className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
              >
                <span className="font-bold text-indigo-600 dark:text-indigo-400">🔑</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
