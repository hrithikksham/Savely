import React, { useMemo, useState, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import { Pencil, Trash2, Search, Plus, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import type { Transaction, FilterType } from '../../types';
import { Badge, Button } from '../ui/primitives';
import { ALL_CATEGORIES, CATEGORY_COLORS } from '../../lib/data';
import { formatDate, formatCurrency } from '../../lib/calculations';
import { useDeleteTransaction } from '../../hooks/useTransactions';
import { clsx } from 'clsx';

const col = createColumnHelper<Transaction>();

interface TransactionsTableProps {
  data: Transaction[];
  onAdd: () => void;
  onEdit: (t: Transaction) => void;
}

export const TransactionsTable = React.memo(function TransactionsTable({
  data, onAdd, onEdit,
}: TransactionsTableProps) {
  const [search, setSearch]           = useState('');
  const [typeFilter, setTypeFilter]   = useState<FilterType>('all');
  const [catFilter, setCatFilter]     = useState('all');
  const deleteMutation                = useDeleteTransaction();

  const debouncedSearch = useDebouncedValue(search, 300);

  const filtered = useMemo(() => {
    return data.filter(t => {
      const matchSearch = !debouncedSearch || t.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchType   = typeFilter === 'all' || t.type === typeFilter;
      const matchCat    = catFilter  === 'all' || t.category === catFilter;
      return matchSearch && matchType && matchCat;
    });
  }, [data, debouncedSearch, typeFilter, catFilter]);

  const columns = useMemo(() => [
    col.accessor('date',        { header: 'Date',        cell: i => <span className="text-gray-400 text-sm">{formatDate(i.getValue())}</span> }),
    col.accessor('description', { header: 'Description', cell: i => <span className="font-medium text-gray-800">{i.getValue()}</span> }),
    col.accessor('category',    { header: 'Category',    cell: i => <Badge label={i.getValue()} /> }),
    col.accessor('type',        { header: 'Type',        cell: i => <Badge label={i.getValue()} variant={i.getValue()} /> }),
    col.accessor('amount', {
      header: 'Amount',
      cell: i => {
        const t = i.row.original;
        return (
          <span className={clsx('font-semibold text-sm', t.type === 'income' ? 'text-green-600' : 'text-red-500')}>
            {t.type === 'income' ? '+' : '-'}{formatCurrency(i.getValue())}
          </span>
        );
      },
    }),
    col.display({
      id: 'actions',
      header: 'Actions',
      cell: i => (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(i.row.original)}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => deleteMutation.mutate(i.row.original.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    }),
  ], [onEdit, deleteMutation]);

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const totalPages = table.getPageCount();

  function exportCsv() {
    const rows = [
      ['Date','Description','Category','Type','Amount'],
      ...filtered.map(t => [t.date, t.description, t.category, t.type, t.amount]),
    ];
    const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: 'transactions.csv' });
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#1e1e1e] text-white placeholder-gray-500 rounded-full pl-9 pr-4 py-2 text-sm outline-none"
          />
        </div>

        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value as FilterType)}
          className="bg-[#2a2a2a] text-gray-300 rounded-full px-4 py-2 text-sm outline-none border border-[#3a3a3a] cursor-pointer"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={catFilter}
          onChange={e => setCatFilter(e.target.value)}
          className="bg-[#2a2a2a] text-gray-300 rounded-full px-4 py-2 text-sm outline-none border border-[#3a3a3a] cursor-pointer"
        >
          <option value="all">All Categories</option>
          {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="flex-1" />

        <button
          onClick={exportCsv}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors border border-[#3a3a3a] rounded-xl px-3 py-2"
        >
          <Download size={14} /> csv
        </button>

        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-blue-500 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden flex-1">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {table.getHeaderGroups()[0].headers.map(h => (
                <th key={h.id} className="px-5 py-3 text-left text-xs text-gray-400 font-medium">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
                  No transactions found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-5 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 text-sm text-gray-400">
        <span>{pageIndex + 1}/{totalPages || 1}</span>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-300 disabled:opacity-30 hover:bg-[#3a3a3a] transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-300 disabled:opacity-30 hover:bg-[#3a3a3a] transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
});

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}