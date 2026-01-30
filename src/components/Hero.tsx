import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden text-white will-change-transform transform-gpu"
    >

      {/* 1. Background Texture & Aurora */}


      {/* Aurora Mesh Gradient - Darker, Moodier */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Darken base */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#2E1065] blur-[120px] mix-blend-screen opacity-60"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#BE185D] blur-[150px] mix-blend-screen opacity-50"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-violet-600 blur-[100px] opacity-20 mix-blend-screen"
        />
      </div>

      {/* 2. Main Layout - Asymmetrical Editorial */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center py-24 min-h-[90vh]">

        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-start w-full relative"
        >
          {/* Top Tag - Minimalist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 flex items-center gap-4 self-start md:self-auto"
          >
            <div className="h-[1px] w-12 bg-white/30"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/50">Oren Shamir &bull; 2024</span>
          </motion.div>

          {/* Headlines - Asymmetrical Alignment (Right Aligned in RTL) */}
          <div className="w-full text-right mb-16 relative">
            <h1 className="text-[14vw] md:text-[9rem] lg:text-[11rem] font-black leading-[0.8] tracking-[-0.07em] font-[Heebo] select-none">
              {/* First Word - Solid White */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-white relative z-10 mix-blend-overlay"
              >
                חדשנות
              </motion.div>

              {/* Second Word - Ghost Gradient */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="block relative z-0"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-purple-500/20 opacity-80">
                  דיגיטלית
                </span>
              </motion.div>
            </h1>
          </div>

          {/* Subtext and CTA - Shifted Balance */}
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-12 pl-0 md:pl-20 mt-8">

            {/* Visual/Description on right (Hebrew start) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/60 max-w-lg font-light leading-relaxed order-2 md:order-1 tracking-tight"
            >
              אני בונה חוויות דיגיטליות שמטשטשות את הגבול בין עיצוב לטכנולוגיה.
              <br />
              <span className="text-white font-medium">פרספקטיבה חדשה לעסק שלך.</span>
            </motion.p>

            {/* CTA Button - Center/Left (Hebrew end) */}
            <div className="order-1 md:order-2 self-start md:self-auto">
              <motion.a
                href="#contact"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-5 px-10 py-6 bg-white text-black rounded-full font-bold text-lg overflow-hidden tracking-tight"
              >
                <span className="relative z-10">בוא נתחיל פרויקט</span>
                <ArrowLeft className="relative z-10 w-5 h-5 transition-transform group-hover:-translate-x-1" />
                {/* Button Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            </div>

          </div>

        </motion.div>
      </div>

      {/* 3. Glass Stats Cards - Bottom */}
      <div className="relative z-20 px-6 pb-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard number="200%" label="שיפור בהמרה" delay={0.6} />
          <StatCard number="16" label="שנות חיים" delay={0.7} />
          <StatCard number="50+" label="פרויקטים מוצלחים" delay={0.8} />
        </div>
      </div>

    </div>
  );
};

const StatCard = ({ number, label, delay }: { number: string, label: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className="relative group overflow-hidden rounded-xl border border-white/20 bg-white/[0.03] backdrop-blur-md p-6 hover:bg-white/[0.08] transition-all duration-500 will-change-transform transform-gpu"
  >
    <div className="flex items-end justify-between relative z-10">
      <div>
        <span className="block text-5xl font-bold text-white mb-2 tracking-tighter">{number}</span>
        <span className="text-sm text-white/60 font-medium uppercase tracking-widest">{label}</span>
      </div>
      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/40 transition-all rotate-45 group-hover:rotate-0">
        <ArrowUpRight size={18} />
      </div>
    </div>

    {/* Hover Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </motion.div>
);

export default Hero;