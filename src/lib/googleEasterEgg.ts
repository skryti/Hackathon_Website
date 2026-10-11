/**
 * Google Four-Color Particle Burst + Radial Shockwave Easter Egg
 * Triggered exclusively when clicking the GDG logo in the navbar.
 *
 * Fully isolated temporary Canvas animation that cleans up completely after ~2.5s.
 */

const GOOGLE_COLORS = [
  '#4285F4', // Google Blue
  '#EA4335', // Google Red
  '#FBBC05', // Google Yellow
  '#34A853', // Google Green
] as const

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  maxLife: number
  age: number
  drag: number
  gravity: number
  shape: 'circle' | 'sparkle' | 'stardust'
  rotation: number
  rotSpeed: number
  twinkleOffset: number
  trail: { x: number; y: number }[]
}

interface Shockwave {
  startTime: number
  duration: number
  maxRadius: number
  startWidth: number
  color: string
  maxAlpha: number
}

let activeCleanup: (() => void) | null = null
let lastTriggerTime = 0

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.beginPath()
  // 4-pointed diamond star
  ctx.moveTo(0, -size * 1.5)
  ctx.quadraticCurveTo(0, 0, size * 1.5, 0)
  ctx.quadraticCurveTo(0, 0, 0, size * 1.5)
  ctx.quadraticCurveTo(0, 0, -size * 1.5, 0)
  ctx.quadraticCurveTo(0, 0, 0, -size * 1.5)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function triggerGoogleEasterEgg(element?: HTMLElement | null) {
  const now = performance.now()
  // Prevent rapid spamming performance issues
  if (now - lastTriggerTime < 800) return
  lastTriggerTime = now

  // Cancel any currently running Easter egg and clean up
  if (activeCleanup) {
    activeCleanup()
    activeCleanup = null
  }

  // Calculate exact screen position of the logo
  let originX = window.innerWidth * 0.1
  let originY = 36

  if (element) {
    const svg = element.querySelector('svg')
    const targetRect = (svg || element).getBoundingClientRect()
    originX = targetRect.left + targetRect.width / 2
    originY = targetRect.top + targetRect.height / 2
  }

  // Create temporary isolated animation canvas
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '99999'
  canvas.style.opacity = '1'
  canvas.setAttribute('aria-hidden', 'true')

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.scale(dpr, dpr)
  document.body.appendChild(canvas)

  // 1. Setup Shockwaves
  const maxViewportDist = Math.hypot(width, height)
  const shockwaves: Shockwave[] = [
    {
      startTime: 0,
      duration: 850,
      maxRadius: maxViewportDist * 0.9,
      startWidth: 7,
      color: '#4285F4', // Google Blue
      maxAlpha: 0.85,
    },
    {
      startTime: 50,
      duration: 1050,
      maxRadius: maxViewportDist * 1.1,
      startWidth: 5,
      color: '#EA4335', // Google Red
      maxAlpha: 0.75,
    },
    {
      startTime: 110,
      duration: 1250,
      maxRadius: maxViewportDist * 1.25,
      startWidth: 4,
      color: '#FBBC05', // Google Yellow
      maxAlpha: 0.65,
    },
    {
      startTime: 170,
      duration: 1400,
      maxRadius: maxViewportDist * 1.4,
      startWidth: 3,
      color: '#34A853', // Google Green
      maxAlpha: 0.55,
    },
  ]

  // 2. Setup Particles (~300 particles in Google Core Colors)
  const particles: Particle[] = []
  const particleCount = 280

  for (let i = 0; i < particleCount; i++) {
    // 360 degree explosion with biased momentum towards center/bottom-right of viewport
    const rawAngle = Math.random() * Math.PI * 2
    // Slight bias so particles burst gloriously across the page from top-left
    const angle =
      Math.random() < 0.65
        ? Math.random() * (Math.PI * 0.75) // Towards bottom-right (0 to 135 deg)
        : rawAngle

    const speed = 10 + Math.random() * 26 + (Math.random() < 0.2 ? 10 : 0)
    const colorPick =
      Math.random() < 0.08
        ? '#FFFFFF' // Occasional diamond sparkle highlight
        : GOOGLE_COLORS[i % GOOGLE_COLORS.length]

    const shapeRoll = Math.random()
    const shape: Particle['shape'] =
      shapeRoll < 0.25 ? 'sparkle' : shapeRoll < 0.4 ? 'stardust' : 'circle'

    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size:
        shape === 'stardust'
          ? 1.0 + Math.random() * 1.0
          : shape === 'sparkle'
          ? 2.5 + Math.random() * 2.2
          : 2.0 + Math.random() * 2.5,
      color: colorPick,
      alpha: 1,
      maxLife: 1500 + Math.random() * 900,
      age: 0,
      drag: 0.963 + Math.random() * 0.015,
      gravity: 0.05 + Math.random() * 0.08,
      shape,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      twinkleOffset: Math.random() * Math.PI * 2,
      trail: [],
    })
  }

  // Animation Loop
  const startTime = performance.now()
  let animationFrameId: number

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const totalDuration = 2500 // 2.5 seconds total

    if (elapsed >= totalDuration) {
      cleanup()
      return
    }

    ctx.clearRect(0, 0, width, height)

    // A. Center Flash burst at origin (first 200ms)
    if (elapsed < 200) {
      const flashP = elapsed / 200
      const flashAlpha = 1 - flashP
      const flashRadius = 50 * Math.sin(flashP * Math.PI)
      const grad = ctx.createRadialGradient(
        originX,
        originY,
        0,
        originX,
        originY,
        Math.max(1, flashRadius),
      )
      grad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha * 0.95})`)
      grad.addColorStop(0.3, `rgba(66, 133, 244, ${flashAlpha * 0.8})`)
      grad.addColorStop(0.65, `rgba(234, 67, 53, ${flashAlpha * 0.5})`)
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.save()
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(originX, originY, Math.max(1, flashRadius), 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    // B. Render Radial Shockwaves
    for (const wave of shockwaves) {
      const waveElapsed = elapsed - wave.startTime
      if (waveElapsed < 0 || waveElapsed > wave.duration) continue

      const progress = waveElapsed / wave.duration
      // High initial expansion velocity with smooth cubic deceleration
      const ease = 1 - Math.pow(1 - progress, 3)
      const currentRadius = wave.maxRadius * ease
      const alpha = (1 - progress) * wave.maxAlpha

      ctx.save()
      ctx.beginPath()
      ctx.arc(originX, originY, currentRadius, 0, Math.PI * 2)
      ctx.strokeStyle = wave.color
      ctx.globalAlpha = Math.max(0, alpha)
      ctx.lineWidth = Math.max(1, wave.startWidth * (1 - ease * 0.75))
      ctx.shadowColor = wave.color
      ctx.shadowBlur = 10
      ctx.stroke()
      ctx.restore()
    }

    // C. Render Particles with Glowing Motion Trails & Sparkles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.age += 16.6 // approximate delta
      if (p.age >= p.maxLife) continue

      // Update trail positions
      p.trail.unshift({ x: p.x, y: p.y })
      if (p.trail.length > 5) p.trail.pop()

      // Physics update
      p.x += p.vx
      p.y += p.vy
      p.vx *= p.drag
      p.vy = p.vy * p.drag + p.gravity
      p.rotation += p.rotSpeed

      // Life factor & twinkle
      const lifeP = p.age / p.maxLife
      const fadeAlpha = 1 - Math.pow(lifeP, 1.8)
      const twinkle = 0.82 + 0.18 * Math.sin(p.age * 0.015 + p.twinkleOffset)
      const currentAlpha = Math.max(0, Math.min(1, fadeAlpha * twinkle))

      ctx.save()
      ctx.globalAlpha = currentAlpha

      // Render glowing trail streak
      if (p.trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(p.trail[0].x, p.trail[0].y)
        for (let t = 1; t < p.trail.length; t++) {
          ctx.lineTo(p.trail[t].x, p.trail[t].y)
        }
        ctx.strokeStyle = p.color
        ctx.lineWidth = p.size * 0.75
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      // Render particle head
      ctx.fillStyle = p.color
      ctx.shadowColor = p.color
      ctx.shadowBlur = 8

      if (p.shape === 'sparkle') {
        drawSparkle(ctx, p.x, p.y, p.size, p.rotation)
      } else {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  function cleanup() {
    cancelAnimationFrame(animationFrameId)
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas)
    }
    if (activeCleanup === cleanup) {
      activeCleanup = null
    }
  }

  activeCleanup = cleanup
  animationFrameId = requestAnimationFrame(animate)
}
