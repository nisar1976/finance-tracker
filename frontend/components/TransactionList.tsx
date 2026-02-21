'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getTransactions,
  deleteTransaction,
  Transaction,
} from '@/app/actions/transactions';

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const categories = [
    'food',
    'transport',
    'shopping',
    'bills',
    'entertainment',
    'health',
    'education',
    'salary',
    'freelance',
    'other',
  ];

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, categoryFilter, typeFilter]);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      setError('Failed to load transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = transactions;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((t) => t.type === typeFilter);
    }

    setFilteredTransactions(filtered);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
        setTransactions(transactions.filter((t) => t.id !== id));
      } catch (err) {
        setError('Failed to delete transaction');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Link
          href="/transactions/new"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          + Add Transaction
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-500 text-lg">No transactions found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{transaction.description}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          transaction.type === 'income'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right font-semibold">
                      <span
                        className={
                          transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {transaction.type === 'income' ? '+' : '-'}$
                        {transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <Link
                        href={`/transactions/${transaction.id}/edit`}
                        className="text-blue-500 hover:text-blue-700 mr-3"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
