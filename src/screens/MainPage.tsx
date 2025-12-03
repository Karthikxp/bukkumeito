/**
 * MainPage - Main application screen
 * 
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { getUserProfile } from '../utils/storage';

const { width, height } = Dimensions.get('window');

type MainPageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'MainPage'>;
};

const MainPage: React.FC<MainPageProps> = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      if (profile) {
        setUsername(profile.username);
        setProfileImage(profile.profileImageUri);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const handleAddBook = () => {
    // TODO: Implement add book functionality
    console.log('Add book pressed');
  };

  const handleModeSwitch = () => {
    // TODO: Implement mode switch functionality
    console.log('Mode switch pressed');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
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

      {/* Profile Picture */}
      <TouchableOpacity
        style={styles.profilePictureContainer}
        onPress={handleProfilePress}
        activeOpacity={0.7}
      >
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../Asset/ui/avatar1.png')
          }
          style={styles.profilePicture}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Mode Switch - Your Collection */}
      <TouchableOpacity
        style={styles.modeSwitchContainer}
        onPress={handleModeSwitch}
        activeOpacity={0.8}
      >
        <View style={styles.modeSwitchButton}>
          <Text style={styles.modeSwitchText}>Your Collection</Text>
          <View style={styles.dropdownArrow}>
            <Text style={styles.dropdownArrowText}>▼</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Continue Reading Section */}
      <Text style={styles.continueReadingTitle}>Continue Reading</Text>

      {/* Reading Frame - Horizontal Scroll */}
      <View style={styles.readingFrameWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.readingFrame}
          contentContainerStyle={styles.readingFrameContent}
        >
          {/* Add a Book Card */}
          <TouchableOpacity
            style={styles.addBookCard}
            onPress={handleAddBook}
            activeOpacity={0.7}
          >
          <Text style={styles.addBookTitle}>Add a Book</Text>

          {/* Plus Sign */}
          <Text style={styles.plusSign}>+</Text>

            {/* Import Text */}
            <Text style={styles.importText}>import PDF or EPUB</Text>
          </TouchableOpacity>

          {/* Placeholder for more books */}
          {/* Additional book cards can be added here */}
        </ScrollView>

        {/* Embedded WebView - Absolute positioned overlay */}
        <View style={styles.embeddedBox} pointerEvents="none">
          <WebView
            source={{ uri: 'https://davvcdn.lon1.cdn.digitaloceanspaces.com/6a35f22287536191e502392b00ce6431/7425cbadee753504ccf8.html' }}
            style={styles.embeddedWebView}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            originWhitelist={['*']}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            bounces={false}
            allowsInlineMediaPlayback={true}
            scalesPageToFit={false}
            allowsLinkPreview={false}
            injectedJavaScript={`
              const meta = document.createElement('meta');
              meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
              meta.setAttribute('name', 'viewport');
              document.getElementsByTagName('head')[0].appendChild(meta);
              
              document.addEventListener('gesturestart', function(e) {
                e.preventDefault();
              });
              document.addEventListener('touchmove', function(e) {
                if (e.scale !== 1) { e.preventDefault(); }
              }, { passive: false });
            `}
          />
        </View>

        {/* Border Overlay - On top of everything */}
        <View style={styles.borderOverlay} pointerEvents="none" />
      </View>

      {/* Suggestions Section */}
      <Text style={styles.suggestionsTitle}>Suggestions</Text>

      {/* Suggested Frame - Vertical Scroll */}
      <ScrollView
        style={styles.suggestedFrame}
        contentContainerStyle={styles.suggestedFrameContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Suggested books will be added here */}
        {/* Placeholder for suggested content */}
      </ScrollView>
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
    left: width * 0.0833,
    top: 21,
    width: 36.189,
    height: 36.653,
  },
  logoSmall: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    left: width * 0.4167,
    top: 24,
    fontSize: 34.435,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -2.4104,
    fontFamily: 'Inter',
  },
  profilePictureContainer: {
    position: 'absolute',
    left: width * 0.75 + 3,
    top: height * 0.0714 + 30.64,
    width: 57,
    height: 57,
    borderRadius: 28.5,
    overflow: 'hidden',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  modeSwitchContainer: {
    position: 'absolute',
    left: 29,
    top: height * 0.0714 + 32.64,
  },
  modeSwitchButton: {
    backgroundColor: '#000000',
    height: 54.025,
    width: 210,
    borderRadius: 41.826,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modeSwitchText: {
    fontSize: 19.959,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -1.3971,
    fontFamily: 'Inter',
    marginRight: 8,
  },
  dropdownArrow: {
    marginLeft: 4,
  },
  dropdownArrowText: {
    fontSize: 10,
    color: '#ffffff',
  },
  continueReadingTitle: {
    position: 'absolute',
    left: 29,
    top: height * 0.2143 + 9.93,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1.4,
    fontFamily: 'Inter',
  },
  readingFrameWrapper: {
    position: 'absolute',
    left: 0,
    top: height * 0.2143 + 28.93,
    width: width,
    height: 295,
  },
  readingFrame: {
    width: width,
    height: 295,
  },
  readingFrameContent: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 34,
  },
  addBookCard: {
    width: 159,
    height: 227,
    position: 'relative',
    marginRight: 20,
  },
  addBookTitle: {
    position: 'absolute',
    left: 40,
    top: 35,
    fontSize: 15.584,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1.0909,
    fontFamily: 'Inter',
  },
  plusSign: {
    position: 'absolute',
    left: 62,
    top: 131,
    fontSize: 53.761,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: -3.7633,//inter thin
    fontFamily: 'Inter-Thin',
  },
  importText: {
    position: 'absolute',
    left: 32,
    top: 204,
    fontSize: 11.129,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.779,
    fontFamily: 'Inter',
  },
  embeddedBox: {
    position: 'absolute',
    left: 30,
    top: 104,
    width: 159,
    height: 106,
    overflow: 'hidden',
  },
  embeddedWebView: {
    width: 159,
    height: 106,
    backgroundColor: 'transparent',
  },
  borderOverlay: {
    position: 'absolute',
    left: 30,
    top: 34,
    width: 159,
    height: 227,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#000000',
  },
  suggestionsTitle: {
    position: 'absolute',
    left: 29,
    top: height * 0.6429 + 1.79,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1.4,
    fontFamily: 'Inter',
  },
  suggestedFrame: {
    position: 'absolute',
    left: 0,
    top: height * 0.6429 + 20.79,
    width: width,
    height: 271,
  },
  suggestedFrameContent: {
    paddingHorizontal: 30,
  },
});

export default MainPage;

