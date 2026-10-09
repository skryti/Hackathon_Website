import React from 'react';
import { motion } from 'framer-motion';
import { Users, Utensils, Network, Code2, Rocket } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Users,
    title: 'Mentorship from Google & Industry Leaders',
    description: 'Get direct 1-on-1 guidance from Google Developer Experts, VC partners, and tech architects to supercharge your project code & pitch.',
    color: 'google-blue',
    border: 'hover:border-google-blue/50',
    bgGlow: 'from-google-blue/10 to-transparent',
    iconColor: 'text-google-blue'
  },
  {
    icon: Utensils,
    title: 'Free Food, Swag & Fuel 24/7',
    description: 'Enjoy 100% sponsored gourmet meals, midnight pizza, continuous coffee stations, t-shirts, stickers, and premium GDG swag kits.',
    color: 'google-red',
    border: 'hover:border-google-red/50',
    bgGlow: 'from-google-red/10 to-transparent',
    iconColor: 'text-google-red'
  },
  {
    icon: Network,
    title: 'High-Octane Networking',
    description: 'Connect with 500+ top student developers, founders, and recruiters across India. Build lifelong friendships and find co-founders.',
    color: 'google-yellow',
    border: 'hover:border-google-yellow/50',
    bgGlow: 'from-google-yellow/10 to-transparent',
    iconColor: 'text-google-yellow'
  },
  {
    icon: Code2,
    title: 'Pure 36-Hour Hackathon Sprint',
    description: '36 hours of non-stop creation, high-speed Wi-Fi, dedicated hacking spaces, and late-night mini gaming tournaments.',
    color: 'google-green',
    border: 'hover:border-google-green/50',
    bgGlow: 'from-google-green/10 to-transparent',
    iconColor: 'text-google-green'
  }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-google-blue/10 border border-google-blue/30 text-google-blue text-xs font-mono font-semibold mb-4"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>THE SPRINT EXPERIENCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            Engineering The Future At <span className="text-gradient-google">MITS Gwalior</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sans"
          >
            Organized by <strong className="text-gray-900 dark:text-white">GDG On Campus MITS-DU Gwalior</strong>, INNOV8-MITS 2026 is designed as an incubator for breakthrough ideas. We bring together developers, designers, and visionaries to convert raw passion into production-ready software and hardware prototypes in 36 hours.
          </motion.p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`glass-card p-7 rounded-3xl border border-white/15 dark:border-white/10 ${item.border} shadow-lg transition-all duration-300 relative group overflow-hidden flex flex-col justify-between`}
              >
                {/* Subtle Inner Glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${item.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div>
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <IconComp className={`w-7 h-7 ${item.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3 group-hover:text-google-blue transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Accent Corner Bar */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-semibold text-gray-400">
                  <span>INNOV8 '26</span>
                  <span className={item.iconColor}>0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
