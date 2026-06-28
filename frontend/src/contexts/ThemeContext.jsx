import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('gramsathi_theme') === 'dark' || 
      (!('gramsathi_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('gramsathi_font_size') || '16', 10);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('gramsathi_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('gramsathi_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('gramsathi_font_size', fontSize.toString());
  }, [fontSize]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
