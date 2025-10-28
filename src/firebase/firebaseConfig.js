// src/firebase/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🚨🚨 CRUCIAL: Replace these with your actual Firebase project configuration 🚨🚨
const firebaseConfig = {
  apiKey: "AIzaSyAbipOD2t9417Sl4PF-woy4egLvBiUX5qc",
  authDomain: "expensetracker-8c7a8.firebaseapp.com",
  projectId: "expensetracker-8c7a8",
  storageBucket: "expensetracker-8c7a8.firebasestorage.app",
  messagingSenderId: "137398708196",
  appId: "1:137398708196:web:f15609896832e8eb9489f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you need
export const auth = getAuth(app);
export const db = getFirestore(app);
export const APP_ID = firebaseConfig.appId;