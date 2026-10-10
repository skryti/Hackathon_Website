# HALFLIGHT 36

> Thirty-six hours between dusk and the second dawn.

Recruitment-task website for a fictional 36-hour college hackathon, built as a
frontend-only React site. No backend — registration happens through an
external Google Form.

## Tech stack

- **React 19 + TypeScript + Vite** — app shell and tooling
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — all styling, theme tokens
  defined as CSS custom properties in `src/index.css`
- **Framer Motion** — scroll reveals, the horizontal-scroll timeline, the
  hero's mount sequence and parallax
- **Three.js + React Three Fiber + drei** — the 3D "Terminator Globe" in the
  hero (custom shader day/night boundary, particle field, orbiting track
  satellites)
- **Lenis** — smooth scrolling
- **lucide-react** — icon set (plus three hand-drawn inline SVG brand marks
  in the footer, since lucide dropped brand/logo glyphs)

## Before you launch this for real

Open `src/data/event.ts` and replace:

- `registrationUrl` — currently `https://forms.gle/placeholder`. Point this
  at your real Google Form; it's read from this one place everywhere on the
  site (hero, navbar, register section).
- Dates, venue, stats, and contact emails if you're not actually running
  this exact fictional event.

All other copy (schedule, tracks, rules, judging, prizes, FAQ, socials) lives
in `src/data/*.ts` — edit there, not in the components.

## Development

```bash
npm install
npm run dev      # starts the Vite dev server
npm run build    # type-checks + production build to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
├── components/
│   ├── layout/     # Navbar, Footer, ThemeToggle, SectionShell, scroll chrome
│   ├── sections/   # One file per page section (Hero, About, Tracks, ...)
│   ├── three/      # The 3D hero scene (Terminator Globe, particles, satellites)
│   └── ui/         # Shared primitives (Button, GlassCard, Reveal, Countdown, ...)
├── context/        # Theme (dusk/dawn) context
├── data/           # All copy and content, typed — single source of truth
├── hooks/          # useLenis, useCountdown, useDeviceTier, etc.
├── lib/            # Motion variants, Tailwind class helper, Three.js color bridge
└── types/          # Shared TypeScript types
```

## Theme

Dark mode is **DUSK** (the default), light mode is **DAWN** — the toggle in
the navbar is themed as a sunrise, not a generic switch. Resolution order on
load: an explicit previous choice (`localStorage`) → the OS's
`prefers-color-scheme` → DUSK by default.
