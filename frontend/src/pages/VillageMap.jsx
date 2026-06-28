import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Landmark, School, HeartPulse, Droplet, Store, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Loader from '../components/Loader';
import L from 'leaflet';
import { API_BASE_URL } from '../services/api';

// Import leaflet styles dynamically
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issues in Leaflet with webpack/vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function VillageMap() {
  const { t, lang } = useLanguage();
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Rampur village coordinates center
  const centerPosition = [26.8467, 80.9462];

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/map`)
      .then(res => res.json())
      .then(data => {
        setPins(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const createCustomIcon = (iconName) => {
    return new L.DivIcon({
      html: `<div class="w-8 h-8 rounded-full bg-village-600 text-white flex items-center justify-center shadow-lg border border-white">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
             </div>`,
      className: 'custom-leaflet-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">
          {t('mapHeader')}
        </h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {t('mapSubtitle')}
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Map canvas container */}
          <div className="lg:col-span-2 h-[480px] rounded-3xl overflow-hidden border border-white/20 dark:border-white/5 shadow-xl glass">
            <MapContainer 
              center={centerPosition} 
              zoom={15} 
              style={{ width: '100%', height: '100%' }}
              className="z-10"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {pins.map((pin) => (
                <Marker 
                  key={pin.id} 
                  position={[pin.lat, pin.lng]}
                  icon={createCustomIcon(pin.icon)}
                >
                  <Popup>
                    <div className="text-xs font-sans p-1">
                      <span className="text-[10px] font-bold text-village-600 uppercase block mb-0.5">
                        {pin.type}
                      </span>
                      <h4 className="font-extrabold text-slate-800 mb-1">
                        {lang === 'hi' ? pin.name_hi : pin.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-550">
                        {lang === 'hi' ? pin.desc_hi : pin.desc}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Landmarks Details list */}
          <Card hover={false} className="space-y-4 h-[480px] overflow-y-auto">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
              <MapPin className="w-4 h-4 text-village-600" />
              <span>{lang === 'hi' ? 'ग्राम लैंडमार्क्स' : 'Village Landmarks'}</span>
            </h3>
            <div className="space-y-3">
              {pins.map((pin) => (
                <div 
                  key={pin.id} 
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm flex items-start space-x-3.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-village-500/10 text-village-650 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase text-slate-400 block mb-0.5">
                      {pin.type}
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                      {lang === 'hi' ? pin.name_hi : pin.name}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-450 dark:text-slate-500 mt-0.5 leading-relaxed">
                      {lang === 'hi' ? pin.desc_hi : pin.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      )}

    </div>
  );
}
