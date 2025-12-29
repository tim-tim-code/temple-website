import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import BritishFlag from './flags/BritishFlag';
import GermanFlag from './flags/GermanFlag';
import FrenchFlag from './flags/FrenchFlag';
import AnimatedButton from './AnimatedButton';

const ScrollNavigation: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const { cart, openCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('about');
  const containerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  
  // Spring animations for bubble effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  // Transform values for cursor bubble positioning
  const cursorBubbleX = useTransform(smoothMouseX, (value: number) => `calc(${value}px)`);
  const cursorBubbleY = useTransform(smoothMouseY, (value: number) => `calc(${value}px)`);

  // Navigation sections with translations
  const sections = [
    { id: 'about', label: t('nav.about'), element: 'about' },
    { id: 'forwhom', label: t('nav.forwhom'), element: 'forwhom' },
    { id: 'animals', label: t('nav.animals'), element: 'animals' },
    { id: 'supporters', label: t('nav.supporters'), element: 'supporters' },
    { id: 'faq', label: t('nav.faq'), element: 'faq-preview' },
    { id: 'help', label: t('nav.support'), element: 'support', isSpecial: true }
  ];

  const languages = [
    { code: 'en', flag: BritishFlag, name: 'English' },
    { code: 'de', flag: GermanFlag, name: 'Deutsch' },
    { code: 'fr', flag: FrenchFlag, name: 'Français' }
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  // Show/hide navigation on scroll and track active section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);

      // Check which section is currently in view
      const sectionsToCheck = ['about', 'forwhom', 'animals', 'supporters', 'faq', 'support'];
      const currentSection = sectionsToCheck.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80; // Account for navigation height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleNavigation = (section: any) => {
    if (section.isLink && section.href) {
      navigate(section.href);
    } else {
      scrollToSection(section.element);
    }
  };

  // Handle mouse move for glass effect
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

  // Handle mouse move for nav glass effect
  const handleNavMouseMove = (e: React.MouseEvent) => {
    if (!navContainerRef.current) return;
    const rect = navContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleNavMouseLeave = () => {
    if (!navContainerRef.current) return;
    const rect = navContainerRef.current.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  };

  // Handle language change
  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as 'en' | 'de' | 'fr');
    setIsLanguageOpen(false);
  };

  return (
    <>
      {/* Initial Language Selector and Support Button - Shows on Hero page, fades when navbar appears */}
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 right-4 z-50 flex items-center space-x-3"
          >
            {/* Support Us Button - Desktop Only */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            >
              <AnimatedButton
                onClick={() => scrollToSection('support')}
                className="px-6 py-3 text-sm"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-forest flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  <span className="whitespace-nowrap">{t('nav.support')}</span>
                </div>
              </AnimatedButton>
            </motion.div>

            {/* Cart Button - Only shows when cart has items */}
            <AnimatePresence>
              {cart.items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <motion.button
                    onClick={openCart}
                    className="relative w-14 h-14 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glass background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-full overflow-hidden">
                      <div className="absolute inset-0 opacity-10"
                           style={{
                             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                             mixBlendMode: 'overlay'
                           }}
                      />
                    </div>
                    <div className="absolute inset-0 border border-white/20 rounded-full"></div>

                    {/* Cart Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-5 h-5 text-forest/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {/* Small dot indicator */}
                      <div className="absolute top-3 right-3 w-2 h-2 bg-sage rounded-full"></div>
                    </div>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

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
                  {!isLanguageOpen ? (
                    // Single centered flag when closed
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
                    // All flags when open
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
                          transition={{ 
                            delay: index * 0.05 + 0.1,
                            duration: 0.2
                          }}
                        >
                          {/* Glass bubble - smoothly moves between flags */}
                          {(lang.code === (hoveredLanguage || language)) && (
                              <motion.div
                                className="absolute inset-0 rounded-full overflow-hidden"
                                layoutId="languageBubbleTop"
                                transition={{ 
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 30
                                }}
                              >
                                {/* Multi-layer glass effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-full"></div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full"></div>
                                
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
                            <lang.flag className="w-5 h-3 rounded-sm border border-white/20 relative z-10" />
                          </motion.button>
                        ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Backdrop to close on outside click */}
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
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
      {isVisible && (
        <>
          {/* Mobile Hamburger Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 shadow-lg w-12 h-12 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span 
                className="block w-full h-0.5 bg-forest"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 9 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="block w-full h-0.5 bg-forest"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="block w-full h-0.5 bg-forest"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -9 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed top-20 right-4 z-40 bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl p-4 shadow-xl min-w-[200px]"
              >
                <nav className="flex flex-col space-y-3">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        handleNavigation(section);
                        setIsMobileMenuOpen(false);
                      }}
                      className={section.isSpecial ? 
                        "text-left px-4 py-3 rounded-xl bg-gradient-to-r from-sage/40 to-leaf/30 border border-sage/50 text-forest font-medium" :
                        "text-left px-4 py-3 rounded-xl text-forest/80 hover:bg-white/30 transition-colors duration-200"
                      }
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Navigation Bar */}
          <div className="hidden md:flex fixed top-4 left-0 right-0 justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Main Navigation Pill */}
              <div className="relative">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                {/* Logo */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src="/images/Logos/DaLinSi logo white no signs.png"
                    alt="DaLinSi"
                    className="h-10 w-auto"
                  />
                </button>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-2 ml-6">
                  {sections.map((section) => (
                    <div key={section.id} className="relative">
                      {section.isSpecial ? (
                        // Special "Help us" button with animated gradient effect
                        <AnimatedButton
                          onClick={() => handleNavigation(section)}
                          className="px-6 py-2.5 text-base"
                        >
                          {section.label}
                        </AnimatedButton>
                      ) : (
                        // Regular navigation links with glass bubble effect like language selector
                        <motion.button
                          onClick={() => handleNavigation(section)}
                          className="relative text-base font-medium text-forest/80 hover:text-forest transition-colors duration-200 px-5 py-2.5 rounded-full"
                          onMouseEnter={() => setHoveredNavItem(section.id)}
                          onMouseLeave={() => setHoveredNavItem(null)}
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {/* Glass bubble - smoothly moves between nav items and follows active section */}
                          {(hoveredNavItem === section.id || (activeSection === section.id && !hoveredNavItem)) && (
                            <motion.div
                              className="absolute inset-0 rounded-full overflow-hidden"
                              layoutId="navGlassBubble"
                              transition={{ 
                                type: "spring",
                                stiffness: 400,
                                damping: 30
                              }}
                            >
                              {/* Multi-layer glass effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-full"></div>
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full"></div>
                              
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
                          
                          <span className="relative z-10">{section.label}</span>
                        </motion.button>
                      )}
                    </div>
                  ))}
                </nav>


                {/* Cart Button in Navbar - Only shows when cart has items */}
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
                        {/* Glass background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-full overflow-hidden">
                          <div className="absolute inset-0 opacity-10"
                               style={{
                                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                                 mixBlendMode: 'overlay'
                               }}
                          />
                        </div>
                        <div className="absolute inset-0 border border-white/20 rounded-full"></div>

                        {/* Cart Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-5 h-5 text-forest/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {/* Small dot indicator */}
                          <div className="absolute top-3 right-3 w-2 h-2 bg-sage rounded-full"></div>
                        </div>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Language Selector - Exact copy of original design */}
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
                      {!isLanguageOpen ? (
                        // Single centered flag when closed
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
                        // All flags when open
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
                              transition={{ 
                                delay: index * 0.05 + 0.1,
                                duration: 0.2
                              }}
                            >
                              {/* Glass bubble - smoothly moves between flags */}
                              {(lang.code === (hoveredLanguage || language)) && (
                                  <motion.div
                                    className="absolute inset-0 rounded-full overflow-hidden"
                                    layoutId="languageBubbleNavbar"
                                    transition={{ 
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 30
                                    }}
                                  >
                                    {/* Multi-layer glass effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-full"></div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full"></div>
                                        
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
                                <lang.flag className="w-5 h-3 rounded-sm border border-white/20 relative z-10" />
                              </motion.button>
                            ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Backdrop to close on outside click */}
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
            </div>
          </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default ScrollNavigation;