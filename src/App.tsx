/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, MainNavSection } from './components/Header';
import { LessonHub } from './components/LessonHub';
import { GamesHub } from './components/GamesHub';
import { FlashcardsView } from './components/FlashcardsView';
import { ManipulativesHub } from './components/ManipulativesHub';
import { KnowledgeRatingView } from './components/KnowledgeRatingView';
import { BookOpen, Rocket, Layers, Compass, Star, RotateCcw, Award } from 'lucide-react';
import { sounds } from './utils/audio';

const STORAGE_KEY = 'rational_realm_progress_v1';

export default function App() {
  const [currentSection, setCurrentSection] = useState<MainNavSection>('lessons');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Persistent student progress
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_lessons`);
      return saved ? JSON.parse(saved) : ['lesson-1'];
    } catch {
      return ['lesson-1'];
    }
  });

  const [masteredFlashcards, setMasteredFlashcards] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_flashcards`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_ratings`);
      return saved ? JSON.parse(saved) : { g1: 3, g2: 3, g3: 2, g4: 2, g5: 2 };
    } catch {
      return { g1: 3, g2: 3, g3: 2, g4: 2, g5: 2 };
    }
  });

  const [scores, setScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_scores`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync dark class on html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Persist states
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_lessons`, JSON.stringify(completedLessons));
      localStorage.setItem(`${STORAGE_KEY}_flashcards`, JSON.stringify(masteredFlashcards));
      localStorage.setItem(`${STORAGE_KEY}_ratings`, JSON.stringify(ratings));
      localStorage.setItem(`${STORAGE_KEY}_scores`, JSON.stringify(scores));
    } catch {}
  }, [completedLessons, masteredFlashcards, ratings, scores]);

  const handleToggleTheme = () => {
    sounds.playClick();
    setIsDark(prev => !prev);
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  const handleToggleMasteredFlashcard = (cardId: string) => {
    setMasteredFlashcards(prev =>
      prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
    );
  };

  const handleUpdateRating = (goalId: string, level: number) => {
    setRatings(prev => ({ ...prev, [goalId]: level }));
  };

  const handleScoreEarned = (gameId: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [gameId]: Math.max(prev[gameId] || 0, score)
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all lesson progress and game scores?')) {
      sounds.playClick();
      setCompletedLessons([]);
      setMasteredFlashcards([]);
      setRatings({});
      setScores({});
      try {
        localStorage.removeItem(`${STORAGE_KEY}_lessons`);
        localStorage.removeItem(`${STORAGE_KEY}_flashcards`);
        localStorage.removeItem(`${STORAGE_KEY}_ratings`);
        localStorage.removeItem(`${STORAGE_KEY}_scores`);
      } catch {}
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Universal Top Bar */}
      <Header
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Curriculum Status Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
              🍁
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Topic Standard &bull; C2M2T1
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                "I CAN add and subtract rational numbers."
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div>
              <span className="text-slate-400">Lessons: </span>
              <span className="font-bold text-slate-900 dark:text-white">{completedLessons.length} / 5</span>
            </div>
            <div>
              <span className="text-slate-400">Flashcards: </span>
              <span className="font-bold text-slate-900 dark:text-white">{masteredFlashcards.length} Mastered</span>
            </div>
          </div>
        </div>

        {/* Section Routing */}
        {currentSection === 'lessons' && (
          <LessonHub
            completedLessons={completedLessons}
            onCompleteLesson={handleCompleteLesson}
          />
        )}

        {currentSection === 'games' && (
          <GamesHub onScoreEarned={handleScoreEarned} />
        )}

        {currentSection === 'flashcards' && (
          <FlashcardsView
            masteredIds={masteredFlashcards}
            onToggleMastered={handleToggleMasteredFlashcard}
          />
        )}

        {currentSection === 'manipulatives' && (
          <ManipulativesHub />
        )}

        {currentSection === 'rating' && (
          <KnowledgeRatingView
            ratings={ratings}
            onUpdateRating={handleUpdateRating}
            completedLessons={completedLessons}
            masteredFlashcardsCount={masteredFlashcards.length}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>Course 2 &bull; Module 2 &bull; Topic 1: Adding and Subtracting Rational Numbers</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetProgress}
              className="text-slate-400 hover:text-rose-500 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset My Progress
            </button>
            <span aria-hidden="true">&bull;</span>
            <span>Carnegie Learning Curriculum Companion</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
