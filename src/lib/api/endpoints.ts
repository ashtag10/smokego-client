export const API_ENDPOINTS = {
  // Auth
  auth: {
    register: '/auth/register',
    verifyOtp: '/auth/verify-otp',
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },

  // Users
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    addresses: '/users/addresses',
    address: (id: string) => `/users/addresses/${id}`,
    account: '/users/account',
    stats: '/users/stats',
  },

  // Products
  products: {
    list: '/products',
    featured: '/products/featured',
    popular: '/products/popular',
    newArrivals: '/products/new-arrivals',
    search: '/products/search',
    detail: (id: string) => `/products/${id}`,
    stock: (id: string) => `/products/${id}/stock`,
    byCategory: (categorySlug: string) => `/products/category/${categorySlug}`,
    categoryFilters: (slug: string) => `/products/category/${slug}/filters`,
  },

  // Reviews
  reviews: {
    list: (productId: string) => `/reviews/product/${productId}`,
    create: '/reviews',
    delete: (id: string) => `/reviews/${id}`,
  },

  // Cart
  cart: {
    get: '/cart',
    add: '/cart/add',
    item: (id: string) => `/cart/items/${id}`,
    clear: '/cart',
  },

  // Orders
  orders: {
    list: '/orders/my-orders',
    detail: (id: string) => `/orders/${id}`,
    checkout: '/orders/checkout',
    cancel: (id: string) => `/orders/${id}/cancel`,
    repeat: (id: string) => `/orders/${id}/repeat`,
    admin: '/orders',
    assignDriver: (id: string) => `/orders/${id}/assign-driver`,
    status: (id: string) => `/orders/${id}/status`,
  },

  // Payments
  payments: {
    initiate: '/payments/cinetpay/initialize',
    status: (id: string) => `/payments/${id}/status`,
    refund: (id: string) => `/payments/${id}/refund`,
  },

  // Delivery
  delivery: {
    available: '/delivery/available',
    myDeliveries: '/delivery/my-deliveries',
    accept: (id: string) => `/delivery/${id}/accept`,
    status: (id: string) => `/delivery/${id}/status`,
    stats: '/delivery/stats',
    track: (orderId: string) => `/delivery/track/${orderId}`,
    zones: '/delivery/zones',
    zone: (id: string) => `/delivery/zones/${id}`,
  },

  // Reservations
  reservations: {
    list: '/reservations/my-reservations',
    create: '/reservations',
    detail: (id: string) => `/reservations/${id}`,
    cancel: (id: string) => `/reservations/${id}/cancel`,
    qrCode: (id: string) => `/reservations/${id}/qr-code`,
    confirm: (id: string) => `/reservations/${id}/confirm`,
    reject: (id: string) => `/reservations/${id}/reject`,
    noShow: (id: string) => `/reservations/${id}/no-show`,
    checkIn: '/reservations/check-in',
    tables: '/reservations/tables',
    table: '/reservations/tables',
  },

  // Loyalty
  loyalty: {
    points: '/loyalty/points',
    vipStatus: '/loyalty/vip-status',
    redeem: '/loyalty/redeem',
    settings: '/loyalty/settings',
    evaluate: '/loyalty/evaluate',
    revoke: (userId: string) => `/loyalty/revoke/${userId}`,
  },

  // Notifications
  notifications: {
    list: '/notifications',
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
    delete: (id: string) => `/notifications/${id}`,
  },

  // Media
  media: {
    image: '/media/image',
    video: '/media/video',
  },

  // Admin
  admin: {
    dashboard: '/admin/stats/dashboard',
    revenueByCategory: '/admin/stats/revenue-by-category',
    topProducts: '/admin/stats/top-products',
    driverPerformance: '/admin/stats/driver-performance',
    auditLog: '/admin/audit-log',
  },


    // Categories
  categories: {
    menu: '/categories/menu',
    list: '/categories',
    detail: (id: string) => `/categories/${id}`,
    bySlug: (slug: string) => `/categories/slug/${slug}`,
    
  },

  // Slides
  slides: {
    list: '/slides',
    admin: '/slides/admin',
    detail: (id: string) => `/slides/${id}`,
  },

  // Stories
  stories: {
    list: '/stories',
    admin: '/stories/admin',
    detail: (id: string) => `/stories/${id}`,
    items: (id: string) => `/stories/${id}/items`,
    item: (id: string, itemId: string) => `/stories/${id}/items/${itemId}`,
  },
} as const