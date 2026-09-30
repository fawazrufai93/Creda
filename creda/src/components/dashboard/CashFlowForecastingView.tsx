import React, { useState } from 'react';
import { 
  LineChart, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  Sliders, 
  ArrowRight,
  Info,
  Calendar,
  DollarSign
} from 'lucide-react';
import { formatCedis } from '../../utils/formatters';

export const CashFlowForecastingView: React.FC = () => {
  const [horizon, setHorizon] = useState<'30d' | '60d' | '90d'>('60d');
  const [scenarioDelayDebtor, setScenarioDelayDebtor] = useState<boolean>(false);
  const [inventorySpend, setInventorySpend] = useState<number>(0);
  const [salesGrowthDelta, setSalesGrowthDelta] = useState<number>(0);

  // Base assumptions for Golden Gateway Electronics
  const currentReserve = 14350; // GH¢
  const baseMonthlyInflow = 42800;
  const baseMonthlyOutflow = 28450;
  const baseMonthlyNet = baseMonthlyInflow - baseMonthlyOutflow; // 14,350

  const daysMultiplier = horizon === '30d' ? 1 : horizon === '60d' ? 2 : 3;

  // Impact calculations
  const debtorDelayImpact = scenarioDelayDebtor ? -4800 : 0;
  const inventoryImpact = -inventorySpend;
  const salesAdjustment = (baseMonthlyInflow * (salesGrowthDelta / 100)) * daysMultiplier;
  
  const projectedSurplus = (baseMonthlyNet * daysMultiplier) + salesAdjustment;
  const endProjectedReserve = Math.max(0, currentReserve + projectedSurplus + debtorDelayImpact + inventoryImpact);

  // Points for the graph
  const timelinePoints = horizon === '30d' 
    ? [
        { label: 'Day 0', amount: currentReserve },
        { label: 'Day 10', amount: currentReserve + 3200 + (debtorDelayImpact * 0.3) - (inventorySpend * 0.5) },
        { label: 'Day 20', amount: currentReserve + 8100 + (debtorDelayImpact * 0.7) - (inventorySpend * 0.8) },
        { label: 'Day 30', amount: endProjectedReserve },
      ]
    : horizon === '60d'
    ? [
        { label: 'Current', amount: currentReserve },
        { label: 'Oct 15', amount: currentReserve + 6500 - (inventorySpend * 0.6) },
        { label: 'Oct 31', amount: currentReserve + 13800 + debtorDelayImpact - inventorySpend },
        { label: 'Nov 15', amount: currentReserve + 21000 + debtorDelayImpact - inventorySpend + (salesAdjustment * 0.5) },
        { label: 'Nov 30', amount: endProjectedReserve },
      ]
    : [
        { label: 'Current', amount: currentReserve },
        { label: 'Oct', amount: currentReserve + 14000 - inventorySpend + debtorDelayImpact },
        { label: 'Nov', amount: currentReserve + 28500 - inventorySpend + debtorDelayImpact + (salesAdjustment * 0.6) },
        { label: 'Dec', amount: endProjectedReserve },
      ];

  const maxVal = Math.max(...timelinePoints.map(p => p.amount)) * 1.25 || 25000;
  const width = 640;
  const height = 220;
  const paddingX = 45;
  const paddingY = 25;

  const getX = (idx: number) => paddingX + (idx * (width - 2 * paddingX)) / (timelinePoints.length - 1);
  const getY = (val: number) => height - paddingY - (Math.max(0, val) / maxVal) * (height - 2 * paddingY);
  const pointsStr = timelinePoints.map((p, i) => `${getX(i)},${getY(p.amount)}`).join(' ');

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold text-neutral-950">Cash-Flow Forecasting & Runway</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Predictive liquidity modeling factoring in recurring receivables, confirmed invoices, and supplier cycles.
          </p>
        </div>

        {/* Horizon Toggle */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
          {(['30d', '60d', '90d'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                horizon === h ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {h === '30d' ? '30 Days' : h === '60d' ? '60 Days (Q4)' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500 font-medium">Current Liquid Reserve</span>
          <p className="text-2xl font-bold text-neutral-950 mt-1 tabular-nums">{formatCedis(currentReserve)}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Ecobank + MoMo active balances</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500 font-medium">Projected Ending Reserve</span>
          <p className={`text-2xl font-bold mt-1 tabular-nums ${endProjectedReserve < 5000 ? 'text-rose-600' : 'text-emerald-700'}`}>
            {formatCedis(endProjectedReserve)}
          </p>
          <p className="text-[11px] text-neutral-500 mt-0.5">
            {endProjectedReserve < 5000 ? 'Warning: Low liquidity cushion' : 'Adequate buffer maintained'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500 font-medium">Committed Payables (Next 30d)</span>
          <p className="text-2xl font-bold text-neutral-900 mt-1 tabular-nums">GH¢18,450</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Wholesale inventory, rent, ECG utilities</p>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Liquidity Runway Trajectory</h3>
            <p className="text-xs text-neutral-500">Live simulation includes adjustments below</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            94% Predictive Confidence
          </span>
        </div>

        <div className="relative w-full">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56 select-none">
            {/* Grid */}
            {[0, 0.33, 0.66, 1].map((pct, idx) => {
              const y = height - paddingY - pct * (height - 2 * paddingY);
              return (
                <g key={idx}>
                  <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#F3F4F6" strokeWidth="1" />
                  <text x={paddingX - 6} y={y + 3} textAnchor="end" className="text-[9px] fill-neutral-400 tabular-nums font-mono">
                    {Math.round((pct * maxVal) / 1000)}k
                  </text>
                </g>
              );
            })}

            {/* Threshold Line: Minimum operating buffer */}
            <line
              x1={paddingX}
              y1={getY(5000)}
              x2={width - paddingX}
              y2={getY(5000)}
              stroke="#FCA5A5"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text x={width - paddingX} y={getY(5000) - 4} textAnchor="end" className="text-[9px] fill-rose-500 font-semibold">
              Min Safety Buffer (GH¢5,000)
            </text>

            {/* Trajectory Polyline */}
            <polyline
              fill="none"
              stroke="#059669"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsStr}
            />

            {/* Points */}
            {timelinePoints.map((pt, i) => {
              const cx = getX(i);
              const cy = getY(pt.amount);
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="4" className="fill-emerald-600 stroke-white stroke-2" />
                  <text x={cx} y={height - 6} textAnchor="middle" className="text-[10px] fill-neutral-500 font-medium">
                    {pt.label}
                  </text>
                  <text x={cx} y={cy - 8} textAnchor="middle" className="text-[9px] fill-neutral-700 font-bold tabular-nums">
                    {Math.round(pt.amount / 1000)}k
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Interactive Scenario Simulator */}
      <div className="bg-neutral-900 text-white rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-base font-bold text-white">Interactive Scenario Simulator</h3>
            <p className="text-xs text-neutral-400">Test business decisions and supplier shocks before spending cash.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Scenario 1: Additional Inventory Spend */}
          <div className="p-4 bg-neutral-800 rounded-xl border border-neutral-700 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-neutral-300">New Inventory Purchase</span>
              <span className="font-bold text-emerald-400 tabular-nums">{formatCedis(inventorySpend)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="25000"
              step="1000"
              value={inventorySpend}
              onChange={(e) => setInventorySpend(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-neutral-400">
              Simulate cash outlay for wholesale shipments from Accra West Tech.
            </p>
          </div>

          {/* Scenario 2: Debtor Delayed */}
          <div className="p-4 bg-neutral-800 rounded-xl border border-neutral-700 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-neutral-300">Volta Invoice Delayed 14d</span>
              <input
                type="checkbox"
                checked={scenarioDelayDebtor}
                onChange={(e) => setScenarioDelayDebtor(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-neutral-400">
              Hold back GH¢4,800 expected debtor inflow to model supplier payment pressure.
            </p>
            {scenarioDelayDebtor && (
              <span className="inline-block text-[10px] font-semibold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded">
                -GH¢4,800 working capital impact
              </span>
            )}
          </div>

          {/* Scenario 3: Sales Growth Shift */}
          <div className="p-4 bg-neutral-800 rounded-xl border border-neutral-700 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-neutral-300">Sales Growth Shift</span>
              <span className="font-bold text-emerald-400 tabular-nums">
                {salesGrowthDelta >= 0 ? `+${salesGrowthDelta}%` : `${salesGrowthDelta}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="30"
              step="5"
              value={salesGrowthDelta}
              onChange={(e) => setSalesGrowthDelta(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-neutral-400">
              Anticipate high season Christmas retail sales vs. rainy-season slowdown.
            </p>
          </div>

        </div>

        {/* Live Simulator Conclusion */}
        <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-neutral-200">Simulation Outcome:</span>
            <p className="text-neutral-400 mt-0.5">
              Net runway after simulated events: <strong className="text-emerald-400 tabular-nums">{formatCedis(endProjectedReserve)}</strong>
              {endProjectedReserve < 5000 && ' (Cushion falls below safety threshold of GH¢5,000)'}
            </p>
          </div>

          <button
            onClick={() => {
              setInventorySpend(0);
              setScenarioDelayDebtor(false);
              setSalesGrowthDelta(0);
            }}
            className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
          >
            Reset Simulator
          </button>
        </div>

      </div>

    </div>
  );
};
