import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import orenImage from '../assets/oren-portrait-new.jpg';
import { Layout, Zap, Smartphone, Code2 } from 'lucide-react';


const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-10%"]);

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-black">
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
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden relative">
              {/* Oren's proper image */}
              <img
                src={orenImage}
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

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center gap-2 text-center group hover:bg-white/5 transition-colors">
                <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Smartphone size={24} />
                </div>
                <h3 className="font-bold text-white">נראה טוב בנייד</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  רוב הלקוחות מגיעים מהטלפון אז אני דואג שהאתר יעבוד שם חלק ומהיר
                </p>
              </div>

              <div className="p-4 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center gap-2 text-center group hover:bg-white/5 transition-colors">
                <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Zap size={24} />
                </div>
                <h3 className="font-bold text-white">קוד נקי ומהיר</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  אני לא משתמש במערכות כבדות ומסובכות אלא בונה אתרים קלים ויעילים
                </p>
              </div>

              <div className="p-4 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center gap-2 text-center group hover:bg-white/5 transition-colors">
                <div className="p-3 rounded-full bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <Layout size={24} />
                </div>
                <h3 className="font-bold text-white">מדברים איתי ישירות</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  בלי מנהלי תיקים ובלי להמתין לנציגים פשוט שולחים לי הודעה בוואטסאפ ומתקדמים
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;