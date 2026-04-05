import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, createColumnHelper, flexRender } from '@tanstack/react-table';
import { Pencil, Trash2, Search, Plus, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Transaction, FilterType } from '../../types';
import { Badge } from '../ui/primitives';
import { ALL_CATEGORIES } from '../../lib/data';
import { formatDate, formatCurrency } from '../../lib/calculations';
import { useDeleteTransaction } from '../../hooks/useTransactions';

const col = createColumnHelper<Transaction>();

function useDebounce<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  React.useEffect(() => { const id = setTimeout(() => setV(value), ms); return () => clearTimeout(id); }, [value, ms]);
  return v;
}

const sel: React.CSSProperties = { background:'#2a2a2a', color:'#ccc', border:'1px solid #3a3a3a', borderRadius:999, padding:'7px 14px', fontSize:13, cursor:'pointer', outline:'none', fontFamily:'inherit' };
const inp: React.CSSProperties = { background:'#1e1e1e', color:'white', border:'none', borderRadius:999, padding:'7px 14px 7px 36px', fontSize:13, outline:'none', width:'100%', fontFamily:'inherit' };

export function TransactionsTable({ data, onAdd, onEdit }: { data: Transaction[]; onAdd: () => void; onEdit: (t: Transaction) => void }) {
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

  const columns = useMemo(() => [
    col.accessor('date',        { header:'Date',        cell: i => <span style={{ color:'#aaa', fontSize:13 }}>{formatDate(i.getValue())}</span> }),
    col.accessor('description', { header:'Description', cell: i => <span style={{ fontWeight:500, fontSize:14 }}>{i.getValue()}</span> }),
    col.accessor('category',    { header:'Category',    cell: i => <Badge label={i.getValue()} /> }),
    col.accessor('type',        { header:'Type',        cell: i => <Badge label={i.getValue()} variant={i.getValue()} /> }),
    col.accessor('amount', { header:'Amount', cell: i => {
      const t = i.row.original;
      return <span style={{ fontWeight:600, fontSize:13, color: t.type==='income' ? '#22c55e' : '#ef4444' }}>{t.type==='income'?'+':'-'}{formatCurrency(i.getValue())}</span>;
    }}),
    col.display({ id:'actions', header:'Actions', cell: i => (
      <div style={{ display:'flex', gap:12 }}>
        <button onClick={() => onEdit(i.row.original)} style={{ background:'none', border:'none', cursor:'pointer', color:'#888', padding:0 }}><Pencil size={15} /></button>
        <button onClick={() => del.mutate(i.row.original.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'#888', padding:0 }}><Trash2 size={15} /></button>
      </div>
    )}),
  ], [onEdit, del]);

  const table = useReactTable({ data: filtered, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize:8 } } });
  const { pageIndex } = table.getState().pagination;

  function exportCsv() {
    const rows = [['Date','Description','Category','Type','Amount'], ...filtered.map(t => [t.date,t.description,t.category,t.type,t.amount])];
    const blob = new Blob([rows.map(r=>r.join(',')).join('\n')], { type:'text/csv' });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href:url, download:'transactions.csv' }).click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24, flex:1 }}>
      {/* Filter bar */}
      <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' , right:10}}>
        <div style={{ position:'relative', flex:1, maxWidth:280 }}>
          <Search size={14} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#666' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" style={inp} />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as FilterType)} style={sel}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={sel}>
          <option value="all">All Categories</option>
          {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div style={{ flex:1 }} />
        <button onClick={exportCsv} style={{ ...sel, display:'flex', alignItems:'center', gap:6, borderRadius:12 }}>
          <Download size={14} /> csv
        </button>
        <button onClick={onAdd} style={{ display:'flex', alignItems:'center', gap:6, background:'#3B82F6', color:'white', border:'none', borderRadius:12, padding:'7px 16px', fontSize:13, fontWeight:500, cursor:'pointer' }}>
          <Plus size={14} /> Add
        </button>
      </div>

      {/* Table */}
      <div style={{ background:'white', borderRadius:16, overflow:'hidden', flex:1 }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid #f0f0f0' }}>
                {table.getHeaderGroups()[0].headers.map(h => (
                  <th key={h.id} style={{ padding:'12px 20px', textAlign:'left', fontSize:12, color:'#aaa', fontWeight:500, whiteSpace:'nowrap' }}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0
                ? <tr><td colSpan={6} style={{ textAlign:'center', padding:48, color:'#aaa', fontSize:14 }}>No transactions found.</td></tr>
                : table.getRowModel().rows.map(row => (
                  <tr key={row.id} style={{ borderBottom:'1px solid #fafafa' }}
                    onMouseEnter={e => (e.currentTarget.style.background='#fafafa')}
                    onMouseLeave={e => (e.currentTarget.style.background='transparent')}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} style={{ padding:'12px 20px', whiteSpace:'nowrap' }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:8 }}>
        <span style={{ color:'#aaa', fontSize:13 }}>{pageIndex+1}/{table.getPageCount()||1}</span>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} style={{ width:32, height:32, borderRadius:'50%', background:'#2a2a2a', border:'none', cursor:'pointer', color:'#ccc', display:'flex', alignItems:'center', justifyContent:'center', opacity: table.getCanPreviousPage()?1:0.3 }}>
          <ChevronLeft size={14} />
        </button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} style={{ width:32, height:32, borderRadius:'50%', background:'#2a2a2a', border:'none', cursor:'pointer', color:'#ccc', display:'flex', alignItems:'center', justifyContent:'center', opacity: table.getCanNextPage()?1:0.3 }}>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}