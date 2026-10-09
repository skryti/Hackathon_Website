import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 35,
    hours: 9,
    minutes: 26,
    seconds: 15,
  });

  useEffect(() => {
    // Target event start date (Nov 14, 2026, 10:00 AM IST)
    const targetDate = new Date('2026-11-14T10:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days, color: 'text-blue-400', border: 'border-blue-500/40', bg: 'bg-blue-500/10' },
    { label: 'HOURS', value: timeLeft.hours, color: 'text-rose-400', border: 'border-rose-500/40', bg: 'bg-rose-500/10' },
    { label: 'MINUTES', value: timeLeft.minutes, color: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-500/10' },
    { label: 'SECONDS', value: timeLeft.seconds, color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-mono font-semibold mb-3 backdrop-blur-md shadow-sm">
        <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
        <span>HACKATHON COMMENCES IN</span>
      </div>

      {/* Digits Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            {/* Box */}
            <div className={`relative w-15 sm:w-20 md:w-24 h-18 sm:h-22 md:h-26 rounded-2xl glass-card flex flex-col items-center justify-center border ${unit.border} ${unit.bg} shadow-lg backdrop-blur-xl group hover:scale-105 transition-all duration-300`}>
              
              {/* Digit Display */}
              <motion.span
                key={unit.value}
                initial={{ y: -4, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`font-mono text-2xl sm:text-3xl md:text-5xl font-black tracking-tight ${unit.color} drop-shadow-md`}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>

              {/* Sub-label inside/under */}
              <span className="text-[9px] sm:text-[10px] md:text-xs font-mono font-bold tracking-widest text-gray-400 dark:text-gray-300 mt-1 uppercase">
                {unit.label}
              </span>

              {/* Subtle top reflection line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 rounded-t-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
