import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface SimpleQuotesProps {
  showQuotes: boolean;
}

const SimpleQuotes: React.FC<SimpleQuotesProps> = ({ showQuotes }) => {
  const { t } = useLanguage();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  
  // Simple quote pairs - you can add more here
  const quotes = [
    {
      line1: "The journey of a thousand miles",
      line2: "begins with one step"
    },
    {
      line1: "In stillness, find movement",
      line2: "In silence, find wisdom"
    },
    {
      line1: "Like water flowing over stones",
      line2: "patience shapes the hardest hearts"
    },
    {
      line1: "The temple within",
      line2: "is built with peaceful thoughts"
    }
  ];

  // Cycle through quotes every 10 seconds
  useEffect(() => {
    if (!showQuotes) return;
    
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [showQuotes, quotes.length]);

  if (!showQuotes) return null;

  return (
    <div className="fixed bottom-8 right-8 z-20 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuoteIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-right"
        >
          <div className="text-white/90 font-serif text-lg md:text-xl leading-relaxed drop-shadow-lg">
            <div className="mb-2">{quotes[currentQuoteIndex].line1}</div>
            <div className="font-medium">{quotes[currentQuoteIndex].line2}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SimpleQuotes;