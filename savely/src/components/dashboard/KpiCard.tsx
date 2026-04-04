import { ArrowBtn } from '../ui/primitives';
import { clsx } from 'clsx';

interface KpiCardProps {
  title: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  dark?: boolean;
  blueArrow?: boolean;
}

export function KpiCard({ title, value, delta, deltaPositive, dark, blueArrow }: KpiCardProps) {
  return (
    <div className={clsx(
      'rounded-2xl p-5 flex flex-col gap-3',
      dark ? 'bg-[#2a2a2a]' : 'bg-[#f0f0f0]'
    )}>
      <div className="flex items-center justify-between">
        <span className={clsx('text-sm font-medium', dark ? 'text-gray-300' : 'text-gray-700')}>
          {title}
        </span>
        <ArrowBtn blue={blueArrow} />
      </div>
      <div className={clsx('text-3xl font-semibold', dark ? 'text-white' : 'text-gray-900')}>
        {value}
      </div>
      {delta && (
        <span className={clsx('text-xs font-medium', deltaPositive ? 'text-green-500' : 'text-red-400')}>
          {delta}
        </span>
      )}
    </div>
  );
}