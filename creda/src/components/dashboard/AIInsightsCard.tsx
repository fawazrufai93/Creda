import React from 'react';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';
import { AIInsightItem } from '../../types';

interface AIInsightsCardProps {
  insights: AIInsightItem[];
  onAskAI: (promptText?: string) => void;
}

export const AIInsightsCard: React.FC<AIInsightsCardProps> = ({ insights, onAskAI }) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-neutral-900">Creda AI Insights</h3>
          </div>
        </div>

        {insights.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <p className="text-xs font-semibold text-neutral-800">No insights yet</p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Record transactions and invoices and Creda AI can analyse your cash flow, spending and collections.
            </p>
          </div>
        ) : (
          <ul className="py-4 space-y-3">
            {insights.map((i: any) => (
              <li key={i.id} className="text-xs text-neutral-700">{i.title || i.text}</li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => onAskAI()}
        className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-emerald-700 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span>Ask Creda AI about your business</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
