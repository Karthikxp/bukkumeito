/**
 * SignatureScreen - User Signature Capture
 * 
 * @format
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

const { width, height } = Dimensions.get('window');

type SignatureScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Signature'>;
};

const SignatureScreen: React.FC<SignatureScreenProps> = ({ navigation }) => {
  const signatureRef = useRef<any>(null);
  const [hasSignature, setHasSignature] = useState(false);

  const handleConfirm = () => {
    if (signatureRef.current) {
      signatureRef.current.readSignature();
    }
  };

  const handleSignature = (signature: string) => {
    // TODO: Save signature and navigate to next screen
    setHasSignature(true);
  };

  const handleEmpty = () => {
    setHasSignature(false);
  };

  const handleClearPress = () => {
    if (signatureRef.current) {
      signatureRef.current.clearSignature();
    }
  };

  const handleClear = () => {
    setHasSignature(false);
  };

  const handleBegin = () => {
    setHasSignature(true);
  };

  const style = `.m-signature-pad {
    box-shadow: none;
    border: none;
  }
  .m-signature-pad--body {
    border: none;
  }
  .m-signature-pad--footer {
    display: none;
  }
  body,html {
    width: 100%;
    height: 100%;
  }
  canvas {
    touch-action: none;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }`;

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

      {/* Heading - positioned at left: 8.33%, top: 21.43% + 20.57px */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Add your Personal</Text>
        <Text style={styles.heading}>Touch</Text>
      </View>

      {/* Help Text - positioned at left: 29.17% - 74px, top: 35.71% + 11.29px, width: 127px */}
      <View style={styles.helpTextContainer}>
        <Text style={styles.helpText}>
          Don't use your original signature!. {'\n'}
          create a new signature for a personalised experience
        </Text>
      </View>

      {/* Signature Canvas - positioned in the middle area 
          Enhanced smoothing settings:
          - minWidth (0.5px): Thinner lines for precision
          - maxWidth (2.5px): Smooth variation based on pen speed
          - Optimized canvas rendering for crisp, polished output
      */}
      <View style={styles.signatureContainer}>
        <SignatureCanvas
          ref={signatureRef}
          onOK={handleSignature}
          onEmpty={handleEmpty}
          onBegin={handleBegin}
          onClear={handleClear}
          descriptionText=""
          clearText="Clear"
          confirmText="Confirm"
          webStyle={style}
          backgroundColor="rgba(255,255,255,0)"
          penColor="black"
          minWidth={0.5}
          maxWidth={2.5}
        />
      </View>

      {/* Clear Button - positioned at top-right of signature area */}
      {hasSignature && (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearPress}
          activeOpacity={0.7}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      )}

      {/* Confirm Sign Button - positioned at bottom: 55px, centered */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Confirm Sign</Text>
        </TouchableOpacity>
      </View>
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
  headingContainer: {
    position: 'absolute',
    left: width * 0.0833,
    top: height * 0.2143 + (height * 0.0257),
  },
  heading: {
    fontSize: 34.435,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -2.4104,
    fontFamily: 'Inter',
    lineHeight: 40,
  },
  helpTextContainer: {
    position: 'absolute',
    left: width * 0.2917 - 74,
    top: height * 0.3571 + (height * 0.0141),
    width: 185,

  },
  helpText: {
    fontSize: 9,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: -0.63,
    fontFamily: 'Inter',
    lineHeight: 12,
  },
  signatureContainer: {
    position: 'absolute',
    left: width * 0.0833,
    right: width * 0.0833,
    top: height * 0.42,
    height: height * 0.35,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  clearButton: {
    position: 'absolute',
    right: width * 0.0833,
    top: height * 0.42 - 30,
    padding: 5,
  },
  clearText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter',
    textAlign: 'right',
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
    letterSpacing: -1.4,
    fontFamily: 'Inter',
  },
});

export default SignatureScreen;

