import type { PodiumPrize, SpecialPrize } from '../types'

export const PODIUM_PRIZES: PodiumPrize[] = [
  {
    tier: '2nd',
    numeral: '02',
    title: 'First Runner Up',
    subtitle: 'Silver Laurels',
    cash: '₹30,000',
    googleColor: 'red',
    extras: [
      'Official GDG Runner-Up Trophy',
      'Exclusive GDG Swag Kits & Hoodies',
      'Certificate of Excellence with Distinction',
      'Fast-track interview opportunities with sponsor firms',
    ],
  },
  {
    tier: '1st',
    numeral: '01',
    title: 'Grand Champion',
    subtitle: 'Overall Winner',
    cash: '₹50,000',
    googleColor: 'blue',
    extras: [
      'Champion Trophy & Golden GDG Medallions',
      'Premium GDG Goodies Box per crew member',
      '₹25,000 Google Cloud & Vertex AI Credits',
      'Incubation & Seed Pitch invitation at MITS-DU Hub',
      'Direct interview access with title sponsor engineering teams',
    ],
  },
  {
    tier: '3rd',
    numeral: '03',
    title: 'Second Runner Up',
    subtitle: 'Bronze Laurels',
    cash: '₹15,000',
    googleColor: 'yellow',
    extras: [
      'Official GDG Bronze Trophy',
      'GDG Swag Kits & Collector Stickers',
      'Certificate of Excellence with Distinction',
      'Sponsor credits & 1-year developer tooling pack',
    ],
  },
]

export const SPECIAL_PRIZES: SpecialPrize[] = [
  {
    award: 'Best All-Girls Team',
    subtitle: 'Women Techmakers Award',
    cash: '₹5,000',
    googleColor: 'green',
    forText: 'Awarded to the highest-scoring team comprised entirely of female innovators, supported by Google Women Techmakers.',
  },
  {
    award: 'Best First-Year Hack',
    subtitle: 'Freshman Prodigy Award',
    cash: '₹5,000',
    googleColor: 'blue',
    forText: 'Honoring the most impressive prototype built by a team whose members are all in their first year of study.',
  },
  {
    award: 'Best UI/UX Design',
    subtitle: 'Material You Design Trophy',
    cash: '₹5,000',
    googleColor: 'red',
    forText: 'For the crew delivering the most intuitive, fluid, and visually stunning user experience following modern design systems.',
  },
]

export const EVERYONE_GETS = [
  'Official GDG On Campus Certificate of Participation',
  'Exclusive INNOV8-MITS 2026 Holographic Sticker Pack',
  'Access to Google Cloud Skills Boost credits & perks',
  'Free meals, energy fuel, and midnight snacks throughout 36 hours',
  'Direct access to GDG mentor network & developer ecosystem',
]
