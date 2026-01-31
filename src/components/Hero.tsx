import React, { useRef } from 'react';
// Final Professional Version - Clean & Polish
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { User, Mail, Phone, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';

// --- LEAD CARD COMPONENT ---
const LeadCard = ({ icon: Icon, name, type, time, delay }: any) => {
  return (
    // Outer wrapper for Entrance Animation (Slide form Left)
    <motion.div
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      className="mb-5" // Spacing between cards
    >
      {/* Inner wrapper for Floating Animation (Parallax) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }} // Desynchronize floats
        className="relative flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl w-[300px] md:w-[360px] group hover:bg-white/15 transition-colors"
      >
        {/* Icon Circle */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center shadow-sm">
          <Icon className="w-5 h-5 text-black/80" />
        </div>

        {/* Content */}
        <div className="flex-1 text-right"> 
          <div className="flex items-center justify-between flex-row-reverse">
              <h3 className="text-white font-bold text-sm tracking-wide">{name}</h3>
              <span className="text-[10px] text-white/50 font-mono tracking-wider">{time}</span>
          </div>
          <p className="text-white/70 text-xs mt-1 font-light leading-snug">{type}</p>
        </div>

        {/* New Lead Badge */}
        <div className="absolute -top-2 -left-2 bg-[#22C55E] text-white text-[9px] font-black px-2 py-1 rounded-full shadow-[0_4px_10px_rgba(34,197,94,0.4)] flex items-center gap-1 z-10">
           NEW
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN HERO COMPONENT ---
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContact = () => {
    smoothScrollTo('contact', 1000);
  };

  const leads = [
    { icon: User, name: "דניאל כהן", type: "השאיר פרטים באתר נדל״ן", time: "עכשיו", delay: 0.2 },
    { icon: Phone, name: "מיכל לוי", type: "שיחה נכנסת מקמפיין גוגל", time: "לפני 2 דק׳", delay: 0.5 },
    { icon: Mail, name: "רועי פרידמן", type: "ביקש הצעת מחיר לאתר", time: "לפני 8 דק׳", delay: 0.8 },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#050505] text-white font-sans selection:bg-[#22C55E] selection:text-white"
    >
      {/* 1. Background (Subtle & Premium) */}
      <SuccessStack />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24 pt-[120px] pb-16 md:py-24 min-h-[90vh]">

        {/* LEFT COLUMN: Visuals (Lead Cards) 
            Order: 2 on Mobile (Bottom), 1 on Desktop (Left).
        */}
        <div className="w-full md:w-5/12 flex flex-col items-center md:items-start justify-center relative z-20 order-2 md:order-1 perspective-[1000px]">
           {leads.map((lead, index) => (
               <LeadCard key={index} {...lead} />
           ))}
           
           {/* Ambient Glow behind cards */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-white/5 blur-3xl -z-10 rounded-full pointer-events-none" />
        </div>


        {/* RIGHT COLUMN: Content & Typography (Hebrew)
            Order: 1 on Mobile (Top), 2 on Desktop (Right).
            Alignment: Right (items-end).
        */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center md:items-end w-full md:w-6/12 relative z-20 order-1 md:order-2 text-center md:text-right"
        >
          {/* Top Tag - Clean "Oren Shamir" */}
          <div className="mb-8 flex items-center gap-3 opacity-60">
             <span className="text-[11px] tracking-[0.25em] font-bold uppercase text-white/80">OREN SHAMIR</span>
             <div className="h-[1px] w-8 bg-white/40"></div>
          </div>

          {/* Headlines */}
          <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black leading-[0.95] tracking-tight text-white mb-8 drop-shadow-2xl">
            <span className="block">לא עוד סתם</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-400">
              דף נחיתה
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed max-w-lg mb-12" dir="rtl">
            בלי סיפורים – אני בונה אתרים שעוזרים לכם להכניס יותר <span className="font-bold text-[#22C55E]">כסף</span>.
          </p>

          {/* CTA Button - Black Pill */}
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-shadow"
          >
            <span>אני רוצה אתר כזה</span>
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
          
          {/* Trust Indicators (Optional Polish) */}
           <div className="mt-16 flex items-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex flex-col items-end gap-1">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-[10px] tracking-wider uppercase">High Conv.</span>
             </div>
             <div className="h-8 w-[1px] bg-white/20"></div>
             <div className="flex flex-col items-end gap-1">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-[10px] tracking-wider uppercase">Fast Load</span>
             </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
