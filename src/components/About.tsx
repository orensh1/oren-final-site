import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-10%"]);

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-black">
      {/* Parallax Background Text */}
      <motion.div 
        style={{ x }}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap opacity-[0.03] select-none pointer-events-none"
      >
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
              בן 16. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-pink-500 to-purple-500">
                חושב כמו מנכ"ל.
              </span>
            </h2>
            <div className="space-y-6 text-lg text-zinc-300">
              <p>
                היי, אני אורן. בזמן שחברים שלי משחקים במשחקי מחשב, אני בונה עסקים.
              </p>
              <p>
                התחלתי לתכנת בגיל 12. היום, בגיל 16, אני עוזר לבעלי עסקים לקחת את הנוכחות הדיגיטלית שלהם ולהפוך אותה למכונה משומנת של לידים ומכירות.
              </p>
              <p>
                אני לא סוכנות גדולה ומסואבת. כשאתה עובד איתי, אתה עובד <strong>איתי</strong>. עם האנרגיה, הרעב להצליח, והטכנולוגיות הכי חדשות שיש היום בשוק.
              </p>
            </div>
            
            <div className="mt-10 flex gap-4">
               <div className="px-6 py-3 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
                  <span className="block text-2xl font-bold text-white">4</span>
                  <span className="text-xs text-zinc-500">שנות ניסיון</span>
               </div>
               <div className="px-6 py-3 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
                  <span className="block text-2xl font-bold text-white">100%</span>
                  <span className="text-xs text-zinc-500">מחויבות</span>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;