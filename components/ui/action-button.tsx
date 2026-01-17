import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
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

  const getVariantStyles = (): { bg: string; text: string; border?: string } => {
    switch (variant) {
      case 'primary':
        return { bg: 'bg-primary', text: 'text-white' };
      case 'secondary':
        return { bg: 'bg-surface', text: 'text-foreground' };
      case 'outline':
        return { bg: 'bg-transparent', text: 'text-primary', border: 'border border-primary' };
      case 'ghost':
        return { bg: 'bg-transparent', text: 'text-foreground' };
      case 'danger':
        return { bg: 'bg-error', text: 'text-white' };
      default:
        return { bg: 'bg-primary', text: 'text-white' };
    }
  };

  const getSizeStyles = (): { height: string; padding: string; textSize: string; iconSize: number } => {
    switch (size) {
      case 'sm':
        return { height: 'h-10', padding: 'px-4', textSize: 'text-sm', iconSize: 16 };
      case 'md':
        return { height: 'h-12', padding: 'px-6', textSize: 'text-base', iconSize: 20 };
      case 'lg':
        return { height: 'h-14', padding: 'px-8', textSize: 'text-lg', iconSize: 24 };
      default:
        return { height: 'h-12', padding: 'px-6', textSize: 'text-base', iconSize: 20 };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const getTextColor = () => {
    if (disabled) return colors.muted;
    switch (variant) {
      case 'primary':
      case 'danger':
        return '#FFFFFF';
      case 'outline':
        return colors.primary;
      default:
        return colors.foreground;
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
        disabled && { opacity: 0.5 },
      ]}
      className={cn(
        "flex-row items-center justify-center rounded-xl",
        variantStyles.bg,
        variantStyles.border,
        sizeStyles.height,
        sizeStyles.padding,
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <IconSymbol
              name={icon as any}
              size={sizeStyles.iconSize}
              color={getTextColor()}
              style={styles.iconLeft}
            />
          )}
          <Text
            className={cn(
              "font-semibold",
              variantStyles.text,
              sizeStyles.textSize
            )}
            style={{ color: getTextColor() }}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <IconSymbol
              name={icon as any}
              size={sizeStyles.iconSize}
              color={getTextColor()}
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
