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
