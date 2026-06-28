import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, HelpCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function NotFound() {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-village-50 dark:bg-village-950 px-4 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-village-600/10 rounded-full blur-3xl animate-pulse" />

      {/* 404 Card */}
      <div className="w-full max-w-md p-8 rounded-3xl border border-white/20 dark:border-white/5 glass-panel shadow-2xl text-center space-y-6 relative z-10 select-none">
        
        <div className="w-16 h-16 rounded-2xl bg-village-600/10 text-village-600 flex items-center justify-center mx-auto shadow-md">
          <HelpCircle className="w-9 h-9 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white">
            404
          </h2>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-350">
            {lang === 'hi' ? 'पृष्ठ नहीं मिला' : 'Page Not Found'}
          </h3>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
            {lang === 'hi'
              ? 'क्षमा करें, जिस पृष्ठ को आप खोज रहे हैं वह उपलब्ध नहीं है।'
              : 'The page you are looking for does not exist or has been moved.'}
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-village-600 to-emerald-500 hover:from-village-700 hover:to-emerald-600 transition shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर जाएं' : 'Return Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
