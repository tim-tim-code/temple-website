import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface SimpleQuotesProps {
  showQuotes: boolean;
}

const SimpleQuotes: React.FC<SimpleQuotesProps> = ({ showQuotes }) => {
  const { t } = useLanguage();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  
  // Lao Tzu - Tao Te Ching quote pairs
  const quotes = [
    {
      line1: "Thus it is said:",
      line2: "The path into the light seems dark,"
    },
    {
      line1: "the path forward seems to go back,",
      line2: "the direct path seems long,"
    },
    {
      line1: "true power seems weak,",
      line2: "true purity seems tarnished,"
    },
    {
      line1: "true steadfastness seems",
      line2: "changeable,"
    },
    {
      line1: "true clarity seems obscure,",
      line2: "the greatest are seems"
    },
    {
      line1: "unsophisticated,",
      line2: "the greatest love seems indifferent,"
    },
    {
      line1: "the greatest wisdom seems childish.",
      line2: ""
    },
    {
      line1: "The Tao is nowhere to be found.",
      line2: "Yet it nourishes and completes all things."
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
          <div className="text-white/90 font-serif text-xl md:text-2xl leading-relaxed drop-shadow-lg max-w-lg">
            <div className="mb-3">{quotes[currentQuoteIndex].line1}</div>
            {quotes[currentQuoteIndex].line2 && (
              <div className="font-medium">{quotes[currentQuoteIndex].line2}</div>
            )}
            
            {/* Continuity indicator */}
            {currentQuoteIndex < quotes.length - 1 && (
              <div className="text-white/50 text-sm mt-2">...</div>
            )}
            
            {/* Attribution - show on last quote */}
            {currentQuoteIndex === quotes.length - 1 && (
              <div className="text-white/70 text-base mt-3 font-light">– Lao Tzu, Tao Te Ching</div>
            )}
            
            {/* Progress dots - always visible */}
            <div className="flex justify-end space-x-1 mt-4">
              {quotes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentQuoteIndex 
                      ? 'bg-white/80 scale-110' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SimpleQuotes;