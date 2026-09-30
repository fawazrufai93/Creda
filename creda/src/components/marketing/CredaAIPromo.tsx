import React, { useState } from 'react';
import { Bot, Mic, MicOff, Send, Sparkles, ArrowRight, CornerDownLeft, Volume2 } from 'lucide-react';
import { ViewMode } from '../../types';

interface CredaAIPromoProps {
  onNavigate: (view: ViewMode) => void;
  onOpenAssistant: () => void;
}

interface ChatExchange {
  user: string;
  ai: string;
  scenario?: {
    current: string;
    impact: string;
    recommendation: string;
  };
}

export const CredaAIPromo: React.FC<CredaAIPromoProps> = ({ onNavigate, onOpenAssistant }) => {
  const [activeQuestion, setActiveQuestion] = useState<string>("Why was my profit lower this month?");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  
  const conversationLibrary: Record<string, ChatExchange> = {
    "Why was my profit lower this month?": {
      user: "Why was my profit lower this month?",
      ai: "Your gross revenue increased by 8.4% (reaching GH¢42,800), but inventory costs expanded by 21.0% (GH¢14,200). Your largest expense surge came from two unscheduled wholesale shipments from Accra West Tech Wholesale. If this purchase velocity continues unchecked, your net operating cash buffer will dip below the recommended 15% threshold by mid-October.",
      scenario: {
        current: "Current Gross Margin: 33.5% (down from 38.1%)",
        impact: "GH¢3,200 higher cost of goods sold",
        recommendation: "Hold further bulk charger/accessory orders until warehouse turns reach 70%."
      }
    },
    "Can I afford new inventory?": {
      user: "Can I afford GH¢15,000 of new smartphone inventory this week?",
      ai: "Based on your current cash balance (GH¢14,350 net monthly surplus) and scheduled payables (GH¢3,200 facility payment due on Oct 5), spending GH¢15,000 all at once in cash would reduce your liquidity reserve to GH¢2,150. A safer approach: pay GH¢6,000 upfront, use supplier 14-day trade credit for the balance, or draw against your pre-approved GH¢20,000 Stanbic Working Capital line.",
      scenario: {
        current: "Liquid Reserve: GH¢14,350",
        impact: "Immediate cash drop to GH¢2,150 (High Risk)",
        recommendation: "Split into 40% upfront deposit + 14-day supplier credit terms."
      }
    },
    "Who owes me money?": {
      user: "Who owes me money right now?",
      ai: "You have 2 pending invoices totaling GH¢13,500. Most critically, Volta Digital Media Agency (Invoice #INV-2026-0098 for GH¢4,800) is 13 days past due date. Ridgeview Academy owes GH¢8,700, but is within standard payment terms (due Oct 6).",
      scenario: {
        current: "Total Receivables: GH¢13,500",
        impact: "GH¢4,800 past due (35.5% of receivables)",
        recommendation: "Send an automated payment reminder with direct MTN MoMo Merchant pay-link."
      }
    },
    "What are my biggest expenses?": {
      user: "What are my biggest business expenses?",
      ai: "Over the last 30 days, your expenses totaled GH¢28,450 across four main categories: 1) Wholesale Inventory purchases: GH¢14,200 (49.9%), 2) Port clearance and GRA levies: GH¢5,200 (18.3%), 3) Store sales staff salaries and commissions: GH¢4,800 (16.9%), and 4) Retail showroom rent and utilities: GH¢2,450 (8.6%).",
    },
    "How is my business performing?": {
      user: "How is my business performing overall?",
      ai: "Your business is in Healthy Standing with a Creda Financial Passport score of 82/100. Your monthly revenue consistency is strong (81/100) and payment behaviour is exceptional (91/100). You are in the top 15% of electronics retailers in the Greater Accra region on cash-flow stability.",
    }
  };

  const currentExchange = conversationLibrary[activeQuestion] || conversationLibrary["Why was my profit lower this month?"];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setActiveQuestion("Can I afford new inventory?");
    setCustomInput('');
  };

  const toggleMic = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <section id="creda-ai-section" className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background glow subtle effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Contextual Business Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Meet Creda AI.
            </h2>
            
            <p className="text-xl text-neutral-300 font-medium">
              Your business finances, explained in plain language.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              No complex accounting jargon or spreadsheets. Creda AI analyses your actual Mobile Money settlements, bank statements, and invoice timelines to provide clear, actionable business answers in seconds.
            </p>

            {/* Suggested Question Chips */}
            <div className="pt-2">
              <span className="text-xs font-medium text-neutral-400 block mb-3">Try asking these live questions:</span>
              <div className="flex flex-wrap gap-2">
                {Object.keys(conversationLibrary).map((q) => (
                  <button
                    key={q}
                    onClick={() => setActiveQuestion(q)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeQuestion === q 
                        ? 'bg-emerald-700 text-white shadow-xs' 
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700/60'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenAssistant}
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <span>Open full Creda AI Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: AI Interactive Simulation Interface */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-950 rounded-2xl border border-neutral-800 shadow-2xl p-6 sm:p-7 space-y-5">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Creda Financial Analyst</h3>
                    <p className="text-[11px] text-neutral-400">Trained on Ghanaian SME financial dynamics</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-900/60 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Live Account Sync</span>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4">
                
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-lg bg-neutral-800 text-white rounded-2xl rounded-tr-xs px-4 py-3 text-sm leading-relaxed border border-neutral-700">
                    <p className="text-xs text-neutral-400 mb-1 font-medium">You (Fawaz Rufai · Owner)</p>
                    <p>{currentExchange.user}</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="max-w-xl bg-neutral-900 text-neutral-100 rounded-2xl rounded-tl-xs px-5 py-4 text-sm leading-relaxed border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-neutral-400 pb-1">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Creda AI Insight
                      </span>
                      <span className="text-[11px]">Calculated from reconciled ledger</span>
                    </div>

                    <p className="text-neutral-200">{currentExchange.ai}</p>

                    {currentExchange.scenario && (
                      <div className="mt-3 p-3 bg-neutral-950/80 rounded-xl border border-neutral-800/80 text-xs space-y-1.5">
                        <p className="font-semibold text-neutral-300">Scenario Simulation:</p>
                        <p className="text-neutral-400"><span className="text-neutral-200">Impact:</span> {currentExchange.scenario.impact}</p>
                        <p className="text-emerald-400 font-medium"><span className="text-neutral-200">Recommended Action:</span> {currentExchange.scenario.recommendation}</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Interactive Input Form */}
              <form onSubmit={handleCustomSubmit} className="pt-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder={isListening ? "Listening in Accra... speak your question" : "Ask Creda AI about your revenue, cash flow, or debt..."}
                    className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl px-4 py-3 pr-24 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <div className="absolute right-2 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={toggleMic}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isListening 
                          ? 'bg-rose-600 text-white animate-pulse' 
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                      title={isListening ? "Stop listening" : "Simulate voice input"}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    <button
                      type="submit"
                      className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors cursor-pointer"
                      title="Send question"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {isListening && (
                  <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" /> Voice recognition active (English / Pidgin terminology supported)
                  </p>
                )}
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
