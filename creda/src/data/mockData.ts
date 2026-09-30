import { 
  BusinessProfile, 
  FinancialPassportData, 
  Transaction, 
  Invoice, 
  FinancingOffer, 
  AIInsightItem, 
  NotificationItem,
  ConnectedAccount 
} from '../types';

export const initialBusinessProfile: BusinessProfile = {
  name: 'Golden Gateway Electronics Ltd',
  tradingName: 'ABC Electronics Ghana',
  regNumber: 'CS-4492021-ACC',
  tin: 'P002941849X',
  sector: 'Consumer Electronics & Hardware Retail',
  city: 'Accra (Osu Oxford Street)',
  country: 'Ghana',
  foundedDate: 'January 2023',
  yearsInBusiness: '3 years 8 months',
  employeeCount: 6,
  monthlyRevenueAvg: 52400,
  ownerName: 'Fawaz Rufai',
  ownerEmail: 'fawaz.rufai@goldengateway.com.gh',
  ownerPhone: '+233 24 492 8109',
  verifiedStatus: 'Verified',
};

export const initialPassport: FinancialPassportData = {
  businessName: 'Golden Gateway Electronics (ABC Electronics)',
  score: 82,
  monthlyRevenue: 52400,
  monthlyCashFlow: 11800,
  annualVolume: 628800,
  invoiceCollectionRate: 91,
  businessHistoryYears: 3,
  businessHistoryMonths: 8,
  dataVerificationStatus: 'Verified',
  revenueConsistencyScore: 81,
  cashFlowStabilityScore: 87,
  expenseManagementScore: 76,
  paymentBehaviourScore: 91,
  businessHistoryScore: 85,
  connectedDataSources: [
    { name: 'MTN Mobile Money Merchant API', type: 'Mobile Money', lastSync: '10 mins ago', status: 'Connected' },
    { name: 'Ecobank Ghana Corporate Direct Feed', type: 'Commercial Bank', lastSync: '1 hour ago', status: 'Connected' },
    { name: 'Telecel Cash Business Till', type: 'Mobile Money', lastSync: '3 hours ago', status: 'Connected' },
    { name: 'GRA e-VAT Portal Reconciler', type: 'Tax Authority', lastSync: 'Yesterday', status: 'Connected' },
  ],
  activeObligations: [
    {
      lender: 'Ecobank SME Micro-Facility',
      originalAmount: 18000,
      outstandingBalance: 3200,
      monthlyInstallment: 1550,
      status: 'Near Completion'
    }
  ]
};

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-101',
    date: '2026-09-29',
    description: 'Bulk Inventory: Anker chargers & powerbanks',
    counterparty: 'Accra West Tech Wholesale Ltd',
    category: 'Inventory',
    paymentMethod: 'MTN MoMo',
    amount: -1200,
    status: 'Completed',
    reference: 'MOM-94810283',
    verifiedByApi: true,
  },
  {
    id: 'tx-102',
    date: '2026-09-29',
    description: 'B2B Office Electronics Order: 3 Monitors + UPS',
    counterparty: 'Kwame Ventures (Airport City)',
    category: 'Sales',
    paymentMethod: 'Ecobank Transfer',
    amount: 4500,
    status: 'Completed',
    reference: 'ECO-2940182',
    verifiedByApi: true,
  },
  {
    id: 'tx-103',
    date: '2026-09-28',
    description: 'Showroom Electricity & High-speed Fibre',
    counterparty: 'ECG Prepaid / Telecel Fibre',
    category: 'Utilities',
    paymentMethod: 'Telecel Cash',
    amount: -450,
    status: 'Completed',
    reference: 'TEL-8839102',
    verifiedByApi: true,
  },
  {
    id: 'tx-104',
    date: '2026-09-28',
    description: 'Retail POS sales settlement (Daily sweep)',
    counterparty: 'In-store Walk-in Customers',
    category: 'Sales',
    paymentMethod: 'MTN MoMo',
    amount: 2850,
    status: 'Completed',
    reference: 'MOM-94801124',
    verifiedByApi: true,
  },
  {
    id: 'tx-105',
    date: '2026-09-27',
    description: 'Display fixtures & warranty repair kit',
    counterparty: 'Tema Hardware Hub',
    category: 'Equipment',
    paymentMethod: 'GCB Bank',
    amount: -890,
    status: 'Completed',
    reference: 'GCB-0049219',
    verifiedByApi: true,
  },
  {
    id: 'tx-106',
    date: '2026-09-26',
    description: 'Client payment: CCTV Installation Package',
    counterparty: 'Apex Logistics Ghana',
    category: 'Sales',
    paymentMethod: 'Ecobank Transfer',
    amount: 6200,
    status: 'Completed',
    reference: 'ECO-3918204',
    verifiedByApi: true,
  },
  {
    id: 'tx-107',
    date: '2026-09-25',
    description: 'Dispatch rider logistics & courier runs',
    counterparty: 'SwiftGo Deliveries Accra',
    category: 'Logistics & Fuel',
    paymentMethod: 'MTN MoMo',
    amount: -340,
    status: 'Completed',
    reference: 'MOM-8491029',
    verifiedByApi: true,
  },
  {
    id: 'tx-108',
    date: '2026-09-24',
    description: 'Mid-month staff advance & commissions',
    counterparty: 'Store Sales Associate Team',
    category: 'Payroll',
    paymentMethod: 'Ecobank Transfer',
    amount: -2400,
    status: 'Completed',
    reference: 'ECO-1948291',
    verifiedByApi: true,
  },
  {
    id: 'tx-109',
    date: '2026-09-23',
    description: 'Corporate Supply: 5 Dell Latitude Laptops',
    counterparty: 'Kenyatta Consulting Partners',
    category: 'Sales',
    paymentMethod: 'Stanbic Bank',
    amount: 18500,
    status: 'Completed',
    reference: 'STN-4920194',
    verifiedByApi: true,
  },
  {
    id: 'tx-110',
    date: '2026-09-22',
    description: 'Consolidated Ghana Port clearance levy & customs',
    counterparty: 'Ghana Ports & Harbours (Tema)',
    category: 'Tax & Levies',
    paymentMethod: 'GCB Bank',
    amount: -3100,
    status: 'Completed',
    reference: 'GCB-8839210',
    verifiedByApi: true,
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-0104',
    customerName: 'Kenyatta Consulting Partners',
    customerEmail: 'accounts@kenyattagroup.gh',
    customerPhone: '+233 30 274 9182',
    items: [
      { id: 'item-1', description: 'Dell Latitude 5540 Core i7 (x5 units)', quantity: 5, unitPrice: 3400, total: 17000 },
      { id: 'item-2', description: 'Setup & Enterprise Warranty Care Pack', quantity: 5, unitPrice: 300, total: 1500 }
    ],
    subtotal: 18500,
    tax: 0,
    discount: 0,
    totalAmount: 18500,
    issueDate: '2026-09-18',
    dueDate: '2026-10-02',
    status: 'Paid',
    notes: 'Thank you for your business. Payment verified via Stanbic Bank.',
    paymentMethodInstructions: 'Ecobank Ghana | Acct: 144100294819 | Or MTN Merchant Till: 749201'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-0105',
    customerName: 'Ridgeview Academy Accra',
    customerEmail: 'procurement@ridgeview.edu.gh',
    customerPhone: '+233 24 330 9184',
    items: [
      { id: 'item-3', description: 'Interactive Smartboard 75-inch UHD', quantity: 2, unitPrice: 4200, total: 8400 },
      { id: 'item-4', description: 'Wall mounting hardware & HDMI loom', quantity: 2, unitPrice: 250, total: 500 }
    ],
    subtotal: 8900,
    tax: 0,
    discount: 200,
    totalAmount: 8700,
    issueDate: '2026-09-22',
    dueDate: '2026-10-06',
    status: 'Sent',
    notes: 'Standard 14-day educational institution payment terms.',
    paymentMethodInstructions: 'MTN Merchant Till: 749201 or Bank Transfer to Ecobank GH'
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-0098',
    customerName: 'Volta Digital Media Agency',
    customerEmail: 'billing@voltadigital.gh',
    customerPhone: '+233 50 119 4022',
    items: [
      { id: 'item-5', description: 'Studio Production Lighting & Rode Audio mics', quantity: 1, unitPrice: 4800, total: 4800 }
    ],
    subtotal: 4800,
    tax: 0,
    discount: 0,
    totalAmount: 4800,
    issueDate: '2026-09-02',
    dueDate: '2026-09-16',
    status: 'Overdue',
    notes: 'Invoice is 13 days past due date. First reminder dispatched.',
    paymentMethodInstructions: 'MTN Merchant Till: 749201'
  },
  {
    id: 'inv-104',
    invoiceNumber: 'INV-2026-0106',
    customerName: 'Osu Bistro & Gastrobar',
    customerEmail: 'manager@osubistro.gh',
    customerPhone: '+233 20 882 1093',
    items: [
      { id: 'item-6', description: 'Thermal Receipt Printers (x2) & POS Tablets', quantity: 2, unitPrice: 1600, total: 3200 }
    ],
    subtotal: 3200,
    tax: 0,
    discount: 0,
    totalAmount: 3200,
    issueDate: '2026-09-28',
    dueDate: '2026-10-12',
    status: 'Draft',
    notes: 'Awaiting customer purchase order sign-off.',
    paymentMethodInstructions: 'Ecobank Ghana Account'
  }
];

export const initialFinancingOffers: FinancingOffer[] = [
  {
    id: 'fin-01',
    title: 'Working Capital Facility',
    purpose: 'Cash-flow stabilization, supplier settlement, seasonal demand',
    amount: 20000,
    interestRate: '2.1% / month',
    repaymentTerm: '6 months',
    provider: 'Stanbic Bank SME Growth Desk',
    suitabilityScore: 94,
    description: 'Pre-vetted revolving credit line backed by your 91% invoice collection rate and 3.8-year verified track record on Creda.',
    disbursementSpeed: 'Within 24 hours of confirmation',
    requirements: ['Verified Creda Passport (Score ≥ 75)', 'Active MTN MoMo / Bank feed > 6 months', 'Zero court disputes']
  },
  {
    id: 'fin-02',
    title: 'Q4 Inventory Financing',
    purpose: 'Import or wholesale electronics inventory ahead of year-end demand',
    amount: 35000,
    interestRate: '1.95% / month',
    repaymentTerm: '90 days bullet / structured',
    provider: 'Ecobank SME Capital Africa',
    suitabilityScore: 91,
    description: 'Designed specifically for tech and hardware retailers with recurring high-velocity inventory turns.',
    disbursementSpeed: 'Direct to approved distributor or wallet in 48h',
    requirements: ['Pro-forma invoice from authorized distributor', 'Verified Creda Financial Passport', 'Minimum GH¢30,000 monthly turnover']
  },
  {
    id: 'fin-03',
    title: 'Invoice Receivables Advance',
    purpose: 'Instant liquidity against vetted unpaid corporate invoices',
    amount: 15000,
    interestRate: '1.8% per 30 days',
    repaymentTerm: 'Upon debtor settlement (15–45 days)',
    provider: 'QuickCredit Enterprise Partner',
    suitabilityScore: 88,
    description: 'Access up to 80% of verified corporate receivables immediately without waiting for standard 30-day payment cycles.',
    disbursementSpeed: 'Same day (under 4 hours)',
    requirements: ['Unpaid invoice verified via Creda platform', 'Verified corporate debtor history']
  }
];

export const initialAIInsights: AIInsightItem[] = [
  {
    id: 'ins-1',
    title: 'Inventory expenses increased 18% this month',
    description: 'Your inventory spending is growing faster than monthly revenue (+8.4%). While Q4 inventory build is typical, holding excess stock may compress October working liquidity.',
    type: 'warning',
    category: 'Expense',
    actionPrompt: 'Ask Creda AI: How can I optimize my upcoming supplier order?',
    metricChange: '+18% MoM'
  },
  {
    id: 'ins-2',
    title: 'Revenue increased 12% across digital channels',
    description: 'MTN Mobile Money settlements from walk-in retail shoppers peaked on Fridays and Saturdays, driving GH¢14,200 of new weekly sales volume.',
    type: 'positive',
    category: 'Revenue',
    actionPrompt: 'Ask Creda AI: What drove my strongest weekend sales?',
    metricChange: '+12% growth'
  },
  {
    id: 'ins-3',
    title: '1 invoice is overdue (GH¢4,800)',
    description: 'Invoice #INV-2026-0098 for Volta Digital Media Agency is 13 days past due date. Their historical payment cycle averages 21 days.',
    type: 'warning',
    category: 'Invoice',
    actionPrompt: 'Ask Creda AI: Draft a friendly automated payment reminder',
    metricChange: 'GH¢4,800 at risk'
  },
  {
    id: 'ins-4',
    title: 'Your strongest sales day is Friday',
    description: 'Average Friday revenue is GH¢3,420 vs. weekday average of GH¢1,850. Consider synchronizing supplier deliveries on Thursdays to prevent stockouts.',
    type: 'info',
    category: 'Revenue',
    actionPrompt: 'Ask Creda AI: Show Friday customer volume distribution',
    metricChange: '+85% vs weekdays'
  },
  {
    id: 'ins-5',
    title: 'Transport & courier costs rose 9%',
    description: 'SwiftGo Deliveries dispatch runs increased from GH¢820 to GH¢894 due to more same-day customer deliveries.',
    type: 'info',
    category: 'Expense',
    actionPrompt: 'Ask Creda AI: Can we bundle customer delivery runs?',
    metricChange: '+9% transport'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Financial Passport updated',
    message: 'Your Creda Financial Passport score moved from 80 to 82 based on consistent September MoMo sweep reconciliations.',
    timestamp: '2 hours ago',
    read: false,
    type: 'passport'
  },
  {
    id: 'notif-2',
    title: 'Invoice #INV-2026-0098 overdue',
    message: 'Volta Digital Media Agency invoice of GH¢4,800 passed its due date on Sept 16.',
    timestamp: 'Yesterday at 09:30 AM',
    read: false,
    type: 'invoice'
  },
  {
    id: 'notif-3',
    title: 'Revenue milestone achieved',
    message: 'Monthly gross revenue crossed GH¢40,000 for the 4th consecutive calendar month.',
    timestamp: '3 days ago',
    read: true,
    type: 'revenue'
  },
  {
    id: 'notif-4',
    title: 'Unusual spending detected',
    message: 'Creda AI flagged an unexpected weekend equipment charge of GH¢890 in the Tema category.',
    timestamp: '5 days ago',
    read: true,
    type: 'alert'
  }
];

export const initialConnectedAccounts: ConnectedAccount[] = [
  {
    id: 'acc-1',
    institution: 'MTN Mobile Money Merchant Till',
    type: 'Mobile Money',
    accountNumberMasked: 'Till #749201 (024***8109)',
    lastSync: '10 minutes ago',
    status: 'active',
    permissions: ['Read transaction ledger', 'Verify payment settlements', 'Generate cash-flow statements']
  },
  {
    id: 'acc-2',
    institution: 'Ecobank Ghana Ltd',
    type: 'Bank',
    accountNumberMasked: 'Account •••• 4819 (Corporate Checking)',
    lastSync: '1 hour ago',
    status: 'active',
    permissions: ['Read daily closing balance', 'Reconcile supplier bank transfers', 'Verify statutory payments']
  },
  {
    id: 'acc-3',
    institution: 'Telecel Cash Business Till',
    type: 'Mobile Money',
    accountNumberMasked: 'Wallet •••• 9102 (Commercial Till)',
    lastSync: '3 hours ago',
    status: 'active',
    permissions: ['Read incoming retail payments', 'Reconcile utility disbursements']
  },
  {
    id: 'acc-4',
    institution: 'Ghana Revenue Authority (GRA e-VAT Portal)',
    type: 'Tax Service',
    accountNumberMasked: 'TIN P002941849X (Verified)',
    lastSync: 'Yesterday',
    status: 'active',
    permissions: ['Verify tax clearance certificate status', 'Confirm turnover filing alignment']
  }
];

// Sample Underwriter Applicant Profiles for the Financial Institution Portal
export interface BankApplicant {
  id: string;
  businessName: string;
  owner: string;
  sector: string;
  city: string;
  passportScore: number;
  monthlyRevenue: number;
  requestedAmount: number;
  requestedFacility: string;
  repaymentTerm: string;
  riskSignal: 'Low Risk' | 'Moderate' | 'Elevated Risk';
  fraudAlertCount: number;
  dataIntegrity: '100% API Verified' | 'Manual Reconciliation Needed';
  decisionStatus: 'Pending Underwriting' | 'Approved' | 'Requires Documentation' | 'Declined';
  lastSubmitted: string;
}

export const initialBankApplicants: BankApplicant[] = [
  {
    id: 'app-001',
    businessName: 'Golden Gateway Electronics Ltd',
    owner: 'Fawaz Rufai',
    sector: 'Consumer Electronics & Hardware Retail',
    city: 'Accra',
    passportScore: 82,
    monthlyRevenue: 52400,
    requestedAmount: 35000,
    requestedFacility: 'Q4 Inventory Financing',
    repaymentTerm: '90 days structured',
    riskSignal: 'Low Risk',
    fraudAlertCount: 0,
    dataIntegrity: '100% API Verified',
    decisionStatus: 'Pending Underwriting',
    lastSubmitted: '2 hours ago',
  },
  {
    id: 'app-002',
    businessName: 'Osu Fresh Organics & Cold Stores',
    owner: 'Abena Mensah',
    sector: 'Agri-Processing & Retail',
    city: 'Accra / Tema',
    passportScore: 78,
    monthlyRevenue: 38600,
    requestedAmount: 20000,
    requestedFacility: 'Working Capital Facility',
    repaymentTerm: '6 months',
    riskSignal: 'Low Risk',
    fraudAlertCount: 0,
    dataIntegrity: '100% API Verified',
    decisionStatus: 'Approved',
    lastSubmitted: 'Yesterday',
  },
  {
    id: 'app-003',
    businessName: 'Kaneshie Auto Spares Hub',
    owner: 'Kofi Boateng',
    sector: 'Automotive Parts Distribution',
    city: 'Kumasi',
    passportScore: 68,
    monthlyRevenue: 29400,
    requestedAmount: 45000,
    requestedFacility: 'Equipment Loan',
    repaymentTerm: '12 months',
    riskSignal: 'Moderate',
    fraudAlertCount: 1,
    dataIntegrity: 'Manual Reconciliation Needed',
    decisionStatus: 'Requires Documentation',
    lastSubmitted: '3 days ago',
  }
];
