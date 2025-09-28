import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const faqSections: FAQSection[] = [
    {
      title: t('faq.general.title'),
      items: [
        {
          question: t('faq.general.q1.question'),
          answer: t('faq.general.q1.answer')
        },
        {
          question: t('faq.general.q2.question'),
          answer: t('faq.general.q2.answer')
        },
        {
          question: t('faq.general.q3.question'),
          answer: t('faq.general.q3.answer')
        }
      ].filter(item => item.question && item.answer && !item.question.includes('faq.'))
    },
    {
      title: t('faq.animals.title'),
      items: [
        {
          question: t('faq.animals.q1.question'),
          answer: t('faq.animals.q1.answer')
        },
        {
          question: t('faq.animals.q2.question'),
          answer: t('faq.animals.q2.answer')
        },
        {
          question: t('faq.animals.q3.question'),
          answer: t('faq.animals.q3.answer')
        }
      ].filter(item => item.question && item.answer && !item.question.includes('faq.'))
    },
    {
      title: t('faq.practice.title'),
      items: [
        {
          question: t('faq.practice.q1.question'),
          answer: t('faq.practice.q1.answer')
        },
        {
          question: t('faq.practice.q2.question'),
          answer: t('faq.practice.q2.answer')
        }
      ].filter(item => item.question && item.answer && !item.question.includes('faq.'))
    },
    {
      title: t('faq.membership.title'),
      items: [
        {
          question: t('faq.membership.q1.question'),
          answer: t('faq.membership.q1.answer')
        },
        {
          question: t('faq.membership.q2.question'),
          answer: t('faq.membership.q2.answer')
        },
        {
          question: t('faq.membership.q3.question'),
          answer: t('faq.membership.q3.answer')
        },
        {
          question: t('faq.membership.q4.question'),
          answer: t('faq.membership.q4.answer')
        }
      ].filter(item => item.question && item.answer && !item.question.includes('faq.'))
    },
    {
      title: t('faq.visiting.title'),
      items: [
        {
          question: t('faq.visiting.q1.question'),
          answer: t('faq.visiting.q1.answer')
        },
        {
          question: t('faq.visiting.q2.question'),
          answer: t('faq.visiting.q2.answer')
        },
        {
          question: t('faq.visiting.q3.question'),
          answer: t('faq.visiting.q3.answer')
        },
        {
          question: t('faq.visiting.q4.question'),
          answer: t('faq.visiting.q4.answer')
        }
      ].filter(item => item.question && item.answer && !item.question.includes('faq.'))
    }
  ];

  return (
    <div className="min-h-screen bg-paper">
      {/* FAQ Header - Similar to Wishlist */}
      <div className="fixed top-4 left-0 right-0 flex justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center space-x-6">

              {/* Back Button Pill */}
              <motion.button
                onClick={() => navigate('/')}
                className="bg-white/15 backdrop-blur-2xl border border-white/20 rounded-full px-4 py-2.5 flex items-center space-x-2 text-forest/80 hover:text-forest hover:bg-white/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium text-sm">{t('wishlist.back')}</span>
              </motion.button>

              {/* Center Title */}
              <h1 className="text-xl font-serif font-medium text-forest/90 px-4">
                {t('faq.title')}
              </h1>

              {/* Right spacer for balance */}
              <div className="w-[100px]"></div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* FAQ Content */}
      <section id="faq" className="pt-32 pb-20 bg-paper">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-forest mb-6">
                {t('faq.title')}
              </h2>
              <p className="text-xl text-soil/80 max-w-3xl mx-auto leading-relaxed">
                {t('faq.introduction')}
              </p>
            </div>

            <div className="space-y-8">
              {faqSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-leaf/20">
                  <h3 className="text-2xl font-serif text-forest mb-6 border-b border-leaf/20 pb-3">
                    {section.title}
                  </h3>

                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => {
                      const isOpen = openItems[`${sectionIndex}-${itemIndex}`];

                      return (
                        <div key={itemIndex} className="border border-sage/20 rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleItem(sectionIndex, itemIndex)}
                            className="w-full text-left p-4 hover:bg-sage/10 transition-colors duration-200 flex justify-between items-center"
                          >
                            <span className="font-medium text-forest pr-4">
                              {item.question}
                            </span>
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-sage text-xl flex-shrink-0"
                            >
                              ▼
                            </motion.span>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="border-t border-sage/20"
                              >
                                <div className="p-4 text-soil leading-relaxed whitespace-pre-line">
                                  {item.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;