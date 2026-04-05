import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionsTable } from '../components/transactions/TransactionsTable';
import { TransactionModal } from '../components/transactions/TransactionModal';
import type { Transaction } from '../types';

export function TransactionsScreen() {
  const { data: transactions = [], isLoading } = useTransactions();
  const [isAddOpen, setIsAddOpen]               = useState(false);
  const [editing, setEditing]                   = useState<Transaction | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-8 w-56 bg-[#3a3a3a] rounded-xl" />
        <div className="h-10 bg-[#3a3a3a] rounded-xl" />
        <div className="h-96 bg-[#3a3a3a] rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 h-full">
      <h1 className="text-white text-3xl font-bold">Recent Transactions</h1>

      <TransactionsTable
        data={transactions}
        onAdd={() => setIsAddOpen(true)}
        onEdit={t => setEditing(t)}
      />

      {isAddOpen && (
        <TransactionModal onClose={() => setIsAddOpen(false)} />
      )}
      {editing && (
        <TransactionModal transaction={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}