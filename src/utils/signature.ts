/**
 * Signature Utility Functions
 * Helper functions to manage user signature data
 * 
 * NOTE: Only ONE signature is stored per user.
 * Saving a new signature will REPLACE the existing one.
 */

import { StorageService, STORAGE_KEYS } from './storage';

export interface SignatureData {
  base64: string; // Base64 encoded PNG with data URI prefix
  lastUpdated: string; // When the signature was last saved/updated
}

/**
 * Retrieve the stored user signature
 * @returns SignatureData or null if no signature exists
 */
export const getUserSignature = async (): Promise<SignatureData | null> => {
  try {
    const signature = await StorageService.getItem<SignatureData>(
      STORAGE_KEYS.USER_SIGNATURE
    );
    return signature;
  } catch (error) {
    console.error('Error retrieving signature:', error);
    return null;
  }
};

/**
 * Get signature as Image source for stamp animations
 * @returns Image source object ready to use with React Native Image component
 */
export const getSignatureImageSource = async (): Promise<{ uri: string } | null> => {
  try {
    const signatureData = await getUserSignature();
    if (signatureData && signatureData.base64) {
      return { uri: signatureData.base64 };
    }
    return null;
  } catch (error) {
    console.error('Error getting signature image source:', error);
    return null;
  }
};

/**
 * Check if user has a saved signature
 * @returns true if signature exists, false otherwise
 */
export const hasUserSignature = async (): Promise<boolean> => {
  try {
    const signature = await getUserSignature();
    return signature !== null;
  } catch (error) {
    console.error('Error checking signature existence:', error);
    return false;
  }
};

/**
 * Save or update user signature
 * NOTE: This will REPLACE any existing signature
 * @param base64Signature - Base64 encoded PNG signature
 */
export const saveUserSignature = async (base64Signature: string): Promise<void> => {
  try {
    const signatureData: SignatureData = {
      base64: base64Signature,
      lastUpdated: new Date().toISOString(),
    };
    
    // This overwrites any existing signature - only ONE signature per user
    await StorageService.setItem(STORAGE_KEYS.USER_SIGNATURE, signatureData);
  } catch (error) {
    console.error('Error saving signature:', error);
    throw error;
  }
};

/**
 * Clear the stored user signature
 */
export const clearUserSignature = async (): Promise<void> => {
  try {
    await StorageService.removeItem(STORAGE_KEYS.USER_SIGNATURE);
  } catch (error) {
    console.error('Error clearing signature:', error);
    throw error;
  }
};

