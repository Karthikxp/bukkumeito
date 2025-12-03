/**
 * BukkumeitoApp - React Native Mobile Application
 * 
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={[styles.title, { textAlign: 'center', fontSize: 34.435, fontWeight: '700', letterSpacing: -2 }]}>Bukkumeito</Text>
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('./Asset/ui/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      {/* Tagline */}
      <Text style={styles.tagline}>Books, your way</Text>
      
      {/* Enter Setup Button */}
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Enter Setup</Text>
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
    left: width * 0.25,
    top: height * 0.2143 + 23.57,
    fontSize: 34.435,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -2.4104,
    fontFamily: 'Inter',
  },
  logoContainer: {
    position: 'absolute',
    left: width * 0.25,
    top: height * 0.3571 + 23.29,
    width: 180,
    height: 182.304,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  tagline: {
    position: 'absolute',
    left: width * 0.375 - 13,
    top: height * 0.7143 - 0.43,
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -1.26,
    fontFamily: 'General Sans',
  },
  button: {
    position: 'absolute',
    left: 47,
    top: height * 0.7857 + 56.43,
    width: 266,
    height: 60,
    backgroundColor: '#000000',
    borderRadius: 97,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
