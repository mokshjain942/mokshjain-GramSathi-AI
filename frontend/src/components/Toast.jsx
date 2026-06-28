import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-3 px-4 py-3 rounded-2xl glass shadow-xl border border-white/20 dark:border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-500" />
      )}
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
        {message}
      </span>
      <button
        onClick={onClose}
        className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
