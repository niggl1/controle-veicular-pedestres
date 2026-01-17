import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { ActionButton } from '@/components/ui/action-button';
import { InputField } from '@/components/ui/input-field';
import { StatusBadge } from '@/components/ui/status-badge';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

type TabType = 'pending' | 'visitors' | 'vehicles' | 'recurring';

interface PendingAuthorization {
  id: string;
  name: string;
  type: 'visitor' | 'vehicle';
  destination: string;
  requestTime: string;
  plate?: string;
}

interface VisitorHistory {
  id: string;
  name: string;
  document: string;
  lastVisit: string;
  visitCount: number;
}

// Mock data
const MOCK_PENDING: PendingAuthorization[] = [
  { id: '1', name: 'Carlos Entregador', type: 'visitor', destination: 'Portaria', requestTime: '10:30' },
  { id: '2', name: 'Ana Maria', type: 'visitor', destination: 'Portaria', requestTime: '10:25' },
  { id: '3', name: 'Veículo DEF5678', type: 'vehicle', destination: 'Portaria', requestTime: '10:20', plate: 'DEF5678' },
];

const MOCK_VISITORS: VisitorHistory[] = [
  { id: '1', name: 'João Silva', document: '123.456.789-00', lastVisit: '15/01/2026', visitCount: 5 },
  { id: '2', name: 'Maria Santos', document: '987.654.321-00', lastVisit: '10/01/2026', visitCount: 3 },
  { id: '3', name: 'Pedro Costa', document: '456.789.123-00', lastVisit: '05/01/2026', visitCount: 8 },
];

export default function AuthorizationsScreen() {
  const colors = useColors();
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [showNewVisitorForm, setShowNewVisitorForm] = useState(false);
  const [showNewVehicleForm, setShowNewVehicleForm] = useState(false);

  // New visitor form
  const [visitorName, setVisitorName] = useState('');
  const [visitorDocument, setVisitorDocument] = useState('');
  const [visitorObservations, setVisitorObservations] = useState('');

  // New vehicle form
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleValidUntil, setVehicleValidUntil] = useState('');

  const tabs = [
    { key: 'pending', label: 'Pendentes', badge: MOCK_PENDING.length },
    { key: 'visitors', label: 'Visitantes' },
    { key: 'vehicles', label: 'Veículos' },
    { key: 'recurring', label: 'Recorrentes' },
  ];

  const handleApprove = (id: string) => {
    alert(`Autorização ${id} aprovada!`);
  };

  const handleDeny = (id: string) => {
    alert(`Autorização ${id} negada!`);
  };

  const handleReauthorize = (visitor: VisitorHistory) => {
    alert(`${visitor.name} foi pré-autorizado!`);
  };

  const handleSaveVisitor = () => {
    if (!visitorName.trim()) {
      alert('Por favor, informe o nome do visitante');
      return;
    }
    alert('Visitante pré-autorizado com sucesso!');
    setShowNewVisitorForm(false);
    setVisitorName('');
    setVisitorDocument('');
    setVisitorObservations('');
  };

  const handleSaveVehicle = () => {
    if (!vehiclePlate.trim()) {
      alert('Por favor, informe a placa do veículo');
      return;
    }
    alert('Veículo pré-autorizado com sucesso!');
    setShowNewVehicleForm(false);
    setVehiclePlate('');
    setVehicleModel('');
    setVehicleColor('');
    setVehicleValidUntil('');
  };

  const renderPendingItem = ({ item }: { item: PendingAuthorization }) => (
    <View className="bg-surface rounded-xl p-4 mb-3">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className={`w-10 h-10 rounded-full items-center justify-center ${item.type === 'visitor' ? 'bg-primary/15' : 'bg-success/15'}`}>
            <IconSymbol
              name={item.type === 'visitor' ? 'person.fill' : 'car.fill'}
              size={20}
              color={item.type === 'visitor' ? colors.primary : colors.success}
            />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-semibold text-foreground" numberOfLines={1}>{item.name}</Text>
            <Text className="text-xs text-muted">Solicitado às {item.requestTime}</Text>
          </View>
        </View>
        <StatusBadge status="warning" label="Pendente" size="sm" />
      </View>
      
      <View className="flex-row gap-2">
        <View className="flex-1">
          <ActionButton
            title="Aprovar"
            icon="checkmark"
            onPress={() => handleApprove(item.id)}
            size="sm"
            fullWidth
          />
        </View>
        <View className="flex-1">
          <ActionButton
            title="Negar"
            icon="xmark"
            onPress={() => handleDeny(item.id)}
            variant="danger"
            size="sm"
            fullWidth
          />
        </View>
      </View>
    </View>
  );

  const renderVisitorItem = ({ item }: { item: VisitorHistory }) => (
    <Pressable
      onPress={() => handleReauthorize(item)}
      style={({ pressed }) => [pressed && { opacity: 0.7 }]}
      className="bg-surface rounded-xl p-4 mb-3"
    >
      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-primary/15 rounded-full items-center justify-center">
          <IconSymbol name="person.fill" size={24} color={colors.primary} />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-base font-semibold text-foreground">{item.name}</Text>
          <Text className="text-xs text-muted">Última visita: {item.lastVisit}</Text>
          <Text className="text-xs text-muted">{item.visitCount} visitas</Text>
        </View>
        <View className="items-center">
          <IconSymbol name="plus.circle.fill" size={28} color={colors.primary} />
          <Text className="text-xs text-primary mt-1">Autorizar</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer>
      {/* Header */}
      <View className="px-4 py-4">
        <Text className="text-2xl font-bold text-foreground">Liberações</Text>
        <Text className="text-base text-muted mt-1">Gerencie suas autorizações de acesso</Text>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mb-4"
        contentContainerStyle={{ gap: 8 }}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key as TabType)}
            style={({ pressed }) => [pressed && { opacity: 0.7 }]}
            className={`px-4 py-2 rounded-full flex-row items-center ${activeTab === tab.key ? 'bg-primary' : 'bg-surface'}`}
          >
            <Text className={`text-sm font-medium ${activeTab === tab.key ? 'text-white' : 'text-foreground'}`}>
              {tab.label}
            </Text>
            {tab.badge && tab.badge > 0 && (
              <View className="ml-2 bg-error rounded-full min-w-5 h-5 items-center justify-center px-1">
                <Text className="text-white text-xs font-bold">{tab.badge}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>

      {/* Content */}
      <View className="flex-1 px-4">
        {activeTab === 'pending' && (
          <FlatList
            data={MOCK_PENDING}
            renderItem={renderPendingItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="items-center py-8">
                <IconSymbol name="checkmark.circle.fill" size={48} color={colors.success} />
                <Text className="text-base text-muted mt-4">Nenhuma solicitação pendente</Text>
              </View>
            }
          />
        )}

        {activeTab === 'visitors' && (
          <>
            {!showNewVisitorForm ? (
              <>
                <ActionButton
                  title="Liberar Novo Visitante"
                  icon="person.badge.plus"
                  onPress={() => setShowNewVisitorForm(true)}
                  fullWidth
                  className="mb-4"
                />
                <FlatList
                  data={MOCK_VISITORS}
                  renderItem={renderVisitorItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={
                    <Text className="text-sm font-medium text-muted mb-3">Histórico de Visitantes</Text>
                  }
                />
              </>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="bg-surface rounded-2xl p-4 mb-4">
                  <Text className="text-lg font-bold text-foreground mb-4">Novo Visitante</Text>
                  <InputField
                    label="Nome Completo"
                    placeholder="Nome do visitante"
                    value={visitorName}
                    onChangeText={setVisitorName}
                    leftIcon="person.fill"
                  />
                  <InputField
                    label="Documento (CPF/RG)"
                    placeholder="000.000.000-00"
                    value={visitorDocument}
                    onChangeText={setVisitorDocument}
                    leftIcon="doc.fill"
                  />
                  <InputField
                    label="Observações"
                    placeholder="Informações adicionais"
                    value={visitorObservations}
                    onChangeText={setVisitorObservations}
                    multiline
                  />
                </View>
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <ActionButton
                      title="Cancelar"
                      onPress={() => setShowNewVisitorForm(false)}
                      variant="secondary"
                      fullWidth
                    />
                  </View>
                  <View className="flex-1">
                    <ActionButton
                      title="Salvar"
                      icon="checkmark"
                      onPress={handleSaveVisitor}
                      fullWidth
                    />
                  </View>
                </View>
              </ScrollView>
            )}
          </>
        )}

        {activeTab === 'vehicles' && (
          <>
            {!showNewVehicleForm ? (
              <>
                <ActionButton
                  title="Liberar Novo Veículo"
                  icon="car"
                  onPress={() => setShowNewVehicleForm(true)}
                  fullWidth
                  className="mb-4"
                />
                <View className="items-center py-8">
                  <IconSymbol name="car.fill" size={48} color={colors.muted} />
                  <Text className="text-base text-muted mt-4">Nenhum veículo pré-autorizado</Text>
                </View>
              </>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="bg-surface rounded-2xl p-4 mb-4">
                  <Text className="text-lg font-bold text-foreground mb-4">Novo Veículo</Text>
                  <InputField
                    label="Placa"
                    placeholder="ABC1234"
                    value={vehiclePlate}
                    onChangeText={setVehiclePlate}
                    autoCapitalize="characters"
                    leftIcon="car.fill"
                  />
                  <InputField
                    label="Modelo"
                    placeholder="Ex: Honda Civic"
                    value={vehicleModel}
                    onChangeText={setVehicleModel}
                  />
                  <InputField
                    label="Cor"
                    placeholder="Ex: Prata"
                    value={vehicleColor}
                    onChangeText={setVehicleColor}
                  />
                  <InputField
                    label="Válido até (opcional)"
                    placeholder="DD/MM/AAAA"
                    value={vehicleValidUntil}
                    onChangeText={setVehicleValidUntil}
                    leftIcon="calendar"
                  />
                </View>
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <ActionButton
                      title="Cancelar"
                      onPress={() => setShowNewVehicleForm(false)}
                      variant="secondary"
                      fullWidth
                    />
                  </View>
                  <View className="flex-1">
                    <ActionButton
                      title="Salvar"
                      icon="checkmark"
                      onPress={handleSaveVehicle}
                      fullWidth
                    />
                  </View>
                </View>
              </ScrollView>
            )}
          </>
        )}

        {activeTab === 'recurring' && (
          <View className="items-center py-8">
            <IconSymbol name="calendar" size={48} color={colors.muted} />
            <Text className="text-base text-muted mt-4 text-center">
              Autorizações recorrentes{'\n'}Em breve
            </Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
