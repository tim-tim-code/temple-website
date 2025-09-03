import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import BritishFlag from './flags/BritishFlag';
import GermanFlag from './flags/GermanFlag';
import FrenchFlag from './flags/FrenchFlag';

interface Language {
  code: string;
  flag: React.ComponentType<{ className?: string }>;
  name: string;
}

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Spring animations for bubble effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });


  // Transform for glass distortion effect - disabled for now to fix cursor tracking
  // const distortionX = useTransform(smoothMouseX, (value) => (value - 84) * 0.1);
  // const distortionY = useTransform(smoothMouseY, (value) => (value - 28) * 0.1);

  const languages: Language[] = [
    { code: 'en', flag: BritishFlag, name: 'English' },
    { code: 'de', flag: GermanFlag, name: 'Deutsch' },
    { code: 'fr', flag: FrenchFlag, name: 'Français' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  // Hide language selector on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY <= 100;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  };

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
      <div className="relative">
        {/* Main Language Container */}
        <motion.div
          ref={containerRef}
          className="relative overflow-hidden cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            width: isOpen ? "168px" : "56px",
            height: "56px",
            borderRadius: "28px"
          }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Base glass layer with texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl" 
               style={{ borderRadius: "inherit" }}>
            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                   mixBlendMode: 'overlay'
                 }}
            />
          </div>
          
          {/* Glass border */}
          <div className="absolute inset-0 border border-white/20 rounded-[inherit]"></div>
          
          {/* Dynamic bubble light that follows cursor */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ borderRadius: "inherit" }}
          >
            <motion.div
              className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2"
              style={{
                x: smoothMouseX,
                y: smoothMouseY,
                background: `radial-gradient(circle at center, rgba(255,255,255,0.25), transparent 60%)`,
                filter: 'blur(10px)'
              }}
            />
          </motion.div>
          
          {/* Secondary floating light */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{ borderRadius: "inherit" }}
            animate={{
              background: [
                `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15), transparent 40%)`,
                `radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15), transparent 40%)`,
                `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15), transparent 40%)`
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Content */}
          <div className="relative w-full h-full flex items-center justify-center">
            {!isOpen ? (
              // Single centered flag when closed
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <currentLang.flag className="w-6 h-4 rounded-sm border border-white/20" />
              </motion.div>
            ) : (
              // All flags when open
              <motion.div
                className="w-full flex items-center justify-between px-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {languages.map((language, index) => (
                  <motion.button
                    key={language.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageSelect(language.code);
                    }}
                    className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.05 + 0.1,
                      duration: 0.4,
                      ease: [0.32, 0.72, 0, 1]
                    }}
                  >
                    {/* Selected glass bubble - only show when expanded */}
                    {language.code === currentLanguage && (
                        <motion.div
                          className="absolute inset-0 rounded-full overflow-hidden"
                          layoutId="selectedBubble"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            duration: 0.4,
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                            delay: 0.2
                          }}
                        >
                          {/* Multi-layer glass effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-full"></div>
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full"></div>
                          <div className="absolute inset-[2px] border border-white/40 rounded-full"></div>
                          
                          {/* Bubble highlight */}
                          <div className="absolute top-1 left-2 right-2 h-3 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-sm"></div>
                          
                          {/* Subtle shimmer animation */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                            animate={{
                              x: [-100, 100],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      )}
                      
                      {/* Flag */}
                      <language.flag className="w-5 h-3 rounded-sm border border-white/20 relative z-10" />
                    </motion.button>
                  ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Backdrop to close on outside click */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageSelector;