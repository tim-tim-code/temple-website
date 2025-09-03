import React from 'react';
import LiquidGlass from './LiquidGlass';
import { useLanguage } from '../context/LanguageContext';

const ForWhom: React.FC = () => {
  const { t } = useLanguage();
  
  const audiences = [
    {
      title: t('forwhom.card1.title'),
      subtitle: t('forwhom.card1.subtitle'),
      description: t('forwhom.card1.desc')
    },
    {
      title: t('forwhom.card2.title'),
      subtitle: t('forwhom.card2.subtitle'),
      description: t('forwhom.card2.desc')
    },
    {
      title: t('forwhom.card3.title'),
      subtitle: t('forwhom.card3.subtitle'),
      description: t('forwhom.card3.desc')
    },
    {
      title: t('forwhom.card4.title'),
      subtitle: t('forwhom.card4.subtitle'),
      description: t('forwhom.card4.desc')
    }
  ];

  return (
    <section id="forwhom" className="py-20 bg-sage/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-16 text-center">
            {t('forwhom.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {audiences.map((audience, index) => (
              <LiquidGlass key={index} className="p-8">
                <h3 className="text-2xl font-serif text-forest mb-2">
                  {audience.title}
                </h3>
                <p className="text-sage font-medium mb-3">
                  {audience.subtitle}
                </p>
                <p className="text-soil leading-generous">
                  {audience.description}
                </p>
              </LiquidGlass>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="w-24 h-px bg-sage mx-auto mb-6"></div>
            <p className="text-lg text-soil/80 font-light italic max-w-2xl mx-auto">
              "The temple calls to those who are ready to answer — 
              not with their minds, but with their whole being."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhom;