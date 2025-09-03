import React from 'react';
import { useLanguage } from '../context/LanguageContext';

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
            
            <div className="relative">
              <div className="aspect-square bg-sage/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-leaf/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-12 h-12 text-forest" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 10a7 7 0 0114 0 7 7 0 01-14 0zm7-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif text-forest mb-2">A Living Temple</h3>
                  <p className="text-soil">Where practice meets daily life</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;