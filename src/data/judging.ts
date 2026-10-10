import type { JudgingCriterion } from '../types'

export const JUDGING_CRITERIA: JudgingCriterion[] = [
  {
    name: 'Innovation & Originality',
    weight: 30,
    description:
      'Is the solution novel, daring, and imaginative? Does it approach a difficult problem from an unexpected perspective, leveraging cutting-edge paradigms?',
    color: 'blue',
  },
  {
    name: 'Technical Complexity & Execution',
    weight: 25,
    description:
      'The engineering prowess demonstrated: architectural robustness, clean code practices, algorithmic rigor, and depth of technology integration.',
    color: 'red',
  },
  {
    name: 'Practical Impact & Viability',
    weight: 25,
    description:
      'Does the prototype solve a genuine real-world pain point? Could this solution be deployed tomorrow and deliver measurable value to users or organizations?',
    color: 'green',
  },
  {
    name: 'UI/UX & Final Presentation',
    weight: 20,
    description:
      'Visual polish, responsive ergonomics, accessibility, and the clarity and conviction with which the team demonstrates their product on stage.',
    color: 'yellow',
  },
]

export const JUDGING_TIE_BREAK = 'Innovation (30%) → Technical Complexity (25%) → Practical Impact (25%).'
export const JUDGING_NOTE =
  'All projects undergo initial technical screening during the Expo round, followed by live demonstration before the panel of Google Developer Experts and industry jury.'
