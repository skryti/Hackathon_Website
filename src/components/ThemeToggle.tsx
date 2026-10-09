import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark/Light Theme"
      className={`relative flex items-center w-16 h-9 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-google-blue ${
        isDark ? 'bg-dark-surface border border-dark-border shadow-inner' : 'bg-gray-200 border border-gray-300 shadow-inner'
      }`}
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex justify-between items-center px-2 text-xs select-none pointer-events-none">
        <Sun className={`w-3.5 h-3.5 ${isDark ? 'text-gray-500' : 'text-amber-500'}`} />
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-google-blue' : 'text-gray-400'}`} />
      </div>

      {/* Sliding Morphing Pill */}
      <motion.div
        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-transform ${
          isDark 
            ? 'bg-gradient-to-tr from-google-blue to-indigo-600 text-white' 
            : 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-900'
        }`}
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        animate={{
          x: isDark ? 28 : 0,
          rotate: isDark ? 360 : 0
        }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-white" />
        ) : (
          <Sun className="w-4 h-4 text-slate-900" />
        )}
      </motion.div>
    </button>
  );
};
