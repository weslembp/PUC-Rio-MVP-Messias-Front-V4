import React from 'react';
import { Link } from 'react-router-dom';

export function Header({ currentPath }) {
  return (
    <nav className="flex space-x-2 border-b border-gray-200/50 pb-4">
      <Link 
        to="/" 
        className={`nav-pill ${currentPath === '/' ? 'active' : ''}`}
      >
        Orders
      </Link>
      
      <Link 
        to="/nova-op" 
        className={`nav-pill ${currentPath === '/nova-op' ? 'active' : ''}`}
      >
        Product (Nova OP)
      </Link>
    </nav>
  );
}
