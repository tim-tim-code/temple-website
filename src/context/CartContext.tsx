import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { WishlistItem, Cart, CartItem } from '../types/wishlist';

interface CartState {
  cart: Cart;
  isCartOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: WishlistItem; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

interface CartContextType {
  cart: Cart;
  isCartOpen: boolean;
  addItem: (item: WishlistItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (itemId: string) => number;
  getTotalPrice: () => number;
  formatPrice: (price: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Generate unique session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create session ID
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

// Initial cart state
const initialCart: Cart = {
  items: [],
  total_items: 0,
  subtotal: 0,
  session_id: getSessionId(),
};

const initialState: CartState = {
  cart: initialCart,
  isCartOpen: false,
};

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity = 1 } = action.payload;
      const existingItemIndex = state.cart.items.findIndex(
        cartItem => cartItem.item.id === item.id
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.cart.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // Add new item
        const newCartItem: CartItem = {
          id: `cart_${item.id}_${Date.now()}`,
          item,
          quantity,
          price_at_time: item.price || item.minimum_price || 0,
          added_at: new Date(),
        };
        newItems = [...state.cart.items, newCartItem];
      }

      const newCart = calculateCartTotals({ ...state.cart, items: newItems });
      return { ...state, cart: newCart };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.cart.items.filter(
        cartItem => cartItem.item.id !== action.payload.itemId
      );
      const newCart = calculateCartTotals({ ...state.cart, items: newItems });
      return { ...state, cart: newCart };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { itemId } });
      }

      const newItems = state.cart.items.map(cartItem =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity }
          : cartItem
      );

      const newCart = calculateCartTotals({ ...state.cart, items: newItems });
      return { ...state, cart: newCart };
    }

    case 'CLEAR_CART': {
      const newCart = calculateCartTotals({ ...state.cart, items: [] });
      return { ...state, cart: newCart };
    }

    case 'TOGGLE_CART': {
      return { ...state, isCartOpen: !state.isCartOpen };
    }

    case 'OPEN_CART': {
      return { ...state, isCartOpen: true };
    }

    case 'CLOSE_CART': {
      return { ...state, isCartOpen: false };
    }

    case 'LOAD_CART': {
      return { ...state, cart: action.payload };
    }

    default:
      return state;
  }
};

// Helper function to calculate cart totals
const calculateCartTotals = (cart: Cart): Cart => {
  const total_items = cart.items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.items.reduce(
    (total, item) => total + (item.price_at_time * item.quantity), 0
  );

  return {
    ...cart,
    total_items,
    subtotal,
  };
};

// Cart Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart_data');
    if (savedCart) {
      try {
        const parsedCart: Cart = JSON.parse(savedCart);
        // Ensure session ID is preserved
        parsedCart.session_id = getSessionId();
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart_data', JSON.stringify(state.cart));
  }, [state.cart]);

  // Context methods
  const addItem = (item: WishlistItem, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getItemQuantity = (itemId: string): number => {
    const cartItem = state.cart.items.find(item => item.item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getTotalPrice = (): number => {
    return state.cart.subtotal;
  };

  const formatPrice = (price: number): string => {
    return `€${price.toFixed(2)}`;
  };

  const value: CartContextType = {
    cart: state.cart,
    isCartOpen: state.isCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getItemQuantity,
    getTotalPrice,
    formatPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};