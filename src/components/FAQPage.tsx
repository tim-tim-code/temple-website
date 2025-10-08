import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { faqData } from '../data/faq';
import Header from './Header';
import Footer from './Footer';

const FAQPage: React.FC = () => {
  const { language } = useLanguage();
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (questionKey: string) => {
    setOpenQuestion(openQuestion === questionKey ? null : questionKey);
  };

  const currentFAQ = faqData[language as keyof typeof faqData] || faqData.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/10 via-leaf/5 to-paper">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-forest/5 via-sage/10 to-leaf/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-serif text-forest mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {currentFAQ.title}
            </motion.h1>

            <motion.p
              className="text-xl text-soil leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {currentFAQ.introduction}
            </motion.p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {currentFAQ.sections.map((section, sectionIndex) => (
              <motion.div
                key={`section-${sectionIndex}`}
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-serif text-forest mb-8 text-center">
                  {section.title}
                </h2>

                <div className="space-y-4">
                  {section.questions.map((faq, questionIndex) => {
                    const questionKey = `section-${sectionIndex}-q-${questionIndex}`;
                    const isOpen = openQuestion === questionKey;

                    return (
                      <motion.div
                        key={questionKey}
                        className="bg-white/60 backdrop-blur-sm rounded-2xl border border-sage/20 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: questionIndex * 0.1 }}
                      >
                        <motion.button
                          onClick={() => toggleQuestion(questionKey)}
                          className="w-full text-left p-6 hover:bg-sage/10 transition-colors duration-200 flex items-center justify-between"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <h3 className="text-lg font-medium text-forest pr-4">
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <svg className="w-6 h-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.div>
                        </motion.button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-soil leading-relaxed whitespace-pre-line">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;