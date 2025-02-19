import React from 'react';
import { Brain, Play, Trophy, Clock, Target } from 'lucide-react';
import { QuizAttempt } from '../types';

interface StartScreenProps {
  onStart: () => void;
  totalQuestions: number;
  attempts: QuizAttempt[];
}

export function StartScreen({ onStart, totalQuestions, attempts }: StartScreenProps) {
  const bestScore = attempts.length > 0
    ? Math.max(...attempts.map(a => (a.score / a.totalQuestions) * 100))
    : 0;

  const averageScore = attempts.length > 0
    ? (attempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions) * 100, 0) / attempts.length).toFixed(1)
    : 0;

  const totalAttempts = attempts.length;

  return (
    <div className="space-y-8">
      <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <Brain className="w-16 h-16 mx-auto text-blue-600 mb-6" />
        <h2 className="text-3xl font-bold mb-4">Welcome to the Quiz!</h2>
        <p className="text-gray-600 mb-6">
          Test your knowledge with {totalQuestions} questions.
          Each question has a 30-second time limit.
        </p>
        <button
          onClick={onStart}
          className="flex items-center justify-center gap-2 mx-auto px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          <Play className="w-5 h-5" />
          Start Quiz
        </button>
      </div>

      {attempts.length > 0 && (
        <div className="w-full max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Trophy className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{bestScore}%</div>
              <div className="text-sm text-gray-600">Best Score</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Target className="w-8 h-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{averageScore}%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Clock className="w-8 h-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalAttempts}</div>
              <div className="text-sm text-gray-600">Total Attempts</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Attempts</h3>
            </div>
            <div className="divide-y">
              {attempts.slice(0, 5).map((attempt, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">
                        Score: {attempt.score}/{attempt.totalQuestions} (
                        {Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(attempt.timestamp).toLocaleDateString()} at{' '}
                        {new Date(attempt.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}