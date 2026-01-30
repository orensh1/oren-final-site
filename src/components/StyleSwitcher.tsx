import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Monitor, Smartphone } from 'lucide-react';

type StyleOption = 'hitech' | 'minimal' | 'bold';

const StyleSwitcher: React.FC = () => {
    const [activeStyle, setActiveStyle] = useState<StyleOption>('hitech');

    const styles = {
        hitech: {
            label: 'הייטק',
            color: 'blue',
            bg: 'bg-gradient-to-br from-[#0f172a] to-[#1e293b]',
            text: 'text-blue-200',
            previewText: 'תצוגה מקדימה: סגנון הייטק',
            description: 'עיצוב כהה, נקי ומתוחכם עם אלמנטים ניאוניים ותחושת עתידנות.'
        },
        minimal: {
            label: 'מינימליסטי',
            color: 'zinc',
            bg: 'bg-white',
            text: 'text-zinc-800',
            previewText: 'תצוגה מקדימה: סגנון מינימליסטי',
            description: 'פחות זה יותר. חלל לבן, טיפוגרפיה מדויקת ופוקוס מלא על המסר.'
        },
        bold: {
            label: 'עוצמתי',
            color: 'red',
            bg: 'bg-gradient-to-br from-red-600 to-orange-600',
            text: 'text-white',
            previewText: 'תצוגה מקדימה: סגנון מכירתי עוצמתי',
            description: 'צבעים חזקים, קונטרסט גבוה והנעה לפעולה שאי אפשר לפספס.'
        }
    };

    return (
        <section className="py-24 bg-[#080808] text-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Headlines */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">איך ייראה דף הנחיתה שלכם?</h2>
                    <p className="text-xl text-zinc-400">תבחר סגנון ותראה את הקסם קורה</p>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 mb-16 flex-wrap">
                    {(Object.keys(styles) as StyleOption[]).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveStyle(key)}
                            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 border ${activeStyle === key
                                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                                    : 'bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {styles[key].label}
                        </button>
                    ))}
                </div>

                {/* Laptop Mockup */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Laptop Body */}
                    <div className="relative mx-auto bg-gray-900 border-[8px] border-gray-800 rounded-t-3xl h-[300px] md:h-[450px] w-full shadow-2xl overflow-hidden md:max-w-4xl">
                        {/* Screen Content */}
                        <div className="h-full w-full relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStyle}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                    className={`absolute inset-0 flex flex-col items-center justify-center p-8 ${styles[activeStyle].bg}`}
                                >
                                    <div className={`text-4xl font-bold mb-4 ${styles[activeStyle].text}`}>
                                        {styles[activeStyle].previewText}
                                    </div>
                                    <p className={`text-lg max-w-md text-center opacity-80 ${activeStyle === 'minimal' ? 'text-zinc-600' : 'text-white'}`}>
                                        {styles[activeStyle].description}
                                    </p>

                                    {/* Dummy UI Elements */}
                                    <div className="mt-8 flex gap-4">
                                        <div className={`h-12 w-32 rounded-lg ${activeStyle === 'minimal' ? 'bg-black' : 'bg-white/20'}`} />
                                        <div className={`h-12 w-12 rounded-full ${activeStyle === 'minimal' ? 'bg-zinc-200' : 'bg-white/10'}`} />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    {/* Laptop Base */}
                    <div className="relative mx-auto bg-gray-800 rounded-b-xl rounded-t-sm h-[20px] md:h-[30px] w-full md:max-w-[calc(100%+40px)] -ml-[20px] shadow-xl">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gray-700 w-32 h-2 rounded-b-lg"></div>
                    </div>

                    {/* Glow underneath */}
                    <div className={`absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 blur-[60px] transition-colors duration-500 rounded-full
            ${activeStyle === 'hitech' ? 'bg-blue-600/30' :
                            activeStyle === 'bold' ? 'bg-red-600/30' : 'bg-white/10'}
          `} />
                </div>

            </div>
        </section>
    );
};

export default StyleSwitcher;
