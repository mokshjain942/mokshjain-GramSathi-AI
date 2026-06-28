import React from 'react';

export default function Card({ children, className = '', hover = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl p-6 glass-card transition-all duration-300 select-none
        ${hover ? 'hover:transform hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/30' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
