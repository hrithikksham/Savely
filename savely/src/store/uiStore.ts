import { create } from 'zustand';
import  type { FilterType, Transaction } from '../types';

interface Filters {
  search: string;
  type: FilterType;
  category: string;
  page: number;
}

interface UIStore {
  activeRoute: string;
  isAddModalOpen: boolean;
  editingTransaction: Transaction | null;
  filters: Filters;
  setActiveRoute: (r: string) => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  openEditModal: (t: Transaction) => void;
  closeEditModal: () => void;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
}

const defaultFilters: Filters = {
  search: '',
  type: 'all',
  category: 'all',
  page: 1,
};

export const useUIStore = create<UIStore>((set) => ({
  activeRoute: '/',
  isAddModalOpen: false,
  editingTransaction: null,
  filters: defaultFilters,

  setActiveRoute: (r) => set({ activeRoute: r }),
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
  openEditModal: (t) => set({ editingTransaction: t }),
  closeEditModal: () => set({ editingTransaction: null }),
  setFilter: (key, value) =>
    set((s) => ({
      filters: { ...s.filters, [key]: value, ...(key !== 'page' ? { page: 1 } : {}) },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
}));