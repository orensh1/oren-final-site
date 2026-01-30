import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Send } from 'lucide-react';
import Button from './ui/Button';
import LegalModals, { LegalType } from './LegalModals';

const Contact: React.FC = () => {
  const [activeModal, setActiveModal] = useState<LegalType>(null);

  const openModal = (e: React.MouseEvent, type: LegalType) => {
    e.preventDefault();
    setActiveModal(type);
  };

  return (
    <>
      <LegalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
      <footer id="contact" className="relative pt-20 md:pt-32 pb-10 bg-black overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-indigo-900/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">

            {/* Text Area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                בוא ניצור <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">
                  משהו מדהים.
                </span>
              </h2>
              <p className="text-zinc-400 text-xl mb-12 max-w-md">
                יש לך פרויקט בראש? רוצה לשדרג את העסק?
                אני זמין לשיחה. בלי התחייבות.
              </p>

              <div className="flex flex-col gap-6">
                <a href="mailto:orenshamir5@gmail.com" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                    <Mail size={20} />
                  </div>
                  <span className="text-lg">orenshamir5@gmail.com</span>
                </a>
                <a href="tel:0526448826" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                    <Phone size={20} />
                  </div>
                  <span className="text-lg">052-644-8826</span>
                </a>
              </div>
            </motion.div>

            {/* Form Area */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 bg-zinc-900/30 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10"
            >
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">שם מלא</label>
                  <input type="text" className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors text-white" placeholder="ישראל ישראלי" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">אימייל</label>
                  <input type="email" className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors text-white" placeholder="example@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">על הפרויקט</label>
                  <textarea rows={4} className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors text-white resize-none" placeholder="ספר לי קצת על העסק שלך..." />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    required
                    className="mt-1 w-4 h-4 rounded border-white/10 bg-zinc-950/50 text-pink-500 focus:ring-pink-500 focus:ring-offset-0"
                  />
                  <label htmlFor="privacy-policy" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
                    אני מאשר/ת את <a href="#privacy" onClick={(e) => openModal(e, 'privacy')} className="underline hover:text-white">מדיניות הפרטיות</a> ומסכים/ה לקבלת פרטים נוספים.
                  </label>
                </div>
                <Button className="w-full text-lg group">
                  שלח הודעה
                  <Send size={18} className="group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
          </div>

          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center text-xs text-zinc-500 order-2 md:order-1">
              <p>© 2024 Oren Shamir. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#privacy" onClick={(e) => openModal(e, 'privacy')} className="hover:text-zinc-300 transition-colors">מדיניות פרטיות</a>
                <span className="opacity-30">|</span>
                <a href="#accessibility" onClick={(e) => openModal(e, 'accessibility')} className="hover:text-zinc-300 transition-colors">הצהרת נגישות</a>
                <span className="opacity-30">|</span>
                <a href="#terms" onClick={(e) => openModal(e, 'terms')} className="hover:text-zinc-300 transition-colors">תנאי שימוש</a>
              </div>
            </div>
            <div className="flex gap-6 order-1 md:order-2">
              <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Instagram size={20} /></a>
              {/* Add more social icons here */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;