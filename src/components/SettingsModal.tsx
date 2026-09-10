import React from 'react';
import { X, Sliders, CheckCircle2, RefreshCw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#e1bfb4]/40 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffdbce] text-[#a33900] flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="font-['Manrope'] font-bold text-lg text-[#1b1b1e]">
              Engine Preferences
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] text-[#594139] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 font-['Plus_Jakarta_Sans'] text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-[#1b1b1e]">
              Scoring Model Endpoint
            </label>
            <input
              type="text"
              defaultValue="ws://localhost:8000/ws/interview/live/"
              className="w-full px-3 py-2 rounded-xl bg-[#f6f2f7] border border-[#e1bfb4]/40 text-[#1b1b1e] font-['JetBrains_Mono'] text-xs outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-[#1b1b1e]">
              Lexical & Dialect Engine
            </label>
            <select
              defaultValue="hinglish"
              className="w-full px-3 py-2 rounded-xl bg-[#f6f2f7] border border-[#e1bfb4]/40 text-[#1b1b1e] text-xs outline-none"
            >
              <option value="hinglish">English + Hindi (Hinglish Bilingual)</option>
              <option value="en_us">English (US Standard)</option>
              <option value="en_uk">English (UK Standard)</option>
              <option value="multi">Multilingual Whisper-v3 Checkpoint</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-[#1b1b1e]">
              Computer Vision Sampling Rate
            </label>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f6f2f7]">
              <span>Keyframes Captured</span>
              <span className="font-['JetBrains_Mono'] font-bold text-[#a33900]">60 FPS / 2Hz Audio</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => {
              onShowToast('Settings updated successfully');
              onClose();
            }}
            className="w-full h-11 rounded-full bg-[#a33900] hover:bg-[#ca4b07] text-white font-semibold text-xs transition-all shadow-xs"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
