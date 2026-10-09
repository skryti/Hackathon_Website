import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, UserCheck, Sparkles, Zap, Utensils, Users, Coffee, Music, Code2, CheckCircle2, Radio, Flame, Lock, Trophy, Award } from 'lucide-react';
import { SCHEDULE_PHASES } from '../data/hackathonData';

// Dynamic icon mapper for timeline events
const getEventIcon = (iconName: string) => {
  switch (iconName) {
    case 'UserCheck': return UserCheck;
    case 'Sparkles': return Sparkles;
    case 'Zap': return Zap;
    case 'Utensils': return Utensils;
    case 'Users': return Users;
    case 'Coffee': return Coffee;
    case 'Music': return Music;
    case 'Code2': return Code2;
    case 'CheckCircle2': return CheckCircle2;
    case 'Radio': return Radio;
    case 'Flame': return Flame;
    case 'Lock': return Lock;
    case 'Trophy': return Trophy;
    case 'Award':
    default: return Award;
  }
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Keynote: { bg: 'bg-google-blue/15', text: 'text-google-blue', border: 'border-google-blue/30' },
  Hacking: { bg: 'bg-google-red/15', text: 'text-google-red', border: 'border-google-red/30' },
  Mentorship: { bg: 'bg-google-yellow/15', text: 'text-google-yellow', border: 'border-google-yellow/30' },
  Evaluation: { bg: 'bg-google-green/15', text: 'text-google-green', border: 'border-google-green/30' },
  'Fun/Relax': { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30' },
  Food: { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30' },
};

export const Timeline: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number>(1);

  const currentPhaseData = SCHEDULE_PHASES.find(p => p.phaseId === activePhase) || SCHEDULE_PHASES[0];

  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-google-yellow/10 border border-google-yellow/30 text-google-yellow text-xs font-mono font-semibold mb-4"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>36-HOUR RUNTIME SCHEDULE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            The Hackathon <span className="text-gradient-google">Timeline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sans"
          >
            Every hour counts. Explore our structured 3-phase schedule packed with keynotes, mentorship rounds, midnight feasts, mini games, and final pitching showdowns.
          </motion.p>
        </div>

        {/* Phase Toggle Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl glass-card border border-white/15 dark:border-white/10 shadow-lg">
            {SCHEDULE_PHASES.map((phase) => {
              const isActive = activePhase === phase.phaseId;
              return (
                <button
                  key={phase.phaseId}
                  onClick={() => setActivePhase(phase.phaseId)}
                  className={`relative px-4 sm:px-6 py-3 rounded-xl font-display font-bold text-xs sm:text-sm transition-all duration-300 ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="phasePill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-google-blue to-indigo-600 shadow-neon-blue"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{phase.day}</span>
                    <span className="hidden md:inline font-mono text-[10px] opacity-75">
                      ({phase.badge})
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Card Header */}
        <motion.div
          key={currentPhaseData.phaseId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-6 rounded-2xl border border-white/15 dark:border-white/10 mb-10 text-center max-w-2xl mx-auto shadow-lg"
        >
          <span className="text-xs font-mono font-bold text-google-blue uppercase tracking-wider block mb-1">
            {currentPhaseData.date} • {currentPhaseData.badge}
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-gray-900 dark:text-white">
            {currentPhaseData.title}
          </h3>
        </motion.div>

        {/* Vertical Timeline Tree */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative border-l-2 border-google-blue/30 dark:border-google-blue/20 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-10"
          >
            {currentPhaseData.events.map((event, idx) => {
              const EventIcon = getEventIcon(event.iconName);
              const catStyle = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.Keynote;

              return (
                <div key={event.title} className="relative group">
                  {/* Timeline Dot Indicator */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-dark-card border-2 border-google-blue flex items-center justify-center group-hover:scale-125 group-hover:border-google-red transition-all duration-300 shadow-md">
                    <div className="w-2 h-2 rounded-full bg-google-blue group-hover:bg-google-red" />
                  </div>

                  {/* Time Badge (Desktop Left Offset) */}
                  <div className="hidden sm:block absolute -left-36 top-1 w-28 text-right font-mono text-xs font-bold text-google-blue dark:text-blue-400">
                    {event.time}
                  </div>

                  {/* Event Card Content */}
                  <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/15 dark:border-white/10 hover:border-google-blue/40 shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    
                    {/* Mobile Time */}
                    <div className="sm:hidden font-mono text-xs font-bold text-google-blue mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h4 className="text-lg font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <EventIcon className="w-5 h-5 text-google-blue" />
                        <span>{event.title}</span>
                      </h4>

                      <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                        {event.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
