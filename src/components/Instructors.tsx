import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import instructors from '../data/instructors.json';
import { useLanguage } from '../context/LanguageContext';
import { instructorImages } from './InstructorImages';

const Instructors: React.FC = () => {
  const { t } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const scrollPositionRef = useRef(0);

  // Duplicate instructors array for seamless loop
  const duplicatedInstructors = [...instructors, ...instructors, ...instructors];

  // Auto-scroll animation
  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: [-1080, -2160],
        transition: {
          x: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        }
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  // Handle manual scrolling while hovering
  const handleWheel = (e: React.WheelEvent) => {
    if (isPaused && containerRef.current) {
      e.preventDefault();
      e.stopPropagation();
      const scrollAmount = e.deltaX || e.deltaY;
      scrollPositionRef.current += scrollAmount;
      controls.set({ x: -scrollPositionRef.current });
    }
  };

  return (
    <section id="instructors" className="py-20 bg-sage/15 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-16 text-center">
            {t('whatwillyoufind.instructors.title')}
          </h2>
        </div>
      </div>

      {/* Continuous Scrolling Container - Full Width */}
      <div
        ref={containerRef}
        className="relative h-[450px] overflow-hidden w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          scrollPositionRef.current = 0;
        }}
        onWheel={handleWheel}
      >
            <motion.div
              className="flex gap-6 absolute"
              animate={controls}
              style={{ willChange: 'transform' }}
            >
              {/* Render duplicated instructor cards for seamless loop */}
              {duplicatedInstructors.map((instructor, index) => (
                <div
                  key={`${instructor.id}-${index}`}
                  className="flex-shrink-0"
                >

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-sage/20 hover:shadow-xl transition-all duration-300 flex flex-col w-80">
                    {/* Full Width Image Container */}
                    <div className="relative w-full overflow-hidden h-64">
                      <div className="w-full h-full bg-gradient-to-br from-sage/20 to-forest/10">
                        <motion.img
                          src={instructorImages[instructor.id as keyof typeof instructorImages]}
                          alt={instructor.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        {/* Fallback initials */}
                        <div
                          className="w-full h-full bg-gradient-to-br from-sage/30 to-forest/20 hidden items-center justify-center"
                          style={{ display: 'none' }}
                        >
                          <span className="text-forest font-serif font-medium text-4xl">
                            {instructor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="text-center flex-1 flex flex-col justify-center p-6">
                      <h3 className="font-serif text-forest mb-3 text-xl">
                        {instructor.name}
                      </h3>
                      <p className="text-sage font-medium mb-4 uppercase tracking-wide text-sm">
                        {t(`instructors.${instructor.id}.role`) || instructor.role}
                      </p>
                      <p className="text-soil leading-relaxed text-sm">
                        {t(`instructors.${instructor.id}.bio`) || instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            </motion.div>
      </div>
    </section>
  );
};

export default Instructors;