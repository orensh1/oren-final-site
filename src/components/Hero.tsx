import React, { useRef, useState, useEffect } from 'react';
// v33 - Minimalist Tech Constellation
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import SuccessStack from './ui/SuccessStack'; // Keeping background textures

// --- CONSTELLATION MESH COMPONENT ---
const ConstellationMesh = () => {
    // Generate static nodes ensuring consistency across renders (using simple seeded random or fixed array would be better, but pure random on mount is fine for uniqueness)
    // We'll use a fixed seed-like generation for hydration stability if this was SSR, but here it's SPA.
    const nodeCount = 35;
    const [nodes, setNodes] = useState<any[]>([]);

    useEffect(() => {
        const newNodes = Array.from({ length: nodeCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            size: Math.random() * 3 + 2, // px
            isGreen: Math.random() > 0.85, // 15% chance of green
            delay: Math.random() * 2,
            duration: Math.random() * 3 + 4,
        }));
        setNodes(newNodes);
    }, []);

    // Mouse Interaction
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 120 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseX.set((clientX - centerX) / 30); // Minimal movement factor
        mouseY.set((clientY - centerY) / 30);
    };

    return (
        <motion.div 
            className="w-full h-full relative overflow-hidden rounded-3xl bg-slate-900/20 backdrop-blur-sm border border-white/5"
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
        >
            {/* SVG Layer for Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {nodes.map((node, i) => (
                    // Connect specific nodes to create "mesh" look without checking every pair (optimization)
                    // We connect node i to i+1 and i+2 if they exist
                    <React.Fragment key={`lines-${i}`}>
                        {nodes[i + 1] && (
                            <motion.line
                                x1={`${node.x}%`}
                                y1={`${node.y}%`}
                                x2={`${nodes[i + 1].x}%`}
                                y2={`${nodes[i + 1].y}%`}
                                stroke="rgba(255, 255, 255, 0.08)"
                                strokeWidth="1"
                                style={{ x: springX, y: springY }}
                            />
                        )}
                         {nodes[i + 3] && Math.random() > 0.5 && ( // Random occasional extra connections
                            <motion.line
                                x1={`${node.x}%`}
                                y1={`${node.y}%`}
                                x2={`${nodes[i + 3].x}%`}
                                y2={`${nodes[i + 3].y}%`}
                                stroke="rgba(255, 255, 255, 0.05)"
                                strokeWidth="0.5"
                                style={{ x: springX, y: springY }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </svg>

            {/* Nodes Layer */}
            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    className={`absolute rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: node.size,
                        height: node.size,
                        backgroundColor: node.isGreen ? '#22C55E' : '#6366F1', // Green or Indigo
                        x: springX,
                        y: springY,
                        boxShadow: node.isGreen ? '0 0 20px #22C55E' : '0 0 10px rgba(99, 102, 241, 0.5)'
                    }}
                    animate={{
                        y: [0, -10, 0],
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: node.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: node.delay
                    }}
                />
            ))}
            
            {/* Central Pulse Hub */}
             <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl z-[-1]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             />
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

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden text-white will-change-transform transform-gpu"
    >

      {/* 1. Global Background */}
      <SuccessStack />
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
          {/* Subtle Ambient Mesh */}
        <div className="absolute top-[-20%] right-[0%] w-[70vw] h-[70vw] rounded-full bg-purple-900/20 blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[0%] w-[70vw] h-[70vw] rounded-full bg-indigo-900/10 blur-[120px] mix-blend-screen pointer-events-none" />
      </div>


      {/* 2. Main Layout - 50/50 Split */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between gap-12 pt-[120px] pb-16 md:py-24 min-h-[90vh]">

        {/* RIGHT COLUMN: Text Content (Hebrew RTL) */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-start w-full md:w-1/2 relative z-20 order-1 md:order-1"
        >
          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 md:mb-12 flex items-center gap-4"
          >
            <div className="h-[1px] w-8 md:w-12 bg-white/30"></div>
            <div className="h-[1px] w-8 md:w-12 bg-white/30"></div>
            <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.2em] uppercase text-white/50">Oren Shamir &bull; v33 - CONSTELLATION</span>
          </motion.div>

          {/* Headline */}
          <div className="w-full text-right mb-8">
            <h1 className="text-6xl md:text-[7rem] lg:text-[8rem] font-black leading-[0.9] tracking-tighter text-white drop-shadow-xl">
              <span className="block text-white">
                לא עוד סתם
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-indigo-400 via-purple-400 to-white pb-2">
                 דף נחיתה
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-2xl text-[#E0E0E0] max-w-lg font-light leading-relaxed tracking-tight text-right pl-0 md:pl-12"
          >
            בלי סיפורים – אני בונה אתרים שעוזרים לכם להכניס יותר <span className="font-bold text-[#22C55E]">כסף</span>.
          </motion.p>

        </motion.div>

        {/* LEFT COLUMN: Minimalist Tech Constellation */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[600px] flex items-center justify-center relative z-20 order-2 md:order-2 perspective-[1000px]">
            <ConstellationMesh />
        </div>

      </div>
    </div>
  );
};

export default Hero;
