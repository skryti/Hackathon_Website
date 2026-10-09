import React from 'react';
import { Sparkles, ArrowRight, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HACKATHON_INFO } from '../data/hackathonData';

export const RegisterBanner: React.FC<{ onOpenRegister: () => void }> = ({ onOpenRegister }) => {
  const handleRegisterClick = () => {
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
    });
    window.open(HACKATHON_INFO.googleFormUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Glowing Banner Card */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 border border-white/20 shadow-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
          
          {/* Animated Gradient Meshes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/30 via-rose-500/20 to-transparent rounded-full blur-[100px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/30 via-amber-500/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

          {/* Floating Geometric Ornaments */}
          <div className="absolute top-6 right-8 w-16 h-16 rounded-2xl border border-white/20 bg-white/5 rotate-12 backdrop-blur-md hidden sm:block animate-float" />
          <div className="absolute bottom-8 right-32 w-10 h-10 rounded-full border border-amber-400/40 bg-amber-400/10 -rotate-12 backdrop-blur-md hidden sm:block" />

          <div className="relative z-10 max-w-3xl">
            {/* Live Registration Closing Alert */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-mono font-bold mb-6 backdrop-blur-md">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>LIMITED HACKER SLOTS • REGISTRATIONS CLOSING SOON</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
              Are You Ready To <span className="text-gradient-google">INNOV8?</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 font-sans leading-relaxed mb-8 max-w-2xl">
              Don't miss the flagship 36-hour sprint at MITS-DU Gwalior. Team registrations are 100% free with fully sponsored stay, food, mentorship, and ₹1,00,000+ in rewards.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleRegisterClick}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4285F4] via-indigo-600 to-[#EA4335] text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-neon-blue transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 group"
              >
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>Register Your Team Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={HACKATHON_INFO.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-2xl glass-panel text-white font-semibold text-xs sm:text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <span>Direct Google Form Link</span>
                <ExternalLink className="w-4 h-4 text-blue-400" />
              </a>
            </div>

            {/* Deadline Notice */}
            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-gray-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Deadline: {HACKATHON_INFO.registrationDeadline}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
