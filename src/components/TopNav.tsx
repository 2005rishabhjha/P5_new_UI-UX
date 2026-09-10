import React from 'react';
import { ScreenType } from '../types';
import { Sliders, User, Radio } from 'lucide-react';
import { ASSETS } from '../mockData';

interface TopNavProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  onOpenSettings?: () => void;
  isLiveActive?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  onSelectScreen,
  onOpenSettings,
  isLiveActive = false,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#fbf8fc]/90 backdrop-blur-md border-b border-[#e1bfb4]/30">
      <div className="h-16 px-4 md:px-8 flex items-center justify-between">
        {/* Left: Mobile Brand & Desktop Context */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onSelectScreen('dashboard')}
            className="flex items-center gap-2 cursor-pointer md:hidden"
          >
            <div className="px-2 py-1 rounded-full bg-[#ca4b07] text-white font-['Manrope'] font-bold text-sm leading-none">
              p5
            </div>
            <div className="flex flex-col">
              <span className="font-['Manrope'] font-bold text-base text-[#1b1b1e]">
                P5 Intelligence
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a44] animate-pulse"></span>
                <span className="font-['JetBrains_Mono'] text-[9px] text-[#006a44] uppercase font-semibold">
                  Live Sync
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#8d7167]">
            <span className="px-2 py-0.5 rounded-full bg-[#f0edf1] text-[#594139] font-medium">
              Neural Engine 2.4
            </span>
            <span>•</span>
            <span className="text-[#006a44] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a44]"></span>
              Celery Worker-03 Connected
            </span>
          </div>
        </div>

        {/* Right: Actions and Profile */}
        <div className="flex items-center gap-3">
          {isLiveActive && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-['JetBrains_Mono'] text-xs font-semibold animate-pulse">
              <Radio className="w-3.5 h-3.5" />
              <span>ON AIR (ws://localhost:8000/live)</span>
            </div>
          )}

          <button 
            onClick={onOpenSettings}
            aria-label="Settings and options"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#594139] hover:bg-[#f0edf1] transition-colors"
          >
            <Sliders className="w-5 h-5" />
          </button>

          <div 
            onClick={() => onSelectScreen('dashboard')}
            className="relative cursor-pointer group flex items-center gap-2 pl-1"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#ffdbce] shadow-xs group-hover:scale-105 transition-transform">
              <img 
                src={ASSETS.alex} 
                alt="Alex profile avatar" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="hidden lg:inline-block font-['Plus_Jakarta_Sans'] text-sm font-semibold text-[#1b1b1e]">
              Alex
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
