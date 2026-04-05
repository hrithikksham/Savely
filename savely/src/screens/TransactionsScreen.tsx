import { useState } from 'react';
import { Search, ChevronDown, Download, Plus } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionsTable } from '../components/transactions/TransactionsTable';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { Header } from '../components/layout/Header';
import type { Transaction } from '../types';
import type { UserRole } from '../components/layout/Sidebar';

// 1. ACCEPT THE ROLE PROP HERE
export function TransactionsScreen({ role = 'editor' }: { role?: UserRole }) {
  const { data: transactions = [], isLoading } = useTransactions();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse pb-6 pr-2">
        <div className="h-10 w-full bg-[#2a2a2a] rounded-xl mb-2" />
        <div className="h-12 bg-[#2a2a2a] rounded-xl" />
        <div className="h-[600px] bg-white rounded-[24px] opacity-10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full font-sans pb-6 overflow-y-auto pr-2 custom-scrollbar">
      
      {/* Top Navbar */}
      <Header showSearch={false} />

      <div className="flex justify-between items-center w-full">
        <h1 className="text-white text-[32px] font-semibold tracking-tight m-0">
          Recent Transactions
        </h1>
      </div>

      {/* ── Table Container ───────────────────────────────────────── */}
      <div className="bg-white rounded-[24px] flex-1 shadow-sm overflow-hidden p-2">
        <TransactionsTable
          data={transactions}
          role={role}
          onAdd={() => setIsAddOpen(true)}
          onEdit={(t) => setEditing(t)}
        />
      </div>

      {/* ── Modals ────────────────────────────────────────────────── */}
      {isAddOpen && <TransactionModal onClose={() => setIsAddOpen(false)} />}
      {editing && <TransactionModal transaction={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}