// src/Home.js (FULL CODE)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 

// Import Pages and Layout
import Dashboard from './Dashboard';
import LoginRegister from './components/LoginRegister';
import Layout from './components/Layout'; 
import About from './pages/About'; 
import Contact from './pages/Contact'; 


// Component: The home page that renders the core app logic
const HomeContent = () => {
    const { loading } = useAuth();
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-xl font-semibold text-indigo-600">Loading Application...</div>
            </div>
        );
    }
    
    // Always render the Dashboard component. It will now automatically
    // load data for the anonymous user and present the full UI.
    return <Dashboard />;
};


// AppContent handles the main routing definitions
const AppContent = () => {
    return (
        <Routes>
            {/* The root path (/) now renders the full application */}
            <Route path="/" element={<HomeContent />} />
            
            {/* The dedicated login/upgrade path */}
            <Route path="/login" element={<LoginRegister />} />
            
            {/* Public pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Fallback for any unmatched routes */}
            <Route path="*" element={<HomeContent />} />
        </Routes>
    );
};


// Home component provides the Authentication Context and the Router
const Home = () => (
    <Router>
        <AuthProvider>
            <Layout>
                <AppContent />
            </Layout>
        </AuthProvider>
    </Router>
);

export default Home;