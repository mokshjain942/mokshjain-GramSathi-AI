import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-300/60 dark:border-white/10 text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-village-900/30 hover:bg-slate-100 dark:hover:bg-village-800/40 transition duration-200 focus:outline-none focus:ring-2 focus:ring-village-500"
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4 text-village-600 dark:text-village-400" />
      <span className="text-xs font-semibold tracking-wider">
        {lang === 'en' ? 'हिन्दी' : 'English'}
      </span>
    </button>
  );
}
