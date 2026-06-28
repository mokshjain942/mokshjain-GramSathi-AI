import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  type = 'button',
  disabled = false,
  className = ''
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-wide rounded-2xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-village-500 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-village-600 to-emerald-500 hover:from-village-700 hover:to-emerald-600 text-white shadow-md hover:shadow-lg shadow-village-500/10',
    secondary: 'bg-white/50 dark:bg-village-900/30 border border-slate-300/60 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-village-800/40',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/10',
    outline: 'border border-village-500 text-village-600 dark:text-village-400 hover:bg-village-500/10'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
