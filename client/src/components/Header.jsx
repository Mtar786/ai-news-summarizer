import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/favorites', label: 'Favorites' },
  ];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-blue-600">AI News Summarizer</h1>
        <nav className="space-x-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium ${isActive ? 'text-blue-600 underline' : 'text-gray-700 hover:text-blue-500'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;