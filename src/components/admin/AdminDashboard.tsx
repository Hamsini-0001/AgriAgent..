import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Package,
  CheckCircle2,
  AlertTriangle,
  Activity,
  FileText,
  Search,
  Lock,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StorageService } from '../../services/storage';

export const AdminDashboard: React.FC = () => {
  const { crops, orders, marketPrices, negotiations, showToast } = useApp();
  const farmers = StorageService.getFarmers();
  const buyers = StorageService.getBuyers();
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'trust' | 'transactions' | 'negotiations'>('overview');

  const totalTradeValue = 5842000;

  const handleResolveFlag = (buyerName: string) => {
    showToast(`Audit complete: Risk warning updated for ${buyerName}.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full border border-purple-400/20 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Platform Governance & Administration
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> Live Marketplace Telemetry
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">AgriAgent System Operations</h1>
          <p className="text-xs text-purple-200 max-w-xl">
            Audit buyer reliability, supervise autonomous AI negotiations, inspect high-cancellation alerts, and analyze trade volumes.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          <div>
            <span className="text-[10px] uppercase font-bold text-purple-200 block">Total GMV Settled</span>
            <span className="text-2xl font-black">₹{totalTradeValue.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Platform KPI Stats Cards (Section 21) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Farmers</span>
          <span className="text-xl font-black text-slate-900">{farmers.length} Registered</span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">100% KYC Verified</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Buyers</span>
          <span className="text-xl font-black text-slate-900">{buyers.length} Institutional</span>
          <span className="text-[11px] text-blue-600 font-semibold mt-0.5 block">Retail & Wholesale</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Active Listings</span>
          <span className="text-xl font-black text-slate-900">{crops.length} Produce</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ready for matching</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Completed Deals</span>
          <span className="text-xl font-black text-emerald-600">312</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">99.4% Settlement</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Active Orders</span>
          <span className="text-xl font-black text-amber-600">{orders.length}</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">In transit pipeline</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-purple-700 block tracking-wider">AI Negotiations</span>
          <span className="text-xl font-black text-purple-700">{negotiations.length}</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Supervised active</span>
        </div>

      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { key: 'overview', label: 'Platform Overview' },
          { key: 'trust', label: '⚠️ Trust & Safety Auditor' },
          { key: 'negotiations', label: 'AI Negotiation Logs' },
          { key: 'transactions', label: 'Contract Audits' }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveAdminTab(t.key as any)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeAdminTab === t.key
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Trust & Safety Auditor Tab (Section 16) */}
      {activeAdminTab === 'trust' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">Autonomous Risk Management Engine:</span> AgriAgent continuously audits cancellation rates, payment delays, and dispute frequencies. Accounts breaching safety thresholds are flagged and deprioritized by the AI matching algorithm to protect farmers.
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Buyer Trust & Verification Registry</h3>
                <p className="text-xs text-slate-500">10 Institutional Buyers Evaluated</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                    <th className="py-3 px-5">Buyer Entity</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 text-center">Trust Score</th>
                    <th className="py-3 px-4 text-center">Cancellation Rate</th>
                    <th className="py-3 px-4 text-center">Payment Reliability</th>
                    <th className="py-3 px-5 text-center">Safety Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {buyers.map(b => {
                    const isFlagged = b.cancellationRate > 5.0 || b.trustScore < 80;
                    return (
                      <tr key={b.userId} className={isFlagged ? 'bg-red-50/40' : 'hover:bg-slate-50'}>
                        <td className="py-4 px-5">
                          <strong className="text-slate-900 block">{b.companyName}</strong>
                          <span className="text-[11px] text-slate-400">{b.location}</span>
                        </td>
                        <td className="py-4 px-4 font-medium">{b.buyerType}</td>
                        <td className="py-4 px-4 text-center font-extrabold text-slate-900">
                          {b.trustScore} / 100
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`font-bold ${isFlagged ? 'text-red-600' : 'text-slate-700'}`}>
                            {b.cancellationRate}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center font-semibold text-emerald-700">
                          {b.paymentReliability}%
                        </td>
                        <td className="py-4 px-5 text-center">
                          {isFlagged ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                              <AlertTriangle className="w-3 h-3" /> Flagged: High Cancellations
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                              <CheckCircle2 className="w-3 h-3" /> Verified Safe
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Negotiations Tab */}
      {activeAdminTab === 'negotiations' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Supervised AI Negotiation Sessions</h3>
            <p className="text-xs text-slate-500">Real-time transcripts of agent automated price dialogues</p>
          </div>
          <div className="p-5 space-y-4">
            {negotiations.map(n => (
              <div key={n.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Session #{n.id} • {n.crop} ({n.quantityKg} kg)</span>
                  <span className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full font-bold uppercase text-[10px]">
                    {n.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-slate-600 space-y-1">
                  <div>Floor Minimum: <strong>₹{n.farmerMinPrice}/kg</strong> | Agent Anchor: <strong>₹{n.agentTargetPrice}/kg</strong></div>
                  <div>Current Agreed Level: <strong className="text-emerald-700">₹{n.currentPrice}/kg</strong></div>
                  <div>Total Turns: <strong>{n.messages.length} messages exchanged</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overview Tab */}
      {activeAdminTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Registered Farmers */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Verified Farmer Members
              </h3>
              <span className="text-xs text-slate-400 font-semibold">{farmers.length} farmers</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {farmers.map(f => (
                <div key={f.userId} className="py-3 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900">{f.name}</strong>
                    <span className="text-slate-400 block text-[11px]">{f.mandiLocation}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-emerald-700">₹{f.totalEarnings.toLocaleString('en-IN')}</span>
                    <span className="text-slate-400 text-[10px] block">{f.completedOrdersCount} orders</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Buyers */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Institutional Buyer Network
              </h3>
              <span className="text-xs text-slate-400 font-semibold">{buyers.length} buyers</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {buyers.map(b => (
                <div key={b.userId} className="py-3 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900">{b.companyName}</strong>
                    <span className="text-slate-400 block text-[11px]">{b.location}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-800">{b.trustScore}% Trust</span>
                    <span className="text-emerald-600 text-[10px] font-semibold block">{b.buyerType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Transactions Tab */}
      {activeAdminTab === 'transactions' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Contract Lifecycle Audit Trail</h3>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {orders.map(o => (
              <div key={o.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">#{o.id} • {o.crop}</div>
                  <span className="text-slate-500 text-[11px]">Farmer: {o.farmerName} → Buyer: {o.buyerName}</span>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-slate-900">₹{o.grossAmount.toLocaleString('en-IN')}</div>
                  <span className="text-emerald-700 font-semibold text-[10px] uppercase">{o.stage.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
