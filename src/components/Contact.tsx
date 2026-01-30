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
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

            {/* Text Area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
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
            <div className="flex flex-col gap-8 w-full lg:w-1/2">
              {/* WhatsApp Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#25D366]/10 backdrop-blur-md p-8 rounded-3xl border border-[#25D366]/20 relative overflow-hidden group hover:border-[#25D366]/40 transition-colors"
              >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-right">
                    <h3 className="text-2xl font-bold text-white mb-2">זמין עכשיו בוואטסאפ</h3>
                    <p className="text-zinc-400 text-sm">למענה מהיר ושיחה ישירה, שלחו לי הודעה.</p>
                  </div>
                  <a
                    href="https://wa.me/972526448826"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-900/20 whitespace-nowrap"
                  >
                    <Send size={18} className="rotate-0 md:rotate-45" />
                    <span>שלח הודעה</span>
                  </a>
                </div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#25D366_1px,transparent_1px)] [background-size:16px_16px]" />
              </motion.div>

              {/* Existing Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900/30 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10"
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
          </div>


          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center text-xs text-zinc-500 order-2 md:order-1">
              <div className="flex items-center gap-6">
                <button onClick={(e) => openModal(e, 'privacy')} className="hover:text-white transition-colors">מדיניות פרטיות</button>
                <button onClick={(e) => openModal(e, 'accessibility')} className="hover:text-white transition-colors">הצהרת נגישות</button>
                <button onClick={(e) => openModal(e, 'terms')} className="hover:text-white transition-colors">תנאי שימוש</button>
              </div>
              <p>© 2026 Oren Shamir. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-6 order-1 md:order-2">
              <a href="https://www.instagram.com/orenshamir1/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-pink-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:oren@example.com" className="text-zinc-500 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="tel:+972526448826" className="text-zinc-500 hover:text-white transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Credits Bar */}
          <div className="mt-8 pt-4 border-t border-white/5 text-center">
            <p className="text-zinc-600 text-xs dir-rtl" dir="rtl">
              כל הזכויות שמורות לבונה האתר אורן שמיר 052-644-8826
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;