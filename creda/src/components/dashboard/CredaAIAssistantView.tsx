import { summarize } from '../../utils/formatters';
import { supabase } from '../../lib/supabase';
import { Transaction, Invoice } from '../../types';
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
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
  transactions: Transaction[];
  invoices: Invoice[];
  initialPrompt?: string;
}

export const CredaAIAssistantView: React.FC<CredaAIAssistantViewProps> = ({
  businessProfile,
  passport,
  transactions,
  invoices,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello${businessProfile.name ? ', ' + businessProfile.name : ''}. I'm Creda AI. I answer questions using the transactions and invoices you have recorded in Creda. What would you like to know?`,
      timestamp: '09:00 AM',
      suggestedFollowups: [
        "Can I afford new inventory?",
        "Why was my profit lower this month?",
        "Who owes me money right now?",
        "What are my biggest expenses?",
        "How is my business performing?"
      ]
    }
  ]);

  const ctx30 = summarize(transactions, 30);
  const ctxUnpaid = invoices.filter((i) => i.status === 'Sent' || i.status === 'Overdue').reduce((t, i) => t + i.totalAmount, 0);
  const [inputText, setInputText] = useState('');
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

    (async () => {
      const s30 = summarize(transactions, 30);
      const unpaid = invoices.filter((i) => i.status === 'Sent' || i.status === 'Overdue');
      const byCat: Record<string, number> = {};
      transactions.filter((t) => t.amount < 0).forEach((t) => { byCat[t.category] = (byCat[t.category] || 0) + Math.abs(t.amount); });
      const context = [
        `Business: ${businessProfile.name || 'n/a'} (${businessProfile.sector || 'sector n/a'})`,
        `Transactions recorded: ${transactions.length}; last 30 days revenue GH¢${s30.revenue}, expenses GH¢${s30.expenses}, net GH¢${s30.net}`,
        `Expenses by category (all time): ${JSON.stringify(byCat)}`,
        `Unpaid invoices: ${unpaid.map((i) => `${i.invoiceNumber} ${i.customerName} GH¢${i.totalAmount} due ${i.dueDate}`).join('; ') || 'none'}`,
        `Recent transactions: ${transactions.slice(0, 25).map((t) => `${t.date} ${t.description} GH¢${t.amount}`).join('; ') || 'none'}`,
      ].join('\n');
      const history = [...messages, userMsg].filter((m) => m.sender === 'user' || m.sender === 'assistant')
        .map((m) => ({ role: m.sender, text: m.text }));
      let replyText = '';
      try {
        const { data } = await supabase.auth.getSession();
        const r = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session?.access_token || ''}` },
          body: JSON.stringify({ messages: history, context }),
        });
        const j = await r.json();
        replyText = r.ok && j.text ? j.text : (j.error || 'Sorry, I could not answer that right now.');
      } catch {
        replyText = 'Sorry, I could not reach the assistant. Please check your connection and try again.';
      }
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    })();
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] min-h-[580px] bg-white rounded-2xl border border-neutral-200 shadow-xs flex overflow-hidden">
      
      {/* Left Sidebar: Conversation History Topics */}
      <div className="hidden lg:flex w-64 border-r border-neutral-200 flex-col justify-between bg-neutral-50/50 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Conversation</span>
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
        </div>

        <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Model Standard</span>
          </div>
          <p className="text-[11px] text-neutral-500">
            Answers are based on the transactions and invoices you record in Creda.
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
              <p className="text-[10px] text-neutral-500">{businessProfile.name || 'Your business'} · Your recorded data</p>
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
                    {msg.sender === 'user' ? 'You' : 'Creda AI'}
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
                placeholder={"Ask Creda AI about inventory affordability, debt, or cash flow..."}
                className="w-full pl-4 pr-4 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Right Sidebar: Real-Time Business Context Pane */}
      <div className="hidden xl:flex w-72 border-l border-neutral-200 flex-col justify-between bg-neutral-50/50 p-5 space-y-4">
        <div>
          <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-3">
            Your Business Context
          </span>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block text-[11px]">Monthly Gross Revenue</span>
              <p className="text-base font-bold text-neutral-900 mt-0.5 tabular-nums">{formatCedis(ctx30.revenue)}</p>
              <span className="text-[10px] text-emerald-700 font-semibold">Last 30 days</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block text-[11px]">Net Operating Surplus</span>
              <p className="text-base font-bold text-emerald-700 mt-0.5 tabular-nums">{formatCedis(ctx30.net)}</p>
              <span className="text-[10px] text-neutral-500">Revenue minus expenses, last 30 days</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block text-[11px]">Outstanding Receivables</span>
              <p className="text-base font-bold text-neutral-900 mt-0.5 tabular-nums">{formatCedis(ctxUnpaid)}</p>
              <span className="text-[10px] text-rose-600 font-semibold">Unpaid invoices</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block text-[11px]">Passport Score</span>
              <p className="text-base font-bold text-neutral-900 mt-0.5 tabular-nums">{passport.score > 0 ? `${passport.score} / 100` : 'Not scored yet'}</p>
              <span className="text-[10px] text-emerald-700 font-semibold">Built from your records</span>
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
