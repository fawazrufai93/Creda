import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  Landmark,
  Smartphone,
  Eye,
  FileText
} from 'lucide-react';
import { ConnectedAccount } from '../../types';

interface PrivacyPermissionsViewProps {
  connectedAccounts: ConnectedAccount[];
  onDisconnect: (id: string) => void;
}

export const PrivacyPermissionsView: React.FC<PrivacyPermissionsViewProps> = ({
  connectedAccounts,
  onDisconnect,
}) => {
  const [partnerAccessList, setPartnerAccessList] = useState([
    {
      id: 'p-1',
      name: 'Stanbic Bank SME Credit Committee',
      purpose: 'Working Capital Facility Underwriting',
      grantedDate: '14 Sept 2026',
      expiryDate: '14 Oct 2026 (15 days left)',
      scope: 'Read-only 12-month aggregated cash flow & debt service ratio',
      status: 'Active Authorized',
    },
    {
      id: 'p-2',
      name: 'Ecobank Capital Desk',
      purpose: 'Existing Facility Monitoring',
      grantedDate: '01 Aug 2026',
      expiryDate: '01 Nov 2026 (33 days left)',
      scope: 'Monthly repayment reconciliation stream',
      status: 'Active Authorized',
    }
  ]);

  const [revokedMessage, setRevokedMessage] = useState<string | null>(null);

  const handleRevokePartner = (partnerId: string, partnerName: string) => {
    setPartnerAccessList(partnerAccessList.filter(p => p.id !== partnerId));
    setRevokedMessage(`Access revoked for ${partnerName}. Cryptographic access token invalidated.`);
    setTimeout(() => setRevokedMessage(null), 3500);
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-neutral-950">Privacy & Data Permissions</h2>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Ghana Data Protection Act 843 Compliant
          </span>
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">
          Full transparency and granular control over your financial telemetry and authorized institution access.
        </p>
      </div>

      {revokedMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold">
          {revokedMessage}
        </div>
      )}

      {/* Security Trust Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-neutral-200 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">Bank Connection Encrypted</h4>
            <p className="text-[11px] text-neutral-500 mt-0.5">256-bit TLS hardware encryption on all open banking connections.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-neutral-200 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">Your Data Is Protected</h4>
            <p className="text-[11px] text-neutral-500 mt-0.5">Strictly read-only access. Creda can never initiate withdrawals or move funds.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-neutral-200 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">Zero Third-Party Selling</h4>
            <p className="text-[11px] text-neutral-500 mt-0.5">Your customer information and transaction logs are never sold or shared with advertisers.</p>
          </div>
        </div>
      </div>

      {/* Section 1: Connected Financial Feeds */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-neutral-950">Connected Financial Feeds</h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Active telemetry feeds synchronizing your sales, expenses, and tax registration.
          </p>
        </div>

        <div className="space-y-3">
          {connectedAccounts.map((acc) => (
            <div
              key={acc.id}
              className="p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-neutral-900">{acc.institution}</h4>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active Feed
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-mono">{acc.accountNumberMasked}</p>
                <p className="text-[11px] text-neutral-400">Last synced: {acc.lastSync}</p>

                <div className="pt-1 flex flex-wrap gap-1.5 text-[11px] text-neutral-600">
                  <span className="font-semibold text-neutral-700">Permissions: </span>
                  {acc.permissions.map((p, i) => (
                    <span key={i} className="text-neutral-500">
                      {p}{i < acc.permissions.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDisconnect(acc.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:text-rose-700 hover:border-rose-300 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Authorized Financial Institutions */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-neutral-950">Authorized Financial Institutions</h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Lenders and banks currently authorized to view your verified Creda Financial Passport.
          </p>
        </div>

        <div className="space-y-3">
          {partnerAccessList.length === 0 ? (
            <p className="text-xs text-neutral-500 py-4 text-center">
              No financial institutions currently hold access to your passport.
            </p>
          ) : (
            partnerAccessList.map((partner) => (
              <div
                key={partner.id}
                className="p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-neutral-900">{partner.name}</h4>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {partner.status}
                    </span>
                  </div>
                  <p className="text-neutral-600 font-medium">Purpose: {partner.purpose}</p>
                  <p className="text-neutral-500">Authorized: {partner.grantedDate} · Expires: {partner.expiryDate}</p>
                  <p className="text-[11px] text-neutral-500">Access Scope: {partner.scope}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRevokePartner(partner.id, partner.name)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <span>Revoke Access</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
