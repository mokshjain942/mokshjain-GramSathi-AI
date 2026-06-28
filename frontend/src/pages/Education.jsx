import React, { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Landmark, Briefcase, Award, Search, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { API_BASE_URL } from '../services/api';

export default function Education() {
  const { t, lang } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [scholarshipSearch, setScholarshipSearch] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/education`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredScholarships = data?.scholarships.filter(s => {
    const q = scholarshipSearch.toLowerCase();
    return s.name.toLowerCase().includes(q) || (s.name_hi && s.name_hi.toLowerCase().includes(q));
  }) || [];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">
          {t('educationHeader')}
        </h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {t('educationSubtitle')}
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-8">
          
          {/* E-Learning Lessons */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
              <BookOpen className="w-4.5 h-4.5 text-village-600 dark:text-village-400" />
              <span>{t('eLearning')}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data?.lessons.map((lesson, idx) => (
                <Card key={idx} hover className="flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-village-600 dark:text-village-400 uppercase bg-village-500/10 px-2 py-0.5 rounded-lg inline-block mb-3">
                      {lesson.level}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white mb-1.5 leading-snug">
                      {lang === 'hi' ? lesson.title_hi : lesson.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-normal">
                      {lang === 'hi' ? lesson.desc_hi : lesson.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-village-600 dark:text-village-400">
                    <span>{lesson.duration}</span>
                    <span className="hover:underline cursor-pointer">Start Class</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Scholarships */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
                <Award className="w-4.5 h-4.5 text-village-600 dark:text-village-400" />
                <span>{t('scholarships')}</span>
              </h3>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search scholarship..."
                  value={scholarshipSearch}
                  onChange={(e) => setScholarshipSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-450 focus:outline-none focus:ring-1 focus:ring-village-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <th className="px-4 py-3">Scholarship Name</th>
                    <th className="px-4 py-3">Eligibility Details</th>
                    <th className="px-4 py-3">Reward Value</th>
                    <th className="px-4 py-3">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {filteredScholarships.map((sch, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="px-4 py-3.5 font-bold text-slate-800 dark:text-white">
                        {lang === 'hi' ? sch.name_hi : sch.name}
                      </td>
                      <td className="px-4 py-3.5">
                        {lang === 'hi' ? sch.eligible_hi : sch.eligible}
                      </td>
                      <td className="px-4 py-3.5 text-village-600 dark:text-village-400 font-bold">
                        {sch.value}
                      </td>
                      <td className="px-4 py-3.5 text-slate-400">{sch.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Village Schools */}
            <Card hover={false} className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
                <Landmark className="w-4.5 h-4.5 text-village-600 dark:text-village-400" />
                <span>{t('villageSchools')}</span>
              </h3>
              <div className="space-y-3">
                {data?.schools.map((school, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase block">
                        {school.type}
                      </span>
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                        {lang === 'hi' ? school.name_hi : school.name}
                      </span>
                    </div>
                    <div className="text-[10px] text-right font-bold text-slate-400 uppercase space-y-0.5">
                      <p>Teachers: {school.teachers}</p>
                      <p>Students: {school.students}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Career Path Advisor */}
            <Card hover={false} className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
                <Briefcase className="w-4.5 h-4.5 text-village-600 dark:text-village-400" />
                <span>{t('careerGuide')}</span>
              </h3>
              <div className="space-y-3">
                {data?.career_guides.map((career, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-gradient-to-tr from-village-500/5 to-emerald-500/5 border border-slate-200/50 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold text-village-600 dark:text-village-400 uppercase tracking-wider block">
                      {career.field}
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                      {lang === 'hi' ? career.title_hi : career.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                      {lang === 'hi' ? career.desc_hi : career.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

          </div>

        </div>
      )}

    </div>
  );
}
