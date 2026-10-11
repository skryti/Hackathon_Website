import { Users, UtensilsCrossed, Network, Code2, Rocket } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { GoogleText } from '../ui/GoogleText'

export function About() {
  return (
    <section id="about" className="relative scroll-mt-[88px] overflow-hidden py-20 bg-bg">
      <div className="relative mx-auto max-w-[1240px] px-[clamp(1.25rem,5vw,4rem)]">
        <Reveal>
          {/* Eyebrow Badge Pill matching Image 1 */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-google-blue/35 bg-google-blue/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-google-blue shadow-sm">
              <Rocket size={14} className="text-google-blue" />
              <span>THE SPRINT EXPERIENCE</span>
            </div>
          </div>

          {/* Centered Heading matching Image 1 */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black text-center tracking-tight leading-[1.08]">
            <span className="text-gray-900 dark:text-white font-black">Engineering The Future At </span>
            <GoogleText text="MITS" className="font-black" />
            <br />
            <GoogleText text="Gwalior" className="font-black" />
          </h2>

          {/* Centered Deck / Subtitle matching Image 1 */}
          <p className="mt-4 max-w-3xl mx-auto text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Organized by <strong className="text-gray-900 dark:text-white font-bold">GDGoC MITS–DU Gwalior</strong>, HackInnov8 2026 is designed as an incubator for breakthrough ideas. We bring together developers, designers, and visionaries to convert raw passion into production-ready software and hardware prototypes in 36 hours.
          </p>
        </Reveal>

        {/* 4 Feature Cards Grid matching Image 1 */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Mentorship */}
          <div className="flex flex-col rounded-2xl border border-gray-200/80 dark:border-white/[0.08] bg-surface/90 dark:bg-[#0c1017] p-6 shadow-md dark:shadow-xl dark:shadow-black/40 transition-all duration-300 hover:border-google-blue/30">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-google-blue/20 bg-google-blue/10 text-google-blue">
              <Users size={22} aria-hidden />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-gray-900 dark:text-white leading-snug">
              Mentorship from Google &amp; Industry Leaders
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Get direct 1–on–1 guidance from Google Developer Experts, VC partners, and tech architects to supercharge your project code &amp; pitch.
            </p>
          </div>

          {/* Card 2: Food & Swag */}
          <div className="flex flex-col rounded-2xl border border-gray-200/80 dark:border-white/[0.08] bg-surface/90 dark:bg-[#0c1017] p-6 shadow-md dark:shadow-xl dark:shadow-black/40 transition-all duration-300 hover:border-google-red/30">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-google-red/20 bg-google-red/10 text-google-red">
              <UtensilsCrossed size={22} aria-hidden />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-gray-900 dark:text-white leading-snug">
              Food, Swag &amp; Hospitality
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Enjoy complimentary meals, refreshments, t-shirts, stickers, and premium GDG swag kits.
            </p>
          </div>

          {/* Card 3: Networking */}
          <div className="flex flex-col rounded-2xl border border-gray-200/80 dark:border-white/[0.08] bg-surface/90 dark:bg-[#0c1017] p-6 shadow-md dark:shadow-xl dark:shadow-black/40 transition-all duration-300 hover:border-google-yellow/30">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-google-yellow/20 bg-google-yellow/10 text-google-yellow">
              <Network size={22} aria-hidden />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-gray-900 dark:text-white leading-snug">
              High-Octane Networking
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Connect with 500+ top student developers, founders, and recruiters across India. Build lifelong friendships and find co-founders.
            </p>
          </div>

          {/* Card 4: 36-Hour Hackathon */}
          <div className="flex flex-col rounded-2xl border border-gray-200/80 dark:border-white/[0.08] bg-surface/90 dark:bg-[#0c1017] p-6 shadow-md dark:shadow-xl dark:shadow-black/40 transition-all duration-300 hover:border-google-green/30">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-google-green/20 bg-google-green/10 text-google-green">
              <Code2 size={22} aria-hidden />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-gray-900 dark:text-white leading-snug">
              Pure 36-Hour Hackathon Sprint
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              36 hours of non-stop creation, high-speed Wi-Fi, dedicated hacking spaces, and late-night mini gaming tournaments.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
