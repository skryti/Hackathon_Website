import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Animated 3D-style Sun/Moon morphing toggle switch with smooth
 * CSS color transitions across backgrounds, borders, and text.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const reducedMotion = usePrefersReducedMotion()
  const isLight = theme === 'dawn'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={isLight}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="group relative flex h-10 w-16 items-center rounded-full border border-border bg-surface p-1 transition-all duration-300 hover:border-google-blue/40 shadow-inner"
    >
      {/* Background track gradient aura */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(251, 188, 5, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(66, 133, 244, 0.2) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* 3D sliding knob with Sun/Moon morph */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="relative flex h-8 w-8 items-center justify-center rounded-full shadow-md"
        style={{
          marginLeft: isLight ? 'auto' : '0',
          background: isLight
            ? 'linear-gradient(135deg, #FBBC05 0%, #EA4335 100%)'
            : 'linear-gradient(135deg, #4285F4 0%, #0F1117 100%)',
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          {isLight ? (
            <motion.span
              key="sun"
              className="text-white"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={15} strokeWidth={2.5} aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              className="text-white"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={15} strokeWidth={2.5} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  )
}
