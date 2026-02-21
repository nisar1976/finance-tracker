'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  created_at: string;
}

export interface Summary {
  total_income: number;
  total_expenses: number;
  balance: number;
  by_category: { [key: string]: number };
}

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

export async function addTransaction(
  data: Omit<Transaction, 'id' | 'created_at'>
): Promise<Transaction> {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: data.description,
        amount: data.amount,
        type: data.type,
        category: data.category,
        date: data.date,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add transaction: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
}

export async function updateTransaction(
  id: number,
  data: Partial<Omit<Transaction, 'id' | 'created_at'>>
): Promise<Transaction> {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update transaction: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
}

export async function deleteTransaction(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete transaction: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
}

export async function getSummary(): Promise<Summary> {
  try {
    const response = await fetch(`${API_BASE_URL}/summary/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch summary: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching summary:', error);
    throw error;
  }
}
