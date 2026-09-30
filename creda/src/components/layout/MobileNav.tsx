import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Receipt, 
  ShieldCheck, 
  Bot, 
  Sparkles 
} from 'lucide-react';
import { AppTab } from '../../types';

interface MobileNavProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onQuickAI: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  onQuickAI,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => onSelectTab('overview')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium transition-colors ${
            currentTab === 'overview' ? 'text-neutral-950 font-bold' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        {/* Transactions */}
        <button
          onClick={() => onSelectTab('transactions')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium transition-colors ${
            currentTab === 'transactions' ? 'text-neutral-950 font-bold' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <ArrowLeftRight className="w-5 h-5 mb-0.5" />
          <span>Ledger</span>
        </button>

        {/* Central Floating AI Button */}
        <div className="-mt-5 flex flex-col items-center">
          <button
            onClick={onQuickAI}
            className="w-11 h-11 rounded-full bg-neutral-950 text-emerald-400 flex items-center justify-center shadow-lg border-2 border-white hover:bg-neutral-800 active:scale-95 transition-all"
            aria-label="Ask Creda AI"
          >
            <Bot className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-bold text-emerald-700 mt-0.5">Creda AI</span>
        </div>

        {/* Invoices */}
        <button
          onClick={() => onSelectTab('invoices')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium transition-colors ${
            currentTab === 'invoices' ? 'text-neutral-950 font-bold' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Receipt className="w-5 h-5 mb-0.5" />
          <span>Invoices</span>
        </button>

        {/* Passport */}
        <button
          onClick={() => onSelectTab('passport')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium transition-colors ${
            currentTab === 'passport' ? 'text-neutral-950 font-bold' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <ShieldCheck className="w-5 h-5 mb-0.5" />
          <span>Passport</span>
        </button>

      </div>
    </div>
  );
};
