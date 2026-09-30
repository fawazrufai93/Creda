import React from 'react';
import { ViewMode } from '../../types';
import { Wordmark } from '../common/Logo';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <Wordmark size={30} tone="dark" />
            <p className="text-neutral-400 text-xs max-w-sm leading-relaxed">
              Your business. Your financial identity. Building the credit and financial health layer for African small and medium-sized enterprises.
            </p>
            <p className="text-neutral-500 text-[11px] pt-1">
              Accra Office: 14 Senchi Street, Airport Residential Area, Greater Accra, Ghana.
            </p>
          </div>

          {/* Col 1 */}
          <div className="space-y-2.5">
            <p className="text-white font-semibold">Product</p>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('app')} className="hover:text-white transition-colors cursor-pointer">Financial Dashboard</button></li>
              <li><button onClick={() => onNavigate('app')} className="hover:text-white transition-colors cursor-pointer">Creda Passport</button></li>
              <li><button onClick={() => onNavigate('app')} className="hover:text-white transition-colors cursor-pointer">Creda AI Assistant</button></li>
              <li><button onClick={() => onNavigate('app')} className="hover:text-white transition-colors cursor-pointer">Invoicing Engine</button></li>
              <li><button onClick={() => onNavigate('app')} className="hover:text-white transition-colors cursor-pointer">Cash-Flow Forecasting</button></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <p className="text-white font-semibold">Solutions</p>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('signup')} className="hover:text-white transition-colors cursor-pointer">For Retailers & Traders</button></li>
              <li><button onClick={() => onNavigate('signup')} className="hover:text-white transition-colors cursor-pointer">For Distributors</button></li>
              <li><button onClick={() => onNavigate('app')} className="hover:text-white transition-colors cursor-pointer">For Commercial Banks</button></li>
              <li><button onClick={() => onNavigate('app')} className="hover:text-white transition-colors cursor-pointer">For Credit Funds</button></li>
              <li><button onClick={() => onNavigate('app')} className="hover:text-white transition-colors cursor-pointer">Underwriter API</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2.5">
            <p className="text-white font-semibold">Legal & Security</p>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">Data Protection (Act 843)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Security Safeguards</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Regulatory Disclosures</span></li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclosure & Copyright */}
        <div className="pt-8 border-t border-neutral-800 text-[11px] text-neutral-500 space-y-2">
          <p>
            CREDA Technologies Ghana Ltd operates as a financial technology platform and data aggregation service. Creda is not a deposit-taking bank or licensed lender. Indicative financing facilities and credit assessments are underwritten and disbursed exclusively by licensed Ghanaian financial institutions and partner commercial banks.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
            <p>© 2026 CREDA Technologies Ghana Ltd. All rights reserved.</p>
            <p className="text-neutral-400">Made with precision in Accra for Africa.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
