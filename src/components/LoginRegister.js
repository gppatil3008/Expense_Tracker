// src/components/LoginRegister.js (FULL CODE - Added Redirect Logic)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🚨 NEW IMPORT
import { useAuth } from '../context/AuthContext';
import { useFirestore } from '../firebase/useFirestore';

const LoginRegister = () => {
  const { login, upgradeAnonymousUser, isAnonymous, currentUser } = useAuth();
  const { migrateData } = useFirestore();
  const navigate = useNavigate(); // 🚨 NEW: Initialize navigate hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    
    const oldUserId = isAnonymous ? currentUser.uid : null;

    try {
      if (isAnonymous) {
        // SCENARIO 1: UPGRADING ANONYMOUS ACCOUNT
        const newUser = await upgradeAnonymousUser(email, password);
        
        if (oldUserId && newUser.uid) {
            await migrateData(oldUserId, newUser.uid);
        }
        
      } else if (isRegistering) {
        // SCENARIO 2: REGULAR REGISTRATION (Disallowed in our scenario for simplicity)
        setError("Please use the 'Upgrade' process or simply log in if you already have an account.");
        setLoading(false);
        return;

      } else {
        // SCENARIO 3: REGULAR LOGIN
        await login(email, password);
      }
      
      // 🏆 SUCCESS REDIRECT: Navigate to the Dashboard (root path)
      navigate('/'); 

    } catch (e) {
      console.error(e);
      setError(e.message.split('(')[0].replace('Firebase: ', '') || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  // If the user is anonymous, change the text and UI to reflect "Upgrade"
  const title = isAnonymous 
    ? "Save Your History (Upgrade)" 
    : isRegistering ? "Register New Account" : "Sign In";
  
  const submitText = isAnonymous 
    ? "Save & Upgrade Account" 
    : isRegistering ? 'Register' : 'Sign In';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <form onSubmit={submitHandler} className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl w-full max-w-sm border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-indigo-700">
          {title}
        </h2>
        <p className="text-center text-md text-gray-500 mb-8">
          {isAnonymous ? "Create a password to keep your existing data." : "Use your existing credentials."}
        </p>

        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">{error}</p>}

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            placeholder="user@example.com"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            placeholder="********"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-150 shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : submitText}
        </button>

        {/* Switch Button (Only available when NOT anonymous, simplifying the upgrade path) */}
        {!isAnonymous && (
            <button
              type="button"
              onClick={() => setIsRegistering(prev => !prev)}
              className="mt-6 text-sm text-indigo-500 hover:text-indigo-700 w-full transition duration-150 underline-offset-4 hover:underline"
              disabled={loading}
            >
              {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register'}
            </button>
        )}
        
      </form>
    </div>
  );
};

export default LoginRegister;