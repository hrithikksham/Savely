import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction } from '../lib/data';
const QK = 'transactions';
export function useTransactions() {
    return useQuery({
        queryKey: [QK],
        queryFn: fetchTransactions,
        staleTime: 30000,
    });
}
export function useAddTransaction() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: addTransaction,
        onMutate: async (newT) => {
            await qc.cancelQueries({ queryKey: [QK] });
            const prev = qc.getQueryData([QK]);
            qc.setQueryData([QK], old => [{ ...newT, id: 'optimistic-' + Date.now() }, ...(old ?? [])]);
            return { prev };
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.prev)
                qc.setQueryData([QK], ctx.prev);
        },
        onSettled: () => qc.invalidateQueries({ queryKey: [QK] }),
    });
}
export function useUpdateTransaction() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: updateTransaction,
        onMutate: async (updated) => {
            await qc.cancelQueries({ queryKey: [QK] });
            const prev = qc.getQueryData([QK]);
            qc.setQueryData([QK], old => old?.map(t => t.id === updated.id ? updated : t) ?? []);
            return { prev };
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.prev)
                qc.setQueryData([QK], ctx.prev);
        },
        onSettled: () => qc.invalidateQueries({ queryKey: [QK] }),
    });
}
export function useDeleteTransaction() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: deleteTransaction,
        onMutate: async (id) => {
            await qc.cancelQueries({ queryKey: [QK] });
            const prev = qc.getQueryData([QK]);
            qc.setQueryData([QK], old => old?.filter(t => t.id !== id) ?? []);
            return { prev };
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.prev)
                qc.setQueryData([QK], ctx.prev);
        },
        onSettled: () => qc.invalidateQueries({ queryKey: [QK] }),
    });
}
