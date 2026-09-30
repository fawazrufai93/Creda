import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Calendar,
  CreditCard,
  Building2,
  Smartphone
} from 'lucide-react';
import { Transaction, TransactionCategory, PaymentMethod } from '../../types';
import { formatCedis, formatDate } from '../../utils/formatters';

interface TransactionsViewProps {
  transactions: Transaction[];
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onAddTransaction,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMethod, setSelectedMethod] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Transaction Form State
  const [newDesc, setNewDesc] = useState('');
  const [newCounterparty, setNewCounterparty] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'income' | 'expense'>('income');
  const [newCategory, setNewCategory] = useState<TransactionCategory>('Sales');
  const [newMethod, setNewMethod] = useState<PaymentMethod>('MTN MoMo');

  const categories: ('All' | TransactionCategory)[] = [
    'All',
    'Sales',
    'Inventory',
    'Utilities',
    'Payroll',
    'Logistics & Fuel',
    'Equipment',
    'Tax & Levies'
  ];

  const paymentMethods: ('All' | PaymentMethod)[] = [
    'All',
    'MTN MoMo',
    'Telecel Cash',
    'Ecobank Transfer',
    'GCB Bank',
    'Stanbic Bank'
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.reference.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
      const matchesMethod = selectedMethod === 'All' || tx.paymentMethod === selectedMethod;
      return matchesSearch && matchesCategory && matchesMethod;
    });
  }, [transactions, searchQuery, selectedCategory, selectedMethod]);

  const totalInflow = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalOutflow = filteredTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc || !newAmount) return;

    const parsedAmount = Math.abs(parseFloat(newAmount));
    const finalAmount = newType === 'expense' ? -parsedAmount : parsedAmount;

    onAddTransaction({
      date: new Date().toISOString().split('T')[0],
      description: newDesc,
      counterparty: newCounterparty || 'Accra Counterparty',
      category: newCategory,
      paymentMethod: newMethod,
      amount: finalAmount,
      status: 'Completed',
      reference: `REC-${Math.floor(1000000 + Math.random() * 9000000)}`,
      verifiedByApi: true,
    });

    setNewDesc('');
    setNewCounterparty('');
    setNewAmount('');
    setIsAddModalOpen(false);
  };

  const exportCSV = () => {
    const headers = ['Date', 'Reference', 'Description', 'Counterparty', 'Category', 'Payment Method', 'Amount (GHS)', 'Status'];
    const rows = filteredTransactions.map(t => [
      t.date,
      t.reference,
      `"${t.description.replace(/"/g, '""')}"`,
      `"${t.counterparty.replace(/"/g, '""')}"`,
      t.category,
      t.paymentMethod,
      t.amount,
      t.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `creda_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Quick Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold text-neutral-950">Transactions Ledger</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Auto-reconciled statements from MTN MoMo, Telecel Cash, and commercial bank APIs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record Entry</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500">Filtered Total Inflow</span>
          <p className="text-xl font-bold text-emerald-700 mt-1 tabular-nums">{formatCedis(totalInflow)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500">Filtered Total Outflow</span>
          <p className="text-xl font-bold text-neutral-900 mt-1 tabular-nums">-{formatCedis(totalOutflow)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500">Net Reconciled Balance</span>
          <p className="text-xl font-bold text-emerald-700 mt-1 tabular-nums">{formatCedis(totalInflow - totalOutflow)}</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by counterparty, reference, or description..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>Category: {c}</option>
              ))}
            </select>
          </div>

          {/* Payment Method Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            >
              {paymentMethods.map((m) => (
                <option key={m} value={m}>Channel: {m}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/60 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <th className="py-3 px-5">Date & Ref</th>
                <th className="py-3 px-5">Description & Counterparty</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-5 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs text-neutral-800">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500">
                    No transactions match your search filters.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <tr key={tx.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <p className="font-mono text-neutral-900 font-semibold tabular-nums">{formatDate(tx.date)}</p>
                        <p className="text-[10px] font-mono text-neutral-400">{tx.reference}</p>
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-semibold text-neutral-900 line-clamp-1">{tx.description}</p>
                        <p className="text-[11px] text-neutral-500 line-clamp-1">{tx.counterparty}</p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-neutral-700 font-medium">{tx.category}</span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-neutral-600">
                        {tx.paymentMethod}
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-bold whitespace-nowrap tabular-nums">
                        <span className={isPositive ? 'text-emerald-700' : 'text-neutral-900'}>
                          {formatCedis(tx.amount)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>API Reconciled</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs" onClick={() => setIsAddModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-xl p-6">
              <h3 className="text-base font-bold text-neutral-900 mb-4">Record New Ledger Entry</h3>
              
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewType('income')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                      newType === 'income' ? 'bg-emerald-50 border-emerald-600 text-emerald-800' : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    + Income / Sale
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('expense')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                      newType === 'expense' ? 'bg-rose-50 border-rose-600 text-rose-800' : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    - Expense / Payment
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Description</label>
                  <input
                    type="text"
                    required
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="e.g. Bulk inventory supply, POS daily cash deposit..."
                    className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Amount (GH¢)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="e.g. 1500"
                      className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Counterparty</label>
                    <input
                      type="text"
                      value={newCounterparty}
                      onChange={(e) => setNewCounterparty(e.target.value)}
                      placeholder="Customer or Supplier name"
                      className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as TransactionCategory)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg bg-white"
                    >
                      <option value="Sales">Sales</option>
                      <option value="Inventory">Inventory</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Payroll">Payroll</option>
                      <option value="Logistics & Fuel">Logistics & Fuel</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Tax & Levies">Tax & Levies</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Payment Method</label>
                    <select
                      value={newMethod}
                      onChange={(e) => setNewMethod(e.target.value as PaymentMethod)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg bg-white"
                    >
                      <option value="MTN MoMo">MTN MoMo</option>
                      <option value="Telecel Cash">Telecel Cash</option>
                      <option value="Ecobank Transfer">Ecobank Transfer</option>
                      <option value="GCB Bank">GCB Bank</option>
                      <option value="Stanbic Bank">Stanbic Bank</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-2 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-3.5 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg cursor-pointer"
                  >
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
