import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import AnimatedButton from './AnimatedButton';

const FloatingNewsletterIcon: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const newsletterSection = document.getElementById('newsletter');
      const scrollY = window.scrollY;
      const isAtTop = scrollY < 300; // Hide if within 300px of top

      if (newsletterSection) {
        const rect = newsletterSection.getBoundingClientRect();
        const isNewsletterVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

        // Hide if at top of page OR if newsletter section is visible
        setIsVisible(!isAtTop && !isNewsletterVisible);

        if ((isNewsletterVisible || isAtTop) && isExpanded) {
          setIsExpanded(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && gdprConsent) {
      console.log('Newsletter signup:', email);
      alert('Thank you! We will keep you updated on the Temple.');
      setEmail('');
      setGdprConsent(false);
      setIsExpanded(false);
    }
  };

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <AnimatePresence>
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.8, originX: 1, originY: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 p-6 w-80 max-w-[90vw]"
              >
                {/* Header with close button */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-serif text-forest">Keep me up to date</h3>
                  <motion.button
                    onClick={handleToggleExpanded}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 hover:bg-sage/20 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <p className="text-soil/80 text-sm mb-4">
                  Stay informed about the Temple's progress and upcoming activities.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('hero.email.placeholder')}
                      required
                      className="w-full px-3 py-2 bg-white/50 border border-sage/30 rounded-lg text-forest placeholder-forest/50 focus:outline-none focus:ring-2 focus:ring-sage/30 transition-all duration-200 text-sm"
                    />
                  </div>

                  <div className="flex items-start">
                    <motion.div
                      className="relative mt-1 mr-3"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="checkbox"
                        id="floating-gdpr"
                        checked={gdprConsent}
                        onChange={(e) => setGdprConsent(e.target.checked)}
                        required
                        className="appearance-none w-4 h-4 rounded border-2 border-forest/30 bg-white/50 checked:bg-sage/30 checked:border-sage/50 transition-all duration-200 cursor-pointer"
                      />
                      {gdprConsent && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-0 left-0 w-4 h-4 text-forest pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </motion.div>
                    <label htmlFor="floating-gdpr" className="text-xs text-forest/70 leading-relaxed cursor-pointer text-left">
                      {t('hero.gdpr')}
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!email || !gdprConsent}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2 bg-sage/40 hover:bg-sage/50 disabled:bg-sage/20 disabled:cursor-not-allowed text-forest border border-sage/60 rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    {t('hero.email.button')}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                onClick={handleToggleExpanded}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 bg-sage/40 hover:bg-sage/50 backdrop-blur-md rounded-full shadow-2xl border border-white/40 flex items-center justify-center group"
              >
                <motion.svg
                  className="w-6 h-6 text-forest"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 10 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </motion.svg>

                {/* Pulse animation ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-sage/60"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNewsletterIcon;