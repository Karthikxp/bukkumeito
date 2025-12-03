// Navigation types
export type RootStackParamList = {
  Main: undefined;
  Profile: undefined;
};

// Export Note type
export { Note } from './Note';

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Common types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: string | null;
}
