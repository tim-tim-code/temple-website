import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LyricsDisplay from './LyricsDisplay';

interface TaoQuotesProps {
  version?: 1 | 2 | 3;
  showQuotes: boolean;
}

const TaoQuotes: React.FC<TaoQuotesProps> = ({ version = 1, showQuotes }) => {
  const { t } = useLanguage();
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  const taoLines = t('tao.lines') || [];
  const totalPairs = taoLines.length;

  // Cycle through line pairs every 7 seconds for version 2, 5 seconds for version 1
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPairIndex((prev) => (prev + 1) % totalPairs);
    }, version === 2 ? 7000 : 5000);
    return () => clearInterval(interval);
  }, [totalPairs, version]);

  // Mark as started after first transition
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), version === 2 ? 7000 : 5000);
    return () => clearTimeout(timer);
  }, [version]);

  if (version === 1) {
    // Original bottom corner implementation
    return (
      <div className={`fixed bottom-4 left-4 md:left-auto md:right-4 max-w-sm md:max-w-md z-20 pointer-events-none transition-all duration-500 ${showQuotes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="text-left md:text-right">
          {/* Intro text */}
          <p className="text-paper/80 text-xs md:text-sm font-serif mb-2 drop-shadow-md">
            {t('tao.intro')}
          </p>
          
          {/* Lyric-style animated lines */}
          <div className="relative h-16 md:h-20 overflow-hidden mb-2">
            <motion.div
              key={currentPairIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-sm md:text-xl lg:text-2xl font-serif text-paper leading-relaxed drop-shadow-lg"
            >
              {taoLines[currentPairIndex] && (
                <>
                  <div className="mb-1">{taoLines[currentPairIndex][0]}</div>
                  <div>{taoLines[currentPairIndex][1]}</div>
                </>
              )}
            </motion.div>
          </div>
          
          {/* Attribution */}
          <p className="text-paper/70 text-xs md:text-sm italic drop-shadow-md">
            {t('tao.attribution')}
          </p>
        </div>
      </div>
    );
  }

  // Version 3: Apple-Music-style lyrics with LyricsDisplay
  if (version === 3) {
    const quotesFlat = t('tao.quotesFlat');
    const quotesArray = (Array.isArray(quotesFlat) ? quotesFlat : []) as string[];
    
    return (
      <div className={`fixed bottom-12 right-12 max-w-lg z-20 pointer-events-none transition-all duration-500 ${showQuotes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Glass background for better readability */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/30 backdrop-blur-sm rounded-2xl border border-white/10"></div>
          <div className="relative text-right p-6">
            {/* Intro text */}
            <p className="text-white/90 text-base font-serif mb-4" style={{
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)'
            }}>
              {t('tao.intro')}
            </p>
            
            {/* Apple-Music-style lyrics */}
            <LyricsDisplay
              quotes={quotesArray}
              autoplay={true}
              lineDurationMs={2500}
              className="mb-4"
            />
            
            {/* Attribution - right aligned */}
            <p className="text-white/80 text-sm italic text-right" style={{
              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
            }}>
              {t('tao.attribution')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Version 2: Bottom-right corner with flowing upward animation
  const getPreviousIndex = (current: number) => (current - 1 + totalPairs) % totalPairs;
  const getNextIndex = (current: number) => (current + 1) % totalPairs;
  const getPreviousPreviousIndex = (current: number) => (current - 2 + totalPairs) % totalPairs;

  return (
    <div className={`fixed bottom-12 right-12 max-w-lg z-20 pointer-events-none transition-all duration-500 ${showQuotes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-right">
        {/* Intro text */}
        <p className="text-paper/80 text-sm font-serif mb-4 drop-shadow-md">
          {t('tao.intro')}
        </p>
        
        {/* Flowing text container */}
        <div className="relative h-32 overflow-hidden">
          {/* Previous-previous lines (fading out at top) */}
          {hasStarted && (
            <motion.div
              key={`prevprev-${currentPairIndex}`}
              animate={{ 
                y: -60,
                opacity: 0.1,
                scale: 0.7
              }}
              transition={{ duration: 7, ease: "linear" }}
              className="absolute top-0 right-0 text-xs font-serif text-paper/30 leading-relaxed drop-shadow-sm"
            >
              {taoLines[getPreviousPreviousIndex(currentPairIndex)] && (
                <>
                  <div className="mb-1">{taoLines[getPreviousPreviousIndex(currentPairIndex)][0]}</div>
                  <div>{taoLines[getPreviousPreviousIndex(currentPairIndex)][1]}</div>
                </>
              )}
            </motion.div>
          )}

          {/* Previous lines (moving up, getting smaller) */}
          {hasStarted && (
            <motion.div
              key={`prev-${currentPairIndex}`}
              animate={{ 
                y: -30,
                opacity: 0.3,
                scale: 0.8
              }}
              transition={{ duration: 7, ease: "linear" }}
              className="absolute top-6 right-0 text-sm font-serif text-paper/50 leading-relaxed drop-shadow-md"
            >
              {taoLines[getPreviousIndex(currentPairIndex)] && (
                <>
                  <div className="mb-1">{taoLines[getPreviousIndex(currentPairIndex)][0]}</div>
                  <div>{taoLines[getPreviousIndex(currentPairIndex)][1]}</div>
                </>
              )}
            </motion.div>
          )}

          {/* Current lines (main focus, moving up slowly) */}
          <motion.div
            key={`current-${currentPairIndex}`}
            initial={{ y: 60, opacity: 0, scale: 0.9 }}
            animate={{ 
              y: 0,
              opacity: 1,
              scale: 1
            }}
            transition={{ duration: 7, ease: "linear" }}
            className="absolute top-12 right-0 text-base md:text-lg lg:text-xl font-serif text-paper leading-relaxed drop-shadow-lg"
          >
            {taoLines[currentPairIndex] && (
              <>
                <div className="mb-2">{taoLines[currentPairIndex][0]}</div>
                <div>{taoLines[currentPairIndex][1]}</div>
              </>
            )}
          </motion.div>

          {/* Next lines (starting from bottom, fading in) */}
          <motion.div
            key={`next-${currentPairIndex}`}
            initial={{ y: 90, opacity: 0, scale: 0.9 }}
            animate={{ 
              y: 30,
              opacity: 0.5,
              scale: 0.9
            }}
            transition={{ duration: 7, ease: "linear" }}
            className="absolute bottom-0 right-0 text-sm font-serif text-paper/60 leading-relaxed drop-shadow-md"
          >
            {taoLines[getNextIndex(currentPairIndex)] && (
              <>
                <div className="mb-1">{taoLines[getNextIndex(currentPairIndex)][0]}</div>
                <div>{taoLines[getNextIndex(currentPairIndex)][1]}</div>
              </>
            )}
          </motion.div>
        </div>
        
        {/* Attribution - right aligned */}
        <p className="text-paper/70 text-sm italic drop-shadow-md mt-4 text-right">
          {t('tao.attribution')}
        </p>
      </div>
    </div>
  );
};

export default TaoQuotes;