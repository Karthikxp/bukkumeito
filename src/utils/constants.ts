// App configuration
export const APP_CONFIG = {
  APP_NAME: 'BukkumeitoApp',
  VERSION: '1.0.0',
  API_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  BASE_URL: 'https://api.example.com',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    DELETE: '/user/delete',
  },
} as const;

// Screen dimensions and spacing
export const DIMENSIONS = {
  SCREEN_PADDING: 20,
  BORDER_RADIUS: 12,
  BUTTON_HEIGHT: 50,
  INPUT_HEIGHT: 44,
} as const;

// Colors
export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#5856D6',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  ERROR: '#FF3B30',
  BACKGROUND: '#f8f9fa',
  CARD_BACKGROUND: '#ffffff',
  TEXT_PRIMARY: '#333333',
  TEXT_SECONDARY: '#666666',
  TEXT_TERTIARY: '#999999',
  BORDER: '#f0f0f0',
} as const;

// Typography
export const TYPOGRAPHY = {
  FONT_SIZE: {
    SMALL: 12,
    REGULAR: 14,
    MEDIUM: 16,
    LARGE: 18,
    XLARGE: 24,
    XXLARGE: 28,
  },
  FONT_WEIGHT: {
    REGULAR: '400' as const,
    MEDIUM: '500' as const,
    SEMIBOLD: '600' as const,
    BOLD: '700' as const,
  },
} as const;

// Animation durations
export const ANIMATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;
