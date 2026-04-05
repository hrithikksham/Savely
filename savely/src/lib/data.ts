import type { Transaction, Category } from '../types';

// CHANGED: Bumped version so your browser ignores the old 2025 cached data
const STORAGE_KEY = 'savely_transactions_v2';

const SEED_DATA: Transaction[] = [
  // ── Current Month (April 2026) ──
  { id: '1',  date: '2026-04-05', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 52000 },
  { id: '2',  date: '2026-04-02', description: 'Rent Payment',       category: 'Rent',           type: 'expense', amount: 14000 },
  { id: '3',  date: '2026-04-01', description: 'Ola Pass',           category: 'Transportation', type: 'expense', amount: 499   },

  // ── Last Month (March 2026) ──
  { id: '4',  date: '2026-03-22', description: 'Freelance React App',category: 'Freelance',      type: 'income',  amount: 22000 },
  { id: '5',  date: '2026-03-20', description: 'Gym Membership',     category: 'Healthcare',     type: 'expense', amount: 1500  },
  { id: '6',  date: '2026-03-14', description: 'Amazon Shopping',    category: 'Shopping',       type: 'expense', amount: 3300  },
  { id: '7',  date: '2026-03-08', description: 'Zomato Orders',      category: 'Food & Dining',  type: 'expense', amount: 2100  },
  { id: '8',  date: '2026-03-05', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 52000 },
  { id: '9',  date: '2026-03-02', description: 'Rent Payment',       category: 'Rent',           type: 'expense', amount: 14000 },

  // ── Two Months Ago (February 2026) ──
  { id: '10', date: '2026-02-26', description: 'ETF Investment',     category: 'Investment',     type: 'income',  amount: 5000  },
  { id: '11', date: '2026-02-18', description: 'Electricity Bill',   category: 'Utilities',      type: 'expense', amount: 1200  },
  { id: '12', date: '2026-02-14', description: 'Netflix + Spotify',  category: 'Entertainment',  type: 'expense', amount: 900   },
  { id: '13', date: '2026-02-10', description: 'Swiggy Orders',      category: 'Food & Dining',  type: 'expense', amount: 1800  },
  { id: '14', date: '2026-02-05', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 52000 },
  { id: '15', date: '2026-02-03', description: 'D-mart Groceries',   category: 'Shopping',       type: 'expense', amount: 2200  },
  { id: '16', date: '2026-02-01', description: 'Rent Payment',       category: 'Rent',           type: 'expense', amount: 14000 },

  // ── Three Months Ago (January 2026) ──
  { id: '17', date: '2026-01-28', description: 'Freelance Design',   category: 'Freelance',      type: 'income',  amount: 15000 },
  { id: '18', date: '2026-01-18', description: 'Doctor Visit',       category: 'Healthcare',     type: 'expense', amount: 800   },
  { id: '19', date: '2026-01-15', description: 'Bus & Metro Pass',   category: 'Transportation', type: 'expense', amount: 350   },
  { id: '20', date: '2026-01-10', description: 'Restaurant Dinner',  category: 'Food & Dining',  type: 'expense', amount: 1400  },
  { id: '21', date: '2026-01-05', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 52000 },
  { id: '22', date: '2026-01-02', description: 'Rent Payment',       category: 'Rent',           type: 'expense', amount: 14000 },
];

function seed() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
  }
}

function delay(ms = 60): Promise<void> {
  return new Promise(res => setTimeout(res, ms));
}

export async function fetchTransactions(): Promise<Transaction[]> {
  seed();
  await delay();
  const raw = localStorage.getItem(STORAGE_KEY) ?? '[]';
  return JSON.parse(raw) as Transaction[];
}

export async function addTransaction(t: Omit<Transaction, 'id'>): Promise<Transaction> {
  await delay();
  const all = await fetchTransactions();
  const newT: Transaction = { ...t, id: crypto.randomUUID() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newT, ...all]));
  return newT;
}

export async function updateTransaction(updated: Transaction): Promise<Transaction> {
  await delay();
  const all = await fetchTransactions();
  const next = all.map(t => (t.id === updated.id ? updated : t));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return updated;
}

export async function deleteTransaction(id: string): Promise<void> {
  await delay();
  const all = await fetchTransactions();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all.filter(t => t.id !== id)));
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Rent:           '#ef4444', 
  Shopping:       '#ec4899', 
  "Food & Dining":'#a855f7', 
  Transportation: '#3b82f6', 
  Healthcare:     '#f97316', 
  Utilities:      '#06b6d4', 
  Entertainment:  '#8b5cf6', 
  Salary:         '#14b8a6', 
  Freelance:      '#6366f1', 
  Investment:     '#eab308', 
  Other:          '#64748b', 
};

export const ALL_CATEGORIES: Category[] = [
  'Rent','Shopping','Food & Dining','Transportation','Healthcare',
  'Utilities','Entertainment','Salary','Freelance','Investment','Other',
];