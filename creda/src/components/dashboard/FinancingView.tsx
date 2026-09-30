import React, { useState } from 'react';
import { 
  Landmark, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  AlertCircle, 
  FileText,
  Percent,
  Calendar,
  Building2,
  Lock
} from 'lucide-react';
import { FinancingOffer, BusinessProfile, FinancialPassportData } from '../../types';
import { formatCedis } from '../../utils/formatters';

interface FinancingViewProps {
  offers: FinancingOffer[];
  businessProfile: BusinessProfile;
  passport: FinancialPassportData;
  onSelectTab: (tab: any) => void;
}

export const FinancingView: React.FC<FinancingViewProps> = ({
  offers,
  businessProfile,
  passport,
  onSelectTab,
}) => {
  const [selectedOffer, setSelectedOffer] = useState<FinancingOffer | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const handleApply = (offer: FinancingOffer) => {
    setSelectedOffer(offer);
    setIsApplying(true);
    setApplicationSuccess(false);
  };

  const handleConfirmSubmission = () => {
    setApplicationSuccess(true);
    setTimeout(() => {
      setIsApplying(false);
      setApplicationSuccess(false);
      setSelectedOffer(null);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-neutral-950">Financing & Credit Facilities</h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Explore structured capital options matched to your verified Creda Financial Passport.
        </p>
      </div>

      {/* Indicative Capacity Top Banner */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Indicative Financing Capacity
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tabular-nums tracking-tight">
                Not yet available
              </span>
            </div>
            <p className="text-xs font-medium text-emerald-700 pt-0.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Based on your 82/100 Passport Score & 91% invoice collection performance</span>
            </p>
          </div>

          <div className="max-w-md bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-xs text-neutral-600 space-y-1">
            <p className="font-semibold text-neutral-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>Regulatory Disclosure</span>
            </p>
            <p className="text-[11px] leading-relaxed">
              Indicative estimate only. Final financing decisions, interest rates, and loan structures are made exclusively by the relevant licensed financial institution following formal underwriting.
            </p>
          </div>
        </div>
      </div>

      {/* Financing Products Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
          Available Institutional Facilities
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col justify-between hover:border-neutral-300 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {offer.suitabilityScore}% Match
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    {offer.disbursementSpeed}
                  </span>
                </div>

                <h4 className="text-base font-bold text-neutral-950 mb-1">
                  {offer.title}
                </h4>
                <p className="text-xs text-neutral-500 mb-4 font-medium">
                  {offer.provider}
                </p>

                <div className="py-3 border-y border-neutral-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Facility Size:</span>
                    <span className="font-bold text-neutral-900 tabular-nums">{formatCedis(offer.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Indicative Rate:</span>
                    <span className="font-bold text-neutral-900 tabular-nums">{offer.interestRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Term / Cadence:</span>
                    <span className="font-bold text-neutral-900">{offer.repaymentTerm}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
                  {offer.description}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1.5 text-[11px] text-neutral-500">
                  <span className="font-semibold text-neutral-700 block">Required Criteria:</span>
                  {offer.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100">
                <button
                  onClick={() => handleApply(offer)}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Apply with Creda Passport</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Readiness Banner */}
      <div className="bg-neutral-900 text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white">Need higher financing capacity?</h4>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            SMEs with over 6 months of continuous Mobile Money settlements and a Financial Passport score above 85 unlock facilities up to GH¢150,000 with Tier-1 partner banks.
          </p>
        </div>

        <button
          onClick={() => onSelectTab('health')}
          className="px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white whitespace-nowrap cursor-pointer"
        >
          View Score Improvement Plan
        </button>
      </div>

      {/* Application Workflow Modal */}
      {isApplying && selectedOffer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs" onClick={() => setIsApplying(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8 overflow-hidden">
              
              {!applicationSuccess ? (
                <div className="space-y-5">
                  <div className="flex items-start justify-between pb-3 border-b border-neutral-100">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">Fast-Track Bank Application</span>
                      <h3 className="text-lg font-bold text-neutral-950 mt-0.5">{selectedOffer.title}</h3>
                      <p className="text-xs text-neutral-500">{selectedOffer.provider}</p>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Applicant:</span>
                      <span className="font-semibold text-neutral-900">{businessProfile.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Creda Passport Score:</span>
                      <span className="font-bold text-emerald-700">{passport.score} / 100 (Verified)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Facility Size:</span>
                      <span className="font-bold text-neutral-900 tabular-nums">{formatCedis(selectedOffer.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Repayment Horizon:</span>
                      <span className="font-medium text-neutral-800">{selectedOffer.repaymentTerm}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-neutral-600">
                    <p className="font-semibold text-neutral-800">Direct Data Permissions:</p>
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Shares encrypted 12-month MoMo & Bank cash flow with {selectedOffer.provider}.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Zero paper bank statements required. Verified directly via API.</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsApplying(false)}
                      className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmSubmission}
                      className="px-5 py-2.5 rounded-lg bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-xs cursor-pointer"
                    >
                      Submit Facility Dossier
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-950">Application Transmitted!</h3>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                    Your verified dossier has been securely dispatched to {selectedOffer.provider}. An underwriter will contact you within 24 hours.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
