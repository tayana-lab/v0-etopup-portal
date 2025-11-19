// Application configuration constants

export const APP_CONFIG = {
  appName: 'CWS eTopup Portal',
  version: '1.0.0',
  supportEmail: 'support@cwseychelles.com',
  supportPhone: '+248 2999000',
  emergencyPhone: '+248 2999111',
  customerServicePhone: '+248 2999222',
  officeAddress: 'Francis Rachel Street, Victoria, Mahé, Seychelles',
  officeMapUrl: 'https://maps.app.goo.gl/NcrhrFV9kwxF78Rg6',
  websiteUrl: 'https://www.cwseychelles.com/',
  businessHours: {
    weekdays: 'Monday - Friday: 8:00 AM - 5:00 PM',
    saturday: 'Saturday: 9:00 AM - 1:00 PM',
    sunday: 'Sunday: Closed',
  },

  // API Configuration
   apiBaseUrl: 'https://etopupmobileserver.tayana.in',
//  apiBaseUrl: 'https://etopapptesting.tayana.in',
  // apiBaseUrl: 'http://10.0.5.165:3001',
  apiTimeout: 10000,
  encryptionKey: ` -----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqfSNrw7tpBJ1T9jD4KlT krtxQMmZhSw9vj2aRW6q9zwgEJ7ClJuS7Xiv1wlfDusH1UotsDGsgCYrxiAF+rRn cMpan+TVNxJR947cRh1nJ+52nlclUIYJtjj87vzUo7FD4T41GLa6V0DELIDeDWzB kMkBZxTy9tbO1Ii6NK0nDBKDrbFkMLorBo7hdP45eSanviA8ZmA6jndSrLPJmCcU KDx28asgeVGFF6kWpEEmT1dU04fzFn8w2cjL+0ou/UeXAm6N3Diy9UVXAO0Xufzy AOfj2jfFbFaKZaNT9m8dHyUfX+EmwHCNjlysEuZBB6TCbp19uIedK1UOHcJ7biN7 bxR/PeEFMQTwLOHcpJhZGbo6o2jqBkTgx2hUFQ6pNKSrYI3cD4XUw1dHFleNpkBX WcXhVe1A/umug6LljvfRYWJnGbywQl8qqrkWPhMoG0EFmYuJQkz3qufFoLXWUN9Z 2rU0G5Nll0UWEx4qHwr50OpWTLx+YlNLmRAbfnT6v3QhfMwOkKcLGeIQlBoN+tsR 21IX8Y1iwVh45fzn2PrH+I4sXTsvWXSaE8U3ZqtrvXJbVaNq0qgqWwBdnP/JX9er 0ueaEQby3IFdKDesy5n07QXlA8gpAcm5C953LurI2z/mTUswtFqnFxvVzKrbWWnk h/+/D5uHMgV9yR4VI9b+nHUCAwEAAQ== -----END PUBLIC KEY----- `,
  // UI Configuration
  backgroundImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=800&fit=crop',

  apiData: {
    delearNumber: "9673526202",
    delearPin: 1111
  },

  agentData: {
    agentName: "Test Dealer",
    agentMsisdn: "9971475147",
    agentLocation: "13.6347648,79.429632",
  },

  // Dashboard Configuration
  dashboard: {
    marketingAds: {
      autoScrollInterval: 5000, // 5 seconds
      showIndicators: true,
    },
  },

  walletAliasConfig: {
    "Topup": "Recharge",
    "Utility Pay": "BillPay"
  },

  menuIcons: {
    itemsPerRow: 3,
    showNotificationBadge: true,
  },

  // Navigation Configuration
  bottomNavigation: {
    iconCount: 5,
    showLabels: true,
  },

  // Loading Configuration
  loadingTimeout: 1000, // Show loader after 1 second

  // Regular Expressions
  regex: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s\-$$$$]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    name: /^[a-zA-Z\s]{2,50}$/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    numeric: /^\d+$/,
    pin: /^\d{6}$/,
    otp: /^\d{4,6}$/,
  },

  // Validation Messages
  validation: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    weakPassword: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    invalidName: 'Name must be 2-50 characters and contain only letters',
    invalidPin: 'PIN must be exactly 6 digits',
    invalidOtp: 'OTP must be 4-6 digits',
    pinMismatch: 'PINs do not match',
  },

  // Feature Flags
  features: {
    notifications: true,
    darkMode: false,
    biometricAuth: true,
    analytics: true,
    thresholdNotifications: true,
  },

  // Authentication Configuration
  auth: {
    pinLength: 6,
    otpLength: 6,
    otpExpiryMinutes: 5,
    maxLoginAttempts: 3,
    lockoutDurationMinutes: 15,
    biometricPromptTitle: 'Authenticate',
    biometricPromptSubtitle: 'Use your biometric to access the app',
    biometricPromptDescription: 'Place your finger on the sensor or look at the camera',
    biometricFallbackLabel: 'Use PIN',
  },

  // Marketing Ads Data
  marketingAdsData: [
    {
      id: '1',
      title: 'Special Offer',
      description: 'Get 20% off on your first order',
      image: 'https://images.unsplash.com/photo-1556742049-bebda4e38f71?w=400&h=200&fit=crop',
      action: 'offer-details',
      actionData: { offerId: 'FIRST20' },
    },
    {
      id: '2',
      title: 'New Features',
      description: 'Discover our latest updates',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e36e44?w=400&h=200&fit=crop',
      action: 'feature-tour',
      actionData: { tourId: 'latest-features' },
    },
    {
      id: '3',
      title: 'Premium Membership',
      description: 'Unlock exclusive benefits',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop',
      action: 'premium-signup',
      actionData: { plan: 'premium' },
    },
  ],

  // Pagination
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },

  // Cache Configuration
  cache: {
    userDataTTL: 24 * 60 * 60 * 1000, // 24 hours
    appDataTTL: 60 * 60 * 1000, // 1 hour
  },

  // Notifications Configuration
  notifications: {
    maxDisplayLimit: 50, // Maximum notifications to display
    searchMinLength: 2, // Minimum characters to start searching
    thresholdNotification: {
      enabled: true,
      balanceThreshold: 100, // SCR - Show notification when balance is below this
      dataThreshold: 10, // Percentage - Show notification when data usage is above this percentage
      showOnLogin: true,
      title: 'Account Alert',
      balanceMessage: 'Your account balance is running low. Consider topping up to avoid service interruption.',
      dataMessage: 'You have used most of your data allowance. Consider upgrading your plan or purchasing additional data.',
    },
  },
} as const

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
} as const

export const AUTH_CONFIG = {
  otpLength: 6,
  passwordMinLength: 6,
  mobileNumberLength: 7,
  sessionTimeout: 3600000, // 1 hour in milliseconds
} as const

export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
} as const

export const AppConfig = APP_CONFIG
