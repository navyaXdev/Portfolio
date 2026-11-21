export interface SkillItem {
  name: string;
  category: 'Programming' | 'Systems & Networking';
  icon: string;
  focus: string; // Contextual technical focus description (NOT arbitrary %)
  description: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
}

export interface AchievementItem {
  id: string;
  type: 'hackathon-verified' | 'hackathon-pending' | 'certification';
  title: string;
  organization: string;
  organizerDetail?: string;
  status: 'verified' | 'result-awaited';
  statusLabel: string;
  achievementTitle?: string;
  credentialId?: string;
  citation?: string;
  signatory?: {
    name: string;
    role: string;
  };
  image?: string;
  description: string;
  tags: string[];
}
