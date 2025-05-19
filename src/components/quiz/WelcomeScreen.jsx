import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, Zap } from 'lucide-react';

const WelcomeScreen = ({ onStartQuiz, highScore }) => {
  return (
    <div className="text-center">
      <Zap size={80} className="mx-auto mb-6 text-yellow-300 animate-pulse" />
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6" style={{textShadow: "2px 2px 4px rgba(0,0,0,0.3)"}}>
        Quiz Challenge!
      </h1>
      <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
        Test your knowledge with our interactive quiz. Are you ready to begin?
      </p>
      <Button 
        onClick={onStartQuiz} 
        size="lg" 
        className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold text-xl py-8 px-12 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300"
      >
        Start Quiz
      </Button>
      {highScore > 0 && (
        <p className="mt-8 text-lg opacity-80">
          Current High Score: <Trophy className="inline-block mr-1 text-yellow-300" size={20} /> {highScore}
        </p>
      )}
    </div>
  );
};

export default WelcomeScreen;