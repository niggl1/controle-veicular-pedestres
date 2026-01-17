import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet, TextInputProps } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { useColors } from '@/hooks/use-colors';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  isPassword?: boolean;
  hint?: string;
}

export function InputField({
  label,
  error,
  leftIcon,
  isPassword = false,
  hint,
  ...props
}: InputFieldProps) {
  const colors = useColors();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error 
    ? colors.error 
    : isFocused 
      ? colors.primary 
      : colors.border;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.foreground }]}>
          {label}
        </Text>
      )}
      
      <View 
        style={[
          styles.inputContainer, 
          { 
            backgroundColor: colors.surface, 
            borderColor,
          }
        ]}
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
          style={[styles.input, { color: colors.foreground }]}
          placeholderTextColor={colors.muted}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
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
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.circle.fill" size={14} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
        </View>
      )}
      
      {hint && !error && (
        <Text style={[styles.hintText, { color: colors.muted }]}>{hint}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
  },
  leftIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 8,
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500',
  },
  hintText: {
    fontSize: 13,
    marginTop: 8,
  },
});
