/**
 * ProfileScreen - Profile Setup Screen
 * 
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  Dimensions,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import CameraModal from '../components/CameraModal';
import { saveUserProfile, getUserProfile } from '../utils/storage';

const { width, height } = Dimensions.get('window');

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [cameraVisible, setCameraVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const inputContainerPosition = useRef(new Animated.Value(0)).current;
  const cursorOpacity = useRef(new Animated.Value(1)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Load existing profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (profile) {
          setUsername(profile.username);
          setProfileImage(profile.profileImageUri);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    // Blinking cursor animation
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 530,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 530,
          useNativeDriver: true,
        }),
      ])
    );

    if (isFocused) {
      blinkAnimation.start();
    } else {
      blinkAnimation.stop();
      cursorOpacity.setValue(0);
    }

    return () => blinkAnimation.stop();
  }, [isFocused]);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setIsKeyboardVisible(true);
        Animated.spring(inputContainerPosition, {
          toValue: -e.endCoordinates.height + 100,
          useNativeDriver: true,
          friction: 8,
        }).start();
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
        Animated.spring(inputContainerPosition, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
        }).start();
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const triggerShake = () => {
    // Reset animation
    shakeAnimation.setValue(0);
    
    // Shake animation sequence
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleFindFriends = async () => {
    if (!username.trim()) {
      triggerShake();
      return;
    }

    if (isSaving) return;

    try {
      setIsSaving(true);
      // Save profile with either the captured image URI or null (for default avatar)
      await saveUserProfile(username.trim(), profileImage);
      navigation.navigate('FriendsTrack');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = async () => {
    // Save profile even when skipping
    const finalUsername = username.trim() || 'User';

    if (isSaving) return;

    try {
      setIsSaving(true);
      // Save profile with either the captured image URI or null (for default avatar)
      await saveUserProfile(finalUsername, profileImage);
      // TODO: Navigate to main app
      console.log('Profile saved, navigating to main app...');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenCamera = () => {
    setCameraVisible(true);
  };

  const handleCameraClose = () => {
    setCameraVisible(false);
  };

  const handlePhotoCapture = async (uri: string) => {
    setProfileImage(uri);
    // Auto-save profile image when captured
    if (username.trim()) {
      try {
        await saveUserProfile(username.trim(), uri);
      } catch (error) {
        console.error('Error auto-saving profile image:', error);
      }
    }
  };

  const handleClearPhoto = async () => {
    setProfileImage(null);
    // Auto-save to remove profile image
    if (username.trim()) {
      try {
        await saveUserProfile(username.trim(), null);
      } catch (error) {
        console.error('Error auto-saving profile clear:', error);
      }
    }
  };

  const handleUsernameBlur = async () => {
    setIsFocused(false);
    // Auto-save username when user finishes editing
    if (username.trim()) {
      try {
        await saveUserProfile(username.trim(), profileImage);
      } catch (error) {
        console.error('Error auto-saving username:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Logo Small */}
      <View style={styles.logoSmallContainer}>
        <Image 
          source={require('../../Asset/ui/logo_small.png')}
          style={styles.logoSmall}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Bukkumeito</Text>

      {/* Feeling photogenic? */}
      <Text style={styles.subtitle}>Feeling photogenic?</Text>

      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image 
          source={profileImage ? { uri: profileImage } : require('../../Asset/ui/avatar1.png')}
          style={styles.profilePicture}
          resizeMode="cover"
        />
      </View>

      {/* Clear Photo Button - Only show when custom photo is taken */}
      {profileImage && (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearPhoto}
          activeOpacity={0.7}
        >
          <Text style={styles.clearButtonText}>clear</Text>
        </TouchableOpacity>
      )}

      {/* Tap for Selfie */}
      <Text style={styles.tapForSelfie}>Tap for Selfie</Text>

      {/* Dog Icon - Camera Button */}
      <TouchableOpacity 
        style={styles.dogContainer} 
        onPress={handleOpenCamera}
        activeOpacity={0.7}
      >
        <Image 
          source={require('../../Asset/ui/dog.png')}
          style={styles.dogIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Username Input Box */}
      <Animated.View 
        style={[
          styles.usernameBox,
          {
            transform: [
              { translateY: inputContainerPosition },
              { translateX: shakeAnimation },
            ],
          },
          isKeyboardVisible && styles.usernameBoxElevated,
        ]}
      >
        {/* Custom Placeholder */}
        {!username && !isFocused && (
          <Text style={styles.customPlaceholder}>What do you go by?</Text>
        )}
        
        <TextInput
          style={styles.usernameInput}
          value={username}
          onChangeText={setUsername}
          onFocus={() => setIsFocused(true)}
          onBlur={handleUsernameBlur}
          placeholder=""
          autoCorrect={false}
          autoCapitalize="words"
          returnKeyType="done"
          selectionColor="#000000"
          caretHidden={true}
          maxLength={30}
        />
        {isFocused && (
          <Animated.View 
            style={[
              styles.blinkingCursor,
              { opacity: cursorOpacity }
            ]} 
          />
        )}
      </Animated.View>

      {/* Username Help Text */}
      <Text style={styles.usernameHelpText}>
        This username will be shown to others{'\n'}who follow you
      </Text>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        {/* Find Friends Button */}
        <TouchableOpacity 
          style={[styles.findFriendsButton, isSaving && styles.buttonDisabled]} 
          onPress={handleFindFriends}
          activeOpacity={0.8}
          disabled={isSaving}
        >
          <Text style={styles.findFriendsText}>
            {isSaving ? 'Saving...' : 'Find Friends'}
          </Text>
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity 
          style={[styles.skipButton, isSaving && styles.buttonDisabled]} 
          onPress={handleSkip}
          activeOpacity={0.8}
          disabled={isSaving}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Friends Help Text */}
      <Text style={styles.friendsHelpText}>
        Follow users from your contact and{'\n'}connect over your reads
      </Text>

      {/* Camera Modal */}
      <CameraModal
        visible={cameraVisible}
        onClose={handleCameraClose}
        onCapture={handlePhotoCapture}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  logoSmallContainer: {
    position: 'absolute',
    left: width * 0.0833 + (width * 0.0028),
    top: height * 0.1429 + (height * 0.0021),
    width: width * 0.1508,
    height: height * 0.0688,
  },
  logoSmall: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    left: width * 0.0833,
    top: height * 0.0714 + 1.86,
    fontSize: 34.435,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -2.4104,
    fontFamily: 'Inter',
  },
  subtitle: {
    position: 'absolute',
    left: width * 0.4583 - 134,
    top: height * 0.2143 + 4.57,
    fontSize: 34.435,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -2.4104,
    fontFamily: 'Inter',
  },
  profilePictureContainer: {
    position: 'absolute',
    left: width * 0.1667 + (width * 0.0806),
    top: height * 0.2857 + (height * 0.0268),
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  tapForSelfie: {
    position: 'absolute',
    left: width * 0.5417 - 41,
    top: height * 0.5 + 42,
    fontSize: 8,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.08,
    fontFamily: 'Inter',
  },
  clearButton: {
    position: 'absolute',
    left: width * 0.75,
    top: height * 0.485,
    padding: 5,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter',
  },
  dogContainer: {
    position: 'absolute',
    left: width * 0.4167 + (width * 0.0083),
    top: height * 0.5714 + (height * 0.0036),
    width: width * 0.1524,
    height: height * 0.0657,
  },
  dogIcon: {
    width: '100%',
    height: '100%',
  },
  usernameBox: {
    position: 'absolute',
    left: width * 0.0833 + (width * 0.0472),
    top: height * 0.7143 - (height * 0.00054),
    width: width * 0.7389,
    height: height * 0.075,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 97,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.0556,
    paddingVertical: 0,
    overflow: 'visible',
  },
  usernameBoxElevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  usernameInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -1.26,
    fontFamily: 'Inter',
    flex: 1,
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: width * 0.0139,
    height: height * 0.075,
    lineHeight: 22,
  },
  customPlaceholder: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
    letterSpacing: -0.98,
    fontFamily: 'Inter',
    textAlign: 'center',
    alignSelf: 'center',
    pointerEvents: 'none',
  },
  blinkingCursor: {
    width: 2,
    height: 24,
    backgroundColor: '#000000',
    marginLeft: 2,
  },
  usernameHelpText: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.7857 + 12.43,
    fontSize: 9,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: -0.63,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    left: width * 0.0833 + (width * 0.0472),
    top: height * 0.7857 + (height * 0.068),
    width: width * 0.7389,
    height: height * 0.075,
    flexDirection: 'row',
  },
  findFriendsButton: {
    width: width * 0.4528,
    height: height * 0.075,
    backgroundColor: '#000000',
    borderTopLeftRadius: 97,
    borderBottomLeftRadius: 97,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findFriendsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -1,
    fontFamily: 'Inter',
  },
  skipButton: {
    width: width * 0.2861,
    height: height * 0.075,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    borderTopRightRadius: 97,
    borderBottomRightRadius: 97,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1,
    fontFamily: 'Inter',
  },
  friendsHelpText: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.9286 + 10.14,
    fontSize: 9,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: -0.63,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default ProfileScreen;

