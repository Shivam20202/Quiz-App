import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { questions } from './data/questions';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { QuizHistory } from './components/QuizHistory';
import { StartScreen } from './components/StartScreen';
import { QuizState, QuizAttempt } from './types';

const STORAGE_KEY = 'quiz-attempts';

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    status: 'not-started',
    currentQuestionIndex: 0,
    answers: new Array(questions.length).fill(null),
    timeRemaining: questions[0].timeLimit,
    isComplete: false,
    startTime: Date.now(),
    showFeedback: false,
  });

  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (quizState.status === 'in-progress' && !quizState.isComplete && !quizState.showFeedback) {
      const timer = setInterval(() => {
        setQuizState((prev) => {
          if (prev.timeRemaining <= 0) {
            clearInterval(timer);
            return {
              ...prev,
              showFeedback: true,
            };
          }
          return {
            ...prev,
            timeRemaining: prev.timeRemaining - 1,
          };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.status, quizState.isComplete, quizState.showFeedback, quizState.currentQuestionIndex]);

  const handleStart = () => {
    setQuizState({
      status: 'in-progress',
      currentQuestionIndex: 0,
      answers: new Array(questions.length).fill(null),
      timeRemaining: questions[0].timeLimit,
      isComplete: false,
      startTime: Date.now(),
      showFeedback: false,
    });
  };

  const handleAnswer = (answer: string | number) => {
    setQuizState((prev) => ({
      ...prev,
      answers: prev.answers.map((a, i) => (i === prev.currentQuestionIndex ? answer : a)),
      showFeedback: true,
      timeRemaining: prev.timeRemaining,
    }));
  };

  
  const handleNext = () => {
    setQuizState((prev) => {
      const isLastQuestion = prev.currentQuestionIndex === questions.length - 1;

      if (isLastQuestion) {
        return {
          ...prev,
          status: 'complete',
          isComplete: true,
        };
      }

      const nextIndex = prev.currentQuestionIndex + 1;
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        timeRemaining: questions[nextIndex].timeLimit,
        showFeedback: false,
      };
    });
  };

  const calculateScore = (): number => {
    return quizState.answers.reduce((score, answer, index) => {
      if (answer === null) return score;
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const handleRetry = () => {
    const score = calculateScore();
    const timeSpent = Math.floor((Date.now() - quizState.startTime) / 1000);
    
    const newAttempt: QuizAttempt = {
      timestamp: Date.now(),
      score,
      totalQuestions: questions.length,
      timeSpent,
    };

    const updatedAttempts = [newAttempt, ...attempts];
    setAttempts(updatedAttempts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAttempts));

    setQuizState({
      status: 'not-started',
      currentQuestionIndex: 0,
      answers: new Array(questions.length).fill(null),
      timeRemaining: questions[0].timeLimit,
      isComplete: false,
      startTime: Date.now(),
      showFeedback: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Quiz Platform</h1>
        </div>

        {quizState.status === 'not-started' && (
          <StartScreen 
            onStart={handleStart} 
            totalQuestions={questions.length}
            attempts={attempts}
          />
        )}

        {quizState.status === 'in-progress' && !quizState.isComplete && (
          <QuizQuestion
            question={questions[quizState.currentQuestionIndex]}
            answer={quizState.answers[quizState.currentQuestionIndex]}
            onAnswer={handleAnswer}
            timeRemaining={quizState.timeRemaining}
            showFeedback={quizState.showFeedback}
            onNext={handleNext}
          />
        )}

        {(quizState.status === 'complete' || quizState.isComplete) && (
          <>
            <QuizResults
              score={calculateScore()}
              totalQuestions={questions.length}
              timeSpent={Math.floor((Date.now() - quizState.startTime) / 1000)}
              onRetry={handleRetry}
            />
            <QuizHistory attempts={attempts} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;