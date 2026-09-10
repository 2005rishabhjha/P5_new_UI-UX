import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'warning';
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#303033] text-[#f3f0f4] shadow-xl flex items-center gap-2.5 text-xs font-['Plus_Jakarta_Sans'] font-medium animate-in fade-in slide-in-from-bottom-3 duration-300">
      {toast.type === 'warning' ? (
        <AlertTriangle className="w-4 h-4 text-[#ca4b07]" />
      ) : toast.type === 'info' ? (
        <Info className="w-4 h-4 text-[#dae2ff]" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-[#81f9bb]" />
      )}
      <span>{toast.text}</span>
    </div>
  );
};
