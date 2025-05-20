import React, { useState, useEffect, useCallback } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import initialQuizData from '@/quizData';
import WelcomeScreen from '@/components/quiz/WelcomeScreen';
import QuizScreen from '@/components/quiz/QuizScreen';
import ResultsScreen from '@/components/quiz/ResultsScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { shuffleArray } from '@/lib/utils';

const QUESTIONS_PER_QUIZ = 10; 

const selectRandomQuestions = (allQuestions, count) => {
  const shuffled = shuffleArray(allQuestions);
  if (shuffled.length < count) {
    console.warn(`Warning: Not enough unique questions available in quizData.js to select ${count} questions. Please add more questions. Displaying ${shuffled.length} questions.`);
    return shuffled;
  }
  return shuffled.slice(0, count);
};

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const { toast } = useToast();

  const highScoreKey = 'quizHighScore';
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem(highScoreKey) || '0');
  });

  const initializeQuiz = useCallback(() => {
    const newQuestions = selectRandomQuestions(initialQuizData, QUESTIONS_PER_QUIZ);
    setQuizData(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowResults(false);
  }, []);


  useEffect(() => {
    if (showResults) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(highScoreKey, score.toString());
        toast({
          title: "🏆 New High Score!",
          description: `Congratulations! You've set a new high score of ${score}.`,
          variant: "default",
          duration: 3000,
        });
      }
    }
  }, [showResults, score, highScore, toast]);

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (quizData[currentQuestionIndex] && answer === quizData[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
      toast({
        title: "Correct!",
        description: "Great job!",
        variant: "default",
        duration: 1500,
        className: "bg-green-500 border-green-600 text-white",
      });
    } else if (quizData[currentQuestionIndex]) {
      toast({
        title: "Incorrect!",
        description: `The correct answer was: ${quizData[currentQuestionIndex].correctAnswer}`,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    initializeQuiz();
    setQuizStarted(true);
  };

  const handleStartQuiz = () => {
    initializeQuiz();
    setQuizStarted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.1 
      } 
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!quizStarted ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <WelcomeScreen onStartQuiz={handleStartQuiz} highScore={highScore} />
          </motion.div>
        ) : showResults ? (
          <motion.div
            key="results"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md"
          >
            <ResultsScreen 
              score={score} 
              totalQuestions={quizData.length} 
              highScore={highScore}
              onRestartQuiz={handleRestartQuiz} 
              itemVariants={itemVariants}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`question-${currentQuestionIndex}-${quizData[currentQuestionIndex]?.question || 'loading'}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-2xl"
          >
            {quizData.length > 0 && currentQuestionIndex < quizData.length && quizData[currentQuestionIndex] ? (
              <QuizScreen
                currentQuestion={quizData[currentQuestionIndex]}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={quizData.length}
                score={score}
                selectedAnswer={selectedAnswer}
                isAnswered={isAnswered}
                onAnswerSelect={handleAnswerSelect}
                onNextQuestion={handleNextQuestion}
                itemVariants={itemVariants}
              />
            ) : (
              <div className="text-center p-10">
                <p className="text-xl">Loading questions...</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
};

export default App;