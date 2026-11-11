import React, { useState } from 'react';
import { Layers, RotateCcw, Shuffle, Check, Eye, HelpCircle, ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import { FLASHCARDS_DATA } from '../data/curriculumData';
import { Flashcard, LessonId } from '../types/curriculum';
import { sounds } from '../utils/audio';

export const FlashcardsView: React.FC<{
  masteredIds: string[];
  onToggleMastered: (id: string) => void;
}> = ({ masteredIds, onToggleMastered }) => {
  const [selectedLesson, setSelectedLesson] = useState<string>('all');
  const [cards, setCards] = useState<Flashcard[]>(FLASHCARDS_DATA);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Filter cards
  const filteredCards = cards.filter(c => {
    if (selectedLesson === 'all') return true;
    return c.lessonId === selectedLesson;
  });

  const activeCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];
  const isMastered = activeCard ? masteredIds.includes(activeCard.id) : false;

  const handleFlip = () => {
    sounds.playClick();
    setIsFlipped(prev => !prev);
  };

  const handleNext = () => {
    sounds.playClick();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    sounds.playClick();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    sounds.playBooster();
    setIsFlipped(false);
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  const handleLessonChange = (lessonId: string) => {
    sounds.playClick();
    setSelectedLesson(lessonId);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const totalFiltered = filteredCards.length;
  const masteredInFiltered = filteredCards.filter(c => masteredIds.includes(c.id)).length;

  return (
    <div className="space-y-6">
      {/* Header and Filter strip */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                Curriculum Mastery Flashcards
              </h3>
              <span className="text-xs text-indigo-700 dark:text-indigo-300 font-medium bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                40+ Flashcard Deck
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Test your recall of key vocabulary, integer sign rules, absolute value concepts, and fraction algorithms.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
            >
              <Shuffle className="w-3.5 h-3.5" /> Shuffle
            </button>
            <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
              {masteredInFiltered} / {totalFiltered} Mastered
            </div>
          </div>
        </div>

        {/* Lesson Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1">
          {[
            { id: 'all', label: 'All Lessons' },
            { id: 'lesson-1', label: 'L1: Intro & Models' },
            { id: 'lesson-2', label: 'L2: Absolute Value' },
            { id: 'lesson-3', label: 'L3: Adding & Properties' },
            { id: 'lesson-4', label: 'L4: Subtracting & Zero Pairs' },
            { id: 'lesson-5', label: 'L5: Rational Numbers' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleLessonChange(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                selectedLesson === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Stage */}
      {activeCard ? (
        <div className="max-w-xl mx-auto space-y-4">
          {/* Card Frame */}
          <div
            onClick={handleFlip}
            className="w-full min-h-[320px] bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-lg cursor-pointer p-8 flex flex-col justify-between transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-600 group relative select-none"
          >
            {/* Top row */}
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {activeCard.lessonName}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                activeCard.difficulty === 'easy'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : activeCard.difficulty === 'medium'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
              }`}>
                {activeCard.difficulty}
              </span>
            </div>

            {/* Content center */}
            <div className="py-6 text-center my-auto">
              {!isFlipped ? (
                <div>
                  <div className="text-xs uppercase tracking-widest font-semibold text-slate-400 mb-2">
                    {activeCard.frontTitle}
                  </div>
                  <h4 className="text-2xl font-bold font-sans text-slate-900 dark:text-white leading-snug">
                    {activeCard.frontPrompt}
                  </h4>
                  <div className="mt-4 text-xs text-slate-400 group-hover:text-indigo-500 transition flex items-center justify-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5" /> Click or tap card to reveal answer
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-xs uppercase tracking-widest font-semibold text-emerald-600 dark:text-emerald-400">
                    Mathematical Answer &amp; Rule
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                    {activeCard.backAnswer}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-md mx-auto pt-2">
                    {activeCard.backExplanation}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom row */}
            <div className="flex justify-between items-center text-xs text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="font-mono">
                Card {currentIndex + 1} of {totalFiltered}
              </span>
              <span className="text-[11px] text-slate-400 italic">
                {isFlipped ? 'Tap to flip back' : 'Question Prompt'}
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={() => {
                sounds.playCorrect();
                onToggleMastered(activeCard.id);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-xs ${
                isMastered
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-700'
              }`}
            >
              <Check className="w-4 h-4" />
              {isMastered ? 'Mastered!' : 'Mark Mastered'}
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">
          No cards found for this lesson filter.
        </div>
      )}
    </div>
  );
};
