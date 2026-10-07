import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Product,
  Category,
  Offer,
  Order,
  OrderStatus,
  Feedback,
  PartnerApplication,
  PartnerProfile,
  NotificationItem,
  GreenImpactStats,
  OrderItem
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_OFFERS,
  INITIAL_ORDERS,
  INITIAL_FEEDBACK,
  INITIAL_PARTNER_APPLICATIONS,
  INITIAL_PARTNER_PROFILES,
  INITIAL_NOTIFICATIONS,
  INITIAL_GREEN_IMPACT
} from '../data/mockData';

export interface CartItem {
  product: Product;
  quantity: number;
  giftCustomization?: {
    personalizedMessage?: string;
    deliveryDate?: string;
    recipientName?: string;
    recipientEmail?: string;
    recipientPhone?: string;
    recipientAddress?: string;
    giftCardPackage?: string;
    giftCardPrice?: number;
    ecoPackaging?: boolean;
  };
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  // User & Auth
  currentUser: User;
  allUsers: User[];
  switchUserRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  register: (name: string, email: string, role: UserRole, company?: string) => void;

  // Products
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Offers
  offers: Offer[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customization?: CartItem['giftCustomization']) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Orders & Gifting
  orders: Order[];
  createOrder: (orderData: {
    recipientName: string;
    recipientEmail: string;
    recipientPhone: string;
    recipientAddress: string;
    giftMessage?: string;
    deliveryDate?: string;
    paymentMethod: string;
    offerId?: string;
    items?: CartItem[];
  }) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  cancelOrder: (orderId: string) => void;

  // Feedback
  feedbackList: Feedback[];
  submitFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt' | 'isModerated' | 'isApproved'>) => void;
  moderateFeedback: (feedbackId: string, isApproved: boolean) => void;

  // Partner Applications & Profiles
  partnerApplications: PartnerApplication[];
  partnerProfiles: PartnerProfile[];
  submitPartnerApplication: (appData: Omit<PartnerApplication, 'id' | 'status' | 'submittedAt'>) => void;
  reviewPartnerApplication: (id: string, status: 'APPROVED' | 'REJECTED') => void;

  // Green Impact
  impactStats: GreenImpactStats;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage if available, or fall back to mock data
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('typ_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedRole = localStorage.getItem('typ_current_role') as UserRole;
    if (savedRole) {
      const match = INITIAL_USERS.find(u => u.role === savedRole);
      if (match) return match;
    }
    return INITIAL_USERS[0]; // Customer by default
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('typ_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [offers] = useState<Offer[]>(INITIAL_OFFERS);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('typ_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [feedbackList, setFeedbackList] = useState<Feedback[]>(() => {
    const saved = localStorage.getItem('typ_feedback');
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
  });

  const [partnerApplications, setPartnerApplications] = useState<PartnerApplication[]>(() => {
    const saved = localStorage.getItem('typ_partner_apps');
    return saved ? JSON.parse(saved) : INITIAL_PARTNER_APPLICATIONS;
  });

  const [partnerProfiles, setPartnerProfiles] = useState<PartnerProfile[]>(() => {
    const saved = localStorage.getItem('typ_partner_profiles');
    return saved ? JSON.parse(saved) : INITIAL_PARTNER_PROFILES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('typ_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('typ_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [impactStats, setImpactStats] = useState<GreenImpactStats>(INITIAL_GREEN_IMPACT);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('typ_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('typ_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('typ_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    localStorage.setItem('typ_partner_apps', JSON.stringify(partnerApplications));
  }, [partnerApplications]);

  useEffect(() => {
    localStorage.setItem('typ_cart', JSON.stringify(cart));
  }, [cart]);

  // Toast Helper
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast-' + Date.now();
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Role switching
  const switchUserRole = (role: UserRole) => {
    const match = allUsers.find(u => u.role === role);
    if (match) {
      setCurrentUser(match);
      localStorage.setItem('typ_current_role', role);
      addToast({
        type: 'info',
        title: `Switched Role`,
        message: `Now viewing platform as ${role} (${match.name})`
      });
    }
  };

  const login = (email: string, role?: UserRole) => {
    const match = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase() || (role && u.role === role));
    if (match) {
      setCurrentUser(match);
      localStorage.setItem('typ_current_role', match.role);
      addToast({
        type: 'success',
        title: 'Logged In',
        message: `Welcome back, ${match.name}!`
      });
      return true;
    } else {
      // Auto register mock user
      const newUser: User = {
        id: 'usr-' + Date.now(),
        name: email.split('@')[0],
        email,
        role: role || 'CUSTOMER',
        createdAt: new Date().toISOString()
      };
      setAllUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      addToast({
        type: 'success',
        title: 'Account Created',
        message: `Welcome to Thank You Plants, ${newUser.name}!`
      });
      return true;
    }
  };

  const logout = () => {
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been logged out.'
    });
  };

  const register = (name: string, email: string, role: UserRole, company?: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role,
      company,
      createdAt: new Date().toISOString()
    };
    setAllUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('typ_current_role', role);
    addToast({
      type: 'success',
      title: 'Registration Successful',
      message: `Welcome to Thank You Plants!`
    });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, customization?: CartItem['giftCustomization']) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (customization) {
          updated[existingIndex].giftCustomization = {
            ...updated[existingIndex].giftCustomization,
            ...customization
          };
        }
        return updated;
      }
      return [...prev, { product, quantity, giftCustomization: customization }];
    });
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your gift cart.`
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast({
      type: 'info',
      title: 'Item Removed',
      message: 'Item removed from gift cart.'
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => (item.product.id === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Product CRUD (Partner/Admin)
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    const newProd: Product = {
      ...productData,
      id: 'prod-' + Date.now(),
      rating: 5.0,
      reviewCount: 0
    };
    setProducts(prev => [newProd, ...prev]);
    addToast({
      type: 'success',
      title: 'Product Added',
      message: `${newProd.name} is now active in the catalog.`
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    addToast({
      type: 'success',
      title: 'Product Updated',
      message: 'Product changes saved successfully.'
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast({
      type: 'info',
      title: 'Product Deleted',
      message: 'Product removed from catalog.'
    });
  };

  // Orders & Gifting
  const createOrder = (orderData: {
    recipientName: string;
    recipientEmail: string;
    recipientPhone: string;
    recipientAddress: string;
    giftMessage?: string;
    deliveryDate?: string;
    paymentMethod: string;
    offerId?: string;
    items?: CartItem[];
  }): Order => {
    const itemsToOrder = orderData.items || cart;
    const orderItems: OrderItem[] = itemsToOrder.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.discountPrice || item.product.price,
      quantity: item.quantity,
      image: item.product.images[0],
      potType: item.product.potType,
      careLevel: item.product.careLevel
    }));

    const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = orderData.offerId ? 100 : 0;
    const deliveryFee = subtotal > 1000 ? 0 : 49;
    const total = subtotal - discount + deliveryFee;

    const offerObj = offers.find(o => o.id === orderData.offerId);
    const primaryPartner = products.find(p => p.id === orderItems[0]?.productId)?.seller;

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: 'TYP-' + Math.floor(1000 + Math.random() * 9000),
      customerId: currentUser.id,
      customerName: currentUser.name + (currentUser.company ? ` (${currentUser.company})` : ''),
      recipientName: orderData.recipientName,
      recipientEmail: orderData.recipientEmail,
      recipientPhone: orderData.recipientPhone,
      recipientAddress: orderData.recipientAddress,
      partnerId: primaryPartner?.partnerId || 'part-1',
      partnerName: primaryPartner?.name || 'GreenLeaf Nursery',
      items: orderItems,
      offerId: orderData.offerId,
      offerName: offerObj?.name,
      giftMessage: orderData.giftMessage,
      deliveryDate: orderData.deliveryDate || new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentStatus: 'PAID',
      paymentMethod: orderData.paymentMethod,
      orderStatus: 'NEW',
      orderDate: new Date().toISOString(),
      expectedDeliveryDate: orderData.deliveryDate || new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      trackingHistory: [
        {
          status: 'NEW',
          timestamp: new Date().toLocaleString(),
          note: `Order placed by ${currentUser.name}. Payment verified via ${orderData.paymentMethod}.`
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Increment impact
    setImpactStats(prev => ({
      ...prev,
      totalPlantsGifted: prev.totalPlantsGifted + orderItems.reduce((a, b) => a + b.quantity, 0),
      happyRecipients: prev.happyRecipients + 1
    }));

    addToast({
      type: 'success',
      title: 'Order Placed! 🌱',
      message: `Order ${newOrder.orderNumber} created successfully.`
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updatedHistory = [
            ...ord.trackingHistory,
            {
              status: newStatus,
              timestamp: new Date().toLocaleString(),
              note: note || `Status updated to ${newStatus}`
            }
          ];
          return {
            ...ord,
            orderStatus: newStatus,
            trackingHistory: updatedHistory
          };
        }
        return ord;
      })
    );
    addToast({
      type: 'success',
      title: 'Order Updated',
      message: `Order status set to ${newStatus}.`
    });
  };

  const cancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'CANCELLED', 'Order cancelled by customer');
  };

  // Feedback
  const submitFeedback = (feedbackData: Omit<Feedback, 'id' | 'createdAt' | 'isModerated' | 'isApproved'>) => {
    const newFb: Feedback = {
      ...feedbackData,
      id: 'fb-' + Date.now(),
      createdAt: new Date().toISOString(),
      isModerated: true,
      isApproved: true
    };
    setFeedbackList(prev => [newFb, ...prev]);
    addToast({
      type: 'success',
      title: 'Thank You! 🌱',
      message: 'Your gift feedback has been submitted successfully.'
    });
  };

  const moderateFeedback = (feedbackId: string, isApproved: boolean) => {
    setFeedbackList(prev =>
      prev.map(fb => (fb.id === feedbackId ? { ...fb, isModerated: true, isApproved } : fb))
    );
    addToast({
      type: 'info',
      title: 'Feedback Moderated',
      message: `Feedback ${isApproved ? 'approved' : 'rejected'}.`
    });
  };

  // Partner Applications
  const submitPartnerApplication = (appData: Omit<PartnerApplication, 'id' | 'status' | 'submittedAt'>) => {
    const newApp: PartnerApplication = {
      ...appData,
      id: 'app-' + Date.now(),
      status: 'PENDING',
      submittedAt: new Date().toISOString()
    };
    setPartnerApplications(prev => [newApp, ...prev]);
    addToast({
      type: 'success',
      title: 'Application Received',
      message: 'Your nursery application has been submitted for admin review.'
    });
  };

  const reviewPartnerApplication = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setPartnerApplications(prev => prev.map(app => (app.id === id ? { ...app, status } : app)));

    if (status === 'APPROVED') {
      const app = partnerApplications.find(a => a.id === id);
      if (app) {
        const newPartner: PartnerProfile = {
          id: 'part-' + Date.now(),
          userId: 'usr-part-' + Date.now(),
          businessName: app.businessName,
          ownerName: app.ownerName,
          email: app.email,
          phone: app.phone,
          city: app.city,
          state: app.state,
          address: app.address,
          rating: 5.0,
          reviewCount: 0,
          verificationStatus: 'APPROVED',
          totalProducts: 0,
          activeOrders: 0,
          completedOrders: 0,
          totalRevenue: 0,
          joinedDate: new Date().toISOString().split('T')[0]
        };
        setPartnerProfiles(prev => [...prev, newPartner]);
      }
    }

    addToast({
      type: 'success',
      title: 'Application Updated',
      message: `Partner application ${status.toLowerCase()}.`
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        switchUserRole,
        login,
        logout,
        register,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        offers,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        feedbackList,
        submitFeedback,
        moderateFeedback,
        partnerApplications,
        partnerProfiles,
        submitPartnerApplication,
        reviewPartnerApplication,
        impactStats,
        notifications,
        markNotificationRead,
        toasts,
        addToast,
        removeToast
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
