import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { ViewMode } from '../../types';

interface PricingSectionProps {
  onNavigate: (view: ViewMode) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigate }) => {
  return (
    <section id="pricing" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">Simple & Transparent</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 mt-2">
            Fair pricing built for African enterprise growth.
          </h2>
          <p className="text-base text-neutral-600 mt-3">
            Start building your Financial Passport for free. Upgrade as your trade volume and capital needs expand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tier 1: Starter */}
          <div className="rounded-2xl border border-neutral-200 p-8 flex flex-col justify-between hover:border-neutral-300 transition-all">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">For Emerging Traders</p>
              <h3 className="text-xl font-bold text-neutral-950 mt-2">Starter</h3>
              <p className="text-xs text-neutral-500 mt-1">Essential cash tracking and MoMo reconciliation.</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-neutral-950 tabular-nums">GH¢0</span>
                <span className="text-xs text-neutral-500">/ forever free</span>
              </div>

              <ul className="mt-8 space-y-3 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Connect 1 Mobile Money Till (MTN or Telecel)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Up to 15 invoices per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Basic Creda Financial Passport Score</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Community help & documentation</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('signup')}
              className="mt-8 w-full py-2.5 px-4 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Get started free
            </button>
          </div>

          {/* Tier 2: Growth (Featured) */}
          <div className="rounded-2xl border-2 border-neutral-900 bg-neutral-950 text-white p-8 flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[11px] font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">For Scaling SMEs</p>
              <h3 className="text-xl font-bold text-white mt-2">Growth</h3>
              <p className="text-xs text-neutral-400 mt-1">Comprehensive intelligence and institutional credit matching.</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white tabular-nums">GH¢180</span>
                <span className="text-xs text-neutral-400">/ month</span>
              </div>

              <ul className="mt-8 space-y-3 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited MoMo & Commercial Bank syncs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full Creda AI Business Assistant with voice & scenarios</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30/60/90-day predictive cash-flow forecasting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct submission to pre-vetted bank credit desks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated Ghanaian WhatsApp & phone support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('signup')}
              className="mt-8 w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors shadow-xs cursor-pointer"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Tier 3: Institutional */}
          <div className="rounded-2xl border border-neutral-200 p-8 flex flex-col justify-between hover:border-neutral-300 transition-all">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">For Financial Partners</p>
              <h3 className="text-xl font-bold text-neutral-950 mt-2">Institutional API</h3>
              <p className="text-xs text-neutral-500 mt-1">For commercial banks, credit unions, and micro-lenders.</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-neutral-950">Custom Volume</span>
              </div>

              <ul className="mt-8 space-y-3 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Lender portal underwriting console</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>REST API for direct core-banking integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Continuous fraud & default monitoring webhooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom risk weightings and credit policy engine</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('app')}
              className="mt-8 w-full py-2.5 px-4 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Contact Capital Solutions
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
