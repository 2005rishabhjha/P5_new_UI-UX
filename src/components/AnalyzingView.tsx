import React, { useState, useEffect } from 'react';
import { ScreenType } from '../types';
import { RotateCw, Sparkles, ArrowRight } from 'lucide-react';

interface AnalyzingViewProps {
  onComplete: () => void;
  onShowToast: (msg: string) => void;
}

export const AnalyzingView: React.FC<AnalyzingViewProps> = ({
  onComplete,
  onShowToast,
}) => {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onShowToast('Session analysis complete! Executive report generated.');
            onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8 + 4);
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete, onShowToast]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#8d7167]">
            <span>REPORT</span>
            <span>•</span>
            <span>SEP 09, 2026</span>
            <span>•</span>
            <span className="text-[#a33900] font-semibold">LIVE</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef08a]/50 text-[#ca8a04] font-['JetBrains_Mono'] text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ca8a04] animate-ping"></span>
            In progress
          </span>
        </div>
        <h1 className="font-['Manrope'] text-2xl md:text-4xl font-extrabold text-[#1b1b1e] tracking-tight">
          Untitled session
        </h1>
      </div>

      {/* Centered Analyzing Card */}
      <div className="min-h-[460px] rounded-3xl bg-white border border-[#e1bfb4]/30 shadow-sm flex flex-col items-center justify-center p-8 md:p-16 text-center space-y-6">
        {/* Animated Spinner with warm glow */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#ffdbce]/50 animate-ping opacity-30"></div>
          <RotateCw className="w-12 h-12 text-[#ca4b07] animate-spin" />
        </div>

        <div className="space-y-2 max-w-md">
          <h2 className="font-['Manrope'] text-xl md:text-2xl font-bold text-[#1b1b1e]">
            Analyzing your session
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-xs md:text-sm text-[#594139] leading-relaxed">
            Body language, facial expression, voice and word usage are scored on the worker. This can take a minute — the page updates itself.
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full max-w-md space-y-2">
          <div className="w-full h-2 rounded-full bg-[#f0edf1] overflow-hidden">
            <div
              className="h-full bg-[#ca4b07] rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
          </div>
          <div className="flex justify-end font-['JetBrains_Mono'] text-xs text-[#8d7167]">
            <span>{Math.min(100, progress)}%</span>
          </div>
        </div>

        {/* Skip button for instant preview */}
        <button
          onClick={() => {
            onShowToast('Skipping worker wait, rendering synthesized report...');
            onComplete();
          }}
          className="text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#a33900] hover:underline flex items-center gap-1 pt-4"
        >
          <span>Skip wait & view completed report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
