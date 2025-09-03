import React, { useState, useEffect } from 'react';
import daoLines from '../data/daoLines.json';
import LiquidGlass from './LiquidGlass';
import heroBackground from '../assets/hero-background.jpg';

const Hero: React.FC = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex((prev) => (prev + 1) % daoLines.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && gdprConsent) {
      console.log('Email signup:', email);
      alert('Thank you for your interest. We will notify you when the Temple opens.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-forest bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground}), linear-gradient(135deg, #002E19 0%, #4A2F1E 100%)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-start justify-between min-h-screen">
        {/* Left side - Main content in liquid glass */}
        <div className="lg:w-1/2 flex items-center min-h-screen">
          <LiquidGlass className="p-10 w-full max-w-md mx-auto lg:mx-0">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-paper mb-6 leading-tight">
                Let's find our way together
              </h1>
              
              <p className="text-lg text-paper/90 mb-8">
                Let me know when the Temple opens.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-paper/90 text-forest placeholder-forest/60 focus:outline-none focus:ring-2 focus:ring-sage transition-all duration-200"
                  />
                </div>
                
                <div className="mb-6 flex items-start">
                  <input
                    type="checkbox"
                    id="gdpr"
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                    required
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="gdpr" className="text-sm text-paper/80 leading-relaxed">
                    I consent to receive updates about the Temple of the Great Forest opening.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sage hover:bg-leaf text-forest font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Notify me
                </button>
              </form>
            </div>
          </LiquidGlass>
        </div>

      {/* Dao quotes - Absolutely flush with bottom-right corner */}
      <div className="absolute bottom-0 right-0 max-w-xs z-20 pointer-events-none p-2">
        <div className="text-right">
          <div className="text-sm md:text-base font-serif text-paper mb-1 leading-tight drop-shadow-lg">
            <span className="block animate-fade-in" key={currentLineIndex}>
              "{daoLines[currentLineIndex]}"
            </span>
          </div>
          <p className="text-paper/70 text-xs italic drop-shadow-md">
            — Dao De Jing
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hero;