import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const MorphingText: React.FC = () => {
  const [currentText, setCurrentText] = useState('Temple of the Great Forest');
  const [isChanging, setIsChanging] = useState(false);
  
  const texts = ['Temple of the Great Forest', 'DaLinSi'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      
      // After fade out completes, change the text and fade in
      setTimeout(() => {
        setCurrentText(prev => prev === texts[0] ? texts[1] : texts[0]);
        setIsChanging(false);
      }, 500); // 0.5 seconds for fade out
      
    }, 7000); // Change every 7 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ opacity: isChanging ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {currentText}
    </motion.div>
  );
};

const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  // Hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY <= 100;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-6 left-6 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
      <div className="flex items-center space-x-3">
        {/* Logo */}
        <img src="/images/DaLinSi logo white 4k Kopie.png" alt="DaLinSi Temple Logo" className="w-16 h-16 object-contain" />
        
        {/* Morphing Temple name */}
        <h1 className="text-white/90 font-serif text-lg sm:text-xl font-medium">
          <MorphingText />
        </h1>
      </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;