import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useAddTransaction, useUpdateTransaction } from '../../hooks/useTransactions';
// Define categories locally so Zod and the UI Dropdown are perfectly synced
const CATEGORIES = [
    'Rent', 'Shopping', 'Food & Dining', 'Transportation',
    'Healthcare', 'Utilities', 'Entertainment', 'Salary',
    'Freelance', 'Investment', 'Other'
];
const TYPES = ['income', 'expense'];
const schema = z.object({
    description: z.string().min(1, 'Description is required').max(80),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
    category: z.enum(CATEGORIES),
    type: z.enum(TYPES),
    amount: z.number({ error: 'Enter a valid amount' }).positive('Must be greater than 0'),
});
export function TransactionModal({ transaction, onClose }) {
    const isEdit = Boolean(transaction);
    const addMutation = useAddTransaction();
    const editMutation = useUpdateTransaction();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: transaction
            ? {
                description: transaction.description,
                date: transaction.date,
                // Assert types so TS knows they match the exact strings
                category: transaction.category,
                type: transaction.type,
                amount: transaction.amount
            }
            : {
                date: new Date().toISOString().split('T')[0],
                type: 'expense',
                category: 'Shopping',
                amount: undefined
            },
    });
    useEffect(() => {
        if (transaction) {
            reset({
                description: transaction.description,
                date: transaction.date,
                category: transaction.category,
                type: transaction.type,
                amount: Math.abs(transaction.amount) // Ensure positive number for form
            });
        }
    }, [transaction, reset]);
    async function onSubmit(values) {
        try {
            if (isEdit && transaction) {
                await editMutation.mutateAsync({ ...transaction, ...values });
            }
            else {
                await addMutation.mutateAsync(values);
            }
            onClose();
        }
        catch (e) {
            console.error(e);
        }
    }
    // Common input classes for clean, reusable Tailwind styling
    const inputClasses = "w-full bg-[#1e1e1e] text-white border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-[12px] px-3.5 py-2.5 text-[13px] outline-none transition-all placeholder-gray-500";
    return (_jsx("div", { onClick: e => e.target === e.currentTarget && onClose(), className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4", children: _jsxs("div", { className: "bg-[#2a2a2a] rounded-[24px] p-6 w-full max-w-[440px] shadow-2xl modal-animate", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-white font-semibold text-[18px] m-0", children: isEdit ? 'Edit Transaction' : 'Add Transaction' }), _jsx("button", { type: "button", onClick: onClose, className: "text-gray-400 hover:text-white hover:bg-[#3a3a3a] p-1.5 rounded-full transition-colors", children: _jsx(X, { size: 20 }) })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col gap-4", children: [_jsx(Field, { label: "Description", error: errors.description?.message, children: _jsx("input", { ...register('description'), placeholder: "e.g. Monthly Salary", autoFocus: true, className: inputClasses }) }), _jsx(Field, { label: "Date", error: errors.date?.message, children: _jsx("input", { ...register('date'), type: "date", className: inputClasses }) }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx(Field, { label: "Type", error: errors.type?.message, children: _jsxs("select", { ...register('type'), className: inputClasses, children: [_jsx("option", { value: "income", children: "Income" }), _jsx("option", { value: "expense", children: "Expense" })] }) }), _jsx(Field, { label: "Category", error: errors.category?.message, children: _jsx("select", { ...register('category'), className: inputClasses, children: CATEGORIES.map(c => _jsx("option", { value: c, children: c }, c)) }) })] }), _jsx(Field, { label: "Amount (\u20B9)", error: errors.amount?.message, children: _jsx("input", { ...register('amount', { valueAsNumber: true }), type: "number", step: "any", min: "1", placeholder: "0.00", className: inputClasses }) }), _jsxs("div", { className: "flex gap-3 mt-4", children: [_jsx("button", { type: "button", onClick: onClose, className: "flex-1 py-2.5 rounded-[12px] border border-[#444] bg-transparent text-gray-300 text-[13px] font-medium hover:bg-[#333] transition-colors", children: "Cancel" }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "flex-1 py-2.5 rounded-[12px] border-none bg-[#1d4ed8] text-white text-[13px] font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: isSubmitting ? 'Saving…' : isEdit ? 'Update' : 'Add' })] })] })] }) }));
}
// Reusable Field wrapper
function Field({ label, error, children }) {
    return (_jsxs("div", { className: "flex flex-col gap-1.5", children: [_jsx("label", { className: "text-gray-400 text-[11px] font-medium tracking-wide uppercase", children: label }), children, error && _jsx("span", { className: "text-red-400 text-[11px] mt-0.5", children: error })] }));
}
