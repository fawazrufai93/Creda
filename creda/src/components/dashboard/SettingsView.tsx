import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  Check, 
  Save 
} from 'lucide-react';
import { BusinessProfile } from '../../types';

interface SettingsViewProps {
  businessProfile: BusinessProfile;
  onUpdateProfile: (updated: BusinessProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  businessProfile,
  onUpdateProfile,
}) => {
  const [profile, setProfile] = useState<BusinessProfile>(businessProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profile);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-neutral-950">Settings & Business Profile</h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Manage your verified Ghanaian commercial registry data, tax identifiers, and notification preferences.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Business configuration saved and synchronized with Creda Passport engine.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Entity Card */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900">Commercial Registration Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Registered Legal Entity</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Trading Name (Brand)</label>
              <input
                type="text"
                value={profile.tradingName}
                onChange={(e) => setProfile({ ...profile, tradingName: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Ghana Revenue Authority TIN</label>
              <input
                type="text"
                value={profile.tin}
                onChange={(e) => setProfile({ ...profile, tin: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Registrar General Dept. No.</label>
              <input
                type="text"
                value={profile.regNumber}
                onChange={(e) => setProfile({ ...profile, regNumber: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Commercial Sector</label>
              <input
                type="text"
                value={profile.sector}
                onChange={(e) => setProfile({ ...profile, sector: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">City / Location</label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>
        </div>

        {/* Managing Director & Contact */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
            <User className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900">Managing Director Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={profile.ownerName}
                onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Official Email</label>
              <input
                type="email"
                value={profile.ownerEmail}
                onChange={(e) => setProfile({ ...profile, ownerEmail: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Direct Phone / WhatsApp</label>
              <input
                type="text"
                value={profile.ownerPhone}
                onChange={(e) => setProfile({ ...profile, ownerPhone: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>
        </div>

        {/* Currency & Accounting Standard */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4 shadow-xs text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900">Accounting Configuration</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Reporting Currency</label>
              <input
                readOnly
                value="Ghanaian Cedi (GH¢ / GHS)"
                className="w-full px-3 py-2 border border-neutral-200 bg-neutral-50 rounded-lg text-neutral-700 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Fiscal Year</label>
              <input
                readOnly
                value="January 1 – December 31 (Calendar)"
                className="w-full px-3 py-2 border border-neutral-200 bg-neutral-50 rounded-lg text-neutral-700 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </div>

      </form>
    </div>
  );
};
