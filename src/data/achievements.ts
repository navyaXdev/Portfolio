import { AchievementItem } from '../types';
import certNycCodeQuest from '../assets/certificates/CERT-2026-MFDX9C.png';

export const achievementsData: AchievementItem[] = [
  {
    id: 'nyc-codequest-2026',
    type: 'hackathon-verified',
    title: 'NYC CodeQuest',
    organization: 'NYC CodeQuest',
    organizerDetail: 'Harsh Vandana Sharma · CEO & Founder',
    status: 'verified',
    statusLabel: 'Verified Achievement',
    achievementTitle: 'Round 3 Qualifier',
    credentialId: 'CERT-2026-MFDX9C',
    citation: 'In recognition of successfully qualifying for and competing in Round 3 of NYC CodeQuest demonstrating exceptional promise, creative thinking, technical aptitude, and determination throughout the competition.',
    signatory: {
      name: 'Harsh Vandana Sharma',
      role: 'CEO & Founder'
    },
    image: certNycCodeQuest,
    description: 'Successfully qualified through competitive screening rounds into Round 3 of NYC CodeQuest, building real-world software and security solutions under competitive constraints.',
    tags: ['NYC CodeQuest', 'Round 3 Qualifier', 'Hackathon', 'Verified Credential']
  },
  {
    id: 'smart-india-hackathon',
    type: 'hackathon-pending',
    title: 'Smart India Hackathon (SIH)',
    organization: 'Ministry of Education Innovation Cell & AICTE',
    organizerDetail: 'Government of India',
    status: 'result-awaited',
    statusLabel: 'Result Awaited',
    achievementTitle: 'National Hackathon Participant',
    description: 'Participated in the premier nationwide innovation hackathon organized by the Ministry of Education Innovation Cell and AICTE. Official project submissions have been concluded; evaluation and final results are currently pending.',
    tags: ['Smart India Hackathon', 'National Innovation', 'Nationwide Hackathon', 'Result Awaited']
  }
];
