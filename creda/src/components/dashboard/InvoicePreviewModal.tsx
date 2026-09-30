import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Send, 
  Copy, 
  Check, 
  Printer, 
  Smartphone, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';
import { Invoice, BusinessProfile } from '../../types';
import { formatCedis, formatDate } from '../../utils/formatters';

interface InvoicePreviewModalProps {
  invoice: Invoice | null;
  businessProfile: BusinessProfile;
  isOpen: boolean;
  onClose: () => void;
  onMarkPaid?: (invoiceId: string) => void;
}

export const InvoicePreviewModal: React.FC<InvoicePreviewModalProps> = ({
  invoice,
  businessProfile,
  isOpen,
  onClose,
  onMarkPaid,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  if (!isOpen || !invoice) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://pay.creda.gh/inv/${invoice.invoiceNumber.toLowerCase()}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendDispatch = (channel: 'whatsapp' | 'email') => {
    setDispatchStatus(`Invoice dispatched via ${channel === 'whatsapp' ? 'WhatsApp (+233)' : 'Official Email'}!`);
    setTimeout(() => setDispatchStatus(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8 overflow-hidden">
          
          {/* Top Actions Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-900 font-mono">{invoice.invoiceNumber}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                invoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
                invoice.status === 'Overdue' ? 'bg-rose-50 text-rose-700' :
                'bg-neutral-100 text-neutral-800'
              }`}>
                {invoice.status}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrint}
                className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                title="Print or Save PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied Link' : 'Copy Pay Link'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {dispatchStatus && (
            <div className="my-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium text-center animate-fadeIn">
              {dispatchStatus}
            </div>
          )}

          {/* Printable Invoice Surface */}
          <div className="mt-4 p-6 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs text-neutral-800 space-y-6">
            
            {/* Header Lockup */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-neutral-200 pb-5">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600"></span>
                  <span className="text-sm font-bold text-neutral-950">{businessProfile.name}</span>
                </div>
                <p className="text-neutral-500 mt-1">{businessProfile.tradingName}</p>
                <p className="text-neutral-500">{businessProfile.city}, Ghana</p>
                <p className="text-neutral-500 font-mono">TIN: {businessProfile.tin} · Reg: {businessProfile.regNumber}</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-base font-bold text-neutral-950 uppercase tracking-wider block">INVOICE</span>
                <p className="font-mono text-neutral-600 font-semibold">{invoice.invoiceNumber}</p>
                <p className="text-neutral-500 mt-1">Issue Date: {formatDate(invoice.issueDate)}</p>
                <p className="text-neutral-500 font-semibold text-rose-700">Due Date: {formatDate(invoice.dueDate)}</p>
              </div>
            </div>

            {/* Billed To */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                  Billed To:
                </span>
                <p className="text-sm font-bold text-neutral-900">{invoice.customerName}</p>
                <p className="text-neutral-600">{invoice.customerEmail}</p>
                <p className="text-neutral-600">{invoice.customerPhone}</p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                  Settlement Instructions:
                </span>
                <p className="text-neutral-700 font-medium">{invoice.paymentMethodInstructions}</p>
                <p className="text-[11px] text-emerald-700 mt-1 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Creda Instant Reconciler Active
                </p>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px] tracking-wider">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Price</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/80">
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="text-xs">
                      <td className="py-2.5 font-medium text-neutral-900">{item.description}</td>
                      <td className="py-2.5 text-center tabular-nums">{item.quantity}</td>
                      <td className="py-2.5 text-right font-mono tabular-nums">{formatCedis(item.unitPrice)}</td>
                      <td className="py-2.5 text-right font-mono font-bold text-neutral-900 tabular-nums">
                        {formatCedis(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="border-t border-neutral-200 pt-3 flex justify-end">
              <div className="w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums">{formatCedis(invoice.subtotal)}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-rose-600">
                    <span>Discount:</span>
                    <span className="font-mono tabular-nums">-{formatCedis(invoice.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-neutral-950 border-t border-neutral-300 pt-2">
                  <span>Total Due:</span>
                  <span className="text-emerald-700 font-mono tabular-nums">{formatCedis(invoice.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="border-t border-neutral-200 pt-3 text-[11px] text-neutral-500">
                <span className="font-semibold text-neutral-700">Terms & Notes: </span>
                {invoice.notes}
              </div>
            )}
          </div>

          {/* Action Dispatch Footer */}
          <div className="mt-5 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSendDispatch('whatsapp')}
                className="px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Send via WhatsApp
              </button>
              <button
                onClick={() => handleSendDispatch('email')}
                className="px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Send via Email
              </button>
            </div>

            <div className="flex items-center gap-2">
              {invoice.status !== 'Paid' && onMarkPaid && (
                <button
                  onClick={() => {
                    onMarkPaid(invoice.id);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 cursor-pointer"
                >
                  Mark as Paid
                </button>
              )}
              <button
                onClick={handlePrint}
                className="px-4 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
              >
                Download PDF
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
