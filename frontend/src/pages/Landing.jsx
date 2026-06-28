import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Landmark, 
  HeartPulse, 
  GraduationCap, 
  Store, 
  Map, 
  MessageSquare, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
  const { t, lang } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-village-50 dark:bg-village-950 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-village-600/10 dark:bg-village-500/15 border border-village-600/20 text-village-700 dark:text-village-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 animate-spin-slow" />
              <span>{lang === 'hi' ? 'ग्रामीण सशक्तिकरण पहल' : 'Rural Empowerment Initiative'}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-xl mx-auto lg:mx-0">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-village-600 to-emerald-500 hover:from-village-700 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>{t('getStarted')}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-village-900/30 border border-slate-300/60 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-village-800/40 transition duration-200"
              >
                {t('learnMore')}
              </Link>
            </div>
          </motion.div>

          {/* Hero Right Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-gradient-to-tr from-village-200/50 to-emerald-100/50 dark:from-village-900/20 dark:to-emerald-800/20 border border-white/30 dark:border-white/5 shadow-2xl flex items-center justify-center p-8 overflow-hidden animate-float">
              {/* Decorative Background Circles */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-village-500/20 rounded-full blur-3xl animate-pulse" />

              {/* Village Silhouette SVG */}
              <svg viewBox="0 0 200 200" className="w-64 h-64 text-village-600 dark:text-village-400 fill-current opacity-85 z-10">
                {/* Sun */}
                <circle cx="150" cy="50" r="15" className="text-amber-400 fill-current" />
                {/* Hills */}
                <path d="M-10,210 Q40,140 100,180 T210,170 L210,210 Z" className="text-emerald-800/30 dark:text-emerald-950/45 fill-current" />
                <path d="M-10,210 Q50,160 120,190 T210,185 L210,210 Z" className="text-village-600/45 dark:text-village-900/60 fill-current" />
                {/* School House */}
                <rect x="25" y="115" width="40" height="30" rx="3" className="text-village-700 dark:text-village-400 fill-current" />
                <polygon points="20,115 45,95 70,115" className="text-accent-terracotta fill-current" />
                {/* Panchayat Flag Post */}
                <line x1="120" y1="90" x2="120" y2="155" stroke="currentColor" strokeWidth="2.5" />
                <polygon points="120,90 145,100 120,110" className="text-accent-gold fill-current" />
                {/* Trees */}
                <circle cx="160" cy="130" r="16" className="text-emerald-500 fill-current" />
                <line x1="160" y1="130" x2="160" y2="160" stroke="currentColor" strokeWidth="3" />
                <circle cx="180" cy="140" r="12" className="text-emerald-400 fill-current" />
                <line x1="180" y1="140" x2="180" y2="165" stroke="currentColor" strokeWidth="3.5" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/40 dark:bg-village-950/30 border-y border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
              {lang === 'hi' ? 'विशेष रूप से हमारे गाँवों के लिए डिज़ाइन किया गया' : 'Tailor-Made For Village Growth'}
            </h2>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              {lang === 'hi' ? 'आसान पहुँच • एआई क्षमताएँ • बहुभाषी सहायता' : 'Simple Navigation • AI Capabilities • Local Languages'}
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="p-6 rounded-3xl border border-white/20 dark:border-white/5 glass-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-village-600/10 text-village-600 flex items-center justify-center shadow">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('schemes')}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'hi' ? 'आसानी से अपने गाँव की पात्रता के अनुसार सरकारी योजनाओं की खोज और आवेदन करें।' : 'Explore central and state schemes with simple documentation checklists.'}
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="p-6 rounded-3xl border border-white/20 dark:border-white/5 glass-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center shadow">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('healthcare')}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'hi' ? 'चिकित्सा सलाह, आस-पास के क्लिनिक, दवा अनुस्मारक और प्राथमिक उपचार निर्देश प्राप्त करें।' : 'Get medicine notifications, wellness advice, and view regional doctors.'}
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="p-6 rounded-3xl border border-white/20 dark:border-white/5 glass-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-600/10 text-teal-600 flex items-center justify-center shadow">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('education')}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'hi' ? 'छात्रवृत्ति विवरण, मुफ्त डिजिटल कक्षाएं और करियर गाइडेंस का लाभ उठाएं।' : 'Find student scholarships, digital learning modules, and career options.'}
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={itemVariants} className="p-6 rounded-3xl border border-white/20 dark:border-white/5 glass-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/10 text-amber-600 flex items-center justify-center shadow">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('businesses')}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'hi' ? 'गाँव की दुकानों, किसानों, मैकेनिकों और महिला उद्यमियों की सूची खोजें।' : 'Support regional markets and access localized directory logs.'}
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={itemVariants} className="p-6 rounded-3xl border border-white/20 dark:border-white/5 glass-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shadow">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('villageMap')}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'hi' ? 'ग्राम मानचित्र पर पंचायत, स्कूल, पानी की टंकी और दुकानों का पता लगाएं।' : 'Access school, clinic, water pump, and local co-op map locations.'}
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div variants={itemVariants} className="p-6 rounded-3xl border border-white/20 dark:border-white/5 glass-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center shadow">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('aiChat')}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'hi' ? 'अपनी आवाज़ में बात करें और एआई से सरल हिंदी या अंग्रेजी में जवाब पाएं।' : 'Speak via microphone to ask questions and receive voice/text guidelines.'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
            {lang === 'hi' ? 'ग्रामीण भारत पर गहरा प्रभाव' : 'Generating Real-World Impact'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl glass-card text-center space-y-1">
              <span className="block text-3xl font-black text-village-600 dark:text-village-400">100+</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {lang === 'hi' ? 'ग्राम पंचायतें' : 'Gram Panchayats'}
              </span>
            </div>
            <div className="p-6 rounded-2xl glass-card text-center space-y-1">
              <span className="block text-3xl font-black text-village-600 dark:text-village-400">50K+</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {lang === 'hi' ? 'सक्रिय ग्रामीण नागरिक' : 'Active Citizens'}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 p-6 rounded-2xl glass-card text-center space-y-1">
              <span className="block text-3xl font-black text-village-600 dark:text-village-400">95%</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {lang === 'hi' ? 'संतुष्टि दर' : 'Satisfaction Rate'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-tr from-village-700 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'hi' ? 'आज ही अपने गाँव को डिजिटल बनाएं' : 'Bring Digital Change to Your Village Today'}
          </h2>
          <p className="text-sm font-semibold text-village-100 max-w-lg mx-auto">
            {lang === 'hi' 
              ? 'ग्रामसाथी एआई का उपयोग शुरू करें और पंचायत तथा सभी आवश्यक सेवाओं से तुरंत जुड़ें।' 
              : 'Join GramSathi and bridge the digital divide for every single family in your area.'}
          </p>
          <div className="pt-2">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-village-700 font-extrabold text-sm shadow-xl hover:shadow-2xl transition duration-300"
            >
              {lang === 'hi' ? 'निशुल्क रजिस्टर करें' : 'Create Free Account'}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
