import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  answer: string | number | null;
  onAnswer: (answer: string | number) => void;
  timeRemaining: number;
  showFeedback: boolean;
  onNext: () => void;
}

export function QuizQuestion({ 
  question, 
  answer, 
  onAnswer, 
  timeRemaining,
  showFeedback,
  onNext
}: QuizQuestionProps) {
  const isCorrect = answer === question.correctAnswer;
  const [inputValue, setInputValue] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setInputValue('');
    setSubmitted(false);
  }, [question.id]);

  const handleIntegerInput = (value: string) => {
    setInputValue(value);
  };

  const handleIntegerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitted && inputValue.trim() !== '') {
      setSubmitted(true);
      onAnswer(parseInt(inputValue, 10));
    }
  };
  
  const correctAnswerText =
  typeof question.correctAnswer === 'string'
    ? `${question.correctAnswer}. ${question.options?.[question.correctAnswer.charCodeAt(0) - 65]}`
    : question.correctAnswer;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {question.id} of 10
        </span>
        <span className="text-sm font-medium text-red-500">
          Time remaining: {timeRemaining}s
        </span>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      
      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                showFeedback
                  ? answer === String.fromCharCode(65 + index)
                    ? isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                    : question.correctAnswer === String.fromCharCode(65 + index)
                    ? 'bg-green-50 border-green-200'
                    : ''
                  : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={String.fromCharCode(65 + index)}
                checked={answer === String.fromCharCode(65 + index)}
                onChange={(e) => onAnswer(e.target.value)}
                disabled={showFeedback}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3">
                {String.fromCharCode(65 + index)}. {option}
              </span>
            </label>
          ))}
        </div>
      )}
      
      {question.type === 'integer' && (
        <form onSubmit={handleIntegerSubmit} className="mt-4">
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => handleIntegerInput(e.target.value)}
              disabled={showFeedback}
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your answer..."
            />
            {!showFeedback && (
              <button
                type="submit"
                disabled={!inputValue || submitted}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      )}

      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </span>
          </div>
          {!isCorrect && (
          <p className="mt-2 text-gray-600">
          The correct answer is: {correctAnswerText}
        </p>
        
          )}
        </div>
      )}

      {showFeedback && (
        <button
          onClick={onNext}
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next Question
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}