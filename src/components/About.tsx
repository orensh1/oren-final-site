import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-10%"]);

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-black">
      {/* Continuous Marquee Text */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30
        }}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap opacity-[0.03] select-none pointer-events-none flex gap-10 w-max"
      >
        <span className="text-[20vw] font-black uppercase">OREN SHAMIR CREATIVE</span>
        <span className="text-[20vw] font-black uppercase">OREN SHAMIR CREATIVE</span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden relative">
              {/* Placeholder for Oren's image */}
              <img
                src="https://picsum.photos/800/800?grayscale"
                alt="Oren Shamir"
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 right-6 text-white">
                <p className="font-bold text-xl">אורן שמיר</p>
                <p className="text-sm opacity-70">מפתח & מעצב</p>
              </div>
            </div>
            {/* Decoration Element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-600 rounded-full blur-[80px] opacity-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-white">נעים להכיר, </span>
              <br />
              <span
                style={{
                  background: '-webkit-linear-gradient(45deg, #ff007f, #a200ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                אורן שמיר.
              </span>
            </h2>
            <div className="space-y-6 text-lg text-zinc-300">
              <p>
                אני בן 16, מבאר שבע.
              </p>
              <p>
                אני בונה אתרים ודפי נחיתה לעסקים. אני אוהב את התחום הזה ומשקיע בכל פרויקט כדי שייצא הכי טוב שיש.
              </p>
              <p>
                העבודה איתי היא ישירה ופשוטה. בלי מילים מסובכות ובלי תהליכים ארוכים. אתם אומרים לי מה אתם צריכים, ואני דואג לבנות את זה.
              </p>
              <p>
                מוזמנים לשלוח הודעה ולהתחיל לעבוד.
              </p>
            </div>

            <div className="mt-10 flex gap-4">
              <div className="px-6 py-3 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
                <span className="block text-2xl font-bold text-white">100%</span>
                <span className="text-xs text-zinc-500">פוקוס על המרה</span>
              </div>
              <div className="px-6 py-3 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
                <span className="block text-2xl font-bold text-white">ממוקד</span>
                <span className="text-xs text-zinc-500">בתוצאות</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;