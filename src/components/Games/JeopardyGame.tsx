import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Users, User, Check, X, RotateCcw, AlertCircle } from 'lucide-react';
import { JEOPARDY_QUESTIONS } from '../../data/curriculumData';
import { JeopardyQuestion } from '../../types/curriculum';
import { sounds } from '../../utils/audio';

export const JeopardyGame: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<JeopardyQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<'single' | 'teams'>('single');

  // Scores
  const [singleScore, setSingleScore] = useState<number>(0);
  const [team1Score, setTeam1Score] = useState<number>(0);
  const [team2Score, setTeam2Score] = useState<number>(0);
  const [currentTeam, setCurrentTeam] = useState<1 | 2>(1);

  const categories = [
    'Opposites & Absolutes',
    'Zero Pairs & Models',
    'Adding Integers',
    'Subtracting Integers',
    'Rational Numbers'
  ];

  const pointTiers = [100, 200, 300, 400, 500];

  const handleSelectCard = (question: JeopardyQuestion) => {
    if (answeredIds.includes(question.id)) return;
    sounds.playClick();
    setActiveQuestion(question);
    setSelectedOption(null);
    setIsRevealed(false);
  };

  const handleSubmitAnswer = (chosenIndex: number) => {
    if (!activeQuestion || isRevealed) return;
    setSelectedOption(chosenIndex);
    setIsRevealed(true);

    const isCorrect = chosenIndex === activeQuestion.correctIndex;
    if (isCorrect) {
      sounds.playCorrect();
      if (gameMode === 'single') {
        setSingleScore(prev => prev + activeQuestion.points);
      } else {
        if (currentTeam === 1) setTeam1Score(prev => prev + activeQuestion.points);
        else setTeam2Score(prev => prev + activeQuestion.points);
      }
    } else {
      sounds.playIncorrect();
      if (gameMode === 'single') {
        setSingleScore(prev => Math.max(0, prev - activeQuestion.points));
      } else {
        if (currentTeam === 1) setTeam1Score(prev => prev - activeQuestion.points);
        else setTeam2Score(prev => prev - activeQuestion.points);
      }
    }

    setAnsweredIds(prev => [...prev, activeQuestion.id]);

    // Check game completion
    if (answeredIds.length + 1 >= JEOPARDY_QUESTIONS.length) {
      sounds.playVictory();
      confetti({ particleCount: 90, spread: 70 });
      if (onComplete) onComplete(singleScore + (isCorrect ? activeQuestion.points : 0));
    }
  };

  const handleCloseModal = () => {
    sounds.playClick();
    setActiveQuestion(null);
    setSelectedOption(null);
    setIsRevealed(false);
    // Switch turn in team mode
    if (gameMode === 'teams') {
      setCurrentTeam(prev => (prev === 1 ? 2 : 1));
    }
  };

  const handleResetGame = () => {
    sounds.playClick();
    setAnsweredIds([]);
    setActiveQuestion(null);
    setSingleScore(0);
    setTeam1Score(0);
    setTeam2Score(0);
    setCurrentTeam(1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              Integer &amp; Rational Jeopardy
            </h3>
            <span className="text-xs text-indigo-700 dark:text-indigo-300 font-medium bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
              Curriculum Game Break
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Pick your category and point value. Test your knowledge across opposites, zero pairs, addition, subtraction, and rational decimals/fractions!
          </p>
        </div>

        {/* Mode Toggle & Scoreboard */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
            <button
              onClick={() => { setGameMode('single'); sounds.playClick(); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                gameMode === 'single'
                  ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              <User className="w-3 h-3" /> Solo
            </button>
            <button
              onClick={() => { setGameMode('teams'); sounds.playClick(); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                gameMode === 'teams'
                  ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              <Users className="w-3 h-3" /> 2 Teams
            </button>
          </div>

          <button
            onClick={handleResetGame}
            title="Reset Jeopardy Board"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Score Banner */}
      <div className="my-4 p-3 bg-slate-900 text-white rounded-xl flex items-center justify-around text-center border border-slate-800">
        {gameMode === 'single' ? (
          <div>
            <div className="text-xs uppercase text-slate-400 font-bold">Total Earnings</div>
            <div className="text-2xl font-mono font-bold text-amber-400 tabular-nums">${singleScore}</div>
          </div>
        ) : (
          <>
            <div className={`p-2 rounded-lg transition ${currentTeam === 1 ? 'ring-2 ring-amber-400 bg-slate-800' : ''}`}>
              <div className="text-xs uppercase text-amber-300 font-bold">Team Positives (1)</div>
              <div className="text-xl font-mono font-bold text-white tabular-nums">${team1Score}</div>
            </div>
            <div className="text-xs text-slate-500 font-mono">VS</div>
            <div className={`p-2 rounded-lg transition ${currentTeam === 2 ? 'ring-2 ring-indigo-400 bg-slate-800' : ''}`}>
              <div className="text-xs uppercase text-indigo-300 font-bold">Team Negatives (2)</div>
              <div className="text-xl font-mono font-bold text-white tabular-nums">${team2Score}</div>
            </div>
          </>
        )}
      </div>

      {/* Jeopardy Grid Board */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[700px] grid grid-cols-5 gap-2.5">
          {/* Category Headers */}
          {categories.map((cat) => (
            <div
              key={cat}
              className="p-2.5 bg-indigo-700 text-white rounded-lg text-center font-bold text-xs flex items-center justify-center min-h-[52px] shadow-xs"
            >
              {cat}
            </div>
          ))}

          {/* Cards (Rows by Points) */}
          {pointTiers.map(points => (
            <React.Fragment key={points}>
              {categories.map(cat => {
                const q = JEOPARDY_QUESTIONS.find(item => item.category === cat && item.points === points);
                if (!q) return <div key={cat + points} />;
                const isAnswered = answeredIds.includes(q.id);

                return (
                  <button
                    key={q.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectCard(q)}
                    className={`h-16 rounded-lg font-mono font-bold text-lg flex items-center justify-center transition-all ${
                      isAnswered
                        ? 'bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-40'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-amber-300 border-2 border-indigo-500 hover:border-amber-300 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                  >
                    {isAnswered ? '—' : `$${points}`}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Question Modal */}
      {activeQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {activeQuestion.category} &bull; ${activeQuestion.points}
              </span>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Question Text */}
            <div className="p-4 bg-slate-900 text-white rounded-xl text-center">
              <div className="text-lg font-bold">{activeQuestion.question}</div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeQuestion.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isCorrect = i === activeQuestion.correctIndex;
                let btnStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';

                if (isRevealed) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500 text-white border-rose-600';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-400 text-slate-950 border-amber-500';
                }

                return (
                  <button
                    key={i}
                    disabled={isRevealed}
                    onClick={() => handleSubmitAnswer(i)}
                    className={`p-3.5 rounded-xl border-2 font-mono font-bold text-sm text-left transition ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation when revealed */}
            {isRevealed && (
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-slate-100">
                  {selectedOption === activeQuestion.correctIndex ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Correct! Added ${activeQuestion.points}
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1">
                      <X className="w-4 h-4" /> Incorrect! Deducted ${activeQuestion.points}
                    </span>
                  )}
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  {activeQuestion.explanation}
                </div>
              </div>
            )}

            {/* Close button */}
            {isRevealed && (
              <button
                onClick={handleCloseModal}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition"
              >
                Continue to Board
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
