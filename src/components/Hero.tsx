import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Bell, MessageCircle, ShoppingBag } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';
import LiveNotifications from './LiveNotifications';
import cardBg from '../assets/card-bg.jpg';
import guaranteeCard from '../assets/guarantee-card-newest.png';
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
    smoothScrollTo('contact', 2000); // Slow scroll (2 seconds)
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
            <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.2em] uppercase text-white/50">Oren Shamir &bull; 2024</span>
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

        {/* LEFT COLUMN: Mobile Hero Card */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start z-20 mt-12 md:mt-0">
          <div className="phone-mockup" style={{
            position: 'relative',
            width: '380px',
            height: '600px',
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
            margin: '0 auto 0 0',
            backgroundColor: '#050505',
          }}>
            {/* Background Image - Aggressive Zoom/Crop */}
            <div style={{
              position: 'absolute',
              inset: '-45px',
              backgroundImage: `url(${cardBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.9)',
              zIndex: 0
            }}></div>

            {/* GUARANTEE CARD - ABSOLUTE TOP RIGHT CLIPPED */}
            <motion.img
              src={guaranteeCard}
              alt="Oren Shamir Guarantee"
              animate={{
                y: [0, -12, 0],           // Float Up/Down
                rotate: [-10, -5, -10],   // Sway/Tilt change
                scale: [1, 1.05, 1]       // breathe
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: '20px',     // Kept same
                right: '-120px', // Kept same (anchored right)
                width: '1100%',  // "Double the size" (Colossal)
                zIndex: 25,
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))'
              }}
            />

            {/* Content Overlay */}
            <div style={{ position: 'relative', zIndex: 10, height: '100%', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

              {/* Top Tag - Black & Strong Pulse (Restored) */}
              <div style={{ alignSelf: 'flex-end', background: '#000', color: '#fff', padding: '10px 24px', borderRadius: '30px', fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                התחילו היום
                <motion.span
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ color: '#ffd700', fontSize: '12px', display: 'inline-block' }}
                >
                  ●
                </motion.span>
              </div>

              {/* Bottom Content Area - Redesigned Footer Style */}
              <div style={{ textAlign: 'right', direction: 'rtl', color: 'white', marginTop: 'auto' }}>

                {/* Main Text */}
                <p style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '20px' }}>
                  בואו נבנה לכם דף נחיתה שמביא תוצאות
                </p>

                {/* Profile & Action Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                  {/* Right: Profile Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)' }}>
                      <img src={orenPortrait} alt="Oren Shamir" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>אורן שמיר</span>
                      <span style={{ fontSize: '11px', opacity: '0.7' }}>בניית דפי נחיתה לעסקים</span>
                    </div>
                  </div>

                  {/* Left: Arrow Button */}
                  <button
                    onClick={scrollToContact}
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'white'
                    }}>
                    <ArrowUpRight size={20} />
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Hero;