import React, { useEffect, useState } from 'react';
import { Store, Search, Phone, Star, MapPin, User, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { API_BASE_URL } from '../services/api';

export default function Businesses() {
  const { t, lang } = useLanguage();
  const [businesses, setBusinesses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/businesses`)
      .then(res => res.json())
      .then(data => {
        setBusinesses(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = businesses;

    if (activeCategory !== 'all') {
      result = result.filter(b => b.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(
        b =>
          b.shop_name.toLowerCase().includes(q) ||
          (b.shop_name_hi && b.shop_name_hi.toLowerCase().includes(q)) ||
          b.owner.toLowerCase().includes(q) ||
          b.services.toLowerCase().includes(q) ||
          (b.services_hi && b.services_hi.toLowerCase().includes(q))
      );
    }

    setFiltered(result);
  }, [search, activeCategory, businesses]);

  const categories = [
    { id: 'all', label: t('categoryAll') },
    { id: 'Farmers', label: t('catFarmers') },
    { id: 'Electricians', label: t('catElectricians') },
    { id: 'Mechanics', label: t('catMechanics') },
    { id: 'Tailors', label: t('catTailors') },
    { id: 'Women Entrepreneurs', label: t('catWomenEntrepreneurs') }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">
          {t('businessHeader')}
        </h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {t('businessSubtitle')}
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

      {/* Grid */}
      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <div className="text-center p-12 glass-card rounded-3xl border border-slate-100 dark:border-slate-800">
          <Store className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            {t('noResults')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((shop, i) => (
            <Card key={i} hover={false} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-village-600 dark:text-village-400 bg-village-500/10 px-2 py-0.5 rounded-lg">
                    {shop.category}
                  </span>
                  <div className="flex items-center space-x-0.5 text-xs text-amber-500 font-extrabold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{shop.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-black text-slate-800 dark:text-white leading-snug">
                  {lang === 'hi' ? shop.shop_name_hi : shop.shop_name}
                </h3>
                
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                  <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  <span>{shop.owner}</span>
                </p>

                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  <span>{shop.location}</span>
                </p>

                <p className="text-xs font-semibold text-slate-650 dark:text-slate-350 mt-3 border-t border-slate-100 dark:border-slate-800/80 pt-3 leading-relaxed">
                  {lang === 'hi' ? shop.services_hi : shop.services}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800 flex justify-between items-center">
                <a
                  href={`tel:${shop.phone}`}
                  className="w-full flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-village-600 to-emerald-500 hover:from-village-700 hover:to-emerald-600 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {shop.phone}</span>
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
