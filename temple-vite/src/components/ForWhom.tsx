import React from 'react';
import LiquidGlass from './LiquidGlass';

const ForWhom: React.FC = () => {
  const audiences = [
    {
      title: "Open to everyone",
      description: "All sincere seekers are welcome, regardless of experience or background."
    },
    {
      title: "For those looking to retire from the world",
      description: "A sanctuary for those seeking respite from the noise and demands of modern life."
    },
    {
      title: "For anchoring practice",
      description: "Those who want to ground their spiritual practice in something real — without performance."
    },
    {
      title: "For those who feel the call",
      description: "The temple is not yet settled, but those who will come already feel the call, even if they can't name it yet."
    }
  ];

  return (
    <section className="py-20 bg-sage/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-16 text-center">
            For Whom?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {audiences.map((audience, index) => (
              <LiquidGlass key={index} className="p-8">
                <h3 className="text-xl font-serif text-forest mb-4">
                  {audience.title}
                </h3>
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