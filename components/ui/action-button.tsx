import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { useColors } from '@/hooks/use-colors';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function ActionButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
}: ActionButtonProps) {
  const colors = useColors();

  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return { 
          backgroundColor: colors.primary, 
          textColor: '#FFFFFF',
          shadowColor: colors.primary,
        };
      case 'secondary':
        return { 
          backgroundColor: colors.surface, 
          textColor: colors.foreground,
          borderColor: colors.border,
          borderWidth: 1.5,
          shadowColor: 'transparent',
        };
      case 'outline':
        return { 
          backgroundColor: 'transparent', 
          textColor: colors.primary,
          borderColor: colors.primary,
          borderWidth: 1.5,
          shadowColor: 'transparent',
        };
      case 'ghost':
        return { 
          backgroundColor: 'transparent', 
          textColor: colors.foreground,
          shadowColor: 'transparent',
        };
      case 'danger':
        return { 
          backgroundColor: colors.error, 
          textColor: '#FFFFFF',
          shadowColor: colors.error,
        };
      case 'success':
        return { 
          backgroundColor: colors.success, 
          textColor: '#FFFFFF',
          shadowColor: colors.success,
        };
      default:
        return { 
          backgroundColor: colors.primary, 
          textColor: '#FFFFFF',
          shadowColor: colors.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { height: 44, paddingHorizontal: 16, fontSize: 14, iconSize: 16 };
      case 'md':
        return { height: 52, paddingHorizontal: 24, fontSize: 16, iconSize: 20 };
      case 'lg':
        return { height: 56, paddingHorizontal: 32, fontSize: 17, iconSize: 22 };
      default:
        return { height: 52, paddingHorizontal: 24, fontSize: 16, iconSize: 20 };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          height: sizeStyles.height,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          borderColor: variantStyles.borderColor,
          borderWidth: variantStyles.borderWidth || 0,
          shadowColor: variantStyles.shadowColor,
        },
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.textColor} />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <IconSymbol
              name={icon as any}
              size={sizeStyles.iconSize}
              color={variantStyles.textColor}
              style={styles.iconLeft}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                color: variantStyles.textColor,
                fontSize: sizeStyles.fontSize,
              },
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <IconSymbol
              name={icon as any}
              size={sizeStyles.iconSize}
              color={variantStyles.textColor}
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
});
