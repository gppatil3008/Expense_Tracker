// src/components/TransactionForm.js (FULL CODE)

import React, { useState } from "react";

// The component no longer relies on useFirestore internally
const TransactionForm = ({ onAddTransaction }) => { 
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const submitTransaction = (type) => {
    if (!text || !amount || parseFloat(amount) <= 0) {
        alert("Please enter a description and a positive amount.");
        return;
    }
    
    let finalAmount = parseFloat(amount);
    if (type === 'expense') {
        finalAmount *= -1;
    }

    // Call the handler passed from Dashboard (which handles the persistence logic)
    onAddTransaction({ text, amount: finalAmount, }); 
    
    // Clear form
    setText("");
    setAmount("");
  };

  return (
    <div className="mt-4"> 
      {/* Text Input */}
      <input
        type="text"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-gray-300 p-3 rounded-lg w-full mb-3 focus:ring-indigo-500 focus:border-indigo-500 border"
        maxLength={50}
      />
      
      {/* Amount Input */}
      <input
        type="number"
        placeholder="Enter amount (e.g., 500)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border-gray-300 p-3 rounded-lg w-full mb-4 focus:ring-indigo-500 focus:border-indigo-500 border"
        min="0.01" step="0.01"
      />
      
      {/* Income/Expense Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => submitTransaction('income')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded-lg flex-1 transition duration-150 shadow-md"
        >
          ➕ Add Income
        </button>
        
        <button
          onClick={() => submitTransaction('expense')}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg flex-1 transition duration-150 shadow-md"
        >
          ➖ Add Expense
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;