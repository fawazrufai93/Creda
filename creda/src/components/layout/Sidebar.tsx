import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  TrendingUp, 
  TrendingDown, 
  Receipt, 
  ShieldCheck, 
  HeartPulse, 
  LineChart, 
  Landmark, 
  Bot, 
  FileText, 
  Settings, 
  ShieldAlert, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Building2,
  Lock
} from 'lucide-react';
import { AppTab, UserRole } from '../../types';
import { Wordmark } from '../common/Logo';

interface SidebarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  userRole: UserRole;
  businessName?: string;
  ownerEmail?: string;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  businessName,
  ownerEmail,
  onLogout,
}) => {
  const mainNavItems = [
    { id: 'overview' as AppTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions' as AppTab, label: 'Transactions', icon: ArrowLeftRight },
    { id: 'sales' as AppTab, label: 'Sales', icon: TrendingUp },
    { id: 'expenses' as AppTab, label: 'Expenses', icon: TrendingDown },
    { id: 'invoices' as AppTab, label: 'Invoices', icon: Receipt },
    { id: 'passport' as AppTab, label: 'Financial Passport', icon: ShieldCheck, badge: 'Verified' },
    { id: 'health' as AppTab, label: 'Financial Health', icon: HeartPulse, score: '82' },
    { id: 'cashflow' as AppTab, label: 'Cash Flow', icon: LineChart },
    { id: 'financing' as AppTab, label: 'Financing', icon: Landmark, badge: 'Pre-vetted' },
    { id: 'creda-ai' as AppTab, label: 'Creda AI', icon: Bot, isAi: true },
    { id: 'reports' as AppTab, label: 'Reports', icon: FileText },
  ];

  const secondaryNavItems = [
    { id: 'permissions' as AppTab, label: 'Data & Privacy', icon: Lock },
    { id: 'settings' as AppTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col justify-between h-screen sticky top-0 select-none z-30">
      
      {/* Brand & Workspace Header */}
      <div>
        <div className="h-16 px-6 border-b border-neutral-100 flex items-center justify-between">
          <Wordmark size={26} />

          <div className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
            GH₵ · Accra
          </div>
        </div>

        {/* Business Selector Header Pill */}
        <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <p className="text-xs font-bold text-neutral-900 truncate">{businessName || 'Your business'}</p>
              <p className="text-[11px] text-neutral-500 truncate">Ghana</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Synced Feed" />
          </div>
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-270px)]">
          <p className="px-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
            Finance & Intelligence
          </p>

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive
                        ? item.isAi ? 'text-emerald-400' : 'text-white'
                        : item.isAi ? 'text-emerald-600' : 'text-neutral-500 group-hover:text-neutral-800'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                      isActive
                        ? 'bg-emerald-900/60 text-emerald-300'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.score && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded tabular-nums ${
                      isActive ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {item.score}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-neutral-100">
            <p className="px-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
              Configuration
            </p>
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-neutral-950 text-white font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Footer Profile & Sign Out */}
      <div className="p-3 border-t border-neutral-200 bg-neutral-50/80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">{(businessName || ownerEmail || 'C').trim().charAt(0).toUpperCase()}</div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-900 truncate">{businessName || 'My account'}</p>
              <p className="text-[10px] text-neutral-500 truncate">{ownerEmail || 'Owner'}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </aside>
  );
};
