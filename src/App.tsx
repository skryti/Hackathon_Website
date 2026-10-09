import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { About } from './components/About';
import { Tracks } from './components/Tracks';
import { Timeline } from './components/Timeline';
import { Prizes } from './components/Prizes';
import { Rules } from './components/Rules';
import { RegisterBanner } from './components/RegisterBanner';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { RegisterModal } from './components/RegisterModal';

function AppContent() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Top Page Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-400 selection:bg-google-blue selection:text-white">
      
      {/* Scroll Progress Bar at Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Glass Navbar */}
      <Navbar onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* Main Page Content */}
      <main>
        {/* 1. Hero Section with Three.js 3D Background & Live Countdown */}
        <Hero onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* 2. High-energy Marquee Ticker */}
        <MarqueeTicker />

        {/* 3. About GDG MITS & Highlights */}
        <About />

        {/* 4. Hackathon Problem Tracks (6 Interactive 3D Tilt Cards) */}
        <Tracks onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* 5. 36-Hour Runtime Timeline / Schedule */}
        <Timeline />

        {/* 6. Prizes & Swag (3D Podium Design) */}
        <Prizes />

        {/* 7. Rules & Judging Criteria Rubric */}
        <Rules />

        {/* 8. Registration CTA Banner */}
        <RegisterBanner onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* 9. FAQ Section */}
        <FAQ />
      </main>

      {/* 10. Footer & Community Links */}
      <Footer />

      {/* Registration Modal Dialog */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
