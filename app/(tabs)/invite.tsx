import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Share, Platform } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { ActionButton } from '@/components/ui/action-button';
import { InputField } from '@/components/ui/input-field';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/lib/auth-context';

type InviteType = 'visitor' | 'vehicle';

export default function InviteScreen() {
  const colors = useColors();
  const { user } = useAuth();
  const [inviteType, setInviteType] = useState<InviteType>('visitor');
  const [generated, setGenerated] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  // Optional fields
  const [visitorName, setVisitorName] = useState('');
  const [validDate, setValidDate] = useState('');
  const [validTime, setValidTime] = useState('');
  const [observations, setObservations] = useState('');

  const generateInviteCode = () => {
    // Generate a random code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setInviteCode(code);
    setGenerated(true);
  };

  const getInviteLink = () => {
    const baseUrl = 'https://acesso.app/convite';
    return `${baseUrl}/${inviteCode}`;
  };

  const handleShare = async () => {
    const link = getInviteLink();
    const message = `Você foi convidado para visitar ${user?.organizationName || 'nossa organização'}!\n\nAcesse o link para preencher seus dados:\n${link}\n\nCódigo: ${inviteCode}`;

    try {
      if (Platform.OS === 'web') {
        await navigator.clipboard.writeText(message);
        alert('Link copiado para a área de transferência!');
      } else {
        await Share.share({
          message,
          title: 'Convite de Acesso',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopyLink = async () => {
    const link = getInviteLink();
    try {
      if (Platform.OS === 'web') {
        await navigator.clipboard.writeText(link);
      }
      alert('Link copiado!');
    } catch (error) {
      console.error('Error copying:', error);
    }
  };

  const handleNewInvite = () => {
    setGenerated(false);
    setInviteCode('');
    setVisitorName('');
    setValidDate('');
    setValidTime('');
    setObservations('');
  };

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-4 py-4">
          <Text className="text-2xl font-bold text-foreground">Gerar Convite</Text>
          <Text className="text-base text-muted mt-1">Crie um convite para seu visitante</Text>
        </View>

        {!generated ? (
          <View className="px-4">
            {/* Type Selection */}
            <Text className="text-sm font-medium text-foreground mb-2">Tipo de Convite</Text>
            <View className="flex-row gap-3 mb-6">
              <Pressable
                onPress={() => setInviteType('visitor')}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                className={`flex-1 p-4 rounded-xl border-2 items-center ${inviteType === 'visitor' ? 'border-primary bg-primary/10' : 'border-border bg-surface'}`}
              >
                <IconSymbol
                  name="person.fill"
                  size={32}
                  color={inviteType === 'visitor' ? colors.primary : colors.muted}
                />
                <Text className={`text-sm font-medium mt-2 ${inviteType === 'visitor' ? 'text-primary' : 'text-muted'}`}>
                  Visitante
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setInviteType('vehicle')}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                className={`flex-1 p-4 rounded-xl border-2 items-center ${inviteType === 'vehicle' ? 'border-primary bg-primary/10' : 'border-border bg-surface'}`}
              >
                <IconSymbol
                  name="car.fill"
                  size={32}
                  color={inviteType === 'vehicle' ? colors.primary : colors.muted}
                />
                <Text className={`text-sm font-medium mt-2 ${inviteType === 'vehicle' ? 'text-primary' : 'text-muted'}`}>
                  Veículo
                </Text>
              </Pressable>
            </View>

            {/* Optional Fields */}
            <View className="bg-surface rounded-2xl p-4 mb-6">
              <Text className="text-lg font-bold text-foreground mb-4">Informações (Opcional)</Text>
              
              <InputField
                label="Nome do Visitante"
                placeholder="Deixe em branco para o visitante preencher"
                value={visitorName}
                onChangeText={setVisitorName}
                leftIcon="person.fill"
              />

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <InputField
                    label="Data Limite"
                    placeholder="DD/MM/AAAA"
                    value={validDate}
                    onChangeText={setValidDate}
                    leftIcon="calendar"
                  />
                </View>
                <View className="flex-1">
                  <InputField
                    label="Hora Limite"
                    placeholder="HH:MM"
                    value={validTime}
                    onChangeText={setValidTime}
                    leftIcon="clock.fill"
                  />
                </View>
              </View>

              <InputField
                label="Observações"
                placeholder="Instruções ou informações adicionais"
                value={observations}
                onChangeText={setObservations}
                multiline
              />
            </View>

            <ActionButton
              title="Gerar Convite"
              icon="qrcode"
              onPress={generateInviteCode}
              fullWidth
              size="lg"
            />
          </View>
        ) : (
          <View className="px-4">
            {/* QR Code Display */}
            <View className="bg-surface rounded-2xl p-6 items-center mb-6">
              <Text className="text-lg font-bold text-foreground mb-4">Convite Gerado</Text>
              
              {/* Simulated QR Code */}
              <View className="w-48 h-48 bg-white rounded-xl items-center justify-center mb-4 border border-border">
                <IconSymbol
                  name="qrcode"
                  size={120}
                  color={colors.foreground}
                />
              </View>

              <Text className="text-2xl font-bold text-primary tracking-widest mb-2">
                {inviteCode}
              </Text>
              <Text className="text-sm text-muted text-center">
                Código de acesso
              </Text>
            </View>

            {/* Link Section */}
            <View className="bg-surface rounded-2xl p-4 mb-6">
              <Text className="text-sm font-medium text-foreground mb-2">Link do Convite</Text>
              <View className="flex-row items-center bg-background rounded-xl p-3 border border-border">
                <Text className="flex-1 text-sm text-muted" numberOfLines={1}>
                  {getInviteLink()}
                </Text>
                <Pressable
                  onPress={handleCopyLink}
                  style={({ pressed }) => [pressed && { opacity: 0.6 }]}
                  className="ml-2 p-2"
                >
                  <IconSymbol name="doc.fill" size={20} color={colors.primary} />
                </Pressable>
              </View>
            </View>

            {/* Invite Details */}
            {(visitorName || validDate || observations) && (
              <View className="bg-surface rounded-2xl p-4 mb-6">
                <Text className="text-sm font-medium text-foreground mb-3">Detalhes do Convite</Text>
                {visitorName && (
                  <View className="flex-row mb-2">
                    <Text className="text-sm text-muted w-24">Visitante:</Text>
                    <Text className="text-sm text-foreground flex-1">{visitorName}</Text>
                  </View>
                )}
                {validDate && (
                  <View className="flex-row mb-2">
                    <Text className="text-sm text-muted w-24">Válido até:</Text>
                    <Text className="text-sm text-foreground flex-1">{validDate} {validTime}</Text>
                  </View>
                )}
                {observations && (
                  <View className="flex-row">
                    <Text className="text-sm text-muted w-24">Obs:</Text>
                    <Text className="text-sm text-foreground flex-1">{observations}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Action Buttons */}
            <View className="gap-3">
              <ActionButton
                title="Compartilhar Convite"
                icon="paperplane.fill"
                onPress={handleShare}
                fullWidth
                size="lg"
              />

              <ActionButton
                title="Gerar Novo Convite"
                icon="plus"
                onPress={handleNewInvite}
                variant="outline"
                fullWidth
              />
            </View>

            {/* Instructions */}
            <View className="bg-primary/10 rounded-xl p-4 mt-6">
              <View className="flex-row items-start">
                <IconSymbol
                  name="info.circle.fill"
                  size={20}
                  color={colors.primary}
                />
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-medium text-foreground">Como funciona</Text>
                  <Text className="text-xs text-muted mt-1">
                    1. Compartilhe o QR Code ou link com seu visitante{'\n'}
                    2. O visitante preenche seus dados pelo link{'\n'}
                    3. Você recebe uma notificação para aprovar{'\n'}
                    4. Após aprovação, o visitante é liberado na portaria
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
