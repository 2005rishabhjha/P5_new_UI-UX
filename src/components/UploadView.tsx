import React, { useState, useRef, useEffect } from 'react';
import { ScreenType } from '../types';
import { 
  UploadCloud, 
  CheckCircle2, 
  RotateCw, 
  Clock, 
  FileText, 
  Film, 
  Languages, 
  Sparkles, 
  Bookmark, 
  PlusCircle, 
  Activity,
  Check,
  AlertCircle
} from 'lucide-react';

interface UploadViewProps {
  onSelectScreen: (screen: ScreenType) => void;
  onOpenSessionReport: (sessionId: string) => void;
  onShowToast: (msg: string) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  onSelectScreen,
  onOpenSessionReport,
  onShowToast,
}) => {
  const [selectedRole, setSelectedRole] = useState('Product Management');
  const [sessionLabel, setSessionLabel] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>({
    name: 'google_pm_mock_round3.mp4',
    size: '248.6 MB',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(68);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const roles = [
    'Product Management',
    'Software Eng',
    'Consulting',
    'Executive Leadership',
    'System Architecture',
  ];

  // Increment neural scoring simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setPipelineProgress((prev) => (prev >= 85 ? 68 : prev + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const mb = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedFile({ name: file.name, size: `${mb} MB` });
      onShowToast(`Uploaded ${file.name} (${mb} MB). Queuing worker analysis...`);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const mb = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedFile({ name: file.name, size: `${mb} MB` });
      onShowToast(`Received ${file.name}. Starting chunked transfer...`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0edf1] text-[#594139] font-['JetBrains_Mono'] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a33900] animate-ping"></span>
            <span>Asynchronous Ingestion</span>
          </div>
          <span className="hidden sm:inline font-['JetBrains_Mono'] text-xs text-[#8d7167]">
            POST /upload/
          </span>
        </div>

        <h1 className="font-['Manrope'] text-2xl md:text-4xl font-extrabold text-[#1b1b1e] tracking-tight">
          Analyze a recording
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#594139] leading-relaxed max-w-2xl">
          The file is scored server-side. You can leave this page — the report waits at its own permanent link.
        </p>
      </section>

      {/* Session Metadata Configuration Card */}
      <section className="p-5 md:p-6 rounded-2xl bg-white shadow-xs border border-[#e1bfb4]/30 space-y-5">
        <div className="flex items-center justify-between border-b border-[#f0edf1] pb-3">
          <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#8d7167] font-semibold">
            Session Profile
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#006a44] font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Ready for Scoring
          </span>
        </div>

        {/* Session Label Input */}
        <div className="space-y-1.5">
          <label 
            htmlFor="session-label-input"
            className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#1b1b1e] flex items-center gap-1.5"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#a33900]" />
            Session Label (optional)
          </label>
          <div className="relative">
            <input
              id="session-label-input"
              type="text"
              value={sessionLabel}
              onChange={(e) => setSessionLabel(e.target.value)}
              placeholder='e.g. Google PM Mock - Behavioral Round'
              className="w-full px-4 py-3 rounded-xl bg-[#f6f2f7] border border-transparent focus:border-[#ca4b07] focus:bg-white text-sm font-['Plus_Jakarta_Sans'] text-[#1b1b1e] placeholder-[#8d7167] transition-all outline-none"
            />
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#8d7167]">
            Shown as the title on the report page. Leave blank for "Untitled session".
          </p>
        </div>

        {/* Role Pill Selector */}
        <div className="space-y-2">
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#1b1b1e]">
            Target Role / Scenario
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {roles.map((r) => {
              const isSelected = selectedRole === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`px-4 py-2 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#a33900] text-white shadow-xs'
                      : 'bg-[#f0edf1] text-[#594139] hover:bg-[#eae7eb]'
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Detection Feature Badge */}
        <div className="p-3.5 rounded-xl bg-[#f6f2f7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#dae2ff] text-[#0054cb] flex items-center justify-center shrink-0">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#1b1b1e] block">
                Language & Dialect Detection
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#594139]">
                English + Hindi / Hinglish code-switching enabled
              </span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#81f9bb]/30 text-[#006a44] font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-wider">
            Active
          </span>
        </div>
      </section>

      {/* Interactive Drag & Drop Zone */}
      <section className="space-y-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative group flex flex-col items-center justify-center p-8 md:p-12 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
            isDragging
              ? 'border-[#a33900] bg-[#ffdbce]/20 scale-[0.99]'
              : 'border-[#e1bfb4] bg-white hover:border-[#a33900] hover:bg-[#fbf8fc]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-14 h-14 rounded-full bg-[#ffdbce] text-[#a33900] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="font-['Manrope'] text-lg font-bold text-[#1b1b1e]">
            {uploadedFile ? `Replace video (${uploadedFile.name})` : 'Drop video file here'}
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#594139] mt-1">
            or <span className="font-semibold text-[#a33900] underline underline-offset-4">click to browse device</span>
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0edf1] font-['JetBrains_Mono'] text-[11px] text-[#594139]">
            <span>MP4, WebM, MOV • Max 500MB (15-60 min recommended)</span>
          </div>
        </div>

        {/* Desktop Side-by-Side: Status & What gets measured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* File Status & Actions */}
          <div className="p-5 rounded-2xl bg-white shadow-xs border border-[#e1bfb4]/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-['Manrope'] font-bold text-sm text-[#1b1b1e]">
                {uploadedFile ? uploadedFile.name : 'No file chosen'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#f0edf1] text-[#594139] font-['JetBrains_Mono'] text-[11px]">
                {uploadedFile ? uploadedFile.size : 'waiting'}
              </span>
            </div>

            <div className="space-y-2 font-['Plus_Jakarta_Sans'] text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#f0edf1]">
                <span className="flex items-center gap-2 text-[#594139]">
                  <span className="w-5 h-5 rounded-full bg-[#81f9bb]/30 text-[#006a44] font-['JetBrains_Mono'] flex items-center justify-center text-[10px] font-bold">1</span>
                  Upload the file
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#006a44] font-semibold">100%</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#f0edf1]">
                <span className="flex items-center gap-2 text-[#594139]">
                  <span className="w-5 h-5 rounded-full bg-[#81f9bb]/30 text-[#006a44] font-['JetBrains_Mono'] flex items-center justify-center text-[10px] font-bold">2</span>
                  Queue for analysis
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#006a44] font-semibold">Ready</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#f0edf1]">
                <span className="flex items-center gap-2 text-[#594139]">
                  <span className="w-5 h-5 rounded-full bg-[#ffdbce] text-[#a33900] font-['JetBrains_Mono'] flex items-center justify-center text-[10px] font-bold">3</span>
                  Sample frames, extract audio
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#a33900] font-semibold">on the worker</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#f0edf1]">
                <span className="flex items-center gap-2 text-[#594139]">
                  <span className="w-5 h-5 rounded-full bg-[#f0edf1] text-[#8d7167] font-['JetBrains_Mono'] flex items-center justify-center text-[10px] font-bold">4</span>
                  Score the four signals
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#8d7167]">on the worker</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 text-[#594139]">
                  <span className="w-5 h-5 rounded-full bg-[#f0edf1] text-[#8d7167] font-['JetBrains_Mono'] flex items-center justify-center text-[10px] font-bold">5</span>
                  Write the report
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#8d7167]">on the worker</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  onShowToast('Queued on worker celery@worker-03...');
                  onSelectScreen('analyzing');
                }}
                className="px-4 py-2 rounded-full bg-[#a33900] hover:bg-[#ca4b07] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold shadow-xs active:scale-95 transition-all"
              >
                Analyze
              </button>
              <button
                onClick={() => {
                  setUploadedFile(null);
                  onShowToast('Cleared current file selection');
                }}
                className="px-4 py-2 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] text-[#594139] font-['Plus_Jakarta_Sans'] text-xs font-semibold active:scale-95 transition-all"
              >
                Clear
              </button>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#8d7167] leading-relaxed">
              Steps 3–5 run on the Celery worker. This page follows the upload; the report page then polls for the result.
            </p>
          </div>

          {/* What Gets Measured */}
          <div className="p-5 rounded-2xl bg-white shadow-xs border border-[#e1bfb4]/30 space-y-4">
            <h3 className="font-['Manrope'] font-bold text-sm text-[#1b1b1e]">
              What gets measured
            </h3>
            <div className="space-y-3 font-['Plus_Jakarta_Sans'] text-xs">
              <div className="flex items-start justify-between gap-3 pb-2 border-b border-[#f0edf1]">
                <div>
                  <span className="font-bold text-[#1b1b1e] block">Body language</span>
                  <span className="text-[#594139]">posture, shoulder tilt, head offset</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0054cb] shrink-0 mt-1"></span>
              </div>
              <div className="flex items-start justify-between gap-3 pb-2 border-b border-[#f0edf1]">
                <div>
                  <span className="font-bold text-[#1b1b1e] block">Facial expression</span>
                  <span className="text-[#594139]">dominant emotion, expression variety</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-xs bg-[#ca4b07] shrink-0 mt-1"></span>
              </div>
              <div className="flex items-start justify-between gap-3 pb-2 border-b border-[#f0edf1]">
                <div>
                  <span className="font-bold text-[#1b1b1e] block">Voice</span>
                  <span className="text-[#594139]">pitch, energy, pauses</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-xs bg-[#006a44] shrink-0 mt-1"></span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-bold text-[#1b1b1e] block">Word usage</span>
                  <span className="text-[#594139]">filler words, sentiment, vocabulary</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-xs bg-[#ca8a04] shrink-0 mt-1"></span>
              </div>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#8d7167] leading-relaxed pt-2">
              Each analyzer degrades on its own — if the audio track fails, the video scores still land, and the report shows which signals are missing.
            </p>
          </div>
        </div>
      </section>

      {/* Live Celery Pipeline Card */}
      <section className="p-5 md:p-6 rounded-2xl bg-white shadow-xs border border-[#e1bfb4]/30 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#8d7167]">
              Task Pipeline
            </span>
            <h3 className="font-['Manrope'] font-bold text-base text-[#1b1b1e]">
              Session #P5-89412
            </h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0edf1] font-['JetBrains_Mono'] text-xs text-[#594139]">
            <span className="w-2 h-2 rounded-full bg-[#ca4b07] animate-pulse"></span>
            <span>celery@worker-03</span>
          </div>
        </div>

        {/* Worker Steps */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#81f9bb]/30 text-[#006a44] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
                  Uploading Video File
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#006a44] font-semibold">
                  100% • Complete
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">
                248.6 MB transferred via chunked S3 stream
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#81f9bb]/30 text-[#006a44] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
                  Sampling Frames & Audio
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#006a44] font-semibold">
                  100% • Complete
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">
                30 fps keyframes cached • 16kHz mono WAV isolated
              </span>
            </div>
          </div>

          {/* Step 3: Neural Scoring */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#ffdbce] text-[#a33900] flex items-center justify-center shrink-0 animate-bounce">
              <RotateCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e] block">
                    Neural Scoring (4 Signals)
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#ca4b07] font-semibold">
                    In Progress • worker-03 active
                  </span>
                </div>
                <span className="font-['Manrope'] text-lg font-bold text-[#ca4b07]">
                  {pipelineProgress}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2 rounded-full bg-[#f0edf1] overflow-hidden">
                <div 
                  className="h-full bg-[#ca4b07] rounded-full transition-all duration-300"
                  style={{ width: `${pipelineProgress}%` }}
                ></div>
              </div>

              {/* 4 Signals Mini Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="p-2 rounded-lg bg-[#f6f2f7] flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#594139]">Body Pose</span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#006a44] font-bold">84% Sync</span>
                </div>
                <div className="p-2 rounded-lg bg-[#f6f2f7] flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#594139]">Facial Emote</span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#ca4b07] font-bold animate-pulse">Scoring...</span>
                </div>
                <div className="p-2 rounded-lg bg-[#f6f2f7] flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#594139]">Vocal Tone</span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#006a44] font-bold">91% Stable</span>
                </div>
                <div className="p-2 rounded-lg bg-[#f6f2f7] flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#594139]">Lexical Flow</span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#8d7167]">Buffering</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Queued */}
          <div className="flex items-start gap-3 opacity-60">
            <div className="w-7 h-7 rounded-full bg-[#f0edf1] text-[#8d7167] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#1b1b1e]">
                  NLP & Hinglish Transcription
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">Queued</span>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">
                Whisper-v3 specialized dialect checkpoint
              </span>
            </div>
          </div>

          {/* Step 5: Queued */}
          <div className="flex items-start gap-3 opacity-60">
            <div className="w-7 h-7 rounded-full bg-[#f0edf1] text-[#8d7167] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#1b1b1e]">
                  Executive Report Generation
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">Queued</span>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#8d7167]">
                Comprehensive quadrant telemetry synthesis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Action Controls */}
      <section className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => onSelectScreen('report')}
          className="w-full sm:flex-1 h-12 rounded-full bg-[#a33900] hover:bg-[#ca4b07] text-white font-['Plus_Jakarta_Sans'] text-sm font-semibold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Activity className="w-4 h-4" />
          <span>View Partial Telemetry</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setUploadedFile(null);
            fileInputRef.current?.click();
          }}
          className="w-full sm:flex-1 h-12 rounded-full bg-white hover:bg-[#f0edf1] text-[#1b1b1e] border border-[#e1bfb4]/50 font-['Plus_Jakarta_Sans'] text-sm font-semibold active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <PlusCircle className="w-4 h-4 text-[#8d7167]" />
          <span>Analyze Another Video</span>
        </button>
      </section>
    </div>
  );
};
