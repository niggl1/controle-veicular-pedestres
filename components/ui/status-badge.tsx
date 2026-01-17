import React from 'react';
import { View, Text } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  icon?: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({
  status,
  label,
  icon,
  size = 'md',
}: StatusBadgeProps) {
  const colors = useColors();

  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return { bg: 'bg-success/15', text: colors.success, iconName: 'checkmark.circle.fill' };
      case 'warning':
        return { bg: 'bg-warning/15', text: colors.warning, iconName: 'exclamationmark.triangle.fill' };
      case 'error':
        return { bg: 'bg-error/15', text: colors.error, iconName: 'xmark.circle.fill' };
      case 'info':
        return { bg: 'bg-primary/15', text: colors.primary, iconName: 'info.circle.fill' };
      case 'neutral':
      default:
        return { bg: 'bg-muted/15', text: colors.muted, iconName: 'questionmark.circle.fill' };
    }
  };

  const statusStyles = getStatusStyles();
  const iconSize = size === 'sm' ? 14 : 16;
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const padding = size === 'sm' ? 'px-2 py-1' : 'px-3 py-1.5';

  return (
    <View
      className={cn(
        "flex-row items-center rounded-full",
        statusStyles.bg,
        padding
      )}
    >
      {icon && (
        <IconSymbol
          name={(icon || statusStyles.iconName) as any}
          size={iconSize}
          color={statusStyles.text}
          style={{ marginRight: 4 }}
        />
      )}
      <Text
        className={cn("font-medium", textSize)}
        style={{ color: statusStyles.text }}
      >
        {label}
      </Text>
    </View>
  );
}
