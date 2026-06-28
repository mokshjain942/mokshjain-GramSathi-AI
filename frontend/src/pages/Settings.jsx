import React, { useState } from 'react';
import { Settings, Eye, Volume2, Languages, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import LanguageToggle from '../components/LanguageToggle';
import DarkModeToggle from '../components/DarkModeToggle';
import Toast from '../components/Toast';

export default function SettingsPage() {
  const { t, lang } = useLanguage();
  const { darkMode } = useTheme();

  // Accessibility States
  const [largeFonts, setLargeFonts] = useState(() => localStorage.getItem('gramsathi_large_fonts') === 'true');
  const [voiceNav, setVoiceNav] = useState(() => localStorage.getItem('gramsathi_voice_nav') === 'true');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('gramsathi_high_contrast') === 'true');
  
  const [toast, setToast] = useState(null);

  const handleSave = () => {
    // Save to local storage
    localStorage.setItem('gramsathi_large_fonts', largeFonts);
    localStorage.setItem('gramsathi_voice_nav', voiceNav);
    localStorage.setItem('gramsathi_high_contrast', highContrast);

    // Apply global font adjustments immediately
    if (largeFonts) {
      document.documentElement.classList.add('text-lg');
    } else {
      document.documentElement.classList.remove('text-lg');
    }

    setToast({ message: lang === 'hi' ? 'सेटिंग्स सफलतापूर्वक सहेजी गईं!' : 'Accessibility settings updated successfully!', type: 'success' });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center space-x-2">
          <Settings className="w-6 h-6 text-village-600" />
          <span>{t('settingsHeader')}</span>
        </h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {lang === 'hi' ? 'अपनी पहुँच आवश्यकताओं के अनुसार ऐप को अनुकूलित करें।' : 'Customize visual, audio, and language options for your convenience.'}
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Languages & Visuals Card */}
        <Card hover={false} className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center space-x-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Languages className="w-4 h-4 text-village-600" />
            <span>{lang === 'hi' ? 'भाषा और रंग' : 'Language & Display'}</span>
          </h3>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <span className="text-xs font-extrabold text-slate-750 dark:text-slate-200 block">
                {t('language')}
              </span>
              <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500">
                {lang === 'hi' ? 'मुख्य भाषा बदलें' : 'Choose primary language'}
              </span>
            </div>
            <LanguageToggle />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-extrabold text-slate-750 dark:text-slate-200 block">
                {lang === 'hi' ? 'रंग थीम' : 'Color Scheme'}
              </span>
              <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500">
                {lang === 'hi' ? 'डार्क या लाइट मोड बदलें' : 'Switch between dark and light themes'}
              </span>
            </div>
            <DarkModeToggle />
          </div>
        </Card>

        {/* Accessibility Adaptability */}
        <Card hover={false} className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center space-x-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Eye className="w-4 h-4 text-village-600" />
            <span>{lang === 'hi' ? 'विशेष अनुकूलन' : 'Accessibility Features'}</span>
          </h3>

          {/* Large Fonts Option */}
          <div className="flex items-center justify-between py-2">
            <div className="max-w-[70%]">
              <span className="text-xs font-extrabold text-slate-750 dark:text-slate-200 block">
                {t('largeFont')}
              </span>
              <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 block leading-tight mt-0.5">
                {lang === 'hi' ? 'आसानी से पढ़ने के लिए स्क्रीन के सभी अक्षरों को बड़ा करें।' : 'Increases layout and body text dimensions for enhanced readability.'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={largeFonts}
              onChange={(e) => setLargeFonts(e.target.checked)}
              className="w-5 h-5 rounded-lg border-slate-350 accent-village-600 cursor-pointer"
            />
          </div>

          {/* Voice Prompts Option */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-[70%]">
              <span className="text-xs font-extrabold text-slate-750 dark:text-slate-200 block">
                {t('voiceNav')}
              </span>
              <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 block leading-tight mt-0.5">
                {lang === 'hi' ? 'नेविगेट करते समय प्रत्येक पृष्ठ की ध्वनि सहायता सक्षम करें।' : 'Enables speech synthesizer feedback alerts upon route switches.'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={voiceNav}
              onChange={(e) => setVoiceNav(e.target.checked)}
              className="w-5 h-5 rounded-lg border-slate-350 accent-village-600 cursor-pointer"
            />
          </div>

          {/* High Contrast Option */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-[70%]">
              <span className="text-xs font-extrabold text-slate-750 dark:text-slate-200 block">
                {t('highContrast')}
              </span>
              <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 block leading-tight mt-0.5">
                {lang === 'hi' ? 'बेहतर कंट्रास्ट के लिए गहरे रंग और सफेद बॉर्डर लागू करें।' : 'Sets deep white/black contrasting background themes.'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-5 h-5 rounded-lg border-slate-350 accent-village-600 cursor-pointer"
            />
          </div>
        </Card>

        {/* Action Button */}
        <Button onClick={handleSave} className="w-full sm:w-auto flex items-center space-x-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>{lang === 'hi' ? 'परिवर्तन सहेजें' : 'Save Adjustments'}</span>
        </Button>

      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
