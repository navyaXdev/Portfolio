# Dinesh Patra — Luxury Tech Portfolio 🚀

> **Developer | Cybersecurity Enthusiast | Technology Builder**  
> First-Year B.Sc. student exploring software engineering, Linux systems, networking, and web penetration testing.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/navyaXdev/Portfolio)
[![Live Site](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-00F5A0.svg)](https://navyaxdev.github.io/Portfolio/)
[![Verified Identity](https://img.shields.io/badge/Identity-navyaXdev-brightgreen.svg)](https://github.com/navyaXdev)

---

## 💎 Overview
This project is a complete luxury-grade React architecture rebuild of Dinesh Patra's portfolio. Designed with an editorial aesthetic inspired by high-end cybersecurity telemetry, minimal editorial typography, and interactive canvas environments.

### Key Highlights
- **Interactive Terminal Widget**: Live educational diagnostic terminal with auto-typewriter playback and user CLI command execution (`whoami`, `skills`, `repos`, `roadmap`, `help`, `uname -a`, `clear`, `flag`).
- **Authentic Technical Fundamentals**: Focused strictly on proven competencies: Python, C/C++, HTML & CSS, JavaScript, Linux / Kali Linux, Bash & Shell, Networking Fundamentals, and Git & GitHub.
- **Central GitHub Project Destination**: Live API synchronization querying `@navyaXdev` public repositories with client-side caching (`sessionStorage`), language filters, search bar, and fallback resilience.
- **Interconnected Redesigned Roadmap**: Continuous visual spine connecting milestones from foundational systems to professional Web Penetration Testing.
- **Luxury Custom Cursor with Zero Native Cursor Bleed**: Global desktop cursor suppression (`cursor: none !important`), zero-latency GPU-accelerated center dot tracking, fluid lerp outer ring, and touch-device preservation.
- **Deep Technical SEO**: Open Graph, Twitter Cards, Canonical links, XML sitemap, `robots.txt`, and Schema.org JSON-LD Person & WebSite graphs.

---

## 🛠 Technology Stack
- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type checking)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Glassmorphism & Cyber Tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Caching**: Browser `sessionStorage` with TTL invalidation

---

## 📁 Project Architecture
```
c:\WORKPLACE\Portfolio/
├── legacy-portfolio/            # Safe backup of original HTML, CSS & JS
├── public/
│   ├── favicon.svg              # Scalable SVG favicon
│   ├── robots.txt               # Search crawler permissions
│   └── sitemap.xml              # Search engine sitemap
├── src/
│   ├── components/
│   │   ├── About/               # Academic background & engineering pillars
│   │   ├── Contact/             # Direct copy email, verified profiles & mailto
│   │   ├── CustomCursor/        # Lerp trailing ring & precision crosshair
│   │   ├── Experience/          # Learning timeline & NYC CodeQuest 2026
│   │   ├── Footer/              # Back to top & copyright
│   │   ├── GitHubActivity/      # Dynamic GitHub API integration & search
│   │   ├── Hero/                # Editorial typography, portrait & Kali terminal
│   │   ├── Navbar/              # Glassmorphic navbar with active scroll spy
│   │   ├── Preloader/           # Boot sequence with system metrics
│   │   ├── Roadmap/             # Interconnected phased pathway to Web Pentesting
│   │   ├── Terminal/            # Live interactive CLI emulator
│   │   ├── Toolkit/             # Categorized Linux, network & lab commands
│   │   └── UI/                  # Ambient background, buttons, badges, headings
│   ├── data/
│   │   ├── profile.ts           # Verified identity, stats & bio
│   │   ├── roadmap.ts           # Phased milestones
│   │   ├── skills.ts            # Authentically retained engineering fundamentals
│   │   ├── timeline.ts          # Hackathons & learning history
│   │   └── toolkit.ts           # Linux & networking commands
│   ├── hooks/
│   │   ├── useGitHubRepos.ts    # GitHub API hook with caching & fallbacks
│   │   ├── useMagnetic.ts       # Magnetic button effect
│   │   └── useScrollSpy.ts      # Active section observer
│   ├── styles/
│   │   └── index.css            # Tailwind directives & design tokens
│   ├── types/
│   │   └── index.ts             # Strict TypeScript interfaces
│   ├── App.tsx                  # Root application component
│   └── main.tsx                 # Entry mount point
├── index.html                   # HTML5 template with SEO & JSON-LD
├── package.json                 # Dependencies & scripts
├── tailwind.config.js           # Design system configuration
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Bundler configuration
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js (v18.x or newer)
- npm (v9.x or newer)

### Installation
```bash
# Clone the repository
git clone https://github.com/navyaXdev/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
# Type check and compile optimized bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🚀 Deployment Instructions

### Deploy to GitHub Pages
1. Build the distribution bundle:
   ```bash
   npm run build
   ```
2. The `vite.config.ts` is configured with `base: './'`, enabling seamless deployment to GitHub Pages at `https://navyaxdev.github.io/Portfolio/`.
3. You can deploy using the `gh-pages` branch or GitHub Actions static page deployment pointing to the `dist` folder.

### Deploy to Vercel
1. Push to your GitHub repository.
2. Import repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**.

---

## 🔒 Security & Privacy
- Zero client-side API secrets or tokens exposed.
- All external links use `rel="noopener noreferrer"`.
- Real-time GitHub API data is treated as untrusted and safely rendered without dangerous string interpolations.
- Offline verified fallback ensures uninterrupted uptime even when rate-limited.

---

## 📬 Contact
- **Email**: [dinesh.cyber25@gmail.com](mailto:dinesh.cyber25@gmail.com)
- **GitHub**: [@navyaXdev](https://github.com/navyaXdev)
- **LinkedIn**: [Dinesh Patra](https://www.linkedin.com/in/dinesh-patra-56a505413)
