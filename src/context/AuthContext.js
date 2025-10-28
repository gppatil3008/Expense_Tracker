// src/context/AuthContext.js (FULL CODE - Removed Anonymous Sign-in)

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up the listener for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      // If user is null (guest), just set the state to null. No automatic sign-in.
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const value = {
    currentUser,
    // userId is null for guests, UID for logged-in users
    userId: currentUser ? currentUser.uid : null, 
    // isAnonymous is false for guests, false for logged-in (no anonymous accounts exist)
    isAnonymous: false, 
    loading,
    register: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    logout: () => signOut(auth),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-indigo-600">Loading Authentication...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};