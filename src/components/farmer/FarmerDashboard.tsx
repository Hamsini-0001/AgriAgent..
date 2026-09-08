import React from 'react';
import {
  Bot,
  TrendingUp,
  Scale,
  Sprout
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MyCropsView } from './MyCropsView';
import { MarketPricesView } from './MarketPricesView';
import { OfferComparisonView } from './OfferComparisonView';
import { AIAgentChat } from './AIAgentChat';

export const FarmerDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    t
  } = useApp();

  const primaryTabs = [
    {
      tab: 'agent',
      label: '🌾 AI Market Agent',
      desc: 'Live Groq reasoning & bargaining',
      icon: Bot
    },
    {
      tab: 'market',
      label: '📈 ' + t.todaysMarket,
      desc: 'APMC modal prices & trends',
      icon: TrendingUp
    },
    {
      tab: 'compare',
      label: '🤝 ' + t.compareBuyers,
      desc: 'Transport deductions & net profit',
      icon: Scale
    },
    {
      tab: 'crops',
      label: '🌱 ' + t.myCrops,
      desc: 'Produce inventory & batches',
      icon: Sprout
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Simplified Navigation Bar with 4 Core Features */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-2">
        {primaryTabs.map(item => {
          const isActive = activeTab === item.tab;
          const Icon = item.icon;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab as any)}
              className={`p-3 rounded-xl transition-all text-left flex items-center gap-3 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isActive ? 'bg-white/20 text-white' : 'bg-white text-emerald-700 shadow-sm'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold block truncate">{item.label}</span>
                <span className={`text-[10px] block truncate mt-0.5 ${
                  isActive ? 'text-emerald-100' : 'text-slate-400'
                }`}>
                  {item.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Selected View */}
      {activeTab === 'agent' && <AIAgentChat />}
      {activeTab === 'market' && <MarketPricesView />}
      {activeTab === 'compare' && <OfferComparisonView />}
      {activeTab === 'crops' && <MyCropsView />}

      {/* Fallback for any other tab state */}
      {!['agent', 'market', 'compare', 'crops'].includes(activeTab) && <AIAgentChat />}

    </div>
  );
};
