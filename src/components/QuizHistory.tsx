import React from 'react';
import { Clock, Trophy } from 'lucide-react';

interface QuizHistoryProps {
  attempts: {
    timestamp: number;
    score: number;
    totalQuestions: number;
    timeSpent: number;
  }[];
}

export function QuizHistory({ attempts }: QuizHistoryProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h3 className="text-xl font-semibold mb-4">Previous Attempts</h3>
      <div className="space-y-4">
        {attempts.map((attempt, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <div>
                <div className="font-medium">
                  Score: {attempt.score}/{attempt.totalQuestions} (
                  {Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(attempt.timestamp).toLocaleDateString()} at{' '}
                  {new Date(attempt.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>
                {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}