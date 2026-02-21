'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  getTransactions,
  updateTransaction,
  Transaction,
} from '@/app/actions/transactions';
import TransactionForm from '@/components/TransactionForm';

export default function EditTransactionPage() {
  const router = useRouter();
  const params = useParams();
  const transactionId = parseInt(params.id as string);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadTransaction = async () => {
      try {
        const transactions = await getTransactions();
        const found = transactions.find((t) => t.id === transactionId);
        if (found) {
          setTransaction(found);
        } else {
          router.push('/transactions');
        }
      } catch (error) {
        console.error('Error loading transaction:', error);
        router.push('/transactions');
      } finally {
        setLoading(false);
      }
    };

    loadTransaction();
  }, [transactionId, router]);

  const handleSubmit = async (data: Omit<Transaction, 'id' | 'created_at'>) => {
    setIsSubmitting(true);
    try {
      await updateTransaction(transactionId, data);
      router.push('/transactions');
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!transaction) {
    return <div className="text-center py-8">Transaction not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TransactionForm
        initialData={transaction}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
}
