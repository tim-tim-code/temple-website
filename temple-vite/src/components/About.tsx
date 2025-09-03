import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-paper">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-12 text-center">
            What is the Temple of the Great Forest?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-soil leading-generous mb-6">
                The Temple of the Great Forest is a lay Zen temple in formation — 
                a place where ancient practices meet contemporary life. We are creating 
                a sanctuary for authentic spiritual practice, free from the pressures 
                of performance or spiritual materialism.
              </p>
              
              <p className="text-lg text-soil leading-generous mb-6">
                Rooted in the Zen tradition but open to all sincere seekers, our temple 
                offers a space for retreat, study, and the deep work of awakening. We believe 
                in the power of silence, the wisdom of community, and the transformative 
                potential of daily practice.
              </p>
              
              <p className="text-lg text-soil leading-generous">
                This is not a business or a wellness retreat. This is a living temple — 
                a place where the dharma is practiced, not performed, and where the 
                ancient call to awakening can still be heard in the modern world.
              </p>
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