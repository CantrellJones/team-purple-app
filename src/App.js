import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockSavingsHistory = [
  { month: 'Jan', year: 2025, amount: 32.15, depositDate: '2025-02-14' },
  { month: 'Feb', year: 2025, amount: 48.75, depositDate: '2025-03-14' },
  { month: 'Mar', year: 2025, amount: 39.10, depositDate: '2025-04-15' },
  { month: 'Apr', year: 2025, amount: 51.25, depositDate: '2025-05-15' },
  { month: 'May', year: 2025, amount: 45.28, depositDate: '2025-06-13' },
  { month: 'Jun', year: 2025, amount: 60.82, depositDate: '2025-07-15' },
  { month: 'Jul', year: 2025, amount: 50.32, depositDate: '2025-08-15' },
  { month: 'Aug', year: 2025, amount: 42.40, depositDate: '2025-09-15' },
  { month: 'Sep', year: 2025, amount: 53.10, depositDate: '2025-10-15' },
  { month: 'Oct', year: 2025, amount: 47.90, depositDate: '2025-11-14' },
  { month: 'Nov', year: 2025, amount: 44.75, depositDate: '2025-12-15' },
  { month: 'Dec', year: 2025, amount: 49.33, depositDate: '2026-01-15' },
];

function Dashboard() {
  const [range, setRange] = useState('Year');

  const filterDataByRange = (data) => {
    const now = new Date();
    return data.filter(entry => {
      const entryDate = new Date(entry.depositDate);
      if (range === '1 Month') {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return entryDate >= oneMonthAgo;
      } else if (range === '6 Months') {
        const sixMonthsAgo = new Date(now);
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        return entryDate >= sixMonthsAgo;
      } else if (range === 'Year') {
        return entryDate.getFullYear() === now.getFullYear();
      } else {
        return true; // Lifetime
      }
    });
  };

  const filteredData = filterDataByRange(mockSavingsHistory);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Monthly Savings History</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="range-select" style={{ marginRight: '0.5rem' }}>Select Time Range:</label>
        <select
          id="range-select"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="1 Month">Last 1 Month</option>
          <option value="6 Months">Last 6 Months</option>
          <option value="Year">Year to Date</option>
          <option value="Lifetime">Lifetime</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Line type="monotone" dataKey="amount" stroke="#5e3b76" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      <ul style={{ marginTop: '2rem' }}>
        {filteredData.map((entry, idx) => (
          <li key={idx}>
            {entry.month} {entry.year}: ${entry.amount.toFixed(2)} → Deposited on {new Date(entry.depositDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
