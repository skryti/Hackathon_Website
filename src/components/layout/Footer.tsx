import { Mail, Link as LinkIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { FaDiscord, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { motion } from 'framer-motion'
import { EVENT } from '../../data/event'
import { SOCIALS } from '../../data/socials'
import { NAV_ITEMS } from '../../data/nav'
import { Marquee } from '../ui/Marquee'
import { Reveal } from '../ui/Reveal'
import { GDGLogo } from '../common/GDGLogo'
import { useScrollApi } from './SmoothScrollProvider'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_OUT } from '../../lib/motion'

const MARQUEE_TEXT =
  '36 HOURS • 10 NOVEMBER 2026 • CONCLAVE HALL, MITS GWALIOR • ₹35,000+ CASH PRIZES (20K / 10K / 5K) • 500+ HACKERS • GDG ON CAMPUS MITS • '

const SOCIAL_ICON_MAP: Record<string, IconType | LucideIcon> = {
  Instagram: FaInstagram,
  Linkedin: FaLinkedinIn,
  MessageCircle: FaDiscord,
  Github: FaGithub,
  Twitter: FaXTwitter,
  Mail: Mail,
}

function resolveSocialIcon(name: string): IconType | LucideIcon {
  return SOCIAL_ICON_MAP[name] ?? LinkIcon
}

const CONTACT_LINES = [
  { label: 'General Inquiries', value: EVENT.contacts.general, href: `mailto:${EVENT.contacts.general}` },
  { label: 'Lead Organizer', value: EVENT.contacts.lead, href: `mailto:${EVENT.contacts.lead}` },
  { label: 'Sponsorships', value: EVENT.contacts.sponsors, href: `mailto:${EVENT.contacts.sponsors}` },
  { label: 'Helpline Desk', value: EVENT.contacts.phone, href: `tel:${EVENT.contacts.phone.replace(/\s+/g, '')}` },
]

export function Footer() {
  const reducedMotion = usePrefersReducedMotion()
  const scrollApi = useScrollApi()

  return (
    <footer id="contact" className="relative border-t border-border bg-bg-elev">
      {/* Dynamic Marquee Ticker */}
      <Marquee durationSeconds={32} className="border-b border-border py-4 bg-surface/50">
        <span className="mx-6 whitespace-nowrap font-display text-display-md font-extrabold uppercase text-txt-3">
          {MARQUEE_TEXT}
        </span>
      </Marquee>

      <div className="mx-auto max-w-[1280px] px-[clamp(1.25rem,4vw,3.5rem)] py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <Reveal className="sm:col-span-2 lg:col-span-1">
            <GDGLogo />
            <p className="mt-4 max-w-sm text-body-sm text-txt-2 leading-relaxed">
              Google Developer Groups On Campus at Madhav Institute of Technology &amp; Science (Deemed to be University), Gwalior.
              Empowering students through open tech, peer mentoring, and high-impact hackathons.
            </p>
            <div className="mt-6 flex items-center gap-1.5 font-mono text-xs text-txt-3">
              <span className="h-2 w-2 rounded-full bg-google-green animate-pulse" />
              <span>HackInnov8 2026 EDITION</span>
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal delay={0.05}>
            <h4 className="font-mono text-mono-sm uppercase tracking-wide text-txt-3">Quick Navigation</h4>
            <ul className="mt-4 space-y-2.5 text-body-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollApi.scrollTo(item.href, { offset: -88 })
                    }}
                    className="text-txt-2 transition-colors hover:text-google-blue"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Contact Details */}
          <Reveal delay={0.1}>
            <h4 className="font-mono text-mono-sm uppercase tracking-wide text-txt-3">Contact &amp; Support</h4>
            <ul className="mt-4 space-y-3 text-body-sm">
              {CONTACT_LINES.map((line) => (
                <li key={line.label}>
                  <div className="font-mono text-xs uppercase text-txt-3">{line.label}</div>
                  <a href={line.href} className="text-txt-2 transition-colors hover:text-google-blue">
                    {line.value}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Socials */}
          <Reveal delay={0.15}>
            <h4 className="font-mono text-mono-sm uppercase tracking-wide text-txt-3">Community &amp; Socials</h4>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
              variants={{
                visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.05 } },
              }}
              className="mt-4 space-y-2.5"
            >
              {SOCIALS.map((social) => {
                const Icon = resolveSocialIcon(social.icon)
                return (
                  <motion.li
                    key={social.platform}
                    variants={{
                      hidden: { opacity: 0, y: reducedMotion ? 0 : 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: reducedMotion ? 0.2 : 0.4, ease: EASE_OUT }}
                  >
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-2.5 text-body-sm text-txt-2 transition-colors hover:text-google-blue"
                    >
                      <span className="inline-flex transition-transform duration-150 group-hover:scale-110">
                        <Icon size={16} aria-hidden />
                      </span>
                      {social.platform}
                    </a>
                  </motion.li>
                )
              })}
            </motion.ul>
          </Reveal>
        </div>

        {/* Google 4-color gradient bar */}
        <div aria-hidden className="grad-google-animated my-10 h-[2px] w-full opacity-80" />

        <div className="flex flex-col items-center gap-4 text-center font-mono text-mono-sm text-txt-3 sm:flex-row sm:justify-between sm:text-left">
          <p>
            &copy; 2026 {EVENT.organizer}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 font-medium text-txt-2">
            Made with <span className="text-google-red animate-pulse">❤️</span> by GDG On Campus MITS-DU Gwalior Team.
          </p>
        </div>
      </div>
    </footer>
  )
}
