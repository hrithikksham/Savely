import React from 'react';
import { clsx } from 'clsx';

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
}
export function Card({ dark, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl p-5',
        dark ? 'bg-[#2a2a2a] text-white' : 'bg-white text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
const BADGE_VARIANTS: Record<string, string> = {
  income:         'bg-green-100 text-green-700',
  expense:        'bg-red-100 text-red-600',
  Rent:           'bg-red-100 text-red-500',
  Shopping:       'bg-pink-100 text-pink-600',
  'Food & Dining':'bg-purple-100 text-purple-600',
  Transportation: 'bg-blue-100 text-blue-600',
  Healthcare:     'bg-orange-100 text-orange-600',
  Utilities:      'bg-lime-100 text-lime-700',
  Entertainment:  'bg-emerald-100 text-emerald-600',
  Salary:         'bg-teal-100 text-teal-600',
  Freelance:      'bg-sky-100 text-sky-600',
  Investment:     'bg-yellow-100 text-yellow-700',
  Other:          'bg-gray-100 text-gray-600',
};

interface BadgeProps {
  label: string;
  variant?: string;
}
export function Badge({ label, variant }: BadgeProps) {
  const cls = BADGE_VARIANTS[variant ?? label] ?? 'bg-gray-100 text-gray-600';
  return (
    <span className={clsx('px-3 py-1 rounded-full text-xs font-medium', cls)}>
      {label}
    </span>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
}
export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150',
        size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm',
        variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
        variant === 'ghost'   && 'bg-transparent text-gray-500 hover:bg-gray-100',
        variant === 'danger'  && 'bg-transparent text-red-400 hover:text-red-600',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  dark?: boolean;
}
export function Input({ dark, className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'w-full rounded-xl px-4 py-2 text-sm outline-none transition-all',
        dark
          ? 'bg-[#1e1e1e] text-white placeholder-gray-500 border border-transparent focus:border-blue-500'
          : 'bg-gray-100 text-gray-900 placeholder-gray-400 border border-transparent focus:border-blue-400',
        className
      )}
      {...props}
    />
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  dark?: boolean;
}
export function Select({ dark, className, children, ...props }: SelectProps) {
  return (
    <select
      className={clsx(
        'rounded-xl px-3 py-2 text-sm outline-none cursor-pointer transition-all',
        dark
          ? 'bg-[#1e1e1e] text-white border border-transparent focus:border-blue-500'
          : 'bg-gray-100 text-gray-800 border border-transparent focus:border-blue-400',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

// ─── Arrow button (dashboard cards) ──────────────────────────────────────────
interface ArrowBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  blue?: boolean;
}
export function ArrowBtn({ blue, className, ...props }: ArrowBtnProps) {
  return (
    <button
      className={clsx(
        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
        blue ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-800 text-white hover:bg-gray-700',
        className
      )}
      {...props}
    >
      ↗
    </button>
  );
}