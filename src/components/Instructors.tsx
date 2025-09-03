import React from 'react';
import { motion } from 'framer-motion';
import instructors from '../data/instructors.json';
import { useLanguage } from '../context/LanguageContext';

const Instructors: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="instructors" className="py-20 bg-sage/15">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-16 text-center">
            {t('whatwillyoufind.instructors.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-sage/20 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Large Square Image Container */}
                <div className="relative mb-6 mx-auto w-full max-w-48 aspect-square">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-sage/20 to-forest/10 border-2 border-sage/30">
                    <motion.img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback initials */}
                    <div 
                      className="w-full h-full bg-gradient-to-br from-sage/30 to-forest/20 rounded-xl hidden items-center justify-center"
                      style={{ display: 'none' }}
                    >
                      <span className="text-forest text-4xl font-serif font-medium">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="text-center flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-forest mb-3">
                    {instructor.name}
                  </h3>
                  <p className="text-sage font-medium mb-4 uppercase tracking-wide text-sm">
                    {instructor.role}
                  </p>
                  <p className="text-soil text-base leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructors;