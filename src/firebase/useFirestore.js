// src/firebase/useFirestore.js (FULL CODE)

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, runTransaction, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, APP_ID } from './firebaseConfig';
import { useAuth } from '../context/AuthContext';

// Helper function to get the secure collection reference
const getCollectionRef = (userId) => {
    // Secure path: artifacts/{appId}/users/{userId}/transactions
    const path = `artifacts/${APP_ID}/users/${userId}/transactions`;
    return collection(db, path);
};

export const useFirestore = () => {
    const { userId } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Real-time data listener (Always active for any user, even anonymous)
    useEffect(() => {
        if (!userId) {
            setTransactions([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const colRef = getCollectionRef(userId);
        const q = query(colRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedTransactions = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id, // Include document ID
            }));
            setTransactions(fetchedTransactions);
            setLoading(false);
        }, (error) => {
            console.error("Firestore listen failed:", error);
            setLoading(false);
        });

        return unsubscribe; // Cleanup listener
    }, [userId]);

    // 2. Function to add new data (Same logic for anonymous or registered)
    const addTransaction = async (data) => {
        if (!userId) {
            console.error("Cannot add transaction: User ID is missing.");
            return;
        }
        try {
            await addDoc(getCollectionRef(userId), {
                ...data,
                createdAt: serverTimestamp(),
                userId: userId,
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };
    
    // 3. Migration Logic (Transactionally moves data from oldId to newId)
    const migrateData = async (oldUserId, newUserId) => {
        if (!oldUserId || !newUserId || oldUserId === newUserId) return;

        const oldRef = getCollectionRef(oldUserId);
        const newRef = getCollectionRef(newUserId);

        await runTransaction(db, async (transaction) => {
            // Read all documents from the anonymous account
            const oldSnapshot = await getDocs(oldRef);

            if (!oldSnapshot.empty) {
                // Copy all documents to the permanent account
                oldSnapshot.docs.forEach((docSnap) => {
                    const data = docSnap.data();
                    const newDocRef = doc(newRef); // Firestore will generate a new document ID
                    transaction.set(newDocRef, data);
                    
                    // Mark old document for deletion
                    transaction.delete(doc(oldRef, docSnap.id)); 
                });
            }
        });
        
        console.log(`Data successfully migrated from ${oldUserId} to ${newUserId}`);
    };

    return { transactions, loading, addTransaction, migrateData };
};