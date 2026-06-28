import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CloudSun, 
  BellRing, 
  PhoneCall, 
  ArrowRight, 
  FileText, 
  HeartPulse, 
  GraduationCap, 
  Store, 
  Map, 
  Sparkles,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { API_BASE_URL } from '../services/api';

export default function Dashboard() {
  const { t, lang } = useLanguage();
  const { profile } = useAuth();
  
  const [greeting, setGreeting] = useState('');
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set greeting based on local time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t('greetingMorning'));
    else if (hour < 17) setGreeting(t('greetingAfternoon'));
    else setGreeting(t('greetingEvening'));

    // Fetch notice board details from backend
    fetch(`${API_BASE_URL}/api/announcements`)
      .then(res => res.json())
      .then(data => {
        setNotices(data.slice(0, 2)); // Show only latest 2
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [t]);

  const quickLinks = [
    { name: t('schemes'), path: '/schemes', icon: FileText, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    { name: t('healthcare'), path: '/healthcare', icon: HeartPulse, color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
    { name: t('education'), path: '/education', icon: GraduationCap, color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
    { name: t('businesses'), path: '/businesses', icon: Store, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    { name: t('villageMap'), path: '/map', icon: Map, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Greeting Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-village-600/10 to-emerald-500/10 p-6 rounded-3xl border border-white/20 dark:border-white/5 glass">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
            {greeting}, {profile?.full_name || 'Sathi'}!
          </h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
            {t('welcomeBack')} ({profile?.village || 'Rampur'}, {profile?.state || 'UP'})
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white/60 dark:bg-village-900/40 px-4 py-2 rounded-2xl border border-slate-200/50 dark:border-slate-800">
          <Sparkles className="w-4 h-4 text-village-600 dark:text-village-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {lang === 'hi' ? 'एआई चालू है' : 'AI Active'}
          </span>
        </div>
      </div>

      {/* Grid of Weather / Announcements / Quick Emergency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Weather Card */}
        <Card hover={false} className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {t('weatherCard')}
              </h3>
              <p className="text-lg font-bold text-slate-800 dark:text-white mt-1">
                {t('weatherTemp')}
              </p>
            </div>
            <CloudSun className="w-10 h-10 text-amber-500 animate-float" />
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 space-y-1">
            <p>{t('weatherHumid')}</p>
            <p>{t('weatherWind')}</p>
          </div>
        </Card>

        {/* Notice Board Card */}
        <Card hover={false} className="flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
              <BellRing className="w-3.5 h-3.5 text-village-600 dark:text-village-400 animate-swing" />
              <span>{t('recentAnnouncements')}</span>
            </h3>
            {loading ? (
              <Loader />
            ) : (
              <div className="mt-3 space-y-3">
                {notices.map((notice, i) => (
                  <div key={i} className="text-xs space-y-0.5 border-l-2 border-village-500 pl-3">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">
                      {lang === 'hi' ? notice.title_hi : notice.title}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center">
                      <Clock className="w-2.5 h-2.5 mr-1" />
                      {notice.date}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/announcements"
            className="inline-flex items-center text-xs font-bold text-village-600 dark:text-village-400 hover:underline mt-4"
          >
            <span>{lang === 'hi' ? 'सभी सूचनाएं देखें' : 'View all notices'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </Card>

        {/* Immediate Emergency Card */}
        <Card hover={false} className="bg-red-500/5 dark:bg-red-500/5 border-red-500/20 dark:border-red-500/10 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-red-500">
              {t('emergencyAlert')}
            </h3>
            <p className="text-lg font-black text-red-600 dark:text-red-400 mt-1 leading-snug">
              {lang === 'hi' ? '24/7 आपातकालीन डायल सेवा' : 'Direct Emergency Helpdesk'}
            </p>
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2">
              {lang === 'hi' ? 'चिकित्सा, पुलिस, या आग बुझाने की सेवाओं से तुरंत संपर्क करें।' : 'Direct dial access to local doctors, police station and ambulances.'}
            </p>
          </div>
          <Link
            to="/emergency"
            className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition mt-4"
          >
            <PhoneCall className="w-4 h-4 mr-2 animate-bounce" />
            <span>{t('emergencyAction')}</span>
          </Link>
        </Card>

      </div>

      {/* Quick Access Navigation Modules */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {t('quickAccess')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link key={i} to={link.path}>
                <Card className="h-full flex flex-col items-center justify-center p-6 text-center hover:scale-105 transition-all">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${link.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {link.name}
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mandi Crop Price Index Analytics */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {lang === 'hi' ? 'फसल मण्डी मूल्य सूचकांक (बाजार दरें)' : 'Village Mandi Price Index (Market Rates)'}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Card */}
          <Card hover={false} className="lg:col-span-2 space-y-4">
            <span className="text-[10px] font-extrabold text-village-600 dark:text-village-400 uppercase tracking-widest block">
              {lang === 'hi' ? 'प्रति क्विंटल औसत दरें' : 'Average Rates per Quintal (₹)'}
            </span>
            
            <div className="space-y-3.5">
              {/* Crop Item 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                  <span>{lang === 'hi' ? 'गेहूं (Wheat)' : 'Wheat'}</span>
                  <span>₹2,275 <span className="text-emerald-500 text-[10px] font-extrabold">(+2.4%)</span></span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-village-500 to-emerald-400 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              {/* Crop Item 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                  <span>{lang === 'hi' ? 'धान (Paddy)' : 'Paddy'}</span>
                  <span>₹2,183 <span className="text-emerald-500 text-[10px] font-extrabold">(+1.8%)</span></span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-village-500 to-emerald-400 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>

              {/* Crop Item 3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                  <span>{lang === 'hi' ? 'सरसों (Mustard)' : 'Mustard'}</span>
                  <span>₹5,400 <span className="text-red-500 text-[10px] font-extrabold">(-0.5%)</span></span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-village-500 to-emerald-400 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Crop Item 4 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                  <span>{lang === 'hi' ? 'आलू (Potato)' : 'Potato'}</span>
                  <span>₹1,200 <span className="text-emerald-500 text-[10px] font-extrabold">(+5.2%)</span></span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-village-500 to-emerald-400 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Advisory Card */}
          <Card hover={false} className="bg-gradient-to-tr from-village-500/5 to-emerald-500/5 border border-village-500/10 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold text-village-650 dark:text-village-400 uppercase tracking-widest block">
                {lang === 'hi' ? 'एआई मंडी सलाहकार' : 'AI Market Advisory'}
              </span>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
                {lang === 'hi' 
                  ? 'मौसम विभाग के अनुसार आगामी सप्ताह में वर्षा की संभावना है। सरसों के भंडारण को नमी से बचाएं। गेहूं की कीमतों में निर्यात बढ़ने के कारण +4% उछाल की उम्मीद है।' 
                  : 'Favorable export demands are driving wheat prices upward (+4%). Farmers holding stocks are advised to secure transport logistics early. Cover open storage spaces for mustard before July 2nd rains.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase flex items-center justify-between">
              <span>{lang === 'hi' ? 'अद्यतन: अभी-अभी' : 'Updated: Just Now'}</span>
              <span className="text-village-600 dark:text-village-400">Live Feed</span>
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
