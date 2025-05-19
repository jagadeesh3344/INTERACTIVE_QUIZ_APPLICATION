import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Trophy } from 'lucide-react';

const ResultsScreen = ({ score, totalQuestions, highScore, onRestartQuiz, itemVariants }) => {
  return (
    <div className="text-center">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl rounded-xl">
        <CardHeader>
          <motion.div variants={itemVariants}>
            <Trophy size={64} className="mx-auto mb-4 text-yellow-300" />
            <CardTitle className="text-4xl font-bold text-white">Quiz Completed!</CardTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardDescription className="text-lg text-gray-200 pt-2">
              You've reached the end of the quiz.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.p variants={itemVariants} className="text-5xl font-bold text-white">
            Your Score: {score} / {totalQuestions}
          </motion.p>
          <motion.p variants={itemVariants} className="text-xl text-gray-200">
            High Score: {highScore}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button 
              onClick={onRestartQuiz} 
              size="lg" 
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-full"
            >
              <RotateCcw className="mr-2 h-5 w-5" /> Restart Quiz
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsScreen;