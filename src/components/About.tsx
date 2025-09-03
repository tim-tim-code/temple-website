import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import AnimatedCardStack from './AnimatedCardStack';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-20 bg-paper">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-12 text-center">
            {t('about.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-2xl font-serif text-forest mb-8 text-center">
                {t('about.subtitle')}
              </p>
              
              <div className="space-y-6 text-lg text-soil leading-generous">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p className="font-medium">{t('about.p3')}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <AnimatedCardStack />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;