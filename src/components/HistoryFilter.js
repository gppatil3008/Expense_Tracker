// src/components/HistoryFilter.js

import React from 'react';

const HistoryFilter = ({ filterYear, filterMonth, onFilterChange }) => {
  // Generate list of years (current year and past 3 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => (currentYear - i).toString());

  const months = [
    { value: '', label: 'All Months' }, { value: '0', label: 'January' },
    { value: '1', label: 'February' }, { value: '2', label: 'March' },
    { value: '3', label: 'April' }, { value: '4', label: 'May' },
    { value: '5', label: 'June' }, { value: '6', label: 'July' },
    { value: '7', label: 'August' }, { value: '8', label: 'September' },
    { value: '9', label: 'October' }, { value: '10', label: 'November' },
    { value: '11', label: 'December' },
  ];

  const handleYearChange = (event) => {
    onFilterChange('year', event.target.value);
  };

  const handleMonthChange = (event) => {
    onFilterChange('month', event.target.value);
  };

  return (
    <div className="flex gap-4 mb-4 bg-gray-50 p-3 rounded-lg border">
      {/* Year Filter */}
      <select
        value={filterYear}
        onChange={handleYearChange}
        className="p-2 border rounded flex-1"
      >
        <option value="">All Years</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      
      {/* Month Filter */}
      <select
        value={filterMonth}
        onChange={handleMonthChange}
        className="p-2 border rounded flex-1"
      >
        {months.map(month => (
          <option key={month.value} value={month.value}>{month.label}</option>
        ))}
      </select>
    </div>
  );
};

export default HistoryFilter;