import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, Linking, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { InputField } from '@/components/ui/input-field';
import { ActionButton } from '@/components/ui/action-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/lib/auth-context';
import { useColors } from '@/hooks/use-colors';

export default function LoginScreen() {
  const colors = useColors();
  const { login, isLoading, organizationLogo } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    
    if (!email.trim()) {
      setError('Por favor, informe seu e-mail ou telefone');
      return;
    }
    
    if (!password.trim()) {
      setError('Por favor, informe sua senha');
      return;
    }

    const success = await login(email.trim(), password);
    
    if (success) {
      router.replace('/(tabs)');
    } else {
      setError('E-mail ou senha incorretos');
    }
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleRegisterOrganization = () => {
    router.push('/(auth)/register-organization');
  };

  const handleSupport = () => {
    const whatsappNumber = '5511999999999';
    const message = 'Olá! Preciso de suporte com o sistema de Controle de Acesso.';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

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
          <View className="flex-1 px-6 py-8 justify-center">
            {/* Logo Section */}
            <View className="items-center mb-8">
              {organizationLogo ? (
                <Image
                  source={{ uri: organizationLogo }}
                  className="w-32 h-32 rounded-2xl"
                  resizeMode="contain"
                />
              ) : (
                <View className="w-32 h-32 bg-primary/10 rounded-2xl items-center justify-center">
                  <IconSymbol
                    name="shield.fill"
                    size={64}
                    color={colors.primary}
                  />
                </View>
              )}
              <Text className="text-2xl font-bold text-foreground mt-4">
                Controle de Acesso
              </Text>
              <Text className="text-base text-muted mt-1">
                Veículos e Pedestres
              </Text>
            </View>

            {/* Login Form */}
            <View className="w-full max-w-sm self-center">
              {error ? (
                <View className="bg-error/10 border border-error/30 rounded-xl p-3 mb-4">
                  <Text className="text-error text-center">{error}</Text>
                </View>
              ) : null}

              <InputField
                label="E-mail ou Telefone"
                placeholder="Digite seu e-mail ou telefone"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon="person.fill"
              />

              <InputField
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                isPassword
                leftIcon="lock.fill"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />

              <Pressable
                onPress={handleForgotPassword}
                style={({ pressed }) => [pressed && { opacity: 0.6 }]}
                className="self-end mb-6"
              >
                <Text className="text-primary text-sm font-medium">
                  Esqueci minha senha
                </Text>
              </Pressable>

              <ActionButton
                title="Entrar"
                onPress={handleLogin}
                loading={isLoading}
                fullWidth
                size="lg"
              />

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-border" />
                <Text className="mx-4 text-muted text-sm">ou</Text>
                <View className="flex-1 h-px bg-border" />
              </View>

              {/* Register Organization */}
              <ActionButton
                title="Cadastrar Organização"
                onPress={handleRegisterOrganization}
                variant="outline"
                icon="building.2.fill"
                fullWidth
              />

              {/* Support Button */}
              <Pressable
                onPress={handleSupport}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                className="flex-row items-center justify-center mt-6 py-3"
              >
                <View className="w-8 h-8 bg-success/15 rounded-full items-center justify-center mr-2">
                  <IconSymbol
                    name="phone.fill"
                    size={18}
                    color={colors.success}
                  />
                </View>
                <Text className="text-foreground font-medium">
                  Falar com o Suporte
                </Text>
              </Pressable>
            </View>

            {/* Demo Credentials */}
            <View className="mt-8 p-4 bg-surface rounded-xl">
              <Text className="text-sm text-muted text-center mb-2">
                Credenciais de demonstração:
              </Text>
              <Text className="text-xs text-muted text-center">
                admin@teste.com | portaria@teste.com{'\n'}
                morador@teste.com | gestao@teste.com{'\n'}
                Senha: 123456
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
