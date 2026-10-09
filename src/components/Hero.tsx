import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, FileText, MessageSquare, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { CountdownTimer } from './CountdownTimer';
import { HACKATHON_INFO, STATS } from '../data/hackathonData';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  const handleRegisterClick = (e: React.MouseEvent) => {
    // Confetti burst effect
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
    });

    // Also open the official Google form directly
    window.open(HACKATHON_INFO.googleFormUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-14 overflow-hidden">
      {/* 3D Canvas Background with subtle corner placements */}
      <ThreeHeroCanvas />

      {/* Ambient Gradient Glows (softened so text remains crisp) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-rose-500/10 dark:bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[250px] bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* GDG On Campus Club Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card border border-white/20 dark:border-white/10 shadow-md mb-5 hover:scale-105 transition-transform"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
            Presented by <strong className="text-blue-500 dark:text-blue-400 font-bold">GDG On Campus</strong> • MITS-DU Gwalior
          </span>
        </motion.div>

        {/* Main Title: Bold, High-Contrast Google Gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-3 flex items-center justify-center flex-wrap gap-2 sm:gap-3"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight select-none">
            <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] bg-clip-text text-transparent drop-shadow-md">
              INNOV8-MITS
            </span>
          </h1>
          <span className="px-3 py-1 rounded-xl bg-gradient-to-tr from-blue-600/30 to-purple-600/30 border border-blue-400/40 text-blue-400 font-mono text-2xl sm:text-4xl md:text-5xl font-black shadow-lg">
            '26
          </span>
        </motion.div>

        {/* Subtitle / Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 max-w-2xl mb-6 leading-relaxed font-sans"
        >
          <strong className="text-gray-900 dark:text-white font-bold">36 Hours of Code, Chaos & Creation.</strong>{' '}
          A premier National Hackathon empowering student builders to engineer bold, disruptive real-world solutions.
        </motion.p>

        {/* Live 36-Hour Flip Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-7 w-full flex justify-center"
        >
          <CountdownTimer />
        </motion.div>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-9"
        >
          {/* Primary CTA: Register via Google Form */}
          <a
            href={HACKATHON_INFO.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleRegisterClick}
            className="group relative px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#4285F4] via-indigo-600 to-[#EA4335] text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-neon-blue transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Register via Google Form</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Secondary CTA: Join Discord */}
          <a
            href={HACKATHON_INFO.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-2xl glass-card border border-white/20 dark:border-white/10 hover:border-blue-500/50 text-gray-800 dark:text-gray-200 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span>Join Official Discord</span>
          </a>

          {/* Rulebook Link */}
          <a
            href="#rules"
            className="px-5 py-3.5 rounded-2xl glass-card border border-white/20 dark:border-white/10 hover:border-emerald-500/50 text-gray-700 dark:text-gray-300 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-emerald-500" />
            <span>View Rulebook</span>
          </a>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-card py-3 px-4 rounded-2xl border border-white/15 dark:border-white/10 shadow-md text-center hover:border-blue-500/40 transition-colors group"
            >
              <div className="text-xl sm:text-2xl font-display font-black text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {stat.label}
              </div>
              <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
