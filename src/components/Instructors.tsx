import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import instructorsData from '../data/instructors.json';
import { useLanguage } from '../context/LanguageContext';
import { instructorImages } from './InstructorImages';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
}

const Instructors: React.FC = () => {
  const { t } = useLanguage();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const scrollPositionRef = useRef(0);

  // Load instructors from Supabase or JSON
  useEffect(() => {
    const loadInstructors = async () => {
      try {
        if (!isSupabaseConfigured) {
          setInstructors(instructorsData as Instructor[]);
          return;
        }

        const { data, error } = await supabase
          .from('instructors')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setInstructors(data);
        } else {
          // Fallback to JSON if no data in Supabase
          setInstructors(instructorsData as Instructor[]);
        }
      } catch (error) {
        console.error('Error loading instructors:', error);
        setInstructors(instructorsData as Instructor[]);
      }
    };

    loadInstructors();
  }, []);

  // Duplicate instructors array for seamless loop
  const duplicatedInstructors = [...instructors, ...instructors, ...instructors];

  // Calculate animation values dynamically based on number of instructors
  // Each card is 320px (w-80) + 24px gap = 344px total
  const cardWidth = 344;
  const scrollDistance = instructors.length * cardWidth;

  // Auto-scroll animation
  useEffect(() => {
    if (!isPaused && instructors.length > 0) {
      controls.start({
        x: [0, -scrollDistance],
        transition: {
          x: {
            duration: instructors.length * 4, // 4 seconds per instructor
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        }
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls, instructors.length, scrollDistance]);

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
                          src={instructor.image_url || instructorImages[instructor.id]}
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