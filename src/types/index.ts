export interface Product {
  id: string;
  slug?: string;
  handle: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  detailedDescription: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  fabric: string;
  occasion: string[];
  careInstructions: string[];
  features: string[];
  measurements: {
    [size: string]: {
      chest?: string;
      waist?: string;
      length?: string;
      shoulder?: string;
    };
  };
  specifications: {
    [key: string]: string;
  };
  tags: string[];
  sku: string;
  weight: string;
  origin: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  shippingAddress: Address;
}

export interface Address {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CompareItem {
  product: Product;
  addedAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  verified: boolean;
}