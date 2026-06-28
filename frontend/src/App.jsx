import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Schemes from './pages/Schemes';
import Healthcare from './pages/Healthcare';
import Education from './pages/Education';
import Businesses from './pages/Businesses';
import Emergency from './pages/Emergency';
import VillageMap from './pages/VillageMap';
import Announcements from './pages/Announcements';
import AIChat from './pages/AIChat';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Layout
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Sub-Dashboard Routes */}
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/healthcare" element={<Healthcare />} />
                <Route path="/education" element={<Education />} />
                <Route path="/businesses" element={<Businesses />} />
                <Route path="/map" element={<VillageMap />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/chat" element={<AIChat />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/emergency" element={<Emergency />} />
              </Route>

              {/* Wildcard 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}
