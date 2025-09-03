import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Newsletter: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && gdprConsent) {
      console.log('Newsletter signup:', email);
      alert('Thank you! We will keep you updated on the Temple.');
      setEmail('');
      setGdprConsent(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-sage/10 via-leaf/5 to-paper">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sage/30 via-sage/20 to-leaf/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
            style={{
              boxShadow: '0 10px 40px rgba(0, 46, 25, 0.1), 0 4px 20px rgba(181, 226, 136, 0.15)'
            }}
          >
            {/* Subtle border gradient */}
            <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
            
            {/* Content */}
            <div className="relative p-8 text-center">
              {/* Icon */}
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm mb-6 border-2 border-white/40 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-8 h-8 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </motion.div>
              
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-serif text-forest mb-4">
                Keep me up to date
              </h3>
              
              {/* Description */}
              <p className="text-soil/80 leading-relaxed mb-8">
                Stay informed about the Temple's progress and upcoming activities.
              </p>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <motion.div
                    className="relative overflow-hidden rounded-xl"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Glass input background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-xl"></div>
                    <div className="absolute inset-0 border border-white/30 rounded-xl"></div>
                    
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('hero.email.placeholder')}
                      required
                      className="relative w-full px-4 py-3 rounded-xl bg-transparent text-forest placeholder-forest/50 focus:outline-none focus:ring-2 focus:ring-forest/30 transition-all duration-200"
                    />
                  </motion.div>
                </div>
                
                <div className="flex items-start justify-center">
                  <motion.div
                    className="relative mt-1 mr-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glass checkbox wrapper */}
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="newsletter-gdpr"
                        checked={gdprConsent}
                        onChange={(e) => setGdprConsent(e.target.checked)}
                        required
                        className="appearance-none w-5 h-5 rounded border-2 border-forest/30 bg-white/20 backdrop-blur-sm checked:bg-forest/30 checked:border-forest/50 transition-all duration-200 cursor-pointer"
                      />
                      {gdprConsent && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-0.5 left-0.5 w-4 h-4 text-forest pointer-events-none"
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
                  <label htmlFor="newsletter-gdpr" className="text-sm text-forest/70 leading-relaxed cursor-pointer text-left">
                    {t('hero.gdpr')}
                  </label>
                </div>

                {/* Button */}
                <motion.button
                  type="submit"
                  className="inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!email || !gdprConsent}
                >
                  <div className="relative overflow-hidden rounded-xl px-8 py-3 bg-forest/90 text-paper font-medium shadow-lg transition-all duration-300 hover:bg-forest hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative">{t('hero.email.button')}</span>
                  </div>
                </motion.button>
              </form>
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-1 h-1 bg-sage/40 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;