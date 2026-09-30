import React, { useState } from 'react';
import { Plus, Trash2, X, Calculator, ShieldCheck } from 'lucide-react';
import { Invoice, InvoiceItem } from '../../types';
import { formatCedis } from '../../utils/formatters';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateInvoice: (invoice: Invoice) => void;
}

export const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  isOpen,
  onClose,
  onCreateInvoice,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [discount, setDiscount] = useState<number>(0);
  const [notes, setNotes] = useState('Standard payment terms: 14 days. Thank you for your business.');
  const [paymentInstructions, setPaymentInstructions] = useState(
    'MTN MoMo Merchant Till: 749201 | Ecobank Ghana Account: 144100294819'
  );

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 'item-1', description: 'Dell Latitude 5540 Core i7 (x1 unit)', quantity: 1, unitPrice: 3400, total: 3400 },
  ]);

  if (!isOpen) return null;

  const addItem = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: 'description' | 'quantity' | 'unitPrice', val: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: val };
          const qty = field === 'quantity' ? Number(val) : item.quantity;
          const price = field === 'unitPrice' ? Number(val) : item.unitPrice;
          updated.total = qty * price;
          return updated;
        }
        return item;
      })
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const totalAmount = Math.max(0, subtotal - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || items.length === 0) return;

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerEmail: customerEmail || 'accounts@client.gh',
      customerPhone: customerPhone || '+233 24 000 0000',
      items,
      subtotal,
      tax: 0,
      discount,
      totalAmount,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate,
      status: 'Sent',
      notes,
      paymentMethodInstructions: paymentInstructions,
    };

    onCreateInvoice(newInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8 overflow-hidden">
          
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Create Professional Invoice</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Generate compliant SME invoice with instant MTN MoMo payment link.</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5 max-h-[75vh] overflow-y-auto pr-1">
            
            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Customer / Company</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ridgeview Academy"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Customer Email</label>
                <input
                  type="email"
                  placeholder="procurement@client.gh"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone / WhatsApp</label>
                <input
                  type="text"
                  placeholder="+233 24 330 9184"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900">Line Items & Hardware</span>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>
              </div>

              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                    <div className="col-span-6">
                      <input
                        type="text"
                        required
                        placeholder="Description of good or service"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 text-center"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Price (GH¢)"
                        value={item.unitPrice || ''}
                        onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 text-right tabular-nums"
                      />
                    </div>
                    <div className="col-span-1 text-right">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtotal, Discount & Due Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-100">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Payment Due Date</label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Discount Amount (GH¢)</label>
                <input
                  type="number"
                  min="0"
                  value={discount || ''}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white text-right tabular-nums"
                />
              </div>
            </div>

            {/* Payment Instructions & Notes */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Payment Instructions</label>
                <input
                  type="text"
                  value={paymentInstructions}
                  onChange={(e) => setPaymentInstructions(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Client Notes & Policy</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white resize-none"
                />
              </div>
            </div>

            {/* Calculation Totals Summary */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs space-y-1.5">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-semibold tabular-nums">{formatCedis(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Discount:</span>
                  <span className="font-semibold tabular-nums">-{formatCedis(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-neutral-950 border-t border-neutral-200 pt-2">
                <span>Total Amount Due:</span>
                <span className="text-emerald-700 tabular-nums">{formatCedis(totalAmount)}</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 flex items-center justify-end gap-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-all shadow-xs cursor-pointer"
              >
                Create & Send Invoice
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
