import React from 'react';
import { ShieldCheck, Lock, Landmark, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { ViewMode } from '../../types';

interface SecurityTrustProps {
  onNavigate: (view: ViewMode) => void;
  onOpenInstitutionalPortal: () => void;
}

export const SecurityTrust: React.FC<SecurityTrustProps> = ({ onNavigate, onOpenInstitutionalPortal }) => {
  return (
    <section className="py-20 bg-neutral-50/60 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dual Solutions: For Businesses & For Institutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Solution 1: For Businesses */}
          <div id="solutions-sme" className="bg-white rounded-2xl border border-neutral-200 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-neutral-950">For Growing Businesses</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Whether you run an electronics shop in Osu, a wholesale food depot in Makola, or a digital agency in Airport City, Creda automates your financial bookkeeping, gives you intelligent cash insights, and puts you in front of licensed banks.
              </p>
              
              <ul className="space-y-2.5 pt-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-time reconciliation of MTN MoMo & Telecel cash sales</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Professional invoicing with instant payment notification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent credit readiness feedback to qualify for lower loan rates</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('signup')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-950 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <span>Create Business Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Solution 2: For Financial Institutions */}
          <div id="solutions-institutions" className="bg-white rounded-2xl border border-neutral-200 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-neutral-950">For Financial Institutions & Banks</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Underwrite SME credit with confidence. Access verified transaction streams, real-time debt service capacity, and continuous fraud monitoring through our authorized institution portal and risk APIs.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified cash turnover straight from source telemetry (zero PDF tampering)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standardized Creda Passport risk scoring for fast-track credit committees</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Early warning alerts on counterparty invoice defaults or revenue drop-offs</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenInstitutionalPortal}
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                <span>Launch Institutional Partner Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Security & Regulatory Standards Banner */}
        <div className="bg-neutral-900 rounded-2xl text-white p-8 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise Security & Data Protection</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white [text-wrap:balance]">
                Designed with bank-grade security and Ghana Data Protection compliance.
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
                We believe your financial data belongs exclusively to you. All mobile money and banking integrations utilize strictly read-only tokenization with 256-bit encryption. Creda never moves your funds, and never sells your data to third parties.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Read-Only API Tokens</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>256-Bit TLS Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ghana Act 843 Compliant</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-xl overflow-hidden border border-neutral-700 shadow-lg aspect-16/10">
                <img
                  src="/src/assets/images/partner_bank_hq_1790728677213.jpg"
                  alt="Financial district Accra banking headquarters partner"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
