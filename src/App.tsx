import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StyleSwitcher from './components/StyleSwitcher';
import About from './components/About';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Contact from './components/Contact';


const App: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Custom Cursor Logic - Performance Optimized (No State Re-renders)
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
      }
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-pink-500/30 selection:text-pink-200">


      {/* Custom Cursor Glow */}
      <div
        ref={cursorRef}
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at 50% 50%, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <StyleSwitcher />
        <About />
        <Process />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
};

export default App;