import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, Linking, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/lib/auth-context';
import { TextInput } from 'react-native';

// Definição dos temas
const THEMES = {
  white: {
    background: '#FFFFFF',
    inputBackground: '#FFFFFF',
    inputBorder: '#2563EB',
    title: '#2563EB',
    subtitle: '#64748B',
    label: '#0F172A',
    inputText: '#000000',
    placeholder: '#94A3B8',
    link: '#2563EB',
    buttonPrimary: '#2563EB',
    buttonText: '#FFFFFF',
    divider: '#E2E8F0',
    dividerText: '#94A3B8',
    demoBackground: '#FFFFFF',
    demoBorder: '#2563EB',
    demoTitle: '#64748B',
    demoText: '#64748B',
    iconColor: '#2563EB',
    toggleButton: '#2563EB',
    toggleText: '#FFFFFF',
  },
  blue: {
    background: '#2563EB',
    inputBackground: '#1E40AF',
    inputBorder: '#FFFFFF',
    title: '#FFFFFF',
    subtitle: '#BFDBFE',
    label: '#FFFFFF',
    inputText: '#FFFFFF',
    placeholder: '#93C5FD',
    link: '#FFFFFF',
    buttonPrimary: '#FFFFFF',
    buttonText: '#2563EB',
    divider: '#3B82F6',
    dividerText: '#BFDBFE',
    demoBackground: '#1E40AF',
    demoBorder: '#FFFFFF',
    demoTitle: '#BFDBFE',
    demoText: '#BFDBFE',
    iconColor: '#FFFFFF',
    toggleButton: '#FFFFFF',
    toggleText: '#2563EB',
  },
};

export default function LoginScreen() {
  const { login, isLoading, organizationLogo } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [currentTheme, setCurrentTheme] = useState<'white' | 'blue'>('white');

  const theme = THEMES[currentTheme];

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'white' ? 'blue' : 'white');
  };

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
    <View style={[styles.fullScreen, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Botão Alternar Tema */}
          <View style={styles.themeToggleContainer}>
            <Pressable
              onPress={toggleTheme}
              style={({ pressed }) => [
                styles.themeToggleButton,
                { backgroundColor: theme.toggleButton },
                pressed && styles.buttonPressed
              ]}
            >
              <IconSymbol 
                name={currentTheme === 'white' ? 'moon.fill' : 'sun.max.fill'} 
                size={18} 
                color={theme.toggleText} 
              />
              <Text style={[styles.themeToggleText, { color: theme.toggleText }]}>
                {currentTheme === 'white' ? 'Tema Azul' : 'Tema Branco'}
              </Text>
            </Pressable>
          </View>

          {/* Header com Logo */}
          <View style={styles.headerSection}>
            <View style={[styles.logoContainer, { backgroundColor: currentTheme === 'white' ? theme.iconColor + '15' : 'rgba(255,255,255,0.15)' }]}>
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
                  color={theme.iconColor}
                />
              )}
            </View>
            <Text style={[styles.title, { color: theme.title }]}>
              Controle de Acesso
            </Text>
            <Text style={[styles.subtitle, { color: theme.subtitle }]}>
              Veículos e Pedestres
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.formSection}>
            {/* Mensagem de Erro */}
            {error ? (
              <View style={[styles.errorContainer, { backgroundColor: '#EF444420', borderColor: '#EF4444' }]}>
                <IconSymbol name="exclamationmark.triangle.fill" size={18} color="#EF4444" />
                <Text style={[styles.errorText, { color: '#EF4444' }]}>{error}</Text>
              </View>
            ) : null}

            {/* Campo E-mail */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.label }]}>E-mail ou Telefone</Text>
              <View style={[styles.inputContainer, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                <IconSymbol name="person.fill" size={20} color={theme.iconColor} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: theme.inputText }]}
                  placeholder="Digite seu e-mail ou telefone"
                  placeholderTextColor={theme.placeholder}
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
              <Text style={[styles.inputLabel, { color: theme.label }]}>Senha</Text>
              <View style={[styles.inputContainer, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                <IconSymbol name="lock.fill" size={20} color={theme.iconColor} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: theme.inputText }]}
                  placeholder="Digite sua senha"
                  placeholderTextColor={theme.placeholder}
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
                    color={theme.iconColor}
                  />
                </Pressable>
              </View>
            </View>

            {/* Link Esqueci Senha */}
            <Pressable
              onPress={handleForgotPassword}
              style={({ pressed }) => [styles.forgotButton, pressed && styles.pressed]}
            >
              <Text style={[styles.forgotText, { color: theme.link }]}>
                Esqueci minha senha
              </Text>
            </Pressable>

            {/* Botão Entrar */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: theme.buttonPrimary },
                pressed && styles.buttonPressed,
                isLoading && styles.buttonDisabled
              ]}
            >
              {isLoading ? (
                <Text style={[styles.buttonText, { color: theme.buttonText }]}>Entrando...</Text>
              ) : (
                <Text style={[styles.buttonText, { color: theme.buttonText }]}>Entrar</Text>
              )}
            </Pressable>

            {/* Divisor */}
            <View style={styles.dividerContainer}>
              <View style={[styles.dividerLine, { backgroundColor: theme.divider }]} />
              <Text style={[styles.dividerText, { color: theme.dividerText }]}>ou</Text>
              <View style={[styles.dividerLine, { backgroundColor: theme.divider }]} />
            </View>

            {/* Botão Cadastrar Organização */}
            <Pressable
              onPress={handleRegisterOrganization}
              style={({ pressed }) => [
                styles.secondaryButton,
                { backgroundColor: currentTheme === 'white' ? '#1E40AF' : '#FFFFFF' },
                pressed && styles.buttonPressed
              ]}
            >
              <IconSymbol name="building.2.fill" size={20} color={currentTheme === 'white' ? '#FFFFFF' : '#1E40AF'} />
              <Text style={[styles.secondaryButtonText, { color: currentTheme === 'white' ? '#FFFFFF' : '#1E40AF' }]}>
                Cadastrar Organização / Condomínio
              </Text>
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
          <View style={[styles.demoSection, { backgroundColor: theme.demoBackground, borderColor: theme.demoBorder }]}>
            <Text style={[styles.demoTitle, { color: theme.demoTitle }]}>
              Credenciais de demonstração
            </Text>
            <View style={styles.demoCredentials}>
              <Text style={[styles.demoText, { color: theme.demoText }]}>
                admin@teste.com • portaria@teste.com
              </Text>
              <Text style={[styles.demoText, { color: theme.demoText }]}>
                morador@teste.com • gestao@teste.com
              </Text>
              <Text style={[styles.demoPassword, { color: theme.label }]}>
                Senha: 123456
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingTop: 60,
  },
  
  // Theme Toggle
  themeToggleContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  themeToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  themeToggleText: {
    fontSize: 14,
    fontWeight: '600',
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
    borderWidth: 2,
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
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
  
  // Buttons
  primaryButton: {
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButtonText: {
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
    marginBottom: 32,
    gap: 10,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
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
