import React, { useEffect, useState } from 'react';
import { HeartPulse, Plus, CheckCircle, Bell, Trash2, Calendar, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { API_BASE_URL } from '../services/api';

export default function Healthcare() {
  const { t, lang } = useLanguage();
  const [hospitals, setHospitals] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Reminder Form States
  const [medName, setMedName] = useState('');
  const [medTime, setMedTime] = useState('');
  const [medDose, setMedDose] = useState('');

  const [tip, setTip] = useState('');

  useEffect(() => {
    // 1. Fetch Hospitals and tips from backend
    fetch(`${API_BASE_URL}/api/hospitals`)
      .then(res => res.json())
      .then(data => {
        setHospitals(data.hospitals);
        setTip(lang === 'hi' ? data.tip_hi : data.tip);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    // 2. Load Medicine reminders from LocalStorage
    const stored = localStorage.getItem('gramsathi_medicine_reminders');
    if (stored) {
      setReminders(JSON.parse(stored));
    }
  }, [lang]);

  const addReminder = (e) => {
    e.preventDefault();
    if (!medName.trim() || !medTime || !medDose.trim()) return;

    const newItem = {
      id: Date.now(),
      name: medName,
      time: medTime,
      dose: medDose,
      taken: false
    };

    const updated = [...reminders, newItem];
    setReminders(updated);
    localStorage.setItem('gramsathi_medicine_reminders', JSON.stringify(updated));

    // Reset Form
    setMedName('');
    setMedTime('');
    setMedDose('');
  };

  const toggleReminderTaken = (id) => {
    const updated = reminders.map(r => r.id === id ? { ...r, taken: !r.taken } : r);
    setReminders(updated);
    localStorage.setItem('gramsathi_medicine_reminders', JSON.stringify(updated));
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('gramsathi_medicine_reminders', JSON.stringify(updated));
  };

  const vaccineList = [
    { name: 'BCG (Tuberculosis)', age: 'At birth / जन्म के समय', type: 'Injection' },
    { name: 'OPV 1, 2, 3 (Polio)', age: '6, 10, 14 weeks / ६, १०, १४ सप्ताह', type: 'Oral drops' },
    { name: 'Pentavalent 1, 2, 3', age: '6, 10, 14 weeks / ६, १०, १४ सप्ताह', type: 'Injection' },
    { name: 'Measles / Rubella 1st Dose', age: '9-12 months / ९-१२ महीने', type: 'Injection' },
    { name: 'DPT Booster 1st Dose', age: '16-24 months / १६-२४ महीने', type: 'Injection' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">
          {t('healthcareHeader')}
        </h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {t('healthcareSubtitle')}
        </p>
      </div>

      {/* Wellness Tip Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-tr from-village-600/10 to-emerald-500/10 border border-village-500/25 glass flex items-start space-x-3.5 animate-in fade-in slide-in-from-top-4 duration-300">
        <HeartPulse className="w-6 h-6 text-village-600 dark:text-village-400 shrink-0 animate-pulse" />
        <div className="space-y-1">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-village-600 dark:text-village-400">
            {t('healthTips')}
          </h3>
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
            {tip || (lang === 'hi' ? 'खूब पानी पीएं और ताजी सब्जियां खाएं।' : 'Stay hydrated and consume fresh farm leafy vegetables daily.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Medicine Reminders Card */}
        <Card hover={false} className="space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
            <Bell className="w-4 h-4 text-village-600 dark:text-village-400" />
            <span>{t('medicineReminder')}</span>
          </h3>

          {/* Form */}
          <form onSubmit={addReminder} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50/50 dark:bg-slate-900/30 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800">
            <input
              type="text"
              required
              placeholder={lang === 'hi' ? 'दवा का नाम' : 'Medicine name'}
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-village-500"
            />
            <input
              type="text"
              required
              placeholder={lang === 'hi' ? 'खुराक (उदा: 1 गोली)' : 'Dose (eg: 1 pill)'}
              value={medDose}
              onChange={(e) => setMedDose(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-village-500"
            />
            <div className="flex gap-2">
              <input
                type="time"
                required
                value={medTime}
                onChange={(e) => setMedTime(e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-village-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-village-600 hover:bg-village-700 text-white shadow transition shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* List */}
          <div className="space-y-2">
            {reminders.length === 0 ? (
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 text-center py-4">
                {lang === 'hi' ? 'कोई अनुस्मारक नहीं जोड़ा गया।' : 'No reminders set. Use form above to add.'}
              </p>
            ) : (
              reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleReminderTaken(reminder.id)}
                      className={`p-1.5 rounded-xl transition ${reminder.taken ? 'text-emerald-500 bg-emerald-500/10' : 'text-slate-400 bg-slate-100 dark:bg-slate-800 hover:text-slate-600'}`}
                    >
                      <CheckCircle className="w-4.5 h-4.5" />
                    </button>
                    <div>
                      <span className={`text-xs font-extrabold block ${reminder.taken ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                        {reminder.name}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {reminder.time} | {reminder.dose}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="p-1.5 rounded-xl text-red-500 hover:bg-red-500/10 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Vaccination Calendar Card */}
        <Card hover={false} className="space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
            <Calendar className="w-4 h-4 text-village-600 dark:text-village-400" />
            <span>{t('vaccineTracker')}</span>
          </h3>

          <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-3">Vaccine</th>
                  <th className="px-4 py-3">Recommended Age</th>
                  <th className="px-4 py-3">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {vaccineList.map((vac, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="px-4 py-3.5 font-bold text-slate-800 dark:text-white">{vac.name}</td>
                    <td className="px-4 py-3.5">{vac.age}</td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-lg bg-village-500/10 text-village-700 dark:text-village-300 text-[10px] font-bold">
                        {vac.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Nearby Hospitals Directory */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
            <MapPin className="w-4 h-4 text-village-600 dark:text-village-400" />
            <span>{t('nearbyHospitals')}</span>
          </h3>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hospitals.map((hospital, idx) => (
                <Card key={idx} hover={false} className="flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-0.5 rounded-lg inline-block mb-2">
                      {hospital.type}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-800 dark:text-white">
                      {lang === 'hi' ? hospital.name_hi : hospital.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-village-600" />
                      {hospital.address}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-village-600" />
                      {hospital.timings}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {hospital.doctor}
                    </span>
                    <a
                      href={`tel:${hospital.phone}`}
                      className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-[11px] font-bold tracking-wider uppercase transition"
                    >
                      Call {hospital.phone}
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
