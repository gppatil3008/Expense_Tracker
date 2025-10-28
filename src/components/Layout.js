// src/components/Layout.js (Final Attempt - Overriding Visual State)

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import FTrackerLogo from '../assets/ftracker_logo.png'; 

const Header = () => {
  const { currentUser, isAnonymous, loading, logout } = useAuth(); 
  const location = useLocation(); 

  const navLinkClass = (path) => 
    `transition duration-150 font-medium ${location.pathname === path ? 'text-white border-b-2 border-white' : 'text-indigo-200 hover:text-white'}`;
    
  // --- FINAL LOGIC: Check for PERMANENT User ---
  // Show Logout only if the user is explicitly NOT anonymous AND exists.
  const isPermanentUser = !loading && currentUser && !isAnonymous;

  return (
    <header className="bg-indigo-700 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-extrabold text-white tracking-wider flex items-center space-x-2">
            <img src={FTrackerLogo} alt="F-Tracker Logo" className="h-8 w-auto" />
            <span className="text-xl font-extrabold hidden sm:inline">F-Tracker</span>
          </Link>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex space-x-6">
          
          <Link to="/" className={navLinkClass('/')}>
            Dashboard
          </Link>
          <Link to="/about" className={navLinkClass('/about')}>
            About Us
          </Link>
          <Link to="/contact" className={navLinkClass('/contact')}>
            Contact Us
          </Link>

          {/* Login/Logout Links */}
          {isPermanentUser ? (
            // User is a permanent, registered user: Show Logout
            <button 
              onClick={logout} 
              className="text-white bg-red-500 hover:bg-red-400 px-3 py-1 rounded-full text-sm font-medium"
            >
              Logout
            </button>
          ) : (
            // User is Anonymous (or null): Show Login/Register
            <Link to="/login" className="text-white bg-green-500 hover:bg-green-400 px-3 py-1 rounded-full text-sm font-medium">
              Login/Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-gray-800 text-white mt-12 py-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
      &copy; {new Date().getFullYear()} Finance Tracker App. All rights reserved.
    </div>
  </footer>
);

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;