import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Button from './ui/Button';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const links = [
    { name: 'שירותים', href: '#services' },
    { name: 'קצת עליי', href: '#about' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6">
        <div className={`
          relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500
          ${isScrolled ? 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg' : 'bg-transparent'}
        `}>
          {/* Logo */}
          <a href="#" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
            OREN
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a href="#contact">
              <Button variant="outline" className="!py-2 !px-4 text-sm flex items-center gap-2">
                רוצה אתר כזה?
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 p-4 md:hidden"
        >
          <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-white/80 active:text-white"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full justify-center">רוצה אתר כזה?</Button>
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;