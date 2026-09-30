export type ViewMode = 
  | 'marketing' 
  | 'login' 
  | 'signup' 
  | 'onboarding' 
  | 'app';

export type AppTab = 
  | 'overview' 
  | 'transactions' 
  | 'sales' 
  | 'expenses' 
  | 'invoices' 
  | 'passport' 
  | 'health' 
  | 'cashflow' 
  | 'financing' 
  | 'creda-ai' 
  | 'reports' 
  | 'permissions' 
  | 'settings'
  | 'institution-portal';

export type UserRole = 'sme_owner' | 'financial_institution';

export interface BusinessProfile {
  name: string;
  tradingName: string;
  regNumber: string;
  tin: string; // Tax Identification Number
  sector: string;
  city: string;
  country: string;
  foundedDate: string;
  yearsInBusiness: string;
  employeeCount: number;
  monthlyRevenueAvg: number; // in GH¢
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  verifiedStatus: 'Verified' | 'Pending' | 'Unverified';
}

export type PaymentMethod = 
  | 'MTN MoMo' 
  | 'Telecel Cash' 
  | 'Ecobank Transfer' 
  | 'GCB Bank' 
  | 'Stanbic Bank' 
  | 'Cash';

export type TransactionCategory = 
  | 'Sales' 
  | 'Inventory' 
  | 'Utilities' 
  | 'Payroll' 
  | 'Logistics & Fuel' 
  | 'Equipment' 
  | 'Tax & Levies' 
  | 'Marketing' 
  | 'Rent';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  counterparty: string;
  category: TransactionCategory;
  paymentMethod: PaymentMethod;
  amount: number; // Positive for income, negative for expense
  status: 'Completed' | 'Pending' | 'Failed' | 'Reconciled';
  reference: string;
  verifiedByApi: boolean;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  notes?: string;
  paymentMethodInstructions: string;
}

export interface FinancialPassportData {
  businessName: string;
  score: number;
  monthlyRevenue: number;
  monthlyCashFlow: number;
  annualVolume: number;
  invoiceCollectionRate: number; // e.g. 91%
  businessHistoryYears: number;
  businessHistoryMonths: number;
  dataVerificationStatus: 'Verified' | 'Audit in Progress';
  revenueConsistencyScore: number;
  cashFlowStabilityScore: number;
  expenseManagementScore: number;
  paymentBehaviourScore: number;
  businessHistoryScore: number;
  connectedDataSources: {
    name: string;
    type: 'Mobile Money' | 'Commercial Bank' | 'Tax Authority';
    lastSync: string;
    status: 'Connected' | 'Action Needed';
  }[];
  activeObligations: {
    lender: string;
    originalAmount: number;
    outstandingBalance: number;
    monthlyInstallment: number;
    status: 'In Good Standing' | 'Near Completion';
  }[];
}

export interface FinancingOffer {
  id: string;
  title: string;
  purpose: string;
  amount: number;
  interestRate: string;
  repaymentTerm: string;
  provider: string;
  providerLogo?: string;
  suitabilityScore: number;
  description: string;
  disbursementSpeed: string;
  requirements: string[];
}

export interface AIInsightItem {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'info';
  category: 'Revenue' | 'Expense' | 'Cash Flow' | 'Invoice' | 'Tax';
  actionPrompt: string;
  metricChange?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'passport' | 'invoice' | 'revenue' | 'alert';
}

export interface ConnectedAccount {
  id: string;
  institution: string;
  type: 'Mobile Money' | 'Bank' | 'Tax Service';
  accountNumberMasked: string;
  lastSync: string;
  status: 'active' | 'syncing' | 'error';
  permissions: string[];
}
