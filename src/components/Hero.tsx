import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Bell, MessageCircle, ShoppingBag } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';
import LiveNotifications from './LiveNotifications';


const statusMessages = [
  "מערכת יצירת לידים פעילה",
  "ליד חדש התקבל לפני 2 דק'",
  "אורן זמין לפרויקטים חדשים"
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Status Line Cycle
  const [statusIndex, setStatusIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
        {/* Mobile: Stronger, smaller blobs. Desktop: Larger, subtler blobs. */}
        <div className="absolute top-[-10%] -right-[20%] w-[80vw] h-[80vw] md:top-[-20%] md:right-[-10%] md:w-[80vw] md:h-[80vw] rounded-full bg-purple-600/40 md:bg-purple-900/30 blur-[80px] md:blur-[100px] animate-blob mix-blend-screen" />

        <div className="absolute bottom-[-10%] -left-[20%] w-[80vw] h-[80vw] md:bottom-[-20%] md:left-[-10%] md:w-[80vw] md:h-[80vw] rounded-full bg-pink-600/40 md:bg-pink-900/20 blur-[80px] md:blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />

        <div className="absolute top-[20%] left-[10%] w-[60vw] h-[60vw] md:top-[20%] md:left-[20%] md:w-[60vw] md:h-[60vw] rounded-full bg-blue-600/30 md:bg-blue-900/20 blur-[80px] md:blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />

        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* 2. Main Layout - Asymmetrical Editorial */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center pt-[120px] pb-16 md:py-24 min-h-[90vh]">

        {/* Background Glow for Text Area */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] max-h-[600px] bg-[radial-gradient(circle,rgba(100,50,255,0.15)_0%,rgba(0,0,0,0)_70%)] z-[-1] pointer-events-none md:hidden" />

        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-start w-full relative"
        >


          {/* Top Tag - Minimalist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 md:mb-12 flex items-center gap-4 self-start md:self-auto"
          >
            <div className="h-[1px] w-8 md:w-12 bg-white/30"></div>
            <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.2em] uppercase text-white/50">Oren Shamir &bull; 2024</span>
          </motion.div>

          {/* Headlines - Asymmetrical Alignment (Right Aligned in RTL) */}
          <div className="w-full text-right mb-16 md:mb-16 relative">
            <h1 className="text-[3rem] md:text-[9rem] lg:text-[11rem] font-black leading-[1.2] md:leading-[0.8] tracking-[-0.07em] font-[Heebo] select-none">
              {/* First Word - Solid White */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="block text-white relative z-10 mix-blend-overlay"
              >
                לא עוד סתם
              </motion.div>

              {/* Second Word - Pink Purple Gradient */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="block relative z-0"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 opacity-100">
                  דף נחיתה
                </span>
              </motion.div>
            </h1>
          </div>

          {/* Subtext and CTA - Shifted Balance */}
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-12 pl-0 md:pl-20 mt-12 md:mt-8">

            {/* Visual/Description on right (Hebrew start) */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-2xl text-[#E0E0E0] max-w-lg font-light leading-relaxed order-2 md:order-1 tracking-tight"
            >
              האתר שלכם צריך לעשות את העבודה. אני בונה דפים שנראים טוב ורצים מהר שפשוט מביאים לכם פניות מלקוחות חדשים
            </motion.p>

            {/* CTA Button - Center/Left (Hebrew end) */}
            <div className="order-1 md:order-2 self-start md:self-auto relative group w-full md:w-auto">
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 md:py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden tracking-tight transition-colors shadow-lg hover:shadow-xl w-full md:w-auto"
              >
                <span className="relative z-10">רוצה אתר כזה?</span>
                <ArrowLeft className="relative z-10 w-5 h-5 transition-transform group-hover:-translate-x-1" />
                {/* Button Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            </div>
            {/* Desktop Only Notifications */}
            <div className="hidden md:block absolute left-[-50px] top-1/2">
              <LiveNotifications />
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