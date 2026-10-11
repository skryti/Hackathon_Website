<div align="center">

  # 🚀 HackInnov8 — Official Hackathon Website

  **The Flagship Hackathon Platform by GDGoC — MITS Gwalior**

  [![Live Site](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://hackinnov8-gdgoc-mits.vercel.app/)
  [![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/skryti/Hackathon_Website)
  [![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Build%20Tool-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

  <p align="center">
    <a href="https://hackinnov8-gdgoc-mits.vercel.app/"><strong>🌐 View Live Website</strong></a> •
    <a href="https://github.com/skryti/Hackathon_Website/issues"><strong>Report Bug</strong></a> •
    <a href="https://github.com/skryti/Hackathon_Website/pulls"><strong>Request Feature</strong></a>
  </p>

</div>

---

## 📌 Overview

**HackInnov8 2026** is an interactive hackathon website created for a 36-hour hackathon organized by **GDGoC (Google Developer Groups on Campus)** at **Madhav Institute of Technology & Science (MITS), Gwalior**.

The website provides participants with essential event information, including hackathon tracks, the event timeline, prizes, judging criteria, rules, FAQs, and registration.

It combines an immersive 3D hero section, interactive UI components, animations, and a Google-colour Easter egg to create an engaging browsing experience.

🌐 **Live Website:** https://hackinnov8-gdgoc-mits.vercel.app/

---

## 🛠️ Tech Stack & Libraries

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | [React](https://react.dev/) | Builds the interface using reusable components |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Adds static type checking to the code |
| **Build Tool** | [Vite](https://vitejs.dev/) | Development server and production builds |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-based styling and responsive layouts |
| **3D Graphics** | [Three.js](https://threejs.org/) | Creates 3D graphics and scenes |
| **3D Integration** | [React Three Fiber](https://r3f.docs.pmnd.rs/) | Allows Three.js scenes to be built with React |
| **3D Helpers** | [Drei](https://drei.docs.pmnd.rs/) | Provides helper components and utilities for React Three Fiber |
| **Animations** | [Framer Motion](https://motion.dev/) | Animates interface elements and transitions |
| **Scrolling** | [Lenis](https://github.com/darkroomengineering/lenis) | Provides smooth scrolling |
| **Visual Effects** | [canvas-confetti](https://github.com/catdad/canvas-confetti) | Creates celebratory confetti effects |
| **Icons** | [Lucide React](https://lucide.dev/) / [React Icons](https://react-icons.github.io/react-icons/) | Provides icons for the interface |
| **Deployment** | [Vercel](https://vercel.com/) | Hosts the live website |
| **Registration** | [Google Forms](https://forms.google.com/) | Collects participant registration responses |

---

## ✨ Key Features

- 🌐 **Interactive 3D Hero:** A 3D globe, orbiting track satellites, and particle effects create an engaging homepage.
- 🎨 **Google-Colour Easter Egg:** Clicking the GDG logo triggers a colourful particle burst with expanding shockwave effects.
- ⏱️ **Event Countdown:** Displays a countdown to the hackathon date.
- 🎯 **Hackathon Tracks:** Presents innovation domains through interactive cards and additional track details.
- 📅 **Event Timeline:** Highlights the major phases of the 36-hour hackathon.
- 🏆 **Prizes & Rewards:** Displays prize tiers and available participant rewards.
- ⚖️ **Judging Criteria:** Presents the criteria used to evaluate hackathon projects.
- 📋 **Rules & Guidelines:** Organizes event rules and participation information.
- ❓ **Expandable FAQ:** Uses an accordion to display answers to common questions.
- 🎬 **Motion & Transitions:** Uses animations to make the interface more engaging.
- 📜 **Smooth Scrolling:** Improves navigation between website sections.
- 🎉 **Confetti Effects:** Adds celebratory visual effects to registration interactions.
- 📝 **Simple Registration:** Uses Google Forms instead of a custom-built registration backend.

---

## 📂 Project Structure

The project uses a component-based structure to separate the main application, reusable UI sections, 3D visuals, data, and utility functions.

```text
Hackathon_Website/
├── public/                  # Public static assets
├── src/
│   ├── components/
│   │   ├── common/          # Shared UI components
│   │   ├── layout/          # Navbar, footer and layout components
│   │   ├── sections/        # Main website sections
│   │   ├── three/           # 3D scenes and visual components
│   │   └── ui/              # Reusable UI elements
│   ├── context/             # Shared React context
│   ├── data/                # Event, tracks, schedule and FAQ data
│   ├── hooks/               # Reusable React hooks
│   ├── lib/                 # Utilities and visual effect helpers
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── index.html               # HTML entry point
├── package.json             # Dependencies and npm scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

*Note: This is a high-level representation of the project structure. Refer to the repository for the complete list of files.*

---

## 🚀 Getting Started

### Prerequisites

- Node.js compatible with the project's Vite version
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/skryti/Hackathon_Website.git
```

2. Navigate to the project directory:

```bash
cd Hackathon_Website
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in the terminal.

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📝 Registration & Backend

Registration is handled through Google Forms linked from the website. This keeps the registration process simple without requiring a custom registration backend developed specifically for the project.

The website's interactive interface and visual effects run in the browser, while registration responses are collected through Google Forms.

---

## 🌐 Live Demo

Experience HackInnov8 2026:

**[Visit the Live Website](https://hackinnov8-gdgoc-mits.vercel.app/)**

---

<div align="center">

  **Built for HackInnov8 2026**

  GDGoC — MITS, Gwalior

</div>
