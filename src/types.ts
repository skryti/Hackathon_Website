export interface Track {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  color: 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'cyan';
  hexColor: string;
  shortDesc: string;
  fullDesc: string;
  problemStatements: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    difficulty: 'Intermediate' | 'Advanced' | 'All Levels';
  }[];
}

export interface SchedulePhase {
  phaseId: number;
  day: string;
  title: string;
  date: string;
  badge: string;
  events: {
    time: string;
    title: string;
    description: string;
    category: 'Keynote' | 'Hacking' | 'Mentorship' | 'Evaluation' | 'Fun/Relax' | 'Food';
    iconName: string;
  }[];
}

export interface PrizeItem {
  rank: number;
  title: string;
  amount: string;
  usdEquivalent?: string;
  perks: string[];
  gradient: string;
  borderColor: string;
  badgeColor: string;
  icon: string;
}

export interface SpecialPrize {
  title: string;
  tag: string;
  amount: string;
  description: string;
  icon: string;
  color: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Logistics' | 'Teams' | 'Submissions';
}

export interface RuleItem {
  id: string;
  title: string;
  detail: string;
  icon: string;
}

export interface JudgingCriteria {
  category: string;
  percentage: number;
  description: string;
  color: string;
}
