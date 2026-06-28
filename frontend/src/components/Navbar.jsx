import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User, Landmark, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import LanguageToggle from './LanguageToggle';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const { t, lang } = useLanguage();
  const { darkMode, fontSize, setFontSize } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 dark:border-white/5 glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / App Name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-village-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-village-500/20 text-white font-bold text-lg">
              <Landmark className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-village-700 to-emerald-500 dark:from-village-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  {t('appName')}
                </span>
                <span className="text-[9px] font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 px-1.5 py-0.5 rounded-md shadow shadow-orange-500/10">
                  Mavericks 🔥
                </span>
              </div>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase leading-none mt-0.5">
                {lang === 'hi' ? 'ग्रामीण भारत' : 'Rural Portal'}
              </span>
            </div>
          </Link>

          {/* Desktop Right items */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Accessibility Font Size Toggler */}
            <div className="flex items-center space-x-1 border border-slate-300/40 dark:border-white/10 p-0.5 bg-white/40 dark:bg-village-900/30 rounded-xl select-none">
              <button
                type="button"
                onClick={() => setFontSize(16)}
                className={`w-6 h-6 text-[10px] font-extrabold rounded-lg transition-all ${fontSize === 16 ? 'bg-village-650 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-village-800/40'}`}
                title="Normal Font Size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize(19)}
                className={`w-6 h-6 text-xs font-extrabold rounded-lg transition-all ${fontSize === 19 ? 'bg-village-650 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-village-800/40'}`}
                title="Large Font Size"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSize(22)}
                className={`w-6 h-6 text-sm font-extrabold rounded-lg transition-all ${fontSize === 22 ? 'bg-village-650 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-village-800/40'}`}
                title="Extra Large Font Size"
              >
                A++
              </button>
            </div>

            <LanguageToggle />
            <DarkModeToggle />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-village-600 dark:text-slate-200 dark:hover:text-village-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition duration-200">
                  <User className="w-4 h-4" />
                  <span>{t('dashboard')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 transition duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-village-600 dark:text-slate-200 dark:hover:text-village-400 transition"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-village-600 to-emerald-500 hover:from-village-700 hover:to-emerald-600 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                >
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <LanguageToggle />
            <DarkModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 dark:border-white/5 bg-village-50/95 dark:bg-village-950/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-2">
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-village-100/50 dark:hover:bg-village-900/50 transition"
              >
                {t('dashboard')}
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left flex items-center space-x-2 px-3 py-2.5 rounded-xl text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>{t('logout')}</span>
              </button>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition"
              >
                {t('login')}
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full px-4 py-2.5 bg-gradient-to-r from-village-600 to-emerald-500 text-white font-medium rounded-xl hover:opacity-95 shadow transition"
              >
                {t('signup')}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
