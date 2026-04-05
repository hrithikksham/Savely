import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Transaction } from '../../types';
import { useAddTransaction, useUpdateTransaction } from '../../hooks/useTransactions';

// Define categories locally so Zod and the UI Dropdown are perfectly synced
const CATEGORIES = [
  'Rent', 'Shopping', 'Food & Dining', 'Transportation', 
  'Healthcare', 'Utilities', 'Entertainment', 'Salary', 
  'Freelance', 'Investment', 'Other'
] as const;

const TYPES = ['income', 'expense'] as const;

const schema = z.object({
  description: z.string().min(1, 'Description is required').max(80),
  date:        z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  category:    z.enum(CATEGORIES),
  type:        z.enum(TYPES),
  amount:      z.number({ error: 'Enter a valid amount' }).positive('Must be greater than 0'),
});

type FormValues = z.infer<typeof schema>;

export function TransactionModal({ transaction, onClose }: { transaction?: Transaction | null; onClose: () => void }) {
  const isEdit       = Boolean(transaction);
  const addMutation  = useAddTransaction();
  const editMutation = useUpdateTransaction();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: transaction
      ? { 
          description: transaction.description, 
          date: transaction.date, 
          // Assert types so TS knows they match the exact strings
          category: transaction.category as FormValues['category'], 
          type: transaction.type as FormValues['type'], 
          amount: transaction.amount 
        }
      : { 
          date: new Date().toISOString().split('T')[0], 
          type: 'expense', 
          category: 'Shopping', 
          amount: undefined 
        },
  });

  useEffect(() => {
    if (transaction) {
      reset({ 
        description: transaction.description, 
        date: transaction.date, 
        category: transaction.category as FormValues['category'], 
        type: transaction.type as FormValues['type'], 
        amount: Math.abs(transaction.amount) // Ensure positive number for form
      });
    }
  }, [transaction, reset]);

  async function onSubmit(values: FormValues) {
    try {
      if (isEdit && transaction) {
        await editMutation.mutateAsync({ ...transaction, ...values });
      } else {
        await addMutation.mutateAsync(values);
      }
      onClose();
    } catch(e) { 
      console.error(e); 
    }
  }

  // Common input classes for clean, reusable Tailwind styling
  const inputClasses = "w-full bg-[#1e1e1e] text-white border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-[12px] px-3.5 py-2.5 text-[13px] outline-none transition-all placeholder-gray-500";

  return (
    <div 
      onClick={e => e.target === e.currentTarget && onClose()} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="bg-[#2a2a2a] rounded-[24px] p-6 w-full max-w-[440px] shadow-2xl modal-animate">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-[18px] m-0">
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-400 hover:text-white hover:bg-[#3a3a3a] p-1.5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field label="Description" error={errors.description?.message}>
            <input 
              {...register('description')} 
              placeholder="e.g. Monthly Salary" 
              autoFocus 
              className={inputClasses} 
            />
          </Field>
          
          <Field label="Date" error={errors.date?.message}>
            <input 
              {...register('date')} 
              type="date" 
              className={inputClasses} 
            />
          </Field>
          
          <div className="grid grid-cols-2 gap-3">
            <Field label="Type" error={errors.type?.message}>
              <select {...register('type')} className={inputClasses}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </Field>
            
            <Field label="Category" error={errors.category?.message}>
              <select {...register('category')} className={inputClasses}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          
          <Field label="Amount (₹)" error={errors.amount?.message}>
            <input 
              {...register('amount', { valueAsNumber: true })} 
              type="number" 
              step="any" 
              min="1" 
              placeholder="0.00" 
              className={inputClasses} 
            />
          </Field>
          
          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-2.5 rounded-[12px] border border-[#444] bg-transparent text-gray-300 text-[13px] font-medium hover:bg-[#333] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-1 py-2.5 rounded-[12px] border-none bg-[#1d4ed8] text-white text-[13px] font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Saving…' : isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

// Reusable Field wrapper
function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-400 text-[11px] font-medium tracking-wide uppercase">
        {label}
      </label>
      {children}
      {error && <span className="text-red-400 text-[11px] mt-0.5">{error}</span>}
    </div>
  );
}