import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Terminal, ArrowRight } from 'lucide-react';
import type { Track } from '../types';

interface TrackModalProps {
  track: Track | null;
  onClose: () => void;
  onRegister: () => void;
}

export const TrackModal: React.FC<TrackModalProps> = ({ track, onClose, onRegister }) => {
  if (!track) return null;

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
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl glass-card rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden my-8"
        >
          {/* Header Bar Accent */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ backgroundColor: track.hexColor }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full glass-panel text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close track details modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Track Header */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg font-bold"
              style={{ backgroundColor: track.hexColor }}
            >
              <Terminal className="w-7 h-7" />
            </div>
            <div>
              <span
                className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/10 border"
                style={{ color: track.hexColor, borderColor: `${track.hexColor}40` }}
              >
                Track Overview
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white mt-1">
                {track.title}
              </h3>
            </div>
          </div>

          {/* Track Tagline & Full Description */}
          <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-200 mb-3">
            {track.tagline}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-sans">
            {track.fullDesc}
          </p>

          {/* Problem Statements List */}
          <div className="mb-8">
            <h4 className="text-base font-display font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-google-yellow" />
              <span>Sample Problem Statements & Challenges</span>
            </h4>

            <div className="space-y-4">
              {track.problemStatements.map((ps) => (
                <div
                  key={ps.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                      {ps.title}
                    </h5>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-google-blue/20 text-google-blue border border-google-blue/30">
                      {ps.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                    {ps.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-gray-400">Suggested Stack:</span>
                    {ps.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl glass-panel text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Close Window
            </button>
            
            <button
              onClick={() => {
                onClose();
                onRegister();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-google-blue to-google-red text-white font-bold text-xs shadow-lg hover:shadow-neon-blue transition-all flex items-center gap-2"
            >
              <span>Build in this Track</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
