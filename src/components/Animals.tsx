import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import animals from '../data/animals.json';
import { useLanguage } from '../context/LanguageContext';
import { animalImages } from './AnimalImages';

const Animals: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Categorize animals
  const horses = animals.filter(animal => animal.type === 'Horse');
  const dogs = animals.filter(animal => animal.type === 'Dog');
  const others = animals.filter(animal => !['Horse', 'Dog'].includes(animal.type));

  const categories = [
    { id: 'horses', name: 'Horses', animals: horses, icon: '🐴' },
    { id: 'dogs', name: 'Dogs', animals: dogs, icon: '🐕' },
    { id: 'others', name: 'Others', animals: others, icon: '🐾' }
  ];

  return (
    <section id="animals" className="py-20 bg-leaf/15">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Animal Care Info Block - Now First */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-leaf/20 hover:shadow-xl transition-all duration-300 mb-16"
          >
            <div className="grid md:grid-cols-2 min-h-[400px]">
              {/* Left Side - Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src="/images/Animals/We take care of Horse.JPG"
                  alt="We take care of horses"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Right Side - Content */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-serif text-forest mb-6">
                  {t('animals.care.title')}
                </h2>
                <div className="space-y-4 text-soil text-lg leading-relaxed">
                  <p>
                    {t('animals.care.description1')}
                  </p>
                  <p>
                    {t('animals.care.description2')}
                  </p>
                  <p>
                    {t('animals.care.description3')}
                  </p>
                  <p className="text-leaf font-medium">
                    {t('animals.care.helpText')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animal Categories */}
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-leaf/20 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Category Header */}
                <div className="relative w-full h-80 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-leaf/20 to-forest/10 flex items-center justify-center">
                    {/* Display representative image for category */}
                    {category.animals.length > 0 && (
                      <motion.img
                        src={category.id === 'horses' ? '/images/Animals/Horses/Horses.jpeg' :
                             category.id === 'dogs' ? '/images/Animals/Booth Dogs.jpg' :
                             animalImages[category.animals[0].id as keyof typeof animalImages]}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onError={(e) => {
                          // Fallback to icon if image fails
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    )}
                    {/* Fallback category icon */}
                    <div
                      className="w-full h-full bg-gradient-to-br from-leaf/30 to-forest/20 hidden items-center justify-center"
                      style={{ display: category.animals.length === 0 ? 'flex' : 'none' }}
                    >
                      <span className="text-8xl">
                        {category.icon}
                      </span>
                    </div>
                  </div>

                  {/* Category Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-serif text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {category.animals.length} {category.animals.length === 1 ? 'animal' : 'animals'}
                    </p>
                  </div>
                </div>

                {/* Category Content */}
                <div className="text-center flex-1 flex flex-col justify-between p-6">
                  <div>
                    <p className="text-soil text-sm leading-relaxed mb-4">
                      {category.id === 'horses' && 'Sacred companions whose spirit runs free across ancient paths, carrying wisdom in their gentle eyes.'}
                      {category.id === 'dogs' && 'Loyal guardians of the temple grounds, their hearts bound to ours through countless seasons.'}
                      {category.id === 'others' && 'Unique souls who found refuge here, each bringing their own sacred presence to our sanctuary.'}
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    className="px-6 py-3 bg-leaf/20 hover:bg-leaf/30 text-forest border border-leaf/40 rounded-xl transition-all duration-200 font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animal Category Modal */}
          <AnimatePresence>
            {selectedCategory && (
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.target === e.currentTarget && setSelectedCategory(null)}
              >
                <motion.div
                  className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/40 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-leaf/20 to-forest/20 border-b border-white/30 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-serif text-forest flex items-center">
                        <span className="mr-3 text-3xl">
                          {categories.find(c => c.id === selectedCategory)?.icon}
                        </span>
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </h2>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="p-2 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <svg className="w-6 h-6 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                    <div className="grid gap-6">
                      {categories.find(c => c.id === selectedCategory)?.animals.map((animal, index) => (
                        <motion.div
                          key={animal.id}
                          className="bg-white/60 rounded-xl p-6 border border-leaf/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="grid md:grid-cols-3 gap-6">
                            {/* Animal Image */}
                            <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-leaf/20 to-forest/10">
                              <img
                                src={animalImages[animal.id as keyof typeof animalImages]}
                                alt={animal.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                              <div
                                className="w-full h-full bg-gradient-to-br from-leaf/30 to-forest/20 hidden items-center justify-center"
                                style={{ display: 'none' }}
                              >
                                <span className="text-forest text-4xl font-serif font-medium">
                                  {animal.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>

                            {/* Animal Info */}
                            <div className="md:col-span-2 space-y-4">
                              <div>
                                <h3 className="text-2xl font-serif text-forest mb-2">
                                  {animal.name}
                                </h3>
                                {animal.age && (
                                  <p className="text-sage font-medium text-sm mb-1">
                                    {animal.age} years old {animal.birthDate && `(Born: ${animal.birthDate})`}
                                  </p>
                                )}
                                <p className="text-leaf font-medium uppercase tracking-wide text-sm mb-3">
                                  {animal.type}
                                </p>
                              </div>

                              <div className="space-y-3">
                                <p className="text-soil leading-relaxed">
                                  {animal.description}
                                </p>

                                {animal.fullStory && (
                                  <div>
                                    <h4 className="text-forest font-semibold mb-2">Full Story</h4>
                                    <p className="text-soil leading-relaxed text-sm">
                                      {animal.fullStory}
                                    </p>
                                  </div>
                                )}

                                {(animal.likes || animal.dislikes) && (
                                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                                    {animal.likes && (
                                      <div className="bg-green/10 p-3 rounded-lg">
                                        <h5 className="text-green-800 font-medium text-sm mb-1">Likes:</h5>
                                        <p className="text-green-700 text-sm">{animal.likes}</p>
                                      </div>
                                    )}
                                    {animal.dislikes && (
                                      <div className="bg-red/10 p-3 rounded-lg">
                                        <h5 className="text-red-800 font-medium text-sm mb-1">Dislikes:</h5>
                                        <p className="text-red-700 text-sm">{animal.dislikes}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Animals;