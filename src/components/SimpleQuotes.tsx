import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface SimpleQuotesProps {
  showQuotes: boolean;
}

const SimpleQuotes: React.FC<SimpleQuotesProps> = ({ showQuotes }) => {
  const { t } = useLanguage();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [pausedTime, setPausedTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  
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

  // Simplified pause/resume timer logic
  useEffect(() => {
    if (!showQuotes) {
      // When hiding quotes, pause the timer and calculate elapsed time
      if (!isPaused) {
        const elapsed = Date.now() - startTime;
        setPausedTime(elapsed % 10000); // Store time within current quote cycle
        setIsPaused(true);
      }
      return;
    }

    // When showing quotes, set up the timer
    if (isPaused) {
      // Resuming - use remaining time for current quote
      const remainingTime = 10000 - pausedTime;
      const timeout = setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setPausedTime(0);
        setStartTime(Date.now());
      }, remainingTime);

      setIsPaused(false);
      return () => clearTimeout(timeout);
    } else {
      // Normal cycling
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setStartTime(Date.now());
      }, 10000);

      // Initialize start time if needed
      if (startTime === 0) {
        setStartTime(Date.now());
      }

      return () => clearInterval(interval);
    }
  }, [showQuotes, isPaused, pausedTime, quotes.length, startTime]);

  if (!showQuotes) return null;

  return (
    <div className="fixed bottom-8 right-8 z-20 pointer-events-none">
      <div className="flex items-end space-x-4">
        {/* Quote text on the left */}
        <div className="text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="text-white/90 font-serif text-xl md:text-2xl leading-relaxed drop-shadow-lg max-w-lg">
                <div className="mb-3">{quotes[currentQuoteIndex].line1}</div>
                {quotes[currentQuoteIndex].line2 && (
                  <div className="font-medium">{quotes[currentQuoteIndex].line2}</div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Attribution - always visible, outside animation */}
          <div className="text-white/70 text-base mt-4 font-light">– Lao Tzu, Tao Te Ching</div>
        </div>

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