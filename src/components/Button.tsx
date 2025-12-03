import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { COLORS, DIMENSIONS, TYPOGRAPHY } from '../utils/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? COLORS.PRIMARY : COLORS.CARD_BACKGROUND}
          size="small"
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: DIMENSIONS.BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  // Variants
  primary: {
    backgroundColor: COLORS.PRIMARY,
  },
  secondary: {
    backgroundColor: COLORS.SECONDARY,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  danger: {
    backgroundColor: COLORS.ERROR,
  },
  // Sizes
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: DIMENSIONS.BUTTON_HEIGHT,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },
  // Disabled state
  disabled: {
    opacity: 0.5,
  },
  // Text styles
  text: {
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.CARD_BACKGROUND,
    fontSize: TYPOGRAPHY.FONT_SIZE.MEDIUM,
  },
  secondaryText: {
    color: COLORS.CARD_BACKGROUND,
    fontSize: TYPOGRAPHY.FONT_SIZE.MEDIUM,
  },
  outlineText: {
    color: COLORS.PRIMARY,
    fontSize: TYPOGRAPHY.FONT_SIZE.MEDIUM,
  },
  dangerText: {
    color: COLORS.CARD_BACKGROUND,
    fontSize: TYPOGRAPHY.FONT_SIZE.MEDIUM,
  },
  smallText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.SMALL,
  },
  mediumText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.MEDIUM,
  },
  largeText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.LARGE,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default Button;
