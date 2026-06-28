import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Mail, Lock, User, Phone, MapPin, Briefcase, FileText, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Toast from '../components/Toast';

export default function Signup() {
  const { t } = useLanguage();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !fullName || !phone || !village || !state) {
      setToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, {
        fullName,
        phone,
        village,
        state,
        occupation,
        aadhaar
      });
      setToast({ message: 'Account registered successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setToast({ message: err.message || 'Signup failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-village-50 dark:bg-village-950 px-4 sm:px-6 transition-colors duration-300 relative overflow-hidden py-12">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-village-600/10 rounded-full blur-3xl animate-pulse" />

      {/* Signup Card */}
      <div className="w-full max-w-2xl p-8 rounded-3xl border border-white/20 dark:border-white/5 glass-panel shadow-2xl space-y-6 relative z-10">
        
        {/* App Logo Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link to="/" className="w-12 h-12 rounded-xl bg-gradient-to-tr from-village-600 to-emerald-400 flex items-center justify-center shadow-lg text-white font-bold text-xl">
            <Landmark className="w-6 h-6 animate-pulse" />
          </Link>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">
            {t('signup')}
          </h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {t('tagline')}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ramesh Kumar"
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              Village Name *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="Rampur"
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              State Name *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Uttar Pradesh"
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              Occupation
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="Farmer, Electrician, etc."
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              Aadhaar Card Number
            </label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                placeholder="12-digit UID Number"
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sathi@village.com"
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-village-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full flex items-center justify-center py-3.5 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-village-600 to-emerald-500 hover:from-village-700 hover:to-emerald-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{t('signup')}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </form>

        {/* Login Redirect */}
        <div className="pt-2 text-center text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>Already registered? </span>
          <Link to="/login" className="text-village-600 dark:text-village-400 hover:underline">
            {t('login')}
          </Link>
        </div>
      </div>

      {/* Success/Error Alerts */}
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
