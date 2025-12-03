/**
 * BukkumeitoApp - React Native Mobile Application
 * 
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Bukkumeito</Text>
      
      {/* Logo - ShapeLax Animation */}
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <WebView
            source={{ uri: 'https://davvcdn.lon1.cdn.digitaloceanspaces.com/6a35f22287536191e502392b00ce6431/fa3b59e36cc29a4ecd99.html' }}
            style={styles.logo}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            originWhitelist={['*']}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            bounces={false}
            allowsInlineMediaPlayback={true}
          />
        </View>
      </View>
      
      {/* Tagline */}
      <Text style={styles.tagline}>Books, your way</Text>
      
      {/* Enter Setup Button */}
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: '600', fontFamily: 'Inter', letterSpacing: -1.26 }}>Enter Setup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  title: {
    position: 'absolute',
    width: '100%',
    top: height * 0.2143 + 23.57,
    fontSize: 34.435,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -2.4104,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  logoContainer: {
    position: 'absolute',
    left: (width - 182) / 2,
    top: height * 0.3571 + 23.29,
    width: 182,
    height: 182.3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    width: 250,
    height: 250,
    transform: [{ scale: 0.728 }],
  },
  logo: {
    width: 250,
    height: 250,
    backgroundColor: 'transparent',
  },
  tagline: {
    position: 'absolute',
    width: '100%',
    top: height * 0.7143 - 0.43,
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -1.26,
    fontFamily: 'General Sans',
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    left: '50%',
    top: height * 0.7857 + 56.43,
    width: 266,
    height: 60,
    backgroundColor: '#000000',
    borderRadius: 97,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    transform: [{ translateX: -133 }],
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -1.26,
    fontFamily: 'Inter',
  },
});

export default App;
