// src/index.js (FINAL ENTRY POINT)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Import the new root component (which handles Login/Dashboard)
import Home from './Home'; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Renders Home.js */}
    <Home />
  </React.StrictMode>
);

reportWebVitals();