export type ScreenType = 'dashboard' | 'upload' | 'live' | 'report' | 'analyzing';

export interface SignalScore {
  name: string;
  score: number;
  label: string;
  sublabel: string;
  detail: string;
  color: string;
}

export interface SessionItem {
  id: string;
  title: string;
  mode: 'Live Mock' | 'Uploaded Video' | 'Celery Processing';
  timeAgo: string;
  score?: number;
  status: 'Ready' | 'Review' | 'in progress' | 'complete';
  summary: string;
  tags?: string[];
  progress?: number;
  interviewer?: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface KeyMoment {
  id: string;
  timestamp: string;
  seconds: number;
  type: 'peak' | 'watchout';
  score: number;
  title: string;
  description: string;
}

export interface TranscriptSnippet {
  speaker: string;
  timeRange: string;
  content: string;
  annotations: {
    text: string;
    type: 'filler' | 'gesture' | 'pitch';
    tooltip: string;
  }[];
}
