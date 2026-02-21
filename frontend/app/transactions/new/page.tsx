'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addTransaction, Transaction } from '@/app/actions/transactions';
import TransactionForm from '@/components/TransactionForm';

export default function NewTransactionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Omit<Transaction, 'id' | 'created_at'>) => {
    setIsLoading(true);
    try {
      await addTransaction(data);
      router.push('/transactions');
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <TransactionForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
