import React, { useState } from 'react';

const AnimatedCardStack: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-56 h-80 cursor-pointer group"
      onMouseEnter={() => {
        console.log('Hover triggered!');
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        console.log('Hover ended!');
        setIsHovered(false);
      }}
    >
      {/* Card 1 - Meditation */}
      <div className={`absolute inset-1 rounded-2xl transform-gpu transition-all duration-300 ease-in-out overflow-hidden origin-bottom-left ${isHovered ? 'animate-card1' : ''}`}>
        <div className="relative w-full h-full">
          <img 
            src="/images/Master Tim.png" 
            alt="Temple Meditation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-xl font-bold text-shadow">Meditation</h3>
            <p className="text-white/90 text-sm text-shadow">Find inner peace</p>
          </div>
        </div>
      </div>

      {/* Card 2 - Community */}
      <div className={`absolute inset-1 rounded-2xl transform-gpu transition-all duration-300 ease-in-out overflow-hidden opacity-0 origin-bottom-left ${isHovered ? 'animate-card2' : ''}`}>
        <div className="relative w-full h-full">
          <img 
            src="/images/Master Elie.jpg" 
            alt="Temple Community" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-xl font-bold text-shadow">Community</h3>
            <p className="text-white/90 text-sm text-shadow">Together we grow</p>
          </div>
        </div>
      </div>

      {/* Card 3 - Wisdom */}
      <div className={`absolute inset-1 rounded-2xl transform-gpu transition-all duration-300 ease-in-out overflow-hidden opacity-0 origin-bottom-left ${isHovered ? 'animate-card3' : ''}`}>
        <div className="relative w-full h-full">
          <img 
            src="/images/Master Luka.JPG" 
            alt="Temple Wisdom" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-xl font-bold text-shadow">Wisdom</h3>
            <p className="text-white/90 text-sm text-shadow">Ancient teachings</p>
          </div>
        </div>
      </div>

      {/* Card 4 - Growth */}
      <div className={`absolute inset-1 rounded-2xl transform-gpu transition-all duration-300 ease-in-out overflow-hidden opacity-0 origin-bottom-left ${isHovered ? 'animate-card4' : ''}`}>
        <div className="relative w-full h-full">
          <img 
            src="/images/hero-background.jpg" 
            alt="Temple Growth" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-xl font-bold text-shadow">Growth</h3>
            <p className="text-white/90 text-sm text-shadow">Personal development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCardStack;