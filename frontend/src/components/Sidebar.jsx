import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  HeartPulse, 
  GraduationCap, 
  Store, 
  Map, 
  BellRing, 
  MessageSquare, 
  UserCircle, 
  Settings, 
  PhoneCall 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Sidebar() {
  const { t } = useLanguage();

  const menuItems = [
    { name: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('schemes'), path: '/schemes', icon: FileText },
    { name: t('healthcare'), path: '/healthcare', icon: HeartPulse },
    { name: t('education'), path: '/education', icon: GraduationCap },
    { name: t('businesses'), path: '/businesses', icon: Store },
    { name: t('villageMap'), path: '/map', icon: Map },
    { name: t('announcements'), path: '/announcements', icon: BellRing },
    { name: t('aiChat'), path: '/chat', icon: MessageSquare },
    { name: t('profile'), path: '/profile', icon: UserCircle },
    { name: t('settings'), path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block h-[calc(100vh-4rem)] sticky top-16 border-r border-white/20 dark:border-white/5 glass p-4 select-none">
      <div className="flex flex-col h-full justify-between">
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-village-600 to-emerald-500 text-white shadow-md shadow-village-500/10' 
                      : 'text-slate-600 hover:text-village-600 dark:text-slate-300 dark:hover:text-village-400 hover:bg-white/50 dark:hover:bg-village-900/30'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* High-Contrast Emergency Speed Dial */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <NavLink
            to="/emergency"
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-all duration-200 border
              ${isActive
                ? 'bg-red-600 text-white border-red-700 shadow-lg shadow-red-500/20'
                : 'bg-red-500/10 dark:bg-red-500/5 hover:bg-red-500/20 border-red-500/30 text-red-600 dark:text-red-400'
              }
            `}
          >
            <PhoneCall className="w-5 h-5 shrink-0 animate-bounce" />
            <span className="uppercase">{t('emergency')}</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
