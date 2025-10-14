// src/App.js

// 1. IMPORT LIBRARIES AND HOOKS
// Import React core library and the useState hook for state management.
import React, { useState } from "react";
// Import necessary components for rendering the Pie Chart visualization.
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Define the main application component
function App() {
  // 2. STATE MANAGEMENT (React Hooks)
  // 'transactions' holds the list of all income/expense records.
  const [transactions, setTransactions] = useState([]);
  // 'text' holds the description input for a new transaction.
  const [text, setText] = useState("");
  // 'amount' holds the numerical input for a new transaction.
  const [amount, setAmount] = useState("");

  // 3. TRANSACTION LOGIC
  // Function to add a new transaction to the state.
  const addTransaction = () => {
    // Basic validation: stop if text or amount is empty.
    if (!text || !amount) return;
    
    // Create the new transaction object.
    const newTransaction = {
      id: Date.now(), // Use current timestamp as a unique ID
      text,
      amount: parseFloat(amount), // Convert input string to a number
    };
    
    // Update the transactions state: prepend the new transaction to the existing list.
    setTransactions([newTransaction, ...transactions]);
    
    // Clear the input fields after successful submission.
    setText("");
    setAmount("");
  };

  // 4. INCOME/EXPENSE CALCULATIONS
  
  // Calculate total income: filter transactions with amount > 0 and sum them up.
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  // Calculate total expense: filter transactions with amount < 0 and sum them up.
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  // Calculate the total balance (Income + Expense, since expense is a negative number).
  const balance = income + expense;

  // 5. PIE CHART DATA SETUP
  // Format the calculated income and expense data for the recharts PieChart component.
  const data = [
    { name: "Income", value: income },
    // Use Math.abs() to display expenses as a positive magnitude in the chart.
    { name: "Expense", value: Math.abs(expense) },
  ];
  // Define colors for the chart segments (green for income, red for expense).
  const COLORS = ["#4ade80", "#f87171"];

  // 6. COMPONENT RETURN (JSX)
  return (
    // Main container (uses Tailwind CSS for styling the layout)
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">💰 Finance Tracker</h1>

        {/* Display Balance, Income, and Expense totals */}
        <h2 className="text-lg font-semibold">Balance: ₹{balance.toFixed(2)}</h2>
        
        {/* Pie Chart Visualization */}
        <PieChart width={300} height={200}>
          <Pie
            data={data} // Pass the formatted income/expense data
            dataKey="value" // Specify which field contains the size value
            cx="50%"
            cy="50%"
            outerRadius={70}
            label // Display labels on the chart slices
          >
            {/* Map over data to assign colors to each slice */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Input Form for New Transactions */}
        <div className="mt-6">
          {/* Input field for the transaction description */}
          <input
            type="text"
            placeholder="Enter text..."
            value={text}
            // Update the 'text' state on every change
            onChange={(e) => setText(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          {/* Input field for the transaction amount */}
          <input
            type="number"
            placeholder="Enter amount (use - for expense)"
            value={amount}
            // Update the 'amount' state on every change
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          {/* Button calls addTransaction function on click */}
          <button
            onClick={addTransaction}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Add Transaction
          </button>
        </div>

        {/* Transaction History List */}
        <ul className="mt-6">
          {/* Map through all transactions to display them */}
          {transactions.map((t) => (
            <li
              key={t.id}
              // Dynamically set border color based on amount (income or expense)
              className={`flex justify-between p-2 my-1 border-l-4 ${
                t.amount > 0 ? "border-green-500" : "border-red-500"
              }`}
            >
              <span>{t.text}</span>
              <span>
                {/* Format display: prefix income with + and expense with - */}
                {t.amount > 0 ? `+₹${t.amount}` : `-₹${Math.abs(t.amount)}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Export the component for use in index.js
export default App;