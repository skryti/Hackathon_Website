import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, Users, GitBranch, FolderGit2, ShieldAlert, PieChart } from 'lucide-react';
import { RULES, JUDGING_CRITERIA } from '../data/hackathonData';

export const Rules: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'judging'>('judging');

  return (
    <section id="rules" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-google-green/10 border border-google-green/30 text-google-green text-xs font-mono font-semibold mb-4"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TRANSPARENT & FAIR</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            Rules & <span className="text-gradient-google">Judging Rubric</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sans"
          >
            We hold INNOV8-MITS to the highest standard of technical rigor and ethics. Familiarize yourself with the judging criteria and guidelines.
          </motion.p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl glass-card border border-white/15 dark:border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab('judging')}
              className={`relative px-6 py-3 rounded-xl font-display font-bold text-sm transition-all duration-300 ${
                activeTab === 'judging'
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {activeTab === 'judging' && (
                <motion.div
                  layoutId="rulesPill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-google-green to-teal-600 shadow-md"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                <span>Judging Rubric (100%)</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`relative px-6 py-3 rounded-xl font-display font-bold text-sm transition-all duration-300 ${
                activeTab === 'rules'
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {activeTab === 'rules' && (
                <motion.div
                  layoutId="rulesPill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-google-blue to-indigo-600 shadow-md"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span>Official Guidelines & Rules</span>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'judging' ? (
            <motion.div
              key="judging"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {JUDGING_CRITERIA.map((criteria, idx) => (
                <div
                  key={criteria.category}
                  className="glass-card p-6 sm:p-7 rounded-3xl border border-white/15 dark:border-white/10 shadow-lg relative overflow-hidden group hover:border-google-blue/40 transition-all"
                >
                  {/* Color Accent Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
                      style={{ color: criteria.color, borderColor: `${criteria.color}40`, backgroundColor: `${criteria.color}15` }}
                    >
                      Weightage: {criteria.percentage}%
                    </span>
                    <span className="text-2xl font-display font-black" style={{ color: criteria.color }}>
                      {criteria.percentage}%
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
                    {criteria.category}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans mb-4">
                    {criteria.description}
                  </p>

                  {/* Percentage Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${criteria.percentage * 2.5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: criteria.color }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="rules"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {RULES.map((rule, idx) => {
                return (
                  <div
                    key={rule.id}
                    className="glass-card p-6 sm:p-7 rounded-3xl border border-white/15 dark:border-white/10 shadow-lg hover:border-google-green/40 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-google-green/15 border border-google-green/30 text-google-green flex items-center justify-center font-bold">
                        {idx === 0 ? <Users className="w-6 h-6" /> : idx === 1 ? <GitBranch className="w-6 h-6" /> : idx === 2 ? <FolderGit2 className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                        {rule.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                      {rule.detail}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
