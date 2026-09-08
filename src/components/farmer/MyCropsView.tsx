import React, { useState } from 'react';
import {
  Sprout,
  Plus,
  Calendar,
  MapPin,
  Tag,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AddCropModal } from './AddCropModal';
import { getCropImage } from '../../utils/cropImages';

export const MyCropsView: React.FC = () => {
  const { crops, addCrop, setSelectedCropId, setActiveTab, t } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCrops = crops.filter(c =>
    c.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.variety.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            {t.myCrops}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your agricultural produce, quality grades, minimum pricing floors, and live selling status.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addNewCrop}</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search crop or variety..."
          className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCrops.map(crop => {
          const isTomatoDemo = crop.id === 'crop_1';
          return (
            <div
              key={crop.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
                isTomatoDemo ? 'border-emerald-400 ring-2 ring-emerald-400/20' : 'border-slate-200'
              }`}
            >
              {/* Image banner & badges */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={getCropImage(crop.crop, crop.images?.[0])}
                  alt={crop.crop}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-black/20" />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                    crop.status === 'Ready to Sell'
                      ? 'bg-emerald-500/90 text-white'
                      : crop.status === 'Sold'
                      ? 'bg-blue-600/90 text-white'
                      : 'bg-amber-500/90 text-white'
                  }`}>
                    {crop.status}
                  </span>
                </div>

                {/* Grade Badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center gap-1 border border-white/20">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {crop.grade}
                  </span>
                </div>

                {/* Crop Name & Variety on image bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-extrabold tracking-tight">{crop.crop}</h3>
                    <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {crop.quantity} {crop.unit}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium">{crop.variety}</p>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-4 space-y-3">
                
                {/* Specs rows */}
                <div className="grid grid-cols-2 gap-2 text-xs py-1">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Floor Price</span>
                    <span className="font-bold text-slate-800 text-sm">₹{crop.minPrice}/kg</span>
                  </div>
                  <div className="bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
                    <span className="text-emerald-700 block text-[10px] uppercase font-bold tracking-wider">Target Price</span>
                    <span className="font-bold text-emerald-800 text-sm">₹{crop.expectedPrice}/kg</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Harvest Date: <strong className="text-slate-700">{crop.harvestDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{crop.location}</span>
                  </div>
                </div>

                {/* Presentation highlight for Tomato */}
                {isTomatoDemo && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="text-[11px] text-emerald-900 leading-tight">
                      <strong>Market Intel:</strong> 3 active buyers matched! Recommended buyer yields <strong>₹20,530 net profit</strong>.
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-1 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedCropId(crop.id);
                      setActiveTab('agent');
                    }}
                    className="w-full py-2 px-3 text-xs font-bold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/80 rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    <span>🌾 Ask AI</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCropId(crop.id);
                      setActiveTab('compare');
                    }}
                    className="w-full py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Offers</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <AddCropModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addCrop}
      />

    </div>
  );
};
