export type LessonId = 'lesson-1' | 'lesson-2' | 'lesson-3' | 'lesson-4' | 'lesson-5';

export interface LessonContent {
  id: LessonId;
  lessonNumber: number;
  title: string;
  subtitle: string;
  learningGoals: string[];
  privateEyeFocus: string;
  keyVocabulary: {
    term: string;
    definition: string;
    example: string;
  }[];
  readingSections: {
    title: string;
    content: string;
    visualExplanation?: {
      type: 'counter' | 'number-line' | 'table' | 'formula';
      title: string;
      description: string;
      data: any;
    };
    checkQuestion?: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    };
  }[];
  practiceQuestions: {
    id: string;
    question: string;
    type: 'multiple-choice' | 'numeric';
    options?: string[];
    answer: string | number;
    explanation: string;
    hint: string;
  }[];
  answerKeyHighlights: string[];
}

export interface Flashcard {
  id: string;
  lessonId: LessonId;
  lessonName: string;
  frontTitle: string;
  frontPrompt: string;
  frontType: 'definition' | 'calculation' | 'rule' | 'visual';
  backAnswer: string;
  backExplanation: string;
  visualDetail?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface JeopardyQuestion {
  id: string;
  category: string;
  points: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RagsToRichesQuestion {
  level: number;
  prize: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface EscapeRoomChamber {
  id: number;
  title: string;
  theme: string;
  lore: string;
  riddle: string;
  puzzleType: 'opposites' | 'absolute-value' | 'zero-pairs' | 'rational-cipher';
  targetAnswer: string;
  hint: string;
  interactiveData: any;
}

export interface MysteryPictureTile {
  index: number;
  problem: string;
  answer: number;
  color: string;
  revealed: boolean;
}

export interface StudentProgress {
  completedLessons: string[];
  ratings: Record<string, number>; // 1-4 scale
  gameHighScores: {
    orbit: number;
    mystery: number;
    rags: number;
    jeopardy: number;
    escapeRoomsCompleted: number;
    hexingo: number;
  };
  flashcardsMastered: string[];
  badges: string[];
}
