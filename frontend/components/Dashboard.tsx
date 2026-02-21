'use client';

import { useEffect, useState } from 'react';
import { getSummary, getTransactions, Transaction, Summary } from '@/app/actions/transactions';
import CategoryPieChart from './PieChart';

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [summaryData, transactionsData] = await Promise.all([
          getSummary(),
          getTransactions(),
        ]);
        setSummary(summaryData);
        setRecentTransactions(transactionsData.slice(0, 5));
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!summary) {
    return <div className="text-center py-8">No data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <p className="text-gray-500 text-sm font-semibold">Total Income</p>
          <p className="text-3xl font-bold text-green-600">
            ${summary.total_income.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
          <p className="text-gray-500 text-sm font-semibold">Total Expenses</p>
          <p className="text-3xl font-bold text-red-600">
            ${summary.total_expenses.toFixed(2)}
          </p>
        </div>

        <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${summary.balance >= 0 ? 'border-blue-500' : 'border-orange-500'}`}>
          <p className="text-gray-500 text-sm font-semibold">Balance</p>
          <p className={`text-3xl font-bold ${summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            ${summary.balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Chart and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Spending by Category</h2>
          <CategoryPieChart data={summary.by_category} />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500">No transactions yet</p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                  </div>
                  <p
                    className={`text-lg font-bold ${
                      transaction.type === 'income'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$
                    {transaction.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
