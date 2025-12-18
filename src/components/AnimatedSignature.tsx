/**
 * AnimatedSignature Component
 * Displays a signature with a handwritten drawing animation effect
 * 
 * @format
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface AnimatedSignatureProps {
  signatureUri: string;
  width: number;
  height: number;
  isAnimating: boolean;
  onAnimationComplete?: () => void;
}

const AnimatedSignature: React.FC<AnimatedSignatureProps> = ({
  signatureUri,
  width,
  height,
  isAnimating,
  onAnimationComplete,
}) => {
  const animationProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAnimating) {
      // Reset animation
      animationProgress.setValue(0);

      // Animate with a faster handwriting effect
      Animated.timing(animationProgress, {
        toValue: 1,
        duration: 800, // Reduced from 1500ms to 800ms for faster animation
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished && onAnimationComplete) {
          onAnimationComplete();
        }
      });
    }
  }, [isAnimating]);


  return (
    <View style={[styles.container, { width, height }]}>
      {/* Base signature image with animated clip/reveal */}
      <Animated.Image
        source={{ uri: signatureUri }}
        style={[
          styles.signatureImage,
          {
            width,
            height,
            transform: [
              {
                translateX: animationProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-width * 0.2, 0],
                }),
              },
            ],
          },
        ]}
        resizeMode="contain"
      />
      
      {/* Animated clip mask overlay */}
      <Animated.View
        style={[
          styles.clipOverlay,
          {
            width: animationProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [width, 0],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  signatureImage: {
    position: 'absolute',
  },
  clipOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    backgroundColor: 'white',
  },
});

export default AnimatedSignature;
