import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Share2, 
  Download, 
  Lock, 
  Building2, 
  Landmark, 
  FileCheck, 
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  QrCode
} from 'lucide-react';
import { BusinessProfile, FinancialPassportData } from '../../types';
import { formatCedis, formatDate } from '../../utils/formatters';

interface FinancialPassportViewProps {
  businessProfile: BusinessProfile;
  passport: FinancialPassportData;
}

export const FinancialPassportView: React.FC<FinancialPassportViewProps> = ({
  businessProfile,
  passport,
}) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState('Stanbic Bank SME Desk');

  const profilePillars = [
    { label: 'Revenue Consistency', score: passport.revenueConsistencyScore, desc: 'Stability of weekly sales deposits over 36 months' },
    { label: 'Cash-Flow Stability', score: passport.cashFlowStabilityScore, desc: 'Ability to withstand temporary supplier cost shocks' },
    { label: 'Payment Behaviour', score: passport.paymentBehaviourScore, desc: 'Supplier and utility settlement reliability record' },
    { label: 'Business History', score: passport.businessHistoryScore, desc: 'Verified commercial operations in Greater Accra' },
    { label: 'Invoice Performance', score: passport.invoiceCollectionRate, desc: '91% on-time corporate debtor settlement rate' },
  ];

  const handleCopyToken = () => {
    navigator.clipboard.writeText(`https://verify.creda.gh/passport/crd-gh-882194?auth=stanbic_desk`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-neutral-950">Financial Passport</h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Entity</span>
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Your verified business financial identity for banks, lenders, and trade credit partners.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Dossier</span>
          </button>

          <button
            onClick={() => setShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share with Financial Institutions</span>
          </button>
        </div>
      </div>

      {/* Main Verified Passport Certificate Surface */}
      <div className="bg-neutral-950 text-white rounded-2xl border border-neutral-800 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle geometric background watermark */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

        {/* Certificate Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block"></span>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                REPUBLIC OF GHANA · CREDA FINANCIAL PASSPORT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {businessProfile.name}
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Trading as: {businessProfile.tradingName} · {businessProfile.sector}
            </p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs">
            <span className="text-neutral-500 block">Unique Verification ID:</span>
            <span className="text-white font-bold">CRD-GH-882194-ACC</span>
            <p className="text-[11px] text-emerald-400 mt-0.5">Data Integrity: Cryptographically Signed</p>
          </div>
        </div>

        {/* Core Passport Numerical Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-neutral-800">
          <div>
            <span className="text-xs text-neutral-400 block mb-1">Financial Health Score</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold text-white tabular-nums tracking-tight">{passport.score}</span>
              <span className="text-sm font-semibold text-neutral-400">/ 100</span>
            </div>
            <p className="text-xs text-emerald-400 mt-1 font-medium">Healthy Credit Grade</p>
          </div>

          <div>
            <span className="text-xs text-neutral-400 block mb-1">Average Monthly Revenue</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
              GH¢52,400
            </p>
            <p className="text-xs text-neutral-400 mt-1">Reconciled over 12 months</p>
          </div>

          <div>
            <span className="text-xs text-neutral-400 block mb-1">Monthly Net Cash Flow</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums tracking-tight">
              GH¢11,800
            </p>
            <p className="text-xs text-neutral-400 mt-1">Net surplus velocity</p>
          </div>

          <div>
            <span className="text-xs text-neutral-400 block mb-1">Annual Tracked Volume</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
              GH¢628,800
            </p>
            <p className="text-xs text-neutral-400 mt-1">MTN MoMo + Bank API</p>
          </div>
        </div>

        {/* Operational Reliability & History Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-neutral-800 text-xs">
          <div>
            <span className="text-neutral-500 block mb-0.5">Business History</span>
            <p className="font-bold text-white text-sm">3 years 8 months</p>
          </div>
          <div>
            <span className="text-neutral-500 block mb-0.5">Invoice Recovery Rate</span>
            <p className="font-bold text-emerald-400 text-sm tabular-nums">91% collected</p>
          </div>
          <div>
            <span className="text-neutral-500 block mb-0.5">Ghana TIN Registered</span>
            <p className="font-mono text-white text-sm">{businessProfile.tin}</p>
          </div>
          <div>
            <span className="text-neutral-500 block mb-0.5">Registrar General Dept.</span>
            <p className="font-mono text-white text-sm">{businessProfile.regNumber}</p>
          </div>
        </div>

        {/* Existing Obligations Section */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
              Existing Credit Obligations
            </h4>
            <span className="text-[11px] text-emerald-400">1 Facility Active (Good Standing)</span>
          </div>

          <div className="bg-neutral-900/90 rounded-xl border border-neutral-800 p-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-neutral-500">Lending Partner</span>
                <p className="font-bold text-white mt-0.5">Ecobank SME Micro-Facility</p>
              </div>
              <div>
                <span className="text-neutral-500">Original Amount</span>
                <p className="font-bold text-white mt-0.5 tabular-nums">GH¢18,000</p>
              </div>
              <div>
                <span className="text-neutral-500">Outstanding Balance</span>
                <p className="font-bold text-emerald-400 mt-0.5 tabular-nums">GH¢3,200 (82% paid)</p>
              </div>
              <div>
                <span className="text-neutral-500">Monthly Installment</span>
                <p className="font-bold text-white mt-0.5 tabular-nums">GH¢1,550 / month</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Financial Profile Pillars Breakdown */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold text-neutral-950">Financial Profile Breakdown</h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Institutional underwriting metrics evaluated continuously by Creda's algorithmic credit engine.
          </p>
        </div>

        <div className="space-y-4">
          {profilePillars.map((pillar) => (
            <div key={pillar.label} className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-neutral-900 text-sm">{pillar.label}</span>
                  <p className="text-neutral-500 text-xs mt-0.5">{pillar.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-neutral-950 tabular-nums">{pillar.score}</span>
                  <span className="text-xs text-neutral-400"> / 100</span>
                </div>
              </div>

              <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pillar.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Fintech Disclaimer Banner */}
      <div className="p-4 bg-neutral-100 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
        <p className="font-bold text-neutral-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Creda Trust Distinction Protocol</span>
        </p>
        <p>
          <strong>Verified Financial Data</strong> is sourced directly through automated telemetry from authorized mobile money operators and commercial banking APIs. <strong>Financial Health Scores & Forecasts</strong> are indicative analytical models designed to assist SMEs and underwriters. Final financing approval, risk ratings, and disbursement terms rest solely with licensed financial institutions.
        </p>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs" onClick={() => setShareModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8">
              <h3 className="text-base font-bold text-neutral-900">Authorize Financial Institution Access</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Generate a secure, time-limited token granting a licensed bank credit analyst read-only access to your verified Financial Passport.
              </p>

              <div className="space-y-4 my-5 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Select Lending Desk</label>
                  <select
                    value={selectedRecipient}
                    onChange={(e) => setSelectedRecipient(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white"
                  >
                    <option value="Stanbic Bank SME Desk">Stanbic Bank SME Desk (Accra Branch)</option>
                    <option value="Ecobank SME Capital Africa">Ecobank SME Capital Africa</option>
                    <option value="QuickCredit Enterprise Partner">QuickCredit Enterprise Partner</option>
                    <option value="GCB Bank Commercial Desk">GCB Bank Commercial Desk</option>
                  </select>
                </div>

                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1 text-neutral-600">
                  <p className="font-semibold text-neutral-800">Permissions Granted:</p>
                  <p>✓ Read 12-month verified cash flow</p>
                  <p>✓ View debtor invoice performance</p>
                  <p>✗ Raw customer phone numbers remain masked</p>
                  <p>✓ Automatic revocation after 30 days</p>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Secure Authorization Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      readOnly
                      value={`https://verify.creda.gh/passport/crd-gh-882194?desk=${encodeURIComponent(selectedRecipient)}`}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-50 font-mono text-[11px] text-neutral-600 truncate"
                    />
                    <button
                      onClick={handleCopyToken}
                      className="px-3 py-2 rounded-lg bg-neutral-900 text-white font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex justify-end">
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
