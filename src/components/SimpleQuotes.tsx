import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface SimpleQuotesProps {}

const SimpleQuotes: React.FC<SimpleQuotesProps> = () => {
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
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [quotes.length]);

  // Always show quotes - remove showQuotes condition
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none">
      <div className="flex items-center space-x-6">
        {/* Quote text on the left */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuoteIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-right"
          >
            <div className="text-white/90 font-serif text-xl md:text-2xl leading-relaxed drop-shadow-lg max-w-lg">
              <div className="mb-3">{quotes[currentQuoteIndex].line1}</div>
              {quotes[currentQuoteIndex].line2 && (
                <div className="font-medium">{quotes[currentQuoteIndex].line2}</div>
              )}
              
              {/* Attribution - always visible */}
              <div className="text-white/70 text-base mt-3 font-light">– Lao Tzu, Tao Te Ching</div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Vertical progress line on the right */}
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-32 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="w-full bg-white/70 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                height: `${((currentQuoteIndex + 1) / quotes.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleQuotes;