import React from 'react';
import {
  Users,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Truck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgentTools } from '../../services/ai/tools';

export const BuyerMatchingView: React.FC = () => {
  const { selectedCropId, crops, offers, startNegotiationForOffer, setActiveTab, setSelectedOfferId } = useApp();

  const selectedCrop = crops.find(c => c.id === selectedCropId) || crops[0];
  const matchingOffers = offers.filter(o => o.listingId === selectedCrop.id);

  // Run the comparison tool to get exact calculated metrics
  const comparison = AgentTools.compare_offers(selectedCrop.id);

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
              AI Buyer Matchmaking
            </span>
            <span className="text-xs text-slate-400 font-medium">Auto-scored by distance, price & reliability</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Matching Buyers for {selectedCrop.quantity} {selectedCrop.unit} {selectedCrop.crop} ({selectedCrop.grade})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Farm Location: <strong>{selectedCrop.location}</strong> | Floor Price: <strong>₹{selectedCrop.minPrice}/kg</strong>
          </p>
        </div>

        <button
          onClick={() => setActiveTab('compare')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Full Economic Comparison</span>
        </button>
      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-100">AI Top Selection</h4>
            <p className="text-sm font-semibold text-white mt-0.5">
              {comparison.aiVerdict}
            </p>
          </div>
        </div>
      </div>

      {/* Buyer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comparison.offers.map(item => {
          const { offer, netProfit, score, isRecommended } = item;
          return (
            <div
              key={offer.id}
              className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md ${
                isRecommended
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {isRecommended && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full mb-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Best Overall Match
                      </span>
                    )}
                    <h3 className="font-extrabold text-slate-900 text-base">{offer.companyName}</h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> {offer.buyerName}
                    </p>
                  </div>

                  {/* AI Match Score Pill */}
                  <div className="text-center bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-2xl shrink-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Match</span>
                    <span className={`text-base font-black ${score >= 90 ? 'text-emerald-600' : 'text-slate-700'}`}>
                      {score}%
                    </span>
                  </div>
                </div>

                {/* Offer Price & Net Revenue Banner */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500 font-medium">Offered Price:</span>
                    <span className="text-xl font-extrabold text-slate-900">₹{offer.offeredPrice}/kg</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/60 text-xs">
                    <span className="text-emerald-700 font-bold">Estimated Net Take-Home:</span>
                    <span className="text-sm font-extrabold text-emerald-700">₹{netProfit.netRevenue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Truck className="w-3.5 h-3.5 text-slate-400" /> Distance & Transport:
                  </span>
                  <span className="font-semibold text-slate-800">
                    {offer.distanceKm} km (₹{offer.estimatedTransportCost})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Buyer Reliability:
                  </span>
                  <span className="font-bold text-emerald-700">
                    {offer.buyerReliability}% Trust Score
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Payment Terms:
                  </span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[150px]">
                    {offer.paymentTerms}
                  </span>
                </div>

                {/* AI Rationale */}
                <div className="pt-2 text-[11px] text-slate-500 italic bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
                  "{item.recommendationReason}"
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedOfferId(offer.id);
                    setActiveTab('compare');
                  }}
                  className="py-2.5 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
                >
                  Compare All
                </button>
                <button
                  onClick={() => startNegotiationForOffer(offer.id)}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1 ${
                    isRecommended
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Negotiate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
