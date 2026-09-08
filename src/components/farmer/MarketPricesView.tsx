import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Sparkles,
  MapPin,
  Calendar,
  AlertTriangle,
  Info,
  Filter,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StorageService } from '../../services/storage';

export const MarketPricesView: React.FC = () => {
  const { marketPrices, t } = useApp();
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [selectedState, setSelectedState] = useState<string>('All');

  // Filter mandis
  const filteredPrices = marketPrices.filter(p => {
    const matchCrop = selectedCrop === 'All' || p.crop.toLowerCase() === selectedCrop.toLowerCase();
    const matchState = selectedState === 'All' || p.state === selectedState;
    return matchCrop && matchState;
  });

  const crops = ['All', 'Tomato', 'Onion', 'Potato', 'Chilli', 'Rice (Basmati)', 'Cotton', 'Turmeric', 'Maize', 'Soybean', 'Wheat'];
  const states = ['All', 'Telangana', 'Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Punjab'];

  const CROP_HISTORICAL_DATA: Record<string, Array<{ date: string; price: number; volume: number; market: string }>> = {
    'Tomato': [
      { date: 'Sep 2', price: 21, volume: 110, market: 'Bowenpally Mandi' },
      { date: 'Sep 3', price: 22, volume: 115, market: 'Bowenpally Mandi' },
      { date: 'Sep 4', price: 22, volume: 108, market: 'Bowenpally Mandi' },
      { date: 'Sep 5', price: 23, volume: 120, market: 'Bowenpally Mandi' },
      { date: 'Sep 6', price: 24, volume: 125, market: 'Bowenpally Mandi' },
      { date: 'Sep 7', price: 25, volume: 130, market: 'Bowenpally Mandi' },
      { date: 'Sep 8', price: 26, volume: 140, market: 'Bowenpally Mandi' }
    ],
    'Chilli': [
      { date: 'Sep 2', price: 175, volume: 50, market: 'Guntur Mirchi Yard' },
      { date: 'Sep 3', price: 178, volume: 55, market: 'Guntur Mirchi Yard' },
      { date: 'Sep 4', price: 180, volume: 52, market: 'Guntur Mirchi Yard' },
      { date: 'Sep 5', price: 182, volume: 58, market: 'Guntur Mirchi Yard' },
      { date: 'Sep 6', price: 185, volume: 60, market: 'Guntur Mirchi Yard' },
      { date: 'Sep 7', price: 188, volume: 62, market: 'Guntur Mirchi Yard' },
      { date: 'Sep 8', price: 192, volume: 65, market: 'Guntur Mirchi Yard' }
    ],
    'Onion': [
      { date: 'Sep 2', price: 27, volume: 200, market: 'Malakpet Mandi' },
      { date: 'Sep 3', price: 26, volume: 210, market: 'Malakpet Mandi' },
      { date: 'Sep 4', price: 26, volume: 205, market: 'Malakpet Mandi' },
      { date: 'Sep 5', price: 25, volume: 215, market: 'Malakpet Mandi' },
      { date: 'Sep 6', price: 25, volume: 220, market: 'Malakpet Mandi' },
      { date: 'Sep 7', price: 24, volume: 225, market: 'Malakpet Mandi' },
      { date: 'Sep 8', price: 24, volume: 220, market: 'Malakpet Mandi' }
    ],
    'Potato': [
      { date: 'Sep 2', price: 18, volume: 160, market: 'Gaddi Annaram Mandi' },
      { date: 'Sep 3', price: 18, volume: 165, market: 'Gaddi Annaram Mandi' },
      { date: 'Sep 4', price: 19, volume: 170, market: 'Gaddi Annaram Mandi' },
      { date: 'Sep 5', price: 19, volume: 175, market: 'Gaddi Annaram Mandi' },
      { date: 'Sep 6', price: 20, volume: 180, market: 'Gaddi Annaram Mandi' },
      { date: 'Sep 7', price: 20, volume: 185, market: 'Gaddi Annaram Mandi' },
      { date: 'Sep 8', price: 21, volume: 180, market: 'Gaddi Annaram Mandi' }
    ],
    'Cotton': [
      { date: 'Sep 2', price: 68, volume: 80, market: 'Warangal Enumamula Mandi' },
      { date: 'Sep 3', price: 69, volume: 82, market: 'Warangal Enumamula Mandi' },
      { date: 'Sep 4', price: 70, volume: 85, market: 'Warangal Enumamula Mandi' },
      { date: 'Sep 5', price: 71, volume: 88, market: 'Warangal Enumamula Mandi' },
      { date: 'Sep 6', price: 71, volume: 90, market: 'Warangal Enumamula Mandi' },
      { date: 'Sep 7', price: 72, volume: 92, market: 'Warangal Enumamula Mandi' },
      { date: 'Sep 8', price: 73, volume: 95, market: 'Warangal Enumamula Mandi' }
    ],
    'Rice (Basmati)': [
      { date: 'Sep 2', price: 42, volume: 130, market: 'Khanna Grain Mandi' },
      { date: 'Sep 3', price: 43, volume: 135, market: 'Khanna Grain Mandi' },
      { date: 'Sep 4', price: 44, volume: 140, market: 'Khanna Grain Mandi' },
      { date: 'Sep 5', price: 44, volume: 142, market: 'Khanna Grain Mandi' },
      { date: 'Sep 6', price: 45, volume: 145, market: 'Khanna Grain Mandi' },
      { date: 'Sep 7', price: 46, volume: 150, market: 'Khanna Grain Mandi' },
      { date: 'Sep 8', price: 47, volume: 155, market: 'Khanna Grain Mandi' }
    ],
    'Turmeric': [
      { date: 'Sep 2', price: 130, volume: 40, market: 'Nizamabad APMC' },
      { date: 'Sep 3', price: 132, volume: 42, market: 'Nizamabad APMC' },
      { date: 'Sep 4', price: 135, volume: 45, market: 'Nizamabad APMC' },
      { date: 'Sep 5', price: 138, volume: 48, market: 'Nizamabad APMC' },
      { date: 'Sep 6', price: 140, volume: 50, market: 'Nizamabad APMC' },
      { date: 'Sep 7', price: 142, volume: 52, market: 'Nizamabad APMC' },
      { date: 'Sep 8', price: 145, volume: 55, market: 'Nizamabad APMC' }
    ],
    'Maize': [
      { date: 'Sep 2', price: 20, volume: 120, market: 'Khammam Mandi' },
      { date: 'Sep 3', price: 21, volume: 125, market: 'Khammam Mandi' },
      { date: 'Sep 4', price: 21, volume: 130, market: 'Khammam Mandi' },
      { date: 'Sep 5', price: 22, volume: 132, market: 'Khammam Mandi' },
      { date: 'Sep 6', price: 22, volume: 135, market: 'Khammam Mandi' },
      { date: 'Sep 7', price: 23, volume: 140, market: 'Khammam Mandi' },
      { date: 'Sep 8', price: 23, volume: 142, market: 'Khammam Mandi' }
    ],
    'Soybean': [
      { date: 'Sep 2', price: 44, volume: 90, market: 'Latur APMC' },
      { date: 'Sep 3', price: 45, volume: 92, market: 'Latur APMC' },
      { date: 'Sep 4', price: 45, volume: 95, market: 'Latur APMC' },
      { date: 'Sep 5', price: 46, volume: 98, market: 'Latur APMC' },
      { date: 'Sep 6', price: 47, volume: 100, market: 'Latur APMC' },
      { date: 'Sep 7', price: 47, volume: 102, market: 'Latur APMC' },
      { date: 'Sep 8', price: 48, volume: 105, market: 'Latur APMC' }
    ],
    'Wheat': [
      { date: 'Sep 2', price: 25, volume: 180, market: 'Khanna Grain Mandi' },
      { date: 'Sep 3', price: 25, volume: 185, market: 'Khanna Grain Mandi' },
      { date: 'Sep 4', price: 26, volume: 190, market: 'Khanna Grain Mandi' },
      { date: 'Sep 5', price: 26, volume: 192, market: 'Khanna Grain Mandi' },
      { date: 'Sep 6', price: 27, volume: 195, market: 'Khanna Grain Mandi' },
      { date: 'Sep 7', price: 27, volume: 200, market: 'Khanna Grain Mandi' },
      { date: 'Sep 8', price: 28, volume: 205, market: 'Khanna Grain Mandi' }
    ]
  };

  const activeCropName = selectedCrop === 'All' ? 'Tomato' : selectedCrop;
  const historical = CROP_HISTORICAL_DATA[activeCropName] || CROP_HISTORICAL_DATA['Tomato'];

  // Calculate high, low, avg for the selected crop
  const currentCropPrices = marketPrices.filter(p => p.crop.toLowerCase().includes(activeCropName.toLowerCase()));
  const avgPrice = currentCropPrices.length > 0
    ? Math.round(currentCropPrices.reduce((acc, p) => acc + p.currentPrice, 0) / currentCropPrices.length)
    : historical[historical.length - 1].price;
  const maxPrice = currentCropPrices.length > 0
    ? Math.max(...currentCropPrices.map(p => p.currentPrice))
    : Math.round(avgPrice * 1.06);
  const minPrice = currentCropPrices.length > 0
    ? Math.min(...currentCropPrices.map(p => p.currentPrice))
    : Math.round(avgPrice * 0.94);

  // Dynamic Trajectory Stats
  const firstPrice = historical[0].price;
  const lastPrice = historical[historical.length - 1].price;
  const diffPrice = lastPrice - firstPrice;
  const pctChange = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(1);
  const isUpTrend = diffPrice >= 0;

  const minHistPrice = Math.min(...historical.map(p => p.price));
  const maxHistPrice = Math.max(...historical.map(p => p.price));
  const rangeMargin = Math.max(1, (maxHistPrice - minHistPrice) * 0.3);
  const minScale = Math.max(0, minHistPrice - rangeMargin);
  const maxScale = maxHistPrice + rangeMargin;

  const primaryMarketName = (historical[0] as any).market || 'Bowenpally Mandi';

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/60 text-emerald-200 text-xs font-semibold backdrop-blur-sm mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Mandi Agmarknet & APMC Network Live Sync
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Agricultural Market Intelligence: {activeCropName}</h1>
            <p className="text-xs text-emerald-100 mt-1 max-w-2xl leading-relaxed">
              Real-time daily modal rates, volume arrivals, and AI predictive analytics across major South and Central Indian agricultural mandis.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/20 backdrop-blur-md">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Today's Benchmark</span>
              <span className="text-xl font-extrabold text-white">₹{avgPrice}/kg</span>
            </div>
            <div className="pl-3 border-l border-emerald-700/50">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Regional Range</span>
              <span className="text-sm font-bold text-emerald-100">₹{minPrice} - ₹{maxPrice}/kg</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 pt-5 border-t border-emerald-700/60 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-emerald-200 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Crop:
          </span>
          {crops.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCrop(c)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedCrop === c
                  ? 'bg-white text-emerald-900 shadow-md scale-105'
                  : 'bg-emerald-900/40 text-emerald-100 hover:bg-emerald-600/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 7-Day Trend Chart & AI Forecast Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Chart Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                7-Day Price Trajectory: {activeCropName}
              </h3>
              <p className="text-xs text-slate-500">{primaryMarketName} historical modal pricing (₹/kg)</p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              isUpTrend
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : 'text-amber-700 bg-amber-50 border-amber-200'
            }`}>
              {isUpTrend ? `+${pctChange}% this week` : `${pctChange}% this week`}
            </span>
          </div>

          {/* SVG Interactive Trend Visualizer */}
          <div className="pt-4 pb-2">
            <div className="h-44 w-full relative flex items-end justify-between gap-2 px-2 pt-6">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-b border-slate-900 w-full" />
                <div className="border-b border-slate-900 w-full" />
                <div className="border-b border-slate-900 w-full" />
              </div>

              {historical.map((point, idx) => {
                const heightPercent = Math.max(15, Math.min(100, ((point.price - minScale) / (maxScale - minScale)) * 100));
                const isToday = idx === historical.length - 1;
                return (
                  <div key={point.date} className="flex-1 flex flex-col items-center gap-2 group z-10">
                    <div className="text-[11px] font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
                      ₹{point.price}
                    </div>
                    <div className="w-full max-w-[36px] bg-slate-100 rounded-t-xl overflow-hidden relative h-28 flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full transition-all duration-500 rounded-t-xl ${
                          isToday
                            ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-md shadow-emerald-500/30'
                            : 'bg-emerald-200/80 group-hover:bg-emerald-300'
                        }`}
                      />
                    </div>
                    <span className={`text-[10px] font-semibold ${isToday ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                      {point.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 border border-slate-100">
            <span>Price Momentum: <strong>{historical.map(p => `₹${p.price}`).join(' → ')}</strong></span>
            <span className={`font-semibold flex items-center gap-1 shrink-0 ${isUpTrend ? 'text-emerald-600' : 'text-amber-600'}`}>
              {isUpTrend ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {isUpTrend ? 'Strong Upward Trend' : 'Steady Consolidation'}
            </span>
          </div>
        </div>

        {/* AI Prediction & Timing Advice Card */}
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-6 rounded-3xl border border-emerald-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">AI Predictive Outlook: {activeCropName}</h3>
            <p className="text-xs text-emerald-800 font-semibold mt-0.5">Next 3 Days APMC Forecast</p>

            <div className="mt-4 p-4 rounded-2xl bg-white/80 border border-emerald-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Estimated Price Band</span>
              <div className="text-2xl font-black text-emerald-700 mt-1">
                ₹{Math.round(lastPrice * (isUpTrend ? 1.02 : 0.97))} – ₹{Math.round(lastPrice * (isUpTrend ? 1.08 : 1.03))} /kg
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Confidence Score: {isUpTrend ? '92%' : '86%'}</span>
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>
                <strong>AI Selling Recommendation:</strong>
              </p>
              <p className="bg-white/60 p-3 rounded-xl border border-emerald-100/60 text-slate-600 italic">
                {isUpTrend
                  ? `Strong buyer demand across regional mandis. Selling within the next 24–48 hours or pre-booking transport will maximize net take-home returns.`
                  : `Market arrivals are steady. Consider negotiating minimum floor prices with contract buyers rather than offloading in open mandi auctions.`}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center gap-2 text-[11px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Always communicated as data-driven estimates, not guaranteed future rates.</span>
          </div>
        </div>

      </div>

      {/* Mandi Rate Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Nearby Regional Mandi Comparison</h3>
            <p className="text-xs text-slate-500">Compare rates across Telangana, AP, Karnataka & Maharashtra markets</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">State:</span>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 outline-none"
            >
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/30">
                <th className="py-3.5 px-5">Market / Mandi</th>
                <th className="py-3.5 px-4">Crop</th>
                <th className="py-3.5 px-4 text-right">Modal Rate</th>
                <th className="py-3.5 px-4 text-center">24h Change</th>
                <th className="py-3.5 px-4 text-center">Demand</th>
                <th className="py-3.5 px-4 text-right">Daily Arrivals</th>
                <th className="py-3.5 px-5">3-Day Prediction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredPrices.map(item => {
                const isPositive = item.priceChange > 0;
                const isNegative = item.priceChange < 0;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <div>
                          <span>{item.marketName}</span>
                          <span className="text-[10px] text-slate-400 block">{item.district}, {item.state}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium">{item.crop}</td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 text-sm">
                      ₹{item.currentPrice}/kg
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-bold text-[11px] ${
                        isPositive ? 'bg-emerald-100 text-emerald-800' : isNegative ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : isNegative ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                        {item.priceChange > 0 ? `+₹${item.priceChange}` : item.priceChange < 0 ? `-₹${Math.abs(item.priceChange)}` : '₹0'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                        item.demand === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.demand}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-500 font-medium">
                      {item.arrivalsTons} Tons
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 font-medium">
                      <span className="text-emerald-700 font-semibold">{item.predictionNext3Days}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
