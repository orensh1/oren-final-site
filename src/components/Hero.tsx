import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Bell, MessageCircle, ShoppingBag, Zap, TrendingUp, LayoutTemplate, ShieldCheck } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';
import LiveNotifications from './LiveNotifications';
import orenPortrait from '../assets/oren-portrait-new.jpg';
import { smoothScrollTo } from '../utils/smoothScroll';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContact = () => {
    smoothScrollTo('contact', 1000); // Instant start, 1s duration
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden text-white will-change-transform transform-gpu"
    >

      {/* 1. Background Texture & Aurora */}
      <SuccessStack />
      {/* Aurora Mesh Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
        <div className="absolute top-[-10%] -right-[20%] w-[80vw] h-[80vw] md:top-[-20%] md:right-[-10%] md:w-[80vw] md:h-[80vw] rounded-full bg-purple-600/40 md:bg-purple-900/30 blur-[80px] md:blur-[100px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] -left-[20%] w-[80vw] h-[80vw] md:bottom-[-20%] md:left-[-10%] md:w-[80vw] md:h-[80vw] rounded-full bg-pink-600/40 md:bg-pink-900/20 blur-[80px] md:blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute top-[20%] left-[10%] w-[60vw] h-[60vw] md:top-[20%] md:left-[20%] md:w-[60vw] md:h-[60vw] rounded-full bg-blue-600/30 md:bg-blue-900/20 blur-[80px] md:blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>


      {/* 2. Main Layout - 2 Columns */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between gap-12 pt-[120px] pb-16 md:py-24 min-h-[90vh]">

        {/* Background Glow for Text Area */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] max-h-[600px] bg-[radial-gradient(circle,rgba(100,50,255,0.15)_0%,rgba(0,0,0,0)_70%)] z-[-1] pointer-events-none md:hidden" />

        {/* RIGHT COLUMN: Text Content */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-start w-full md:w-1/2 relative z-20"
        >

          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 md:mb-12 flex items-center gap-4 self-start md:self-auto"
          >
            <div className="h-[1px] w-8 md:w-12 bg-white/30"></div>
            <div className="h-[1px] w-8 md:w-12 bg-white/30"></div>
            <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.2em] uppercase text-white/50">Oren Shamir &bull; v22 (BENTO GRID)</span>
          </motion.div>

          {/* Headlines - Big & Designed */}
          <div className="w-full text-right mb-12 relative z-20">
            <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-black leading-[0.85] tracking-tighter text-white drop-shadow-xl">
              <span className="block text-white relative z-10">
                לא עוד סתם
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-pink-500 via-purple-500 to-indigo-500 relative z-10 pb-4">
                דף נחיתה
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <div className="w-full flex flex-col items-start md:items-start pl-0 md:pl-20 mt-12 md:mt-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-2xl text-[#E0E0E0] max-w-lg font-light leading-relaxed tracking-tight"
            >
              האתר שלכם צריך לעשות את העבודה. אני בונה דפים שנראים טוב ורצים מהר שפשוט מביאים לכם פניות מלקוחות חדשים
            </motion.p>
          </div>

        </motion.div>

        {/* LEFT COLUMN: Hebrew Bento Grid */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start z-20 mt-12 md:mt-0 relative">

          {/* Grid Container */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-[500px]" style={{ direction: 'rtl' }}>

            {/* Card 1: Main (Full Width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-start gap-4 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-500/30 transition-colors" />

              <div className="p-3 bg-white/10 rounded-2xl w-fit">
                <LayoutTemplate className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">דפי נחיתה שממירים</h3>
                <p className="text-sm text-gray-400">עיצוב מודרני שגורם ללקוחות להשאיר פרטים ולהפוך ללידים איכותיים.</p>
              </div>
            </motion.div>

            {/* Card 2: Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -ml-10 -mb-10 group-hover:bg-blue-500/30 transition-colors" />
              <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
              <div>
                <div className="text-3xl font-black text-white">100%+</div>
                <div className="text-xs text-gray-400 font-medium">אופטימיזציה<br />של לידים</div>
              </div>
            </motion.div>

            {/* Card 3: Speed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
              className="col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl -ml-5 -mt-5 group-hover:bg-yellow-500/20 transition-colors" />
              <div className="flex justify-between items-start w-full">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="mt-4">
                <div className="text-lg font-bold text-white leading-tight">טעינה מהירה</div>
                <div className="text-xs text-gray-400 mt-1">ציון 98+ בגוגל</div>
              </div>
            </motion.div>

            {/* Card 4: Trust (Full Width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5 }}
              className="col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
              <div className="p-2 bg-green-500/20 rounded-full">
                <ShieldCheck className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">מותאם אישית לכל עסק</div>
                <div className="text-xs text-gray-400">פתרונות מדויקים לצרכים שלך</div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Hero;