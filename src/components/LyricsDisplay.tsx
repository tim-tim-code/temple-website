import React, { useState, useEffect, useCallback } from 'react';

interface LyricsDisplayProps {
  quotes: string[];
  autoplay?: boolean;
  lineDurationMs?: number;
  startIndex?: number;
  onChange?: (pairStartIndex: number) => void;
  className?: string;
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  quotes,
  autoplay = true,
  lineDurationMs = 2500,
  startIndex = 0,
  onChange,
  className = ''
}) => {
  // Normalize quotes length to even number
  const normalizedQuotes = quotes.length % 2 === 0 ? quotes : [...quotes, ''];
  const totalPairs = normalizedQuotes.length / 2;
  
  // Normalize start index to even number
  const normalizedStartIndex = Math.max(0, Math.floor((startIndex || 0) / 2) * 2);
  
  const [pairStart, setPairStart] = useState(normalizedStartIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Get current and next line pairs
  const getCurrentPair = useCallback((index: number) => {
    const line1 = normalizedQuotes[index] || '';
    const line2 = normalizedQuotes[index + 1] || '';
    return [line1, line2];
  }, [normalizedQuotes]);

  const currentPair = getCurrentPair(pairStart);
  const nextPairIndex = (Math.floor(pairStart / 2) + 1) % totalPairs * 2;
  const nextPair = getCurrentPair(nextPairIndex);

  // Advance to next pair
  const advancePair = useCallback(() => {
    if (prefersReducedMotion) {
      // No animation for reduced motion
      const newPairStart = (Math.floor(pairStart / 2) + 1) % totalPairs * 2;
      setPairStart(newPairStart);
      onChange?.(newPairStart);
    } else {
      // Start crossfade transition
      setIsTransitioning(true);
      
      // After crossfade duration, update the pair and end transition
      setTimeout(() => {
        const newPairStart = (Math.floor(pairStart / 2) + 1) % totalPairs * 2;
        setPairStart(newPairStart);
        setIsTransitioning(false);
        onChange?.(newPairStart);
      }, 350); // 350ms crossfade duration
    }
  }, [pairStart, totalPairs, onChange, prefersReducedMotion]);

  // Auto-advance interval
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(advancePair, lineDurationMs);
    return () => clearInterval(interval);
  }, [autoplay, lineDurationMs, advancePair]);

  // Handle quotes change - reset to normalized start
  useEffect(() => {
    setPairStart(normalizedStartIndex);
    setIsTransitioning(false);
  }, [quotes, normalizedStartIndex]);

  const crossfadeDuration = prefersReducedMotion ? '0ms' : '350ms';

  return (
    <div 
      className={`relative ${className}`}
      aria-live="polite"
      aria-label="Tao Te Ching verses"
    >
      {/* Fixed height container for 2 lines */}
      <div className="relative h-20 md:h-24 lg:h-28 overflow-hidden">
        
        {/* Current pair */}
        <div
          className={`absolute inset-0 transition-opacity ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            transitionDuration: crossfadeDuration
          }}
        >
          <div className="flex flex-col justify-center h-full text-right space-y-2 md:space-y-3">
            {/* First line - slightly more prominent */}
            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed font-serif text-white px-4" style={{
              textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9), 0 0 24px rgba(0, 0, 0, 0.6)'
            }}>
              {currentPair[0]}
            </div>
            {/* Second line - slightly less prominent */}
            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed font-serif text-white/95 px-4" style={{
              textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9), 0 0 24px rgba(0, 0, 0, 0.6)'
            }}>
              {currentPair[1]}
            </div>
          </div>
        </div>

        {/* Next pair (only visible during crossfade) */}
        <div
          className={`absolute inset-0 transition-opacity ease-in-out ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transitionDuration: crossfadeDuration
          }}
        >
          <div className="flex flex-col justify-center h-full text-right space-y-2 md:space-y-3">
            {/* First line - slightly more prominent */}
            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed font-serif text-white px-4" style={{
              textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9), 0 0 24px rgba(0, 0, 0, 0.6)'
            }}>
              {nextPair[0]}
            </div>
            {/* Second line - slightly less prominent */}
            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed font-serif text-white/95 px-4" style={{
              textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9), 0 0 24px rgba(0, 0, 0, 0.6)'
            }}>
              {nextPair[1]}
            </div>
          </div>
        </div>
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute -bottom-8 left-0 text-xs text-paper/50">
          Pair: {Math.floor(pairStart / 2) + 1}/{totalPairs} | Transitioning: {isTransitioning ? 'Yes' : 'No'}
        </div>
      )}
    </div>
  );
};

export default LyricsDisplay;