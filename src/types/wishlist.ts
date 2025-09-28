export interface WishlistItem {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  why_we_need_it: string;
  image_url?: string;
  image_urls?: string[];
  purchase_link?: string;
  category: string;
  price?: number;
  minimum_price?: number;
  inventory: number;
  inventory_remaining: number;
  is_featured: boolean;
  is_urgent: boolean;
  shipping_notes?: string;
  funding_goal?: number;
  funding_raised: number;
  priority: number;
  status: 'needed' | 'purchased' | 'in_progress' | 'funded';
  created_at: string;
  updated_at: string;
}

export interface WishlistItemInput {
  title: string;
  short_description: string;
  full_description: string;
  why_we_need_it: string;
  image_url?: string;
  image_urls?: string[];
  purchase_link?: string;
  category?: string;
  price?: number;
  minimum_price?: number;
  inventory?: number;
  inventory_remaining?: number;
  is_featured?: boolean;
  is_urgent?: boolean;
  shipping_notes?: string;
  funding_goal?: number;
  funding_raised?: number;
  priority?: number;
  status?: 'needed' | 'purchased' | 'in_progress' | 'funded';
}

export interface CartItem {
  id: string;
  item: WishlistItem;
  quantity: number;
  price_at_time: number;
  added_at: Date;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  subtotal: number;
  session_id: string;
}

export interface DonorIntention {
  id: string;
  session_id: string;
  donor_name?: string;
  donor_email?: string;
  is_anonymous: boolean;
  message?: string;
  total_amount: number;
  items: CartItem[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}