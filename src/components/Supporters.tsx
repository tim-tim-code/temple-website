import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import supporters from '../data/instructors.json';
import { useLanguage } from '../context/LanguageContext';

const Supporters: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoRotationKey, setAutoRotationKey] = useState(0);

  // Auto-rotation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % supporters.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [supporters.length, autoRotationKey]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % supporters.length);
    setAutoRotationKey(prev => prev + 1); // Reset timer
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + supporters.length) % supporters.length);
    setAutoRotationKey(prev => prev + 1); // Reset timer
  };

  // Calculate position for each supporter based on currentIndex
  const getSupporterPosition = (supporterIndex: number) => {
    // Calculate the relative position from current center
    let diff = supporterIndex - currentIndex;

    // Normalize to range [-2, 2] for 5 positions
    if (diff > 2) diff -= supporters.length;
    if (diff < -2) diff += supporters.length;

    switch (diff) {
      case -2: return 'far-left';
      case -1: return 'left';
      case 0: return 'center';
      case 1: return 'right';
      case 2: return 'far-right';
      default: return 'hidden';
    }
  };

  // Get all supporters with their positions
  const allSupportersWithPositions = supporters.map((supporter, index) => ({
    ...supporter,
    position: getSupporterPosition(index)
  }));

  return (
    <section id="supporters" className="py-20 bg-sage/15">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-forest text-center">
          {t('nav.supporters')}
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6">
        {/* Navigation Buttons */}
        {supporters.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute -left-12 top-1/2 -translate-y-1/2 z-[10] bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-200 border border-sage/20"
            >
              <svg className="w-6 h-6 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute -right-12 top-1/2 -translate-y-1/2 z-[10] bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-200 border border-sage/20"
            >
              <svg className="w-6 h-6 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Supporters Display */}
        <div className="relative w-full min-h-[500px] px-4">
          <div className="absolute inset-0 flex justify-center items-center">
          {allSupportersWithPositions.map((supporter, index) => (
            <motion.div
              key={supporter.id}
              className="absolute"
              style={{ left: '50%', top: '50%' }}
              animate={{
                opacity: supporter.position === 'far-left' || supporter.position === 'far-right' ? 0.4 : 1,
                scale: supporter.position === 'center' ? 1 :
                       supporter.position === 'left' || supporter.position === 'right' ? 0.85 :
                       0.7, // far positions
                x: supporter.position === 'far-left' ? -640 :
                   supporter.position === 'left' ? -440 :
                   supporter.position === 'center' ? -160 :
                   supporter.position === 'right' ? 120 :
                   320, // far-right
                y: -200, // Center vertically by moving up half card height
                zIndex: supporter.position === 'center' ? 30 :
                        supporter.position === 'left' || supporter.position === 'right' ? 20 : 10
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{
                y: supporter.position === 'center' || supporter.position === 'left' || supporter.position === 'right' ? -210 : -200,
                scale: supporter.position === 'center' ? 1.02 :
                       supporter.position === 'left' || supporter.position === 'right' ? 0.87 : 0.72
              }}
            >
              {/* Supporter Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-sage/20 hover:shadow-xl transition-all duration-300 flex flex-col w-80">
                {/* Full Width Image Container */}
                <div className="relative w-full overflow-hidden h-64">
                  <div className="w-full h-full bg-gradient-to-br from-sage/20 to-forest/10">
                    <motion.img
                      src={supporter.image}
                      alt={supporter.name}
                      className={`w-full h-full object-cover ${
                        supporter.name === 'Janine Jutima' ? 'object-[center_top]' : 'object-center'
                      }`}
                      loading="lazy"
                      whileHover={{
                        scale: supporter.position === 'center' ? 1.05 :
                               supporter.position === 'left' || supporter.position === 'right' ? 1.02 : 1
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback initials */}
                    <div
                      className="w-full h-full bg-gradient-to-br from-sage/30 to-forest/20 hidden items-center justify-center"
                      style={{ display: 'none' }}
                    >
                      <span className="text-forest font-serif font-medium text-4xl">
                        {supporter.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="text-center flex-1 flex flex-col justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-serif text-forest mb-2">
                      {supporter.name}
                    </h3>
                    <p className="text-sage font-medium uppercase tracking-wide text-sm mb-3">
                      {supporter.role}
                    </p>
                    <p className="text-soil text-sm leading-relaxed mb-4">
                      {supporter.bio}
                    </p>
                  </div>

                  {/* Learn More Button - interactive for center and adjacent cards */}
                  <motion.button
                    className={`px-4 py-2 text-sm rounded-lg transition-colors border font-medium ${
                      supporter.position === 'center'
                        ? 'bg-sage/20 hover:bg-sage/30 text-sage-800 border-sage/40 cursor-pointer'
                        : supporter.position === 'left' || supporter.position === 'right'
                        ? 'bg-sage/15 hover:bg-sage/25 text-sage-700 border-sage/30 cursor-pointer'
                        : 'bg-sage/5 text-sage-500 border-sage/20 cursor-default'
                    }`}
                    whileHover={
                      supporter.position === 'center' ? { scale: 1.02 } :
                      supporter.position === 'left' || supporter.position === 'right' ? { scale: 1.01 } : {}
                    }
                    whileTap={
                      supporter.position === 'center' ? { scale: 0.98 } :
                      supporter.position === 'left' || supporter.position === 'right' ? { scale: 0.99 } : {}
                    }
                    onClick={() => {
                      if (supporter.position === 'center' || supporter.position === 'left' || supporter.position === 'right') {
                        console.log('Learn more about', supporter.name);
                      }
                    }}
                    disabled={supporter.position === 'far-left' || supporter.position === 'far-right'}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        {/* Dots indicator */}
        {supporters.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {supporters.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoRotationKey(prev => prev + 1); // Reset timer
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-forest w-6'
                    : 'bg-sage/40 hover:bg-sage/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Supporters;