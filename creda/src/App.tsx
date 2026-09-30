/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { supabase, supabaseConfigured } from './lib/supabase';
import { 
  ViewMode, 
  AppTab, 
  UserRole, 
  BusinessProfile, 
  Invoice, 
  Transaction, 
  NotificationItem,
  ConnectedAccount
} from './types';
import { loadWorkspace, saveBusiness, saveInvoice, saveTransaction, blankBusiness, buildPassport } from './lib/db';

// Layout & Marketing
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/marketing/HeroSection';
import { FeaturesGrid } from './components/marketing/FeaturesGrid';
import { CredaAIPromo } from './components/marketing/CredaAIPromo';
import { PassportShowcase } from './components/marketing/PassportShowcase';
import { SecurityTrust } from './components/marketing/SecurityTrust';
import { PricingSection } from './components/marketing/PricingSection';
import { Footer } from './components/marketing/Footer';

// App Workspace Components
import { Sidebar } from './components/layout/Sidebar';
import { AppHeader } from './components/layout/AppHeader';
import { MobileNav } from './components/layout/MobileNav';
import { NotificationDrawer } from './components/dashboard/NotificationDrawer';
import { OnboardingModal } from './components/onboarding/OnboardingModal';

// Dashboard Views
import { OverviewView } from './components/dashboard/OverviewView';
import { TransactionsView } from './components/dashboard/TransactionsView';
import { InvoicesView } from './components/dashboard/InvoicesView';
import { CreateInvoiceModal } from './components/dashboard/CreateInvoiceModal';
import { InvoicePreviewModal } from './components/dashboard/InvoicePreviewModal';
import { FinancialPassportView } from './components/dashboard/FinancialPassportView';
import { FinancialHealthView } from './components/dashboard/FinancialHealthView';
import { CashFlowForecastingView } from './components/dashboard/CashFlowForecastingView';
import { FinancingView } from './components/dashboard/FinancingView';
import { CredaAIAssistantView } from './components/dashboard/CredaAIAssistantView';
import { PrivacyPermissionsView } from './components/dashboard/PrivacyPermissionsView';
import { SettingsView } from './components/dashboard/SettingsView';
import { AuthView } from './components/auth/AuthViews';

export default function App() {
  // Navigation & View Mode
  const [viewMode, setViewModeRaw] = useState<ViewMode>('marketing');
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingWorkspace, setLoadingWorkspace] = useState(false);
  // The workspace is only reachable when signed in
  const setViewMode = (v: ViewMode) => setViewModeRaw(v === 'app' && !userId ? 'login' : v);
  const [currentTab, setCurrentTab] = useState<AppTab>('overview');

  // Track the signed-in user and load their data
  useEffect(() => {
    if (!supabaseConfigured) return;
    const hydrate = async (uid: string, email?: string, phone?: string) => {
      setUserId(uid);
      setLoadingWorkspace(true);
      const ws = await loadWorkspace(uid);
      const row = ws.profileRow;
      const biz = row?.business
        ? row.business
        : blankBusiness({ name: row?.business_name || '', ownerEmail: email || row?.email || '', ownerPhone: phone || row?.phone || '' });
      setBusinessProfile(biz);
      setInvoices(ws.invoices);
      setTransactions(ws.transactions);
      setLoadingWorkspace(false);
      if (!row?.business) setIsOnboardingOpen(true);
      setViewModeRaw((m) => (m === 'login' || m === 'signup' || m === 'marketing' ? 'app' : m));
    };
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      if (u) hydrate(u.id, u.email, u.phone);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUserId(null);
        setTransactions([]);
        setInvoices([]);
        setBusinessProfile(blankBusiness());
      } else if (event === 'SIGNED_IN' && session?.user) {
        const u = session.user;
        setTimeout(() => hydrate(u.id, u.email, u.phone), 0);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const [timeRange, setTimeRange] = useState<string>('30d');
  
  // Data States
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(blankBusiness());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [financingOffers] = useState<any[]>([]);
  const [insights] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);

  const userRole: UserRole = 'sme_owner';
  const passport = React.useMemo(
    () => buildPassport(businessProfile, transactions, invoices),
    [businessProfile, transactions, invoices]
  );

  // Modals & Panels
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [isInvoicePreviewOpen, setIsInvoicePreviewOpen] = useState(false);
  const [selectedPreviewInvoice, setSelectedPreviewInvoice] = useState<Invoice | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAIPrompt, setActiveAIPrompt] = useState<string | undefined>(undefined);

  // Actions
  const handleOpenAIWithPrompt = (prompt?: string) => {
    setActiveAIPrompt(prompt);
    setCurrentTab('creda-ai');
  };

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const tx: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
    };
    setTransactions([tx, ...transactions]);
    saveTransaction(tx);
  };

  const handleCreateInvoice = (newInv: Invoice) => {
    setInvoices([newInv, ...invoices]);
    saveInvoice(newInv);
    setSelectedPreviewInvoice(newInv);
    setIsInvoicePreviewOpen(true);
  };

  const handleMarkInvoicePaid = (invoiceId: string) => {
    const target = invoices.find((i) => i.id === invoiceId);
    if (target) saveInvoice({ ...target, status: 'Paid' });
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: 'Paid' as const } : inv
      )
    );
  };

  const handleDisconnectAccount = (accId: string) => {
    setConnectedAccounts(connectedAccounts.filter((a) => a.id !== accId));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    setNotifications(
      notifications.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setIsNotificationDrawerOpen(false);
    if (notif.type === 'passport') {
      setCurrentTab('passport');
    } else if (notif.type === 'invoice') {
      setCurrentTab('invoices');
    } else if (notif.type === 'revenue') {
      setCurrentTab('overview');
    } else {
      handleOpenAIWithPrompt("What caused the unusual spending alert?");
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Render Marketing Page
  if (viewMode === 'marketing') {
    return (
      <div className="min-h-screen bg-white text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar
          onNavigate={(v) => {
            if (v === 'signup') {
              setIsOnboardingOpen(true);
            } else {
              setViewMode(v);
            }
          }}
          onSelectFeature={(featId) => {
            const el = document.getElementById(featId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <main>
          <HeroSection
            onNavigate={(v) => setViewMode(v)}
          />

          <FeaturesGrid
            onNavigate={(v) => setViewMode(v)}
            onSelectFeature={(featKey) => {
              setViewMode('app');
              if (featKey === 'dashboard') setCurrentTab('overview');
              else if (featKey === 'passport') setCurrentTab('passport');
              else if (featKey === 'ai-assistant') setCurrentTab('creda-ai');
              else if (featKey === 'cashflow') setCurrentTab('cashflow');
              else if (featKey === 'invoicing') setCurrentTab('invoices');
              else if (featKey === 'financing') setCurrentTab('financing');
            }}
          />

          <CredaAIPromo
            onNavigate={(v) => setViewMode(v)}
            onOpenAssistant={() => {
              setViewMode('app');
              setCurrentTab('creda-ai');
            }}
          />

          <PassportShowcase
            onNavigate={(v) => setViewMode(v)}
            onViewPassport={() => {
              setViewMode('app');
              setCurrentTab('passport');
            }}
          />

          <SecurityTrust
            onNavigate={(v) => setViewMode(v)}
          />

          <PricingSection
            onNavigate={(v) => {
              setViewMode(v);
            }}
          />
        </main>

        <Footer onNavigate={(v) => setViewMode(v)} />

        {/* 5-Step Business Onboarding */}
        <OnboardingModal
          isOpen={isOnboardingOpen}
          initialData={businessProfile}
          onCancel={() => setIsOnboardingOpen(false)}
          onComplete={(newProfile) => {
            setBusinessProfile(newProfile);
          if (userId) saveBusiness(userId, newProfile);
            if (userId) saveBusiness(userId, newProfile);
            setIsOnboardingOpen(false);
            setViewMode('app');
            setCurrentTab('overview');
          }}
        />
      </div>
    );
  }

  // Render Login & Signup Full View
  if (viewMode === 'login' || viewMode === 'signup') {
    return (
      <>
        <AuthView
          mode={viewMode}
          onNavigate={(v) => setViewMode(v)}
          onSuccess={() => setViewModeRaw('app')}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />
        <OnboardingModal
          isOpen={isOnboardingOpen}
          initialData={businessProfile}
          onCancel={() => setIsOnboardingOpen(false)}
          onComplete={(newProfile) => {
            setBusinessProfile(newProfile);
          if (userId) saveBusiness(userId, newProfile);
            if (userId) saveBusiness(userId, newProfile);
            setIsOnboardingOpen(false);
            setViewMode('app');
            setCurrentTab('overview');
          }}
        />
      </>
    );
  }

  // Logged-In Application View (SME Dashboard & Financial Institution Portal)
  return (
    <div className="min-h-screen bg-neutral-50/60 text-neutral-900 flex flex-col md:flex-row antialiased">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
          }}
          userRole={userRole}
          businessName={businessProfile.name}
          ownerEmail={businessProfile.ownerEmail}
          onLogout={() => { supabase.auth.signOut(); setViewModeRaw('marketing'); }}
        />
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        
        {/* App Header */}
        <AppHeader
          userRole={userRole}
          businessName={businessProfile.name}
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
          unreadNotificationCount={unreadCount}
          onOpenMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          timeRange={timeRange}
          onChangeTimeRange={setTimeRange}
        />

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-neutral-200 p-4 space-y-2 z-20">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Quick Jump</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { setCurrentTab('overview'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-neutral-100 text-left font-semibold text-neutral-800"
              >
                Overview
              </button>
              <button
                onClick={() => { setCurrentTab('transactions'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-neutral-100 text-left font-semibold text-neutral-800"
              >
                Transactions
              </button>
              <button
                onClick={() => { setCurrentTab('invoices'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-neutral-100 text-left font-semibold text-neutral-800"
              >
                Invoices
              </button>
              <button
                onClick={() => { setCurrentTab('passport'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-neutral-100 text-left font-semibold text-neutral-800"
              >
                Passport
              </button>
              <button
                onClick={() => { setCurrentTab('cashflow'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-neutral-100 text-left font-semibold text-neutral-800"
              >
                Cash Flow
              </button>
              <button
                onClick={() => { setCurrentTab('financing'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-neutral-100 text-left font-semibold text-neutral-800"
              >
                Financing
              </button>
              <button
                onClick={() => { setCurrentTab('creda-ai'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-neutral-900 text-emerald-400 text-left font-semibold"
              >
                Creda AI
              </button>
              <button
                onClick={() => { setViewMode('marketing'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-neutral-50 border border-neutral-200 text-left text-neutral-600"
              >
                Sign out
              </button>
            </div>
          </div>
        )}

        {/* Viewport Content Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'overview' && (
            <OverviewView
              passport={passport}
              transactions={transactions}
              insights={insights}
              timeRange={timeRange}
              onSelectTab={(tab) => setCurrentTab(tab)}
              onOpenCreateInvoice={() => setIsCreateInvoiceOpen(true)}
              onAskAI={(prompt) => handleOpenAIWithPrompt(prompt)}
            />
          )}

          {currentTab === 'transactions' && (
            <TransactionsView
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
            />
          )}

          {currentTab === 'sales' && (
            <TransactionsView
              transactions={transactions.filter((t) => t.amount > 0)}
              onAddTransaction={handleAddTransaction}
            />
          )}

          {currentTab === 'expenses' && (
            <TransactionsView
              transactions={transactions.filter((t) => t.amount < 0)}
              onAddTransaction={handleAddTransaction}
            />
          )}

          {currentTab === 'invoices' && (
            <InvoicesView
              invoices={invoices}
              onOpenCreateModal={() => setIsCreateInvoiceOpen(true)}
              onPreviewInvoice={(inv) => {
                setSelectedPreviewInvoice(inv);
                setIsInvoicePreviewOpen(true);
              }}
            />
          )}

          {currentTab === 'passport' && (
            <FinancialPassportView
              businessProfile={businessProfile}
              passport={passport}
            />
          )}

          {currentTab === 'health' && (
            <FinancialHealthView
              passport={passport}
              onAskAI={(prompt) => handleOpenAIWithPrompt(prompt)}
              onOpenInvoices={() => setCurrentTab('invoices')}
            />
          )}

          {currentTab === 'cashflow' && (
            <CashFlowForecastingView transactions={transactions} invoices={invoices} />
          )}

          {currentTab === 'financing' && (
            <FinancingView
              offers={financingOffers}
              businessProfile={businessProfile}
              passport={passport}
              onSelectTab={(t) => setCurrentTab(t)}
            />
          )}

          {currentTab === 'creda-ai' && (
            <CredaAIAssistantView
              businessProfile={businessProfile}
              passport={passport}
              transactions={transactions}
              invoices={invoices}
              initialPrompt={activeAIPrompt}
            />
          )}

          {currentTab === 'permissions' && (
            <PrivacyPermissionsView
              connectedAccounts={connectedAccounts}
              onDisconnect={handleDisconnectAccount}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              businessProfile={businessProfile}
              onUpdateProfile={(p) => setBusinessProfile(p)}
            />
          )}

          {currentTab === 'reports' && (
            <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center space-y-3">
              <h3 className="text-base font-bold text-neutral-900">Official Financial Statements & Audit Packs</h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Generate reconciled P&L statements, monthly turnover reports, and VAT tax schedules for submission to Ghanaian commercial banks and GRA.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold cursor-pointer"
                >
                  Print report
                </button>
                <button
                  onClick={() => setCurrentTab('passport')}
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-800 text-xs font-semibold cursor-pointer"
                >
                  View Creda Passport
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onQuickAI={() => handleOpenAIWithPrompt()}
      />

      {/* Create Invoice Modal */}
      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
        onCreateInvoice={handleCreateInvoice}
      />

      {/* Invoice Preview & Dispatch Modal */}
      <InvoicePreviewModal
        isOpen={isInvoicePreviewOpen}
        invoice={selectedPreviewInvoice}
        businessProfile={businessProfile}
        onClose={() => setIsInvoicePreviewOpen(false)}
        onMarkPaid={handleMarkInvoicePaid}
      />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSelectNotification={handleSelectNotification}
      />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        initialData={businessProfile}
        onCancel={() => setIsOnboardingOpen(false)}
        onComplete={(newProfile) => {
          setBusinessProfile(newProfile);
          if (userId) saveBusiness(userId, newProfile);
          setIsOnboardingOpen(false);
          setViewMode('app');
          setCurrentTab('overview');
        }}
      />

    </div>
  );
}
