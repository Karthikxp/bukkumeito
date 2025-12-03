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

// Navigation types
export type RootStackParamList = {
  Intro: undefined;
  Profile: undefined;
  Main: undefined;
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
        {/* Add more screens here as needed
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator}
        />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

