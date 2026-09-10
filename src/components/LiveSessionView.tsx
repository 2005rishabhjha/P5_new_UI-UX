import React, { useState, useEffect, useRef } from 'react';
import { ScreenType } from '../types';
import { ASSETS } from '../mockData';
import { 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  Eye, 
  CheckCircle2, 
  Lightbulb, 
  X, 
  Activity, 
  Zap, 
  Camera, 
  Sparkles,
  Volume2,
  Smile,
  Accessibility,
  Brain,
  Timer
} from 'lucide-react';

interface LiveSessionViewProps {
  onSelectScreen: (screen: ScreenType) => void;
  onEndSession: () => void;
  onShowToast: (msg: string) => void;
}

export const LiveSessionView: React.FC<LiveSessionViewProps> = ({
  onSelectScreen,
  onEndSession,
  onShowToast,
}) => {
  const [seconds, setSeconds] = useState(14 * 60 + 28);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [useRealWebcam, setUseRealWebcam] = useState(false);
  const [hasWebcamAccess, setHasWebcamAccess] = useState(false);
  const [showCoachCue, setShowCoachCue] = useState(true);
  const [isEnding, setIsEnding] = useState(false);

  // Dynamic telemetry fluctuations
  const [confidenceScore, setConfidenceScore] = useState(79);
  const [eyeContactPct, setEyeContactPct] = useState(92);
  const [headTilt, setHeadTilt] = useState(0.04);
  const [shoulderBal, setShoulderBal] = useState(0.09);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Live session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Subtle live fluctuations for high-fidelity feeling
  useEffect(() => {
    const flucTimer = setInterval(() => {
      setEyeContactPct((prev) => Math.min(96, Math.max(88, prev + (Math.random() > 0.5 ? 1 : -1))));
      setHeadTilt((prev) => Number((0.04 + (Math.random() * 0.02 - 0.01)).toFixed(2)));
    }, 2500);
    return () => clearInterval(flucTimer);
  }, []);

  // Handle real webcam start/stop
  const toggleWebcam = async () => {
    if (useRealWebcam) {
      // Stop real webcam
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setUseRealWebcam(false);
      setHasWebcamAccess(false);
      onShowToast('Switched to simulated candidate studio stream');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setUseRealWebcam(true);
        setHasWebcamAccess(true);
        onShowToast('Connected to your live camera & microphone');
      } catch (err) {
        console.warn('Webcam permission not granted or unavailable:', err);
        onShowToast('Camera access denied or unavailable; staying on candidate test feed');
        setUseRealWebcam(false);
      }
    }
  };

  // Clean up media streams on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleEndSessionClick = () => {
    setIsEnding(true);
    onShowToast('Synthesizing multimodal features & writing executive report...');
    setTimeout(() => {
      setIsEnding(false);
      onEndSession();
    }, 1200);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-4 space-y-6 animate-in fade-in duration-300">
      {/* Telemetry Network Sub-Bar */}
      <section className="px-4 py-2.5 rounded-xl bg-white border border-[#e1bfb4]/30 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ba1a1a]"></span>
          </span>
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#1b1b1e] tracking-wider uppercase">
            ON AIR
          </span>
          <span className="text-[#8d7167]">•</span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#594139] truncate hidden sm:inline">
            ws://localhost:8000/ws/interview/11ede0ee/live/
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#594139] truncate sm:hidden">
            ws://.../live
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-2.5 py-1 rounded-full bg-[#f0edf1] text-[#1b1b1e] flex items-center gap-1.5 font-['JetBrains_Mono'] text-xs">
            <Timer className="w-3.5 h-3.5 text-[#a33900]" />
            <span className="font-bold">{formatTimer(seconds)}</span>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-[#81f9bb]/30 text-[#006a44] flex items-center gap-1 font-['JetBrains_Mono'] text-xs font-semibold">
            <Zap className="w-3 h-3" />
            <span>28ms</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Video Viewfinder on Left, Live Telemetry on Right (on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Viewfinder & Quick Controls (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Viewfinder Card */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-[#303033] shadow-lg border border-[#303033]">
            {/* Camera Viewport */}
            <div className="relative w-full aspect-[4/3] bg-[#1b1b1e] overflow-hidden flex items-center justify-center">
              {isCamOff ? (
                <div className="flex flex-col items-center justify-center text-white/60 space-y-2">
                  <VideoOff className="w-12 h-12" />
                  <span className="font-['Plus_Jakarta_Sans'] text-sm">Camera Feed Paused</span>
                </div>
              ) : useRealWebcam && hasWebcamAccess ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              ) : (
                <img
                  src={ASSETS.candidate}
                  alt="Candidate Video Feed"
                  className="w-full h-full object-cover opacity-95 filter contrast-105"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>

              {/* Computer Vision Landmark Mesh Overlay */}
              {!isCamOff && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="none"
                >
                  {/* Bounding box with dashed stroke */}
                  <rect
                    x="110"
                    y="45"
                    width="180"
                    height="210"
                    fill="none"
                    stroke="#ffdbce"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                  />
                  {/* Corner brackets */}
                  <path d="M 100 65 L 100 35 L 130 35" fill="none" stroke="#ca4b07" strokeWidth="2.5" />
                  <path d="M 270 35 L 300 35 L 300 65" fill="none" stroke="#ca4b07" strokeWidth="2.5" />
                  <path d="M 100 225 L 100 255 L 130 255" fill="none" stroke="#ca4b07" strokeWidth="2.5" />
                  <path d="M 270 255 L 300 255 L 300 225" fill="none" stroke="#ca4b07" strokeWidth="2.5" />
                  {/* Pose Axis Trackers */}
                  <circle cx="200" cy="110" r="3" fill="#64dca1" />
                  <line x1="180" y1="110" x2="220" y2="110" stroke="#64dca1" strokeWidth="1" />
                  <line x1="200" y1="90" x2="200" y2="130" stroke="#64dca1" strokeWidth="1" />
                  {/* Gaze tracking points */}
                  <circle cx="175" cy="105" r="2.5" fill="#64dca1" />
                  <circle cx="225" cy="105" r="2.5" fill="#64dca1" />
                </svg>
              )}

              {/* Top Viewfinder Floating Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-['JetBrains_Mono'] text-[11px] shadow-sm">
                  <Eye className="w-3.5 h-3.5 text-[#64dca1]" />
                  <span>
                    Eye Contact: <strong className="text-[#64dca1]">{eyeContactPct}% Focus</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-['JetBrains_Mono'] text-[11px] shadow-sm">
                  <span className={`w-2 h-2 rounded-full ${isMuted ? 'bg-[#ba1a1a]' : 'bg-[#64dca1] animate-pulse'}`}></span>
                  <span>Audio: <strong className={isMuted ? 'text-[#ffb599]' : 'text-[#64dca1]'}>{isMuted ? 'Muted' : 'Active'}</strong></span>
                </div>
              </div>

              {/* Bottom Left: Pose Metrics HUD */}
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl text-white font-['JetBrains_Mono'] text-[11px] space-y-0.5 pointer-events-none shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#ffb599]">Head Tilt:</span>
                  <span className="text-[#64dca1] font-semibold">{headTilt}° (Good)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#b1c5ff]">Shoulder Bal:</span>
                  <span className="text-white font-semibold">{shoulderBal} Balanced</span>
                </div>
              </div>

              {/* Bottom Right: CV Sync */}
              <div className="absolute bottom-3 right-3 bg-[#ca4b07]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg flex items-center gap-1 font-['JetBrains_Mono'] text-[10px] font-bold">
                <Zap className="w-3 h-3" />
                <span>CV Sync: 60 FPS</span>
              </div>
            </div>

            {/* Viewfinder Action Strip */}
            <div className="p-3 bg-[#eae7eb] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* Mute Mic */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMuted(!isMuted);
                    onShowToast(isMuted ? 'Microphone unmuted' : 'Microphone muted');
                  }}
                  aria-label="Toggle Microphone"
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-xs ${
                    isMuted
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : 'bg-white text-[#1b1b1e] hover:bg-[#f0edf1]'
                  }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* Hide Camera */}
                <button
                  type="button"
                  onClick={() => {
                    setIsCamOff(!isCamOff);
                    onShowToast(isCamOff ? 'Camera resumed' : 'Camera hidden');
                  }}
                  aria-label="Toggle Video Device"
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-xs ${
                    isCamOff
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : 'bg-white text-[#1b1b1e] hover:bg-[#f0edf1]'
                  }`}
                >
                  {isCamOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
                </button>

                {/* Switch Real Webcam / Test Stream */}
                <button
                  type="button"
                  onClick={toggleWebcam}
                  title="Switch between your physical camera and sample test feed"
                  className="px-3 h-11 rounded-full bg-white hover:bg-[#f0edf1] text-[#594139] text-xs font-['Plus_Jakarta_Sans'] font-semibold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Camera className="w-4 h-4 text-[#ca4b07]" />
                  <span className="hidden sm:inline">{useRealWebcam ? 'Use Mock Feed' : 'Use My Webcam'}</span>
                </button>
              </div>

              {/* End & Report */}
              <button
                type="button"
                onClick={handleEndSessionClick}
                disabled={isEnding}
                className="flex-1 max-w-[240px] h-11 rounded-full bg-[#a33900] hover:bg-[#ca4b07] text-white px-4 flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all font-['Plus_Jakarta_Sans'] text-sm font-semibold"
              >
                {isEnding ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>End & Report</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Rolling Live Transcription & Audio Stream Panel */}
          <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-[#e1bfb4]/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006a44] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006a44]"></span>
                </span>
                <h3 className="font-['Manrope'] font-bold text-sm text-[#1b1b1e]">
                  Live Transcription
                </h3>
              </div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#8d7167] uppercase tracking-wider">
                4s Rolling Window
              </span>
            </div>

            {/* Real-Time Audio Transcription Bubble */}
            <div className="p-4 rounded-xl bg-[#f6f2f7] text-[#1b1b1e] space-y-2">
              <p className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed">
                <span className="text-[#594139]">“...and so my approach to </span>
                <mark className="bg-[#ffdbce] text-[#7f2b00] px-1.5 py-0.5 rounded font-semibold">
                  scaling the distributed cache
                </mark>
                <span className="text-[#594139]">
                  {' '}was prioritizing partition tolerance over strict consistency under peak flash-sales...”
                </span>
              </p>

              {/* NLP Real-time sentiment tags */}
              <div className="flex items-center flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#81f9bb]/30 text-[#006a44] font-['JetBrains_Mono'] text-[11px] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Strong Technical Framing
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f0edf1] text-[#594139] font-['JetBrains_Mono'] text-[11px]">
                  96% Sentiment Positive
                </span>
              </div>
            </div>

            {/* Coach Cue Card */}
            {showCoachCue && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#ffdbce]/40 border border-[#ffdbce] text-[#7f2b00]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Lightbulb className="w-5 h-5 text-[#ca4b07] shrink-0" />
                  <div className="min-w-0">
                    <span className="font-['JetBrains_Mono'] text-[9px] text-[#a33900] uppercase font-bold block">
                      Coach Cue
                    </span>
                    <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs truncate">
                      Remember: Pause after key metrics & articulate trade-offs
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCoachCue(false)}
                  aria-label="Dismiss cue"
                  className="w-7 h-7 rounded-full bg-white/70 hover:bg-white text-[#594139] flex items-center justify-center shrink-0 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Active Interviewer Context Strip */}
          <div className="w-full bg-white rounded-xl p-3.5 border border-[#e1bfb4]/30 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#ffdbce]">
                <img
                  src={ASSETS.interviewer}
                  alt="Vikram Mehta"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e] truncate">
                  Vikram Mehta (Interviewer)
                </h4>
                <p className="font-['JetBrains_Mono'] text-[11px] text-[#594139] truncate">
                  VP Engineering • System Architecture Track
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f0edf1] text-[#1b1b1e] font-['JetBrains_Mono'] text-xs font-semibold shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#006a44]" />
              <span>Round 3</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Confidence Meter & 4-Signal Telemetry Hub (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real-Time Composite Confidence Meter */}
          <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-[#e1bfb4]/30 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#8d7167] uppercase tracking-wider font-semibold">
                  Multimodal Assessment
                </span>
                <h2 className="font-['Manrope'] text-lg font-bold text-[#1b1b1e]">
                  Live Confidence Meter
                </h2>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#81f9bb]/30 text-[#006a44] font-['JetBrains_Mono'] text-[11px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>High Confidence</span>
                </div>
              </div>

              {/* Radial Dial Visualizer */}
              <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#f0edf1]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#ca4b07]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${confidenceScore}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-['Manrope'] text-2xl leading-none text-[#1b1b1e] font-extrabold tracking-tight">
                    {confidenceScore}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[8px] text-[#8d7167] font-semibold">
                    OUT OF 100
                  </span>
                </div>
              </div>
            </div>

            {/* 4-Signal Equalizer Gauges */}
            <div className="space-y-3 pt-1">
              {/* 1. Body Language */}
              <div className="p-3 rounded-xl bg-[#f6f2f7] space-y-1.5">
                <div className="flex items-center justify-between text-[#1b1b1e]">
                  <div className="flex items-center gap-2">
                    <Accessibility className="w-4 h-4 text-[#0054cb]" />
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs">
                      Body Language
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-xs">
                    <span className="font-bold text-[#0054cb]">74</span>
                    <span className="text-[#8d7167]">/100</span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#e4e1e6] overflow-hidden">
                  <div className="h-full bg-[#0054cb] rounded-full" style={{ width: '74%' }}></div>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#594139] flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0054cb]"></span>
                  Upright posture maintained • Balanced shoulder carriage
                </p>
              </div>

              {/* 2. Facial Expression */}
              <div className="p-3 rounded-xl bg-[#f6f2f7] space-y-1.5">
                <div className="flex items-center justify-between text-[#1b1b1e]">
                  <div className="flex items-center gap-2">
                    <Smile className="w-4 h-4 text-[#ca4b07]" />
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs">
                      Facial Expression
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-xs">
                    <span className="font-bold text-[#ca4b07]">88</span>
                    <span className="text-[#8d7167]">/100</span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#e4e1e6] overflow-hidden">
                  <div className="h-full bg-[#ca4b07] rounded-full" style={{ width: '88%' }}></div>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#594139] flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ca4b07]"></span>
                  Dominant: Focused & Pleasant • Natural micro-smiles
                </p>
              </div>

              {/* 3. Voice & Cadence */}
              <div className="p-3 rounded-xl bg-[#f6f2f7] space-y-1.5">
                <div className="flex items-center justify-between text-[#1b1b1e]">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#006a44]" />
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs">
                      Voice & Cadence
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-xs">
                    <span className="font-bold text-[#006a44]">81</span>
                    <span className="text-[#8d7167]">/100</span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#e4e1e6] overflow-hidden">
                  <div className="h-full bg-[#006a44] rounded-full" style={{ width: '81%' }}></div>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#594139] flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006a44]"></span>
                  138 WPM • Pitch: Optimal resonance • Clear articulation
                </p>
              </div>

              {/* 4. Word Usage & NLP */}
              <div className="p-3 rounded-xl bg-[#f6f2f7] space-y-1.5">
                <div className="flex items-center justify-between text-[#1b1b1e]">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#ca8a04]" />
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs">
                      Word Usage & NLP
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-xs">
                    <span className="font-bold text-[#ca8a04]">72</span>
                    <span className="text-[#8d7167]">/100</span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#e4e1e6] overflow-hidden">
                  <div className="h-full bg-[#ca8a04] rounded-full" style={{ width: '72%' }}></div>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#594139] flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ca8a04]"></span>
                  Filler words: 1.2/min • Hinglish mixed • Low jargon drift
                </p>
              </div>
            </div>
          </div>

          {/* Facial Emotion Distribution Breakdown (from Desktop Screenshot) */}
          <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-[#e1bfb4]/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-['Manrope'] font-bold text-sm text-[#1b1b1e]">
                Facial emotion distribution
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#81f9bb]/30 text-[#006a44] font-['JetBrains_Mono'] text-[10px] font-bold">
                happy
              </span>
            </div>

            <div className="space-y-2 font-['JetBrains_Mono'] text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="w-16 text-[#594139]">happy</span>
                <div className="flex-1 bg-[#f0edf1] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#006a44] h-full rounded-full" style={{ width: '68.7%' }}></div>
                </div>
                <span className="w-12 text-right font-semibold text-[#1b1b1e]">68.7%</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="w-16 text-[#594139]">neutral</span>
                <div className="flex-1 bg-[#f0edf1] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#8d7167] h-full rounded-full" style={{ width: '18.6%' }}></div>
                </div>
                <span className="w-12 text-right font-semibold text-[#1b1b1e]">18.6%</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="w-16 text-[#594139]">sad</span>
                <div className="flex-1 bg-[#f0edf1] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#0054cb] h-full rounded-full" style={{ width: '12.2%' }}></div>
                </div>
                <span className="w-12 text-right font-semibold text-[#1b1b1e]">12.2%</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="w-16 text-[#8d7167]">fear</span>
                <div className="flex-1 bg-[#f0edf1] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#ca4b07] h-full rounded-full" style={{ width: '0.3%' }}></div>
                </div>
                <span className="w-12 text-right text-[#8d7167]">0.3%</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="w-16 text-[#8d7167]">angry</span>
                <div className="flex-1 bg-[#f0edf1] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#ba1a1a] h-full rounded-full" style={{ width: '0.1%' }}></div>
                </div>
                <span className="w-12 text-right text-[#8d7167]">0.1%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#f0edf1] flex items-center justify-between font-['JetBrains_Mono'] text-[10px] text-[#8d7167]">
              <span>Shoulder tilt: 0.0989</span>
              <span>Head offset: 0.0424</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
