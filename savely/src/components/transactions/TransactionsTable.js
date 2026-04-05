import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, createColumnHelper, flexRender } from '@tanstack/react-table';
import { Pencil, Trash2, Search, Plus, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Badge } from '../ui/primitives';
import { ALL_CATEGORIES } from '../../lib/data';
import { formatDate, formatCurrency } from '../../lib/calculations';
import { useDeleteTransaction } from '../../hooks/useTransactions';
const col = createColumnHelper();
function useDebounce(value, ms) {
    const [v, setV] = useState(value);
    React.useEffect(() => {
        const id = setTimeout(() => setV(value), ms);
        return () => clearTimeout(id);
    }, [value, ms]);
    return v;
}
export function TransactionsTable({ data, onAdd, onEdit, role = 'editor' }) {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [catFilter, setCatFilter] = useState('all');
    const del = useDeleteTransaction();
    const q = useDebounce(search, 300);
    const filtered = useMemo(() => data.filter(t => {
        const ms = !q || t.description.toLowerCase().includes(q.toLowerCase());
        const mt = typeFilter === 'all' || t.type === typeFilter;
        const mc = catFilter === 'all' || t.category === catFilter;
        return ms && mt && mc;
    }), [data, q, typeFilter, catFilter]);
    const columns = useMemo(() => {
        return [
            col.accessor('date', {
                header: 'Date',
                cell: i => _jsx("span", { className: "text-gray-400 text-[13px] font-medium", children: formatDate(i.getValue()) })
            }),
            col.accessor('description', {
                header: 'Description',
                cell: i => _jsx("span", { className: "text-gray-800 font-medium text-[14px]", children: i.getValue() })
            }),
            col.accessor('category', {
                header: 'Category',
                cell: i => _jsx(Badge, { label: i.getValue() })
            }),
            col.accessor('type', {
                header: 'Type',
                cell: i => _jsx(Badge, { label: i.getValue(), variant: i.getValue() })
            }),
            col.accessor('amount', {
                header: 'Amount',
                cell: i => {
                    const t = i.row.original;
                    const isIncome = t.type === 'income';
                    return (_jsxs("span", { className: `font-bold text-[13px] ${isIncome ? 'text-emerald-500' : 'text-rose-500'}`, children: [isIncome ? '+' : '-', " ", formatCurrency(i.getValue())] }));
                }
            }),
            // ── FIXED: Conditional Spread instead of .push() ──
            ...(role === 'editor' ? [
                col.display({
                    id: 'actions',
                    header: () => _jsx("div", { className: "text-center", children: "Actions" }),
                    cell: i => (_jsxs("div", { className: "flex items-center justify-center gap-3", children: [_jsx("button", { onClick: () => onEdit(i.row.original), className: "text-gray-400 hover:text-gray-600 transition-colors", children: _jsx(Pencil, { size: 16, strokeWidth: 2.5 }) }), _jsx("button", { onClick: () => del.mutate(i.row.original.id), className: "text-rose-400 hover:text-rose-600 transition-colors", children: _jsx(Trash2, { size: 16, strokeWidth: 2.5 }) })] }))
                })
            ] : [])
        ];
    }, [onEdit, del, role]);
    const table = useReactTable({
        data: filtered,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } } // 3. Set pagination to 10
    });
    const { pageIndex } = table.getState().pagination;
    function exportCsv() {
        const rows = [['Date', 'Description', 'Category', 'Type', 'Amount'], ...filtered.map(t => [t.date, t.description, t.category, t.type, t.amount])];
        const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        Object.assign(document.createElement('a'), { href: url, download: 'transactions.csv' }).click();
        URL.revokeObjectURL(url);
    }
    return (_jsxs("div", { className: "flex flex-col gap-6 flex-1", children: [_jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4 w-full", children: [_jsxs("div", { className: "flex items-center gap-4 flex-1", children: [_jsxs("div", { className: "relative w-full max-w-[280px]", children: [_jsx(Search, { size: 16, className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" }), _jsx("input", { value: search, onChange: e => setSearch(e.target.value), placeholder: "Search", className: "w-full bg-black text-gray-300 placeholder-gray-500 rounded-full pl-10 pr-4 py-2.5 text-[14px] outline-none" })] }), _jsxs("select", { value: typeFilter, onChange: e => setTypeFilter(e.target.value), className: "bg-[#2a2a2a] text-gray-300 px-4 py-2.5 rounded-[12px] text-[14px] border border-transparent hover:border-[#444] transition-colors outline-none cursor-pointer", children: [_jsx("option", { value: "all", children: "All Types" }), _jsx("option", { value: "income", children: "Income" }), _jsx("option", { value: "expense", children: "Expense" })] }), _jsxs("select", { value: catFilter, onChange: e => setCatFilter(e.target.value), className: "bg-[#2a2a2a] text-gray-300 px-4 py-2.5 rounded-[12px] text-[14px] border border-transparent hover:border-[#444] transition-colors outline-none cursor-pointer", children: [_jsx("option", { value: "all", children: "All Categories" }), ALL_CATEGORIES.map(c => _jsx("option", { value: c, children: c }, c))] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("button", { onClick: exportCsv, className: "flex items-center gap-2 bg-[#2a2a2a] text-gray-300 px-5 py-2.5 rounded-[12px] text-[14px] hover:bg-[#333] transition-colors", children: [_jsx(Download, { size: 16 }), " csv"] }), role === 'editor' && (_jsxs("button", { onClick: onAdd, className: "flex items-center gap-2 bg-[#1d4ed8] hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-[14px] font-medium transition-colors", children: [_jsx(Plus, { size: 18, strokeWidth: 2.5 }), " Add"] }))] })] }), _jsx("div", { className: "bg-white rounded-[24px] overflow-hidden flex-1 shadow-sm p-2", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-sm whitespace-nowrap", children: [_jsx("thead", { children: _jsx("tr", { className: "border-b border-gray-100", children: table.getHeaderGroups()[0].headers.map(h => (_jsx("th", { className: "px-6 py-5 text-gray-400 font-medium text-[13px]", children: flexRender(h.column.columnDef.header, h.getContext()) }, h.id))) }) }), _jsx("tbody", { className: "divide-y divide-gray-50", children: table.getRowModel().rows.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "text-center py-12 text-gray-400 text-sm", children: "No transactions found." }) })) : (table.getRowModel().rows.map(row => (_jsx("tr", { className: "hover:bg-gray-50/50 transition-colors", children: row.getVisibleCells().map(cell => (_jsx("td", { className: "px-6 py-4", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) }, row.id)))) })] }) }) }), _jsxs("div", { className: "flex items-center justify-end gap-4 text-gray-300 text-[14px] mr-2", children: [_jsxs("span", { children: [pageIndex + 1, " / ", table.getPageCount() || 1] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage(), className: "w-9 h-9 rounded-full bg-[#e6e6e6] flex items-center justify-center text-gray-800 hover:bg-white disabled:opacity-30 disabled:hover:bg-[#e6e6e6] transition-colors", children: _jsx(ChevronLeft, { size: 18 }) }), _jsx("button", { onClick: () => table.nextPage(), disabled: !table.getCanNextPage(), className: "w-9 h-9 rounded-full bg-[#e6e6e6] flex items-center justify-center text-gray-800 hover:bg-white disabled:opacity-30 disabled:hover:bg-[#e6e6e6] transition-colors", children: _jsx(ChevronRight, { size: 18 }) })] })] })] }));
}
