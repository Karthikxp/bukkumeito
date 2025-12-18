import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

// This is a rough estimate. A real path length calculation would be better 
// but for a signature, a large enough number usually works well to cover it.
const PATH_LENGTH = 1500; 

type Props = {
  path: string;
  onDone?: () => void;
  color?: string;
  strokeWidth?: number;
};

export const AnimatedSignature: React.FC<Props> = ({ 
  path, 
  onDone,
  color = 'black',
  strokeWidth = 2 
}) => {
  const offset = useSharedValue(PATH_LENGTH);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: offset.value,
  }));

  useEffect(() => {
    // Reset
    offset.value = PATH_LENGTH;
    
    // Animate
    offset.value = withTiming(
      0,
      {
        duration: 2000, // Slightly slower for a nice writing effect
        easing: Easing.out(Easing.quad),
      },
      (finished) => {
        if (finished && onDone) {
          // Ensure we run onDone on the JS thread
          // runOnJS(onDone)(); // If using worklets, but here onDone is simple
          // For safety with Reanimated 2/3:
          // runOnJS(onDone)();
        }
      }
    );
    
    // Call onDone with a slight delay manually if reanimated callback is tricky 
    // or just rely on the parent to handle timing if needed.
    const timer = setTimeout(() => {
      if (onDone) onDone();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [offset, onDone]);

  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 400 200" // Assuming standard canvas size, will need to match SignatureScreen
        style={styles.svg}
      >
        <AnimatedPath
          d={path}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={PATH_LENGTH}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  svg: {
    width: '100%',
    height: '100%',
  }
});
