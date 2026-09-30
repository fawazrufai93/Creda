import { supabase } from './supabase';
import { BusinessProfile, Invoice, Transaction, FinancialPassportData } from '../types';

export const blankBusiness = (over: Partial<BusinessProfile> = {}): BusinessProfile => ({
  name: '', tradingName: '', regNumber: '', tin: '', sector: '', city: '',
  country: 'Ghana', foundedDate: '', yearsInBusiness: '', employeeCount: 0,
  monthlyRevenueAvg: 0, ownerName: '', ownerEmail: '', ownerPhone: '',
  verifiedStatus: 'Unverified' as any, ...over,
});

export async function loadWorkspace(userId: string) {
  const [p, inv, tx] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
    supabase.from('invoices').select('data').order('created_at', { ascending: false }),
    supabase.from('transactions').select('data').order('created_at', { ascending: false }),
  ]);
  return {
    profileRow: p.data as { email?: string; phone?: string; business_name?: string; business?: BusinessProfile } | null,
    invoices: (inv.data || []).map((r: any) => r.data as Invoice),
    transactions: (tx.data || []).map((r: any) => r.data as Transaction),
  };
}

export const saveBusiness = (userId: string, b: BusinessProfile) =>
  supabase.from('profiles').update({ business: b, business_name: b.name }).eq('id', userId);

export const saveInvoice = (inv: Invoice) =>
  supabase.from('invoices').upsert({ id: inv.id, data: inv });

export const saveTransaction = (tx: Transaction) =>
  supabase.from('transactions').upsert({ id: tx.id, data: tx });

// Passport metrics computed only from the user's own recorded data.
export function buildPassport(b: BusinessProfile, txs: Transaction[], invs: Invoice[]): FinancialPassportData {
  const income = txs.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const spend = txs.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const issued = invs.filter(i => i.status !== 'Draft');
  const paid = issued.filter(i => i.status === 'Paid').length;
  return {
    businessName: b.name,
    score: 0,
    monthlyRevenue: income,
    monthlyCashFlow: income - spend,
    annualVolume: income,
    invoiceCollectionRate: issued.length ? Math.round((paid / issued.length) * 100) : 0,
    businessHistoryYears: 0,
    businessHistoryMonths: 0,
    dataVerificationStatus: 'Audit in Progress',
    revenueConsistencyScore: 0,
    cashFlowStabilityScore: 0,
    expenseManagementScore: 0,
    paymentBehaviourScore: 0,
    businessHistoryScore: 0,
    connectedDataSources: [],
    activeObligations: [],
  } as FinancialPassportData;
}
