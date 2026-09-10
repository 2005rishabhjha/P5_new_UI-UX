import { SessionItem, KeyMoment } from './types';

export const ASSETS = {
  candidate: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACqWBvBQVu_KE09c9VvNBFe90bCPjhVi1nL3EVOALHbVT2U_o6CjmS_kSBkLrnE87s3PV4V6wadv2PvjjElRl1DrxspmQG-28kAd678CaaEPkndFXjSPs6N1tHbbD7Xrtg1An6XKBD2CTeHBKiK09DtrGh-17ym8nWyJTmbdk-PHuWxHcH2Ps_hg4uFHb8VTKFUJW0Zj9ew8raEHE5LvLJnhTVATthZwEYGOmqrbqz9ET45MsIWpW5',
  interviewer: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6kt2fLUUanMj02-zB2mjxOFxgzXltOBdT_OAp0W4X091rDFw-hokRMNra_JKXKm1dFTjPrdyhioC6HYZUDgJrTRaYQt0PKCUYsE7yKramD6hLA3jQlEzawQ1vL3eBY5xvvWm1j7zKue3gARCEeUww-zwNW5ZyuCwyLv_1DKdTt8Pt_GGbwti8z9AOPEZaGEbrPgSk4XEhJlXD7Gaw_bOQDQNhzaC5BJgK_3LvvwlhRMJ1LGM4cIii',
  alex: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwt4U1Jh9dQWxkxbjts-XzmV3fYQEvp3fG3uWBjVt7CtoXu4DB7mXC9NERW7AdR6T9EqujW18pUSxHHtGBcow-TiUv8ls8ZMNr6nGWTliqedr_QNn1_mqwvC1g7hUZn1oFRAxg_w93HHeI8agWXAjA9d6n3i4wmcsfCfnu-pX7OhUK8ofeiTrd6wv_yGLM2ikfLfZ31I8ay2OK38v1upk5KQSkNkYtdiXwhbnwSqO9FFUV_DxHtDg4',
  leadAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_qSQdFQZ1-AQ5CO7roYvMc_qjeQ0VPLGFnTwbxi7VaOqaFRkwYhkQ8lnjihG5iURmK_1pQQ_6XbfEnV_ku1JCuPvrmuEgvg_O4OEyNBlJA1VrUI66hPgleW8fznifGukL6cYpB1xClPAxVLbkBhiypGf1HL6rdqeJQhnsOWjyvAaTeXzmYiZPuhRUmA-omc8HXbBOicwcUgdkNZVz9FJ7_841_F8O2fFV53P0N3FZsHBRKxZ8VQdV',
};

export const INITIAL_SESSIONS: SessionItem[] = [
  {
    id: 'P5-8842A',
    title: 'Senior Product Manager Mock',
    mode: 'Live Mock',
    timeAgo: '2 hrs ago',
    score: 84,
    status: 'Ready',
    summary: 'System Architecture & Scaling strategy session with focus on trade-offs',
    tags: ['Posture: 88%', 'Gaze: Stable', 'Vocals: Optimal'],
    interviewer: {
      name: 'Vikram Mehta',
      role: 'VP Engineering • System Architecture',
      avatar: ASSETS.interviewer,
    },
  },
  {
    id: 'P5-882190',
    title: 'Behavioral Round - Leadership',
    mode: 'Uploaded Video',
    timeAgo: 'Yesterday',
    score: 69,
    status: 'Review',
    summary: 'Conflict resolution scenario. Filler word spike detected in mid-interview',
    tags: ['Filler words (3.8%)', 'Vocal drift detected'],
  },
  {
    id: 'P5-89412',
    title: 'System Design Interview',
    mode: 'Celery Processing',
    timeAgo: 'Just now',
    status: 'in progress',
    progress: 68,
    summary: 'Computing multimodal feature vectors & synchronizing vocal transcript...',
    tags: ['Parsing Lexicon & Face Meshes', 'ETA ~42s'],
  },
  {
    id: '2c907563',
    title: 'Executive Pitch - Product Strategy',
    mode: 'Live Mock',
    timeAgo: '3 days ago',
    score: 82,
    status: 'complete',
    summary: 'Strong engagement with high executive presence and natural smiles',
    tags: ['Posture: 84%', 'Vocal: 89%'],
  },
  {
    id: '738b091f',
    title: 'Technical Case: Distributed DB',
    mode: 'Live Mock',
    timeAgo: '5 days ago',
    score: 74,
    status: 'complete',
    summary: 'Detailed explanation of CAP theorem and latency budgets',
    tags: ['Posture: 79%', 'WPM: 148'],
  },
];

export const KEY_MOMENTS: KeyMoment[] = [
  {
    id: 'moment-0842',
    timestamp: '08:42',
    seconds: 522,
    type: 'peak',
    score: 94,
    title: 'System Architecture & Scale answer',
    description: 'Perfect voice pacing (142 wpm), confident hand gestures, and zero filler pauses during high technical nuance.',
  },
  {
    id: 'moment-1615',
    timestamp: '16:15',
    seconds: 975,
    type: 'watchout',
    score: 71,
    title: 'Conflict Resolution situational question',
    description: 'Spike in repetitive fillers ("like, honestly, you know") and eye tracking deviated upwards for 4.2 seconds.',
  },
];
