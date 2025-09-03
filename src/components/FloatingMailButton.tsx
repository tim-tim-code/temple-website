import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import GlassButton from './GlassButton';
import Notification from './Notification';

const FloatingMailButton: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'error' | 'success' | 'info'} | null>(null);

  // Custom email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showNotification = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    setNotification({ message, type });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      showNotification('Bitte geben Sie eine E-Mail-Adresse ein');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein');
      return;
    }
    
    if (!gdprConsent) {
      showNotification('Bitte akzeptieren Sie die Datenschutzbestimmungen');
      return;
    }
    
    console.log('Newsletter signup:', email);
    showNotification('Vielen Dank! Sie werden über Neuigkeiten informiert.', 'success');
    setEmail('');
    setGdprConsent(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Notification */}
      <Notification
        message={notification?.message || ''}
        type={notification?.type || 'error'}
        isVisible={notification !== null}
        onClose={() => setNotification(null)}
      />
      {/* Floating Mail Button - Mobile Only */}
      <motion.button
        className="md:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <svg 
          className="w-6 h-6 text-forest" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
          />
        </svg>
      </motion.button>

      {/* Newsletter Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-8 w-full max-w-md shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sage/40 to-leaf/30 flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-white mb-2">
                    {t('newsletter.title') || 'Stay Connected'}
                  </h3>
                  
                  <p className="text-white/80">
                    {t('newsletter.description') || 'Subscribe to our newsletter and stay updated about the Temple.'}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('hero.email.placeholder')}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    />
                  </div>

                  {/* GDPR Checkbox */}
                  <div className="flex items-start space-x-3">
                    <motion.div
                      className="relative mt-1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="checkbox"
                        id="modal-gdpr"
                        checked={gdprConsent}
                        onChange={(e) => setGdprConsent(e.target.checked)}
                        className="appearance-none w-5 h-5 rounded border-2 border-white/30 bg-white/10 backdrop-blur-sm checked:bg-white/30 checked:border-white/50 transition-all cursor-pointer"
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
                    </motion.div>
                    
                    <label htmlFor="modal-gdpr" className="text-sm text-white/70 leading-relaxed cursor-pointer">
                      {t('hero.gdpr')}
                    </label>
                  </div>

                  {/* Submit Button */}
                  <GlassButton
                    type="submit"
                    variant="green-glass"
                    className="w-full"
                  >
                    {t('hero.email.button')}
                  </GlassButton>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingMailButton;