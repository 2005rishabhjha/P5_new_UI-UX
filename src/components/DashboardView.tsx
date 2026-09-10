import React, { useState, useEffect } from 'react';
import { ScreenType, SessionItem } from '../types';
import { ASSETS } from '../mockData';
import { 
  Video, 
  UploadCloud, 
  ArrowRight, 
  FolderOpen, 
  TrendingUp, 
  CheckCircle2, 
  RotateCw, 
  Lightbulb, 
  ChevronRight,
  Accessibility,
  Smile,
  Activity,
  Brain,
  Timer
} from 'lucide-react';

interface DashboardViewProps {
  onSelectScreen: (screen: ScreenType) => void;
  sessions: SessionItem[];
  onOpenSessionReport: (sessionId: string) => void;
  onOpenSessionProgress: (sessionId: string) => void;
  onShowToast: (msg: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectScreen,
  sessions,
  onOpenSessionReport,
  onOpenSessionProgress,
  onShowToast,
}) => {
  const [celeryProgress, setCeleryProgress] = useState(64);

  // Animate the active Celery worker task dynamically
  useEffect(() => {
    const timer = setInterval(() => {
      setCeleryProgress((prev) => (prev >= 92 ? 64 : prev + 1));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Top Greeting & Hero Statement */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#a33900] uppercase tracking-wider font-semibold">
              Welcome back
            </span>
            <h1 className="font-['Manrope'] text-2xl md:text-4xl font-extrabold text-[#1b1b1e] tracking-tight mt-0.5">
              Good morning, Alex
            </h1>
          </div>
          <div className="relative">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-[#ffdbce] shadow-sm">
              <img 
                src={ASSETS.alex} 
                alt="Alex" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#006a44] ring-2 ring-white"></span>
          </div>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#594139] max-w-3xl leading-relaxed">
          Four analyzers run over one video: posture and gesture from pose landmarks, eye contact and expression from face landmarks, pace and energy from the audio track, and filler words and sentiment from the transcript. One composite score out of 100, plus the timestamps that produced it.
        </p>
      </section>

      {/* Composite Executive Readiness Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-white p-5 md:p-6 shadow-[0_4px_24px_-4px_rgba(27,27,30,0.06)] border border-[#e1bfb4]/30">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#ffdbce]/40 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a33900]"></span>
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#8d7167] font-semibold">
                Executive Readiness
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-['Manrope'] text-5xl font-black text-[#1b1b1e] tracking-tight">
                78
              </span>
              <span className="font-['JetBrains_Mono'] text-sm text-[#8d7167]">/100</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#81f9bb]/30 text-[#006a44] font-['JetBrains_Mono'] text-xs font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +6%
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#594139]">vs last week</span>
            </div>
          </div>

          {/* Radial Dial Indicator */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="transparent"
                  stroke="#f0edf1"
                  strokeWidth="6"
                />
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="transparent"
                  stroke="#ca4b07"
                  strokeWidth="6"
                  strokeDasharray="188.4"
                  strokeDashoffset={188.4 - (188.4 * 78) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#8d7167] uppercase font-bold">
                  Tier 1
                </span>
                <span className="font-['Manrope'] text-xs font-bold text-[#a33900]">
                  Ready
                </span>
              </div>
            </div>

            <div className="hidden sm:block text-xs font-['Plus_Jakarta_Sans'] text-[#594139] max-w-[200px]">
              High probability of clearing Senior and Staff level interview panels.
            </div>
          </div>
        </div>
      </section>

      {/* Session Launchpad Split Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#8d7167] font-semibold">
            Session Launchpad
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#a33900] font-medium">
            Neural Engine 2.4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Live Session Card */}
          <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e1bfb4]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#ffdbce] text-[#a33900] flex items-center justify-center shadow-xs">
                  <Video className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-['JetBrains_Mono'] text-[11px] font-bold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
                  LIVE
                </span>
              </div>
              <div>
                <h3 className="font-['Manrope'] text-lg font-bold text-[#1b1b1e]">
                  Start Live Session
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#594139] mt-1 leading-relaxed">
                  Streams frames and audio over a WebSocket and scores them as you speak. Meters move while you talk.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded-full bg-[#f0edf1] text-[#594139] font-['JetBrains_Mono'] text-[11px]">
                  camera + mic
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#f0edf1] text-[#594139] font-['JetBrains_Mono'] text-[11px]">
                  nothing stored
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#f0edf1] text-[#594139] font-['JetBrains_Mono'] text-[11px]">
                  Posture AI
                </span>
              </div>
            </div>

            <div className="pt-5 flex items-center justify-end">
              <button
                onClick={() => onSelectScreen('live')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#a33900] hover:bg-[#ca4b07] text-white font-['Plus_Jakarta_Sans'] text-sm font-semibold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Upload Recording Card */}
          <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e1bfb4]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#dae2ff] text-[#0054cb] flex items-center justify-center shadow-xs">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#006a44] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a44]"></span>
                  Celery Queue Idle
                </span>
              </div>
              <div>
                <h3 className="font-['Manrope'] text-lg font-bold text-[#1b1b1e]">
                  Upload a video
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#594139] mt-1 leading-relaxed">
                  Runs the full pipeline in the background and holds the report at a permanent link. Best for a mock interview you've already recorded.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded-full bg-[#f0edf1] text-[#594139] font-['JetBrains_Mono'] text-[11px]">
                  mp4 • mov • webm
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#f0edf1] text-[#594139] font-['JetBrains_Mono'] text-[11px]">
                  one file at a time
                </span>
              </div>
            </div>

            <div className="pt-5 flex items-center justify-end">
              <button
                onClick={() => onSelectScreen('upload')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] text-[#1b1b1e] font-['Plus_Jakarta_Sans'] text-sm font-semibold active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Choose a file</span>
                <FolderOpen className="w-4 h-4 text-[#8d7167]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Multimodal Signals Telemetry Grid (4 Core Signals) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Manrope'] text-lg font-bold text-[#1b1b1e]">
              Multimodal Signals
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#594139]">
              Algorithmic breakdown across 4 primary layers
            </p>
          </div>
          <button 
            onClick={() => onSelectScreen('report')}
            className="font-['JetBrains_Mono'] text-xs text-[#a33900] uppercase font-bold flex items-center gap-0.5 hover:underline"
          >
            Metrics <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Signal 1: Body Posture */}
          <div className="rounded-xl bg-white p-4 shadow-xs border border-[#e1bfb4]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-full bg-[#dae2ff] flex items-center justify-center text-[#0054cb]">
                <Accessibility className="w-4 h-4" />
              </div>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#0054cb]">
                74%
              </span>
            </div>
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#0054cb] uppercase font-bold">
                Body Posture
              </span>
              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#1b1b1e] mt-0.5">
                Steady Alignment
              </p>
              <p className="font-['JetBrains_Mono'] text-[10px] text-[#8d7167] mt-0.5 truncate">
                Head offset within 4°
              </p>
            </div>
            <div className="w-full bg-[#f0edf1] rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="bg-[#0054cb] h-1.5 rounded-full" style={{ width: '74%' }}></div>
            </div>
          </div>

          {/* Signal 2: Facial Emotion */}
          <div className="rounded-xl bg-white p-4 shadow-xs border border-[#e1bfb4]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-full bg-[#ffdbce] flex items-center justify-center text-[#ca4b07]">
                <Smile className="w-4 h-4" />
              </div>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#ca4b07]">
                86%
              </span>
            </div>
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#ca4b07] uppercase font-bold">
                Facial Emotion
              </span>
              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#1b1b1e] mt-0.5">
                Positive Valence
              </p>
              <p className="font-['JetBrains_Mono'] text-[10px] text-[#8d7167] mt-0.5 truncate">
                Confident micro-cues
              </p>
            </div>
            <div className="w-full bg-[#f0edf1] rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="bg-[#ca4b07] h-1.5 rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>

          {/* Signal 3: Vocal Cadence */}
          <div className="rounded-xl bg-white p-4 shadow-xs border border-[#e1bfb4]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-full bg-[#81f9bb]/30 flex items-center justify-center text-[#006a44]">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#006a44]">
                82%
              </span>
            </div>
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#006a44] uppercase font-bold">
                Vocal Cadence
              </span>
              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#1b1b1e] mt-0.5">
                142 WPM Pacing
              </p>
              <p className="font-['JetBrains_Mono'] text-[10px] text-[#8d7167] mt-0.5 truncate">
                Controlled pitch resets
              </p>
            </div>
            <div className="w-full bg-[#f0edf1] rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="bg-[#006a44] h-1.5 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>

          {/* Signal 4: NLP & Lexicon */}
          <div className="rounded-xl bg-white p-4 shadow-xs border border-[#e1bfb4]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-full bg-[#fef08a]/40 flex items-center justify-center text-[#ca8a04]">
                <Brain className="w-4 h-4" />
              </div>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#ca8a04]">
                69%
              </span>
            </div>
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#ca8a04] uppercase font-bold">
                NLP & Lexicon
              </span>
              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#1b1b1e] mt-0.5">
                Low Fillers (1.2%)
              </p>
              <p className="font-['JetBrains_Mono'] text-[10px] text-[#8d7167] mt-0.5 truncate">
                Hinglish parser active
              </p>
            </div>
            <div className="w-full bg-[#f0edf1] rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="bg-[#ca8a04] h-1.5 rounded-full" style={{ width: '69%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Sessions Table & Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Manrope'] text-lg font-bold text-[#1b1b1e]">
              Recent Sessions
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#594139]">
              Audited telemetry reports & active background jobs
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#f0edf1] font-['JetBrains_Mono'] text-xs text-[#594139]">
            {sessions.length} sessions
          </span>
        </div>

        {/* Sessions Desktop Table & Mobile Cards */}
        <div className="rounded-2xl bg-white shadow-xs border border-[#e1bfb4]/30 overflow-hidden divide-y divide-[#f0edf1]">
          {sessions.map((sess) => {
            const isCelery = sess.mode === 'Celery Processing';
            return (
              <div 
                key={sess.id} 
                className="p-4 md:p-5 hover:bg-[#fbf8fc] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-['JetBrains_Mono'] text-[10px] font-semibold ${
                      sess.mode === 'Live Mock' 
                        ? 'bg-[#ffdbce] text-[#7f2b00]' 
                        : isCelery 
                        ? 'bg-[#81f9bb]/30 text-[#006a44]' 
                        : 'bg-[#dae2ff] text-[#0040a0]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isCelery ? 'bg-[#006a44] animate-pulse' : 'bg-current'}`}></span>
                      {sess.mode}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">
                      {sess.timeAgo}
                    </span>
                    <span className="hidden md:inline font-['JetBrains_Mono'] text-xs text-[#8d7167]">
                      • ID #{sess.id}
                    </span>
                  </div>

                  <h3 className="font-['Manrope'] font-bold text-base text-[#1b1b1e] truncate">
                    {sess.title}
                  </h3>

                  {isCelery ? (
                    <div className="space-y-2 pt-1 max-w-md">
                      <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#594139]">
                        {sess.summary}
                      </p>
                      <div className="w-full bg-[#f0edf1] rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-[#ca4b07] h-1.5 rounded-full transition-all duration-500" 
                          style={{ width: `${celeryProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[10px] text-[#8d7167]">
                        <span className="flex items-center gap-1 text-[#006a44]">
                          <RotateCw className="w-3 h-3 animate-spin" />
                          Parsing Lexicon & Face Meshes ({celeryProgress}%)
                        </span>
                        <span>ETA ~35s</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      {sess.tags?.map((t, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 rounded bg-[#f0edf1] text-[#594139] font-['JetBrains_Mono'] text-[10px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Score & Action Button */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 shrink-0">
                  {sess.score !== undefined ? (
                    <div className="flex flex-col items-start sm:items-end">
                      <div className="flex items-baseline gap-0.5">
                        <span className="font-['Manrope'] text-2xl font-black text-[#1b1b1e]">
                          {sess.score}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#8d7167]">
                          /100
                        </span>
                      </div>
                      <span className={`font-['JetBrains_Mono'] text-[10px] font-bold uppercase ${
                        sess.status === 'Ready' || sess.status === 'complete' 
                          ? 'text-[#006a44]' 
                          : 'text-[#ca4b07]'
                      }`}>
                        {sess.status}
                      </span>
                    </div>
                  ) : isCelery ? (
                    <div className="flex items-center gap-2">
                      <div className="relative w-9 h-9 flex items-center justify-center">
                        <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f0edf1" strokeWidth="3" />
                          <circle
                            cx="18"
                            cy="18"
                            r="14"
                            fill="transparent"
                            stroke="#ca4b07"
                            strokeWidth="3"
                            strokeDasharray="87.96"
                            strokeDashoffset={87.96 - (87.96 * celeryProgress) / 100}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute font-['JetBrains_Mono'] text-[9px] font-bold text-[#1b1b1e]">
                          {celeryProgress}%
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {isCelery ? (
                    <button
                      onClick={() => onOpenSessionProgress(sess.id)}
                      className="px-4 py-2 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] text-[#1b1b1e] font-['Plus_Jakarta_Sans'] text-xs font-semibold active:scale-95 transition-all flex items-center gap-1"
                    >
                      <span>View progress</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenSessionReport(sess.id)}
                      className="px-4 py-2 rounded-full bg-[#a33900] hover:bg-[#ca4b07] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1"
                    >
                      <span>Full Audit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pro Tip Card */}
      <section className="p-4 md:p-5 rounded-2xl bg-[#f6f2f7] border border-[#e1bfb4]/30 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#ffdbce] text-[#a33900] flex items-center justify-center shrink-0 shadow-xs">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
            Pro tip for today's mock
          </h4>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#594139] leading-relaxed">
            Slowing vocal cadence by 10 WPM during behavioral anecdotes increases listener perceived authority by 22%. Maintain deliberate pauses after articulating technical trade-offs.
          </p>
        </div>
      </section>
    </div>
  );
};
