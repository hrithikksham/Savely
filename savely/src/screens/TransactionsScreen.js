import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionsTable } from '../components/transactions/TransactionsTable';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { Header } from '../components/layout/Header';
// 1. ACCEPT THE ROLE PROP HERE
export function TransactionsScreen({ role = 'editor' }) {
    const { data: transactions = [], isLoading } = useTransactions();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    if (isLoading) {
        return (_jsxs("div", { className: "flex flex-col gap-6 animate-pulse pb-6 pr-2", children: [_jsx("div", { className: "h-10 w-full bg-[#2a2a2a] rounded-xl mb-2" }), _jsx("div", { className: "h-12 bg-[#2a2a2a] rounded-xl" }), _jsx("div", { className: "h-[600px] bg-white rounded-[24px] opacity-10" })] }));
    }
    return (_jsxs("div", { className: "flex flex-col gap-6 h-full font-sans pb-6 overflow-y-auto pr-2 custom-scrollbar", children: [_jsx(Header, { showSearch: false }), _jsx("div", { className: "flex justify-between items-center w-full", children: _jsx("h1", { className: "text-white text-[32px] font-semibold tracking-tight m-0", children: "Recent Transactions" }) }), _jsx("div", { className: "bg-white rounded-[24px] flex-1 shadow-sm overflow-hidden p-2", children: _jsx(TransactionsTable, { data: transactions, role: role, onAdd: () => setIsAddOpen(true), onEdit: (t) => setEditing(t) }) }), isAddOpen && _jsx(TransactionModal, { onClose: () => setIsAddOpen(false) }), editing && _jsx(TransactionModal, { transaction: editing, onClose: () => setEditing(null) })] }));
}
