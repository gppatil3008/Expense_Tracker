// src/components/TransactionList.js

import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-3">History</h3>
      <ul className="list-none p-0 max-h-64 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-gray-500 italic">No transactions found for the selected period.</p>
        ) : (
          transactions.map((t) => (
            <TransactionItem key={t.id} transaction={t} />
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionList;