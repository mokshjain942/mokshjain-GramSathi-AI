import { useState, useEffect } from 'react';

export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveOfflineData = (key, data) => {
    try {
      localStorage.setItem(`gramsathi_offline_${key}`, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving offline data", e);
    }
  };

  const getOfflineData = (key) => {
    try {
      const data = localStorage.getItem(`gramsathi_offline_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error loading offline data", e);
      return null;
    }
  };

  return {
    isOnline,
    saveOfflineData,
    getOfflineData
  };
};
