import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);
  const y = useTransform(scrollY, [0, 300], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-8 left-8 z-40"
    >
      <motion.a
        href="https://wa.me/YOUR_NUMBER" // Replace with actual WhatsApp link logic
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-shadow"
      >
        <MessageCircle size={28} />
      </motion.a>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold py-1 px-2 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        דבר איתי בווצאפ
      </div>
    </motion.div>
  );
};

export default FloatingCTA;