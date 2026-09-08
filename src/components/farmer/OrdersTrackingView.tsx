import React from 'react';
import {
  CheckCircle2,
  Clock,
  Truck,
  DollarSign,
  Package,
  ArrowRight,
  ShieldCheck,
  User,
  MapPin,
  Calendar,
  Sparkles,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OrdersTrackingView: React.FC = () => {
  const { orders, advanceOrderStage, setActiveTab } = useApp();

  const stagesList = [
    { key: 'offer_received', title: '1. Offer Received', desc: 'Buyer submitted price bid' },
    { key: 'negotiation', title: '2. AI Negotiation', desc: 'Price agreed with target floor' },
    { key: 'farmer_approved', title: '3. Farmer Approved', desc: 'Explicit consent granted' },
    { key: 'buyer_confirmed', title: '4. Buyer Confirmed', desc: 'Funds held in escrow' },
    { key: 'transport_assigned', title: '5. Transport Assigned', desc: 'Mini truck dispatched to farm' },
    { key: 'produce_picked_up', title: '6. Produce Picked Up', desc: 'Quality checked & loaded' },
    { key: 'delivered', title: '7. Delivered', desc: 'Weighed & received at hub' },
    { key: 'payment_completed', title: '8. Payment Completed', desc: 'Instant UPI bank settlement' },
    { key: 'transaction_closed', title: '9. Closed & Rated', desc: 'Deal finalized with 5★ review' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Package className="w-3.5 h-3.5" /> 9-Stage Order Lifecycle
            </span>
            <span className="text-xs text-slate-400 font-medium">Real-Time Farm-to-Buyer Tracking</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Order Fulfillment & Live Logistics Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent tracking from initial price offer to final instant bank payment settlement.
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map(order => {
          const isFinished = order.stage === 'transaction_closed' || order.stage === 'payment_completed';

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Order Card Header */}
              <div className="p-6 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-lg">Order #{order.id}</h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      {order.stage.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    <strong>{order.quantityKg} kg {order.crop}</strong> • Sold to <strong>{order.buyerName}</strong> at <strong>₹{order.pricePerKg}/kg</strong>
                  </p>
                </div>

                {/* Demo Progression Button */}
                <div className="flex items-center gap-2">
                  {!isFinished ? (
                    <button
                      onClick={() => advanceOrderStage(order.id)}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Update Logistics Status</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('payments')}
                      className="px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>View Payment Receipt</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Card Financial Quick Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white border-b border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Gross Deal Value:</span>
                  <span className="font-bold text-slate-800 text-sm">₹{order.grossAmount.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-red-500 block font-medium">Transport Freight:</span>
                  <span className="font-bold text-red-600 text-sm">-₹{order.transportCost.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Platform Fee (1%):</span>
                  <span className="font-semibold text-slate-600 text-sm">-₹{order.platformFee}</span>
                </div>
                <div>
                  <span className="text-emerald-700 block font-bold">Net Payout to Farmer:</span>
                  <span className="font-extrabold text-emerald-700 text-base">₹{order.netAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* 9-Stage Visual Timeline */}
              <div className="p-6 space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Visual Lifecycle Progress
                </h4>

                <div className="relative">
                  {/* Desktop Step Flow */}
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-2">
                    {stagesList.map((stageItem, index) => {
                      const timelineItem = order.timeline.find(t => t.stage === stageItem.key);
                      const isCompleted = !!timelineItem?.completedAt;
                      const isCurrent = timelineItem?.isCurrent;

                      return (
                        <div
                          key={stageItem.key}
                          className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                            isCurrent
                              ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                              : isCompleted
                              ? 'bg-emerald-50/30 border-emerald-200 text-slate-800'
                              : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Step {index + 1}
                              </span>
                              {isCompleted ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              ) : isCurrent ? (
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                              ) : (
                                <Clock className="w-3 h-3 text-slate-300" />
                              )}
                            </div>
                            <h5 className="font-bold text-xs text-slate-900 leading-tight">
                              {stageItem.title.replace(/^[0-9]\.\s*/, '')}
                            </h5>
                            <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                              {stageItem.desc}
                            </p>
                          </div>

                          {timelineItem?.completedAt && (
                            <div className="mt-2 pt-1 border-t border-slate-200/60 text-[9px] font-medium text-emerald-700">
                              {timelineItem.completedAt}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Logistics & Driver Details Card (if assigned) */}
                {order.logistics && (
                  <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-indigo-950 block">{order.logistics.vehicleType} ({order.logistics.vehicleNo})</span>
                        <span className="text-slate-600 font-medium">Driver: {order.logistics.driverName} • {order.logistics.driverPhone}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-slate-500 block">Freight Status:</span>
                      <span className="font-bold text-indigo-800 text-sm">{order.logistics.status}</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
