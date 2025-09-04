import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import AnimatedButton from './AnimatedButton';

const SupportTheTemple: React.FC = () => {
  const { t } = useLanguage();

  const supportCards = [
    {
      id: 'wishlist',
      title: t('support.wishlist.title'),
      description: t('support.wishlist.desc'),
      buttonText: t('support.wishlist.button'),
      href: '#wishlist',
      gradient: 'from-amber/25 via-sun/20 to-sage/20',
      icon: (
        <svg className="w-8 h-8 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
        </svg>
      )
    },
    {
      id: 'donation',
      title: t('support.donation.title'),
      description: t('support.donation.desc'),
      buttonText: t('support.donation.button'),
      href: '#donation',
      gradient: 'from-sage/30 via-sage/20 to-leaf/20',
      icon: (
        <svg className="w-8 h-8 text-forest/70" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      )
    }
  ];

  return (
    <section id="support" className="py-20 bg-gradient-to-br from-paper via-sage/5 to-sun/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-forest mb-6">
              {t('support.title')}
            </h2>
            <p className="text-xl text-soil/80 max-w-3xl mx-auto leading-relaxed">
              {t('support.subtitle')}
            </p>
          </motion.div>

          {/* Support Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {supportCards.map((card, index) => (
              <motion.div
                key={card.id}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-sm`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{
                  boxShadow: '0 10px 40px rgba(0, 46, 25, 0.1), 0 4px 20px rgba(181, 226, 136, 0.15)'
                }}
              >
                {/* Subtle border gradient */}
                <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
                
                {/* Card Content */}
                <div className="relative p-8 text-center flex flex-col h-full">
                  {/* Icon */}
                  <motion.div 
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm mb-6 border-2 border-white/40 shadow-lg mx-auto"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {card.icon}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-serif text-forest mb-4">
                    {card.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-soil/80 leading-relaxed mb-8 flex-grow">
                    {card.description}
                  </p>
                  
                  {/* Animated Button */}
                  <div className="mt-auto">
                    <AnimatedButton
                      onClick={() => window.location.href = card.href}
                      className="w-full text-base"
                    >
                      {card.buttonText}
                    </AnimatedButton>
                  </div>
                </div>

                {/* Floating elements for visual interest */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-sage/40 rounded-full"></div>
              </motion.div>
            ))}
          </div>

          {/* Bottom message */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="w-24 h-px bg-sage/40 mx-auto mb-6"></div>
            <p className="text-lg text-soil/70 font-light italic max-w-2xl mx-auto">
              {t('support.closing')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SupportTheTemple;