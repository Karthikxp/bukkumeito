/**
 * RootNavigator - Main navigation setup
 * 
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import IntroScreen from '../screens/IntroScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FriendsTrackScreen from '../screens/FriendsTrackScreen';
import SignatureScreen from '../screens/SignatureScreen';
import AchievementShowScreen from '../screens/AchievementShowScreen';
import MainPage from '../screens/MainPage';
import RecorderScreen from '../screens/RecorderScreen';

// Navigation types
export type RootStackParamList = {
  Intro: undefined;
  Profile: undefined;
  FriendsTrack: undefined;
  Signature: undefined;
  AchievementShow: undefined;
  MainPage: undefined;
  Recorder: { bookTitle?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Intro"
        screenOptions={{ 
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Intro" 
          component={IntroScreen}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
        />
        <Stack.Screen 
          name="FriendsTrack" 
          component={FriendsTrackScreen}
        />
        <Stack.Screen 
          name="Signature" 
          component={SignatureScreen}
        />
        <Stack.Screen 
          name="AchievementShow" 
          component={AchievementShowScreen}
        />
        <Stack.Screen 
          name="MainPage" 
          component={MainPage}
        />
        <Stack.Screen 
          name="Recorder" 
          component={RecorderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

