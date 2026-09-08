import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Truck,
  ShieldCheck,
  Scale,
  Filter,
  Package
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgentTools } from '../../services/ai/tools';

export const OfferComparisonView: React.FC = () => {
  const { selectedCropId, setSelectedCropId, crops, startNegotiationForOffer, confirmAndCreateOrder, t } = useApp();
  const [activeListingId, setActiveListingId] = useState<string>(selectedCropId || 'crop_1');

  const selectedCrop = crops.find(c => c.id === activeListingId) || crops.find(c => c.id === selectedCropId) || crops[0];
  const comparison = AgentTools.compare_offers(selectedCrop.id);

  return (
    <div className="space-y-6">
      
      {/* Crop Selector Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Package className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Select Crop to Compare Buyers:</h4>
            <p className="text-[11px] text-slate-500">View competing buyer bids, transport deductions, and net take-home return</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {crops.map(c => {
            const isSelected = selectedCrop.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setActiveListingId(c.id);
                  setSelectedCropId(c.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                }`}
              >
                <span>{c.crop}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
                }`}>
                  {c.quantity} {c.unit}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" /> Total Economics Matrix
            </span>
            <span className="text-xs text-slate-400 font-medium">Net Take-Home vs Raw Headline Pricing</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Buyer Offer Comparison for {selectedCrop.quantity} {selectedCrop.unit} {selectedCrop.crop} ({selectedCrop.grade})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Farm: <strong>{selectedCrop.location}</strong> | Variety: <strong>{selectedCrop.variety}</strong> | Expected: <strong>₹{selectedCrop.expectedPrice}/kg</strong>
          </p>
        </div>
      </div>

      {/* AI Decision Engine Callout */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white p-6 rounded-3xl shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-emerald-300">
            AgriAgent Autonomous Decision Engine
          </h3>
        </div>
        <p className="text-sm font-medium leading-relaxed text-emerald-50">
          {comparison.aiVerdict}
        </p>
        <div className="pt-2 border-t border-emerald-700/60 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs text-emerald-200">
          <div>Price Weight: <strong>40%</strong></div>
          <div>Distance Weight: <strong>20%</strong></div>
          <div>Reliability: <strong>20%</strong></div>
          <div>Qty Match: <strong>10%</strong></div>
          <div>Payment Terms: <strong>10%</strong></div>
        </div>
      </div>

      {/* Comparative Economics Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm">Side-by-Side Factor Comparison</h3>
          <p className="text-xs text-slate-500">Transparent deduction analysis for {selectedCrop.quantity} {selectedCrop.unit} {selectedCrop.crop} produce</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-4 px-6">Economic Factor</th>
                {comparison.offers.map(item => (
                  <th
                    key={item.offer.id}
                    className={`py-4 px-6 text-center ${
                      item.isRecommended ? 'bg-emerald-50/90 text-emerald-950 font-extrabold border-x-2 border-emerald-400' : ''
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {item.isRecommended && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          ⭐ Top Pick
                        </span>
                      )}
                      <span className="text-sm">{item.offer.companyName}</span>
                      <span className="text-[11px] font-normal text-slate-400">Score: {item.score}/100</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              
              {/* Row 1: Price/kg */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-6 font-bold text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" /> Offered Price / kg
                </td>
                {comparison.offers.map(item => (
                  <td key={item.offer.id} className={`py-3.5 px-6 text-center font-extrabold text-sm ${
                    item.isRecommended ? 'bg-emerald-50/40 border-x-2 border-emerald-400 text-emerald-900' : ''
                  }`}>
                    ₹{item.offer.offeredPrice}/kg
                  </td>
                ))}
              </tr>

              {/* Row 2: Gross Amount */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-6 font-semibold text-slate-600">
                  Gross Value (800 kg)
                </td>
                {comparison.offers.map(item => (
                  <td key={item.offer.id} className={`py-3.5 px-6 text-center font-semibold ${
                    item.isRecommended ? 'bg-emerald-50/40 border-x-2 border-emerald-400' : ''
                  }`}>
                    ₹{item.netProfit.grossRevenue.toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>

              {/* Row 3: Distance */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-6 font-bold text-slate-900 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-slate-500" /> Distance from Farm
                </td>
                {comparison.offers.map(item => (
                  <td key={item.offer.id} className={`py-3.5 px-6 text-center font-semibold ${
                    item.isRecommended ? 'bg-emerald-50/40 border-x-2 border-emerald-400 text-emerald-800' : ''
                  }`}>
                    {item.offer.distanceKm} km
                  </td>
                ))}
              </tr>

              {/* Row 4: Transportation Cost */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-6 font-semibold text-red-600">
                  (-) Transportation Freight Cost
                </td>
                {comparison.offers.map(item => (
                  <td key={item.offer.id} className={`py-3.5 px-6 text-center font-bold text-red-600 ${
                    item.isRecommended ? 'bg-emerald-50/40 border-x-2 border-emerald-400' : ''
                  }`}>
                    -₹{item.offer.estimatedTransportCost.toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>

              {/* Row 5: Platform Fee */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-6 font-semibold text-slate-500">
                  (-) AgriAgent Platform Fee (1%)
                </td>
                {comparison.offers.map(item => (
                  <td key={item.offer.id} className={`py-3.5 px-6 text-center text-slate-500 ${
                    item.isRecommended ? 'bg-emerald-50/40 border-x-2 border-emerald-400' : ''
                  }`}>
                    -₹{item.netProfit.platformFee}
                  </td>
                ))}
              </tr>

              {/* Row 6: Buyer Trust & Reliability */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-6 font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Buyer Reliability Score
                </td>
                {comparison.offers.map(item => (
                  <td key={item.offer.id} className={`py-3.5 px-6 text-center font-bold ${
                    item.isRecommended ? 'bg-emerald-50/40 border-x-2 border-emerald-400 text-emerald-700' : 'text-slate-700'
                  }`}>
                    {item.offer.buyerReliability}%
                  </td>
                ))}
              </tr>

              {/* Row 7: Payment Terms */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-6 font-semibold text-slate-600">
                  Payment Payout Timeline
                </td>
                {comparison.offers.map(item => (
                  <td key={item.offer.id} className={`py-3.5 px-6 text-center text-[11px] font-medium ${
                    item.isRecommended ? 'bg-emerald-50/40 border-x-2 border-emerald-400' : ''
                  }`}>
                    {item.offer.paymentTerms}
                  </td>
                ))}
              </tr>

              {/* Row 8: NET REVENUE (HIGHLIGHTED) */}
              <tr className="bg-slate-50 font-bold border-t-2 border-slate-200">
                <td className="py-4 px-6 text-sm font-black text-slate-900 uppercase">
                  ⭐ NET TAKE-HOME PROFIT
                </td>
                {comparison.offers.map(item => (
                  <td key={item.offer.id} className={`py-4 px-6 text-center ${
                    item.isRecommended
                      ? 'bg-emerald-100/80 border-x-2 border-b-2 border-emerald-500 text-emerald-950 font-black text-base'
                      : 'text-slate-800 font-extrabold text-sm'
                  }`}>
                    ₹{item.netProfit.netRevenue.toLocaleString('en-IN')}
                    <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                      (Effective ₹{item.netProfit.effectiveRatePerKg}/kg)
                    </span>
                  </td>
                ))}
              </tr>

              {/* Action Buttons Row */}
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-500">Action</td>
                {comparison.offers.map(item => (
                  <td key={item.offer.id} className={`py-4 px-6 text-center ${
                    item.isRecommended ? 'bg-emerald-50/30 border-x-2 border-emerald-400' : ''
                  }`}>
                    <button
                      onClick={() => startNegotiationForOffer(item.offer.id)}
                      className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1 ${
                        item.isRecommended
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                          : 'bg-slate-800 hover:bg-slate-900 text-white'
                      }`}
                    >
                      <span>Negotiate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
