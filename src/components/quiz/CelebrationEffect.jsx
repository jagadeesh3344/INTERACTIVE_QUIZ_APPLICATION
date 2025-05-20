import React from 'react';
import { motion } from 'framer-motion';

const ConfettiPiece = ({ initialXPercent, initialYPercent, rotate, color, delay }) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${initialXPercent}%`,
        top: `${initialYPercent}%`,
        width: '10px',
        height: '20px',
        backgroundColor: color,
        borderRadius: '2px',
        pointerEvents: 'none',
      }}
      initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: "120vh", 
        x: [ 
          0, 
          Math.random() * 100 - 50, 
          Math.random() * 50 - 25, 
          Math.random() * 100 - 50
        ],
        rotate: [0, rotate / 2, rotate, rotate * 1.5],
        scale: [0.5, 1, 1, 0.5],
      }}
      transition={{
        duration: Math.random() * 3 + 5, 
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 1, 
        delay: delay,
      }}
    />
  );
};

const CelebrationEffect = () => {
  const numConfetti = 150; 
  const colors = ['#FFD700', '#FF69B4', '#00BFFF', '#32CD32', '#FF4500', '#9370DB', '#FFFFFF'];

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden', 
      zIndex: 0 
    }}>
      {Array.from({ length: numConfetti }).map((_, index) => (
        <ConfettiPiece
          key={index}
          initialXPercent={Math.random() * 100} 
          initialYPercent={Math.random() * -50 - 20} 
          rotate={Math.random() * 360}
          color={colors[Math.floor(Math.random() * colors.length)]}
          delay={Math.random() * 5}
        />
      ))}
    </div>
  );
};

export default CelebrationEffect;