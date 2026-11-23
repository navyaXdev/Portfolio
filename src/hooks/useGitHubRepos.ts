import { useState, useEffect } from 'react';
import { GitHubRepo } from '../types';

const USERNAME = 'navyaXdev';
const CACHE_KEY = `gh_repos_${USERNAME}`;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

// Verified fallback offline data in case GitHub API rate limits (60 req/hr unauthenticated)
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1307287792,
    name: 'ChatX',
    full_name: 'navyaXdev/ChatX',
    description: 'Client-side end-to-end encrypted chat app (React + Flask) — messages are encrypted in-browser with AES-256-GCM before the server ever sees them. Built for NYC CodeQuest 2026 (CYBER-02).',
    html_url: 'https://github.com/navyaXdev/ChatX',
    homepage: 'https://chat-x-ruddy.vercel.app',
    language: 'JavaScript',
    stargazers_count: 2,
    forks_count: 0,
    updated_at: '2026-10-02T09:12:29Z',
    topics: ['cybersecurity', 'e2ee', 'aes-256-gcm', 'react', 'flask'],
    fork: false,
    archived: false
  },
  {
    id: 1289381902,
    name: 'Safora',
    full_name: 'navyaXdev/Safora',
    description: 'Real-time phishing URL detection Chrome extension — combines a trained ML risk classifier with an independent rule-based explanation engine so users get plain-English reasons, not just a score.',
    html_url: 'https://github.com/navyaXdev/Safora',
    homepage: 'https://safora-one.vercel.app',
    language: 'JavaScript',
    stargazers_count: 6,
    forks_count: 0,
    updated_at: '2026-10-01T17:08:07Z',
    topics: ['machine-learning', 'phishing-detection', 'chrome-extension', 'python'],
    fork: false,
    archived: false
  },
  {
    id: 1454894931,
    name: 'Mornye-Network-Storage',
    full_name: 'navyaXdev/Mornye-Network-Storage',
    description: 'Open-source self-hosted network storage & RFC 4918 WebDAV server for Linux with Docker & Cloudflare Tunnel.',
    html_url: 'https://github.com/navyaXdev/Mornye-Network-Storage',
    homepage: 'https://navyaxdev.github.io/Mornye-Network-Storage/',
    language: 'Shell',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-11-13T04:39:12Z',
    topics: ['linux', 'docker', 'webdav', 'nas', 'cloudflare-tunnel', 'argon2id'],
    fork: false,
    archived: false
  },
  {
    id: 1332901234,
    name: 'Ghost-Guard',
    full_name: 'navyaXdev/Ghost-Guard',
    description: 'Behavior-based API defense system that detects unknown attacks without predefined signatures. Trains an Isolation Forest exclusively on normal traffic, then routes anomalous requests to a honeypot layer.',
    html_url: 'https://github.com/navyaXdev/Ghost-Guard',
    homepage: 'https://ghost-guard-beryl.vercel.app',
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-10-05T18:11:32Z',
    topics: ['isolation-forest', 'honeypot', 'api-defense', 'machine-learning'],
    fork: false,
    archived: false
  },
  {
    id: 1198273645,
    name: 'IntrusionEye',
    full_name: 'navyaXdev/IntrusionEye',
    description: 'ESP32-based real-time Wi-Fi intrusion detection system that monitors wireless traffic and detects attacks such as Deauthentication, Beacon Flood, Probe Flood, and SYN Flood.',
    html_url: 'https://github.com/navyaXdev/IntrusionEye',
    homepage: null,
    language: 'C++',
    stargazers_count: 3,
    forks_count: 0,
    updated_at: '2026-07-20T16:14:00Z',
    topics: ['esp32', 'wifi', 'intrusion-detection', '802-11', 'cpp'],
    fork: false,
    archived: false
  },
  {
    id: 1045982711,
    name: 'ESP8266-DUCKY',
    full_name: 'navyaXdev/ESP8266-DUCKY',
    description: 'Multi-mode ESP8266 hardware security tool combining Evil Twin simulation and HID automation research.',
    html_url: 'https://github.com/navyaXdev/ESP8266-DUCKY',
    homepage: null,
    language: 'C++',
    stargazers_count: 2,
    forks_count: 0,
    updated_at: '2026-07-23T05:39:57Z',
    topics: ['esp8266', 'hardware-security', 'hid'],
    fork: false,
    archived: false
  },
  {
    id: 1267890123,
    name: 'Python-Notes',
    full_name: 'navyaXdev/Python-Notes',
    description: 'Comprehensive technical notes in Obsidian covering Python fundamentals, networking scripts, and security modules.',
    html_url: 'https://github.com/navyaXdev/Python-Notes',
    homepage: null,
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-07-25T14:16:06Z',
    topics: ['python', 'notes', 'obsidian'],
    fork: false,
    archived: false
  },
  {
    id: 1256789012,
    name: 'Portfolio',
    full_name: 'navyaXdev/Portfolio',
    description: 'Personal luxury developer portfolio and digital identity showcasing software engineering, Linux systems, and cybersecurity projects.',
    html_url: 'https://github.com/navyaXdev/Portfolio',
    homepage: 'https://navyaxdev.github.io/Portfolio/',
    language: 'TypeScript',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-11-14T10:45:00Z',
    topics: ['react', 'vite', 'typescript', 'tailwind', 'framer-motion'],
    fork: false,
    archived: false
  }
];

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadRepos() {
      // 1. Check browser sessionStorage cache
      try {
        const cachedRaw = sessionStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const parsed = JSON.parse(cachedRaw);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.data) && parsed.data.length > 0) {
            if (isMounted) {
              setRepos(parsed.data);
              setLoading(false);
              setIsCached(true);
            }
            return;
          }
        }
      } catch {
        // Cache read fallback
      }

      // 2. Fetch fresh data from GitHub API
      try {
        const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (!res.ok) {
          throw new Error(`GitHub API HTTP ${res.status}`);
        }

        const data: GitHubRepo[] = await res.json();
        
        // Filter out fork or non-original if needed, or sort by stars / updated
        const sorted = data.sort((a, b) => {
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

        if (isMounted) {
          setRepos(sorted);
          setLoading(false);
          setError(null);
          setIsCached(false);

          // Save to sessionStorage
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              data: sorted
            }));
          } catch {
            // Storage quota safe
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Failed to fetch repositories';
          setError(msg);
          // Fall back gracefully to verified list
          setRepos(FALLBACK_REPOS);
          setLoading(false);
        }
      }
    }

    loadRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  return { repos, loading, error, isCached };
}
