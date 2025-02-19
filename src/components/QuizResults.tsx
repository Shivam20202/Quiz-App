import React from 'react';
import { Timer, Award, RotateCcw } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  onRetry: () => void;
}

export function QuizResults({ score, totalQuestions, timeSpent, onRetry }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-6">Quiz Complete!</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-xl">{score}/{totalQuestions}</div>
            <div className="text-gray-600">Correct Answers</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-xl">{percentage}%</div>
            <div className="text-gray-600">Score</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg col-span-2">
            <div className="flex items-center justify-center gap-2">
              <Timer className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-xl">
                {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
              </span>
            </div>
            <div className="text-gray-600">Time Spent</div>
          </div>
        </div>
        
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
}