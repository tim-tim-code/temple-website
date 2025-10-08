import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { faqData } from '../data/faq';
import AnimatedButton from './AnimatedButton';

const FAQPreview: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const currentFAQ = faqData[language as keyof typeof faqData] || faqData.en;

  return (
    <section id="faq-preview" className="py-20 bg-sage/15">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-forest mb-6">
              {currentFAQ.title}
            </h2>

            <p className="text-xl text-soil leading-relaxed mb-8 max-w-2xl mx-auto">
              {t('faq.preview.description')}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div
                className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-leaf/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="text-lg font-serif text-forest mb-2">
                  {t('faq.preview.general.title')}
                </h3>
                <p className="text-soil text-sm">
                  {t('faq.preview.general.desc')}
                </p>
              </motion.div>

              <motion.div
                className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-leaf/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-3">🧘</div>
                <h3 className="text-lg font-serif text-forest mb-2">
                  {t('faq.preview.practice.title')}
                </h3>
                <p className="text-soil text-sm">
                  {t('faq.preview.practice.desc')}
                </p>
              </motion.div>

              <motion.div
                className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-leaf/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-3">🏡</div>
                <h3 className="text-lg font-serif text-forest mb-2">
                  {t('faq.preview.visiting.title')}
                </h3>
                <p className="text-soil text-sm">
                  {t('faq.preview.visiting.desc')}
                </p>
              </motion.div>
            </div>

            <AnimatedButton
              onClick={() => navigate('/faq')}
              className="px-8 py-4 text-lg font-medium"
            >
              {t('faq.preview.button')}
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQPreview;