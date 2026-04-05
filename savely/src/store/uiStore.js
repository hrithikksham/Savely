import { create } from 'zustand';
const defaultFilters = {
    search: '',
    type: 'all',
    category: 'all',
    page: 1,
};
export const useUIStore = create((set) => ({
    activeRoute: '/',
    isAddModalOpen: false,
    editingTransaction: null,
    filters: defaultFilters,
    setActiveRoute: (r) => set({ activeRoute: r }),
    openAddModal: () => set({ isAddModalOpen: true }),
    closeAddModal: () => set({ isAddModalOpen: false }),
    openEditModal: (t) => set({ editingTransaction: t }),
    closeEditModal: () => set({ editingTransaction: null }),
    setFilter: (key, value) => set((s) => ({
        filters: { ...s.filters, [key]: value, ...(key !== 'page' ? { page: 1 } : {}) },
    })),
    resetFilters: () => set({ filters: defaultFilters }),
}));
