import React, { useState } from 'react';
import { User, Phone, MapPin, Briefcase, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Toast from '../components/Toast';

export default function ProfilePage() {
  const { t, lang } = useLanguage();
  const { user, profile, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [village, setVillage] = useState(profile?.village || '');
  const [state, setState] = useState(profile?.state || '');
  const [occupation, setOccupation] = useState(profile?.occupation || '');
  const [aadhaar, setAadhaar] = useState(profile?.aadhaar || '');

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProfile({
        full_name: fullName,
        phone,
        village,
        state,
        occupation,
        aadhaar
      });
      setToast({ message: lang === 'hi' ? 'प्रोफ़ाइल विवरण सहेजे गए!' : 'Profile details updated successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message || 'Update failed', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center space-x-2">
          <User className="w-6 h-6 text-village-600" />
          <span>{t('profileHeader')}</span>
        </h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {lang === 'hi' ? 'अपने पंचायत रिकॉर्ड और एआई सुझावों को बेहतर बनाने के लिए जानकारी अपडेट करें।' : 'Keep your details updated for personalized government scheme eligibility matching.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card hover={false} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              {t('fullName')} *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              {t('phone')} *
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              {t('villageName')} *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              {t('stateName')} *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              {t('occupation')}
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              {t('aadhaar')}
            </label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              Registered Email Address (View Only)
            </label>
            <input
              type="text"
              disabled
              value={user?.email || 'sathi@gramsathi.com'}
              className="w-full px-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-100 dark:bg-slate-950 text-slate-400 cursor-not-allowed"
            />
          </div>

        </Card>

        {/* Save button */}
        <Button 
          type="submit" 
          disabled={saving} 
          className="w-full sm:w-auto flex items-center space-x-1.5"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          <span>{t('saveProfile')}</span>
        </Button>
      </form>

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
