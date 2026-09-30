import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, CheckCircle2, Building2, Landmark, Smartphone } from 'lucide-react';
import { ViewMode } from '../../types';

interface HeroSectionProps {
  onNavigate: (view: ViewMode) => void;
  onExploreDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onExploreDemo }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-neutral-200 bg-white">
      {/* Subtle background architectural grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Financial Infrastructure for West African Commerce</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.1] [text-wrap:balance]">
              Turn your business activity into financial opportunity.
            </h1>

            <p className="text-lg text-neutral-600 max-w-xl leading-relaxed">
              Creda helps Ghanaian businesses understand their cash flow, build a verified financial identity, and unlock fair, structured capital from registered financial institutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('signup')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-white bg-neutral-950 rounded-xl hover:bg-neutral-800 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreDemo}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all border border-neutral-200/80 cursor-pointer"
              >
                <span>See how Creda works</span>
              </button>
            </div>

            {/* Adjacent Trust Proofs */}
            <div className="pt-6 border-t border-neutral-100 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-neutral-900 tabular-nums">GH¢120M+</p>
                <p className="text-xs text-neutral-500 mt-0.5">Tracked SME Volume</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-emerald-700 tabular-nums">91.4%</p>
                <p className="text-xs text-neutral-500 mt-0.5">Invoice Recovery Rate</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-neutral-900 tabular-nums">24h</p>
                <p className="text-xs text-neutral-500 mt-0.5">Average Underwriting</p>
              </div>
            </div>

            {/* Integration badging (clean text) */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-500 pt-2">
              <span className="font-medium text-neutral-700">Reconciled with:</span>
              <span>MTN Mobile Money</span>
              <span aria-hidden="true">·</span>
              <span>Telecel Cash</span>
              <span aria-hidden="true">·</span>
              <span>Ecobank Ghana</span>
              <span aria-hidden="true">·</span>
              <span>GCB Bank</span>
              <span aria-hidden="true">·</span>
              <span>GRA e-VAT</span>
            </div>
          </div>

          {/* Right Column: Hero Visual & Live Dashboard Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xl bg-neutral-100 aspect-16/10">
                <img
                  src="/src/assets/images/hero_sme_accra_1790728655786.jpg"
                  alt="Ghanaian retail entrepreneur in modern Accra store using Creda"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between text-xs font-medium text-neutral-300 mb-1">
                    <span>Accra Retailer Showcase</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Profile
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">Golden Gateway Electronics Ltd</p>
                  <p className="text-xs text-neutral-300">Osu Oxford Street · Trade Volume GH¢52,400/mo</p>
                </div>
              </div>

              {/* Floating Live Passport & Cash Flow Card */}
              <div className="mt-4 sm:-mt-10 sm:ml-6 relative z-10 bg-white rounded-xl border border-neutral-200 shadow-xl p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-neutral-500 font-medium">Verified Financial Identity</span>
                    <h4 className="text-base font-bold text-neutral-900">Creda Financial Passport</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      82 / 100
                    </span>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Healthy Standing</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-neutral-100 text-xs">
                  <div>
                    <span className="text-neutral-500">Monthly Net Cash Flow</span>
                    <p className="text-sm font-bold text-neutral-900 tabular-nums">+GH¢14,350</p>
                  </div>
                  <div>
                    <span className="text-neutral-500">Indicative Credit Capacity</span>
                    <p className="text-sm font-bold text-emerald-700 tabular-nums">GH¢25K - GH¢60K</p>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-lg p-2.5 flex items-center gap-2.5 text-xs text-neutral-700 border border-neutral-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">Bank-ready audit trail verified with Bank of Ghana standards</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
