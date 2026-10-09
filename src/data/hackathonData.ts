import type { Track, SchedulePhase, PrizeItem, SpecialPrize, FAQItem, RuleItem, JudgingCriteria } from '../types';

export const HACKATHON_INFO = {
  name: "INNOV8-MITS 2026",
  shortName: "INNOV8-MITS '26",
  subtitle: "36 Hours of Code, Chaos & Creation",
  description: "A premier 36-Hour National Level Hackathon organized by GDG On Campus MITS-DU Gwalior. Unleash your developer capabilities, solve high-impact real-world challenges, build with cutting-edge Google technologies, and compete for ₹1,00,000+ in rewards.",
  organizer: "Google Developer Groups On Campus",
  chapter: "MITS-DU Gwalior",
  college: "Madhav Institute of Technology & Science (Deemed University), Gwalior",
  date: "November 14-16, 2026",
  mode: "In-Person Campus Sprint",
  totalPrizePool: "₹1,00,000+",
  expectedHackers: "500+",
  durationHours: 36,
  registrationDeadline: "November 10, 2026 • 11:59 PM IST",
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd8cnpJ3IRq-NSqEWzAf84ETrWMJXu15ADXkKyKQKMxNu_MTw/viewform",
  discordUrl: "https://discord.gg/gdgmits",
  brochureUrl: "#",
};

export const TRACKS: Track[] = [
  {
    id: "ai-systems",
    title: "AI & Intelligent Systems",
    tagline: "Agentic AI, LLMs & Neural Networks",
    iconName: "Cpu",
    color: "blue",
    hexColor: "#4285F4",
    shortDesc: "Architect autonomous AI agents, multimodal LLM workflows, predictive machine learning pipelines, and real-time computer vision models.",
    fullDesc: "Artificial Intelligence is redefining technology. In this track, build solutions leveraging Gemini API, Agentic workflows, RAG architectures, multi-agent collaboration engines, and edge AI deployment.",
    problemStatements: [
      {
        id: "ai-1",
        title: "Autonomous Agentic Research & Coding Copilot",
        description: "Develop an intelligent autonomous agent capable of analyzing large codebases, auto-generating unit tests, and proposing architectural refactoring using Gemini 1.5 Pro.",
        techStack: ["Gemini API", "Python", "LangChain", "VectorDB", "React"],
        difficulty: "Advanced"
      },
      {
        id: "ai-2",
        title: "Real-time Edge Vision for Accessibility",
        description: "Create a lightweight real-time visual assistance tool for visually impaired users using on-device computer vision and spatial audio feedback.",
        techStack: ["TensorFlow.js", "MediaPipe", "React Native", "OpenCV"],
        difficulty: "Intermediate"
      }
    ]
  },
  {
    id: "web3-security",
    title: "Web3, Decentralization & Security",
    tagline: "Smart Contracts, ZK-Proofs & Zero Trust",
    iconName: "ShieldCheck",
    color: "red",
    hexColor: "#EA4335",
    shortDesc: "Engineer trustless decentralized applications, privacy-preserving cryptographic protocols, automated vulnerability scanners, and secure identity systems.",
    fullDesc: "Build the decentralized web of tomorrow. Create scalable smart contracts, zero-knowledge verification engines, decentralized data vaults, or automated cyber threat prevention platforms.",
    problemStatements: [
      {
        id: "w3-1",
        title: "Zero-Knowledge Identity Verification for Campuses",
        description: "Build a ZK-SNARK based credential verification system allowing students to prove identity, grades, or club memberships without revealing sensitive PII.",
        techStack: ["Solidity", "Circom", "Ethers.js", "Polygon", "Next.js"],
        difficulty: "Advanced"
      },
      {
        id: "w3-2",
        title: "Automated Smart Contract Audit Assistant",
        description: "Design an open-source static code analysis scanner that detects reentrancy attacks, gas inefficiencies, and overflow vulnerabilities in smart contracts.",
        techStack: ["Rust", "Slither", "Node.js", "Tailwind CSS"],
        difficulty: "Intermediate"
      }
    ]
  },
  {
    id: "smart-campus",
    title: "Smart Campus & IoT Automation",
    tagline: "Connected Devices, Clean Energy & Robotics",
    iconName: "Zap",
    color: "yellow",
    hexColor: "#FBBC05",
    shortDesc: "Revolutionize campus infrastructure, automated lab monitoring, intelligent microgrids, smart hostel logistics, and energy consumption optimization.",
    fullDesc: "MITS-DU Gwalior campus is your canvas! Build hardware-integrated IoT solutions, smart classroom booking systems, dynamic traffic & parking management, or smart water management networks.",
    problemStatements: [
      {
        id: "iot-1",
        title: "AI-Powered Smart Microgrid & Campus Energy Optimizer",
        description: "Construct a real-time IoT dashboard that predicts solar energy generation and dynamically balances HVAC and lighting loads across campus blocks.",
        techStack: ["ESP32 / Raspberry Pi", "MQTT", "NodeJS", "Three.js", "InfluxDB"],
        difficulty: "Intermediate"
      },
      {
        id: "iot-2",
        title: "Autonomous Hostel & Mess Resource Tracker",
        description: "Build a computer vision and sensor-enabled system to measure food waste metrics and dynamically optimize hostel mess inventory requirements.",
        techStack: ["Python", "YOLOv8", "React", "Firebase"],
        difficulty: "All Levels"
      }
    ]
  },
  {
    id: "medtech",
    title: "Healthcare & MedTech Innovation",
    tagline: "Preventive Care, Diagnostics & Telemedicine",
    iconName: "HeartPulse",
    color: "green",
    hexColor: "#34A853",
    shortDesc: "Innovate accessible digital health tools, AI diagnostic imaging pipelines, emergency response networks, and mental wellness tracking systems.",
    fullDesc: "Empower healthcare providers and patients with tech. Solve challenges in rural telemedicine, rapid triage engines, automated prescription verification, and patient recovery monitoring.",
    problemStatements: [
      {
        id: "med-1",
        title: "Offline-First Diagnostic & Ambulance Triage Network",
        description: "Develop a low-bandwidth, offline-capable PWA that assists rural healthcare workers with instant triage guidance and automated emergency dispatch.",
        techStack: ["React PWA", "WebRTC", "Workbox", "TensorFlow Lite"],
        difficulty: "Intermediate"
      },
      {
        id: "med-2",
        title: "AI Patient Companion & Mental Health Support System",
        description: "Build an empathetic multimodal conversational partner trained on cognitive behavioral therapy principles with sentiment analysis.",
        techStack: ["Gemini 1.5 Flash", "Speech API", "React", "Tailwind"],
        difficulty: "All Levels"
      }
    ]
  },
  {
    id: "fintech",
    title: "FinTech & Financial Inclusion",
    tagline: "Micro-Lending, Payment Rails & Fraud Detection",
    iconName: "Coins",
    color: "purple",
    hexColor: "#A855F7",
    shortDesc: "Democratize financial services, build cross-border instant settlement protocols, fraud detection neural networks, and personal wealth analytics.",
    fullDesc: "Financial technology drives global economic inclusion. Create UPI-integrated micro-financing engines, transparent credit scoring for unbanked populations, or real-time transaction anomaly detectors.",
    problemStatements: [
      {
        id: "fin-1",
        title: "UPI Micro-Savings & Algorithmic Round-Up Vaults",
        description: "Architect a frictionless micro-investing solution that automatically rounds up everyday digital transactions into decentralized yield vaults or digital gold.",
        techStack: ["React", "Express", "Node.js", "PostgreSQL", "Razorpay Sandbox"],
        difficulty: "Intermediate"
      },
      {
        id: "fin-2",
        title: "Real-Time Transaction Anomaly & Mule Account Detector",
        description: "Create a graph analytics visualization engine to detect money laundering clusters and suspicious transaction loops across financial networks.",
        techStack: ["Neo4j", "Python", "React", "D3.js"],
        difficulty: "Advanced"
      }
    ]
  },
  {
    id: "open-innovation",
    title: "Open Innovation & Wildcard",
    tagline: "Break Limits with Unrestricted Creativity",
    iconName: "Sparkles",
    color: "cyan",
    hexColor: "#00F2FE",
    shortDesc: "Have a game-changing idea that transcends existing categories? Build AR/VR experiences, developer tools, sustainable tech, or next-gen gaming apps.",
    fullDesc: "No boundaries, no limits! Pitch your most ambitious software or hardware prototype. Show off pure engineering prowess, stunning UI/UX, and revolutionary thinking.",
    problemStatements: [
      {
        id: "open-1",
        title: "Developer Productivity Suite or Web3/Spatial UX",
        description: "Build whatever excites your team! From high-speed web compilers to immersive spatial 3D tools and sustainable green-tech innovations.",
        techStack: ["Any Tech Stack", "Google Cloud", "Three.js", "WebAssembly"],
        difficulty: "All Levels"
      }
    ]
  }
];

export const SCHEDULE_PHASES: SchedulePhase[] = [
  {
    phaseId: 1,
    day: "Day 1",
    title: "Phase 1: Kickoff, Ideation & Mentor Sync",
    date: "Saturday, Nov 14, 2026",
    badge: "Hours 00 - 12",
    events: [
      {
        time: "08:30 AM - 10:00 AM",
        title: "Check-In & Hacker Kit Distribution",
        description: "Arrive at MITS Campus Main Auditorium. Grab your official GDG badge, INNOV8 t-shirt, stickers, and swag kit.",
        category: "Keynote",
        iconName: "UserCheck"
      },
      {
        time: "10:00 AM - 11:30 AM",
        title: "Grand Opening Ceremony & Keynote",
        description: "Welcome address by GDG Leads, MITS Faculty Directors, and Google Developer Experts. Unveiling of mystery challenges.",
        category: "Keynote",
        iconName: "Sparkles"
      },
      {
        time: "12:00 PM Sharp",
        title: "HACKING COMMENCES (Hour 00)",
        description: "The 36-hour timer starts! Teams claim their hacking bays, initialize Git repositories, and begin architecture design.",
        category: "Hacking",
        iconName: "Zap"
      },
      {
        time: "01:30 PM - 02:30 PM",
        title: "Networking Lunch & Energy Fuel",
        description: "Delicious lunch served at the Campus Dining Hall. Meet fellow hackers and exchange ideas.",
        category: "Food",
        iconName: "Utensils"
      },
      {
        time: "04:00 PM - 06:30 PM",
        title: "Mentorship Round 1: Idea Refinement",
        description: "Senior engineers, Google Developer Experts, and startup founders review team architecture and problem viability.",
        category: "Mentorship",
        iconName: "Users"
      },
      {
        time: "08:30 PM - 09:30 PM",
        title: "Dinner Feast & Google Cloud Credits Pass",
        description: "Fuel up for the night ahead! Access live Google Cloud sandbox vouchers and API credits.",
        category: "Food",
        iconName: "Utensils"
      }
    ]
  },
  {
    phaseId: 2,
    day: "Day 2",
    title: "Phase 2: The 24-Hour Crucible Sprint",
    date: "Sunday, Nov 15, 2026",
    badge: "Hours 12 - 28",
    events: [
      {
        time: "00:00 AM Midnight",
        title: "Midnight Pizza & Energy Drinks",
        description: "Fresh hot pizzas, Red Bull cans, coffee bar setup, and quick mini gaming tournaments (Valorant & FIFA).",
        category: "Fun/Relax",
        iconName: "Coffee"
      },
      {
        time: "03:00 AM - 04:00 AM",
        title: "Late Night Music Jam & VR Chill Zone",
        description: "Take a 30-minute break in the lounge with acoustic music, beanbags, and Meta Quest VR setups.",
        category: "Fun/Relax",
        iconName: "Music"
      },
      {
        time: "08:30 AM - 09:30 AM",
        title: "Power Breakfast & Code Health Check",
        description: "Healthy breakfast, fresh juice, and coffee. Quick git push sanity check.",
        category: "Food",
        iconName: "Utensils"
      },
      {
        time: "11:00 AM - 01:30 PM",
        title: "Mentorship Round 2: Technical Deep Dive",
        description: "Mid-sprint technical review. Industry judges inspect live code repositories, API integrations, and UI polish.",
        category: "Mentorship",
        iconName: "Code2"
      },
      {
        time: "06:00 PM - 07:30 PM",
        title: "Mid-Way Evaluation & Progress Checkpoint",
        description: "Checkpoint submission on Devfolio/GitHub. Top performing teams earn priority slot selection for final pitches.",
        category: "Evaluation",
        iconName: "CheckCircle2"
      },
      {
        time: "09:00 PM - 10:30 PM",
        title: "Neon DJ Night & Stress buster Bash",
        description: "Live DJ set in the outdoor courtyard to energize teams before the final overnight sprint!",
        category: "Fun/Relax",
        iconName: "Radio"
      }
    ]
  },
  {
    phaseId: 3,
    day: "Day 3",
    title: "Phase 3: Final Stretch, Pitches & Grand Finale",
    date: "Monday, Nov 16, 2026",
    badge: "Hours 28 - 36",
    events: [
      {
        time: "06:00 AM - 08:00 AM",
        title: "Final Code Freeze Prep",
        description: "Polish UI interactions, finalize pitch decks, record backup demo video, and deploy live web/mobile links.",
        category: "Hacking",
        iconName: "Flame"
      },
      {
        time: "11:00 AM Sharp",
        title: "HACKING ENDS (Hour 36)",
        description: "Hands off keyboards! All code repositories locked. Submissions officially closed.",
        category: "Evaluation",
        iconName: "Lock"
      },
      {
        time: "12:00 PM - 03:00 PM",
        title: "Grand Pitching Showdown & Expo",
        description: "Teams present 3-minute live product demos on stage to our panel of VCs, Tech Leads, and Google Directors.",
        category: "Evaluation",
        iconName: "Trophy"
      },
      {
        time: "03:30 PM - 05:00 PM",
        title: "Award Ceremony & Closing Celebration",
        description: "Announcement of 1st, 2nd, 3rd place winners, track category awards, trophy presentation, and group photo!",
        category: "Keynote",
        iconName: "Award"
      }
    ]
  }
];

export const PRIZES: PrizeItem[] = [
  {
    rank: 1,
    title: "1st Place Winner",
    amount: "₹50,000",
    usdEquivalent: "~$600 USD",
    gradient: "from-amber-400 via-yellow-500 to-yellow-600",
    borderColor: "border-yellow-400/50",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
    icon: "Crown",
    perks: [
      "₹50,000 Direct Cash Prize",
      "Official GDG Champion Trophy & Certificates",
      "$2,000 Google Cloud Platform Credits",
      "Direct Fast-Track Interview Access to Partner Companies",
      "GDG Exclusive Developer Merchandise & Swag Box"
    ]
  },
  {
    rank: 2,
    title: "2nd Place Runner Up",
    amount: "₹30,000",
    usdEquivalent: "~$360 USD",
    gradient: "from-slate-300 via-gray-400 to-slate-500",
    borderColor: "border-slate-300/50",
    badgeColor: "bg-slate-400/20 text-slate-300 border-slate-400/40",
    icon: "Medal",
    perks: [
      "₹30,000 Direct Cash Prize",
      "Runner-Up Silver Trophy & Certificates",
      "$1,000 Google Cloud Platform Credits",
      "Mentorship Sessions with Google Developer Experts",
      "Premium GDG Swag Kits & Hardware Vouchers"
    ]
  },
  {
    rank: 3,
    title: "3rd Place 2nd Runner Up",
    amount: "₹15,000",
    usdEquivalent: "~$180 USD",
    gradient: "from-amber-600 via-orange-700 to-amber-800",
    borderColor: "border-amber-600/50",
    badgeColor: "bg-amber-600/20 text-amber-500 border-amber-600/40",
    icon: "Award",
    perks: [
      "₹15,000 Direct Cash Prize",
      "Second Runner-Up Bronze Trophy & Certificates",
      "$500 Google Cloud Platform Credits",
      "1-Year JetBrains All Products Pack Subscriptions",
      "GDG Swag Kits & Custom Mechanical Keyboard"
    ]
  }
];

export const SPECIAL_PRIZES: SpecialPrize[] = [
  {
    title: "Best All-Girls Team",
    tag: "Women In Tech Special",
    amount: "₹7,500 + Goodies",
    description: "Awarded to the top-ranking team comprising entirely of women developers to support diversity in computing.",
    icon: "Sparkles",
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "Best First-Year Hack",
    tag: "Freshmen Rising Star",
    amount: "₹5,000 + Tech Swag",
    description: "Recognizing outstanding technical innovation and grit from 1st-year undergraduate hackers.",
    icon: "GraduationCap",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Best UI/UX & Design Polish",
    tag: "Creative Design Excellence",
    amount: "₹5,000 + Figma Pro",
    description: "Awarded to the project featuring the most mesmerizing, accessible, and fluid user experience design.",
    icon: "Palette",
    color: "from-purple-500 to-violet-600"
  }
];

export const JUDGING_CRITERIA: JudgingCriteria[] = [
  {
    category: "Innovation & Originality",
    percentage: 30,
    description: "How novel is the idea? Does it solve a real-world problem in an unconventional, creative, or breakthrough way?",
    color: "#4285F4"
  },
  {
    category: "Technical Complexity & Execution",
    percentage: 25,
    description: "Quality of architecture, code cleaniness, API usage, algorithms, performance, and depth of technical implementation.",
    color: "#EA4335"
  },
  {
    category: "Practical Impact & Feasibility",
    percentage: 25,
    description: "How viable is the solution in production? Is there a tangible real-world market benefit or community utility?",
    color: "#FBBC05"
  },
  {
    category: "UI/UX & Final Presentation",
    percentage: 20,
    description: "Design aesthetics, intuitive user flow, responsive interface, live pitch delivery, and demo stability.",
    color: "#34A853"
  }
];

export const RULES: RuleItem[] = [
  {
    id: "r1",
    title: "Team Size & Composition",
    detail: "Teams must consist of 2 to 4 members. Cross-college teams and multidisciplinary team compositions are warmly encouraged!",
    icon: "Users"
  },
  {
    id: "r2",
    title: "Code Originality & Fresh Commit",
    detail: "All code, wireframes, and design assets must be created during the official 36-hour sprint. Pre-existing open-source libraries and APIs may be used with proper attribution.",
    icon: "GitBranch"
  },
  {
    id: "r3",
    title: "Submission & Repository Policy",
    detail: "Projects must be pushed to a public GitHub repository with an open-source license and a clear README containing setup instructions and live demo links before Hour 36.",
    icon: "FolderGit2"
  },
  {
    id: "r4",
    title: "Code of Conduct & Fairness",
    detail: "GDG On Campus MITS-DU strictly enforces an inclusive, welcoming environment. Plagiarism, harassment, or unethical behavior will result in immediate disqualification.",
    icon: "ShieldAlert"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who can participate in INNOV8-MITS 2026?",
    answer: "INNOV8-MITS 2026 is open to all undergraduate and postgraduate students from any recognized college or university across India. Whether you are a beginner or a veteran hacker, you are welcome!",
    category: "General"
  },
  {
    id: "faq-2",
    question: "Is there any registration fee to participate?",
    answer: "No! INNOV8-MITS 2026 is 100% FREE of cost for all accepted participants, courtesy of GDG On Campus MITS-DU Gwalior and our sponsors.",
    category: "General"
  },
  {
    id: "faq-3",
    question: "Are food, drinks, and accommodation provided for the 36 hours?",
    answer: "Yes, absolutely! We provide fully sponsored meals (Breakfast, Lunch, Dinner, Midnight Snacks), 24/7 high-speed Wi-Fi, coffee stations, and designated rest/sleeping zones on campus throughout the 36-hour duration.",
    category: "Logistics"
  },
  {
    id: "faq-4",
    question: "Can I participate individually or do I need a team?",
    answer: "Participation requires a team of 2 to 4 members. If you don't have a team yet, join our official Discord server to find teammates through our dedicated team-building channel!",
    category: "Teams"
  },
  {
    id: "faq-5",
    question: "What hardware or tools should I bring to campus?",
    answer: "Bring your laptop, charger, extension cord, valid student ID card, personal toiletries, and your unstoppable hacker spirit!",
    category: "Logistics"
  },
  {
    id: "faq-6",
    question: "What hardware or APIs can we use during hacking?",
    answer: "You can use any open-source framework, cloud service (Google Cloud, Firebase, Gemini API), or hardware (Arduino, ESP32, Raspberry Pi). Free Google Cloud credits will be provided to registered teams.",
    category: "Submissions"
  }
];

export const STATS = [
  { label: "Duration", value: "36 Hours", sub: "Non-stop Sprint" },
  { label: "Prize Pool", value: "₹1,00,000+", sub: "Cash & Perks" },
  { label: "Participants", value: "500+", sub: "National Hackers" },
  { label: "Problem Tracks", value: "6+ Domains", sub: "Cutting-Edge Tech" },
];
