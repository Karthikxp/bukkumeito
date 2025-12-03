/**
 * FriendsTrackScreen - Friends Reading Activity with Card Swiping
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
  Animated,
  PanResponder,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = 300;
const CARD_HEIGHT = 457;
const SWIPE_THRESHOLD = 100; // User must swipe at least 100px to trigger card change

type Friend = {
  id: number;
  name: string;
  profileImage: any;
  currentlyReading: {
    bookCover: any;
    date: string;
    review: string;
  };
};

const friendsData: Friend[] = [
  {
    id: 1,
    name: 'Rohan',
    profileImage: require('../../Asset/ui/rohan_left.png'),
    currentlyReading: {
      bookCover: require('../../Asset/ui/image_2.png'),
      date: '25/11/2025',
      review: `Got into Into the Wild thinking it was just a travel story, but damn — this dude really chose freedom like it was oxygen. The book makes you want to pack a bag, disappear for a bit, and actually hear yourself think.`,
    },
  },
  {
    id: 2,
    name: 'Reshmi',
    profileImage: require('../../Asset/ui/reshmi.png'),
    currentlyReading: {
      bookCover: require('../../Asset/ui/image_1.png'),
      date: '01/12/2025',
      review: `Started this thinking it's just another love story and now I'm sitting here questioning my entire emotional stability. The way this book quietly breaks you and then asks you to be brave anyway… yeah, rude.`,
    },
  },
  {
    id: 3,
    name: 'Rohan',
    profileImage: require('../../Asset/ui/rohan_right.png'),
    currentlyReading: {
      bookCover: require('../../Asset/ui/image_3.png'),
      date: '25/11/2025',
      review: `Got into Into the Wild thinking it was just a travel story, but damn — this dude really chose freedom like it was oxygen. The book makes you want to pack a bag, disappear for a bit, and actually hear yourself think.`,
    },
  },
];

type FriendsTrackScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'FriendsTrack'>;
};

const FriendsTrackScreen: React.FC<FriendsTrackScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const scrollX = useRef(new Animated.Value(-(1 * (CARD_WIDTH + 80)))).current;
  const currentScrollValue = useRef(-(1 * (CARD_WIDTH + 80)));
  const isAnimating = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isAnimating.current,
      onMoveShouldSetPanResponder: (_, gesture) => {
        return !isAnimating.current && Math.abs(gesture.dx) > 5;
      },
      onPanResponderGrant: () => {
        if (isAnimating.current) {
          scrollX.stopAnimation(() => {
            // Snap to current card position
            const currentPosition = -(currentIndex * (CARD_WIDTH + 80));
            scrollX.setValue(currentPosition);
            currentScrollValue.current = currentPosition;
            isAnimating.current = false;
          });
          return;
        }
        scrollX.setOffset(currentScrollValue.current);
        scrollX.setValue(0);
      },
      onPanResponderMove: (_, gesture) => {
        if (isAnimating.current) return;
        
        // STRICT: Clamp drag to prevent any possibility of skipping cards
        const maxDrag = SWIPE_THRESHOLD + 20;
        let clampedDx = gesture.dx;
        
        // Prevent dragging right (positive) if at first card
        if (currentIndex === 0 && gesture.dx > 0) {
          clampedDx = 0;
        }
        // Prevent dragging left (negative) if at last card
        else if (currentIndex === friendsData.length - 1 && gesture.dx < 0) {
          clampedDx = 0;
        }
        // STRICTLY clamp to prevent multi-card movement
        else {
          clampedDx = Math.max(-maxDrag, Math.min(maxDrag, gesture.dx));
        }
        
        scrollX.setValue(clampedDx);
      },
      onPanResponderRelease: (_, gesture) => {
        if (isAnimating.current) return;
        
        scrollX.flattenOffset();
        
        const velocity = gesture.vx;
        const dragDistance = gesture.dx;
        
        // STRICT: Only allow moving to exactly +1 or -1, nothing beyond
        let targetIndex = currentIndex;
        
        // Determine direction based on velocity OR distance
        const shouldGoNext = (Math.abs(velocity) > 0.5 && velocity < 0) || (dragDistance < -SWIPE_THRESHOLD);
        const shouldGoPrev = (Math.abs(velocity) > 0.5 && velocity > 0) || (dragDistance > SWIPE_THRESHOLD);
        
        if (shouldGoPrev && currentIndex > 0) {
          targetIndex = currentIndex - 1;
        } else if (shouldGoNext && currentIndex < friendsData.length - 1) {
          targetIndex = currentIndex + 1;
        }
        
        // ABSOLUTE SAFETY: Verify targetIndex is ONLY ±1 from current or same
        const indexDiff = Math.abs(targetIndex - currentIndex);
        if (indexDiff > 1) {
          targetIndex = currentIndex;
        }
        
        // Animate to target position
        const targetPosition = -(targetIndex * (CARD_WIDTH + 80));
        
        // Prevent new gestures during animation
        isAnimating.current = true;
        
        Animated.spring(scrollX, {
          toValue: targetPosition,
          useNativeDriver: true,
          friction: 9,
          tension: 50,
        }).start(({ finished }) => {
          if (!finished) {
            isAnimating.current = false;
            return;
          }
          
          // Final safety check before setting state
          const safeIndex = Math.max(0, Math.min(friendsData.length - 1, targetIndex));
          const finalIndexDiff = Math.abs(safeIndex - currentIndex);
          
          if (finalIndexDiff <= 1) {
            setCurrentIndex(safeIndex);
            currentScrollValue.current = targetPosition;
          } else {
            const currentPosition = -(currentIndex * (CARD_WIDTH + 80));
            scrollX.setValue(currentPosition);
            currentScrollValue.current = currentPosition;
          }
          
          isAnimating.current = false;
        });
      },
    })
  ).current;

  const handleFinishSetup = () => {
    // TODO: Navigate to main app
    console.log('Finish Setup pressed');
  };

  const renderCard = (friend: Friend, index: number) => {
    // Calculate horizontal position relative to current index
    const positionDiff = index - currentIndex;
    
    // Only render cards that are visible (current, previous, next)
    if (Math.abs(positionDiff) > 1) return null;

    // Center position for the main card
    const centerPosition = (width - CARD_WIDTH) / 2;
    
    // Side cards positioned to peek from edges
    // Left card shows ~40px on left edge
    const leftCardPosition = -CARD_WIDTH + 40;
    // Right card shows ~40px on right edge
    const rightCardPosition = width - 40;

    const scale = scrollX.interpolate({
      inputRange: [
        -((index + 1) * (CARD_WIDTH + 80)),
        -(index * (CARD_WIDTH + 80)),
        -((index - 1) * (CARD_WIDTH + 80)),
      ],
      outputRange: [0.7965, 1, 0.7965],
      extrapolate: 'clamp',
    });

    const translateX = scrollX.interpolate({
      inputRange: [
        -((index + 1) * (CARD_WIDTH + 80)),
        -(index * (CARD_WIDTH + 80)),
        -((index - 1) * (CARD_WIDTH + 80)),
      ],
      outputRange: [
        rightCardPosition,
        centerPosition,
        leftCardPosition,
      ],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={friend.id}
        style={[
          styles.card,
          {
            transform: [
              { translateX },
              { scale }
            ],
            zIndex: positionDiff === 0 ? 10 : 5,
          },
        ]}
      >
        {/* Name - positioned at left: 117px, top: 18px */}
        <Text style={styles.cardName}>{friend.name}</Text>
        
        {/* Profile Image Container - positioned at left: 92.5px, top: 57px */}
        <View style={styles.profileImageContainer}>
          <Image
            source={friend.profileImage}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        {/* Currently Reading - positioned at left: 80px, top: 183px */}
        <Text style={styles.currentlyReading}>Currently Reading</Text>

        {/* Book Cover - positioned at left: 13px, top: 240px */}
        <Image
          source={friend.currentlyReading.bookCover}
          style={styles.bookCover}
          resizeMode="cover"
        />
        
        {/* Date - positioned at left: 214px, top: 240px */}
        <Text style={styles.bookDate}>{friend.currentlyReading.date}</Text>
        
        {/* Review - positioned at left: 134px, top: 280px, width: 137px */}
        <Text style={styles.bookReview} numberOfLines={7}>
          {friend.currentlyReading.review}
        </Text>
      </Animated.View>
    );
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

      {/* Header */}
      <Text style={styles.header}>
        See What your{'\n'}Friends are into
      </Text>

      {/* Subheader */}
      <Text style={styles.subheader}>
        Stay on top of your friends reading fling
      </Text>

      {/* Cards Container */}
      <View 
        style={styles.cardsContainer}
        {...panResponder.panHandlers}
      >
        {friendsData.map((friend, index) => renderCard(friend, index))}
      </View>

      {/* Finish Setup Button - Fixed Position */}
      <View style={styles.finishButtonContainer}>
        <TouchableOpacity 
          style={styles.finishButton}
          onPress={handleFinishSetup}
          activeOpacity={0.8}
        >
          <Text style={styles.finishButtonText}>Finish Setup</Text>
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
    left: width * 0.0833,
    top: height * 0.0714 + (height * 0.0023),
    width: width * 0.15,
    height: height * 0.0684,
    zIndex: 100,
  },
  logoSmall: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    left: width * 0.0833,
    top: height * 0.1429 + (height * 0.0259),
    fontSize: 34.435,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -2.4104,
    fontFamily: 'Inter',
    lineHeight: 38,
    zIndex: 100,
  },
  subheader: {
    position: 'absolute',
    left: width * 0.0833 + (width * 0.0028),
    top: height * 0.2857 + (height * 0.0143),
    fontSize: 9,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: -0.63,
    fontFamily: 'Inter',
    lineHeight: 9.02,
    zIndex: 100,
  },
  cardsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.3571 + (height * 0.00036),
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  card: {
    position: 'absolute',
    left: 0,
    width: 300,
    height: 457,
    backgroundColor: '#131313',
    borderRadius: 11,
  },
  cardName: {
    position: 'absolute',
    left: 117,
    top: 18,
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -1.4,
    fontFamily: 'Inter',
    textAlign: 'right',
  },
  profileImageContainer: {
    position: 'absolute',
    left: 92.5,
    top: 57,
    width: 114,
    height: 114,
    borderRadius: 57,
    borderWidth: 0.84,
    borderColor: '#000000',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  currentlyReading: {
    position: 'absolute',
    left: 80,
    top: 183,
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -1.26,
    fontFamily: 'Inter',
  },
  bookCover: {
    position: 'absolute',
    left: 13,
    top: 240,
    width: 96,
    height: 149.16,
  },
  bookDate: {
    position: 'absolute',
    left: 214,
    top: 240,
    fontSize: 14,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: -0.98,
    fontFamily: 'Inter',
  },
  bookReview: {
    position: 'absolute',
    left: 134,
    top: 270,
    width: 160,
    fontSize: 11,
    fontWeight: '200',
    color: '#ffffff',
    letterSpacing: -0.84,
    fontFamily: 'Inter',
    lineHeight: 16,
    textAlign: 'right',
  },
  finishButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: height * 0.04,
    alignItems: 'center',
    zIndex: 100,
  },
  finishButton: {
    width: width * 0.5306,
    height: height * 0.075,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 97,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1,
    fontFamily: 'General Sans',
    textAlign: 'right',
  },
});

export default FriendsTrackScreen;

