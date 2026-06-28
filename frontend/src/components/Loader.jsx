import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Loader({ message, fullPage = false }) {
  const { t } = useLanguage();
  
  const content = (
    <div className="flex flex-col items-center justify-center space-y-3 p-8">
      <Loader2 className="w-10 h-10 animate-spin text-village-600 dark:text-village-400" />
      <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
        {message || t('loading')}
      </p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-village-50/80 dark:bg-village-950/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
}
