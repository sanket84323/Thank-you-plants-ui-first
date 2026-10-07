export type UserRole = 'CUSTOMER' | 'REVIEWER' | 'PARTNER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  company?: string;
  address?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  seller: {
    partnerId: string;
    name: string;
    rating: number;
  };
  stock: number;
  rating: number;
  reviewCount: number;
  plantSize: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  potType: string;
  careLevel: 'Easy' | 'Very Easy' | 'Medium' | 'Advanced';
  sunlight: string;
  watering: string;
  benefits: string[];
  occasion: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  ecoPoints?: number;
  indoorOutdoor: 'Indoor' | 'Outdoor' | 'Both';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Offer {
  id: string;
  name: string;
  tagline: string;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  itemsIncluded: string[];
  occasion: string;
  image: string;
  badge?: string;
  isPopular?: boolean;
  description?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  potType?: string;
  careLevel?: string;
}

export type OrderStatus =
  | 'NEW'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  timestamp?: string;
  note?: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  recipientId?: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientAddress: string;
  partnerId: string;
  partnerName: string;
  items: OrderItem[];
  offerId?: string;
  offerName?: string;
  giftMessage?: string;
  deliveryDate?: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  paymentMethod: string;
  orderStatus: OrderStatus;
  orderDate: string;
  expectedDeliveryDate: string;
  trackingHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface Feedback {
  id: string;
  orderId: string;
  orderNumber: string;
  recipientName: string;
  senderName: string;
  productName: string;
  productImage: string;
  partnerId: string;
  overallRating: number;
  plantQualityRating: number;
  packagingRating: number;
  deliveryRating: number;
  comment: string;
  image?: string;
  createdAt: string;
  isModerated: boolean;
  isApproved: boolean;
}

export type ApplicationStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

export interface PartnerApplication {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  businessType: string;
  yearsInBusiness: number;
  description: string;
  documents: string[];
  plantCategories: string[];
  status: ApplicationStatus;
  submittedAt: string;
}

export interface PartnerProfile {
  id: string;
  userId: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  address: string;
  rating: number;
  reviewCount: number;
  verificationStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
  totalProducts: number;
  activeOrders: number;
  completedOrders: number;
  totalRevenue: number;
  joinedDate: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  role: UserRole | 'ALL';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  type: 'order' | 'system' | 'application' | 'feedback' | 'offer';
  link?: string;
}

export interface GreenImpactStats {
  totalPlantsGifted: number;
  happyRecipients: number;
  co2SavedTons: number;
  ecoPackagingPercent: number;
  plasticSavedKg: number;
}
