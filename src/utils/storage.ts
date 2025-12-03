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
  APP_SETTINGS: '@app_settings',
  THEME_PREFERENCE: '@theme_preference',
  ONBOARDING_COMPLETED: '@onboarding_completed',
} as const;
