<div align="center">

  # 🚀 HackInnov8 — Official Hackathon Website

  **The Flagship Hackathon Platform by GDGoC — MITS Gwalior**

  [![Live Site](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://hackinnov8-gdgoc-mits.vercel.app/)
  [![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/skryti/Hackathon_Website)
  [![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

  <p align="center">
    <a href="https://hackinnov8-gdgoc-mits.vercel.app/"><strong>🌐 View Live Website</strong></a> •
    <a href="https://github.com/skryti/Hackathon_Website/issues"><strong>Report Bug</strong></a> •
    <a href="https://github.com/skryti/Hackathon_Website/pulls"><strong>Request Feature</strong></a>
  </p>

</div>

---

## 📌 Overview

**HackInnov8** is the flagship hackathon organized by **GDGoC (Google Developer Groups On Campus)** at **Madhav Institute of Technology & Science (MITS), Gwalior**.

This repository contains the source code for the official landing portal. The website is engineered to give participants a fast, interactive experience with details on hackathon tracks, timelines, prize pools, partner tracks, and registration guidelines.

---

## 🛠️ Tech Stack & Libraries

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework / Core** | [React](https://react.dev/) / [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | Component-based interactive UI |
| **Build Tool** | [Vite](https://vitejs.dev/) | Lightning-fast HMR and bundle optimization |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + PostCSS | Utility-first responsive design & custom animations |
| **Icons** | [Lucide React](https://lucide.dev/) / [React Icons](https://react-icons.github.io/react-icons/) | Vector icons and visual glyphs |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) / CSS Transitions | Scroll reveals, theme transitions, and hover states |
| **Deployment** | [Vercel](https://vercel.com/) | Continuous integration & edge CDN hosting |

---

## ✨ Key Features

- 🌓 **Dynamic Theme Switching:** Seamless dark mode and light mode toggling with persisted preferences.
- 📱 **Mobile-First Responsiveness:** Adaptive grid and flex layouts tuned for smartphones, tablets, and wide screens.
- ⏱️ **Countdown Timer & Live Schedule:** Dynamic schedule tracking for key hackathon milestones and round deadlines.
- 🎯 **Domain Tracks Display:** Highlights challenge categories (AI/ML, Web3, Smart Automation, Open Innovation).
- 🏆 **Prizes & Community Perks:** Tiered cards displaying prize values, sponsor credits, and participant goodies.
- ❓ **Collapsible FAQ:** Searchable and expandable accordion for quick question resolution.

---

## 📂 Project Structure

```text
Hackathon_Website/
├── public/                 # Static assets (logos, favicon, banner art)
│   └── favicon.svg
├── src/
│   ├── assets/             # Brand graphics, icons, and illustrations
│   ├── components/         # Modular React components
│   │   ├── Navbar.jsx      # Navigation bar, mobile drawer, and theme switch
│   │   ├── Hero.jsx        # Banner, registration CTA, and countdown
│   │   ├── About.jsx       # GDGoC MITS & HackInnov8 background
│   │   ├── Tracks.jsx      # Domain problem statements & categories
│   │   ├── Timeline.jsx    # Step-by-step hackathon event roadmap
│   │   ├── Prizes.jsx      # Prize tiers and swag breakdown
│   │   ├── Sponsors.jsx    # Community partners and sponsor grid
│   │   ├── FAQ.jsx         # Collapsible Q&A accordion
│   │   └── Footer.jsx      # Social handles, community links, and copyright
│   ├── data/               # Content configurations (tracks, timeline, FAQs)
│   ├── styles/             # Global styles and Tailwind imports
│   ├── App.jsx             # Main layout & component assembly
│   └── main.jsx            # React root mount
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
