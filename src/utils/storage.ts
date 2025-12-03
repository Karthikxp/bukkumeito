import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  /**
   * Store a value in AsyncStorage
   */
  static async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieve a value from AsyncStorage
   */
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove a value from AsyncStorage
   */
  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Clear all AsyncStorage data
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all keys from AsyncStorage
   */
  static async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      throw error;
    }
  }
}

// Storage keys constants
export const STORAGE_KEYS = {
  USER_DATA: '@user_data',
  USER_PROFILE: '@user_profile',
  APP_SETTINGS: '@app_settings',
  THEME_PREFERENCE: '@theme_preference',
  ONBOARDING_COMPLETED: '@onboarding_completed',
  USER_SIGNATURE: '@user_signature',
} as const;

// User profile interface
export interface UserProfile {
  username: string;
  profileImageUri: string | null; // null means use default avatar
  createdAt: string;
  updatedAt: string;
}

/**
 * Save user profile data
 * Preserves createdAt if profile already exists, otherwise creates new timestamp
 */
export const saveUserProfile = async (username: string, profileImageUri: string | null): Promise<void> => {
  try {
    const existingProfile = await getUserProfile();
    const now = new Date().toISOString();
    
    const profile: UserProfile = {
      username,
      profileImageUri,
      createdAt: existingProfile?.createdAt || now,
      updatedAt: now,
    };
    await StorageService.setItem(STORAGE_KEYS.USER_PROFILE, profile);
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

/**
 * Get user profile data
 */
export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    return await StorageService.getItem<UserProfile>(STORAGE_KEYS.USER_PROFILE);
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

/**
 * Update user profile image
 */
export const updateProfileImage = async (profileImageUri: string | null): Promise<void> => {
  try {
    const existingProfile = await getUserProfile();
    if (existingProfile) {
      existingProfile.profileImageUri = profileImageUri;
      existingProfile.updatedAt = new Date().toISOString();
      await StorageService.setItem(STORAGE_KEYS.USER_PROFILE, existingProfile);
    }
  } catch (error) {
    console.error('Error updating profile image:', error);
    throw error;
  }
};

/**
 * Update username
 */
export const updateUsername = async (username: string): Promise<void> => {
  try {
    const existingProfile = await getUserProfile();
    if (existingProfile) {
      existingProfile.username = username;
      existingProfile.updatedAt = new Date().toISOString();
      await StorageService.setItem(STORAGE_KEYS.USER_PROFILE, existingProfile);
    }
  } catch (error) {
    console.error('Error updating username:', error);
    throw error;
  }
};
