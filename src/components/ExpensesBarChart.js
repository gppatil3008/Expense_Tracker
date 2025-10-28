// src/components/ExpensesBarChart.js (FINAL FIX - Ensuring Fixed Pixel Dimensions)

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'; // ResponsiveContainer is removed

const ExpensesBarChart = ({ recentExpenses = [] }) => {
  if (recentExpenses.length === 0 || recentExpenses.every(d => d.amount === 0)) {
      return (
          // Container height matches the h-64 in Dashboard.js
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 h-64 flex items-center justify-center">
              <p className="text-gray-500">No expenses recorded in the last 7 days.</p>
          </div>
      );
  }
    
  return (
    // Container height matches the h-64 in Dashboard.js
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 h-64"> 
      <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Expenses - Last 7 days</h3>
      
      {/* 🚨 FIX IS HERE: Using fixed pixel values for BarChart dimensions */}
      <div className="flex justify-center">
          <BarChart 
            // FIXED WIDTH AND HEIGHT (Adjusted to fit inside the small column)
            width={300} 
            height={180} 
            data={recentExpenses} 
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} style={{ fontSize: '10px' }} />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `₹${value.toFixed(0)}`}
                domain={['auto', (dataMax) => Math.ceil(dataMax / 10) * 10]}
                style={{ fontSize: '10px' }}
            />
            <Tooltip 
                formatter={(value) => [`₹${value.toFixed(2)}`, 'Expense']}
                labelFormatter={(name) => `Date: ${name}`}
            />
            <Bar dataKey="amount" fill="#F87171" radius={[4, 4, 0, 0]} label={{ position: 'top', formatter: (value) => value > 0 ? `₹${value.toFixed(2)}` : '' }} />
          </BarChart>
      </div>
    </div>
  );
};

export default ExpensesBarChart;