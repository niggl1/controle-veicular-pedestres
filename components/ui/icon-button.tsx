import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface IconButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  badge?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function IconButton({
  icon,
  label,
  onPress,
  badge,
  color,
  size = 'md',
  disabled = false,
}: IconButtonProps) {
  const colors = useColors();
  const iconColor = color || colors.primary;

  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { container: 'w-20 h-20', icon: 28, iconContainer: 'w-12 h-12' };
      case 'md':
        return { container: 'w-24 h-24', icon: 32, iconContainer: 'w-14 h-14' };
      case 'lg':
        return { container: 'w-28 h-28', icon: 40, iconContainer: 'w-16 h-16' };
      default:
        return { container: 'w-24 h-24', icon: 32, iconContainer: 'w-14 h-14' };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        pressed && { transform: [{ scale: 0.95 }], opacity: 0.8 },
        disabled && { opacity: 0.5 },
      ]}
      className={cn(
        "items-center justify-center",
        sizeStyles.container
      )}
    >
      <View
        className={cn(
          "items-center justify-center rounded-2xl bg-surface",
          sizeStyles.iconContainer
        )}
        style={{ backgroundColor: `${iconColor}15` }}
      >
        <IconSymbol
          name={icon as any}
          size={sizeStyles.icon}
          color={iconColor}
        />
        {badge !== undefined && badge > 0 && (
          <View className="absolute -top-1 -right-1 bg-error rounded-full min-w-5 h-5 items-center justify-center px-1">
            <Text className="text-white text-xs font-bold">
              {badge > 99 ? '99+' : badge}
            </Text>
          </View>
        )}
      </View>
      <Text
        className="text-xs text-center text-foreground mt-2 font-medium"
        numberOfLines={2}
      >
        {label}
      </Text>
    </Pressable>
  );
}
