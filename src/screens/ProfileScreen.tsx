/**
 * ProfileScreen - Profile Setup Screen
 * 
 * @format
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import CameraModal from '../components/CameraModal';

const { width, height } = Dimensions.get('window');

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('Franz Hermann');
  const [cameraVisible, setCameraVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleFindFriends = () => {
    // TODO: Navigate to friends screen
    console.log('Find Friends pressed');
  };

  const handleSkip = () => {
    // TODO: Navigate to main app
    console.log('Skip pressed');
  };

  const handleOpenCamera = () => {
    setCameraVisible(true);
  };

  const handleCameraClose = () => {
    setCameraVisible(false);
  };

  const handlePhotoCapture = (uri: string) => {
    setProfileImage(uri);
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.usernameBox}>
        <TextInput
          style={styles.usernameInput}
          value={username}
          onChangeText={setUsername}
          placeholder="Your Name"
          placeholderTextColor="#999"
        />
        <View style={styles.indicator} />
      </View>

      {/* Username Help Text */}
      <Text style={styles.usernameHelpText}>
        This username will be shown to others{'\n'}who follow you
      </Text>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        {/* Find Friends Button */}
        <TouchableOpacity 
          style={styles.findFriendsButton} 
          onPress={handleFindFriends}
          activeOpacity={0.8}
        >
          <Text style={styles.findFriendsText}>Find Friends</Text>
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={handleSkip}
          activeOpacity={0.8}
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
    </View>
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
    left: width * 0.0833 + 1,
    top: height * 0.1429 + 1.71,
    width: 54.305,
    height: 55,
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
    left: width * 0.1667 + 29,
    top: height * 0.2857 + 21.43,
    width: 180,
    height: 180,
    borderRadius: 90,
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
  dogContainer: {
    position: 'absolute',
    left: width * 0.4167 + 3,
    top: height * 0.5714 + 2.86,
    width: 54.876,
    height: 52.536,
  },
  dogIcon: {
    width: '100%',
    height: '100%',
  },
  usernameBox: {
    position: 'absolute',
    left: width * 0.0833 + 17,
    top: height * 0.7143 - 0.43,
    width: 266,
    height: 60,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 97,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 73,
    paddingVertical: 19,
  },
  usernameInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -1.26,
    fontFamily: 'Inter',
    flex: 1,
    textAlign: 'center',
  },
  indicator: {
    width: 1,
    height: 34,
    backgroundColor: '#000000',
    marginLeft: 10,
  },
  usernameHelpText: {
    position: 'absolute',
    left: width * 0.5417 - 14.5,
    top: height * 0.7857 + 12.43,
    fontSize: 9,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: -0.63,
    fontFamily: 'Inter',
    textAlign: 'center',
    transform: [{ translateX: -63.5 }],
  },
  buttonsContainer: {
    position: 'absolute',
    left: width * 0.0833 + 17,
    top: height * 0.7857 + 54.43,
    width: 266,
    height: 60,
    flexDirection: 'row',
  },
  findFriendsButton: {
    width: 163,
    height: 60,
    backgroundColor: '#000000',
    borderTopLeftRadius: 97,
    borderBottomLeftRadius: 97,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findFriendsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -1.26,
    fontFamily: 'Inter',
  },
  skipButton: {
    width: 103,
    height: 60,
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
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -1.26,
    fontFamily: 'Inter',
  },
  friendsHelpText: {
    position: 'absolute',
    left: width * 0.5417 - 14.5,
    top: height * 0.9286 + 10.14,
    width: 150,
    fontSize: 9,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: -0.63,
    fontFamily: 'Inter',
    textAlign: 'center',
    transform: [{ translateX: -63.5 }],
  },
});

export default ProfileScreen;

