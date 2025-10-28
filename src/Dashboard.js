// src/Dashboard.js (FINAL CODE - Fixing Chart Overlap by Adjusting Inner Dimensions)

import React, { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"; 
import { useFirestore } from './firebase/useFirestore';
import { useAuth } from './context/AuthContext'; 
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import HistoryFilter from "./components/HistoryFilter"; 
import ExpensesBarChart from "./components/ExpensesBarChart"; 

// Initial state for the GUEST user
const INITIAL_TRANSACTIONS = [];

function Dashboard() {
  const { currentUser } = useAuth();
  const isUserLoggedIn = !!currentUser;
  
  // Conditional Data Source Setup
  const [guestTransactions, setGuestTransactions] = useState(INITIAL_TRANSACTIONS);
  const { transactions: firestoreTransactions, loading: firestoreLoading, addTransaction: addFirestoreTransaction } = useFirestore();
  const transactions = isUserLoggedIn ? firestoreTransactions : guestTransactions;
  const dataLoading = isUserLoggedIn ? firestoreLoading : false;

  const addTransactionHandler = (data) => {
    if (isUserLoggedIn) {
        addFirestoreTransaction(data);
    } else {
        const newTransaction = {
            ...data,
            id: Date.now(),
            createdAt: new Date(), 
        };
        setGuestTransactions(prev => [newTransaction, ...prev]);
    }
  };

  // Calculation and Filtering Logic
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');

  const filteredTransactions = useMemo(() => {
    if (dataLoading) return [];
    return transactions.filter(t => {
      const dateSource = t.createdAt instanceof Date ? t.createdAt : (t.createdAt ? t.createdAt.toDate() : null);
      if (!dateSource) return false;
      const transactionYear = dateSource.getFullYear().toString();
      const transactionMonth = dateSource.getMonth().toString();
      const yearMatch = !filterYear || filterYear === transactionYear;
      const monthMatch = !filterMonth || transactionMonth === filterMonth;
      return yearMatch && monthMatch;
    });
  }, [transactions, filterYear, filterMonth, dataLoading]);

  const income = transactions.filter((t) => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter((t) => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);
  const balance = income + expense;
  const data = [{ name: "Income", value: income }, { name: "Expense", value: Math.abs(expense) }];
  const COLORS = ["#4ade80", "#f87171"];

  const last7DaysExpenses = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6); 
    const dailyDataMap = new Map();
    for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo);
        date.setDate(sevenDaysAgo.getDate() + i);
        const key = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
        dailyDataMap.set(key, 0);
    }
    transactions.forEach(t => {
        if (t.amount < 0) {
            const dateObj = t.createdAt instanceof Date ? t.createdAt : (t.createdAt ? t.createdAt.toDate() : null);
            if (dateObj && dateObj >= sevenDaysAgo && dateObj <= today) {
                const key = dateObj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
                if (dailyDataMap.has(key)) {
                    dailyDataMap.set(key, dailyDataMap.get(key) + Math.abs(t.amount));
                }
            }
        }
    });
    return Array.from(dailyDataMap, ([name, amount]) => ({ 
        name, 
        amount: parseFloat(amount.toFixed(2)) 
    }));
  }, [transactions]);


  return (
    <div className="p-4 sm:p-6 flex justify-center min-h-screen items-start bg-gray-50">
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* --- COLUMN 1: SUMMARY (Desktop Left) --- */}
        <div className="lg:col-span-3 col-span-12 order-2 lg:order-1">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 h-min">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-4 border-b pb-2">Summary</h3>
                <div className="flex flex-col items-center">
                    <h4 className="text-md font-semibold text-gray-600 mb-4">Current Totals</h4>
                    
                    {/* Summary Pie Chart: Fixed size */}
                    <div className="w-full flex justify-center">
                        <PieChart width={150} height={150}> 
                            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>

                    <div className="w-full mt-4 space-y-2">
                        <div className="flex justify-between font-semibold">
                            <span>Income:</span>
                            <span className="text-green-600">₹{income.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Expenses:</span>
                            <span className="text-red-600">₹{expense.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-extrabold border-t pt-2">
                            <span>Total:</span>
                            <span className="text-indigo-700">₹{balance.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

        {/* --- COLUMN 2: MAIN TRACKER (Desktop Center) --- */}
        <div className="lg:col-span-6 col-span-12 order-1 lg:order-2 bg-white shadow-2xl rounded-3xl p-6 border border-gray-200">
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-indigo-700">💰 Finance Tracker</h1>
            </div>

            {/* Balance Display */}
            <div className="mb-4 text-center">
                <p className="text-xl font-bold text-gray-800">Balance: ₹{balance.toFixed(2)}</p>
            </div>

            {/* Main Pie Chart: Reduced Radius and Margin-Bottom (mb-6) */}
            <div className="flex justify-center w-full py-4 mb-6 min-h-0" style={{ height: '14rem' }}> 
                {data.length > 0 && ( 
                    <ResponsiveContainer width="100%" height="100%"> {/* Use 100% height/width */}
                        <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                          <Pie 
                            data={data} 
                            dataKey="value" 
                            cx="50%" 
                            cy="50%" 
                            innerRadius={20} // Added inner radius to ensure labels have room
                            outerRadius={60} 
                            fill="#8884d8" 
                            label
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
                {data.length === 0 && ( 
                    <div className="flex items-center justify-center h-full text-gray-500">
                        No financial data to display.
                    </div>
                )}
            </div>
            
            {/* Transaction Form (Should now sit well below the chart margin) */}
            <TransactionForm onAddTransaction={addTransactionHandler} />

            {!isUserLoggedIn && (
                <p className="text-center text-sm text-yellow-700 bg-yellow-100 p-2 rounded-lg mt-4 border border-yellow-300">
                    Data is temporary. **Login/Register** to save your history permanently.
                </p>
            )}

            <div className="mt-6 border-t pt-4">
                <h2 className="text-xl font-bold mb-3">Transaction History</h2>
                
                <HistoryFilter filterYear={filterYear} filterMonth={filterMonth} onFilterChange={(type, value) => type === 'year' ? setFilterYear(value) : setFilterMonth(value)} />
                
                {dataLoading ? (
                    <p className="text-center py-4 text-indigo-500 font-semibold">Loading permanent data...</p>
                ) : (
                    <TransactionList transactions={filteredTransactions} />
                )}
            </div>
        </div> 

        {/* --- COLUMN 3: 7-DAY EXPENSE (Desktop Right) --- */}
        <div className="lg:col-span-3 col-span-12 order-3 lg:order-3 h-64"> 
            <ExpensesBarChart recentExpenses={last7DaysExpenses} /> 
        </div>
      </div> 
    </div>
  );
}

export default Dashboard;