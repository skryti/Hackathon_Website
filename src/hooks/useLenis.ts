import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useLenis(): Lenis | null {
  const reducedMotion = usePrefersReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null)
      return
    }

    const instance = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      smoothWheel: true,
    })

    let rafId: number
    const raf = (time: number) => {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    setLenis(instance)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [reducedMotion])

  return lenis
}
