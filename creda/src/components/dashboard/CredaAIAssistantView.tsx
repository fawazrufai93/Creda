import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  TrendingUp,
  CreditCard,
  Building2,
  Calendar,
  Volume2
} from 'lucide-react';
import { BusinessProfile, FinancialPassportData } from '../../types';
import { formatCedis } from '../../utils/formatters';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  scenario?: {
    currentPosition: number;
    afterPurchase: number;
    recommendedReserve: number;
    impactLevel: 'Safe' | 'Moderate' | 'High Risk';
    notes: string;
  };
  suggestedFollowups?: string[];
}

interface CredaAIAssistantViewProps {
  businessProfile: BusinessProfile;
  passport: FinancialPassportData;
  initialPrompt?: string;
}

export const CredaAIAssistantView: React.FC<CredaAIAssistantViewProps> = ({
  businessProfile,
  passport,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: "Good morning Fawaz. I'm Creda AI, your business financial analyst. I'm connected to your MTN MoMo merchant till, Ecobank corporate feed, and your recent invoice settlements. What would you like to review or model today?",
      timestamp: '09:00 AM',
      suggestedFollowups: [
        "Can I afford GH¢15,000 of inventory?",
        "Why was my profit lower this month?",
        "Who owes me money right now?",
        "What are my biggest expenses?",
        "How is my business performing?"
      ]
    },
    {
      id: 'm-2',
      sender: 'user',
      text: "Can I afford GH¢15,000 of inventory this week?",
      timestamp: '09:02 AM',
    },
    {
      id: 'm-3',
      sender: 'assistant',
      text: "Based on your recent cash flow (GH¢14,350 net monthly surplus), current scheduled obligations (GH¢3,200 facility payment due), and average monthly expenses, an immediate cash outlay of GH¢15,000 would reduce your projected cash reserve significantly down to GH¢2,150. Here is the scenario breakdown:",
      timestamp: '09:02 AM',
      scenario: {
        currentPosition: 14350,
        afterPurchase: 2150,
        recommendedReserve: 5000,
        impactLevel: 'High Risk',
        notes: "Depleting reserves to GH¢2,150 leaves zero cushion for unexpected utility bills, logistics rate spikes, or debtor delays. Consider paying 40% upfront (GH¢6,000) and requesting 14-day trade credit for the balance."
      },
      suggestedFollowups: [
        "What if I split it into two 50% payments?",
        "Can I use my Stanbic credit line instead?",
        "Draft supplier discount negotiation letter"
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState('inventory-affordability');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Intelligent domain-grounded response simulator
    setTimeout(() => {
      let replyText = '';
      let scenarioData = undefined;
      let followups: string[] = [];

      const lower = query.toLowerCase();

      if (lower.includes('profit') || lower.includes('margin') || lower.includes('lower')) {
        replyText = "Your gross revenue increased by 8.4% (reaching GH¢42,800), but inventory costs rose by 21.0% (GH¢14,200). Your largest single cost increase came from two unscheduled wholesale shipments from Accra West Tech Wholesale. If the current buying pace continues, your net operating cash flow may tighten by mid-October.";
        followups = ["How can I reduce supplier costs?", "Which products have the highest margin?", "Set an inventory spend alert"];
      } else if (lower.includes('who owes') || lower.includes('debtor') || lower.includes('invoice') || lower.includes('overdue')) {
        replyText = "You have 2 outstanding invoices totaling GH¢13,500. Most critically, Volta Digital Media Agency (Invoice #INV-2026-0098 for GH¢4,800) is currently 13 days past due date. Ridgeview Academy owes GH¢8,700, due in 8 days. Would you like me to generate a payment reminder link for Volta Digital?";
        followups = ["Draft WhatsApp reminder for Volta Digital", "Offer a 3% early payment discount", "View all pending invoices"];
      } else if (lower.includes('inventory') || lower.includes('afford') || lower.includes('15000') || lower.includes('purchase')) {
        replyText = "An immediate purchase of GH¢15,000 would compress your current liquid buffer to GH¢2,150. Our model recommends maintaining at least GH¢5,000 for emergency working liquidity. You are pre-approved for the GH¢20,000 Stanbic Working Capital line at 2.1%/mo, which would preserve 100% of your operating buffer.";
        scenarioData = {
          currentPosition: 14350,
          afterPurchase: 2150,
          recommendedReserve: 5000,
          impactLevel: 'High Risk' as const,
          notes: "Alternative recommendation: Draw GH¢10,000 from Stanbic facility and pay GH¢5,000 from cash surplus."
        };
        followups = ["Review Stanbic facility terms", "See 60-day cash impact", "Calculate weekly repayment"];
      } else if (lower.includes('expense') || lower.includes('cost')) {
        replyText = "Your last 30-day expenses totaled GH¢28,450. Wholesale hardware/inventory accounted for 49.9% (GH¢14,200), customs duties & levies 18.3% (GH¢5,200), payroll 16.9% (GH¢4,800), and utilities/rent 8.6% (GH¢2,450).";
        followups = ["How do my expenses compare to other Accra retailers?", "Can we trim shipping costs?"];
      } else {
        replyText = `Based on your verified Creda Financial Passport (Score: 82/100, monthly revenue GH¢52,400), your business shows strong cash consistency and 91% invoice collection. Your runway trajectory is stable with GH¢14,350 current surplus.`;
        followups = ["Can I afford new inventory?", "How can I improve my 82 score to 90?", "What is my credit limit?"];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        scenario: scenarioData,
        suggestedFollowups: followups,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1100);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage("Can I afford GH¢15,000 of inventory?");
      }, 2800);
    }
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] min-h-[580px] bg-white rounded-2xl border border-neutral-200 shadow-xs flex overflow-hidden">
      
      {/* Left Sidebar: Conversation History Topics */}
      <div className="hidden lg:flex w-64 border-r border-neutral-200 flex-col justify-between bg-neutral-50/50 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Analysis Sessions</span>
            <button
              onClick={() => {
                setMessages([
                  {
                    id: `m-init-${Date.now()}`,
                    sender: 'assistant',
                    text: "New conversation started. How can I assist your business finances today?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    suggestedFollowups: ["Can I afford new inventory?", "Who owes me money?", "Why was profit lower?"]
                  }
                ]);
              }}
              className="p-1 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
              title="Start fresh conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1 text-xs">
            <button
              onClick={() => setSelectedConversation('inventory-affordability')}
              className={`w-full text-left p-2.5 rounded-lg font-medium transition-all ${
                selectedConversation === 'inventory-affordability'
                  ? 'bg-white text-neutral-950 font-bold shadow-xs border border-neutral-200'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <p className="truncate">Inventory Affordability</p>
              <p className="text-[10px] text-neutral-400 mt-0.5">Today · Active session</p>
            </button>

            <button
              onClick={() => setSelectedConversation('profit-leakage')}
              className={`w-full text-left p-2.5 rounded-lg font-medium transition-all ${
                selectedConversation === 'profit-leakage'
                  ? 'bg-white text-neutral-950 font-bold shadow-xs border border-neutral-200'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <p className="truncate">Profit & Margin Analysis</p>
              <p className="text-[10px] text-neutral-400 mt-0.5">Yesterday · Q3 review</p>
            </button>

            <button
              onClick={() => setSelectedConversation('debtor-followup')}
              className={`w-full text-left p-2.5 rounded-lg font-medium transition-all ${
                selectedConversation === 'debtor-followup'
                  ? 'bg-white text-neutral-950 font-bold shadow-xs border border-neutral-200'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <p className="truncate">Overdue Receivables Strategy</p>
              <p className="text-[10px] text-neutral-400 mt-0.5">3 days ago · Volta Media</p>
            </button>
          </div>
        </div>

        <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Model Standard</span>
          </div>
          <p className="text-[11px] text-neutral-500">
            Grounded directly on your reconciled MoMo transactions and verified bank statements.
          </p>
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="flex-1 flex flex-col justify-between bg-white overflow-hidden">
        
        {/* Chat Header */}
        <div className="px-6 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900">Creda Financial Copilot</h3>
              <p className="text-[10px] text-neutral-500">Golden Gateway Electronics · Context Loaded</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] text-neutral-500 font-medium">Reconciled in Accra</span>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xl rounded-2xl px-5 py-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-neutral-900 text-white rounded-tr-xs'
                    : 'bg-neutral-50 border border-neutral-200 text-neutral-900 rounded-tl-xs space-y-3'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-0.5">
                  <span className="font-semibold">
                    {msg.sender === 'user' ? 'Fawaz Rufai (Owner)' : 'Creda AI'}
                  </span>
                  <span className="tabular-nums">{msg.timestamp}</span>
                </div>

                <p className="text-neutral-800 dark:text-neutral-100 whitespace-pre-line leading-relaxed">
                  {msg.text}
                </p>

                {/* Structured Scenario Calculation Card */}
                {msg.scenario && (
                  <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                      <span className="font-bold text-neutral-900 text-xs">Affordability Analysis</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        msg.scenario.impactLevel === 'Safe' ? 'bg-emerald-50 text-emerald-700' :
                        msg.scenario.impactLevel === 'Moderate' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {msg.scenario.impactLevel}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Current Reserve</span>
                        <p className="font-bold text-neutral-900 tabular-nums">
                          {formatCedis(msg.scenario.currentPosition)}
                        </p>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px]">After Outlay</span>
                        <p className="font-bold text-rose-600 tabular-nums">
                          {formatCedis(msg.scenario.afterPurchase)}
                        </p>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Min Recommended</span>
                        <p className="font-bold text-emerald-700 tabular-nums">
                          {formatCedis(msg.scenario.recommendedReserve)}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-neutral-600 pt-1 border-t border-neutral-100">
                      <p><strong>Impact: </strong>{msg.scenario.notes}</p>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => handleSendMessage("Show me supplier negotiation terms")}
                        className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-[11px] font-semibold text-neutral-800 transition-colors"
                      >
                        See calculation
                      </button>
                      <button
                        onClick={() => handleSendMessage("What if I split into two payments?")}
                        className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-[11px] font-semibold text-neutral-800 transition-colors"
                      >
                        Ask another scenario
                      </button>
                    </div>
                  </div>
                )}

                {/* Suggested follow-up prompt chips */}
                {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.suggestedFollowups.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-[11px] text-neutral-700 font-medium hover:border-neutral-400 hover:text-neutral-900 transition-all cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-neutral-100 text-neutral-600 rounded-2xl rounded-tl-xs px-4 py-3 text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">Analyzing financial telemetry...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-neutral-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isRecording ? "Listening to your voice query in Accra..." : "Ask Creda AI about inventory affordability, debt, or cash flow..."}
                className="w-full pl-4 pr-20 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
              <div className="absolute right-2.5 top-2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                  title={isRecording ? "Stop voice listening" : "Simulate voice input"}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {isRecording && (
            <p className="text-[11px] text-emerald-700 mt-2 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 animate-pulse" /> Voice recording simulated. Speak clearly in English or local commercial terminology.
            </p>
          )}
        </div>

      </div>

      {/* Right Sidebar: Real-Time Business Context Pane */}
      <div className="hidden xl:flex w-72 border-l border-neutral-200 flex-col justify-between bg-neutral-50/50 p-5 space-y-4">
        <div>
          <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-3">
            Live Business Context
          </span>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block text-[11px]">Monthly Gross Revenue</span>
              <p className="text-base font-bold text-neutral-900 mt-0.5 tabular-nums">GH¢42,800</p>
              <span className="text-[10px] text-emerald-700 font-semibold">+8.4% this month</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block text-[11px]">Net Operating Surplus</span>
              <p className="text-base font-bold text-emerald-700 mt-0.5 tabular-nums">GH¢14,350</p>
              <span className="text-[10px] text-neutral-500">Liquid in Ecobank & MoMo</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block text-[11px]">Outstanding Receivables</span>
              <p className="text-base font-bold text-neutral-900 mt-0.5 tabular-nums">GH¢13,500</p>
              <span className="text-[10px] text-rose-600 font-semibold">GH¢4,800 is 13d overdue</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block text-[11px]">Passport Score</span>
              <p className="text-base font-bold text-neutral-900 mt-0.5 tabular-nums">82 / 100</p>
              <span className="text-[10px] text-emerald-700 font-semibold">Prime credit grade</span>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-neutral-400 border-t border-neutral-200 pt-3">
          Verified source feeds: MTN MoMo Merchant, Ecobank Direct, Telecel Till.
        </div>
      </div>

    </div>
  );
};
