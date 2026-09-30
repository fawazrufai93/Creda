import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  FileText, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Landmark,
  X,
  Lock,
  Download,
  Check
} from 'lucide-react';
import { BankApplicant, initialBankApplicants } from '../../data/mockData';
import { formatCedis } from '../../utils/formatters';

interface FinancialInstitutionPortalProps {
  onBackToSME: () => void;
}

export const FinancialInstitutionPortal: React.FC<FinancialInstitutionPortalProps> = ({
  onBackToSME,
}) => {
  const [applicants, setApplicants] = useState<BankApplicant[]>(initialBankApplicants);
  const [selectedApplicant, setSelectedApplicant] = useState<BankApplicant | null>(null);
  const [activeTab, setActiveTab] = useState<'Applications' | 'Profiles' | 'Risk Signals' | 'Fraud Alerts' | 'Audit Logs'>('Applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [decisionSuccess, setDecisionSuccess] = useState<string | null>(null);

  const filtered = applicants.filter((app) =>
    app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDecision = (appId: string, status: 'Approved' | 'Requires Documentation' | 'Declined') => {
    setApplicants(applicants.map(a => a.id === appId ? { ...a, decisionStatus: status } : a));
    setDecisionSuccess(`Facility decision updated: ${status}`);
    setTimeout(() => {
      setDecisionSuccess(null);
      setSelectedApplicant(null);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header with Lender Credential */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400"></span>
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-semibold">
              STANBIC BANK GHANA · COMMERCIAL CREDIT & UNDERWRITING DESK
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Authorized Partner Portal</h2>
          <p className="text-xs text-neutral-300">
            Evaluating SME financial profiles via cryptographic Creda Passport feeds. Underwriting standard: BoG Risk Framework.
          </p>
        </div>

        <button
          onClick={onBackToSME}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white border border-neutral-700 transition-colors cursor-pointer self-start md:self-auto"
        >
          <span>Return to SME Business View</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {decisionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold text-center">
          {decisionSuccess}
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto text-xs font-semibold">
        {(['Applications', 'Profiles', 'Risk Signals', 'Fraud Alerts', 'Audit Logs'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'bg-neutral-900 text-white font-bold'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Summary KPI Cards for Underwriter */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500">Pending Underwriting</span>
          <p className="text-2xl font-bold text-neutral-950 mt-1 tabular-nums">
            {applicants.filter(a => a.decisionStatus === 'Pending Underwriting').length}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">SMEs awaiting review</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500">Pipeline Requested Volume</span>
          <p className="text-2xl font-bold text-neutral-950 mt-1 tabular-nums">GH¢100,000</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Average facility GH¢33.3k</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500">Telemetry Data Integrity</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">99.4%</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Direct API ingestion (Zero paper)</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500">Active Fraud Alerts</span>
          <p className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">1</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Flagged for manual invoice check</p>
        </div>
      </div>

      {/* Applications / Profiles View */}
      {activeTab === 'Applications' || activeTab === 'Profiles' ? (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden space-y-4">
          
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900">Submitted SME Facility Dossiers</h3>
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search applicant SME..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/60 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-5">Business Name & Sector</th>
                  <th className="py-3 px-4">Passport Score</th>
                  <th className="py-3 px-4">Monthly Revenue</th>
                  <th className="py-3 px-4">Facility Requested</th>
                  <th className="py-3 px-4">Risk Rating</th>
                  <th className="py-3 px-4 text-center">Decision Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-neutral-950">{app.businessName}</p>
                      <p className="text-[11px] text-neutral-500">{app.sector} · {app.city}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700 tabular-nums">
                      {app.passportScore} / 100
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums">
                      {formatCedis(app.monthlyRevenue)}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-neutral-900 font-mono tabular-nums">{formatCedis(app.requestedAmount)}</p>
                      <p className="text-[11px] text-neutral-500">{app.requestedFacility}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        app.riskSignal === 'Low Risk' ? 'bg-emerald-50 text-emerald-800' :
                        app.riskSignal === 'Moderate' ? 'bg-amber-50 text-amber-800' :
                        'bg-rose-50 text-rose-800'
                      }`}>
                        {app.riskSignal}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded ${
                        app.decisionStatus === 'Approved' ? 'bg-emerald-600 text-white' :
                        app.decisionStatus === 'Pending Underwriting' ? 'bg-neutral-100 text-neutral-800' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {app.decisionStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => setSelectedApplicant(app)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Underwrite</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'Risk Signals' || activeTab === 'Fraud Alerts' ? (
        /* Fraud & Risk Signals View */
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4 shadow-xs text-xs">
          <h3 className="text-base font-bold text-neutral-950">Active Transaction Monitoring & Risk Signals</h3>
          <p className="text-neutral-500">
            Real-time fraud prevention engine monitors duplicate invoice hashes, sudden mobile money velocity spikes, and circular entity transfers.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-neutral-900">Golden Gateway Electronics Ltd (Accra)</h4>
                <p className="text-neutral-600 mt-0.5">
                  ✓ Zero circular transactions detected in last 18 months.<br />
                  ✓ 100% of recorded sales match source MTN MoMo & Ecobank corporate settlement timestamps.<br />
                  ✓ Debt Service Coverage Ratio (DSCR): 2.4x (Exceeds institutional threshold 1.3x).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-neutral-900">Kaneshie Auto Spares Hub (Kumasi)</h4>
                <p className="text-neutral-700 mt-0.5">
                  ⚠ 1 unverified manual receipt entered without corresponding mobile money reference. Flagged for underwriter review before facility disbursement.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Audit Logs View */
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs text-xs space-y-3">
          <h3 className="text-base font-bold text-neutral-950">Cryptographic Access Audit Logs</h3>
          <p className="text-neutral-500">Immutable ledger of every bank officer credential query.</p>

          <div className="space-y-2 pt-2 font-mono text-[11px] text-neutral-600">
            <p className="p-2 bg-neutral-50 rounded border border-neutral-100">
              [2026-09-29 17:14:02 GMT] Underwriter stanbic_officer_49 query passport CRD-GH-882194-ACC (Scope: Full Cashflow)
            </p>
            <p className="p-2 bg-neutral-50 rounded border border-neutral-100">
              [2026-09-29 14:08:50 GMT] Automatic token verification webhook: GRA e-VAT clearance confirmed for Golden Gateway
            </p>
            <p className="p-2 bg-neutral-50 rounded border border-neutral-100">
              [2026-09-28 09:30:11 GMT] Ecobank SME desk reviewed Q4 Inventory facility application #APP-001
            </p>
          </div>
        </div>
      )}

      {/* Underwriter Dossier Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs" onClick={() => setSelectedApplicant(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600"></span>
                    <span className="text-xs font-mono font-semibold text-neutral-500 uppercase">
                      CREDIT COMMITTEE REVIEW DOSSIER
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950 mt-1">{selectedApplicant.businessName}</h3>
                  <p className="text-xs text-neutral-500">Director: {selectedApplicant.owner} · {selectedApplicant.sector}</p>
                </div>
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dossier Numbers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                <div>
                  <span className="text-neutral-400 block text-[10px]">Creda Score</span>
                  <p className="text-xl font-bold text-emerald-700 tabular-nums">{selectedApplicant.passportScore}/100</p>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Monthly Turnover</span>
                  <p className="text-base font-bold text-neutral-900 tabular-nums">{formatCedis(selectedApplicant.monthlyRevenue)}</p>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Facility Size</span>
                  <p className="text-base font-bold text-neutral-900 tabular-nums">{formatCedis(selectedApplicant.requestedAmount)}</p>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Risk Category</span>
                  <p className="text-base font-bold text-emerald-700">{selectedApplicant.riskSignal}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-neutral-700">
                <h4 className="font-bold text-neutral-900">Underwriting Recommendation:</h4>
                <p className="leading-relaxed">
                  Applicant has demonstrated consistent monthly cash collection across verified MTN MoMo merchant till accounts with zero court judgments or chargebacks. Current debt service coverage ratio allows comfortable servicing of a {selectedApplicant.repaymentTerm} facility.
                </p>
              </div>

              {/* Underwriter Decision Controls */}
              <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecision(selectedApplicant.id, 'Declined')}
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold text-rose-700 hover:bg-rose-50 cursor-pointer"
                  >
                    Decline Facility
                  </button>
                  <button
                    onClick={() => handleDecision(selectedApplicant.id, 'Requires Documentation')}
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                  >
                    Request Audit Info
                  </button>
                </div>

                <button
                  onClick={() => handleDecision(selectedApplicant.id, 'Approved')}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve Facility Term Sheet</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
