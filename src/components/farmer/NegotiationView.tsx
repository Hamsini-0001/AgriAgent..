import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ShieldCheck,
  Send,
  AlertTriangle,
  ArrowRight,
  UserCheck,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgentTools } from '../../services/ai/tools';
import { StorageService } from '../../services/storage';

export const NegotiationView: React.FC = () => {
  const { selectedOfferId, offers, negotiations, confirmAndCreateOrder, t, showToast } = useApp();
  const [customCounter, setCustomCounter] = useState<number>(27);
  const [farmerConsentGiven, setFarmerConsentGiven] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const offer = offers.find(o => o.id === selectedOfferId) || offers[0];
  const activeNeg = negotiations.find(n => n.offerId === offer.id) || negotiations[0];

  const handleContinueNegotiate = (targetPrice: number) => {
    AgentTools.negotiate_with_buyer(
      activeNeg.id,
      targetPrice,
      `High quality Vaishnavi Hybrid Grade A batch with verified harvest date.`
    );
    showToast(`Counter-proposal sent: ₹${targetPrice}/kg`);
  };

  const handleFarmerAcceptClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleFinalConfirmOrder = () => {
    if (!farmerConsentGiven) {
      showToast('Please check the confirmation box to authorize order creation.');
      return;
    }
    setIsConfirmModalOpen(false);
    confirmAndCreateOrder(offer.id);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Bot className="w-3.5 h-3.5" /> AI Autonomous Negotiation
            </span>
            <span className="text-xs text-slate-400 font-medium">Farmer-in-the-loop Protocol</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Price Negotiation with {offer.companyName}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Crop: <strong>800 kg Tomato (Grade A)</strong> | Location: <strong>Shamshabad, Hyderabad</strong>
          </p>
        </div>

        {/* Security Rule Badge */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-semibold">Safety Guarantee: AI requires your manual consent before binding any deal.</span>
        </div>
      </div>

      {/* Target & Floor Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Buyer Offer</span>
          <span className="text-lg font-black text-slate-900">₹{activeNeg.initialBuyerOffer}/kg</span>
          <span className="text-[11px] text-slate-400 block">Initial Bid</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-600 block tracking-wider">AI Target Anchor</span>
          <span className="text-lg font-black text-emerald-700">₹{activeNeg.agentTargetPrice}/kg</span>
          <span className="text-[11px] text-emerald-600 font-medium">Recommended asking</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Farmer Floor</span>
          <span className="text-lg font-black text-slate-800">₹{activeNeg.farmerMinPrice}/kg</span>
          <span className="text-[11px] text-slate-400">Strict Minimum</span>
        </div>

        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-800 block tracking-wider">Negotiation Zone</span>
          <span className="text-lg font-black text-emerald-900">₹24 – ₹27 /kg</span>
          <span className="text-[11px] text-emerald-700 font-bold">Active Agreement Range</span>
        </div>
      </div>

      {/* Live Negotiation Turn-by-turn Transcript */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Transcript Header */}
        <div className="p-4 px-6 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Autonomous Discussion Transcript</h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">Live Status: <strong className="text-emerald-700 capitalize">{activeNeg.status.replace('_', ' ')}</strong></span>
        </div>

        {/* Messages Stream */}
        <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto bg-slate-50/30">
          {activeNeg.messages.map((msg, index) => {
            const isBuyer = msg.sender === 'buyer';
            const isAgent = msg.sender === 'agent';
            const isFarmer = msg.sender === 'farmer';

            return (
              <div
                key={msg.id || index}
                className={`flex gap-3 max-w-2xl ${
                  isBuyer ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                {/* Avatar icon */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  isBuyer
                    ? 'bg-blue-600 text-white'
                    : isAgent
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 text-white'
                }`}>
                  {isBuyer ? <UserCheck className="w-4 h-4" /> : isAgent ? <Bot className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-2xl shadow-sm space-y-1 text-xs leading-relaxed ${
                  isBuyer
                    ? 'bg-white border border-slate-200 text-slate-800'
                    : isAgent
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium'
                    : 'bg-amber-50 border border-amber-200 text-amber-950'
                }`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-[11px] uppercase tracking-wider opacity-75">
                      {isBuyer ? offer.companyName : isAgent ? 'AgriAgent Market AI' : 'Farmer (Ravi Kumar)'}
                    </span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm font-normal">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Farmer Decision Action Console */}
        <div className="p-6 border-t border-slate-200 bg-white space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
            <div>
              <span className="text-[11px] uppercase font-bold text-emerald-800 tracking-wider">Latest Buyer Offer on the Table</span>
              <div className="text-xl font-black text-emerald-950 mt-0.5">
                ₹{activeNeg.currentPrice}/kg <span className="text-xs font-normal text-slate-500">(800 kg = ₹{(800 * activeNeg.currentPrice).toLocaleString('en-IN')})</span>
              </div>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">
                Estimated Net Take-Home: <strong>₹20,188</strong> after ₹800 transport freight.
              </p>
            </div>

            {/* Decision Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleFarmerAcceptClick}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Accept Offer (₹{activeNeg.currentPrice}/kg)</span>
              </button>

              <button
                onClick={() => handleContinueNegotiate(customCounter)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Counter at ₹{customCounter}/kg</span>
              </button>
            </div>
          </div>

          {/* Quick Counter Adjuster */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold">Quick Counter Adjust:</span>
            {[26.5, 27.0, 27.5, 28.0].map(price => (
              <button
                key={price}
                onClick={() => setCustomCounter(price)}
                className={`px-3 py-1 rounded-lg border text-xs font-bold transition-all ${
                  customCounter === price
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                }`}
              >
                ₹{price.toFixed(1)}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Explicit Farmer Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
            
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Confirm Binding Sale</h3>
              <p className="text-xs text-slate-500">
                You are authorizing AgriAgent to lock the transaction and book transport logistics.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Buyer:</span>
                <span className="font-bold text-slate-800">{offer.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Agreed Price:</span>
                <span className="font-bold text-slate-800">₹{activeNeg.currentPrice}/kg (800 kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Value:</span>
                <span className="font-semibold text-slate-800">₹{(800 * activeNeg.currentPrice).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Transport Freight (Tata Ace):</span>
                <span className="font-semibold">-₹800</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-extrabold text-emerald-700 text-sm">
                <span>Net Credited to Farmer:</span>
                <span>₹20,188</span>
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={farmerConsentGiven}
                onChange={e => setFarmerConsentGiven(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span>
                I explicitly approve this sale. I understand AgriAgent will create Order <strong>#ORD-NEW</strong> and dispatch a Mini Truck for farm pickup.
              </span>
            </label>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalConfirmOrder}
                disabled={!farmerConsentGiven}
                className="py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1"
              >
                <span>Confirm & Lock Deal</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
