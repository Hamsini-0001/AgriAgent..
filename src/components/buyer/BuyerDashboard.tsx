import React, { useState } from 'react';
import {
  Building2,
  Package,
  ShoppingCart,
  TrendingUp,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Send,
  Truck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BuyerDashboard: React.FC = () => {
  const { crops, orders, offers, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'listings' | 'requirements' | 'orders'>('listings');
  const [offerModalCrop, setOfferModalCrop] = useState<any | null>(null);
  const [offeredPrice, setOfferedPrice] = useState<number>(27);

  const filteredCrops = crops.filter(c =>
    c.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.variety.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const buyerOrders = orders.filter(o => o.buyerName.includes('FreshMart') || o.buyerId === 'buyer_1');

  const handleMakeOffer = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Submitted purchase offer of ₹${offeredPrice}/kg for ${offerModalCrop.quantity} kg ${offerModalCrop.crop}!`);
    setOfferModalCrop(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Buyer Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full border border-blue-400/20 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Institutional Buyer Portal
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> 96% Trust Verified
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">
            FreshMart Foods Pvt Ltd
          </h1>
          <p className="text-xs text-blue-100 max-w-xl">
            Central Distribution Hub: <strong>Kukatpally, Hyderabad</strong> • Contact: <strong>Vikram Mehta (Procurement Head)</strong>
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-200 block">Total Procured</span>
            <span className="text-xl font-extrabold">450,000 kg</span>
          </div>
          <div className="pl-4 border-l border-white/20">
            <span className="text-[10px] uppercase font-bold text-blue-200 block">Payment Track</span>
            <span className="text-xl font-extrabold text-emerald-400">98% on-time</span>
          </div>
        </div>
      </div>

      {/* Buyer Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Active Listings</span>
          <span className="text-2xl font-black text-slate-900">{crops.length} Batches</span>
          <span className="text-[11px] text-emerald-600 font-medium">Direct from farmers</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Avg Buy Price</span>
          <span className="text-2xl font-black text-blue-600">₹26.2 /kg</span>
          <span className="text-[11px] text-slate-400">Vegetables Index</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Active Demands</span>
          <span className="text-2xl font-black text-slate-900">4 Crops</span>
          <span className="text-[11px] text-slate-500">Tomato, Onion, Potato, Chilli</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Completed Orders</span>
          <span className="text-2xl font-black text-emerald-600">{buyerOrders.length + 18}</span>
          <span className="text-[11px] text-slate-400">Zero cancellation record</span>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { key: 'listings', label: 'Browse Farm Produce' },
          { key: 'orders', label: 'Procurement Orders' }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === t.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Listings Tab */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Filter crops by name, variety, or farmer..."
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCrops.map(crop => (
              <div
                key={crop.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 bg-slate-100">
                    <img
                      src={crop.images[0]}
                      alt={crop.crop}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-600/90 text-white backdrop-blur-md">
                        {crop.grade}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-extrabold text-base">{crop.crop} ({crop.variety})</h3>
                      <span className="text-xs text-blue-200">{crop.quantity} {crop.unit} available</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Farmer:</span>
                      <span className="font-bold text-slate-800">{crop.farmerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Farm Location:</span>
                      <span className="font-semibold text-slate-700">{crop.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Floor Minimum:</span>
                      <span className="font-bold text-slate-800">₹{crop.minPrice}/kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Farmer Asking:</span>
                      <span className="font-extrabold text-blue-700">₹{crop.expectedPrice}/kg</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      setOfferModalCrop(crop);
                      setOfferedPrice(crop.expectedPrice);
                    }}
                    className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Buyer Offer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Procurement Contract Fulfillment</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {orders.map(o => (
                <div key={o.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">#{o.id}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold uppercase text-[10px]">
                        {o.stage.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      {o.quantityKg} kg {o.crop} from <strong>{o.farmerName}</strong> at <strong>₹{o.pricePerKg}/kg</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Contract</span>
                      <span className="text-sm font-extrabold text-slate-900">₹{o.grossAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Escrow Locked
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Make Offer Modal */}
      {offerModalCrop && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">
                Make Offer for {offerModalCrop.crop}
              </h3>
              <button onClick={() => setOfferModalCrop(null)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Farmer <strong>{offerModalCrop.farmerName}</strong> has listed {offerModalCrop.quantity} kg of {offerModalCrop.grade} produce.
            </p>

            <form onSubmit={handleMakeOffer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Offered Price (₹/kg)
                </label>
                <input
                  type="number"
                  value={offeredPrice}
                  onChange={e => setOfferedPrice(Number(e.target.value))}
                  step="0.5"
                  required
                  className="w-full text-base font-bold px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Total Gross Commitment:</span>
                  <span className="font-bold">₹{(offerModalCrop.quantity * offeredPrice).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Location:</span>
                  <span>{offerModalCrop.location}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
              >
                Send Offer to Farmer's AI Agent
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
