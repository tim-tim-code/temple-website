import React from 'react';
import instructors from '../data/instructors.json';
import schedule from '../data/schedule.json';
import LiquidGlass from './LiquidGlass';

const WhatWillYouFind: React.FC = () => {
  const offerings = [
    "Morning and evening meditation",
    "Shared meals and simple accommodations",
    "A humble frame with quality teaching",
    "6 hours of practice/day"
  ];

  const stayTypes = [
    {
      title: "Short-term retreat",
      duration: "Weekend or week",
      description: "Perfect for those seeking a brief respite and introduction to temple life."
    },
    {
      title: "Long-term stay", 
      duration: "Hermit-volunteer or hermit-practitioner",
      description: "For those called to deeper immersion in practice and community life."
    }
  ];

  return (
    <section className="py-20 bg-paper">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-16 text-center">
            What Will You Find?
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
            <h3 className="text-3xl font-serif text-forest mb-8 text-center">What's Offered</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {offerings.map((offering, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-sage rounded-full mr-4 flex-shrink-0"></div>
                  <p className="text-lg text-soil">{offering}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="mb-16">
            <h3 className="text-3xl font-serif text-forest mb-8 text-center">Daily Schedule</h3>
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-4">
                {schedule.map((item, index) => (
                  <div key={index} className="flex items-center py-3 border-b border-sage/20 last:border-b-0">
                    <div className="w-16 text-sage font-medium text-sm">
                      {item.time}
                    </div>
                    <div className="flex-1 text-soil ml-6">
                      {item.activity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructors */}
          <div>
            <h3 className="text-3xl font-serif text-forest mb-8 text-center">Instructors</h3>
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