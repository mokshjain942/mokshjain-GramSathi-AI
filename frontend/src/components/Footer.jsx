import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Heart, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="w-full border-t border-white/20 dark:border-white/5 glass transition-all duration-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-village-600 to-emerald-400 flex items-center justify-center text-white font-bold">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-800 dark:text-white">
                {t('appName')}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {t('tagline')}
            </p>
          </div>

          {/* Quick Access links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {lang === 'hi' ? 'महत्वपूर्ण लिंक्स' : 'Useful Links'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/schemes" className="text-slate-600 hover:text-village-600 dark:text-slate-300 dark:hover:text-village-400 font-semibold transition">
                {t('schemes')}
              </Link>
              <Link to="/healthcare" className="text-slate-600 hover:text-village-600 dark:text-slate-300 dark:hover:text-village-400 font-semibold transition">
                {t('healthcare')}
              </Link>
              <Link to="/education" className="text-slate-600 hover:text-village-600 dark:text-slate-300 dark:hover:text-village-400 font-semibold transition">
                {t('education')}
              </Link>
              <Link to="/map" className="text-slate-600 hover:text-village-600 dark:text-slate-300 dark:hover:text-village-400 font-semibold transition">
                {t('villageMap')}
              </Link>
            </div>
          </div>

          {/* Safety & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {lang === 'hi' ? 'आपातकालीन सहायता' : 'Safety & Support'}
            </h4>
            <div className="flex items-center space-x-2">
              <Link
                to="/emergency"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold transition"
              >
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{t('emergency')}</span>
              </Link>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {lang === 'hi' ? '24x7 ग्राम पंचायत नागरिक सहायता सेवा' : '24x7 Gram Panchayat Citizen Support Service'}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} {t('appName')} | Developed by <span className="font-bold text-orange-500">Team Mavericks 🔥</span>. {lang === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Motto: <i>Think Bold. Build Smart. Win Together.</i></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
