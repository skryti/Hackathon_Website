import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Award, Sparkles, Check, Gift, GraduationCap, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRIZES, SPECIAL_PRIZES } from '../data/hackathonData';

export const Prizes: React.FC = () => {

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
    });
  };

  // Reorder for 3D Podium Display: 2nd place (left), 1st place (center elevated), 3rd place (right)
  const podiumPrizes = [
    PRIZES.find(p => p.rank === 2)!,
    PRIZES.find(p => p.rank === 1)!,
    PRIZES.find(p => p.rank === 3)!,
  ];

  return (
    <section id="prizes" className="py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-google-yellow/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-google-yellow/10 border border-google-yellow/30 text-google-yellow text-xs font-mono font-semibold mb-4"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>₹1,00,000+ REWARDS POOL</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            Prizes, Trophies & <span className="text-gradient-google">Swag Kits</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sans"
          >
            Compete for cash rewards, Google Cloud vouchers, trophies, and fast-track hiring referrals. Every participant leaves with official certificates and swag!
          </motion.p>
        </div>

        {/* 3D Podium Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-end mb-20">
          {podiumPrizes.map((prize, idx) => {
            const isFirst = prize.rank === 1;

            return (
              <motion.div
                key={prize.rank}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                onClick={isFirst ? triggerConfetti : undefined}
                className={`relative rounded-3xl glass-card border ${prize.borderColor} p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer ${
                  isFirst ? 'lg:order-2 lg:-translate-y-6 bg-gradient-to-b from-yellow-500/10 via-dark-card to-dark-card' : ''
                }`}
              >
                {/* Crown / Trophy Floating Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prize.gradient} flex items-center justify-center text-slate-950 font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                    {isFirst ? <Crown className="w-8 h-8" /> : prize.rank === 2 ? <Medal className="w-7 h-7" /> : <Award className="w-7 h-7" />}
                  </div>

                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${prize.badgeColor}`}>
                    RANK #0{prize.rank}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                    {prize.title}
                  </h3>

                  {/* Cash Amount */}
                  <div className={`text-4xl sm:text-5xl font-display font-extrabold bg-gradient-to-r ${prize.gradient} bg-clip-text text-transparent mb-1`}>
                    {prize.amount}
                  </div>
                  {prize.usdEquivalent && (
                    <div className="text-xs font-mono text-gray-500 mb-6">
                      {prize.usdEquivalent}
                    </div>
                  )}

                  {/* Perks List */}
                  <ul className="space-y-3 mb-8 pt-4 border-t border-white/10">
                    {prize.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-sans">
                        <Check className="w-4 h-4 text-google-green shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 text-center font-mono text-xs font-semibold text-gray-400">
                  {isFirst ? '🏆 GRAND CHAMPION TITLE' : `RUNNER UP #0${prize.rank}`}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Special Category Prizes */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white text-center mb-8 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-google-yellow" />
            <span>Special Category Track Awards</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPECIAL_PRIZES.map((sp, idx) => (
              <motion.div
                key={sp.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl border border-white/15 dark:border-white/10 shadow-lg hover:border-google-blue/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${sp.color} flex items-center justify-center text-white shadow-md`}>
                    {idx === 0 ? <Sparkles className="w-6 h-6" /> : idx === 1 ? <GraduationCap className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-gray-300">
                    {sp.tag}
                  </span>
                </div>

                <h4 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-1">
                  {sp.title}
                </h4>
                <div className="text-2xl font-display font-extrabold text-google-yellow mb-2">
                  {sp.amount}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                  {sp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Participant Perks Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-google-blue/30 text-center max-w-4xl mx-auto shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-google-blue/20 border border-google-blue/40 flex items-center justify-center text-google-blue shrink-0">
              <Gift className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                Perks For Every Verified Hacker
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Official GDG Certificates of Participation, Google Cloud Sandbox credits, custom laptops stickers, food passes, and networking access.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
