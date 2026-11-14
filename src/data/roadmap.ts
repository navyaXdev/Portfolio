import { RoadmapStep } from '../types';

export const roadmapData: RoadmapStep[] = [
  {
    phase: 'Phase 01',
    title: 'Programming & Systems Foundation',
    status: 'completed',
    summary: 'Mastering algorithmic logic, memory fundamentals in C, Python automation scripts, and daily Linux administration.',
    deliverables: [
      'C programming, memory allocation & pointer logic',
      'Python scripting for automation & command-line tools',
      'Linux kernel structure, POSIX permissions & environment configuration',
      'Bash automation workflows & terminal mastery'
    ]
  },
  {
    phase: 'Phase 02',
    title: 'Web Fundamentals & Network Protocols',
    status: 'completed',
    summary: 'Understanding frontend DOM lifecycles, browser client-side execution, and packet-level network protocols.',
    deliverables: [
      'HTML structure, modern CSS & JavaScript DOM logic',
      'TCP/IP 3-way handshakes, UDP, IP addressing & routing concepts',
      'DNS resolution, HTTP request/response lifecycles & headers',
      'Network diagnostics with ping, traceroute, and netstat'
    ]
  },
  {
    phase: 'Phase 03',
    title: 'Hands-On Security Labs & Network Testing',
    status: 'in-progress',
    summary: 'Exploring traffic analysis, port scanning fundamentals, and wireless network security in controlled lab setups.',
    deliverables: [
      'Network scanning and service version discovery with Nmap',
      '802.11 wireless frame structures in controlled educational labs',
      'Packet inspection and network protocol troubleshooting',
      'Building disciplined laboratory testing workflows in Kali Linux'
    ]
  },
  {
    phase: 'Phase 04',
    title: 'Web Application Security & OWASP Methodology',
    status: 'in-progress',
    summary: 'Deepening hands-on vulnerability assessment methodologies focused on the OWASP Top 10, proxy auditing, and CTF challenges.',
    deliverables: [
      'Hands-on study of OWASP vulnerabilities (SQLi, XSS, CSRF, IDOR)',
      'Interception proxy analysis with Burp Suite',
      'Structured practical challenges on TryHackMe and HackTheBox',
      'Manual web request inspection and security logic analysis'
    ]
  },
  {
    phase: 'Phase 05',
    title: 'Professional Penetration Testing & Responsible Disclosure',
    status: 'upcoming',
    summary: 'Transitioning to active bug bounty research, practical security certifications, and industry assessment roles.',
    deliverables: [
      'Pursuing hands-on practical certifications (e.g. eJPT / OSCP track)',
      'Participating in legal bug bounty programs and responsible disclosure',
      'Conducting structured security assessments on web applications',
      'Writing professional vulnerability documentation & remediation reports'
    ]
  }
];
