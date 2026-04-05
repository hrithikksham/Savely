import React from 'react';

// ── Arrow Button ──────────────────────────────────────────────────────────────
export function ArrowBtn({ blue }: { blue?: boolean }) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
      background: blue ? '#3B82F6' : '#1a1a1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
const BADGE: Record<string, { bg: string; color: string }> = {
  income:          { bg: '#dcfce7', color: '#16a34a' },
  expense:         { bg: '#fee2e2', color: '#dc2626' },
  Rent:            { bg: '#fee2e2', color: '#ef4444' },
  Shopping:        { bg: '#fce7f3', color: '#db2777' },
  'Food & Dining': { bg: '#f3e8ff', color: '#9333ea' },
  Transportation:  { bg: '#dbeafe', color: '#2563eb' },
  Healthcare:      { bg: '#ffedd5', color: '#ea580c' },
  Utilities:       { bg: '#ecfccb', color: '#65a30d' },
  Entertainment:   { bg: '#d1fae5', color: '#059669' },
  Salary:          { bg: '#ccfbf1', color: '#0d9488' },
  Freelance:       { bg: '#e0f2fe', color: '#0284c7' },
  Investment:      { bg: '#fef9c3', color: '#ca8a04' },
  Other:           { bg: '#f1f5f9', color: '#64748b' },
};

export function Badge({ label, variant }: { label: string; variant?: string }) {
  const key = variant ?? label;
  const { bg, color } = BADGE[key] ?? { bg: '#f1f5f9', color: '#64748b' };
  return (
    <span style={{
      background: bg, color, padding: '3px 10px',
      borderRadius: 999, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' as const,
      display: 'inline-block',
    }}>
      {label}
    </span>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ style, children }: { style?: React.CSSProperties; children: React.ReactNode }) {
  return <div style={{ borderRadius: 16, padding: 20, ...style }}>{children}</div>;
}