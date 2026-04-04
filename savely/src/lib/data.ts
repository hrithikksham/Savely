import type { Transaction, Category } from '../types';

const STORAGE_KEY = 'savely_transactions';

const SEED_DATA: Transaction[] = [
  { id: '1',  date: '2025-03-22', description: 'Rent Payment',       category: 'Rent',           type: 'expense', amount: 14000 },
  { id: '2',  date: '2025-03-20', description: 'Gym Membership',     category: 'Healthcare',     type: 'expense', amount: 1500  },
  { id: '3',  date: '2025-03-16', description: 'Freelance React App',category: 'Freelance',      type: 'income',  amount: 22000 },
  { id: '4',  date: '2025-03-14', description: 'Amazon Shopping',    category: 'Shopping',       type: 'expense', amount: 3300  },
  { id: '5',  date: '2025-03-11', description: 'Ola Monthly Pass',   category: 'Transportation', type: 'expense', amount: 499   },
  { id: '6',  date: '2025-03-08', description: 'Zomato Orders',      category: 'Food & Dining',  type: 'expense', amount: 2100  },
  { id: '7',  date: '2025-03-05', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 52000 },
  { id: '8',  date: '2025-02-26', description: 'ETF Investment',     category: 'Investment',     type: 'income',  amount: 5000  },
  { id: '9',  date: '2025-02-22', description: 'Rent Payment',       category: 'Rent',           type: 'expense', amount: 14000 },
  { id: '10', date: '2025-02-18', description: 'Electricity Bill',   category: 'Utilities',      type: 'expense', amount: 1200  },
  { id: '11', date: '2025-02-14', description: 'Netflix + Spotify',  category: 'Entertainment',  type: 'expense', amount: 900   },
  { id: '12', date: '2025-02-10', description: 'Swiggy Orders',      category: 'Food & Dining',  type: 'expense', amount: 1800  },
  { id: '13', date: '2025-02-05', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 52000 },
  { id: '14', date: '2025-02-03', description: 'D-mart Groceries',   category: 'Shopping',       type: 'expense', amount: 2200  },
  { id: '15', date: '2025-01-28', description: 'Freelance Design',   category: 'Freelance',      type: 'income',  amount: 15000 },
  { id: '16', date: '2025-01-22', description: 'Rent Payment',       category: 'Rent',           type: 'expense', amount: 14000 },
  { id: '17', date: '2025-01-18', description: 'Doctor Visit',       category: 'Healthcare',     type: 'expense', amount: 800   },
  { id: '18', date: '2025-01-15', description: 'Bus & Metro Pass',   category: 'Transportation', type: 'expense', amount: 350   },
  { id: '19', date: '2025-01-10', description: 'Restaurant Dinner',  category: 'Food & Dining',  type: 'expense', amount: 1400  },
  { id: '20', date: '2025-01-05', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 52000 },
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
  Rent:           '#f87171',
  Shopping:       '#f472b6',
  'Food & Dining':'#c084fc',
  Transportation: '#60a5fa',
  Healthcare:     '#fb923c',
  Utilities:      '#a3e635',
  Entertainment:  '#34d399',
  Salary:         '#4ade80',
  Freelance:      '#38bdf8',
  Investment:     '#facc15',
  Other:          '#94a3b8',
};

export const ALL_CATEGORIES: Category[] = [
  'Rent','Shopping','Food & Dining','Transportation','Healthcare',
  'Utilities','Entertainment','Salary','Freelance','Investment','Other',
];