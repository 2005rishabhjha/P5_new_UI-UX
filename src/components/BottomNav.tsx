import React from 'react';
import { ScreenType } from '../types';
import { LayoutDashboard, Upload, Radio, BarChart3 } from 'lucide-react';

interface BottomNavProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  isLiveActive?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onSelectScreen,
  isLiveActive = false,
}) => {
  const tabs = [
    {
      id: 'dashboard' as ScreenType,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'upload' as ScreenType,
      label: 'Upload',
      icon: Upload,
    },
    {
      id: 'live' as ScreenType,
      label: 'Live',
      icon: Radio,
      hasPulse: true,
    },
    {
      id: 'report' as ScreenType,
      label: 'Insights',
      icon: BarChart3,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fbf8fc]/90 backdrop-blur-xl border-t border-[#e1bfb4]/30 shadow-[0_-2px_12px_rgba(0,0,0,0.04)] pb-safe">
      <div className="h-16 px-4 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectScreen(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] py-1 transition-colors ${
                isActive
                  ? 'text-[#a33900] font-semibold'
                  : 'text-[#594139] hover:text-[#1b1b1e]'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.hasPulse && (
                  <span className={`absolute -top-0.5 -right-1 w-2 h-2 rounded-full ${isLiveActive ? 'bg-[#ba1a1a] animate-ping' : 'bg-[#a33900]'}`}></span>
                )}
              </div>
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-wide mt-1">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
