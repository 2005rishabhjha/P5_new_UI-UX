import React, { useState } from 'react';
import { ScreenType, SessionItem } from './types';
import { INITIAL_SESSIONS } from './mockData';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { UploadView } from './components/UploadView';
import { LiveSessionView } from './components/LiveSessionView';
import { ReportView } from './components/ReportView';
import { AnalyzingView } from './components/AnalyzingView';
import { Toast, ToastMessage } from './components/Toast';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [sessions, setSessions] = useState<SessionItem[]>(INITIAL_SESSIONS);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2800);
  };

  const handleSelectScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);
    if (screen === 'live') {
      setIsLiveActive(true);
    }
  };

  const handleEndLiveSession = () => {
    setIsLiveActive(false);
    setCurrentScreen('report');
    showToast('Live session synthesized. Executive report ready!', 'success');
  };

  const handleOpenSessionReport = (sessionId: string) => {
    setCurrentScreen('report');
    showToast(`Loaded report for Session #${sessionId}`);
  };

  const handleOpenSessionProgress = (sessionId: string) => {
    setCurrentScreen('analyzing');
    showToast(`Tracking worker progress for Session #${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-[#fbf8fc] text-[#1b1b1e] flex flex-col md:flex-row antialiased selection:bg-[#ffdbce] selection:text-[#a33900]">
      {/* Desktop Left Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
        isLiveActive={isLiveActive}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-20 md:pb-8">
        {/* Top Header Bar */}
        <TopNav
          currentScreen={currentScreen}
          onSelectScreen={handleSelectScreen}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isLiveActive={isLiveActive}
        />

        {/* Dynamic Screen Renderer */}
        <main className="flex-1">
          {currentScreen === 'dashboard' && (
            <DashboardView
              onSelectScreen={handleSelectScreen}
              sessions={sessions}
              onOpenSessionReport={handleOpenSessionReport}
              onOpenSessionProgress={handleOpenSessionProgress}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'upload' && (
            <UploadView
              onSelectScreen={handleSelectScreen}
              onOpenSessionReport={handleOpenSessionReport}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'live' && (
            <LiveSessionView
              onSelectScreen={handleSelectScreen}
              onEndSession={handleEndLiveSession}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'report' && (
            <ReportView
              onSelectScreen={handleSelectScreen}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'analyzing' && (
            <AnalyzingView
              onComplete={() => setCurrentScreen('report')}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
        isLiveActive={isLiveActive}
      />

      {/* Settings / Configuration Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
