import React, { useEffect, useState } from 'react';
import { Shield, ShieldAlert, Phone, User, Landmark, PlusSquare, HelpCircle, HeartPulse, Flame } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { API_BASE_URL } from '../services/api';

export default function Emergency() {
  const { t, lang } = useLanguage();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/emergency`)
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Map local icon names to actual Lucide components
  const iconMap = {
    ShieldAlert: ShieldAlert,
    HeartPulse: HeartPulse,
    Flame: Flame,
    Phone: Phone,
    Landmark: Landmark,
    PlusSquare: PlusSquare
  };

  return (
    <div className="space-y-6">
      
      {/* Header banner */}
      <div className="p-6 rounded-3xl bg-red-500/10 dark:bg-red-500/5 border border-red-500/30 text-center space-y-2">
        <Shield className="w-10 h-10 text-red-600 dark:text-red-400 mx-auto animate-bounce" />
        <h2 className="text-2xl font-black text-red-600 dark:text-red-400">
          {lang === 'hi' ? 'आपातकालीन नागरिक हेल्पलाइन' : 'Emergency Citizen Support'}
        </h2>
        <p className="text-xs font-bold text-slate-650 dark:text-slate-350 max-w-md mx-auto leading-relaxed">
          {lang === 'hi' 
            ? 'नीचे दिए गए किसी भी लाल बटन पर क्लिक करके सीधे आपातकालीन सेवाओं से संपर्क करें।' 
            : 'Click any red dial button below to make a direct connection to active responders.'}
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, i) => {
            const Icon = iconMap[contact.icon] || HelpCircle;
            return (
              <Card 
                key={i} 
                hover={false} 
                className="bg-red-500/5 dark:bg-red-500/5 border border-red-500/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-800 dark:text-white leading-tight">
                        {lang === 'hi' ? contact.name_hi : contact.name}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mt-0.5">
                        {contact.designation}
                      </span>
                    </div>
                  </div>
                  
                  {contact.operator && (
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center">
                      <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      <span>{contact.operator}</span>
                    </p>
                  )}
                </div>

                <a
                  href={`tel:${contact.phone}`}
                  className="w-full flex items-center justify-center space-x-1.5 px-4 py-3 rounded-2xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition mt-6 shadow-md shadow-red-500/10"
                >
                  <Phone className="w-4 h-4" />
                  <span className="uppercase tracking-wider">Dial {contact.phone}</span>
                </a>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
}
