import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionForm from '@/components/TransactionForm';
import Navbar from '@/components/Navbar';

describe('TransactionForm', () => {
  it('renders form with all fields', () => {
    const mockSubmit = vi.fn();
    render(<TransactionForm onSubmit={mockSubmit} />);

    expect(screen.getByText('Add Transaction')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    render(<TransactionForm onSubmit={mockSubmit} />);

    const descriptionInput = screen.getByLabelText('Description');
    const amountInput = screen.getByLabelText('Amount');
    const submitButton = screen.getByRole('button', { name: /Add Transaction/i });

    fireEvent.change(descriptionInput, { target: { value: 'Test transaction' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });

    const callArgs = mockSubmit.mock.calls[0][0];
    expect(callArgs.description).toBe('Test transaction');
    expect(callArgs.amount).toBe(100);
  });
});

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText('💰 Finance Tracker')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('+ Add Transaction')).toBeInTheDocument();
  });

  it('has correct href attributes', () => {
    render(<Navbar />);

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveAttribute('href', '/');

    const transactionsLink = screen.getByText('Transactions').closest('a');
    expect(transactionsLink).toHaveAttribute('href', '/transactions');

    const addLink = screen.getByText('+ Add Transaction').closest('a');
    expect(addLink).toHaveAttribute('href', '/transactions/new');
  });
});
