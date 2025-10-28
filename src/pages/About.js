// src/pages/About.js

import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">About the Finance Tracker</h2>
      <p className="text-gray-700 mb-4">
        This is a modern, single-page application (SPA) built with **React** for the frontend, utilizing **Tailwind CSS** for responsive styling, and **Firebase/Firestore** for secure user authentication and persistent data storage.
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>**Goal:** Provide users with a clean, effective tool to track income and expenses.</li>
        <li>**Technology Stack:** React, React Router, Firebase Auth, Firestore, Recharts.</li>
        <li>**Key Feature:** Real-time data updates and filtering by month/year.</li>
      </ul>
    </div>
  );
};

export default About;