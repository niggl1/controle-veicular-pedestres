import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { ActionButton } from '@/components/ui/action-button';
import { InputField } from '@/components/ui/input-field';
import { StatusBadge } from '@/components/ui/status-badge';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

interface VehicleData {
  plate: string;
  model: string;
  color: string;
  ownerName: string;
  ownerUnit: string;
  isPreAuthorized: boolean;
}

// Mock data for demonstration
const MOCK_VEHICLES: Record<string, VehicleData> = {
  'ABC1234': {
    plate: 'ABC1234',
    model: 'Honda Civic',
    color: 'Prata',
    ownerName: 'Maria Silva',
    ownerUnit: 'Bloco A - Apt 101',
    isPreAuthorized: true,
  },
  'XYZ5678': {
    plate: 'XYZ5678',
    model: 'Toyota Corolla',
    color: 'Preto',
    ownerName: 'João Santos',
    ownerUnit: 'Bloco B - Apt 202',
    isPreAuthorized: false,
  },
};

export default function VehicleControlScreen() {
  const colors = useColors();
  const [plate, setPlate] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Form for new vehicle
  const [newModel, setNewModel] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newDestination, setNewDestination] = useState('');
  const [newResident, setNewResident] = useState('');
  const [newObservations, setNewObservations] = useState('');

  const formatPlate = (text: string) => {
    // Remove non-alphanumeric characters and convert to uppercase
    const cleaned = text.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    // Limit to 7 characters (Brazilian plate format)
    return cleaned.slice(0, 7);
  };

  const handleSearch = async () => {
    if (!plate.trim()) return;

    setIsSearching(true);
    setVehicleData(null);
    setNotFound(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const found = MOCK_VEHICLES[plate.toUpperCase()];
    if (found) {
      setVehicleData(found);
    } else {
      setNotFound(true);
    }

    setIsSearching(false);
  };

  const handleOCRScan = () => {
    // In a real app, this would open the camera for OCR scanning
    // For demo, we'll simulate finding a plate
    setPlate('ABC1234');
    handleSearch();
  };

  const handleRegisterEntry = () => {
    // Register vehicle entry
    alert('Entrada registrada com sucesso!');
    resetForm();
  };

  const handleRegisterExit = () => {
    // Register vehicle exit
    alert('Saída registrada com sucesso!');
    resetForm();
  };

  const resetForm = () => {
    setPlate('');
    setVehicleData(null);
    setNotFound(false);
    setNewModel('');
    setNewColor('');
    setNewDestination('');
    setNewResident('');
    setNewObservations('');
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
            <Text className="text-2xl font-bold text-foreground">Controle Veicular</Text>
            <Text className="text-base text-muted mt-1">Digite a placa ou use a leitura automática</Text>
          </View>

          {/* Search Section */}
          <View className="px-4 mb-6">
            <View className="flex-row items-end gap-3">
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground mb-2">Placa do Veículo</Text>
                <View className="flex-row items-center bg-surface border border-border rounded-xl px-4 h-14">
                  <IconSymbol
                    name="car.fill"
                    size={20}
                    color={colors.muted}
                    style={{ marginRight: 12 }}
                  />
                  <TextInput
                    className="flex-1 text-lg font-bold text-foreground tracking-wider"
                    placeholder="ABC1234"
                    placeholderTextColor={colors.muted}
                    value={plate}
                    onChangeText={(text) => setPlate(formatPlate(text))}
                    autoCapitalize="characters"
                    maxLength={7}
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                  />
                </View>
              </View>
              
              <ActionButton
                title=""
                icon="magnifyingglass"
                onPress={handleSearch}
                loading={isSearching}
                size="lg"
              />
            </View>

            {/* OCR Button */}
            <ActionButton
              title="Leitura Automática (OCR)"
              icon="camera.fill"
              onPress={handleOCRScan}
              variant="outline"
              fullWidth
              className="mt-3"
            />
          </View>

          {/* Vehicle Found */}
          {vehicleData && (
            <View className="px-4">
              <View className="bg-surface rounded-2xl p-4 mb-4">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-lg font-bold text-foreground">Veículo Encontrado</Text>
                  <StatusBadge
                    status={vehicleData.isPreAuthorized ? 'success' : 'warning'}
                    label={vehicleData.isPreAuthorized ? 'Liberado Previamente' : 'Não Liberado'}
                  />
                </View>

                <View className="gap-3">
                  <View className="flex-row">
                    <Text className="text-sm text-muted w-20">Placa:</Text>
                    <Text className="text-sm font-semibold text-foreground">{vehicleData.plate}</Text>
                  </View>
                  <View className="flex-row">
                    <Text className="text-sm text-muted w-20">Modelo:</Text>
                    <Text className="text-sm font-semibold text-foreground">{vehicleData.model}</Text>
                  </View>
                  <View className="flex-row">
                    <Text className="text-sm text-muted w-20">Cor:</Text>
                    <Text className="text-sm font-semibold text-foreground">{vehicleData.color}</Text>
                  </View>
                  <View className="flex-row">
                    <Text className="text-sm text-muted w-20">Usuário:</Text>
                    <Text className="text-sm font-semibold text-foreground">{vehicleData.ownerName}</Text>
                  </View>
                  <View className="flex-row">
                    <Text className="text-sm text-muted w-20">Unidade:</Text>
                    <Text className="text-sm font-semibold text-foreground">{vehicleData.ownerUnit}</Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <ActionButton
                    title="Registrar Entrada"
                    icon="arrow.right"
                    onPress={handleRegisterEntry}
                    fullWidth
                    size="lg"
                  />
                </View>
                <View className="flex-1">
                  <ActionButton
                    title="Registrar Saída"
                    icon="arrow.left"
                    onPress={handleRegisterExit}
                    variant="secondary"
                    fullWidth
                    size="lg"
                  />
                </View>
              </View>
            </View>
          )}

          {/* Vehicle Not Found - Registration Form */}
          {notFound && (
            <View className="px-4">
              <View className="bg-warning/10 border border-warning/30 rounded-xl p-4 mb-4 flex-row items-center">
                <IconSymbol
                  name="exclamationmark.triangle.fill"
                  size={24}
                  color={colors.warning}
                />
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-medium text-foreground">Veículo não cadastrado</Text>
                  <Text className="text-xs text-muted mt-0.5">Preencha os dados abaixo para registrar a entrada</Text>
                </View>
              </View>

              <View className="bg-surface rounded-2xl p-4">
                <Text className="text-lg font-bold text-foreground mb-4">Dados do Veículo</Text>

                <InputField
                  label="Modelo"
                  placeholder="Ex: Honda Civic"
                  value={newModel}
                  onChangeText={setNewModel}
                  leftIcon="car.fill"
                />

                <InputField
                  label="Cor"
                  placeholder="Ex: Prata"
                  value={newColor}
                  onChangeText={setNewColor}
                />

                <InputField
                  label="Bloco/Setor de Destino"
                  placeholder="Ex: Bloco A ou Setor Administrativo"
                  value={newDestination}
                  onChangeText={setNewDestination}
                  leftIcon="building.2.fill"
                />

                <InputField
                  label="Usuário/Funcionário de Destino"
                  placeholder="Nome do morador ou funcionário"
                  value={newResident}
                  onChangeText={setNewResident}
                  leftIcon="person.fill"
                />

                <InputField
                  label="Observações"
                  placeholder="Informações adicionais"
                  value={newObservations}
                  onChangeText={setNewObservations}
                  multiline
                />

                <View className="mt-2">
                  <ActionButton
                    title="Registrar Entrada"
                    icon="checkmark"
                    onPress={handleRegisterEntry}
                    fullWidth
                    size="lg"
                  />
                </View>
              </View>
            </View>
          )}

          {/* Empty State */}
          {!vehicleData && !notFound && !isSearching && (
            <View className="px-4 py-8 items-center">
              <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-4">
                <IconSymbol
                  name="car.fill"
                  size={40}
                  color={colors.primary}
                />
              </View>
              <Text className="text-base text-muted text-center">
                Digite a placa do veículo ou use a leitura automática para consultar
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
