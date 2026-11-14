import { TimelineMilestone } from '../types';

export const timelineData: TimelineMilestone[] = [
  {
    period: '2026',
    title: 'NYC CodeQuest Hackathon 2026 — Round 3 Qualifier',
    organization: 'NYC CodeQuest 2026',
    role: 'Round 3 Qualifier · Cybersecurity & Fullstack Developer',
    description: 'Participated in NYC CodeQuest 2026 across two distinct security tracks, building client-side encrypted communication and ML phishing protection systems under competitive constraints.',
    highlights: [
      'Track CYBER-02: Developed "ChatX", implementing client-side AES-256-GCM zero-knowledge messaging under the "The Attacker Has the Source Code" challenge.',
      'Track CYBER-01: Built "SAFORA" (Grandma\'s Guardians), engineering a real-time phishing URL detection Chrome extension coupled with an explainable ML threat engine.',
      'Authored transparent security documentation and end-to-end web architectures for real-time threat neutralization.'
    ],
    tags: ['NYC CodeQuest 2026', 'Cybersecurity', 'Python', 'JavaScript', 'Web Security'],
    verifiedEvent: true
  },
  {
    period: '2026',
    title: 'Autonomous Systems & Storage Server Engineering',
    organization: 'Open-Source Projects',
    role: 'Creator & Maintainer',
    description: 'Designed and published Mornye Network Storage and security defense prototypes, focusing on command-line automation, storage protocols, and server scripts.',
    highlights: [
      'Engineered Mornye Network Storage: an open-source self-hosted Linux network storage and WebDAV server.',
      'Created Ghost Guard: a security prototype exploring API anomaly detection and request diversion.',
      'Authored modular installation scripts and system documentation for Linux environments.'
    ],
    tags: ['Linux', 'WebDAV', 'Shell Scripting', 'Open Source', 'System Administration'],
    verifiedEvent: true
  },
  {
    period: '2025 – 2026',
    title: 'Embedded Hardware & Wi-Fi Security Research',
    organization: 'Independent Hardware Lab',
    role: 'Embedded Firmware Developer',
    description: 'Explored low-level RF protocols and microcontroller programming on the ESP32 and ESP8266 platforms to understand physical-layer network interactions.',
    highlights: [
      'Built IntrusionEye: an ESP32 real-time 802.11 monitor mode IDS detecting Deauth, Beacon Floods, and Probe Floods with a live web UI.',
      'Researched 802.11 management frames, wireless authentication dynamics, and HID simulation in controlled lab settings.'
    ],
    tags: ['ESP32', 'ESP8266', 'C++', '802.11 Promiscuous Mode', 'Packet Analysis'],
    verifiedEvent: true
  },
  {
    period: '2025',
    title: 'Academic & Programming Foundations',
    organization: 'Undergraduate Computer Science Studies',
    role: 'B.Sc. Student & Self-Taught Explorer',
    description: 'Began B.Sc. studies in Computer Science while diving deep into self-directed computer science foundations: C memory models, Python scripting, Linux command-line mastery, and web standards.',
    highlights: [
      'Mastered core low-level computing principles in C: memory allocation, pointers, and data structures.',
      'Adopted Linux as daily driver development OS; immersed in Bash scripting, file permissions, and system administration.',
      'Built interactive web fundamentals (HTML, CSS, JavaScript) to analyze the DOM and web attack surfaces.'
    ],
    tags: ['B.Sc. CS', 'C Language', 'Python', 'Linux Internals', 'Web Basics'],
    verifiedEvent: true
  }
];
