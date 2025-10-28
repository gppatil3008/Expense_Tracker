// src/components/TransactionItem.js (FULL CODE - Conditional Date Fix)

import React from 'react';

const TransactionItem = ({ transaction }) => {
  const isIncome = transaction.amount > 0;
  const sign = isIncome ? '+' : '-';
  const amountDisplay = `${sign}₹${Math.abs(transaction.amount).toFixed(2)}`;
  
  // --- FIX ISOLATED HERE ---
  // Determine the final Date object:
  // 1. If createdAt is a Firestore Timestamp (i.e., it has the .toDate method), use .toDate().
  // 2. If createdAt is a standard JavaScript Date object (from Guest mode), use it directly.
  const dateObj = transaction.createdAt 
    ? (transaction.createdAt.toDate 
        ? transaction.createdAt.toDate() // Logged-in (Firestore Timestamp)
        : transaction.createdAt)        // Guest (Standard Date Object)
    : null;
  // --- END OF FIX ---

  // Use a fallback display if the date conversion fails (checks if dateObj is a valid date)
  const dateDisplay = dateObj && !isNaN(dateObj) ? dateObj.toLocaleDateString() : 'N/A';

  return (
    <li
      className={`flex justify-between items-center p-3 my-2 border-l-4 rounded-lg shadow-sm transition duration-100 
      ${isIncome ? "border-green-600 bg-green-50" : "border-red-600 bg-red-50"}`}
    >
      <div>
        <span className="font-semibold text-gray-800">{transaction.text}</span>
        <span className="text-xs text-gray-500 block">{dateDisplay}</span>
      </div>
      <span className={`font-extrabold text-lg ${isIncome ? 'text-green-700' : 'text-red-700'}`}>
        {amountDisplay}
      </span>
    </li>
  );
};

export default TransactionItem;