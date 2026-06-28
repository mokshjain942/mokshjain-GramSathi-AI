import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ChatWindow from './ChatWindow';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';

export default function Layout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullPage />;
  }

  // Route protection - redirect unauthenticated users to landing/login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-village-50 dark:bg-village-950 transition-colors duration-300">
      <Navbar />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden min-h-[calc(100vh-8rem)]">
          <Outlet />
        </main>
      </div>

      <Footer />
      
      {/* Floating global chatbot tool */}
      <ChatWindow />
    </div>
  );
}
