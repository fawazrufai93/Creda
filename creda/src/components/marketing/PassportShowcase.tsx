import React from 'react';
import { ShieldCheck, CheckCircle2, FileCheck, Share2, Landmark, ArrowRight, Lock } from 'lucide-react';
import { ViewMode } from '../../types';

interface PassportShowcaseProps {
  onNavigate: (view: ViewMode) => void;
  onViewPassport: () => void;
}

export const PassportShowcase: React.FC<PassportShowcaseProps> = ({ onNavigate, onViewPassport }) => {
  return (
    <section id="passport-section" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Representation of Creda Passport */}
          <div className="lg:col-span-6">
            <div className="bg-neutral-950 text-white rounded-2xl border border-neutral-800 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
              {/* Subtle gold/emerald geometric watermark styling */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/15 rounded-full blur-2xl pointer-events-none" />

              {/* Passport Header */}
              <div className="flex items-start justify-between pb-6 border-b border-neutral-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                    <span className="text-xs uppercase tracking-widest font-semibold text-emerald-400">CREDA FINANCIAL PASSPORT</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">ABC Electronics</h3>
                  <p className="text-xs text-neutral-400">Reg: CS-4492021-ACC · TIN: P002941849X</p>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950 border border-emerald-800/80 rounded-lg text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">Audit Standard: v2.4</p>
                </div>
              </div>

              {/* Central Score Card */}
              <div className="py-6 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">Financial Health Score</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">82</span>
                    <span className="text-lg text-neutral-400 font-medium">/ 100</span>
                  </div>
                  <p className="text-xs text-emerald-400 mt-1 font-medium">Healthy Credit Readiness Grade</p>
                </div>

                <div className="space-y-1.5 text-right text-xs">
                  <div className="flex items-center justify-end gap-2 text-neutral-300">
                    <span className="text-neutral-500">Cash-flow stability:</span>
                    <span className="font-semibold tabular-nums text-white">87</span>
                  </div>
                  <div className="flex items-center justify-end gap-2 text-neutral-300">
                    <span className="text-neutral-500">Revenue consistency:</span>
                    <span className="font-semibold tabular-nums text-white">81</span>
                  </div>
                  <div className="flex items-center justify-end gap-2 text-neutral-300">
                    <span className="text-neutral-500">Payment behaviour:</span>
                    <span className="font-semibold tabular-nums text-white">91</span>
                  </div>
                </div>
              </div>

              {/* Structured Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-b border-neutral-800 text-xs">
                <div>
                  <span className="text-neutral-500 block mb-1">Monthly Revenue</span>
                  <p className="text-sm font-bold text-white tabular-nums">GH¢52,400</p>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">Monthly Cash Flow</span>
                  <p className="text-sm font-bold text-emerald-400 tabular-nums">GH¢11,800</p>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">Annual Volume</span>
                  <p className="text-sm font-bold text-white tabular-nums">GH¢628,800</p>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">Invoice Collection</span>
                  <p className="text-sm font-bold text-emerald-400 tabular-nums">91%</p>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">Business History</span>
                  <p className="text-sm font-bold text-white">3 yrs 8 mos</p>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">Data Feeds</span>
                  <p className="text-sm font-bold text-neutral-300">4 Reconciled</p>
                </div>
              </div>

              {/* Verification & Sharing Footer */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Lock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Encrypted Token ID: CRD-GH-882194</span>
                </div>
                <button
                  onClick={onViewPassport}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Preview Full Passport</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Value Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
              Financial Infrastructure
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 [text-wrap:balance]">
              Your verified financial identity for the modern economy.
            </h2>

            <p className="text-base text-neutral-600 leading-relaxed">
              In Ghana, traditional lending institutions rely on audited paper financials that most SMEs cannot afford to produce. Creda replaces guesswork with continuous, tamper-evident cryptographic data verification.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">Direct API Data Ingestion</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Direct integration with MTN MoMo Merchant, Telecel Cash, and commercial bank open APIs eliminates forged statements.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">Structured Underwriting Ready</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Commercial banks view standardized debt service capacity, reducing underwriting turnaround from 4 weeks to 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">You Own Your Data Permissions</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Grant temporary, revocable access to specific licensed financial institutions without exposing personal identity or raw customer phone numbers.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onViewPassport}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-neutral-950 rounded-xl hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <span>View Financial Passport</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('app')}
                className="text-sm font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer"
              >
                Explore Live Demo
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
