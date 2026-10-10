export type Theme = 'dusk' | 'dawn'

export type TrackId =
  | 'ai-systems'
  | 'web3-security'
  | 'smart-campus'
  | 'healthcare-medtech'
  | 'fintech-inclusion'
  | 'open-innovation'

export type GoogleColor = 'blue' | 'red' | 'yellow' | 'green'

export interface Track {
  id: TrackId
  code: string
  name: string
  tagline: string
  oneLiner: string
  icon: string
  googleColor: GoogleColor
  accent: 'accent' | 'accent2' | 'signal' | 'warning'
  relays: number
  examplePrompt: string
  problemStatements: string[]
  suggestedTech: string[]
  evaluationFocus: string
  orbitRadius: number
  inclinationDeg: number
  periodSeconds: number
}

export type ScheduleKind = 'ceremony' | 'hack' | 'fuel' | 'checkpoint' | 'session' | 'deadline'
export type ScheduleDay = 'FRI' | 'SAT' | 'SUN'

export interface ScheduleEntry {
  time: string
  hour: string | null
  label: string
  detail: string
  kind: ScheduleKind
  day: ScheduleDay
  phase: 1 | 2 | 3
  phaseTitle: string
  hard?: boolean
}

export type RuleSeverity = 'normal' | 'danger'

export interface RuleItem {
  lead?: string
  text: string
  severity?: RuleSeverity
}

export interface RuleColumn {
  heading: string
  items: RuleItem[]
}

export interface JudgingCriterion {
  name: string
  weight: number
  description: string
  color: GoogleColor
}

export interface PrizeExtra {
  text: string
}

export interface PodiumPrize {
  tier: '1st' | '2nd' | '3rd'
  numeral: string
  title: string
  subtitle: string
  cash: string
  googleColor: GoogleColor
  extras: string[]
}

export interface SpecialPrize {
  award: string
  subtitle: string
  cash: string
  forText: string
  googleColor: GoogleColor
}

export interface FaqItem {
  question: string
  answer: string
}

export interface SocialLink {
  platform: string
  icon: string
  href: string
  label: string
}

export interface NavItem {
  label: string
  href: string
}

export type DeviceTier = 'low' | 'mid' | 'high'
export type CountdownPhase = 'before' | 'live' | 'after'
