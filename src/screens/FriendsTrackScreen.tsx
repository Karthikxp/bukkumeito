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
const SWIPE_THRESHOLD = width * 0.25;

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
  const position = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue(gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          // Swipe right - go to previous
          swipeCard('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          // Swipe left - go to next
          swipeCard('left');
        } else {
          // Return to center
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  const swipeCard = (direction: 'left' | 'right') => {
    const toValue = direction === 'left' ? -width : width;
    
    Animated.parallel([
      Animated.timing(position, {
        toValue,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Update index
      if (direction === 'left' && currentIndex < friendsData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (direction === 'right' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      
      // Reset position
      position.setValue(0);
      scale.setValue(1);
    });
  };

  const handleFinishSetup = () => {
    // TODO: Navigate to main app
    console.log('Finish Setup pressed');
  };

  const renderCard = (friend: Friend, index: number) => {
    const isCenter = index === currentIndex;
    const isLeft = index === currentIndex - 1;
    const isRight = index === currentIndex + 1;

    if (!isCenter && !isLeft && !isRight) return null;

    let cardStyle: any = {};
    
    if (isCenter) {
      cardStyle = {
        transform: [
          { translateX: position },
          { scale: scale },
        ],
        zIndex: 10,
      };
    } else if (isLeft) {
      cardStyle = {
        transform: [
          { translateX: -(CARD_WIDTH * 0.8) - 50 },
          { scale: 0.7966 },
        ],
        zIndex: 5,
        opacity: 0.7,
      };
    } else if (isRight) {
      cardStyle = {
        transform: [
          { translateX: (CARD_WIDTH * 0.8) + 50 },
          { scale: 0.7966 },
        ],
        zIndex: 5,
        opacity: 0.7,
      };
    }

    return (
      <Animated.View
        key={friend.id}
        style={[styles.card, cardStyle]}
        {...(isCenter ? panResponder.panHandlers : {})}
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
      <View style={styles.cardsContainer}>
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
  },
  card: {
    position: 'absolute',
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
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -1.4,
    fontFamily: 'General Sans',
    textAlign: 'right',
  },
});

export default FriendsTrackScreen;

