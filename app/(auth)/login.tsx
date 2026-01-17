import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, Linking, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/lib/auth-context';
import { useColors } from '@/hooks/use-colors';
import { TextInput } from 'react-native';

export default function LoginScreen() {
  const colors = useColors();
  const { login, isLoading, organizationLogo } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header com Logo */}
          <View style={styles.headerSection}>
            <View style={[styles.logoContainer, { backgroundColor: colors.primary + '12' }]}>
              {organizationLogo ? (
                <Image
                  source={{ uri: organizationLogo }}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              ) : (
                <IconSymbol
                  name="shield.fill"
                  size={48}
                  color={colors.primary}
                />
              )}
            </View>
            <Text style={[styles.title, { color: colors.foreground }]}>
              Controle de Acesso
            </Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              Veículos e Pedestres
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.formSection}>
            {/* Mensagem de Erro */}
            {error ? (
              <View style={[styles.errorContainer, { backgroundColor: colors.error + '10', borderColor: colors.error + '30' }]}>
                <IconSymbol name="exclamationmark.triangle.fill" size={18} color={colors.error} />
                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
              </View>
            ) : null}

            {/* Campo E-mail */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.foreground }]}>E-mail ou Telefone</Text>
              <View style={[styles.inputContainer, { backgroundColor: '#FFFFFF', borderColor: colors.primary }]}>
                <IconSymbol name="person.fill" size={20} color={colors.muted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.foreground }]}
                  placeholder="Digite seu e-mail ou telefone"
                  placeholderTextColor={colors.muted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Campo Senha */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.foreground }]}>Senha</Text>
              <View style={[styles.inputContainer, { backgroundColor: '#FFFFFF', borderColor: colors.primary }]}>
                <IconSymbol name="lock.fill" size={20} color={colors.muted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.foreground }]}
                  placeholder="Digite sua senha"
                  placeholderTextColor={colors.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
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
              </View>
            </View>

            {/* Link Esqueci Senha */}
            <Pressable
              onPress={handleForgotPassword}
              style={({ pressed }) => [styles.forgotButton, pressed && styles.pressed]}
            >
              <Text style={[styles.forgotText, { color: colors.primary }]}>
                Esqueci minha senha
              </Text>
            </Pressable>

            {/* Botão Entrar */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: colors.primary },
                pressed && styles.buttonPressed,
                isLoading && styles.buttonDisabled
              ]}
            >
              {isLoading ? (
                <Text style={styles.buttonText}>Entrando...</Text>
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </Pressable>

            {/* Divisor */}
            <View style={styles.dividerContainer}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.muted }]}>ou</Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Botão Cadastrar Organização */}
            <Pressable
              onPress={handleRegisterOrganization}
              style={({ pressed }) => [
                styles.secondaryButton,
                { backgroundColor: '#1E40AF' },
                pressed && styles.buttonPressed
              ]}
            >
              <IconSymbol name="building.2.fill" size={20} color="#FFFFFF" />
              <Text style={styles.secondaryButtonText}>Cadastrar Organização / Condomínio</Text>
            </Pressable>

            {/* Botão WhatsApp */}
            <Pressable
              onPress={handleSupport}
              style={({ pressed }) => [
                styles.whatsappButton,
                { backgroundColor: '#25D366' },
                pressed && styles.buttonPressed
              ]}
            >
              <IconSymbol name="phone.fill" size={20} color="#FFFFFF" />
              <Text style={styles.whatsappButtonText}>Falar com o Suporte</Text>
            </Pressable>
          </View>

          {/* Credenciais Demo */}
          <View style={[styles.demoSection, { backgroundColor: '#FFFFFF', borderColor: colors.primary }]}>
            <Text style={[styles.demoTitle, { color: colors.muted }]}>
              Credenciais de demonstração
            </Text>
            <View style={styles.demoCredentials}>
              <Text style={[styles.demoText, { color: colors.muted }]}>
                admin@teste.com • portaria@teste.com
              </Text>
              <Text style={[styles.demoText, { color: colors.muted }]}>
                morador@teste.com • gestao@teste.com
              </Text>
              <Text style={[styles.demoPassword, { color: colors.foreground }]}>
                Senha: 123456
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
  },
  
  // Header
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 64,
    height: 64,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  
  // Form
  formSection: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  
  // Error
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    gap: 10,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  
  // Input
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
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
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
  eyeButton: {
    padding: 8,
    marginLeft: 8,
  },
  
  // Forgot Password
  forgotButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
    paddingVertical: 4,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Buttons
  primaryButton: {
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.7,
  },
  
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Secondary Button
  secondaryButton: {
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  
  // WhatsApp Button
  whatsappButton: {
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  whatsappButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  
  // Demo Section
  demoSection: {
    marginTop: 36,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  demoCredentials: {
    alignItems: 'center',
    gap: 4,
  },
  demoText: {
    fontSize: 13,
    fontWeight: '400',
  },
  demoPassword: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
});
