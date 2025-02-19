# Quiz Platform

Deployed Link: https://quizapp1122.netlify.app/

A modern, interactive quiz application built with React and TypeScript. Test your knowledge across various subjects with instant feedback and track your progress over time.



## Features

- **Interactive Quiz Interface**
  - Multiple choice and integer-based questions
  - Instant feedback after each answer
  - Timer for each question (30 seconds)
  - Progress tracking during quiz

- **User Progress Tracking**
  - Score calculation and display
  - Quiz attempt history
  - Performance statistics
    - Best score
    - Average score
    - Total attempts

- **Responsive Design**
  - Works on desktop and mobile devices
  - Clean, modern UI
  - Smooth transitions and animations

- **Local Storage Integration**
  - Saves quiz attempts
  - Persistent history across sessions

## Technologies Used

- **Frontend Framework**
  - React 18.3.1
  - TypeScript 5.5.3
  - Vite 5.4.2

- **Styling**
  - Tailwind CSS 3.4.1
  - PostCSS 8.4.35
  - Autoprefixer 10.4.18

- **Icons & UI**
  - Lucide React 0.344.0

- **Development Tools**
  - ESLint 9.9.1
  - Various ESLint plugins for React and TypeScript

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the provided local URL

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── QuizQuestion.tsx
│   ├── QuizResults.tsx
│   ├── QuizHistory.tsx
│   └── StartScreen.tsx
├── data/
│   └── questions.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
