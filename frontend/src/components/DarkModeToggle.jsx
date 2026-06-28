import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-xl border border-slate-300/60 dark:border-white/10 text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-village-900/30 hover:bg-slate-100 dark:hover:bg-village-800/40 transition duration-200 focus:outline-none focus:ring-2 focus:ring-village-500 overflow-hidden relative"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={darkMode ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0, rotate: 45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: -45 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
