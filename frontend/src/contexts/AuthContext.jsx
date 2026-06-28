import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // 1. REAL SUPABASE AUTHENTICATION
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          fetchRealProfile(session.user.id);
        } else {
          setLoading(false);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            setUser(session.user);
            fetchRealProfile(session.user.id);
          } else {
            setUser(null);
            setProfile(null);
            setLoading(false);
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // 2. DEMO MODE FALLBACK AUTHENTICATION
      const storedUser = localStorage.getItem('gramsathi_mock_user');
      const storedProfile = localStorage.getItem('gramsathi_mock_profile');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      setLoading(false);
    }
  }, []);

  const fetchRealProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (!error && data) {
        setProfile(data);
      } else {
        // Create initial profile if missing
        const newProfile = { id: userId, full_name: 'Gram Sathi User', phone: '', village: '', state: '' };
        setProfile(newProfile);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setLoading(false);
        throw error;
      }
      return data;
    } else {
      // Mock Success login
      const mockUser = { id: 'mock-user-123', email };
      const mockProfile = JSON.parse(localStorage.getItem('gramsathi_mock_profile')) || {
        id: 'mock-user-123',
        full_name: 'Moksh Patel',
        phone: '9876543210',
        village: 'Rampur',
        state: 'Gujarat',
        occupation: 'Farmer',
        aadhaar: 'XXXX-XXXX-1234'
      };
      
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem('gramsathi_mock_user', JSON.stringify(mockUser));
      localStorage.setItem('gramsathi_mock_profile', JSON.stringify(mockProfile));
      setLoading(false);
      return { user: mockUser };
    }
  };

  const signup = async (email, password, profileDetails) => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setLoading(false);
        throw error;
      }
      if (data.user) {
        const newProfile = {
          id: data.user.id,
          full_name: profileDetails.fullName || '',
          phone: profileDetails.phone || '',
          village: profileDetails.village || '',
          state: profileDetails.state || '',
          occupation: profileDetails.occupation || '',
          aadhaar: profileDetails.aadhaar || ''
        };
        await supabase.from('profiles').upsert(newProfile);
        setProfile(newProfile);
      }
      setLoading(false);
      return data;
    } else {
      // Mock Signup
      const mockUser = { id: 'mock-user-123', email };
      const mockProfile = {
        id: 'mock-user-123',
        full_name: profileDetails.fullName || 'Moksh Patel',
        phone: profileDetails.phone || '9876543210',
        village: profileDetails.village || 'Rampur',
        state: profileDetails.state || 'Gujarat',
        occupation: profileDetails.occupation || 'Farmer',
        aadhaar: profileDetails.aadhaar || 'XXXX-XXXX-1234'
      };

      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem('gramsathi_mock_user', JSON.stringify(mockUser));
      localStorage.setItem('gramsathi_mock_profile', JSON.stringify(mockProfile));
      setLoading(false);
      return { user: mockUser };
    }
  };

  const logout = async () => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem('gramsathi_mock_user');
    localStorage.removeItem('gramsathi_mock_profile');
    setLoading(false);
  };

  const updateProfile = async (details) => {
    setLoading(true);
    if (isSupabaseConfigured && supabase && user) {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...details });
      if (error) {
        setLoading(false);
        throw error;
      }
      setProfile({ id: user.id, ...details });
    } else {
      const updatedProfile = { ...profile, ...details };
      setProfile(updatedProfile);
      localStorage.setItem('gramsathi_mock_profile', JSON.stringify(updatedProfile));
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isMock, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
