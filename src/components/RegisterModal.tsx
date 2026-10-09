import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, ExternalLink, CheckCircle2, User, Mail, School, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HACKATHON_INFO } from '../data/hackathonData';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [college, setCollege] = useState('');
  const [teamSize, setTeamSize] = useState('4');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Confetti celebration burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
    });

    // Auto open google form placeholder after slight delay
    setTimeout(() => {
      window.open(HACKATHON_INFO.googleFormUrl, '_blank');
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg glass-card rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden my-8"
        >
          {/* Header Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full glass-panel text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close registration modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-google-yellow" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-google-blue">
                  INNOV8-MITS 2026 REGISTRATION
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Secure Your Spot
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-6">
                Fill out quick details below to initiate your team registration via Google Forms.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    TEAM NAME *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. ByteBusters"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-panel text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-google-blue border border-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    TEAM LEADER FULL NAME *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-panel text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-google-blue border border-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    COLLEGE EMAIL ADDRESS *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@mitsgwalior.in"
                      value={leaderEmail}
                      onChange={(e) => setLeaderEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-panel text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-google-blue border border-white/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      COLLEGE / INSTITUTION *
                    </label>
                    <div className="relative">
                      <School className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. MITS Gwalior"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-panel text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-google-blue border border-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      TEAM SIZE (2-4) *
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl glass-panel text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-google-blue border border-white/10"
                    >
                      <option value="2">2 Members</option>
                      <option value="3">3 Members</option>
                      <option value="4">4 Members</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-google-blue via-indigo-600 to-google-red text-white font-bold text-sm shadow-xl hover:shadow-neon-blue transition-all flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>Proceed to Official Google Form</span>
                  </button>
                  <p className="text-[11px] text-gray-500 text-center mt-2">
                    100% Free Registration • Instant Confirmation
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-google-green/20 border border-google-green text-google-green flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Awesome! You're Almost There
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto leading-relaxed">
                Opening the official Google Form in a new tab now. Please complete member details to confirm your team slot.
              </p>

              <a
                href={HACKATHON_INFO.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-google-blue to-google-green text-white font-bold text-xs shadow-lg"
              >
                <span>Open Google Form Manually</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
