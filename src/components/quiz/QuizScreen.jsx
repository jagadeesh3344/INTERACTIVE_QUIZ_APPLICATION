import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { shuffleArray } from '@/lib/utils';

const QuizScreen = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  score,
  selectedAnswer,
  isAnswered,
  onAnswerSelect,
  onNextQuestion,
  itemVariants
}) => {
  const shuffledOptions = useMemo(() => {
    if (currentQuestion && currentQuestion.options) {
      return shuffleArray([...currentQuestion.options]);
    }
    return [];
  }, [currentQuestion]);

  if (!currentQuestion) {
    return (
      <div className="text-center p-10">
        <p className="text-xl text-white">Loading question...</p>
      </div>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl rounded-xl overflow-hidden">
      <CardHeader className="p-6 bg-black/20">
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-2">
          <CardTitle className="text-2xl md:text-3xl font-bold text-white">Question {currentQuestionIndex + 1}
            <span className="text-lg font-normal opacity-70">/{totalQuestions}</span>
          </CardTitle>
          <div className="text-xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 p-1 rounded-md">
            Score: {score}
          </div>
        </motion.div>
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-100 leading-relaxed">
          {currentQuestion.question}
        </motion.p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {shuffledOptions.map((option, index) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = selectedAnswer === option;
          let buttonClass = "bg-white/20 hover:bg-white/30 border-white/30 text-white";
          if (isAnswered) {
            if (isSelected) {
              buttonClass = isCorrect 
                ? "bg-green-500/80 border-green-400 text-white ring-2 ring-green-300" 
                : "bg-red-500/80 border-red-400 text-white ring-2 ring-red-300";
            } else if (isCorrect) {
              buttonClass = "bg-green-500/50 border-green-400/50 text-white opacity-70";
            } else {
              buttonClass = "bg-white/10 border-white/20 text-gray-300 opacity-60";
            }
          }

          return (
            <motion.div variants={itemVariants} key={option + '-' + index}>
              <Button
                variant="outline"
                size="lg"
                className={`w-full justify-start text-left h-auto py-3 px-4 text-base md:text-lg rounded-lg transition-all duration-300 ease-in-out transform hover:scale-102 ${buttonClass}`}
                onClick={() => onAnswerSelect(option)}
                disabled={isAnswered}
              >
                {isAnswered && isSelected && (isCorrect ? <CheckCircle className="mr-3 h-5 w-5 text-green-300" /> : <XCircle className="mr-3 h-5 w-5 text-red-300" />)}
                {!isAnswered && !isSelected && <span className="mr-3 h-5 w-5 inline-block border-2 border-white/50 rounded-full"></span>}
                {option}
              </Button>
            </motion.div>
          );
        })}
      </CardContent>
      <CardFooter className="p-6 bg-black/10">
        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Button 
                onClick={onNextQuestion} 
                size="lg" 
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md"
              >
                {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Show Results"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
};

export default QuizScreen;