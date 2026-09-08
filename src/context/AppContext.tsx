import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  LanguageCode,
  CropListing,
  MarketPrice,
  BuyerOffer,
  Negotiation,
  Order,
  PaymentRecord,
  AppNotification
} from '../types';
import { StorageService, defaultUser } from '../services/storage';
import { translations, Translations } from '../i18n/translations';
import { AgentTools } from '../services/ai/tools';
import confetti from 'canvas-confetti';

export type ActiveTab =
  | 'dashboard'
  | 'crops'
  | 'market'
  | 'buyers'
  | 'compare'
  | 'negotiation'
  | 'logistics'
  | 'orders'
  | 'payments'
  | 'agent'
  | 'admin';

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  crops: CropListing[];
  addCrop: (crop: Omit<CropListing, 'id' | 'createdAt'>) => void;
  marketPrices: MarketPrice[];
  offers: BuyerOffer[];
  negotiations: Negotiation[];
  orders: Order[];
  payments: PaymentRecord[];
  notifications: AppNotification[];
  unreadNotifsCount: number;
  markNotificationsRead: () => void;
  selectedCropId: string;
  setSelectedCropId: (id: string) => void;
  selectedOfferId: string;
  setSelectedOfferId: (id: string) => void;
  startNegotiationForOffer: (offerId: string) => void;
  confirmAndCreateOrder: (offerId: string) => Order;
  advanceOrderStage: (orderId: string) => void;
  resetAllDataToDemo: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User>(defaultUser);
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('agent');
  const [crops, setCrops] = useState<CropListing[]>([]);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [offers, setOffers] = useState<BuyerOffer[]>([]);
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [selectedCropId, setSelectedCropId] = useState<string>('crop_1');
  const [selectedOfferId, setSelectedOfferId] = useState<string>('offer_1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize storage
  useEffect(() => {
    StorageService.init();
    refreshAllState();
  }, []);

  const refreshAllState = () => {
    setUserState(StorageService.getCurrentUser());
    setLanguageState(StorageService.getLanguage());
    setCrops(StorageService.getCrops());
    setMarketPrices(StorageService.getMarketPrices());
    setOffers(StorageService.getOffers());
    setNegotiations(StorageService.getNegotiations());
    setOrders(StorageService.getOrders());
    setPayments(StorageService.getPayments());
    setNotifications(StorageService.getNotifications());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const setUser = (newUser: User) => {
    StorageService.setCurrentUser(newUser);
    setUserState(newUser);
  };

  const setLanguage = (lang: LanguageCode) => {
    StorageService.setLanguage(lang);
    setLanguageState(lang);
  };

  const switchRole = (role: UserRole) => {
    let newUser: User = {
      id: role === 'farmer' ? 'farmer_1' : role === 'buyer' ? 'buyer_1' : 'admin_1',
      name: role === 'farmer' ? 'Ravi Kumar' : role === 'buyer' ? 'Vikram Mehta (FreshMart)' : 'System Administrator',
      phone: role === 'farmer' ? '+91 98480 22334' : role === 'buyer' ? '+91 98200 44556' : '+91 90000 00000',
      role,
      location: role === 'farmer' ? 'Shamshabad, Hyderabad' : role === 'buyer' ? 'Kukatpally, Hyderabad' : 'HQ Admin Portal',
      language: 'en',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    };
    StorageService.setCurrentUser(newUser);
    setUserState(newUser);
    setActiveTab('agent');
    showToast(`Switched role to ${role.toUpperCase()}`);
  };

  const addCrop = (cropData: Omit<CropListing, 'id' | 'createdAt'>) => {
    const newCrop = StorageService.addCrop(cropData);
    setCrops(StorageService.getCrops());
    setSelectedCropId(newCrop.id);
    showToast(`Added ${newCrop.crop} listing successfully!`);
    // Add an alert notification
    StorageService.addNotification({
      title: `🌱 New Produce Listed: ${newCrop.crop}`,
      message: `${newCrop.quantity} ${newCrop.unit} of ${newCrop.crop} (${newCrop.grade}) ready for buyer matching.`,
      type: 'price'
    });
    setNotifications(StorageService.getNotifications());
  };

  const startNegotiationForOffer = (offerId: string) => {
    setSelectedOfferId(offerId);
    setActiveTab('agent');
  };

  const confirmAndCreateOrder = (offerId: string): Order => {
    const order = AgentTools.create_order(offerId, true);
    refreshAllState();
    setActiveTab('orders');
    showToast(`🎉 Order #${order.id} confirmed & transport assigned!`);
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
    return order;
  };

  const advanceOrderStage = (orderId: string) => {
    const allOrders = StorageService.getOrders();
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    const stages: Order['stage'][] = [
      'offer_received',
      'negotiation',
      'farmer_approved',
      'buyer_confirmed',
      'transport_assigned',
      'produce_picked_up',
      'delivered',
      'payment_completed',
      'transaction_closed'
    ];

    const currentIdx = stages.indexOf(order.stage);
    if (currentIdx >= 0 && currentIdx < stages.length - 1) {
      const nextStage = stages[currentIdx + 1];
      order.stage = nextStage;

      // Update timeline items
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      order.timeline = order.timeline.map((t, idx) => {
        if (idx <= currentIdx + 1) {
          return { ...t, completedAt: t.completedAt || `Today ${timeStr}`, isCurrent: idx === currentIdx + 1 };
        }
        return { ...t, isCurrent: false };
      });

      // If moved to payment completed, add payment record
      if (nextStage === 'payment_completed' && !order.payment) {
        const paymentRec: PaymentRecord = {
          id: 'pay_' + Date.now(),
          orderId: order.id,
          farmerId: order.farmerId,
          farmerName: order.farmerName,
          buyerName: order.buyerName,
          crop: order.crop,
          quantityKg: order.quantityKg,
          pricePerKg: order.pricePerKg,
          grossAmount: order.grossAmount,
          transportCost: order.transportCost,
          platformFee: order.platformFee,
          netAmount: order.netAmount,
          status: 'paid',
          paymentDate: new Date().toISOString(),
          transactionRef: 'UPI/' + Date.now() + '/AGRI'
        };
        order.payment = paymentRec;
        StorageService.addPayment(paymentRec);
        StorageService.addNotification({
          title: '💰 Payout Settled!',
          message: `₹${order.netAmount.toLocaleString('en-IN')} net payout for Order #${order.id} transferred to your bank account!`,
          type: 'payment'
        });
      }

      // If delivered
      if (nextStage === 'delivered' && order.logistics) {
        order.logistics.status = 'Delivered';
        order.logistics.eta = 'Delivered';
      }

      StorageService.saveOrder(order);
      refreshAllState();
      showToast(`Order #${order.id} moved to: ${nextStage.replace('_', ' ').toUpperCase()}`);
    }
  };

  const markNotificationsRead = () => {
    StorageService.markAllNotificationsRead();
    setNotifications(StorageService.getNotifications());
  };

  const resetAllDataToDemo = () => {
    StorageService.resetToSeed();
    refreshAllState();
    setSelectedCropId('crop_1');
    setSelectedOfferId('offer_1');
    setActiveTab('dashboard');
    showToast('Reset data to initial presentation demo state!');
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;
  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        switchRole,
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        crops,
        addCrop,
        marketPrices,
        offers,
        negotiations,
        orders,
        payments,
        notifications,
        unreadNotifsCount,
        markNotificationsRead,
        selectedCropId,
        setSelectedCropId,
        selectedOfferId,
        setSelectedOfferId,
        startNegotiationForOffer,
        confirmAndCreateOrder,
        advanceOrderStage,
        resetAllDataToDemo,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
