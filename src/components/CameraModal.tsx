/**
 * CameraModal - Premium minimalistic camera interface with circular guide
 * 
 * @format
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = 280;

type CameraModalProps = {
  visible: boolean;
  onClose: () => void;
  onCapture: (imageUri: string) => void;
};

const CameraModal: React.FC<CameraModalProps> = ({ visible, onClose, onCapture }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (visible && !permission?.granted) {
      requestPermission();
    }
  }, [visible]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
        });
        
        if (photo?.uri) {
          // Calculate crop parameters to get circular area
          const imageWidth = photo.width;
          const imageHeight = photo.height;
          
          // Calculate the circular crop area (center of image)
          const cropSize = Math.min(imageWidth, imageHeight);
          const originX = (imageWidth - cropSize) / 2;
          const originY = (imageHeight - cropSize) / 2;
          
          // Crop to circular area
          const croppedImage = await ImageManipulator.manipulateAsync(
            photo.uri,
            [
              {
                crop: {
                  originX,
                  originY,
                  width: cropSize,
                  height: cropSize,
                },
              },
              {
                resize: {
                  width: 360,
                  height: 360,
                },
              },
            ],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
          );
          
          setCapturedImage(croppedImage.uri);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleUse = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      setCapturedImage(null);
      onClose();
    }
  };

  const handleClose = () => {
    setCapturedImage(null);
    onClose();
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="fade" transparent={false}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Camera access required</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <StatusBar hidden />
      <View style={styles.container}>
        {!capturedImage ? (
          <>
            {/* Full Black Background */}
            <View style={styles.blackBackground} />

            {/* Circular Camera View */}
            <View style={styles.circularCameraContainer}>
              <View style={styles.circularMask}>
                <CameraView
                  ref={cameraRef}
                  style={styles.camera}
                  facing="front"
                />
              </View>
            </View>

            {/* Circle Border */}
            <View style={styles.circleBorderContainer}>
              <View style={styles.circleBorder} />
            </View>

            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructions}>Position your face in the circle</Text>
            </View>

            {/* Controls */}
            <View style={styles.controlsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <View style={styles.spacer} />
            </View>
          </>
        ) : (
          <>
            {/* Full Black Background */}
            <View style={styles.blackBackground} />

            {/* Circular Preview */}
            <View style={styles.circularCameraContainer}>
              <View style={styles.circularMask}>
                <Image source={{ uri: capturedImage }} style={styles.previewImage} />
              </View>
            </View>

            {/* Circle Border */}
            <View style={styles.circleBorderContainer}>
              <View style={styles.circleBorder} />
            </View>

            {/* Preview Controls */}
            <View style={styles.previewControlsContainer}>
              <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
                <Text style={styles.retakeButtonText}>Retake</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.useButton} onPress={handleUse}>
                <Text style={styles.useButtonText}>Use Photo</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  blackBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  circularCameraContainer: {
    position: 'absolute',
    top: (height - CIRCLE_SIZE) / 2,
    left: (width - CIRCLE_SIZE) / 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  circularMask: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: 'hidden',
  },
  camera: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  previewImage: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  circleBorderContainer: {
    position: 'absolute',
    top: (height - CIRCLE_SIZE) / 2,
    left: (width - CIRCLE_SIZE) / 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBorder: {
    width: CIRCLE_SIZE - 4,
    height: CIRCLE_SIZE - 4,
    borderRadius: (CIRCLE_SIZE - 4) / 2,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  instructionsContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructions: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  cancelButton: {
    width: 80,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
  },
  spacer: {
    width: 80,
  },
  previewControlsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  retakeButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  useButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderRadius: 25,
  },
  useButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#000000',
    borderRadius: 25,
    marginBottom: 15,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  closeButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default CameraModal;
