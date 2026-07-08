import React from 'react';

export function Card({ children, title, className = "" }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-glass-hover transition-all duration-500 ease-out p-6 group ${className}`}>
      {title && (
        <h2 className="text-xl font-bold text-messias-dark mb-4 pb-2 border-b border-gray-100 group-hover:border-gray-200 transition-colors">
          {title}
        </h2>
      )}
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
}
