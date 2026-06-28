import React, { useEffect, useState } from 'react';
import { FileText, Search, Sparkles, AlertCircle, CheckCircle, Info, ChevronRight, X, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { API_BASE_URL } from '../services/api';

export default function Schemes() {
  const { t, lang } = useLanguage();
  const { profile } = useAuth();
  
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // AI Recommendation States
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState(null);
  
  // Modal details view
  const [activeScheme, setActiveScheme] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/schemes`)
      .then((res) => res.json())
      .then((data) => {
        setSchemes(data);
        setFilteredSchemes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = schemes;

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        s => 
          s.title.toLowerCase().includes(q) || 
          (s.title_hi && s.title_hi.toLowerCase().includes(q)) ||
          s.description.toLowerCase().includes(q) ||
          (s.description_hi && s.description_hi.toLowerCase().includes(q))
      );
    }

    setFilteredSchemes(result);
  }, [searchQuery, selectedCategory, schemes]);

  const handleGetAIRecommendation = async () => {
    setAiLoading(true);
    setAiRecommendation(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/schemes/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occupation: profile?.occupation || 'Farmer',
          village: profile?.village || 'Rampur',
          state: profile?.state || 'Gujarat',
          language: lang
        })
      });

      if (!response.ok) throw new Error("Recommendation failed");
      const data = await response.json();
      setAiRecommendation(data.recommendation);
    } catch (e) {
      console.error(e);
      setAiRecommendation(
        lang === 'hi' 
          ? 'माफ़ कीजिये, इस समय एआई सुझाव लोड नहीं हो पाए। कृपया पुनः प्रयास करें।' 
          : 'Failed to retrieve recommendations from Groq. Please check back shortly.'
      );
    } finally {
      setAiLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: t('categoryAll') },
    { id: 'Agriculture', label: t('categoryAgriculture') },
    { id: 'Pension', label: t('categoryPension') },
    { id: 'Education', label: t('categoryEducation') },
    { id: 'Housing', label: t('categoryHousing') }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">
            {t('schemesHeader')}
          </h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
            {t('schemesSubtitle')}
          </p>
        </div>

        {/* AI Recommendations Button */}
        <Button
          onClick={handleGetAIRecommendation}
          disabled={aiLoading}
          className="flex items-center space-x-1.5"
        >
          {aiLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>{t('aiRecommendBtn')}</span>
        </Button>
      </div>

      {/* AI Recommendation Result Panel */}
      {aiRecommendation && (
        <div className="p-6 rounded-3xl bg-gradient-to-tr from-village-600/10 to-emerald-500/10 border border-village-500/30 dark:border-village-500/20 glass relative animate-in fade-in slide-in-from-top-4 duration-300">
          <button
            onClick={() => setAiRecommendation(null)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-2 text-village-700 dark:text-village-300 mb-3">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider">
              {t('aiRecommend')}
            </h3>
          </div>
          <div className="text-xs font-semibold leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
            {aiRecommendation}
          </div>
        </div>
      )}

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
          />
        </div>

        {/* Categories togglers */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`
                px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200
                ${selectedCategory === cat.id
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

      {/* Schemes Cards Grid */}
      {loading ? (
        <Loader />
      ) : filteredSchemes.length === 0 ? (
        <div className="text-center p-12 glass-card rounded-3xl border border-slate-100 dark:border-slate-850">
          <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            {t('noResults')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card
              key={scheme.id}
              onClick={() => setActiveScheme(scheme)}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2 text-[10px] font-extrabold uppercase tracking-widest text-village-600 dark:text-village-400 mb-2">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>{scheme.category}</span>
                </div>
                <h3 className="text-base font-black text-slate-800 dark:text-white mb-2 leading-snug">
                  {lang === 'hi' ? scheme.title_hi : scheme.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {lang === 'hi' ? scheme.description_hi : scheme.description}
                </p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                  {lang === 'hi' ? 'विवरण देखने के लिए क्लिक करें' : 'Click to view details'}
                </span>
                <ChevronRight className="w-4 h-4 text-village-600 dark:text-village-400" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Details View Modal */}
      {activeScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-village-50/80 dark:bg-village-950/80 backdrop-blur-md px-4 py-8 overflow-y-auto">
          <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl border border-white/20 dark:border-white/5 glass-panel shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto animate-in scale-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold text-village-600 dark:text-village-400 uppercase tracking-widest block mb-1">
                  {activeScheme.category}
                </span>
                <h3 className="text-xl font-black text-slate-800 dark:text-white leading-snug">
                  {lang === 'hi' ? activeScheme.title_hi : activeScheme.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveScheme(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {lang === 'hi' ? 'विवरण' : 'Description'}
              </h4>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'hi' ? activeScheme.description_hi : activeScheme.description}
              </p>
            </div>

            {/* Eligibility */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/5 border border-emerald-500/10 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{t('eligibleCheck')}</span>
              </h4>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {lang === 'hi' ? activeScheme.eligibility_hi : activeScheme.eligibility}
              </p>
            </div>

            {/* Required Docs */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {t('requiredDocs')}
              </h4>
              <ul className="list-disc pl-5 text-xs font-semibold text-slate-600 dark:text-slate-300 space-y-1">
                {(lang === 'hi' ? activeScheme.documents_hi : activeScheme.documents).map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {t('applyProcess')}
              </h4>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {lang === 'hi' ? activeScheme.process_hi : activeScheme.process}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
