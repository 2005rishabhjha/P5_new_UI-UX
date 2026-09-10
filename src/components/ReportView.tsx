import React, { useState } from 'react';
import { ScreenType } from '../types';
import { KEY_MOMENTS } from '../mockData';
import { 
  FileDown, 
  Share2, 
  TrendingUp, 
  CheckCircle2, 
  Accessibility, 
  Smile, 
  Activity, 
  Brain, 
  PlayCircle, 
  PauseCircle, 
  Volume2, 
  Dumbbell, 
  Code2, 
  AlertTriangle,
  Info,
  Check
} from 'lucide-react';

interface ReportViewProps {
  onSelectScreen: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  onSelectScreen,
  onShowToast,
}) => {
  const [activeMomentId, setActiveMomentId] = useState<string | null>('moment-0842');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleExportPDF = () => {
    onShowToast('Preparing high-resolution Executive PDF report...');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Secure share link copied to clipboard!');
  };

  const handleDownloadJSON = () => {
    const reportData = {
      sessionId: 'P5-8842A',
      title: 'Senior Product Strategy Mock',
      timestamp: new Date().toISOString(),
      overallReadiness: 82,
      cohortPercentile: 'Top 8%',
      signals: {
        bodyLanguage: { score: 78, posture: 88, shoulder: 91, eyeDirect: 74 },
        facialEmotion: { score: 90, confident: 68, neutral: 24, serious: 8 },
        vocalDelivery: { score: 84, paceWpm: 145, pitch: 'Dynamic', avgPauseSec: 1.8 },
        wordUsage: { score: 76, vocabularyRichness: 82, totalFillers: 8, fillersPerMin: 1.1 },
      },
      keyMoments: KEY_MOMENTS,
      verdict: 'High likelihood of clearing Senior Bar. Exceptional vocal resonance and posture alignment.',
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'p5_telemetry_report_P5-8842A.json';
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Telemetry JSON dataset downloaded');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Header & Meta Actions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a33900] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-xs text-[#a33900] uppercase font-bold tracking-wider">
              Executive Intelligence Breakdown
            </span>
          </div>
          <span className="px-3 py-0.5 rounded-full bg-[#81f9bb]/30 text-[#006a44] font-['JetBrains_Mono'] text-xs font-bold">
            Complete
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Manrope'] text-2xl md:text-4xl font-black text-[#1b1b1e] tracking-tight">
              Senior Product Strategy Mock
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#594139] font-['JetBrains_Mono'] text-xs mt-1.5">
              <span>Sep 09, 2026</span>
              <span>•</span>
              <span>24 min session</span>
              <span>•</span>
              <span className="text-[#0054cb] font-semibold">ID #P5-8842A</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              className="flex-1 sm:flex-initial h-10 px-4 rounded-full bg-white hover:bg-[#f0edf1] border border-[#e1bfb4]/40 text-[#1b1b1e] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <FileDown className="w-4 h-4 text-[#a33900]" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handleShareLink}
              className="flex-1 sm:flex-initial h-10 px-4 rounded-full bg-white hover:bg-[#f0edf1] border border-[#e1bfb4]/40 text-[#1b1b1e] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <Share2 className="w-4 h-4 text-[#0054cb]" />
              <span>Share Link</span>
            </button>
          </div>
        </div>
      </section>

      {/* Overall Composite Score Hero Card */}
      <section className="relative overflow-hidden rounded-2xl bg-white p-5 md:p-6 shadow-[0_4px_24px_-4px_rgba(27,27,30,0.06)] border border-[#e1bfb4]/30 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-['Manrope'] text-lg font-bold text-[#1b1b1e]">
            Overall Readiness
          </h2>
          <span className="px-3 py-1 rounded-full bg-[#dae2ff] text-[#0040a0] font-['JetBrains_Mono'] text-xs font-bold">
            Top 8% Cohort
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Radial Readiness Gauge */}
          <div className="relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#f0edf1"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#ca4b07"
                strokeWidth="10"
                strokeDasharray="314.15"
                strokeDashoffset={314.15 - (314.15 * 82) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <div className="flex items-baseline">
                <span className="font-['Manrope'] text-3xl font-black text-[#1b1b1e]">82</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">/100</span>
              </div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#a33900] font-bold uppercase -mt-0.5">
                Readiness
              </span>
            </div>
          </div>

          {/* Metrics summary */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-[#006a44] font-['Plus_Jakarta_Sans'] text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>+8 pts</span>
              <span className="text-[#594139] font-normal text-xs">vs personal baseline</span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#1b1b1e] leading-relaxed">
              Exceptional posture and vocal confidence. High likelihood of clearing Senior Bar. Demonstrates natural cadence and structured reasoning under counter-factual questioning.
            </p>
            <div className="flex items-center gap-2 pt-1 font-['JetBrains_Mono'] text-xs text-[#594139]">
              <span className="w-2 h-2 rounded-full bg-[#006a44]"></span>
              <span>Calm state: 91% of session duration</span>
            </div>
          </div>
        </div>

        {/* Key Takeaways Box */}
        <div className="p-4 rounded-xl bg-[#f6f2f7] border border-[#e1bfb4]/20 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#a33900] shrink-0 mt-0.5" />
          <div className="space-y-1 font-['Plus_Jakarta_Sans'] text-xs">
            <span className="font-bold text-[#a33900] block text-sm">Key Takeaways</span>
            <p className="text-[#1b1b1e] leading-relaxed">
              <strong className="font-semibold">Strongest Signal:</strong> Facial Emotion & Engagement (90/100). Natural warmth and constant engagement.<br />
              <strong className="font-semibold">Top Opportunity:</strong> Trim filler tokens ("like, honestly, you know") during complex architectural pivots.
            </p>
          </div>
        </div>
      </section>

      {/* Multimodal Telemetry (4 Core Dimensions) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-['Manrope'] text-lg font-bold text-[#1b1b1e]">
            Multimodal Telemetry
          </h2>
          <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">4 Signals</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Body Language */}
          <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e1bfb4]/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#dae2ff] text-[#0054cb] flex items-center justify-center">
                  <Accessibility className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
                    Body Language
                  </h3>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#594139]">
                    Posture & Kinematics
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-1 font-['JetBrains_Mono']">
                <span className="font-bold text-lg text-[#0054cb]">78</span>
                <span className="text-xs text-[#8d7167]">/100</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 font-['JetBrains_Mono'] text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#594139]">
                  <span>Posture</span>
                  <span className="font-bold text-[#1b1b1e]">88%</span>
                </div>
                <div className="w-full h-1.5 bg-[#f0edf1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0054cb] rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#594139]">
                  <span>Shoulder</span>
                  <span className="font-bold text-[#1b1b1e]">91%</span>
                </div>
                <div className="w-full h-1.5 bg-[#f0edf1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0054cb] rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#594139]">
                  <span>Eye Direct</span>
                  <span className="font-bold text-[#1b1b1e]">74%</span>
                </div>
                <div className="w-full h-1.5 bg-[#f0edf1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0054cb] rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f6f2f7] flex items-start gap-2 text-xs font-['Plus_Jakarta_Sans'] text-[#594139]">
              <Info className="w-4 h-4 text-[#0054cb] shrink-0 mt-0.5" />
              <span>Observation: Slight asymmetric head tilt observed during deep architectural questioning (min 11–13).</span>
            </div>
          </div>

          {/* 2. Facial Emotion */}
          <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e1bfb4]/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#ffdbce] text-[#ca4b07] flex items-center justify-center">
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
                    Facial Emotion
                  </h3>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#594139]">
                    Micro-Expressions & Warmth
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-1 font-['JetBrains_Mono']">
                <span className="font-bold text-lg text-[#ca4b07]">90</span>
                <span className="text-xs text-[#8d7167]">/100</span>
              </div>
            </div>

            <div className="space-y-2 pt-1 font-['JetBrains_Mono'] text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#ca4b07] font-bold">68% Confident</span>
                <span className="text-[#594139]">24% Neutral</span>
                <span className="text-[#8d7167] font-semibold">8% Serious</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#f0edf1]">
                <div className="h-full bg-[#ca4b07]" style={{ width: '68%' }}></div>
                <div className="h-full bg-[#ffb599]" style={{ width: '24%' }}></div>
                <div className="h-full bg-[#dcd9dd]" style={{ width: '8%' }}></div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f6f2f7] flex items-start gap-2 text-xs font-['Plus_Jakarta_Sans'] text-[#594139]">
              <Check className="w-4 h-4 text-[#ca4b07] shrink-0 mt-0.5" />
              <span>Observation: Natural warmth, genuine smile responsiveness, and consistent eye contact throughout greeting phase.</span>
            </div>
          </div>

          {/* 3. Vocal Delivery */}
          <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e1bfb4]/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#81f9bb]/30 text-[#006a44] flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
                    Vocal Delivery
                  </h3>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#594139]">
                    Acoustics & Cadence
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-1 font-['JetBrains_Mono']">
                <span className="font-bold text-lg text-[#006a44]">84</span>
                <span className="text-xs text-[#8d7167]">/100</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1 font-['JetBrains_Mono'] text-xs">
              <div className="p-2.5 rounded-xl bg-[#f6f2f7]">
                <span className="text-[#8d7167] text-[10px] uppercase block">Pace</span>
                <span className="font-bold text-sm text-[#1b1b1e] mt-0.5 block">145 wpm</span>
                <span className="text-[#006a44] text-[10px]">Ideal Band</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#f6f2f7]">
                <span className="text-[#8d7167] text-[10px] uppercase block">Pitch</span>
                <span className="font-bold text-sm text-[#1b1b1e] mt-0.5 block">Dynamic</span>
                <span className="text-[#006a44] text-[10px]">Engaged tone</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#f6f2f7]">
                <span className="text-[#8d7167] text-[10px] uppercase block">Avg Pause</span>
                <span className="font-bold text-sm text-[#1b1b1e] mt-0.5 block">1.8s</span>
                <span className="text-[#594139] text-[10px]">Deliberate</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f6f2f7] flex items-start gap-2 text-xs font-['Plus_Jakarta_Sans'] text-[#594139]">
              <CheckCircle2 className="w-4 h-4 text-[#006a44] shrink-0 mt-0.5" />
              <span>Observation: Excellent vocal projection and clarity. Zero trailing whispers at question completion.</span>
            </div>
          </div>

          {/* 4. Word Usage & NLP */}
          <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e1bfb4]/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#fef08a]/40 text-[#ca8a04] flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
                    Word Usage & NLP
                  </h3>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#594139]">
                    Lexical Rigor & Fluency
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-1 font-['JetBrains_Mono']">
                <span className="font-bold text-lg text-[#ca8a04]">76</span>
                <span className="text-xs text-[#8d7167]">/100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 font-['JetBrains_Mono'] text-xs">
              <div className="p-3 rounded-xl bg-[#f6f2f7] flex items-center justify-between">
                <div>
                  <span className="text-[#8d7167] text-[10px] block">Vocabulary Richness</span>
                  <span className="font-bold text-sm text-[#1b1b1e] mt-0.5 block">82%</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#006a44]" />
              </div>
              <div className="p-3 rounded-xl bg-[#f6f2f7] flex items-center justify-between">
                <div>
                  <span className="text-[#8d7167] text-[10px] block">Total Fillers</span>
                  <span className="font-bold text-sm text-[#ca4b07] mt-0.5 block">8 total (1.1/m)</span>
                </div>
                <AlertTriangle className="w-4 h-4 text-[#ca4b07]" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f6f2f7] flex items-start gap-2 text-xs font-['Plus_Jakarta_Sans'] text-[#594139]">
              <Info className="w-4 h-4 text-[#ca8a04] shrink-0 mt-0.5" />
              <span>Observation: Hinglish code-switching fluency scored <strong className="text-[#1b1b1e]">Seamless</strong>. Technical jargon mapped cleanly to interviewer prompts.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline & Key Moments to Replay */}
      <section className="rounded-2xl bg-white p-5 md:p-6 shadow-xs border border-[#e1bfb4]/30 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-['Manrope'] text-lg font-bold text-[#1b1b1e]">
            Timeline & Key Moments
          </h2>
          <span 
            onClick={() => onShowToast('Scrubber synched to session timeline (24:00 total)')}
            className="font-['JetBrains_Mono'] text-xs text-[#a33900] font-bold cursor-pointer hover:underline"
          >
            Full Replay
          </span>
        </div>

        {/* Visual Interactive Scrubber Bar */}
        <div className="space-y-2">
          <div className="relative w-full h-9 bg-[#f0edf1] rounded-xl overflow-hidden flex items-center px-4">
            {/* Audio Wave Visual Bars */}
            <div className="absolute inset-0 opacity-25 flex items-center justify-between px-2 pointer-events-none">
              <span className="w-1 h-3 bg-[#0054cb] rounded-full"></span>
              <span className="w-1 h-5 bg-[#006a44] rounded-full"></span>
              <span className="w-1 h-2 bg-[#0054cb] rounded-full"></span>
              <span className="w-1 h-7 bg-[#ca4b07] rounded-full"></span>
              <span className="w-1 h-4 bg-[#006a44] rounded-full"></span>
              <span className="w-1 h-6 bg-[#0054cb] rounded-full"></span>
              <span className="w-1 h-3 bg-[#0054cb] rounded-full"></span>
              <span className="w-1 h-5 bg-[#ca4b07] rounded-full"></span>
              <span className="w-1 h-2 bg-[#006a44] rounded-full"></span>
            </div>

            {/* Marker 1: Peak Highlight (08:42) */}
            <button
              type="button"
              onClick={() => {
                setActiveMomentId('moment-0842');
                onShowToast('Navigated to Peak Delivery at 08:42');
              }}
              className="absolute left-[36%] -translate-x-1/2 flex flex-col items-center group focus:outline-none"
            >
              <span className={`w-3.5 h-3.5 rounded-full shadow-sm ring-2 ring-white transition-transform ${
                activeMomentId === 'moment-0842' ? 'bg-[#006a44] scale-125' : 'bg-[#006a44]/80 group-hover:scale-110'
              }`}></span>
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#006a44] font-bold mt-0.5">
                08:42
              </span>
            </button>

            {/* Marker 2: Watchout (16:15) */}
            <button
              type="button"
              onClick={() => {
                setActiveMomentId('moment-1615');
                onShowToast('Navigated to Watchout Moment at 16:15');
              }}
              className="absolute left-[68%] -translate-x-1/2 flex flex-col items-center group focus:outline-none"
            >
              <span className={`w-3.5 h-3.5 rounded-full shadow-sm ring-2 ring-white transition-transform ${
                activeMomentId === 'moment-1615' ? 'bg-[#ca4b07] scale-125' : 'bg-[#ca4b07]/80 group-hover:scale-110'
              }`}></span>
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#ca4b07] font-bold mt-0.5">
                16:15
              </span>
            </button>
          </div>

          <div className="flex justify-between font-['JetBrains_Mono'] text-[10px] text-[#8d7167] px-1">
            <span>00:00</span>
            <span>12:00</span>
            <span>24:00 min</span>
          </div>
        </div>

        {/* Replay Moment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {/* Moment 1 */}
          <div
            onClick={() => {
              setActiveMomentId('moment-0842');
              onShowToast('Playing moment: 08:42 System Architecture');
            }}
            className={`p-4 rounded-xl transition-all cursor-pointer flex items-start gap-3 border ${
              activeMomentId === 'moment-0842'
                ? 'bg-[#f6f2f7] border-[#006a44] shadow-xs scale-[1.01]'
                : 'bg-white border-[#f0edf1] hover:bg-[#fbf8fc]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#81f9bb]/30 text-[#006a44] flex items-center justify-center shrink-0">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#006a44]">
                  08:42 • Peak Delivery
                </span>
                <span className="px-2 py-0.5 rounded bg-[#f0edf1] text-[#1b1b1e] font-['JetBrains_Mono'] text-xs font-semibold">
                  94 Score
                </span>
              </div>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e] truncate">
                System Architecture & Scale answer
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#594139] leading-relaxed">
                Perfect voice pacing (142 wpm), confident hand gestures, and zero filler pauses during high technical nuance.
              </p>
            </div>
          </div>

          {/* Moment 2 */}
          <div
            onClick={() => {
              setActiveMomentId('moment-1615');
              onShowToast('Playing moment: 16:15 Conflict Resolution');
            }}
            className={`p-4 rounded-xl transition-all cursor-pointer flex items-start gap-3 border ${
              activeMomentId === 'moment-1615'
                ? 'bg-[#f6f2f7] border-[#ca4b07] shadow-xs scale-[1.01]'
                : 'bg-white border-[#f0edf1] hover:bg-[#fbf8fc]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
              <PauseCircle className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#ca4b07]">
                  16:15 • Watchout
                </span>
                <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-['JetBrains_Mono'] text-xs font-semibold">
                  71 Score
                </span>
              </div>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e] truncate">
                Conflict Resolution situational question
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#594139] leading-relaxed">
                Spike in repetitive fillers ("like, honestly, you know") and eye tracking deviated upwards for 4.2 seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Annotated Transcript Viewer */}
      <section className="rounded-2xl bg-white p-5 md:p-6 shadow-xs border border-[#e1bfb4]/30 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-['Manrope'] text-lg font-bold text-[#1b1b1e]">
            Annotated Transcript
          </h2>
          <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">
            Timestamp Synchronized
          </span>
        </div>

        {/* Transcript Bubble */}
        <div className="p-4 md:p-5 rounded-2xl bg-[#f6f2f7] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a33900]"></span>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
                Candidate
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">
                16:12 - 16:34
              </span>
            </div>
            <button
              onClick={() => {
                setIsPlayingAudio(!isPlayingAudio);
                onShowToast(isPlayingAudio ? 'Paused audio playback' : 'Playing vocal snippet [16:12 - 16:34]');
              }}
              className="text-[#a33900] hover:text-[#ca4b07] transition-colors p-1"
            >
              <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce text-[#006a44]' : ''}`} />
            </button>
          </div>

          <p className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed text-[#1b1b1e]">
            "When the engineering lead resisted the timeline, I{' '}
            <span
              className="px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-['JetBrains_Mono'] text-xs font-semibold cursor-help"
              title="Vocal hesitation: 1.2s delay"
            >
              [like... um]
            </span>{' '}
            stepped back to review their telemetry.{' '}
            <span
              className="px-2 py-0.5 rounded bg-[#dae2ff] text-[#0040a0] font-medium cursor-help"
              title="Body Language: Open palms gesture detected"
            >
              We aligned on trade-offs
            </span>
            , and honestly,{' '}
            <span
              className="px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-['JetBrains_Mono'] text-xs font-semibold cursor-help"
              title="Repetitive filler token detected"
            >
              [you know]
            </span>
            , it became our best sprint."
          </p>

          {/* Legend Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#e1bfb4]/20">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-['JetBrains_Mono'] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span> Filler Detected
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dae2ff] text-[#0040a0] font-['JetBrains_Mono'] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0054cb]"></span> Open Gesture
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#81f9bb]/30 text-[#006a44] font-['JetBrains_Mono'] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a44]"></span> Confident Pitch
            </span>
          </div>
        </div>
      </section>

      {/* Primary Interactive CTAs */}
      <section className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          onClick={() => {
            onShowToast('Launching Live Session focused on behavioral filler reduction drill');
            onSelectScreen('live');
          }}
          className="w-full sm:flex-1 h-12 rounded-full bg-[#a33900] hover:bg-[#ca4b07] text-white font-['Plus_Jakarta_Sans'] text-sm font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Dumbbell className="w-4 h-4" />
          <span>Practice Weak Areas in Live Session</span>
        </button>

        <button
          onClick={handleDownloadJSON}
          className="w-full sm:flex-1 h-12 rounded-full bg-white hover:bg-[#f0edf1] text-[#1b1b1e] border border-[#e1bfb4]/40 font-['Plus_Jakarta_Sans'] text-sm font-semibold active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <Code2 className="w-4 h-4 text-[#8d7167]" />
          <span>Download Raw JSON Telemetry</span>
        </button>
      </section>
    </div>
  );
};
