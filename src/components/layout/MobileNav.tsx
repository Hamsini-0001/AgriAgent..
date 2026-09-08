import React from 'react';
import { Bot, TrendingUp, Scale, Sprout } from 'lucide-react';
import { useApp, ActiveTab } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { tab: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { tab: 'agent', label: 'AI Agent', icon: Bot },
    { tab: 'market', label: 'Market', icon: TrendingUp },
    { tab: 'compare', label: 'Offers', icon: Scale },
    { tab: 'crops', label: 'Crops', icon: Sprout }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-700 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100/80 text-emerald-800' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
