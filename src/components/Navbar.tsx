import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Rules', href: '#rules' },
  { name: 'FAQ', href: '#faq' },
];

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy Active Section Detection
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegisterClick = () => {
    // Confetti burst effect
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.1, x: 0.85 },
      colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853']
    });
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSd8cnpJ3IRq-NSqEWzAf84ETrWMJXu15ADXkKyKQKMxNu_MTw/viewform", '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 glass-panel shadow-glass'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Google 4-Color Bracket Visual */}
            <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center p-1.5 shadow-lg group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-google-blue/20 via-google-red/20 to-google-green/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-mono text-sm font-bold flex items-center tracking-tight">
                <span className="text-google-blue font-extrabold">&lt;</span>
                <span className="text-google-red font-extrabold">G</span>
                <span className="text-google-yellow font-extrabold">D</span>
                <span className="text-google-green font-extrabold">G</span>
                <span className="text-google-blue font-extrabold">/&gt;</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg tracking-tight text-gradient-google">
                  INNOV8-MITS
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded font-mono font-semibold bg-google-blue/10 text-google-blue border border-google-blue/30">
                  '26
                </span>
              </div>
              <span className="text-[10px] tracking-wide uppercase text-gray-400 dark:text-gray-400 font-medium">
                GDG On Campus • MITS-DU
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Live Pill Tracker */}
          <nav className="hidden md:flex items-center p-1.5 rounded-full glass-card border border-white/10 shadow-lg">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-google-blue dark:hover:text-google-blue'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-google-blue to-indigo-600 shadow-neon-blue"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle + Register CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            
            <button
              onClick={handleRegisterClick}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-google-blue via-indigo-600 to-google-red text-white font-semibold text-xs tracking-wide shadow-lg hover:shadow-neon-blue transition-all duration-300 active:scale-95 flex items-center gap-2"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>Register Now</span>
            </button>
          </div>

          {/* Mobile Menu Trigger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg glass-card text-gray-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden glass-panel border-t border-white/10 mt-3 px-4 pt-3 pb-6 flex flex-col gap-3"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/10 text-gray-200"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleRegisterClick();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-google-blue to-google-red text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                Register For INNOV8 '26
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
