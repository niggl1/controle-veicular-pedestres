import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, KeyboardAvoidingView, Platform, Linking } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { ActionButton } from '@/components/ui/action-button';
import { InputField } from '@/components/ui/input-field';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

export default function PedestrianControlScreen() {
  const colors = useColors();
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [destination, setDestination] = useState('');
  const [resident, setResident] = useState('');
  const [observations, setObservations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTakePhoto = () => {
    // In a real app, this would open the camera
    // For demo, we'll set a placeholder
    setPhoto('https://via.placeholder.com/150');
  };

  const handleRequestAuthorization = async () => {
    if (!name.trim() || !destination.trim() || !resident.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsLoading(true);
    
    // Simulate sending push notification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    alert('Solicitação enviada! Aguardando autorização do usuário.');
  };

  const handleRequestViaWhatsApp = () => {
    if (!name.trim() || !destination.trim() || !resident.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Format message for WhatsApp
    const message = `*Solicitação de Acesso*\n\n` +
      `*Visitante:* ${name}\n` +
      `*Documento:* ${document || 'Não informado'}\n` +
      `*Destino:* ${destination}\n` +
      `*Observações:* ${observations || 'Nenhuma'}\n\n` +
      `Por favor, confirme a autorização de entrada.`;

    // In a real app, you would get the resident's phone number from the database
    const phoneNumber = '5511999999999';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    Linking.openURL(url);
  };

  const handleRegisterEntry = () => {
    alert('Entrada registrada com sucesso!');
    resetForm();
  };

  const resetForm = () => {
    setPhoto(null);
    setName('');
    setDocument('');
    setDestination('');
    setResident('');
    setObservations('');
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="px-4 py-4">
            <Text className="text-2xl font-bold text-foreground">Controle de Pedestres</Text>
            <Text className="text-base text-muted mt-1">Registre a entrada de visitantes</Text>
          </View>

          {/* Photo Section */}
          <View className="px-4 mb-6">
            <Text className="text-sm font-medium text-foreground mb-2">Foto do Visitante</Text>
            <Pressable
              onPress={handleTakePhoto}
              style={({ pressed }) => [pressed && { opacity: 0.7 }]}
              className="w-32 h-32 bg-surface border-2 border-dashed border-border rounded-2xl items-center justify-center self-center"
            >
              {photo ? (
                <Image
                  source={{ uri: photo }}
                  className="w-full h-full rounded-2xl"
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center">
                  <IconSymbol
                    name="camera.fill"
                    size={32}
                    color={colors.muted}
                  />
                  <Text className="text-xs text-muted mt-2">Tirar Foto</Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* Form */}
          <View className="px-4">
            <View className="bg-surface rounded-2xl p-4">
              <Text className="text-lg font-bold text-foreground mb-4">Dados do Visitante</Text>

              <InputField
                label="Nome Completo *"
                placeholder="Nome do visitante"
                value={name}
                onChangeText={setName}
                leftIcon="person.fill"
              />

              <InputField
                label="Documento (CPF/RG)"
                placeholder="000.000.000-00"
                value={document}
                onChangeText={setDocument}
                keyboardType="numeric"
                leftIcon="doc.fill"
              />

              <InputField
                label="Bloco/Setor de Destino *"
                placeholder="Ex: Bloco A ou Setor Comercial"
                value={destination}
                onChangeText={setDestination}
                leftIcon="building.2.fill"
              />

              <InputField
                label="Usuário/Funcionário de Destino *"
                placeholder="Nome do morador ou funcionário"
                value={resident}
                onChangeText={setResident}
                leftIcon="person.badge.check"
              />

              <InputField
                label="Observações"
                placeholder="Informações adicionais"
                value={observations}
                onChangeText={setObservations}
                multiline
              />
            </View>

            {/* Action Buttons */}
            <View className="mt-6 gap-3">
              <ActionButton
                title="Solicitar Liberação"
                icon="bell.fill"
                onPress={handleRequestAuthorization}
                loading={isLoading}
                fullWidth
                size="lg"
              />

              <ActionButton
                title="Solicitar via WhatsApp"
                icon="phone.fill"
                onPress={handleRequestViaWhatsApp}
                variant="outline"
                fullWidth
                size="lg"
              />

              <View className="flex-row items-center justify-center my-2">
                <View className="flex-1 h-px bg-border" />
                <Text className="mx-4 text-muted text-sm">ou se já autorizado</Text>
                <View className="flex-1 h-px bg-border" />
              </View>

              <ActionButton
                title="Registrar Entrada"
                icon="checkmark"
                onPress={handleRegisterEntry}
                variant="secondary"
                fullWidth
                size="lg"
              />
            </View>

            {/* Tips */}
            <View className="bg-primary/10 rounded-xl p-4 mt-6">
              <View className="flex-row items-start">
                <IconSymbol
                  name="info.circle.fill"
                  size={20}
                  color={colors.primary}
                />
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-medium text-foreground">Dica</Text>
                  <Text className="text-xs text-muted mt-1">
                    Ao solicitar liberação, o usuário de destino receberá uma notificação no celular e poderá aprovar ou negar a entrada diretamente pelo aplicativo.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
