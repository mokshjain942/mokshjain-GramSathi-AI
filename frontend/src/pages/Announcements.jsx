import React, { useEffect, useState } from 'react';
import { BellRing, Calendar, ShieldAlert, Zap, Droplet, HeartPulse, Sparkles, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { API_BASE_URL } from '../services/api';

export default function Announcements() {
  const { t, lang } = useLanguage();
  const [notices, setNotices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/announcements`)
      .then(res => res.json())
      .then(data => {
        setNotices(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = notices;

    if (activeCategory !== 'all') {
      result = result.filter(n => n.type.toLowerCase() === activeCategory.toLowerCase());
    }

    if (search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(
        n =>
          n.title.toLowerCase().includes(q) ||
          (n.title_hi && n.title_hi.toLowerCase().includes(q)) ||
          n.description.toLowerCase().includes(q) ||
          (n.description_hi && n.description_hi.toLowerCase().includes(q))
      );
    }

    setFiltered(result);
  }, [search, activeCategory, notices]);

  const categories = [
    { id: 'all', label: t('categoryAll') },
    { id: 'Govt Update', label: t('annTypeGov') },
    { id: 'Power Outage', label: t('annTypePower') },
    { id: 'Water Supply', label: t('annTypeWater') },
    { id: 'Health Camp', label: t('annTypeCamp') },
    { id: 'Village Event', label: t('annTypeEvent') }
  ];

  const getStyleForType = (type) => {
    switch (type) {
      case 'Govt Update':
        return { color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', icon: Sparkles };
      case 'Power Outage':
        return { color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', icon: Zap };
      case 'Water Supply':
        return { color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', icon: Droplet };
      case 'Health Camp':
        return { color: 'bg-red-500/10 text-red-600 dark:text-red-400', icon: HeartPulse };
      default:
        return { color: 'bg-slate-500/10 text-slate-650 dark:text-slate-400', icon: BellRing };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">
          {t('announcementHeader')}
        </h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {t('announcementSubtitle')}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200
                ${activeCategory === cat.id
                  ? 'bg-village-600 text-white shadow-md'
                  : 'bg-white/40 dark:bg-village-900/30 border border-slate-300/60 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-village-800/40'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Notices feed */}
      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <div className="text-center p-12 glass-card rounded-3xl border border-slate-150 dark:border-slate-800">
          <BellRing className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            {t('noResults')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((notice, i) => {
            const style = getStyleForType(notice.type);
            const Icon = style.icon;
            return (
              <Card key={i} hover={false} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${style.color}`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-lg ${style.color}`}>
                        {notice.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {notice.date}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-800 dark:text-white leading-tight">
                      {lang === 'hi' ? notice.title_hi : notice.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                      {lang === 'hi' ? notice.description_hi : notice.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
}
