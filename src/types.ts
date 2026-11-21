export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  subcategory: string;
  sku: string;
  price: number; // in GBP £
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  tags?: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFestivalSpecial?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
  minSpend?: number;
}

export interface CustomerAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  country: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  loyaltyTier?: string;
}

export type OrderStatus = 'Processing' | 'Dispatched' | 'In Transit' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  shippingAddress: CustomerAddress;
  shippingMethod: 'Royal Mail 48 Tracked' | 'DPD Next Day Express' | 'EU International Tracked';
  trackingNumber: string;
  estimatedDelivery: string;
  paymentMethod: 'Credit/Debit Card' | 'PayPal' | 'Apple Pay';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  readTime: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  verifiedBuyer: boolean;
  rating: number;
  title: string;
  content: string;
  date: string;
  purchasedItem?: string;
}

export interface OnDemandRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  itemCategory: string;
  productDescription: string;
  approximateBudget?: string;
  neededByDate?: string;
  status: 'Received' | 'Under Review with Sourcing Team' | 'Quote Sent' | 'Procured';
  createdAt: string;
}
