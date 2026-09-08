import {
  CropListing,
  MarketPrice,
  HistoricalPrice,
  BuyerOffer,
  Negotiation,
  Order,
  PaymentRecord,
  LogisticsBooking,
  AppNotification,
  User,
  LanguageCode
} from '../types';

import {
  SEED_FARMERS,
  SEED_BUYERS,
  SEED_CROP_LISTINGS,
  SEED_MARKET_PRICES,
  TOMATO_HISTORICAL_PRICES,
  SEED_BUYER_OFFERS,
  SEED_NEGOTIATIONS,
  SEED_ORDERS,
  SEED_PAYMENTS,
  SEED_NOTIFICATIONS,
  SEED_VEHICLES
} from '../data/seedData';

const KEYS = {
  USER: 'agri_current_user',
  LANGUAGE: 'agri_language',
  CROPS: 'agri_crops',
  MARKET_PRICES: 'agri_market_prices',
  OFFERS: 'agri_offers',
  NEGOTIATIONS: 'agri_negotiations',
  ORDERS: 'agri_orders',
  PAYMENTS: 'agri_payments',
  NOTIFICATIONS: 'agri_notifications'
};

export const defaultUser: User = {
  id: 'farmer_1',
  name: 'Ravi Kumar',
  phone: '+91 98480 22334',
  role: 'farmer',
  location: 'Shamshabad, Hyderabad',
  language: 'en'
};

export class StorageService {
  public static init() {
    if (!localStorage.getItem(KEYS.CROPS)) {
      this.resetToSeed();
    }
  }

  public static resetToSeed() {
    localStorage.setItem(KEYS.CROPS, JSON.stringify(SEED_CROP_LISTINGS));
    localStorage.setItem(KEYS.MARKET_PRICES, JSON.stringify(SEED_MARKET_PRICES));
    localStorage.setItem(KEYS.OFFERS, JSON.stringify(SEED_BUYER_OFFERS));
    localStorage.setItem(KEYS.NEGOTIATIONS, JSON.stringify(SEED_NEGOTIATIONS));
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
    localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(SEED_PAYMENTS));
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    localStorage.setItem(KEYS.USER, JSON.stringify(defaultUser));
    localStorage.setItem(KEYS.LANGUAGE, 'en');
  }

  // User & Auth
  public static getCurrentUser(): User {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : defaultUser;
  }

  public static setCurrentUser(user: User) {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  }

  public static getLanguage(): LanguageCode {
    return (localStorage.getItem(KEYS.LANGUAGE) as LanguageCode) || 'en';
  }

  public static setLanguage(lang: LanguageCode) {
    localStorage.setItem(KEYS.LANGUAGE, lang);
  }

  // Crops
  public static getCrops(): CropListing[] {
    const data = localStorage.getItem(KEYS.CROPS);
    return data ? JSON.parse(data) : SEED_CROP_LISTINGS;
  }

  public static addCrop(crop: Omit<CropListing, 'id' | 'createdAt'>): CropListing {
    const list = this.getCrops();
    const newCrop: CropListing = {
      ...crop,
      id: 'crop_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    list.unshift(newCrop);
    localStorage.setItem(KEYS.CROPS, JSON.stringify(list));
    return newCrop;
  }

  public static updateCropStatus(id: string, status: CropListing['status']) {
    const list = this.getCrops();
    const item = list.find(c => c.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(KEYS.CROPS, JSON.stringify(list));
    }
  }

  // Market Prices
  public static getMarketPrices(): MarketPrice[] {
    const data = localStorage.getItem(KEYS.MARKET_PRICES);
    return data ? JSON.parse(data) : SEED_MARKET_PRICES;
  }

  public static getHistoricalPrices(): HistoricalPrice[] {
    return TOMATO_HISTORICAL_PRICES;
  }

  // Offers
  public static getOffers(listingId?: string): BuyerOffer[] {
    const data = localStorage.getItem(KEYS.OFFERS);
    const list: BuyerOffer[] = data ? JSON.parse(data) : SEED_BUYER_OFFERS;
    if (listingId) {
      return list.filter(o => o.listingId === listingId);
    }
    return list;
  }

  public static updateOfferStatus(offerId: string, status: BuyerOffer['status']) {
    const list = this.getOffers();
    const offer = list.find(o => o.id === offerId);
    if (offer) {
      offer.status = status;
      localStorage.setItem(KEYS.OFFERS, JSON.stringify(list));
    }
  }

  // Negotiations
  public static getNegotiations(): Negotiation[] {
    const data = localStorage.getItem(KEYS.NEGOTIATIONS);
    return data ? JSON.parse(data) : SEED_NEGOTIATIONS;
  }

  public static getNegotiationForOffer(offerId: string): Negotiation | undefined {
    return this.getNegotiations().find(n => n.offerId === offerId);
  }

  public static saveNegotiation(neg: Negotiation) {
    const list = this.getNegotiations();
    const idx = list.findIndex(n => n.id === neg.id);
    if (idx >= 0) {
      list[idx] = neg;
    } else {
      list.unshift(neg);
    }
    localStorage.setItem(KEYS.NEGOTIATIONS, JSON.stringify(list));
  }

  // Orders
  public static getOrders(): Order[] {
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : SEED_ORDERS;
  }

  public static saveOrder(order: Order) {
    const list = this.getOrders();
    const idx = list.findIndex(o => o.id === order.id);
    if (idx >= 0) {
      list[idx] = order;
    } else {
      list.unshift(order);
    }
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(list));
  }

  // Payments
  public static getPayments(): PaymentRecord[] {
    const data = localStorage.getItem(KEYS.PAYMENTS);
    return data ? JSON.parse(data) : SEED_PAYMENTS;
  }

  public static addPayment(payment: PaymentRecord) {
    const list = this.getPayments();
    list.unshift(payment);
    localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(list));
  }

  // Notifications
  public static getNotifications(): AppNotification[] {
    const data = localStorage.getItem(KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : SEED_NOTIFICATIONS;
  }

  public static addNotification(notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) {
    const list = this.getNotifications();
    const newNotif: AppNotification = {
      ...notif,
      id: 'notif_' + Date.now(),
      timestamp: 'Just now',
      read: false
    };
    list.unshift(newNotif);
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(list));
  }

  public static markAllNotificationsRead() {
    const list = this.getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(list));
  }

  public static getFarmers(): typeof SEED_FARMERS {
    return SEED_FARMERS;
  }

  public static getBuyers(): typeof SEED_BUYERS {
    return SEED_BUYERS;
  }

  public static getVehicles(): typeof SEED_VEHICLES {
    return SEED_VEHICLES;
  }
}
