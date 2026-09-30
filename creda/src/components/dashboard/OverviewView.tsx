import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  HeartPulse, 
  ShieldCheck, 
  Plus, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { RevenueCashflowChart } from './RevenueCashflowChart';
import { FinancialHealthCard } from './FinancialHealthCard';
import { AIInsightsCard } from './AIInsightsCard';
import { 
  FinancialPassportData, 
  Transaction, 
  AIInsightItem, 
  AppTab 
} from '../../types';
import { formatCedis, formatDate } from '../../utils/formatters';

interface OverviewViewProps {
  passport: FinancialPassportData;
  transactions: Transaction[];
  insights: AIInsightItem[];
  timeRange: string;
  onSelectTab: (tab: AppTab) => void;
  onOpenCreateInvoice: () => void;
  onAskAI: (prompt?: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  passport,
  transactions,
  insights,
  timeRange,
  onSelectTab,
  onOpenCreateInvoice,
  onAskAI,
}) => {
  return (
    <div className="space-y-6">
      
      {/* KPI Cards Row (Strict anti-slop tabular metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Revenue */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-neutral-500 mb-2">
            <span>Gross Revenue</span>
            <span className="flex items-center text-emerald-700 font-semibold gap-0.5 tabular-nums">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8.4%
            </span>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tabular-nums tracking-tight">
              GH¢42,800
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              MoMo & Bank settlements this month
            </p>
          </div>
        </div>

        {/* Metric 2: Expenses */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-neutral-500 mb-2">
            <span>Operating Expenses</span>
            <span className="flex items-center text-rose-700 font-semibold gap-0.5 tabular-nums">
              <ArrowUpRight className="w-3.5 h-3.5" /> +3.2%
            </span>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tabular-nums tracking-tight">
              GH¢28,450
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Inventory, utility & logistics disbursements
            </p>
          </div>
        </div>

        {/* Metric 3: Net Cash Flow */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-neutral-500 mb-2">
            <span>Net Operating Cash Flow</span>
            <span className="flex items-center text-emerald-700 font-semibold gap-0.5 tabular-nums">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.8%
            </span>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tabular-nums tracking-tight">
              GH¢14,350
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Net surplus retained in accounts
            </p>
          </div>
        </div>

        {/* Metric 4: Financial Health */}
        <div 
          onClick={() => onSelectTab('health')}
          className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between cursor-pointer hover:border-neutral-300 transition-colors"
        >
          <div className="flex items-center justify-between text-xs font-medium text-neutral-500 mb-2">
            <span>Financial Health</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Healthy
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tabular-nums tracking-tight">
                82
              </p>
              <span className="text-sm font-semibold text-neutral-400">/ 100</span>
            </div>
            <p className="text-xs text-emerald-700 font-medium mt-1">
              Pre-vetted for GH¢60,000 capital line
            </p>
          </div>
        </div>

      </div>

      {/* Main Charts & Health Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Revenue & Cash Flow Chart */}
        <div className="lg:col-span-8 space-y-6">
          <RevenueCashflowChart timeRange={timeRange} />

          {/* Recent Transactions Table */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Recent Transactions</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Continuous auto-categorized ledger</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectTab('transactions')}
                  className="text-xs font-semibold text-neutral-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/60 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <th className="py-3 px-5">Date</th>
                    <th className="py-3 px-5">Description & Counterparty</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-5 text-right">Amount</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs text-neutral-800">
                  {transactions.slice(0, 6).map((tx) => {
                    const isPositive = tx.amount > 0;
                    return (
                      <tr key={tx.id} className="hover:bg-neutral-50/70 transition-colors">
                        <td className="py-3.5 px-5 font-mono text-neutral-500 whitespace-nowrap tabular-nums">
                          {formatDate(tx.date)}
                        </td>
                        <td className="py-3.5 px-5">
                          <p className="font-semibold text-neutral-900 line-clamp-1">{tx.description}</p>
                          <p className="text-[11px] text-neutral-500 line-clamp-1">{tx.counterparty}</p>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-neutral-600 font-medium">{tx.category}</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-neutral-500 text-[11px] font-mono">
                            {tx.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right font-mono font-bold whitespace-nowrap tabular-nums">
                          <span className={isPositive ? 'text-emerald-700' : 'text-neutral-900'}>
                            {formatCedis(tx.amount)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Quick footer */}
            <div className="p-3 bg-neutral-50/60 border-t border-neutral-100 text-center">
              <button
                onClick={() => onSelectTab('transactions')}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                Showing 6 of {transactions.length} reconciled transactions · Open Full Ledger →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Health Card & AI Insights */}
        <div className="lg:col-span-4 space-y-6">
          <FinancialHealthCard
            passport={passport}
            onViewDetails={() => onSelectTab('health')}
          />

          <AIInsightsCard
            insights={insights}
            onAskAI={onAskAI}
          />

          {/* Quick Action Drawer */}
          <div className="bg-neutral-900 text-white rounded-xl p-5 border border-neutral-800 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
              SME Quick Actions
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={onOpenCreateInvoice}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-emerald-400 mb-1" />
                <p className="font-semibold text-white">Create Invoice</p>
                <p className="text-[10px] text-neutral-400">With MoMo pay-link</p>
              </button>

              <button
                onClick={() => onSelectTab('passport')}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                <p className="font-semibold text-white">Share Passport</p>
                <p className="text-[10px] text-neutral-400">With bank lender</p>
              </button>

              <button
                onClick={() => onSelectTab('cashflow')}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition-colors cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400 mb-1" />
                <p className="font-semibold text-white">Forecast Runway</p>
                <p className="text-[10px] text-neutral-400">Next 90 days</p>
              </button>

              <button
                onClick={() => onSelectTab('financing')}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-emerald-400 mb-1" />
                <p className="font-semibold text-white">Apply Capital</p>
                <p className="text-[10px] text-neutral-400">GH¢20k pre-vetted</p>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
