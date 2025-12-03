import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, DIMENSIONS } from '../utils/constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  margin?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = DIMENSIONS.SCREEN_PADDING,
  margin = 0,
}) => {
  return (
    <View
      style={[
        styles.card,
        { padding, margin },
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: DIMENSIONS.BORDER_RADIUS,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Card;
