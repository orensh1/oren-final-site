import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Video, Calendar, ArrowUpRight } from 'lucide-react';
import orenPortrait from '../assets/oren-portrait-new.jpg';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        // Show after scrolling past 100px
        setIsVisible(window.scrollY > 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "spring" }}
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-300`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Glassmorphism Container */}
          <div className="relative overflow-hidden rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Background Aurora Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 z-0 pointer-events-none" />

            {/* Desktop Layout (Flex Row) */}
            <div className="relative z-10 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-8">

              {/* LEFT: CTA Button & Text */}
              <div className="flex flex-col items-center md:items-start gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://wa.me/972509655550', '_blank')}
                  className="group relative flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-black/25 transition-all"
                >
                  {/* Glowing Yellow Dot */}
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                  </span>

                  <span>שיחת ייעוץ חינם</span>
                  <Video className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.button>

                {/* Subtext */}
                <p className="text-white/80 text-xs md:text-sm font-light tracking-wide text-center md:text-right">
                  בואו נבנה לכם דף נחיתה שמביא תוצאות
                </p>
              </div>

              {/* RIGHT: Profile & Arrow */}
              <div className="flex items-center gap-4 flex-row-reverse md:flex-row w-full md:w-auto justify-between md:justify-end">

                {/* White Arrow Button (Far Right) */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={scrollToTop}
                  className="bg-white/20 hover:bg-white text-white hover:text-black p-3 rounded-full backdrop-blur-md transition-all border border-white/30"
                >
                  <ArrowUpRight className="w-6 h-6" />
                </motion.button>

                {/* Profile Info */}
                <div className="flex items-center gap-3 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-white font-bold text-base leading-tight">אורן שמיר</span>
                    <span className="text-white/60 text-xs font-light">בניית דפי נחיתה לעסקים</span>
                  </div>

                  {/* Profile Pic */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-md">
                    <img
                      src={orenPortrait}
                      alt="Oren Shamir"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingCTA;