import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type StyleOption = 'innovation' | 'clean' | 'impact';

const StyleSwitcher: React.FC = () => {
    const [activeStyle, setActiveStyle] = useState<StyleOption>('innovation');

    const styles = {
        innovation: {
            label: 'הייטק',
            previewTitle: 'Brave & Tech',
            previewSubtitle: 'עיצוב שמשדר קידמה וחדשנות. מתאים בול לסטארטאפים שרוצים להוביל.',
            bg: 'bg-[#000]',
            accent: 'from-cyan-500 to-blue-600',
            text: 'text-white',
            gradient: 'bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-transparent',
            orb: 'bg-cyan-500'
        },
        clean: {
            label: 'נקי',
            previewTitle: 'Clean & Simple',
            previewSubtitle: 'לתת לתוכן לדבר. עיצוב מינימליסטי ואוורירי שנותן הרגשה של יוקרה ושקט.',
            bg: 'bg-[#F5F5F7]',
            accent: 'from-zinc-400 to-zinc-600',
            text: 'text-[#1D1D1F]',
            gradient: 'bg-gradient-to-tr from-white via-zinc-100 to-transparent',
            orb: 'bg-zinc-400'
        },
        impact: {
            label: 'נועז',
            previewTitle: 'Bold & Loud',
            previewSubtitle: 'לתפוס את העין מהרגע הראשון. צבעים חזקים ומסר חד שלא משאיר מקום לספק.',
            bg: 'bg-[#1a0505]',
            accent: 'from-orange-500 to-red-600',
            text: 'text-white',
            gradient: 'bg-gradient-to-tr from-red-600/10 via-orange-500/5 to-transparent',
            orb: 'bg-orange-500'
        }
    };

    return (
        <section className="py-20 md:py-32 bg-[#080808] text-white relative overflow-hidden">

            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[800px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Headlines - Apple Style */}
                <div className="text-center mb-12 md:mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-semibold tracking-tight"
                    >
                        איך המותג שלכם <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">מרגיש?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-3xl text-zinc-400 font-medium max-w-2xl mx-auto leading-tight"
                    >
                        תבחרו את הסגנון שהכי נכון לכם, אני כבר אדאג שזה יראה מיליון דולר.
                    </motion.p>
                </div>

                {/* Segmented Control - Floating Pill */}
                <div className="flex justify-center mb-20">
                    <div className="bg-white/10 backdrop-blur-xl p-1.5 rounded-full inline-flex relative z-20 border border-white/5">
                        {(Object.keys(styles) as StyleOption[]).map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveStyle(key)}
                                className={`relative px-8 py-3 rounded-full text-lg font-medium transition-colors duration-200 ${activeStyle === key ? 'text-black' : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                {activeStyle === key && (
                                    <motion.div
                                        layoutId="activePill"
                                        className="absolute inset-0 bg-white rounded-full shadow-lg"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{styles[key].label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pro Display Mockup */}
                <div className="relative max-w-5xl mx-auto">
                    <motion.div
                        layout
                        className="relative aspect-[16/10] bg-[#1d1d1f] rounded-[2rem] border-[1px] border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5 isolate transform-gpu"
                        style={{
                            boxShadow: '0 0 0 1px rgba(0,0,0,1), 0 30px 60px -12px rgba(0,0,0,0.5)',
                            WebkitMaskImage: '-webkit-radial-gradient(white, black)' // Force mask for Safari
                        }}
                    >
                        {/* Screen Content */}
                        <div className="absolute inset-0 w-full h-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStyle}
                                    initial={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                    className={`h-full w-full flex flex-col items-center justify-center relative overflow-hidden ${styles[activeStyle].bg}`}
                                >
                                    {/* Dynamic Gradient Background */}
                                    <div className={`absolute inset-0 ${styles[activeStyle].gradient}`} />

                                    {/* Animated Orb/Glow */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] ${styles[activeStyle].orb} blur-[80px] md:blur-[120px] opacity-20 hover:opacity-30 transition-opacity duration-700`}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10 text-center space-y-4 md:space-y-6 px-4">
                                        <motion.h3
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className={`text-3xl md:text-6xl lg:text-8xl font-bold tracking-tighter ${styles[activeStyle].text}`}
                                        >
                                            {styles[activeStyle].previewTitle}
                                        </motion.h3>
                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className={`text-sm md:text-2xl font-medium tracking-wide opacity-80 ${styles[activeStyle].text}`}
                                        >
                                            {styles[activeStyle].previewSubtitle}
                                        </motion.p>

                                        {/* UI Element Mockup */}
                                        <motion.div
                                            initial={{ y: 40, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex items-center gap-4 justify-center mt-6 md:mt-8"
                                        >
                                            <div className={`h-10 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl flex items-center bg-gradient-to-r ${styles[activeStyle].accent} shadow-lg text-white font-bold tracking-wide text-xs md:text-base`}>
                                                להתחיל פרויקט
                                            </div>
                                        </motion.div>
                                    </div>

                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Glossy Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Stand (Minimal) */}
                    <div className="w-[180px] h-12 bg-[#1d1d1f] mx-auto mt-[-2px] rounded-b-2xl relative z-0 border-b border-r border-l border-white/5 opacity-80"></div>
                    <div className="w-[240px] h-2 bg-[#1d1d1f] mx-auto mt-0 rounded-full opacity-50 blur-sm"></div>

                </div>

            </div>
        </section>
    );
};

export default StyleSwitcher;
