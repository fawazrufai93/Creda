import React, { useState } from 'react';
import { formatCedis } from '../../utils/formatters';

interface RevenueCashflowChartProps {
  timeRange: string;
}

export const RevenueCashflowChart: React.FC<RevenueCashflowChartProps> = ({ timeRange }) => {
  const [activeTab, setActiveTab] = useState<'7d' | '30d' | '3m' | '12m'>('30d');
  const [hoveredPoint, setHoveredPoint] = useState<{
    label: string;
    revenue: number;
    expense: number;
    cashflow: number;
    x: number;
    y: number;
  } | null>(null);

  // Data sets matching the periods
  const chartDatasets = {
    '7d': [
      { label: 'Wed 23', revenue: 18500, expense: 3200, cashflow: 15300 },
      { label: 'Thu 24', revenue: 2400, expense: 2800, cashflow: -400 },
      { label: 'Fri 25', revenue: 5800, expense: 1200, cashflow: 4600 },
      { label: 'Sat 26', revenue: 6200, expense: 1900, cashflow: 4300 },
      { label: 'Sun 27', revenue: 1400, expense: 890, cashflow: 510 },
      { label: 'Mon 28', revenue: 3800, expense: 2100, cashflow: 1700 },
      { label: 'Tue 29', revenue: 4700, expense: 1650, cashflow: 3050 },
    ],
    '30d': [
      { label: 'Week 1', revenue: 9800, expense: 6200, cashflow: 3600 },
      { label: 'Week 2', revenue: 11400, expense: 7100, cashflow: 4300 },
      { label: 'Week 3', revenue: 10200, expense: 8400, cashflow: 1800 },
      { label: 'Week 4', revenue: 11400, expense: 6750, cashflow: 4650 },
    ],
    '3m': [
      { label: 'Jul 2026', revenue: 38900, expense: 26100, cashflow: 12800 },
      { label: 'Aug 2026', revenue: 39500, expense: 27550, cashflow: 11950 },
      { label: 'Sep 2026', revenue: 42800, expense: 28450, cashflow: 14350 },
    ],
    '12m': [
      { label: 'Oct 25', revenue: 31000, expense: 22000, cashflow: 9000 },
      { label: 'Dec 25', revenue: 46000, expense: 33000, cashflow: 13000 },
      { label: 'Feb 26', revenue: 34500, expense: 24500, cashflow: 10000 },
      { label: 'Apr 26', revenue: 37200, expense: 25800, cashflow: 11400 },
      { label: 'Jun 26', revenue: 39100, expense: 26800, cashflow: 12300 },
      { label: 'Aug 26', revenue: 41200, expense: 27900, cashflow: 13300 },
      { label: 'Sep 26', revenue: 42800, expense: 28450, cashflow: 14350 },
    ],
  };

  const currentData = chartDatasets[activeTab];
  const maxVal = Math.max(...currentData.map(d => Math.max(d.revenue, d.expense))) * 1.15;
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
          <p className="text-xs text-neutral-500 mt-0.5">Continuous MoMo & Bank feed reconciliation</p>
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
          <span className="font-bold text-emerald-700 tabular-nums">33.5%</span>
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
