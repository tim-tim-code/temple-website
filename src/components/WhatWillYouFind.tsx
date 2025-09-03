import React from 'react';
import instructors from '../data/instructors.json';
import LiquidGlass from './LiquidGlass';
import { useLanguage } from '../context/LanguageContext';

const WhatWillYouFind: React.FC = () => {
  const { t } = useLanguage();
  
  const offerings = [
    t('whatwillyoufind.offered.1'),
    t('whatwillyoufind.offered.2'),
    t('whatwillyoufind.offered.3'),
    t('whatwillyoufind.offered.4')
  ];

  const stayTypes = [
    {
      title: t('whatwillyoufind.shortterm.title'),
      duration: t('whatwillyoufind.shortterm.duration'),
      description: t('whatwillyoufind.shortterm.desc')
    },
    {
      title: t('whatwillyoufind.longterm.title'),
      duration: t('whatwillyoufind.longterm.duration'),
      description: t('whatwillyoufind.longterm.desc')
    }
  ];

  return (
    <section className="py-20 bg-paper">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-16 text-center">
            {t('whatwillyoufind.title')}
          </h2>

          {/* Stay Types */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {stayTypes.map((stay, index) => (
              <LiquidGlass key={index} className="p-8">
                <h3 className="text-2xl font-serif text-forest mb-2">
                  {stay.title}
                </h3>
                <p className="text-sage font-medium mb-4">
                  {stay.duration}
                </p>
                <p className="text-soil leading-generous">
                  {stay.description}
                </p>
              </LiquidGlass>
            ))}
          </div>

          {/* What's Offered */}
          <div className="mb-16">
            <h3 className="text-3xl font-serif text-forest mb-8 text-center">{t('whatwillyoufind.offered.title')}</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {offerings.map((offering, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-sage rounded-full mr-4 flex-shrink-0"></div>
                  <p className="text-lg text-soil">{offering}</p>
                </div>
              ))}
            </div>
          </div>


          {/* Instructors */}
          <div>
            <h3 className="text-3xl font-serif text-forest mb-8 text-center">{t('whatwillyoufind.instructors.title')}</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {instructors.map((instructor) => (
                <LiquidGlass key={instructor.id} className="p-6 text-center">
                  <div className="w-24 h-24 bg-sage/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 bg-leaf/30 rounded-full flex items-center justify-center">
                      <span className="text-forest text-xl font-serif">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-xl font-serif text-forest mb-1">
                    {instructor.name}
                  </h4>
                  <p className="text-sage font-medium mb-3">
                    {instructor.role}
                  </p>
                  <p className="text-soil text-sm leading-relaxed">
                    {instructor.bio}
                  </p>
                </LiquidGlass>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWillYouFind;