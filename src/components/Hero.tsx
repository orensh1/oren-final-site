import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';


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
      <SuccessStack />



      {/* Aurora Mesh Gradient - Darker, Moodier */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
        {/* Animated CSS Gradients - High Performance */}
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-purple-900/30 blur-[100px] animate-blob" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-pink-900/20 blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-900/20 blur-[100px] animate-blob animation-delay-4000 hidden md:block" />
        <div className="absolute inset-0 bg-black/50 z-10" />
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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block text-white relative z-10 mix-blend-overlay"
              >
                חדשנות
              </motion.div>

              {/* Second Word - Ghost Gradient */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-white/60 max-w-lg font-light leading-relaxed order-2 md:order-1 tracking-tight"
            >
              אני בונה חוויות דיגיטליות שמטשטשות את הגבול בין עיצוב לטכנולוגיה.
              <br />
              <span className="text-white font-medium">פרספקטיבה חדשה לעסק שלך.</span>
            </motion.p>

            {/* CTA Button - Center/Left (Hebrew end) */}
            <div className="order-1 md:order-2 self-start md:self-auto">
              <motion.a
                href="https://wa.me/972526448826"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative inline-flex items-center gap-4 px-8 py-5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-lg overflow-hidden tracking-tight transition-colors shadow-lg shadow-green-900/20"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative z-10">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="relative z-10">דברו איתי בוואטסאפ</span>
              </motion.a>
            </div>

          </div>

        </motion.div>
      </div>

      {/* 3. Glass Stats Cards - Bottom */}
      <div className="relative z-20 px-6 pb-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard number="200%" label="שיפור בהמרה" delay={0} />
          <StatCard number="16" label="שנות חיים" delay={0.1} />
          <StatCard number="50+" label="פרויקטים מוצלחים" delay={0.2} />
        </div>
      </div>

    </div>
  );
};

const StatCard = ({ number, label, delay }: { number: string, label: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
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