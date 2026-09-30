export function formatCedis(amount: number): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-GH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(absAmount);

  return `${isNegative ? '-' : ''}GH¢${formatted}`;
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-GH').format(val);
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function getScoreColorClass(score: number): {
  text: string;
  bg: string;
  border: string;
  badge: string;
} {
  if (score >= 80) {
    return {
      text: 'text-emerald-700 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-200 dark:border-emerald-800/40',
      badge: 'bg-emerald-600',
    };
  }
  if (score >= 65) {
    return {
      text: 'text-amber-700 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800/40',
      badge: 'bg-amber-500',
    };
  }
  return {
    text: 'text-rose-700 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-800/40',
    badge: 'bg-rose-500',
  };
}

// ---- Real-data summaries (used by the dashboard) ----
import type { Transaction } from '../types';

const DAY = 86400000;
export function summarize(txs: Transaction[], days: number) {
  const from = Date.now() - days * DAY;
  const inRange = txs.filter((t) => new Date(t.date).getTime() >= from);
  const revenue = inRange.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expenses = inRange.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  return { revenue, expenses, net: revenue - expenses, count: inRange.length };
}

export function buildSeries(txs: Transaction[], range: '7d' | '30d' | '3m' | '12m') {
  const now = new Date();
  const buckets: { label: string; start: number; end: number; revenue: number; expense: number; cashflow: number }[] = [];
  if (range === '7d' || range === '30d') {
    const n = range === '7d' ? 7 : 4;
    const size = range === '7d' ? DAY : 7 * DAY;
    const end0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() + DAY;
    for (let i = n - 1; i >= 0; i--) {
      const end = end0 - i * size, start = end - size;
      const label = range === '7d'
        ? new Date(start).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })
        : `Week ${n - i}`;
      buckets.push({ label, start, end, revenue: 0, expense: 0, cashflow: 0 });
    }
  } else {
    const n = range === '3m' ? 3 : 12;
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const e = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      buckets.push({
        label: d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }),
        start: d.getTime(), end: e.getTime(), revenue: 0, expense: 0, cashflow: 0,
      });
    }
  }
  for (const t of txs) {
    const ts = new Date(t.date).getTime();
    const b = buckets.find((x) => ts >= x.start && ts < x.end);
    if (!b) continue;
    if (t.amount > 0) b.revenue += t.amount; else b.expense += Math.abs(t.amount);
  }
  buckets.forEach((b) => (b.cashflow = b.revenue - b.expense));
  return buckets;
}
