// src/index.js

// Import React core library
import React from 'react';
// Import ReactDOM to hook React into the browser's DOM
import ReactDOM from 'react-dom/client';
// Import global styles
import './index.css';
// Import the main application component
import App from './App';
// Import the performance monitoring utility
import reportWebVitals from './reportWebVitals';

// Find the HTML element with id='root' and prepare it for React rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the entire <App /> component into the root element
root.render(
  // StrictMode helps identify potential problems in development
  <React.StrictMode>
    <App /> // Start the Expense Tracker application here
  </React.StrictMode>
);

// Start measuring application performance
reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals