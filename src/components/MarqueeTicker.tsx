import React from 'react';
import { Sparkles, Terminal, Flame, Trophy, Code2, Globe } from 'lucide-react';

const MARQUEE_ITEMS = [
  { text: '36 HOURS OF NON-STOP CODING', icon: Terminal, color: 'text-google-blue' },
  { text: '₹1,00,000+ TOTAL PRIZE POOL', icon: Trophy, color: 'text-google-yellow' },
  { text: '500+ NATIONAL HACKERS', icon: Flame, color: 'text-google-red' },
  { text: 'GDG ON CAMPUS MITS-DU GWALIOR', icon: Globe, color: 'text-google-green' },
  { text: '6+ CUTTING-EDGE TECH TRACKS', icon: Code2, color: 'text-purple-400' },
  { text: 'FREE FOOD, SWAG & MENTORSHIP', icon: Sparkles, color: 'text-cyan-400' },
];

export const MarqueeTicker: React.FC = () => {
  return (
    <div className="relative w-full py-4 bg-gradient-to-r from-google-blue/10 via-google-red/10 via-google-yellow/10 to-google-green/10 border-y border-white/10 dark:border-white/5 backdrop-blur-md overflow-hidden select-none">
      
      {/* Glow Fades on Edges */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-8">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-center gap-3 font-mono font-bold text-sm tracking-widest text-gray-800 dark:text-gray-200 uppercase">
              <IconComponent className={`w-4 h-4 ${item.color}`} />
              <span>{item.text}</span>
              <span className="text-gray-400 dark:text-gray-600 font-extrabold">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
