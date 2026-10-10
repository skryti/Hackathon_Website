import type { RuleColumn } from '../types'

export const RULES: RuleColumn[] = [
  {
    heading: 'Team Formation & Eligibility',
    items: [
      {
        lead: 'Team Size:',
        text: 'Teams must consist of 2 to 4 members. Solo participation or groups exceeding 4 members are strictly not permitted.',
      },
      {
        lead: 'Open Eligibility:',
        text: 'Open to undergraduate and postgraduate students from all accredited colleges and universities across India. A valid college student ID card is mandatory at physical check-in.',
      },
      {
        lead: 'Cross-Discipline Teams:',
        text: 'Inter-college, inter-branch, and cross-year teams are highly encouraged. Diversity of skills (designer + backend + ML/frontend) creates the strongest hacks.',
      },
      {
        lead: 'Single Submission:',
        text: 'Each team can choose only one track and submit one comprehensive project. Dual submissions across tracks are not permitted.',
      },
    ],
  },
  {
    heading: 'Code Originality & Sprint Guidelines',
    items: [
      {
        lead: 'Code Originality:',
        text: 'All core code, architecture, and design assets must be written and produced strictly within the 36-hour sprint window. Pre-built private projects cannot be submitted.',
      },
      {
        lead: 'Open Source & Tooling:',
        text: 'You may freely utilize public open-source libraries, UI frameworks (Tailwind, Radix, Shadcn), cloud services (Firebase, Supabase), and public APIs.',
      },
      {
        lead: 'Transparent AI Tooling:',
        text: 'Generative AI tools (Gemini, Claude, GitHub Copilot) are fully allowed! Teams are requested to maintain an AI_USAGE.md in their repository detailing which tools were leveraged.',
      },
      {
        lead: 'Public GitHub Repositories:',
        text: 'Your code repository must be initialized during Hour 0 with frequent commits throughout the 36 hours. A single bulk push at Hour 35 triggers technical audit disqualification.',
      },
      {
        severity: 'danger',
        lead: 'Disqualification Criteria:',
        text: 'Plagiarized repositories, harassment or non-compliance with the Code of Conduct, tampering with venue networking, or pushing commits after the Hour 36 hard lock.',
      },
    ],
  },
]
