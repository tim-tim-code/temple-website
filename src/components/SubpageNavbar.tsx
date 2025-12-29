import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import BritishFlag from './flags/BritishFlag';
import GermanFlag from './flags/GermanFlag';
import FrenchFlag from './flags/FrenchFlag';

interface SubpageNavbarProps {
  backTo?: string;
  backLabel?: string;
  title?: string;
}

const SubpageNavbar: React.FC<SubpageNavbarProps> = ({
  backTo = '/',
  backLabel = 'Back',
  title
}) => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const { cart, openCart } = useCart();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const languages = [
    { code: 'en', flag: BritishFlag, name: 'English' },
    { code: 'de', flag: GermanFlag, name: 'Deutsch' },
    { code: 'fr', flag: FrenchFlag, name: 'Français' }
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as 'en' | 'de' | 'fr');
    setIsLanguageOpen(false);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 shadow-lg flex items-center justify-between w-full max-w-4xl"
      >
        {/* Left Side - Back Button */}
        <motion.button
          onClick={() => navigate(backTo)}
          className="flex items-center space-x-2 px-4 py-2 rounded-full text-forest/80 hover:text-forest hover:bg-white/20 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium text-sm">{backLabel}</span>
        </motion.button>

        {/* Center - Title */}
        {title && (
          <span className="absolute left-1/2 -translate-x-1/2 text-lg font-serif text-forest">
            {title}
          </span>
        )}

        {/* Right Side - Cart & Language */}
        <div className="flex items-center space-x-2">
          {/* Cart Button - Only shows when cart has items */}
          <AnimatePresence>
            {cart.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: 'auto' }}
                exit={{ opacity: 0, scale: 0.8, width: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <motion.button
                  onClick={openCart}
                  className="relative w-14 h-14 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-full overflow-hidden">
                    <div className="absolute inset-0 opacity-10"
                         style={{
                           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                           mixBlendMode: 'overlay'
                         }}
                    />
                  </div>
                  <div className="absolute inset-0 border border-white/20 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-5 h-5 text-forest/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className="absolute top-3 right-3 w-2 h-2 bg-sage rounded-full"></div>
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Language Selector */}
        <div className="relative">
          <motion.div
            ref={containerRef}
            className="relative overflow-hidden cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              width: isLanguageOpen ? "160px" : "56px",
              height: "56px",
              borderRadius: "28px"
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl"
                 style={{ borderRadius: "inherit" }}>
              <div className="absolute inset-0 opacity-10"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                     mixBlendMode: 'overlay'
                   }}
              />
            </div>

            <div className="absolute inset-0 border border-white/20 rounded-[inherit]"></div>

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

            <div className="relative w-full h-full flex items-center justify-center">
              {!isLanguageOpen ? (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <currentLang.flag className="w-5 h-3 rounded-sm border border-white/20" />
                </motion.div>
              ) : (
                <motion.div
                  className="w-full flex items-center justify-between px-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {languages.map((lang, index) => (
                    <motion.button
                      key={lang.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageChange(lang.code);
                      }}
                      onMouseEnter={() => setHoveredLanguage(lang.code)}
                      onMouseLeave={() => setHoveredLanguage(null)}
                      className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all"
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.1, duration: 0.2 }}
                    >
                      {(lang.code === (hoveredLanguage || language)) && (
                        <motion.div
                          className="absolute inset-0 rounded-full overflow-hidden"
                          layoutId="subpageLanguageBubble"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-full"></div>
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full"></div>
                          <div className="absolute top-1 left-2 right-2 h-3 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-sm"></div>
                        </motion.div>
                      )}
                      <lang.flag className="w-5 h-3 rounded-sm border border-white/20 relative z-10" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {isLanguageOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 -z-10"
                onClick={() => setIsLanguageOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubpageNavbar;
