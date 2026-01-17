import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { InputField } from '@/components/ui/input-field';
import { ActionButton } from '@/components/ui/action-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

export default function RegisterOrganizationScreen() {
  const colors = useColors();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Organization data
  const [orgName, setOrgName] = useState('');
  const [orgCnpj, setOrgCnpj] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [orgPhone, setOrgPhone] = useState('');

  // Admin data
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPasswordConfirm, setAdminPasswordConfirm] = useState('');

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const validateStep1 = () => {
    if (!orgName.trim()) {
      setError('Por favor, informe o nome da organização');
      return false;
    }
    if (!orgCnpj.trim()) {
      setError('Por favor, informe o CNPJ');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!adminName.trim()) {
      setError('Por favor, informe o nome do administrador');
      return false;
    }
    if (!adminEmail.trim() || !adminEmail.includes('@')) {
      setError('Por favor, informe um e-mail válido');
      return false;
    }
    if (adminPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (adminPassword !== adminPasswordConfirm) {
      setError('As senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setStep(3);
  };

  const handleGoToLogin = () => {
    router.replace('/(auth)/login');
  };

  // Success screen
  if (step === 3) {
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
            Cadastro Realizado!
          </Text>
          <Text className="text-base text-muted text-center mb-8 max-w-xs">
            Sua organização foi cadastrada com sucesso. Você já pode fazer login com suas credenciais.
          </Text>
          <ActionButton
            title="Ir para o Login"
            onPress={handleGoToLogin}
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
              className="flex-row items-center mb-6"
            >
              <IconSymbol
                name="chevron.left"
                size={24}
                color={colors.foreground}
              />
              <Text className="text-foreground font-medium ml-1">Voltar</Text>
            </Pressable>

            {/* Progress */}
            <View className="flex-row items-center justify-center mb-8">
              <View className={`w-10 h-10 rounded-full items-center justify-center ${step >= 1 ? 'bg-primary' : 'bg-surface'}`}>
                <Text className={step >= 1 ? 'text-white font-bold' : 'text-muted font-bold'}>1</Text>
              </View>
              <View className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-surface'}`} />
              <View className={`w-10 h-10 rounded-full items-center justify-center ${step >= 2 ? 'bg-primary' : 'bg-surface'}`}>
                <Text className={step >= 2 ? 'text-white font-bold' : 'text-muted font-bold'}>2</Text>
              </View>
            </View>

            {/* Title */}
            <View className="items-center mb-6">
              <Text className="text-2xl font-bold text-foreground text-center">
                {step === 1 ? 'Dados da Organização' : 'Dados do Administrador'}
              </Text>
              <Text className="text-base text-muted text-center mt-1">
                {step === 1 ? 'Informe os dados do condomínio ou empresa' : 'Informe os dados do responsável'}
              </Text>
            </View>

            {/* Form */}
            <View className="w-full max-w-sm self-center">
              {error ? (
                <View className="bg-error/10 border border-error/30 rounded-xl p-3 mb-4">
                  <Text className="text-error text-center">{error}</Text>
                </View>
              ) : null}

              {step === 1 ? (
                <>
                  <InputField
                    label="Nome da Organização"
                    placeholder="Ex: Condomínio Solar das Flores"
                    value={orgName}
                    onChangeText={setOrgName}
                    leftIcon="building.2.fill"
                  />
                  <InputField
                    label="CNPJ"
                    placeholder="00.000.000/0000-00"
                    value={orgCnpj}
                    onChangeText={setOrgCnpj}
                    keyboardType="numeric"
                    leftIcon="doc.fill"
                  />
                  <InputField
                    label="Endereço"
                    placeholder="Rua, número, bairro, cidade"
                    value={orgAddress}
                    onChangeText={setOrgAddress}
                    leftIcon="location.fill"
                  />
                  <InputField
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    value={orgPhone}
                    onChangeText={setOrgPhone}
                    keyboardType="phone-pad"
                    leftIcon="phone.fill"
                  />
                </>
              ) : (
                <>
                  <InputField
                    label="Nome Completo"
                    placeholder="Nome do administrador"
                    value={adminName}
                    onChangeText={setAdminName}
                    leftIcon="person.fill"
                  />
                  <InputField
                    label="E-mail"
                    placeholder="email@exemplo.com"
                    value={adminEmail}
                    onChangeText={setAdminEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    leftIcon="message.fill"
                  />
                  <InputField
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    value={adminPhone}
                    onChangeText={setAdminPhone}
                    keyboardType="phone-pad"
                    leftIcon="phone.fill"
                  />
                  <InputField
                    label="Senha"
                    placeholder="Mínimo 6 caracteres"
                    value={adminPassword}
                    onChangeText={setAdminPassword}
                    isPassword
                    leftIcon="lock.fill"
                  />
                  <InputField
                    label="Confirmar Senha"
                    placeholder="Digite a senha novamente"
                    value={adminPasswordConfirm}
                    onChangeText={setAdminPasswordConfirm}
                    isPassword
                    leftIcon="lock.fill"
                  />
                </>
              )}

              <ActionButton
                title={step === 1 ? 'Próximo' : 'Cadastrar'}
                onPress={handleNext}
                loading={isLoading}
                fullWidth
                size="lg"
                icon={step === 1 ? 'arrow.right' : 'checkmark'}
                iconPosition="right"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
