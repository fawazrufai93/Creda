import React from 'react';
import { Bot, ArrowRight, Sparkles, TrendingUp, AlertTriangle, Calendar, Truck } from 'lucide-react';
import { AIInsightItem } from '../../types';

interface AIInsightsCardProps {
  insights: AIInsightItem[];
  onAskAI: (promptText?: string) => void;
}

export const AIInsightsCard: React.FC<AIInsightsCardProps> = ({ insights, onAskAI }) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900">Creda AI Insights</h3>
          </div>
          <button
            onClick={() => onAskAI()}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Ask Creda AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Primary Featured Insight */}
        <div className="py-4 border-b border-neutral-100 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs font-bold text-neutral-900">
              Inventory expenses increased 18% this month.
            </span>
            <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded shrink-0 tabular-nums">
              +18% MoM
            </span>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            Your inventory spending is growing faster than revenue (+8.4%). Bulk wholesale orders from Accra West Tech placed on Sept 14 & 22 are compressing working reserves.
          </p>

          <button
            onClick={() => onAskAI("How should I optimize my inventory orders given my 18% expense increase?")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-emerald-700 pt-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Analyze inventory cash impact</span>
          </button>
        </div>

        {/* Secondary Scannable Micro-Insights */}
        <div className="pt-3 space-y-2.5">
          <div 
            onClick={() => onAskAI("Why did revenue increase 12% across digital channels?")}
            className="p-2.5 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-neutral-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-medium text-neutral-800 truncate">Revenue increased 12% across digital channels</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold shrink-0 tabular-nums">+12%</span>
          </div>

          <div 
            onClick={() => onAskAI("Show me overdue invoices and drafting instructions")}
            className="p-2.5 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-neutral-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-medium text-neutral-800 truncate">1 major invoice overdue (GH¢4,800)</span>
            </div>
            <span className="text-[11px] text-amber-700 font-semibold shrink-0">13d late</span>
          </div>

          <div 
            onClick={() => onAskAI("Explain why Friday is my strongest sales day")}
            className="p-2.5 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-neutral-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-xs font-medium text-neutral-800 truncate">Your strongest sales day is Friday (GH¢3,420 avg)</span>
            </div>
            <span className="text-[11px] text-neutral-500 font-semibold shrink-0">+85%</span>
          </div>

          <div 
            onClick={() => onAskAI("How can we bundle dispatch runs to lower transport expenses?")}
            className="p-2.5 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-neutral-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Truck className="w-4 h-4 text-neutral-600 shrink-0" />
              <span className="text-xs font-medium text-neutral-800 truncate">Transport & courier expenses increased 9%</span>
            </div>
            <span className="text-[11px] text-neutral-500 font-semibold shrink-0">+9%</span>
          </div>
        </div>

      </div>

      <div className="pt-4 mt-4 border-t border-neutral-100">
        <button
          onClick={() => onAskAI()}
          className="w-full py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ask Creda AI custom question</span>
        </button>
      </div>

    </div>
  );
};
