import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageCircle, Accessibility, X } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);
  const y = useTransform(scrollY, [0, 300], [20, 0]);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleClass = (className: string) => {
    document.documentElement.classList.toggle(className);
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-8 left-8 z-50 flex flex-col gap-4 items-center"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-full mb-6 left-0 bg-white/95 backdrop-blur-xl text-black p-6 rounded-3xl shadow-2xl w-[320px] md:w-[400px] flex flex-col gap-4 origin-bottom-left max-h-[80vh] overflow-y-auto border border-white/20 custom-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <h4 className="font-bold text-xl flex items-center gap-2">
                <Accessibility className="w-5 h-5" />
                כלי נגישות
              </h4>
              <button
                onClick={() => {
                  document.documentElement.className = '';
                  setIsOpen(false);
                }}
                className="text-xs font-semibold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors"
              >
                איפוס הכל
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'large-text', label: 'הגדל טקסט', icon: 'A+' },
                { id: 'readable-font', label: 'גופן קריא', icon: 'Aa' },
                { id: 'grayscale', label: 'גווני אפור', icon: 'BW' },
                { id: 'high-contrast', label: 'ניגודיות', icon: '◑' },
                { id: 'invert-colors', label: 'היפוך צבעים', icon: 'In' },
                { id: 'light-mode', label: 'רקע בהיר', icon: '☀' },
                { id: 'highlight-links', label: 'הדגשת קישורים', icon: '🔗' },
                { id: 'highlight-titles', label: 'הדגשת כותרות', icon: 'H' },
                { id: 'stop-animations', label: 'עצור תנועה', icon: '⏹' },
                { id: 'big-cursor', label: 'סמן גדול', icon: '↖' },
              ].map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => toggleClass(tool.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all border border-black/5 hover:border-blue-500/30 hover:bg-blue-50 ${document.documentElement.classList.contains(tool.id) ? 'bg-blue-100 border-blue-500' : 'bg-white'
                    }`}
                >
                  <span className="text-xl font-bold bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full mb-1">
                    {tool.icon}
                  </span>
                  <span className="text-xs font-medium text-center leading-tight">{tool.label}</span>
                </button>
              ))}
            </div>

            <div className="text-center pt-2">
              <button onClick={() => setIsOpen(false)} className="mx-auto w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors">
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility Button */}
      <motion.button
        title="Accessibility Tools"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-colors z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Accessibility size={24} />
      </motion.button>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/972526448826"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow relative group z-40"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </motion.a>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold py-1 px-2 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        דבר איתי בווצאפ
      </div>
    </motion.div>
  );
};

export default FloatingCTA;