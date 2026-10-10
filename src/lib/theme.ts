import { Color } from 'three'
import type { Theme } from '../types'

/**
 * Duplicated palette for Three.js consumers and canvas visualizers.
 * Colors must match src/index.css Google Core Colors and dark/light themes.
 */
export const GOOGLE_COLORS = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',
} as const

export const PALETTES = {
  dusk: {
    bg: '#070709',
    surface: '#0F1117',
    googleBlue: '#4285F4',
    googleRed: '#EA4335',
    googleYellow: '#FBBC05',
    googleGreen: '#34A853',
    accent: '#4285F4',
    accent2: '#EA4335',
    signal: '#34A853',
    warning: '#FBBC05',
  },
  dawn: {
    bg: '#FAFAFC',
    surface: '#F1F3F9',
    googleBlue: '#4285F4',
    googleRed: '#EA4335',
    googleYellow: '#FBBC05',
    googleGreen: '#34A853',
    accent: '#1A73E8',
    accent2: '#D93025',
    signal: '#1E8E3E',
    warning: '#F29900',
  },
} as const

export function getThreeColors(theme: Theme) {
  const p = PALETTES[theme]
  return {
    bg: new Color(p.bg),
    surface: new Color(p.surface),
    googleBlue: new Color(p.googleBlue),
    googleRed: new Color(p.googleRed),
    googleYellow: new Color(p.googleYellow),
    googleGreen: new Color(p.googleGreen),
    accent: new Color(p.accent),
    accent2: new Color(p.accent2),
    signal: new Color(p.signal),
    warning: new Color(p.warning),
  }
}
