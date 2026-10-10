import { useEffect, useRef } from 'react'

export interface NormalizedPointer {
  x: number
  y: number
}

/**
 * Tracks the pointer position normalized to [-1, 1] on both axes, written to
 * a ref rather than React state so consumers inside `useFrame` can read it
 * every frame with zero re-renders. Inert on touch devices; zeroes out when
 * the pointer leaves the window.
 */
export function usePointerNormalized() {
  const pointer = useRef<NormalizedPointer>({ x: 0, y: 0 })

  useEffect(() => {
    let frame = 0
    let pending: NormalizedPointer | null = null

    const flush = () => {
      frame = 0
      if (pending) {
        pointer.current = pending
        pending = null
      }
    }

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      pending = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      }
      if (!frame) frame = requestAnimationFrame(flush)
    }

    const handleLeave = () => {
      pending = null
      pointer.current = { x: 0, y: 0 }
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerleave', handleLeave, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerleave', handleLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return pointer
}
