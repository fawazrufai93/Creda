import React from 'react';
import { 
  BarChart3, 
  CreditCard, 
  Bot, 
  LineChart, 
  Receipt, 
  Landmark,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ViewMode } from '../../types';

interface FeaturesGridProps {
  onSelectFeature: (featureKey: string) => void;
  onNavigate: (view: ViewMode) => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onSelectFeature, onNavigate }) => {
  const features = [
    {
      id: 'dashboard',
      title: 'Financial Dashboard',
      description: 'See revenue, expenses, net cash flow, and multi-channel transactions in real time across MTN MoMo, Telecel, and Ghanaian commercial banks.',
      badge: 'Unified Ledger',
      action: 'Explore Dashboard',
      icon: BarChart3,
      metrics: 'GH¢42,800 monthly revenue tracked',
    },
    {
      id: 'passport',
      title: 'Creda Financial Passport',
      description: 'Convert daily trade volume, invoice settlements, and verified bank statements into an auditable financial identity recognized by institutional lenders.',
      badge: 'Verifiable Credential',
      action: 'View Sample Passport',
      icon: ShieldCheck,
      metrics: '82/100 Credit Readiness Score',
    },
    {
      id: 'ai-assistant',
      title: 'AI Business Assistant',
      description: 'Ask questions in plain English or local business terminology. Creda AI calculates inventory affordability, flags margin leakage, and projects cash reserves.',
      badge: 'Business Intelligence',
      action: 'Try Creda AI',
      icon: Bot,
      metrics: 'Plain language financial analysis',
    },
    {
      id: 'cashflow',
      title: 'Cash-Flow Forecasting',
      description: 'Anticipate working capital needs with 30, 60, and 90-day predictive forecasts factoring in overdue invoices, recurring supplier payables, and seasonal sales.',
      badge: 'Predictive Modeling',
      action: 'Simulate Cash Runway',
      icon: LineChart,
      metrics: '94% forecast precision',
    },
    {
      id: 'invoicing',
      title: 'Professional Invoicing',
      description: 'Create, issue, and track invoices with embedded MTN MoMo Merchant pay links and Ghanaian bank transfer instructions. Automate payment reminders.',
      badge: 'Receivables Engine',
      action: 'Create Test Invoice',
      icon: Receipt,
      metrics: '91% average collection rate',
    },
    {
      id: 'financing',
      title: 'Institutional Financing',
      description: 'Unlock structured working capital, inventory advances, and invoice factoring from regulated financial partners based on your verified Creda profile.',
      badge: 'Capital Access',
      action: 'Check Eligibility',
      icon: Landmark,
      metrics: 'GH¢25,000 – GH¢60,000 capacity',
    },
  ];

  return (
    <section id="features" className="py-20 bg-neutral-50/80 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">Comprehensive Platform</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 mt-2 [text-wrap:balance]">
            Everything Ghanaian SMEs need to manage money and prove credibility.
          </h2>
          <p className="text-base text-neutral-600 mt-3">
            Traditional credit scoring ignores informal and mobile money commerce. Creda bridges the gap with verified data aggregation and clear financial intelligence.
          </p>
        </div>

        {/* Feature Cards Grid (Asymmetric Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl border border-neutral-200/90 p-7 flex flex-col justify-between hover:border-neutral-300 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-neutral-500">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-neutral-950 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-700 tabular-nums">
                    {feature.metrics}
                  </span>
                  <button
                    onClick={() => {
                      onNavigate('app');
                      onSelectFeature(feature.id);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span>{feature.action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
