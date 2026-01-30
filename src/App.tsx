import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import FloatingCTA from './components/FloatingCTA';


const App: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Custom Cursor Logic
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-pink-500/30 selection:text-pink-200">


      {/* Custom Cursor Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>

      <FloatingCTA />
    </div>
  );
};

export default App;