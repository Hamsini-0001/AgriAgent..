export type UserRole = 'farmer' | 'buyer' | 'admin';

export type LanguageCode = 'en' | 'te' | 'hi' | 'kn';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  location: string;
  language: LanguageCode;
}

export interface FarmerProfile {
  userId: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  mandiLocation: string;
  verified: boolean;
  rating: number;
  totalSales: number;
  totalEarnings: number;
  activeListingsCount: number;
  completedOrdersCount: number;
}

export interface BuyerProfile {
  userId: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  location: string;
  buyerType: 'Retailer' | 'Wholesaler' | 'Food Processor' | 'Exporter';
  verified: boolean;
  trustScore: number; // 0-100
  paymentReliability: number; // 0-100
  cancellationRate: number; // percentage
  accountAgeMonths: number;
  totalProcuredKg: number;
  rating: number;
  cropsRequired: string[];
}

export type QualityGrade = 'Grade A' | 'Grade B' | 'Grade C';

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  crop: string;
  variety: string;
  quantity: number;
  unit: string;
  grade: QualityGrade;
  harvestDate: string;
  location: string;
  minPrice: number; // Minimum acceptable price per unit (INR)
  expectedPrice: number; // Target price
  images: string[];
  status: 'Ready to Sell' | 'Negotiating' | 'Sold' | 'Draft';
  createdAt: string;
}

export interface MarketPrice {
  id: string;
  crop: string;
  marketName: string;
  district: string;
  state: string;
  currentPrice: number; // per kg
  priceChange: number; // +2, -1 etc
  demand: 'High' | 'Medium' | 'Low';
  arrivalsTons: number;
  lastUpdated: string;
  predictionTrend: 'rising' | 'stable' | 'falling';
  predictionNext3Days: string;
}

export interface HistoricalPrice {
  date: string;
  price: number;
  volume: number;
}

export interface BuyerOffer {
  id: string;
  listingId: string;
  buyerId: string;
  buyerName: string;
  companyName: string;
  crop: string;
  offeredPrice: number; // per kg
  quantityKg: number;
  distanceKm: number;
  estimatedTransportCost: number;
  buyerReliability: number; // percentage
  paymentTerms: string;
  matchScore: number; // transparent composite score
  status: 'pending' | 'negotiating' | 'accepted' | 'rejected';
  createdAt: string;
  scoreBreakdown?: {
    priceScore: number;
    distanceScore: number;
    reliabilityScore: number;
    quantityScore: number;
    paymentScore: number;
    explanation: string;
  };
}

export interface NegotiationMessage {
  id: string;
  sender: 'buyer' | 'agent' | 'farmer';
  text: string;
  timestamp: string;
  proposedPrice?: number;
}

export interface Negotiation {
  id: string;
  offerId: string;
  listingId: string;
  farmerId: string;
  buyerId: string;
  crop: string;
  quantityKg: number;
  initialBuyerOffer: number;
  agentTargetPrice: number;
  farmerMinPrice: number;
  currentPrice: number;
  status: 'in_progress' | 'farmer_approved' | 'buyer_accepted' | 'rejected';
  messages: NegotiationMessage[];
  lastUpdated: string;
}

export type OrderStage =
  | 'offer_received'
  | 'negotiation'
  | 'farmer_approved'
  | 'buyer_confirmed'
  | 'transport_assigned'
  | 'produce_picked_up'
  | 'delivered'
  | 'payment_completed'
  | 'transaction_closed';

export interface VehicleOption {
  id: string;
  type: string;
  capacityKg: number;
  baseCost: number;
  costPerKm: number;
  etaMinutes: number;
  rating: number;
  driverName: string;
  driverPhone: string;
  vehicleNo: string;
}

export interface LogisticsBooking {
  id: string;
  orderId: string;
  vehicleType: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  pickupLocation: string;
  destinationLocation: string;
  distanceKm: number;
  cost: number;
  eta: string;
  status: 'Assigned' | 'En Route' | 'Picked Up' | 'In Transit' | 'Delivered';
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  farmerId: string;
  farmerName: string;
  buyerName: string;
  crop: string;
  quantityKg: number;
  pricePerKg: number;
  grossAmount: number;
  transportCost: number;
  platformFee: number;
  netAmount: number;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  paymentDate: string;
  transactionRef: string;
}

export interface Order {
  id: string;
  listingId: string;
  offerId: string;
  farmerId: string;
  farmerName: string;
  buyerId: string;
  buyerName: string;
  crop: string;
  quantityKg: number;
  pricePerKg: number;
  grossAmount: number;
  transportCost: number;
  platformFee: number;
  netAmount: number;
  stage: OrderStage;
  logistics?: LogisticsBooking;
  payment?: PaymentRecord;
  pickupLocation: string;
  deliveryLocation: string;
  createdAt: string;
  timeline: {
    stage: OrderStage;
    label: string;
    completedAt?: string;
    isCurrent: boolean;
  }[];
}

export interface AppNotification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'offer' | 'price' | 'negotiation' | 'order' | 'transport' | 'payment' | 'ai';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface AgentActionLog {
  id: string;
  timestamp: string;
  toolName: string;
  input: any;
  output: any;
  reasoning: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  toolsUsed?: string[];
  recommendationData?: {
    crop?: string;
    recommendedPrice?: string;
    bestBuyer?: string;
    netRevenue?: number;
    confidence?: number;
    actionType?: 'negotiate' | 'compare' | 'accept' | 'view_market';
    actionPayload?: any;
  };
}
