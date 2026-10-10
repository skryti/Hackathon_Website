import { useEffect, useState } from 'react'
import type { CountdownPhase } from '../types'

interface CountdownState {
  phase: CountdownPhase
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
}

function computeState(startISO: string, endISO: string): CountdownState {
  const now = Date.now()
  const start = new Date(startISO).getTime()
  const end = new Date(endISO).getTime()

  let phase: CountdownPhase
  let targetMs: number

  if (now < start) {
    phase = 'before'
    targetMs = start - now
  } else if (now < end) {
    phase = 'live'
    targetMs = end - now
  } else {
    phase = 'after'
    targetMs = 0
  }

  const totalSeconds = Math.max(0, Math.floor(targetMs / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { phase, days, hours, minutes, seconds, totalMs: targetMs }
}

export function useCountdown(startISO: string, endISO: string): CountdownState {
  const [state, setState] = useState(() => computeState(startISO, endISO))

  useEffect(() => {
    const tick = () => setState(computeState(startISO, endISO))
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [startISO, endISO])

  return state
}
