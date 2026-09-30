import React, { useState } from 'react';
import { formatCedis, buildSeries } from '../../utils/formatters';
import { Transaction } from '../../types';

interface RevenueCashflowChartProps {
  timeRange: string;
  transactions: Transaction[];
}

export const RevenueCashflowChart: React.FC<RevenueCashflowChartProps> = ({ timeRange, transactions }) => {
  const [activeTab, setActiveTab] = useState<'7d' | '30d' | '3m' | '12m'>('30d');
  const [hoveredPoint, setHoveredPoint] = useState<{
    label: string;
    revenue: number;
    expense: number;
    cashflow: number;
    x: number;
    y: number;
  } | null>(null);

  const currentData = buildSeries(transactions, activeTab);
  const totalRev = currentData.reduce((t, d) => t + d.revenue, 0);
  const totalExp = currentData.reduce((t, d) => t + d.expense, 0);
  const netMargin = totalRev > 0 ? ((totalRev - totalExp) / totalRev) * 100 : 0;
  const maxVal = Math.max(1, ...currentData.map(d => Math.max(d.revenue, d.expense))) * 1.15;
  const height = 220;
  const width = 640;
  const paddingX = 40;
  const paddingY = 24;

  const getX = (index: number) => {
    return paddingX + (index * (width - 2 * paddingX)) / (currentData.length - 1);
  };

  const getY = (val: number) => {
    return height - paddingY - (val / maxVal) * (height - 2 * paddingY);
  };

  // Generate SVG path strings
  const revenuePoints = currentData.map((d, i) => `${getX(i)},${getY(d.revenue)}`).join(' ');
  const expensePoints = currentData.map((d, i) => `${getX(i)},${getY(d.expense)}`).join(' ');

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
      
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
        <div>
          <h3 className="text-sm font-bold text-neutral-900">Revenue & Cash Flow Dynamics</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Based on your recorded transactions</p>
        </div>

        {/* Tabular period selector (functional buttons) */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg self-start sm:self-auto">
          {(['7d', '30d', '3m', '12m'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-white text-neutral-900 shadow-xs' 
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {tab === '7d' ? '7 days' : tab === '30d' ? '30 days' : tab === '3m' ? '3 months' : '12 months'}
            </button>
          ))}
        </div>
      </div>

      {/* Legend & Summary Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-2 text-xs">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="text-neutral-600 font-medium">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-800"></span>
            <span className="text-neutral-600 font-medium">Expenses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-neutral-600 font-medium">Net Cash Flow</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-neutral-500 text-[11px]">Net Margin: </span>
          <span className="font-bold text-emerald-700 tabular-nums">{netMargin.toFixed(1)}%</span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative mt-2 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-56 select-none"
        >
          {/* Subtle Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = height - paddingY - pct * (height - 2 * paddingY);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#F3F4F6"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] fill-neutral-400 tabular-nums font-mono"
                >
                  {Math.round((pct * maxVal) / 1000)}k
                </text>
              </g>
            );
          })}

          {/* Revenue Line */}
          <polyline
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={revenuePoints}
          />

          {/* Expense Line */}
          <polyline
            fill="none"
            stroke="#1F2937"
            strokeWidth="2"
            strokeDasharray="4 3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={expensePoints}
          />

          {/* Data Interactive Anchor Points */}
          {currentData.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.revenue);
            return (
              <g key={i}>
                {/* Vertical hover guide */}
                <line
                  x1={cx}
                  y1={paddingY}
                  x2={cx}
                  y2={height - paddingY}
                  stroke={hoveredPoint?.label === d.label ? '#D1D5DB' : 'transparent'}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />

                {/* Revenue circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={hoveredPoint?.label === d.label ? 5 : 3.5}
                  className="fill-emerald-600 stroke-white stroke-2 cursor-pointer transition-all"
                  onMouseEnter={() =>
                    setHoveredPoint({
                      label: d.label,
                      revenue: d.revenue,
                      expense: d.expense,
                      cashflow: d.cashflow,
                      x: cx,
                      y: cy,
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* X-axis label */}
                <text
                  x={cx}
                  y={height - 6}
                  textAnchor="middle"
                  className="text-[10px] fill-neutral-500 font-medium"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="absolute z-20 bg-neutral-900 text-white rounded-lg p-3 text-xs shadow-xl border border-neutral-700 pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
              marginTop: '-10px',
            }}
          >
            <p className="font-semibold text-neutral-300 border-b border-neutral-800 pb-1 mb-1.5">
              {hoveredPoint.label}
            </p>
            <div className="space-y-1">
              <div className="flex justify-between gap-4">
                <span className="text-emerald-400">Revenue:</span>
                <span className="font-bold tabular-nums">{formatCedis(hoveredPoint.revenue)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-400">Expense:</span>
                <span className="font-bold tabular-nums">{formatCedis(hoveredPoint.expense)}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-neutral-800 pt-1 text-emerald-300">
                <span>Net Cash:</span>
                <span className="font-bold tabular-nums">{formatCedis(hoveredPoint.cashflow)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
