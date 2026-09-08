import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  CheckCircle2,
  Navigation,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StorageService } from '../../services/storage';

export const LogisticsView: React.FC = () => {
  const { orders, showToast } = useApp();
  const vehicles = StorageService.getVehicles();
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('veh_1');

  // Most recent order or seed order
  const activeOrder = orders[0];

  const handleSelectVehicle = (id: string) => {
    setSelectedVehicleId(id);
    showToast('Vehicle selected for produce freight dispatch.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Mandi Freight & Fleet Network
            </span>
            <span className="text-xs text-slate-400 font-medium">GPS Tracked Direct Farm Pickup</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Logistics & Transport Dispatch
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Book local commercial agricultural transport calibrated for weight capacity and route distance.
          </p>
        </div>
      </div>

      {/* Route Summary Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-3 w-full md:w-auto">
            <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-300 block">
              Active Shipment Route
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Pickup (Farm)</span>
                  <span className="text-xs font-bold">{activeOrder?.pickupLocation || 'Shamshabad, Hyderabad'}</span>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/40 shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Dropoff (Hub)</span>
                  <span className="text-xs font-bold">{activeOrder?.deliveryLocation || 'FreshMart Kukatpally Hub, Hyderabad'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-700/60 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-between md:justify-start">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Total Distance</span>
              <span className="text-base font-extrabold text-white">18.4 km</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Produce Payload</span>
              <span className="text-base font-extrabold text-emerald-400">800 kg Tomatoes</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Standard Transit</span>
              <span className="text-base font-extrabold text-white">~45 mins</span>
            </div>
          </div>

        </div>
      </div>

      {/* Available Vehicles Grid */}
      <div>
        <h3 className="font-bold text-slate-900 text-sm mb-3">Available Commercial Vehicles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {vehicles.map(v => {
            const isSelected = selectedVehicleId === v.id;
            const distance = 18;
            const estimatedCost = v.baseCost + (v.costPerKm * distance);

            return (
              <div
                key={v.id}
                onClick={() => handleSelectVehicle(v.id)}
                className={`bg-white rounded-3xl border p-5 cursor-pointer transition-all duration-200 shadow-sm flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/30 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                        Cap: {v.capacityKg} kg
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base mt-2">{v.type}</h4>
                      <span className="text-xs text-slate-400 font-medium">{v.vehicleNo}</span>
                    </div>

                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-300 text-transparent'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Cost & ETA Callout */}
                  <div className="mt-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-500 font-medium">Estimated Freight:</span>
                      <span className="text-lg font-black text-slate-900">₹{estimatedCost}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-600">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" /> Arrival Time:
                      </span>
                      <span className="font-bold text-slate-800">{v.etaMinutes} mins</span>
                    </div>
                  </div>

                  {/* Driver Information */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Assigned Driver:</span>
                      <span className="font-bold text-slate-800">{v.driverName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Driver Phone:</span>
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" /> {v.driverPhone}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Service Rating:</span>
                      <span className="font-bold text-amber-600 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {v.rating} / 5.0
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? 'Assigned Vehicle' : 'Select Vehicle'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
