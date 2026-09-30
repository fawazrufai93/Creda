import React, { useState } from 'react';
import { HeartPulse, ArrowUpRight, CheckCircle2, ChevronRight, AlertCircle, Lightbulb } from 'lucide-react';
import { FinancialPassportData } from '../../types';

interface FinancialHealthCardProps {
  passport: FinancialPassportData;
  onViewDetails: () => void;
}

export const FinancialHealthCard: React.FC<FinancialHealthCardProps> = ({
  passport,
  onViewDetails,
}) => {
  const [showTips, setShowTips] = useState<boolean>(false);

  const pillars = [
    { label: 'Cash-flow stability', score: passport.cashFlowStabilityScore, max: 100, note: 'Top 15% in electronics sector' },
    { label: 'Revenue consistency', score: passport.revenueConsistencyScore, max: 100, note: '4 consecutive months > GH¢40k' },
    { label: 'Expense management', score: passport.expenseManagementScore, max: 100, note: 'Inventory costs rose 18%' },
    { label: 'Payment behaviour', score: passport.paymentBehaviourScore, max: 100, note: '91% on-time supplier payment' },
    { label: 'Business history', score: passport.businessHistoryScore, max: 100, note: '3 yrs 8 mos verified in Accra' },
  ];

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex flex-col justify-between">
      
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900">Financial Health Score</h3>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            Healthy
          </span>
        </div>

        {/* Primary Score Dial Representation */}
        <div className="py-5 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-neutral-950 tabular-nums">
                {passport.score}
              </span>
              <span className="text-sm font-medium text-neutral-400">/ 100</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Eligible for prime partner bank facilities.
            </p>
          </div>

          <button
            onClick={() => setShowTips(!showTips)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>{showTips ? 'Hide tips' : 'Improve your score'}</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showTips ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* 5 Pillar Breakdown Bars */}
        <div className="space-y-3 pt-2">
          {pillars.map((pillar) => (
            <div key={pillar.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600 font-medium">{pillar.label}</span>
                <span className="font-bold text-neutral-900 tabular-nums">{pillar.score}</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pillar.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Actionable Recommendations Dropdown / Drawer */}
        {showTips && (
          <div className="mt-5 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-2.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-900">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Recommendations to reach 90+ Score:</span>
            </div>
            <ul className="space-y-2 text-neutral-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Recover Overdue Invoice:</strong> Reconciling the GH¢4,800 Volta Media invoice will raise Payment Behaviour by +3 points.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Buffer Operating Liquidity:</strong> Maintain minimum GH¢10,000 in your Ecobank checking to optimize Cash-Flow Stability.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Connect GRA e-VAT:</strong> Submitting August VAT clearance certificate will verify tax compliance standing.</span>
              </li>
            </ul>
          </div>
        )}

      </div>

      <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between text-xs">
        <span className="text-neutral-500">Updated from continuous telemetry</span>
        <button
          onClick={onViewDetails}
          className="font-semibold text-neutral-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
        >
          <span>View Health Diagnostics</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
