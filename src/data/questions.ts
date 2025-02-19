import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    text: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mercury', 'Earth', 'Mars'],
    correctAnswer: 'B',
    timeLimit: 30
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: 'Which data structure organizes items in a First-In, First-Out (FIFO) manner?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    correctAnswer: 'B',
    timeLimit: 30
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: 'Which of the following is primarily used for structuring web pages?',
    options: ['Python', 'Java', 'HTML', 'C++'],
    correctAnswer: 'C',
    timeLimit: 30
  },
  {
    id: 4,
    type: 'multiple-choice',
    text: 'Which chemical symbol stands for Gold?',
    options: ['Au', 'Gd', 'Ag', 'Pt'],
    correctAnswer: 'A',
    timeLimit: 30
  },
  {
    id: 5,
    type: 'multiple-choice',
    text: 'Which of these processes is not typically involved in refining petroleum?',
    options: ['Fractional distillation', 'Cracking', 'Polymerization', 'Filtration'],
    correctAnswer: 'D',
    timeLimit: 30
  },
  {
    id: 6,
    type: 'integer',
    text: 'What is the value of 12 + 28?',
    correctAnswer: 40,
    timeLimit: 30
  },
  {
    id: 7,
    type: 'integer',
    text: 'How many states are there in the United States?',
    correctAnswer: 50,
    timeLimit: 30
  },
  {
    id: 8,
    type: 'integer',
    text: 'In which year was the Declaration of Independence signed?',
    correctAnswer: 1776,
    timeLimit: 30
  },
  {
    id: 9,
    type: 'integer',
    text: 'What is the value of pi rounded to the nearest integer?',
    correctAnswer: 3,
    timeLimit: 30
  },
  {
    id: 10,
    type: 'integer',
    text: 'If a car travels at 60 mph for 2 hours, how many miles does it travel?',
    correctAnswer: 120,
    timeLimit: 30
  }
];