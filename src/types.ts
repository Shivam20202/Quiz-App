export interface Question {
  id: number;
  type: 'multiple-choice' | 'integer';
  text: string;
  options?: string[];
  correctAnswer: string | number;
  timeLimit: number;
}

export interface QuizAttempt {
  timestamp: number;
  score: number;
  totalQuestions: number;
  timeSpent: number;
}

export interface QuizState {
  status: 'not-started' | 'in-progress' | 'complete';
  currentQuestionIndex: number;
  answers: (string | number | null)[];
  timeRemaining: number;
  isComplete: boolean;
  startTime: number;
  showFeedback: boolean;
}