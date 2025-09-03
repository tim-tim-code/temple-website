import React from 'react';
import animals from '../data/animals.json';
import LiquidGlass from './LiquidGlass';
import { useLanguage } from '../context/LanguageContext';

const Support: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-sage/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-16 text-center">
            {t('support.title')}
          </h2>
          
          {/* Animal Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {animals.map((animal) => (
              <LiquidGlass key={animal.id} className="p-6 text-center">
                <div className="w-32 h-32 bg-leaf/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-24 h-24 bg-sage/30 rounded-full flex items-center justify-center">
                    <span className="text-forest text-2xl font-serif">
                      {animal.type.slice(0, 2)}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-serif text-forest mb-2">
                  {animal.name}
                </h3>
                <p className="text-sage font-medium mb-3">
                  {animal.type}
                </p>
                <p className="text-soil text-sm leading-relaxed">
                  {animal.description}
                </p>
              </LiquidGlass>
            ))}
          </div>

          {/* Supporting Text */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-2xl font-serif text-forest mb-6">
              {t('support.subtitle')}
            </p>
            
            <div className="space-y-6 text-lg text-soil leading-generous">
              <p>{t('support.p1')}</p>
              <p>{t('support.p2')}</p>
              <p className="font-medium">{t('support.p3')}</p>
            </div>

            <div className="mt-12">
              <div className="w-32 h-px bg-sage mx-auto mb-8"></div>
              <p className="text-xl text-soil/80 font-light italic">
                {t('support.quote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;