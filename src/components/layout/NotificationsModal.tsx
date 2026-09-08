import React from 'react';
import { X, Bell, CheckCheck, Sparkles, DollarSign, Truck, Tag, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationsRead, setActiveTab } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'ai':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'offer':
        return <Tag className="w-4 h-4 text-blue-600" />;
      case 'negotiation':
        return <Tag className="w-4 h-4 text-purple-600" />;
      case 'order':
        return <ShoppingCart className="w-4 h-4 text-amber-600" />;
      case 'transport':
        return <Truck className="w-4 h-4 text-indigo-600" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-start justify-end p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden mt-12 sm:mt-14 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Notifications & Alerts</h3>
              <p className="text-[11px] text-slate-500">{notifications.length} updates recorded</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markNotificationsRead}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-emerald-50 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Read all</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[70vh] overflow-y-auto divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  if (n.type === 'offer' || n.type === 'negotiation') {
                    setActiveTab('negotiation');
                  } else if (n.type === 'order' || n.type === 'transport') {
                    setActiveTab('orders');
                  } else if (n.type === 'payment') {
                    setActiveTab('payments');
                  } else if (n.type === 'ai') {
                    setActiveTab('agent');
                  }
                  onClose();
                }}
                className={`p-4 flex items-start gap-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                  !n.read ? 'bg-emerald-50/40' : ''
                }`}
              >
                <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 shrink-0">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 font-medium">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">Live AI Market Alerts & Transaction Updates</p>
        </div>

      </div>
    </div>
  );
};
