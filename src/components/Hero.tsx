import React, { useState, useEffect, useRef } from 'react';
import TexturedGlass from './TexturedGlass';
import GlassButton from './GlassButton';
import TaoQuotes from './TaoQuotes';
import heroBackground from '../assets/hero-background.jpg';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [showQuotes, setShowQuotes] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [nudgeAnimation, setNudgeAnimation] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Show scroll indicator after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Nudge animation every 5 seconds
  useEffect(() => {
    if (showScrollIndicator) {
      const interval = setInterval(() => {
        setNudgeAnimation(true);
        setTimeout(() => setNudgeAnimation(false), 800);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showScrollIndicator]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        // Show quotes only when Hero section fills the entire viewport
        const isVisible = rect.bottom >= window.innerHeight;
        setShowQuotes(isVisible);
        
        // Show scroll indicator only when at top of page and quotes are visible
        if (window.scrollY === 0 && isVisible) {
          // Reshow scroll indicator after 3 seconds when back at top
          setTimeout(() => setShowScrollIndicator(true), 3000);
        } else {
          setShowScrollIndicator(false);
        }
      }
    };

    // Check initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showQuotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && gdprConsent) {
      console.log('Email signup:', email);
      alert('Thank you for your interest. We will keep you updated on our progress.');
    }
  };

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-forest bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground}), linear-gradient(135deg, #002E19 0%, #4A2F1E 100%)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between min-h-screen">
        {/* Main content in textured glass */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start min-h-screen">
          <TexturedGlass className="p-6 md:p-10 w-full max-w-md">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white/90 mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              
              <p className="text-lg text-white/80 mb-8">
                Keep me informed about the Temple.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 md:mb-4">
                  <motion.div
                    className="relative overflow-hidden rounded-xl"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Glass input background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl"></div>
                    <div className="absolute inset-0 border border-white/20 rounded-xl"></div>
                    
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('hero.email.placeholder')}
                      required
                      className="relative w-full px-3 py-2 md:px-4 md:py-3 rounded-xl bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                    />
                  </motion.div>
                </div>
                
                <div className="mb-4 md:mb-6 flex items-start">
                  <motion.div
                    className="relative mt-1 mr-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glass checkbox wrapper */}
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="gdpr"
                        checked={gdprConsent}
                        onChange={(e) => setGdprConsent(e.target.checked)}
                        required
                        className="appearance-none w-5 h-5 rounded border-2 border-white/30 bg-white/10 backdrop-blur-sm checked:bg-white/30 checked:border-white/50 transition-all duration-200 cursor-pointer"
                      />
                      {gdprConsent && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </div>
                  </motion.div>
                  <label htmlFor="gdpr" className="text-sm text-white/70 leading-relaxed cursor-pointer">
                    {t('hero.gdpr')}
                  </label>
                </div>

                <GlassButton
                  type="submit"
                  variant="green-glass"
                  className="w-full"
                >
                  {t('hero.email.button')}
                </GlassButton>
              </form>
            </div>
          </TexturedGlass>
        </div>

      {/* Tao Quotes - Version 3: Apple-Music-style lyrics - Hidden on mobile */}
      <div className="hidden md:block">
        <TaoQuotes version={3} showQuotes={showQuotes} />
      </div>
      
      {/* Scroll indicator arrow */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0, y: showScrollIndicator ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`flex flex-col items-center ${nudgeAnimation ? 'animate-nudge' : ''}`}>
          <svg 
            width="40" 
            height="20" 
            viewBox="0 0 40 20" 
            fill="none" 
            className="text-white/60 mb-2"
          >
            <path 
              d="M5 8L20 16L35 8" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-white/60 text-sm font-light tracking-wide">Learn more</span>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default Hero;