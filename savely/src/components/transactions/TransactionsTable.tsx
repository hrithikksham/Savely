import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, createColumnHelper, flexRender } from '@tanstack/react-table';
import { Pencil, Trash2, Search, Plus, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import type { Transaction, FilterType } from '../../types';
import type { UserRole } from '../layout/Sidebar';
import { Badge } from '../ui/primitives';
import { ALL_CATEGORIES } from '../../lib/data';
import { formatDate, formatCurrency } from '../../lib/calculations';
import { useDeleteTransaction } from '../../hooks/useTransactions';

const col = createColumnHelper<Transaction>();

function useDebounce<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  React.useEffect(() => { 
    const id = setTimeout(() => setV(value), ms); 
    return () => clearTimeout(id); 
  }, [value, ms]);
  return v;
}

interface TableProps {
  data: Transaction[];
  onAdd: () => void;
  onEdit: (t: Transaction) => void;
  role?: UserRole; // 1. Accept Role Prop
}

export function TransactionsTable({ data, onAdd, onEdit, role = 'editor' }: TableProps) {
  const [search, setSearch]         = useState('');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [catFilter, setCatFilter]   = useState('all');
  const del                         = useDeleteTransaction();
  const q                           = useDebounce(search, 300);

  const filtered = useMemo(() => data.filter(t => {
    const ms = !q || t.description.toLowerCase().includes(q.toLowerCase());
    const mt = typeFilter === 'all' || t.type === typeFilter;
    const mc = catFilter  === 'all' || t.category === catFilter;
    return ms && mt && mc;
  }), [data, q, typeFilter, catFilter]);

const columns = useMemo(() => {
    return [
      col.accessor('date', { 
        header: 'Date', 
        cell: i => <span className="text-gray-400 text-[13px] font-medium">{formatDate(i.getValue())}</span> 
      }),
      col.accessor('description', { 
        header: 'Description', 
        cell: i => <span className="text-gray-800 font-medium text-[14px]">{i.getValue()}</span> 
      }),
      col.accessor('category', { 
        header: 'Category', 
        cell: i => <Badge label={i.getValue()} /> 
      }),
      col.accessor('type', { 
        header: 'Type', 
        cell: i => <Badge label={i.getValue()} variant={i.getValue()} /> 
      }),
      col.accessor('amount', { 
        header: 'Amount', 
        cell: i => {
          const t = i.row.original;
          const isIncome = t.type === 'income';
          return (
            <span className={`font-bold text-[13px] ${isIncome ? 'text-emerald-500' : 'text-rose-500'}`}>
              {isIncome ? '+' : '-'} {formatCurrency(i.getValue())}
            </span>
          );
        }
      }),
      
      // ── FIXED: Conditional Spread instead of .push() ──
      ...(role === 'editor' ? [
        col.display({ 
          id: 'actions', 
          header: () => <div className="text-center">Actions</div>, 
          cell: i => (
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => onEdit(i.row.original)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <Pencil size={16} strokeWidth={2.5} />
              </button>
              <button onClick={() => del.mutate(i.row.original.id)} className="text-rose-400 hover:text-rose-600 transition-colors">
                <Trash2 size={16} strokeWidth={2.5} />
              </button>
            </div>
          )
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
    const rows = [['Date','Description','Category','Type','Amount'], ...filtered.map(t => [t.date,t.description,t.category,t.type,t.amount])];
    const blob = new Blob([rows.map(r=>r.join(',')).join('\n')], { type:'text/csv' });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href:url, download:'transactions.csv' }).click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-6 flex-1">
      
      {/* ── Filter Bar ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-4 w-full">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative w-full max-w-[280px]">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search" 
              className="w-full bg-black text-gray-300 placeholder-gray-500 rounded-full pl-10 pr-4 py-2.5 text-[14px] outline-none"
            />
          </div>

          {/* Type Filter */}
          <select 
            value={typeFilter} 
            onChange={e => setTypeFilter(e.target.value as FilterType)} 
            className="bg-[#2a2a2a] text-gray-300 px-4 py-2.5 rounded-[12px] text-[14px] border border-transparent hover:border-[#444] transition-colors outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category Filter */}
          <select 
            value={catFilter} 
            onChange={e => setCatFilter(e.target.value)} 
            className="bg-[#2a2a2a] text-gray-300 px-4 py-2.5 rounded-[12px] text-[14px] border border-transparent hover:border-[#444] transition-colors outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={exportCsv} 
            className="flex items-center gap-2 bg-[#2a2a2a] text-gray-300 px-5 py-2.5 rounded-[12px] text-[14px] hover:bg-[#333] transition-colors"
          >
            <Download size={16} /> csv
          </button>
          
          {/* 4. ROLE CHECK: Hide Add button if Viewer */}
          {role === 'editor' && (
            <button 
              onClick={onAdd} 
              className="flex items-center gap-2 bg-[#1d4ed8] hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-[14px] font-medium transition-colors"
            >
              <Plus size={18} strokeWidth={2.5} /> Add
            </button>
          )}
        </div>
      </div>

      {/* ── Table Area ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[24px] overflow-hidden flex-1 shadow-sm p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100">
                {table.getHeaderGroups()[0].headers.map(h => (
                  <th key={h.id} className="px-6 py-5 text-gray-400 font-medium text-[13px]">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-4 text-gray-300 text-[14px] mr-2">
        <span>{pageIndex + 1} / {table.getPageCount() || 1}</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()} 
            className="w-9 h-9 rounded-full bg-[#e6e6e6] flex items-center justify-center text-gray-800 hover:bg-white disabled:opacity-30 disabled:hover:bg-[#e6e6e6] transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()} 
            className="w-9 h-9 rounded-full bg-[#e6e6e6] flex items-center justify-center text-gray-800 hover:bg-white disabled:opacity-30 disabled:hover:bg-[#e6e6e6] transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}