import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, HeartPulse, Coins, Sparkles, ArrowUpRight, Layers } from 'lucide-react';
import { TRACKS } from '../data/hackathonData';
import type { Track } from '../types';
import { TrackModal } from './TrackModal';

// Icon map helper
const getTrackIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu': return Cpu;
    case 'ShieldCheck': return ShieldCheck;
    case 'Zap': return Zap;
    case 'HeartPulse': return HeartPulse;
    case 'Coins': return Coins;
    case 'Sparkles':
    default: return Sparkles;
  }
};

// 3D Parallax Tilt Card Component
const TiltCard: React.FC<{
  track: Track;
  index: number;
  onSelect: (track: Track) => void;
}> = ({ track, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt angles between -12 and +12 deg
    const middleX = rect.width / 2;
    const middleY = rect.height / 2;
    
    const rY = ((x - middleX) / middleX) * 12;
    const rX = -((y - middleY) / middleY) * 12;

    setRotateX(rX);
    setRotateY(rY);
    setCursorPos({ x, y });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const IconComp = getTrackIcon(track.iconName);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      className="relative rounded-3xl cursor-pointer select-none group"
      onClick={() => onSelect(track)}
    >
      {/* Outer Card Container */}
      <div className="relative rounded-3xl glass-card border border-white/15 dark:border-white/10 p-7 sm:p-8 h-full flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300">
        
        {/* Dynamic Glowing Cursor-Follow Spotlight */}
        {isHovered && (
          <div
            className="absolute pointer-events-none rounded-full blur-2xl opacity-40 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              width: '200px',
              height: '200px',
              backgroundColor: track.hexColor,
            }}
          />
        )}

        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none"
          style={{ backgroundColor: track.hexColor }}
        />

        <div>
          {/* Track Header Icon & Badge */}
          <div className="flex items-center justify-between mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${track.hexColor}20`,
                border: `1px solid ${track.hexColor}50`,
                color: track.hexColor,
              }}
            >
              <IconComp className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 dark:bg-white/5 border border-white/15 text-[11px] font-mono font-semibold text-gray-500 dark:text-gray-300 group-hover:border-white/30 transition-colors">
              <span>0{index + 1}</span>
              <span>/ 06</span>
            </div>
          </div>

          {/* Track Tagline */}
          <span
            className="text-xs font-mono font-bold tracking-wider uppercase mb-1 block"
            style={{ color: track.hexColor }}
          >
            {track.tagline}
          </span>

          {/* Title */}
          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3 group-hover:text-google-blue transition-colors">
            {track.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-sans">
            {track.shortDesc}
          </p>
        </div>

        {/* Card Footer: Problem statement count & Modal trigger */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
          <span className="text-gray-500 dark:text-gray-400 font-mono">
            {track.problemStatements.length} Challenges Available
          </span>

          <span
            className="flex items-center gap-1 font-bold transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: track.hexColor }}
          >
            <span>Explore Track</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

      </div>
    </motion.div>
  );
};

export const Tracks: React.FC<{ onOpenRegister: () => void }> = ({ onOpenRegister }) => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <section id="tracks" className="py-24 relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-google-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-google-green/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-google-red/10 border border-google-red/30 text-google-red text-xs font-mono font-semibold mb-4"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>PROBLEM DOMAINS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            6 High-Impact <span className="text-gradient-google">Hackathon Tracks</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sans"
          >
            Choose your battleground. From Autonomous AI and Zero-Knowledge security to Smart Campus automation, each track offers curated problem statements and dedicated prizes.
          </motion.p>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TRACKS.map((track, idx) => (
            <TiltCard
              key={track.id}
              track={track}
              index={idx}
              onSelect={setSelectedTrack}
            />
          ))}
        </div>

      </div>

      {/* Expandable Track Detail Modal */}
      <TrackModal
        track={selectedTrack}
        onClose={() => setSelectedTrack(null)}
        onRegister={onOpenRegister}
      />
    </section>
  );
};
