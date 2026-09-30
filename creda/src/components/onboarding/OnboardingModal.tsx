import React, { useState } from 'react';
import { 
  Building2, 
  Smartphone, 
  Landmark, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Bot, 
  Receipt, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { BusinessProfile } from '../../types';
import { Wordmark } from '../common/Logo';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: BusinessProfile) => void;
  onCancel: () => void;
  initialData: BusinessProfile;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  onCancel,
  initialData,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BusinessProfile>(initialData);
  
  // Connection states for Step 2
  const [momoConnected, setMomoConnected] = useState<boolean>(true);
  const [telecelConnected, setTelecelConnected] = useState<boolean>(true);
  const [bankConnected, setBankConnected] = useState<boolean>(true);
  const [isVerifyingData, setIsVerifyingData] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 3) {
      setIsVerifyingData(true);
      setTimeout(() => {
        setIsVerifyingData(false);
        setStep(4);
      }, 1200);
    } else if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity" />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-2xl bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden transition-all"
        >
          {/* Progress Header */}
          <div className="px-8 pt-6 pb-4 border-b border-neutral-100 bg-neutral-50/50">
            <div className="flex items-center justify-between">
              <Wordmark size={24} label="CREDA ONBOARDING" compact />
              <span className="text-xs font-semibold text-neutral-500 tabular-nums">
                Step {step} of 5
              </span>
            </div>

            {/* Step progress bar */}
            <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-4 overflow-hidden">
              <div 
                className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Body */}
          <div className="p-8">
            
            {/* STEP 1: Tell us about your business */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Tell us about your business</h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Help us personalize your financial identity and verify your registration with Ghanaian authorities.
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Registered Business Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Trading Name (Showroom / Brand)</label>
                      <input
                        type="text"
                        value={formData.tradingName}
                        onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Tax Identification Number (TIN)</label>
                      <input
                        type="text"
                        value={formData.tin}
                        onChange={(e) => setFormData({ ...formData, tin: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Business Sector</label>
                      <select
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      >
                        <option value="Consumer Electronics & Hardware Retail">Consumer Electronics & Hardware Retail</option>
                        <option value="Food & Agri-Processing Distribution">Food & Agri-Processing Distribution</option>
                        <option value="Fashion, Textiles & Apparel">Fashion, Textiles & Apparel</option>
                        <option value="Automotive & Spare Parts">Automotive & Spare Parts</option>
                        <option value="Professional Services & Tech Agency">Professional Services & Tech Agency</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">City / Region</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Connect your financial accounts */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Connect your financial accounts</h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Connect the channels you use to accept customer payments and settle suppliers. Access is strictly read-only and encrypted.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-600 leading-relaxed">
                  Automatic bank and mobile money connections are not available yet. You can continue now and record your
                  sales and expenses manually in the Transactions tab. We will notify you when direct connections launch.
                </div>

                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 flex items-center gap-2 text-xs text-neutral-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>256-bit TLS encrypted connection. Creda never stores account passwords.</span>
                </div>
              </div>
            )}

            {/* STEP 3: Review your transactions */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Your transactions</h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Add your sales and expenses after setup to start building your financial record.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-600 leading-relaxed">
                  Once you add transactions, Creda categorises them and builds your cash flow and Financial Passport from your records.
                </div>
              </div>
            )}

            {/* STEP 4: Build your Financial Passport */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Your Financial Passport is ready</h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Based on your verified trade history, your business has achieved a healthy credit readiness rating.
                  </p>
                </div>

                <div className="bg-neutral-900 text-white rounded-xl p-6 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">Creda Financial Passport</span>
                      <h4 className="text-base font-bold text-white mt-0.5">{formData.name}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-white tabular-nums">82</span>
                      <span className="text-xs text-neutral-400">/100</span>
                      <p className="text-[10px] text-emerald-400">Healthy Grade</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-neutral-400">Monthly Trade Volume:</span>
                      <p className="text-sm font-bold text-white tabular-nums">GH¢ —</p>
                    </div>
                    <div>
                      <span className="text-neutral-400">Net Monthly Cash Flow:</span>
                      <p className="text-sm font-bold text-emerald-400 tabular-nums">GH¢ —</p>
                    </div>
                    <div>
                      <span className="text-neutral-400">Invoice Collection:</span>
                      <p className="text-sm font-bold text-white tabular-nums">91% on-time</p>
                    </div>
                    <div>
                      <span className="text-neutral-400">Verified History:</span>
                      <p className="text-sm font-bold text-white">3 yrs 8 mos</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-600">
                  This passport can be securely shared with partner commercial banks to access working capital and inventory credit lines.
                </p>
              </div>
            )}

            {/* STEP 5: Meet Creda AI */}
            {step === 5 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Meet your Creda AI Assistant</h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Your personal financial copilot is always on standby to answer cash questions, test inventory affordability, and draft invoices.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 text-xs space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Bot className="w-4 h-4" />
                    <span>What Creda AI can do for your store:</span>
                  </div>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span><strong>Instant Cash Analysis:</strong> Ask "Can I afford new new stock?" before committing funds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span><strong>Debtor Follow-ups:</strong> Automatically drafts friendly WhatsApp and SMS invoice reminders.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span><strong>Weekly P&L Summaries:</strong> Plain-language breakdowns sent directly to your phone.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs text-emerald-800">
                  You are all set. Your workspace is ready. Start by recording a transaction or issuing an invoice.
                </div>
              </div>
            )}

          </div>

          {/* Footer Controls */}
          <div className="px-8 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{step === 1 ? 'Cancel' : 'Back'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={isVerifyingData}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <span>{step === 5 ? 'Launch Business Dashboard' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
