import React from 'react';
import {
  Sprout,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Scale,
  Bot,
  Truck,
  DollarSign,
  Users,
  CheckCircle2,
  Building2,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface Props {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<Props> = ({ onEnterApp }) => {
  const { switchRole } = useApp();

  const handleLaunchRole = (role: UserRole) => {
    switchRole(role);
    onEnterApp();
  };

  const steps = [
    {
      num: '01',
      title: 'List Harvest Produce',
      desc: 'Specify crop, variety, quantity, quality grade, and your minimum acceptable floor price.'
    },
    {
      num: '02',
      title: 'Autonomous Buyer Matching',
      desc: 'AgriAgent connects your batch with verified institutional buyers, supermarkets, and processors.'
    },
    {
      num: '03',
      title: 'Compare Net Revenue',
      desc: 'Multi-factor algorithm factors distance freight, platform fees, and buyer trust to calculate true net revenue.'
    },
    {
      num: '04',
      title: 'AI Price Negotiation',
      desc: 'Autonomous agent initiates live price counter-offers while strictly requiring your manual approval before committing.'
    },
    {
      num: '05',
      title: 'Logistics & Instant Payout',
      desc: 'Commercial freight dispatched to your farm gate. Escrow payment settled instantly to your bank account.'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Direct Price Discovery',
      desc: 'Live Mandi modal price tracking across 20+ APMC yards ensures you never sell below market value.'
    },
    {
      icon: Users,
      title: 'Direct Buyer Access',
      desc: 'Connect straight to verified supermarket chains, food processors, and wholesale terminals without middlemen.'
    },
    {
      icon: Scale,
      title: 'Net-Revenue Logic',
      desc: 'Never get misled by high sticker prices far away. We calculate vehicle freight costs to maximize take-home pay.'
    },
    {
      icon: Bot,
      title: 'Autonomous Negotiation',
      desc: 'The AI bargains on your behalf based on market momentum, arrival volumes, and quality grades.'
    },
    {
      icon: Truck,
      title: 'Integrated Logistics',
      desc: 'Book verified commercial mini-trucks and pickups with transparent per-kilometer freight rates.'
    },
    {
      icon: DollarSign,
      title: 'Guaranteed Escrow',
      desc: 'Funds are locked before harvest dispatch and released directly into the farmer bank account upon delivery.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      
      {/* Top Navbar */}
      <nav className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">AgriAgent</span>
            <span className="text-[10px] ml-1.5 uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Production AI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLaunchRole('buyer')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Buyer Portal
          </button>
          <button
            onClick={() => handleLaunchRole('admin')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-bold text-slate-700 hover:text-purple-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Admin Console
          </button>
          <button
            onClick={() => handleLaunchRole('farmer')}
            className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
          >
            <span>Farmer Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold border border-emerald-300/60 shadow-sm animate-in fade-in duration-300">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Autonomous AI for Crop Selling, Buyer Matching & Market Negotiation</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-4xl leading-[1.1]">
          Sell Smarter. <br />
          <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Earn Better.
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
          An AI-powered agricultural marketplace that empowers farmers to sell directly to verified institutional buyers, compare offers after transport deductions, and negotiate higher prices without intermediaries.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
          <button
            onClick={() => handleLaunchRole('farmer')}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Open Farmer Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleLaunchRole('buyer')}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-sm rounded-2xl border border-slate-200 shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Buyer Procurement Hub</span>
          </button>
        </div>

        {/* Scenario Teaser Banner */}
        <div className="w-full max-w-4xl mt-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Autonomous AI Market Agent</h4>
                <p className="text-[11px] text-slate-400">Ravi Kumar (Hyderabad) • 800 kg Tomato (Grade A)</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              Autonomous Deal Matching
            </span>
          </div>

          <div className="py-4 space-y-3 text-xs leading-relaxed">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-start gap-3">
              <span className="font-bold text-slate-900 shrink-0">Farmer:</span>
              <p className="text-slate-700">"I have 800 kg of tomatoes ready to sell in Hyderabad. Who will pay the most?"</p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 flex items-start gap-3 text-emerald-950">
              <span className="font-extrabold text-emerald-800 shrink-0">AgriAgent:</span>
              <div className="space-y-2">
                <p>
                  "I evaluated 3 buyers against Bowenpally Mandi rates (₹26/kg) and logistics freight:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1 font-mono text-[11px]">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-300 font-bold text-emerald-900">
                    🏆 FreshMart: ₹27/kg • 18km (Transport: ₹800) → Net: ₹20,530
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200 text-slate-600">
                    Reliance: ₹29/kg • 70km (Transport: ₹2900) → Net: ₹19,890
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200 text-slate-600">
                    AgroFresh: ₹25/kg • 12km (Transport: ₹500) → Net: ₹19,300
                  </div>
                </div>
                <p className="font-semibold text-emerald-900">
                  Although Reliance has a higher sticker price, FreshMart yields the highest take-home net return. Would you like me to negotiate with FreshMart?"
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => handleLaunchRole('farmer')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Open Live Marketplace Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Autonomous Lifecycle
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">How AgriAgent Works</h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            From produce listing to price negotiation and instant UPI bank payout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map(step => (
            <div
              key={step.num}
              className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2 relative group hover:border-emerald-400 transition-colors"
            >
              <span className="text-2xl font-black text-emerald-200 group-hover:text-emerald-500 transition-colors block">
                {step.num}
              </span>
              <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why AgriAgent Grid */}
      <section className="bg-emerald-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/40">
              Core Differentiator
            </span>
            <h2 className="text-3xl font-extrabold text-white">Why Farmers Choose AgriAgent</h2>
            <p className="text-xs text-emerald-200 max-w-xl mx-auto">
              Eliminating the unfair 20-30% middleman cut with verified institutional transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(b => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="bg-emerald-900/40 border border-emerald-800/60 p-6 rounded-3xl space-y-3 hover:bg-emerald-900/60 transition-colors"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-white">{b.title}</h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-800">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <span>AgriAgent — Autonomous AI Agricultural Market System</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Supports English, Telugu (తెలుగు), Hindi (हिंदी), and Kannada (ಕನ್ನಡ).
        </p>
      </footer>

    </div>
  );
};
