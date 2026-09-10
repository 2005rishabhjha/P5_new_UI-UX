import React from 'react';
import { ScreenType } from '../types';
import { LayoutDashboard, Upload, Radio, BarChart3, AlertCircle } from 'lucide-react';

interface SidebarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  isLiveActive?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onSelectScreen,
  isLiveActive = false,
}) => {
  const navItems = [
    {
      id: 'dashboard' as ScreenType,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'upload' as ScreenType,
      label: 'Upload & analyze',
      icon: Upload,
    },
    {
      id: 'live' as ScreenType,
      label: 'Live session',
      icon: Radio,
      badge: isLiveActive ? 'Live' : undefined,
    },
    {
      id: 'report' as ScreenType,
      label: 'Report',
      icon: BarChart3,
    },
  ];

  return (
    <aside className="hidden md:flex md:w-64 flex-col justify-between border-r border-[#e1bfb4]/40 bg-[#fbf8fc] p-5 shrink-0 select-none min-h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div 
          onClick={() => onSelectScreen('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group mb-8"
        >
          <div className="w-7 h-7 rounded bg-[#ca4b07] text-white font-['Manrope'] font-bold text-sm flex items-center justify-center shadow-xs">
            p5
          </div>
          <div className="flex flex-col">
            <span className="font-['Manrope'] font-bold text-base text-[#1b1b1e] tracking-tight group-hover:text-[#a33900] transition-colors">
              Interview Analysis
            </span>
            <div className="flex items-center gap-1.5 -mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006a44] animate-pulse"></span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#006a44] font-medium tracking-wider uppercase">
                LIVE SYNC
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#8d7167] tracking-wider px-2 mb-2 font-semibold">
            Screens
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-['Plus_Jakarta_Sans'] text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#ffdbce] text-[#7f2b00] font-semibold shadow-xs'
                    : 'text-[#594139] hover:bg-[#f0edf1] hover:text-[#1b1b1e]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#a33900]' : 'text-[#8d7167]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-['JetBrains_Mono'] font-bold uppercase animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Context / This Session Card */}
        {isLiveActive && (
          <div className="mt-8 p-3 rounded-xl bg-[#ffdbce]/40 border border-[#ffdbce] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#7f2b00] uppercase font-bold tracking-wider">
                Current Stream
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-['JetBrains_Mono'] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
                ON AIR
              </span>
            </div>
            <p className="font-['JetBrains_Mono'] text-xs text-[#1b1b1e] font-semibold truncate">
              ws://localhost:8000/live
            </p>
            <button
              onClick={() => onSelectScreen('live')}
              className="text-xs text-[#a33900] hover:underline font-semibold flex items-center gap-1 pt-1"
            >
              Return to camera feed →
            </button>
          </div>
        )}
      </div>

      {/* Signals Scored Legend */}
      <div className="pt-6 border-t border-[#e1bfb4]/30 space-y-2.5">
        <p className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#8d7167] tracking-wider font-semibold">
          Signals Scored
        </p>
        <div className="space-y-1.5 font-['Plus_Jakarta_Sans'] text-xs text-[#594139]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0054cb]"></span>
            <span>Body language</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#ca4b07]"></span>
            <span>Facial expression</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#006a44]"></span>
            <span>Voice</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#ca8a04]"></span>
            <span>Word usage</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
