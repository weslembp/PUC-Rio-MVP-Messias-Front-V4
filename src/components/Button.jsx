import React from 'react';

export function Button({ children, onClick, variant = 'primary', type = 'button', disabled = false }) {
  const baseClass = "px-6 py-2.5 rounded-lg font-bold transition-all duration-300 ease-out flex items-center justify-center gap-2 transform will-change-transform";
  
  let variantClass = "";
  if (variant === 'primary') {
    variantClass = "bg-messias-red text-white hover:bg-messias-hover hover:-translate-y-0.5 hover:shadow-lg active:scale-95";
  } else if (variant === 'danger') {
    variantClass = "bg-transparent border border-red-500 text-red-500 hover:bg-red-50 hover:-translate-y-0.5 hover:shadow-md active:scale-95";
  } else if (variant === 'outline') {
    variantClass = "bg-transparent border border-gray-300 text-gray-700 hover:border-messias-red hover:text-messias-red hover:-translate-y-0.5 hover:shadow-md active:scale-95";
  }

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none active:scale-100" : "cursor-pointer";

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseClass} ${variantClass} ${disabledClass}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
