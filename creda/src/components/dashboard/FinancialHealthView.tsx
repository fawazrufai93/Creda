import React from 'react';
import { 
  HeartPulse, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight, 
  ArrowUpRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { FinancialPassportData } from '../../types';
import { formatCedis } from '../../utils/formatters';

interface FinancialHealthViewProps {
  passport: FinancialPassportData;
  onAskAI: (prompt: string) => void;
  onOpenInvoices: () => void;
}

export const FinancialHealthView: React.FC<FinancialHealthViewProps> = ({
  passport,
  onAskAI,
  onOpenInvoices,
}) => {
  const mk = (name: string, score: number) => ({
    name, score, benchmark: 0,
    status: score > 0 ? 'Scored' : 'Awaiting data',
    description: score > 0 ? 'Calculated from your recorded business activity.' : 'Not enough recorded activity to score this yet.',
    action: 'Keep recording transactions and invoices to build this score.',
  });
  const pillars = [
    mk('Cash-Flow Stability', passport.cashFlowStabilityScore),
    mk('Payment Behaviour', passport.paymentBehaviourScore),
    mk('Business History', passport.businessHistoryScore),
    mk('Revenue Consistency', passport.revenueConsistencyScore),
    mk('Expense Management', passport.expenseManagementScore),
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-neutral-950">Financial Health Diagnostics</h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            Healthy (82/100)
          </span>
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">
          Algorithmic credit and solvency analysis modeled on Bank of Ghana SME risk guidelines.
        </p>
      </div>

      {/* Main Score & Benchmark Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-4 text-center sm:text-left border-b lg:border-b-0 lg:border-r border-neutral-200 pb-6 lg:pb-0 lg:pr-8">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
              Aggregated Health Grade
            </span>
            <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-2">
              <span className="text-5xl font-extrabold text-neutral-950 tabular-nums tracking-tight">82</span>
              <span className="text-xl font-semibold text-neutral-400">/ 100</span>
            </div>
            <p className="text-xs text-emerald-700 font-semibold mt-1">Healthy Standing · Top 18% in Sector</p>
            <p className="text-xs text-neutral-500 mt-2">
              Your business exceeds the 70-point threshold required for prime Tier-1 bank working capital facilities.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Accra Electronics Sector Comparison
            </h4>
            
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-neutral-800">Your Creda Score</span>
                  <span className="font-bold text-emerald-700 tabular-nums">82 / 100</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '82%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-500">Sector Median (Greater Accra Retailers)</span>
                  <span className="font-mono text-neutral-500 tabular-nums">68 / 100</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div className="bg-neutral-400 h-full rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-500">Commercial Bank Lending Cutoff</span>
                  <span className="font-mono text-neutral-500 tabular-nums">70 / 100</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5 Pillars Detailed Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
          The 5 Pillars of Your Score
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((p) => (
            <div key={p.name} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-neutral-900">{p.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-neutral-950 tabular-nums">{p.score}</span>
                    <span className="text-xs text-neutral-400">/ 100</span>
                  </div>
                </div>

                <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full ${
                      p.score >= 80 ? 'bg-emerald-600' : p.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${p.score}%` }}
                  />
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-start gap-2 text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-lg">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                <span><strong className="text-neutral-900">Next step:</strong> {p.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan to Reach 90+ Score */}
      <div className="bg-neutral-900 text-white rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Optimization Roadmap</span>
            <h3 className="text-lg font-bold text-white mt-0.5">How to unlock Tier-1 Financing (90+ Score)</h3>
          </div>
          <button
            onClick={() => onAskAI("Create a step-by-step financial plan to raise my Creda score from 82 to 90")}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Ask Creda AI Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
