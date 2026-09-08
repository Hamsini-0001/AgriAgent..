import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot,
  Send,
  Mic,
  Volume2,
  VolumeX,
  Sparkles,
  Terminal,
  HelpCircle,
  MessageSquarePlus,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgentEngine } from '../../services/ai/agentEngine';
import { ChatMessage, AgentActionLog } from '../../types';

const CHAT_STORAGE_KEY = 'agriagent_chat_history';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'agent',
  text: `Namaste Ravi Kumar ji! I am **AgriAgent**, your autonomous agricultural market intelligence assistant.\n\n` +
    `I am grounded in live APMC Mandi data and buyer demand curves for your **800 kg Vaishnavi Hybrid Tomatoes (Grade A)** in Shamshabad, Hyderabad:\n` +
    `• **Bowenpally Mandi Modal Rate:** ₹26/kg (+₹2 today)\n` +
    `• **3 Verified Buyers Matched:** FreshMart Foods (₹27/kg), Reliance Agri (₹29/kg), AgroFresh (₹25/kg)\n` +
    `• **Net Profit Optimization:** FreshMart Foods yields **₹20,530 net take-home** due to minimal 18 km transport freight.\n\n` +
    `Ask me anything about market prices, buyer negotiation, or logistics dispatch, or select one of the suggested inquiries below.`,
  timestamp: 'Just now',
  toolsUsed: ['get_market_prices', 'search_buyers', 'compare_offers'],
  recommendationData: {
    crop: 'Tomato',
    recommendedPrice: '₹27/kg',
    bestBuyer: 'FreshMart Foods Pvt Ltd',
    netRevenue: 20530,
    confidence: 94,
    actionType: 'compare'
  }
};

function loadChatHistory(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [WELCOME_MESSAGE];
}

export const AIAgentChat: React.FC = () => {
  const { selectedCropId, crops, setActiveTab } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>(loadChatHistory);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeLogs, setActiveLogs] = useState<AgentActionLog[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedCrop = crops.find(c => c.id === selectedCropId) || crops[0];
  const DEFAULT_MODEL = 'qwen/qwen3.8-27b';

  const suggestedQuestions = [
    'Who will pay the most for my crop?',
    'Should I sell today or wait?',
    'Compare all buyer offers with transport freight.',
    'What price should I negotiate for my tomatoes?',
    'Find transport for my order.',
    'Show mandi arrival volumes today.'
  ];

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // New Chat: clear history, restore welcome message
  const handleNewChat = useCallback(() => {
    const freshWelcome: ChatMessage = { ...WELCOME_MESSAGE, id: 'welcome_' + Date.now(), timestamp: 'Just now' };
    setMessages([freshWelcome]);
    setActiveLogs([]);
    setInputPrompt('');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsProcessing(true);

    try {
      const result = await AgentEngine.processPrompt(query, selectedCrop.id, DEFAULT_MODEL);
      setMessages(prev => [...prev, result.message]);
      setActiveLogs(result.actionLogs);
      setIsProcessing(false);

      if (voiceEnabled && !result.isLocked) {
        AgentEngine.speakText(result.message.text);
      }
    } catch (err: any) {
      setIsProcessing(false);
      setMessages(prev => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'agent',
          text: `⚠️ Execution failed: ${err.message || 'Error communicating with backend AI service.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const toggleVoiceListen = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const simulatedPrompts = [
      'Who will pay the most for my tomatoes after transport freight?',
      'Should I sell today or wait for tomorrow morning mandi auction?',
      'Please negotiate a higher price of ₹28 per kg with FreshMart Foods',
      'Compare all 3 offers and show net take-home earnings'
    ];
    const picked = simulatedPrompts[Math.floor(Math.random() * simulatedPrompts.length)];

    setTimeout(() => {
      setIsListening(false);
      setInputPrompt(picked);
      handleSend(picked);
    }, 2000);
  };


  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">AgriAgent Autonomous Advisor</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Multi-Step AI Reasoning
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Autonomous APMC mandi rate parsing, logistics freight netting, buyer matching, and supervised price bargaining.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto">

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 hover:border-red-300 transition-all shadow-sm disabled:opacity-50"
            title="Start a new conversation (clears history)"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span className="font-bold hidden sm:inline">New Chat</span>
          </button>

          {/* Voice Toggle */}
          <button
            onClick={() => {
              if (voiceEnabled) {
                AgentEngine.stopSpeaking();
              }
              setVoiceEnabled(!voiceEnabled);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              voiceEnabled
                ? 'bg-slate-100 text-slate-800 border-slate-300'
                : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{voiceEnabled ? 'Voice ON' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
          
          {/* Scrollable Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
            {messages.map(msg => {
              const isAgent = msg.sender === 'agent';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-2xl ${
                    isAgent ? 'mr-auto' : 'ml-auto flex-row-reverse'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    isAgent ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'
                  }`}>
                    {isAgent ? <Bot className="w-4 h-4" /> : <span className="text-xs font-bold">RK</span>}
                  </div>

                  <div className={`space-y-3 ${isAgent ? 'flex-1' : ''}`}>
                    {/* Message Bubble */}
                    <div className={`p-4 rounded-2xl shadow-sm text-xs leading-relaxed ${
                      isAgent
                        ? 'bg-white border border-slate-200 text-slate-800'
                        : 'bg-slate-900 text-white font-medium'
                    }`}>
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isAgent ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {isAgent ? 'AgriAgent' : 'Ravi Kumar (Farmer)'}
                        </span>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>

                      <div className="space-y-2 whitespace-pre-line text-sm">
                        {msg.text}
                      </div>

                      {/* Tool Tags */}
                      {msg.toolsUsed && msg.toolsUsed.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                          <Terminal className="w-3 h-3 text-emerald-600" />
                          <span>Function Calls:</span>
                          {msg.toolsUsed.map(t => (
                            <span key={t} className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-semibold">
                              {t}()
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actionable Recommendation Card */}
                    {msg.recommendationData && (
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Recommended Action Pathway
                          </span>
                          {msg.recommendationData.confidence && (
                            <span className="text-[11px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                              {msg.recommendationData.confidence}% Confidence
                            </span>
                          )}
                        </div>

                        {msg.recommendationData.bestBuyer && (
                          <div className="text-xs text-slate-700 space-y-1">
                            <div>Target Buyer: <strong>{msg.recommendationData.bestBuyer}</strong></div>
                            {msg.recommendationData.netRevenue && (
                              <div>Net Take-Home: <strong className="text-emerald-700 text-sm">₹{msg.recommendationData.netRevenue.toLocaleString('en-IN')}</strong></div>
                            )}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {msg.recommendationData.actionType === 'compare' && (
                            <button
                              onClick={() => setActiveTab('compare')}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1 transition-colors"
                            >
                              <Scale className="w-3.5 h-3.5" />
                              <span>Compare Offers & Freight</span>
                            </button>
                          )}
                          <button
                            onClick={() => setActiveTab('negotiation')}
                            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1 transition-colors"
                          >
                            <Bot className="w-3.5 h-3.5" />
                            <span>Start Autonomous Negotiation</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isProcessing && (
              <div className="flex gap-3 mr-auto items-center">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-sm flex items-center gap-2 text-xs text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Thinking... analyzing mandi rates & netting freight...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts Chips */}
          <div className="p-3 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <HelpCircle className="w-3 h-3" /> Prompts:
            </span>
            {suggestedQuestions.map(q => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 rounded-xl whitespace-nowrap font-medium transition-all shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar with Voice UI */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleVoiceListen}
                className={`p-3 rounded-2xl border transition-all ${
                  isListening
                    ? 'bg-red-500 text-white border-red-500 animate-pulse shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                }`}
                title={isListening ? 'Listening... Speak now' : 'Click to Speak'}
              >
                {isListening ? <Mic className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
                placeholder="Ask AgriAgent about crop prices, buyer matching, transport costs..."
                className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />

              <button
                type="submit"
                disabled={!inputPrompt.trim() || isProcessing}
                className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl shadow-md shadow-emerald-600/20 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            {isListening && (
              <p className="text-[11px] text-red-600 font-bold mt-1.5 flex items-center gap-1 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                Listening to voice input in Telugu / Hindi / Kannada / English...
              </p>
            )}
          </div>
        </div>

    </div>
  );
};
