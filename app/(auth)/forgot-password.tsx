import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { InputField } from '@/components/ui/input-field';
import { ActionButton } from '@/components/ui/action-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

export default function ForgotPasswordScreen() {
  const colors = useColors();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendReset = async () => {
    setError('');
    
    if (!email.trim()) {
      setError('Por favor, informe seu e-mail');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, informe um e-mail válido');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setSent(true);
  };

  const handleBack = () => {
    router.back();
  };

  if (sent) {
    return (
      <ScreenContainer edges={["top", "bottom", "left", "right"]}>
        <View className="flex-1 px-6 py-8 justify-center items-center">
          <View className="w-20 h-20 bg-success/15 rounded-full items-center justify-center mb-6">
            <IconSymbol
              name="checkmark.circle.fill"
              size={48}
              color={colors.success}
            />
          </View>
          <Text className="text-2xl font-bold text-foreground text-center mb-2">
            E-mail Enviado!
          </Text>
          <Text className="text-base text-muted text-center mb-8 max-w-xs">
            Enviamos um link de recuperação para {email}. Verifique sua caixa de entrada.
          </Text>
          <ActionButton
            title="Voltar ao Login"
            onPress={handleBack}
            fullWidth
            size="lg"
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 py-8">
            {/* Header */}
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [pressed && { opacity: 0.6 }]}
              className="flex-row items-center mb-8"
            >
              <IconSymbol
                name="chevron.left"
                size={24}
                color={colors.foreground}
              />
              <Text className="text-foreground font-medium ml-1">Voltar</Text>
            </Pressable>

            {/* Content */}
            <View className="flex-1 justify-center">
              <View className="items-center mb-8">
                <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-4">
                  <IconSymbol
                    name="lock.fill"
                    size={40}
                    color={colors.primary}
                  />
                </View>
                <Text className="text-2xl font-bold text-foreground text-center">
                  Recuperar Senha
                </Text>
                <Text className="text-base text-muted text-center mt-2 max-w-xs">
                  Informe seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
                </Text>
              </View>

              <View className="w-full max-w-sm self-center">
                {error ? (
                  <View className="bg-error/10 border border-error/30 rounded-xl p-3 mb-4">
                    <Text className="text-error text-center">{error}</Text>
                  </View>
                ) : null}

                <InputField
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  leftIcon="person.fill"
                  returnKeyType="done"
                  onSubmitEditing={handleSendReset}
                />

                <ActionButton
                  title="Enviar Link de Recuperação"
                  onPress={handleSendReset}
                  loading={isLoading}
                  fullWidth
                  size="lg"
                  icon="paperplane.fill"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
