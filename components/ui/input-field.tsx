import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet, TextInputProps } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  isPassword?: boolean;
  containerClassName?: string;
}

export function InputField({
  label,
  error,
  leftIcon,
  isPassword = false,
  containerClassName,
  className,
  ...props
}: InputFieldProps) {
  const colors = useColors();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn("w-full mb-4", containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-foreground mb-2">{label}</Text>
      )}
      <View
        className={cn(
          "flex-row items-center bg-surface border rounded-xl px-4 h-14",
          isFocused ? "border-primary" : "border-border",
          error ? "border-error" : ""
        )}
      >
        {leftIcon && (
          <IconSymbol
            name={leftIcon as any}
            size={20}
            color={isFocused ? colors.primary : colors.muted}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          className="flex-1 text-base text-foreground"
          placeholderTextColor={colors.muted}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={({ pressed }) => [
              styles.eyeButton,
              pressed && { opacity: 0.6 }
            ]}
          >
            <IconSymbol
              name={showPassword ? "eye.slash.fill" : "eye.fill"}
              size={20}
              color={colors.muted}
            />
          </Pressable>
        )}
      </View>
      {error && (
        <Text className="text-sm text-error mt-1">{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: 12,
  },
  eyeButton: {
    padding: 4,
  },
});
