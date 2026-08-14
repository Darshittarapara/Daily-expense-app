import React from 'react';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stat Cards */}
      <div className="stat bg-base-100 shadow rounded-box">
        <div className="stat-title">Total Balance</div>
        <div className="stat-value text-primary">₹89,400</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
      
      <div className="stat bg-base-100 shadow rounded-box">
        <div className="stat-title">Total Expenses</div>
        <div className="stat-value text-secondary">₹12,000</div>
        <div className="stat-desc">4% less than last month</div>
      </div>
      
      <div className="stat bg-base-100 shadow rounded-box">
        <div className="stat-title">Total Income</div>
        <div className="stat-value text-accent">₹101,400</div>
        <div className="stat-desc">Increased by 15%</div>
      </div>

      <div className="mt-8 bg-base-100 p-6 shadow rounded-box md:col-span-3">
        <h2 className="text-xl mb-4 font-semibold">Recent Transactions</h2>
        <p className="text-base-content/70">Chart and list will go here as we migrate them over.</p>
      </div>
    </div>
  );
}
