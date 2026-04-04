import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Transaction } from '../../types';
import { ALL_CATEGORIES } from '../../lib/data';
import { useAddTransaction, useUpdateTransaction } from '../../hooks/useTransactions';

const schema = z.object({
  description: z.string().min(1, 'Description is required').max(80),
  date:        z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  category:    z.enum(['Rent','Shopping','Food & Dining','Transportation','Healthcare','Utilities','Entertainment','Salary','Freelance','Investment','Other'] as const),
  type:        z.enum(['income', 'expense'] as const),
  amount:      z.coerce.number().positive('Amount must be positive'),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  transaction?: Transaction | null;
  onClose: () => void;
}

export function TransactionModal({ transaction, onClose }: Props) {
  const isEdit       = Boolean(transaction);
  const addMutation  = useAddTransaction();
  const editMutation = useUpdateTransaction();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: transaction
      ? { description: transaction.description, date: transaction.date, category: transaction.category, type: transaction.type, amount: transaction.amount }
      : { date: new Date().toISOString().split('T')[0], type: 'expense', category: 'Shopping', amount: 0 },
  });

  useEffect(() => {
    if (transaction) reset({ description: transaction.description, date: transaction.date, category: transaction.category, type: transaction.type, amount: transaction.amount });
  }, [transaction, reset]);

  async function onSubmit(values: FormValues) {
    if (isEdit && transaction) {
      await editMutation.mutateAsync({ ...transaction, ...values });
    } else {
      await addMutation.mutateAsync(values);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" style={{backdropFilter:'blur(4px)'}} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#2a2a2a] rounded-2xl p-6 w-full max-w-md shadow-2xl modal-animate">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold text-lg">{isEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field label="Description" error={errors.description?.message}>
            <input {...register('description')} placeholder="e.g. Monthly Salary" className={ic} />
          </Field>
          <Field label="Date" error={errors.date?.message}>
            <input {...register('date')} type="date" className={ic} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Type" error={errors.type?.message}>
              <select {...register('type')} className={ic}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </Field>
            <Field label="Category" error={errors.category?.message}>
              <select {...register('category')} className={ic}>
                {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Amount (₹)" error={errors.amount?.message}>
            <input {...register('amount')} type="number" step="0.01" min="0" placeholder="0.00" className={ic} />
          </Field>
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-xl border border-[#3a3a3a] text-gray-400 text-sm hover:border-gray-500 transition-colors cursor-pointer">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 disabled:opacity-60 transition-colors cursor-pointer">{isSubmitting ? 'Saving…' : isEdit ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const ic = 'w-full bg-[#1e1e1e] text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-blue-500 transition-colors';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-400 text-xs font-medium">{label}</label>
      {children}
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  );
}