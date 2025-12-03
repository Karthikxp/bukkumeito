/**
 * AchievementShowScreen - Achievement Showcase
 * 
 * @format
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useFonts, Cormorant_400Regular } from '@expo-google-fonts/cormorant';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

const { width, height } = Dimensions.get('window');

type AchievementShowScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AchievementShow'>;
};

const AchievementShowScreen: React.FC<AchievementShowScreenProps> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Cormorant_400Regular,
  });

  const handleStartReading = () => {
    // TODO: Navigate to main app
  };

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Logo Small - positioned at left: 8.33% + 1px, top: 14.29% + 1.71px */}
      <View style={styles.logoSmallContainer}>
        <Image 
          source={require('../../Asset/ui/logo_small.png')}
          style={styles.logoSmall}
          resizeMode="contain"
        />
      </View>

      {/* Title - positioned at left: 8.33%, top: 7.14% + 1.86px */}
      <Text style={styles.title}>Bukkumeito</Text>

      {/* "Look out for" - positioned at left: 8.33% + 1px, top: 21.43% + 4.57px */}
      <Text style={styles.lookOutForText}>Look out for</Text>

      {/* Bukkumeito Stamp - rotated badge positioned around center-left */}
      <View style={styles.bukkumeitoStampContainer}>
        <Image 
          source={require('../../Asset/ui/bukkumeito_stamp.png')}
          style={styles.bukkumeitoStamp}
          resizeMode="contain"
        />
      </View>

      {/* "Customised Achievement Badges" heading - left side, Cormorant font */}
      <View style={styles.customisedBadgesContainer}>
        <Text style={styles.boskaHeading}>Customised</Text>
        <Text style={styles.boskaHeading}>Achievement</Text>
        <Text style={styles.boskaHeading}>Badges</Text>
      </View>

      {/* Help text for customised badges */}
      <View style={styles.customisedHelpTextContainer}>
      <Text style={[styles.helpText, { textAlign: 'right' }]}>
      Stamp your book after your reads{'\n'}
          and get awarded badges based on your Reads
        </Text>
      </View>

      {/* Friends Stamp - rotated badge positioned lower-right */}
      <View style={[styles.friendsStampContainer, { opacity: 0.85 }]}>
        <Image 
          source={require('../../Asset/ui/friends_stamp.png')}
          style={styles.friendsStamp}
          resizeMode="contain"
        />
      </View>

      {/* "Fresh from Your friend's shelves" heading - right side, Cormorant font */}
      <View style={styles.freshFromContainer}>
        <Text style={styles.boskaHeadingRight}>Fresh from</Text>
        <Text style={styles.boskaHeadingRight}>Your friend's</Text>
        <Text style={styles.boskaHeadingRight}>shelves</Text>
      </View>

      {/* Help text for friends */}
      <View style={styles.friendsHelpTextContainer}>
        <Text style={styles.helpText}>
          Look up to your friends reads,{'\n'}
          and connect via suggestions and feed
        </Text>
      </View>

      {/* "and much more" heading - bottom right, Cormorant font */}
      <View style={styles.muchMoreContainer}>
        <Text style={styles.boskaHeadingRight}>and much more</Text>
      </View>

      {/* Complete Setup Button - positioned at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleStartReading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Complete Setup</Text>
        </TouchableOpacity>
      </View>

      {/* Final text at bottom */}
      <Text style={styles.finalText}>
        thats it! get on with your reading habit.
      </Text>
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
    top: height * 0.1429 + (height * 0.0021),
    width: 54,
    height: 54.691,
  },
  logoSmall: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    left: width * 0.0833,
    top: height * 0.0714 + (height * 0.0023),
    fontSize: 34.435,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -2.4104,
    fontFamily: 'Inter',
  },
  lookOutForText: {
    position: 'absolute',
    left: width * 0.0833 + 1,
    top: height * 0.2143 + (height * 0.0057),
    fontSize: 34.435,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -2.4104,
    fontFamily: 'Inter',
  },
  bukkumeitoStampContainer: {
    position: 'absolute',
    left: width * 0.539,
    top: height * 0.3276,
    width: 123.52,
    height: 123.12,
    transform: [{ rotate: '25.381deg' }],
  },
  bukkumeitoStamp: {
    width: '100%',
    height: '100%',
  },
  customisedBadgesContainer: {
    position: 'absolute',
    left: width * 0.0833 + 1,
    top: height * 0.2857 + (height * 0.0606),
  },
  boskaHeading: {
    fontSize: 33.327,
    color: '#000000',
    letterSpacing: -2.3329,
    fontFamily: 'Cormorant_400Regular',
    lineHeight: 40,
  },
  customisedHelpTextContainer: {
    position: 'absolute',
    left: width * 0.4167 + 160,
    top: height * 0.4386 + (height * 0.039),
    transform: [{ translateX: -177 }],
    width: 200,
  },
  friendsStampContainer: {
    position: 'absolute',
    left: width * 0.1306,
    top: height * 0.545,
    width: 125.33,
    height: 124.86,
    transform: [{ rotate: '22.395deg' }],
  },
  friendsStamp: {
    width: '100%',
    height: '100%',
  },
  freshFromContainer: {
    position: 'absolute',
    right: width * 0.1667 - 151,
    top: height * 0.5 + 50,
  },
  boskaHeadingRight: {
    fontSize: 33.33,
    color: '#000000',
    right: 115,
    letterSpacing: -2.3331,
    fontFamily: 'Cormorant_400Regular',
    lineHeight: 40,
    textAlign: 'right',
  },
  friendsHelpTextContainer: {
    position: 'absolute',
    left: width * 0.0833 + 1,
    top: height * 0.6529 + (height * 0.0409),
    width: 185,
  },
  muchMoreContainer: {
    position: 'absolute',
    right: width * 0.1667 - 108,
    top: height * 0.7143 + (height * 0.0245),
  },
  helpText: {
    fontSize: 9,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: -0.63,
    fontFamily: 'Inter',
    lineHeight: 10.91,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 55,
    alignItems: 'center',
  },
  button: {
    width: 191,
    height: 60,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1,
    fontFamily: 'Inter',
  },
  finalText: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.9286 + (height * 0.0352),
    fontSize: 9,
    fontWeight: '300',
    color: '#000000',
    lineHeight: 10.91,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
});

export default AchievementShowScreen;

