import React, { useState } from 'react';
import { X, Sprout, Plus, Sparkles, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { QualityGrade } from '../../types';
import { getCropImage } from '../../utils/cropImages';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (cropData: {
    crop: string;
    variety: string;
    quantity: number;
    unit: string;
    grade: QualityGrade;
    harvestDate: string;
    location: string;
    minPrice: number;
    expectedPrice: number;
    images: string[];
    farmerId: string;
    farmerName: string;
    farmerLocation: string;
    status: 'Ready to Sell';
  }) => void;
}

const CROP_PRESETS: Record<string, { variety: string; minPrice: number; expectedPrice: number; quantity: number }> = {
  'Tomato': { variety: 'Vaishnavi Hybrid', minPrice: 24, expectedPrice: 27, quantity: 800 },
  'Chilli': { variety: 'Teja Red Hot', minPrice: 180, expectedPrice: 195, quantity: 250 },
  'Onion': { variety: 'Nashik Red', minPrice: 22, expectedPrice: 25, quantity: 600 },
  'Potato': { variety: 'Kufri Jyoti', minPrice: 18, expectedPrice: 21, quantity: 750 },
  'Cotton': { variety: 'Bt Cotton RCH-2', minPrice: 65, expectedPrice: 72, quantity: 400 },
  'Rice': { variety: 'BPT 5204 (Sona Masoori)', minPrice: 32, expectedPrice: 36, quantity: 1200 },
  'Turmeric': { variety: 'Salem Gold', minPrice: 110, expectedPrice: 125, quantity: 300 },
  'Maize': { variety: 'Pioneer Hybrid', minPrice: 20, expectedPrice: 23, quantity: 900 }
};

export const AddCropModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [crop, setCrop] = useState('Tomato');
  const [variety, setVariety] = useState('Vaishnavi Hybrid');
  const [quantity, setQuantity] = useState(800);
  const [unit, setUnit] = useState('kg');
  const [grade, setGrade] = useState<QualityGrade>('Grade A');
  const [harvestDate, setHarvestDate] = useState('2026-09-12');
  const [location, setLocation] = useState('Shamshabad, Hyderabad');
  const [minPrice, setMinPrice] = useState(24);
  const [expectedPrice, setExpectedPrice] = useState(27);
  const [imageUrl, setImageUrl] = useState(getCropImage('Tomato'));

  if (!isOpen) return null;

  const handleSelectCrop = (selectedCropName: string) => {
    setCrop(selectedCropName);
    const newImage = getCropImage(selectedCropName);
    setImageUrl(newImage);

    const preset = CROP_PRESETS[selectedCropName];
    if (preset) {
      setVariety(preset.variety);
      setMinPrice(preset.minPrice);
      setExpectedPrice(preset.expectedPrice);
      setQuantity(preset.quantity);
    }
  };

  const handleCropInputChange = (val: string) => {
    setCrop(val);
    setImageUrl(getCropImage(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = getCropImage(crop, imageUrl);
    onAdd({
      crop,
      variety,
      quantity: Number(quantity),
      unit,
      grade,
      harvestDate,
      location,
      minPrice: Number(minPrice),
      expectedPrice: Number(expectedPrice),
      images: [finalImage],
      farmerId: 'farmer_1',
      farmerName: 'Ravi Kumar',
      farmerLocation: 'Hyderabad, Telangana',
      status: 'Ready to Sell'
    });
    onClose();
  };

  const popularCrops = ['Tomato', 'Chilli', 'Onion', 'Potato', 'Cotton', 'Rice', 'Turmeric', 'Maize'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">Add Produce Listing</h3>
              <p className="text-xs text-emerald-100 font-medium">AgriAgent will automatically match local buyers</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Visual Crop Image Preview banner */}
          <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 flex items-end p-3">
            <img
              src={imageUrl}
              alt={crop}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white flex items-center justify-between w-full">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">Verified Photo Asset</span>
                <h4 className="font-extrabold text-base leading-tight">{crop || 'Selected Crop'} Photo</h4>
              </div>
              <span className="text-xs bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 font-semibold">
                {variety}
              </span>
            </div>
          </div>

          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Crop
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {popularCrops.map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => handleSelectCrop(c)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    crop === c
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={crop}
              onChange={e => handleCropInputChange(e.target.value)}
              required
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="e.g. Chilli"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Variety
              </label>
              <input
                type="text"
                value={variety}
                onChange={e => setVariety(e.target.value)}
                required
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="e.g. Hybrid Vaishnavi"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quality Grade
              </label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value as QualityGrade)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              >
                <option value="Grade A">Grade A (Premium / Export / Retail)</option>
                <option value="Grade B">Grade B (Standard Market)</option>
                <option value="Grade C">Grade C (Processing / Bulk)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quantity
              </label>
              <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
                <input
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  min={1}
                  required
                  className="w-full text-sm px-3.5 py-2.5 outline-none"
                />
                <span className="bg-slate-100 text-slate-600 px-3 py-2.5 text-xs font-semibold border-l border-slate-200">
                  kg
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Expected Harvest Date
              </label>
              <input
                type="date"
                value={harvestDate}
                onChange={e => setHarvestDate(e.target.value)}
                required
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Floor Min Price (₹/kg)
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={e => setMinPrice(Number(e.target.value))}
                min={1}
                required
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="24"
              />
              <p className="text-[10px] text-slate-400 mt-0.5">Agent will never accept below this</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Asking Price (₹/kg)
              </label>
              <input
                type="number"
                value={expectedPrice}
                onChange={e => setExpectedPrice(Number(e.target.value))}
                min={1}
                required
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="27"
              />
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Mandi avg is ₹26/kg</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Farm Location (for transport calculation)
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Village / Tehsil / District"
            />
          </div>

          {/* AI Intelligence banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2 text-xs text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">AgriAgent Autonomous Matching:</span> Once saved, the AI Market Agent will analyze Hyderabad mandis, contact 3+ verified institutional buyers, and calculate net take-home revenue after logistics.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>List Crop for AI Matching</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
