import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import { Invoice } from '../../types';
import { formatCedis, formatDate } from '../../utils/formatters';

interface InvoicesViewProps {
  invoices: Invoice[];
  onOpenCreateModal: () => void;
  onPreviewInvoice: (invoice: Invoice) => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({
  invoices,
  onOpenCreateModal,
  onPreviewInvoice,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Draft' | 'Sent' | 'Paid' | 'Overdue'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: ('All' | 'Draft' | 'Sent' | 'Paid' | 'Overdue')[] = [
    'All',
    'Draft',
    'Sent',
    'Paid',
    'Overdue',
  ];

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesFilter = activeFilter === 'All' || inv.status === activeFilter;
      const matchesSearch =
        inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [invoices, activeFilter, searchQuery]);

  const totalOutstanding = invoices
    .filter((inv) => inv.status === 'Sent' || inv.status === 'Overdue')
    .reduce((acc, inv) => acc + inv.totalAmount, 0);

  const totalPaid = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((acc, inv) => acc + inv.totalAmount, 0);

  const totalOverdue = invoices
    .filter((inv) => inv.status === 'Overdue')
    .reduce((acc, inv) => acc + inv.totalAmount, 0);

  return (
    <div className="space-y-6">
      
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold text-neutral-950">Invoices & Receivables</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Create, send and track invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const headers = ['Invoice #', 'Customer', 'Amount', 'Issue Date', 'Due Date', 'Status'];
              const rows = filteredInvoices.map(i => [i.invoiceNumber, i.customerName, i.totalAmount, i.issueDate, i.dueDate, i.status]);
              const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
              const link = document.createElement('a');
              link.href = encodeURI(csvContent);
              link.download = `creda_invoices.csv`;
              link.click();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500">Collected (Past 30 Days)</span>
          <p className="text-xl font-bold text-emerald-700 mt-1 tabular-nums">{formatCedis(totalPaid)}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">91% collection rate</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500">Pending Receivables</span>
          <p className="text-xl font-bold text-neutral-900 mt-1 tabular-nums">{formatCedis(totalOutstanding)}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Due in next 14 days</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs text-neutral-500">Overdue Capital</span>
          <p className="text-xl font-bold text-rose-700 mt-1 tabular-nums">{formatCedis(totalOverdue)}</p>
          <p className="text-[11px] text-rose-600 mt-0.5">Automated reminder queued</p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Filter buttons (functional) */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === tab
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoice or client..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/60 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <th className="py-3 px-5">Invoice Number</th>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs text-neutral-800">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No invoices found for the selected filter.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-mono font-bold text-neutral-900">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3.5 px-5">
                      <p className="font-semibold text-neutral-900">{inv.customerName}</p>
                      <p className="text-[11px] text-neutral-400">{inv.customerPhone}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 tabular-nums">
                      {formatCedis(inv.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-500 tabular-nums">
                      {formatDate(inv.issueDate)}
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums">
                      <span className={inv.status === 'Overdue' ? 'text-rose-600 font-bold' : 'text-neutral-600'}>
                        {formatDate(inv.dueDate)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
                        inv.status === 'Overdue' ? 'bg-rose-50 text-rose-700' :
                        inv.status === 'Sent' ? 'bg-blue-50 text-blue-700' :
                        'bg-neutral-100 text-neutral-700'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onPreviewInvoice(inv)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
