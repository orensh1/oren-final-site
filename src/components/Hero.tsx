import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Bell, MessageCircle, ShoppingBag, Zap, TrendingUp, LayoutTemplate, ShieldCheck, Target, Palette, BarChart3 } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';
import LiveNotifications from './LiveNotifications';
import orenPortrait from '../assets/oren-portrait-new.jpg';
import { smoothScrollTo } from '../utils/smoothScroll';

// Helper Component for Orbit Nodes (Moved to top for scope visibility)
const OrbitNodeInline = ({ icon, label, desc, styleClass, parentSpeed }: any) => {
  // Determine counter-rotation animation based on parent
  const duration = parentSpeed === 'cw' ? '40s' : parentSpeed === 'mid' ? '30s' : '20s';
  const direction = parentSpeed === 'cw' || parentSpeed === 'fast' ? 'orbitRotateCCW' : 'orbitRotate';

  return (
    <div
      className={`absolute flex flex-col items-center gap-2 z-20 group/node ${styleClass}`}
      style={{
        animation: `${direction} ${duration} linear infinite`
      }}
    >
      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover/node:scale-125 group-hover/node:bg-white/20 group-hover/node:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer relative">
        {icon}

        {/* TOOLTIP */}
        <div className="absolute top-full mt-4 w-48 p-3 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col gap-1 text-center scale-95 group-hover/node:scale-100 origin-top shadow-2xl">
          <div className="text-white font-bold text-sm border-b border-white/10 pb-1 mb-1">{label}</div>
          <div className="text-gray-300 text-xs leading-relaxed" dir="rtl">{desc}</div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-xs text-white whitespace-nowrap opacity-100 group-hover/node:opacity-0 transition-opacity">
        {label}
      </div>
    </div>
  )
};

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
            <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.2em] uppercase text-white/50">Oren Shamir &bull; v25 (ORBITS FIXED)</span>
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

        {/* LEFT COLUMN: Interactive Orbit Visualizer v24 */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start z-20 mt-12 md:mt-0 relative perspective-[1000px]">

          {/* Orbit System Container */}
          {/* Orbit System Container */}
          <motion.div
            className="relative w-[380px] h-[380px] md:w-[500px] md:h-[500px] flex items-center justify-center transform-style-3d group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ rotateX: 5, rotateY: 5 }}
          >

            {/* Note: Nodes are now separate from rings to keep them upright */}

            {/* Orbit 1 (Outer) - 40s duration */}
            <div
              className="orbit-ring absolute w-[100%] h-[100%] rounded-full border border-white/5 shadow-[0_0_30px_rgba(100,100,255,0.05)] blur-[1px]"
              style={{ animation: 'orbitRotate 40s linear infinite' }}
            >
              {/* Node 1: Optimization */}
              <div
                className={`absolute flex flex-col items-center gap-2 z-20 group/node top-[10%] right-[15%]`}
                style={{ animation: `orbitRotateCCW 40s linear infinite` }}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover/node:scale-125 group-hover/node:bg-white/20 group-hover/node:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer relative">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                  <div className="absolute top-full mt-4 w-48 p-3 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col gap-1 text-center scale-95 group-hover/node:scale-100 origin-top shadow-2xl">
                    <div className="text-white font-bold text-sm border-b border-white/10 pb-1 mb-1">אופטימיזציה</div>
                    <div className="text-gray-300 text-xs leading-relaxed" dir="rtl">שיפור יחס המרה בעזרת ניתוח נתונים מתקדם.</div>
                  </div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-xs text-white whitespace-nowrap opacity-100 group-hover/node:opacity-0 transition-opacity">
                  אופטימיזציה
                </div>
              </div>
              {/* Node 3: Fast Loading */}
              <div
                className={`absolute flex flex-col items-center gap-2 z-20 group/node bottom-[10%] left-[15%]`}
                style={{ animation: `orbitRotateCCW 40s linear infinite` }}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover/node:scale-125 group-hover/node:bg-white/20 group-hover/node:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer relative">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <div className="absolute top-full mt-4 w-48 p-3 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col gap-1 text-center scale-95 group-hover/node:scale-100 origin-top shadow-2xl">
                    <div className="text-white font-bold text-sm border-b border-white/10 pb-1 mb-1">טעינה מהירה</div>
                    <div className="text-gray-300 text-xs leading-relaxed" dir="rtl">אתר שעולה תוך פחות משנייה - כדי שלא תאבד אף לקוח.</div>
                  </div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-xs text-white whitespace-nowrap opacity-100 group-hover/node:opacity-0 transition-opacity">
                  טעינה מהירה
                </div>
              </div>
            </div>

            {/* Orbit 2 (Middle) - 30s duration CCW */}
            <div
              className="orbit-ring absolute w-[70%] h-[70%] rounded-full border border-white/10 shadow-[0_0_20px_rgba(200,100,255,0.1)] border-dashed opacity-60"
              style={{ animation: 'orbitRotateCCW 30s linear infinite' }}
            >
              {/* Node 2: Converting Design */}
              <OrbitNodeInline
                styleClass="bottom-[15%] right-[15%]"
                icon={<Palette className="w-6 h-6 text-pink-400" />}
                label="עיצוב ממיר"
                desc="עיצוב UX/UI שמוביל את העין בדיוק לפעולה שאתה רוצה."
                parentSpeed="mid"
              />
            </div>

            {/* Orbit 3 (Inner) - 20s duration */}
            <div
              className="orbit-ring absolute w-[45%] h-[45%] rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              style={{ animation: 'orbitRotate 20s linear infinite' }}
            >
              <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-xs text-white whitespace-nowrap opacity-100 group-hover/node:opacity-0 transition-opacity">
                לידים איכותיים
              </div>
            </div>
        </div>

        {/* Central Core (Static relative to orbits) */}
        <motion.div
          className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-600/80 to-purple-600/80 backdrop-blur-3xl flex items-center justify-center shadow-[0_0_60px_rgba(50,100,255,0.4)] z-10 border border-white/20 cursor-default"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, filter: 'brightness(1.2)' }}
        >
          <div className="text-center pointer-events-none">
            <div className="text-3xl md:text-4xl font-black text-white leading-none">20k+</div>
            <div className="text-xs md:text-sm text-white/80 font-medium mt-1">לידים חדשים</div>
          </div>
        </motion.div>

      </motion.div>

    </div>
  );
};

export default Hero;