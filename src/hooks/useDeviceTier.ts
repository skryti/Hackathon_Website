import { useEffect, useState } from 'react'
import type { DeviceTier } from '../types'

function computeTier(): DeviceTier {
  if (typeof window === 'undefined') return 'high'
  const width = window.innerWidth
  const cores = navigator.hardwareConcurrency ?? 8
  if (width < 480 || cores <= 4) return 'low'
  if (width < 768) return 'mid'
  return 'high'
}

/**
 * Coarse device quality tier used to scale back the 3D hero scene.
 * Computed once on mount and recomputed on resize (debounced 250ms).
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(computeTier)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    const handleResize = () => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => setTier(computeTier()), 250)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeout) clearTimeout(timeout)
    }
  }, [])

  return tier
}
