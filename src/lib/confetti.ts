import confetti from 'canvas-confetti'

/**
 * Fires an iridescent multi-burst confetti celebration using
 * the 4 official Google Core Colors:
 * Blue (#4285F4), Red (#EA4335), Yellow (#FBBC05), Green (#34A853)
 */
export function triggerGoogleConfetti() {
  const googleColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FFFFFF']

  // Center primary blast
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.65 },
    colors: googleColors,
    startVelocity: 45,
  })

  // Left angled cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.1, y: 0.7 },
      colors: googleColors,
      startVelocity: 50,
    })
  }, 150)

  // Right angled cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.9, y: 0.7 },
      colors: googleColors,
      startVelocity: 50,
    })
  }, 300)
}
