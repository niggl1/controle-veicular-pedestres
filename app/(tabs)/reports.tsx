import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { ActionButton } from '@/components/ui/action-button';
import { StatusBadge } from '@/components/ui/status-badge';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

type ReportTab = 'realtime' | 'history' | 'blacklist' | 'anomalies';

interface AccessLog {
  id: string;
  name: string;
  type: 'visitor' | 'vehicle';
  action: 'entry' | 'exit';
  time: string;
  destination: string;
  plate?: string;
}

interface BlacklistItem {
  id: string;
  name: string;
  type: 'person' | 'vehicle';
  reason: string;
  addedDate: string;
  plate?: string;
}

// Mock data
const MOCK_LOGS: AccessLog[] = [
  { id: '1', name: 'João Silva', type: 'visitor', action: 'entry', time: '10:45', destination: 'Bloco A - Apt 101' },
  { id: '2', name: 'ABC1234', type: 'vehicle', action: 'entry', time: '10:30', destination: 'Bloco B - Apt 202', plate: 'ABC1234' },
  { id: '3', name: 'Maria Santos', type: 'visitor', action: 'exit', time: '10:15', destination: 'Bloco A - Apt 103' },
  { id: '4', name: 'XYZ5678', type: 'vehicle', action: 'exit', time: '10:00', destination: 'Bloco C - Apt 301', plate: 'XYZ5678' },
  { id: '5', name: 'Pedro Costa', type: 'visitor', action: 'entry', time: '09:45', destination: 'Setor Administrativo' },
];

const MOCK_BLACKLIST: BlacklistItem[] = [
  { id: '1', name: 'Carlos Pereira', type: 'person', reason: 'Comportamento inadequado', addedDate: '10/01/2026' },
  { id: '2', name: 'DEF9999', type: 'vehicle', reason: 'Veículo com restrição', addedDate: '05/01/2026', plate: 'DEF9999' },
];

export default function ReportsScreen() {
  const colors = useColors();
  const [activeTab, setActiveTab] = useState<ReportTab>('realtime');

  const tabs = [
    { key: 'realtime', label: 'Tempo Real', icon: 'clock.fill' },
    { key: 'history', label: 'Histórico', icon: 'doc.text.fill' },
    { key: 'blacklist', label: 'Restrição', icon: 'exclamationmark.triangle.fill' },
    { key: 'anomalies', label: 'Anomalias', icon: 'shield.fill' },
  ];

  const handleExport = () => {
    alert('Relatório exportado com sucesso!');
  };

  const handleRemoveFromBlacklist = (id: string) => {
    alert(`Item ${id} removido da lista de restrição`);
  };

  const handleAddToBlacklist = () => {
    alert('Adicionar à lista de restrição');
  };

  const renderLogItem = ({ item }: { item: AccessLog }) => (
    <View className="bg-surface rounded-xl p-4 mb-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className={`w-10 h-10 rounded-full items-center justify-center ${item.type === 'visitor' ? 'bg-primary/15' : 'bg-success/15'}`}>
            <IconSymbol
              name={item.type === 'visitor' ? 'person.fill' : 'car.fill'}
              size={20}
              color={item.type === 'visitor' ? colors.primary : colors.success}
            />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="text-xs text-muted">{item.destination}</Text>
          </View>
        </View>
        <View className="items-end">
          <StatusBadge
            status={item.action === 'entry' ? 'success' : 'info'}
            label={item.action === 'entry' ? 'Entrada' : 'Saída'}
            size="sm"
          />
          <Text className="text-xs text-muted mt-1">{item.time}</Text>
        </View>
      </View>
    </View>
  );

  const renderBlacklistItem = ({ item }: { item: BlacklistItem }) => (
    <View className="bg-surface rounded-xl p-4 mb-3">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 bg-error/15 rounded-full items-center justify-center">
            <IconSymbol
              name={item.type === 'person' ? 'person.fill' : 'car.fill'}
              size={20}
              color={colors.error}
            />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-semibold text-foreground">{item.name}</Text>
            <Text className="text-xs text-muted">Adicionado em {item.addedDate}</Text>
          </View>
        </View>
        <Pressable
          onPress={() => handleRemoveFromBlacklist(item.id)}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          className="p-2"
        >
          <IconSymbol name="trash.fill" size={20} color={colors.error} />
        </Pressable>
      </View>
      <View className="bg-error/10 rounded-lg p-2">
        <Text className="text-xs text-error">{item.reason}</Text>
      </View>
    </View>
  );

  return (
    <ScreenContainer>
      {/* Header */}
      <View className="px-4 py-4">
        <Text className="text-2xl font-bold text-foreground">Relatórios</Text>
        <Text className="text-base text-muted mt-1">Acompanhe os acessos em tempo real</Text>
      </View>

      {/* Stats Cards */}
      <View className="flex-row px-4 gap-3 mb-4">
        <View className="flex-1 bg-success/10 rounded-xl p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-bold text-success">12</Text>
            <IconSymbol name="person.fill" size={24} color={colors.success} />
          </View>
          <Text className="text-xs text-muted mt-1">Visitantes Ativos</Text>
        </View>
        <View className="flex-1 bg-primary/10 rounded-xl p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-bold text-primary">8</Text>
            <IconSymbol name="car.fill" size={24} color={colors.primary} />
          </View>
          <Text className="text-xs text-muted mt-1">Veículos Visitantes</Text>
        </View>
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
            onPress={() => setActiveTab(tab.key as ReportTab)}
            style={({ pressed }) => [pressed && { opacity: 0.7 }]}
            className={`px-4 py-2 rounded-full flex-row items-center ${activeTab === tab.key ? 'bg-primary' : 'bg-surface'}`}
          >
            <IconSymbol
              name={tab.icon as any}
              size={16}
              color={activeTab === tab.key ? '#FFFFFF' : colors.muted}
              style={{ marginRight: 6 }}
            />
            <Text className={`text-sm font-medium ${activeTab === tab.key ? 'text-white' : 'text-foreground'}`}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Content */}
      <View className="flex-1 px-4">
        {(activeTab === 'realtime' || activeTab === 'history') && (
          <>
            {activeTab === 'history' && (
              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <ActionButton
                    title="Filtrar"
                    icon="magnifyingglass"
                    onPress={() => {}}
                    variant="outline"
                    size="sm"
                    fullWidth
                  />
                </View>
                <View className="flex-1">
                  <ActionButton
                    title="Exportar"
                    icon="doc.fill"
                    onPress={handleExport}
                    variant="secondary"
                    size="sm"
                    fullWidth
                  />
                </View>
              </View>
            )}
            <FlatList
              data={MOCK_LOGS}
              renderItem={renderLogItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                activeTab === 'realtime' ? (
                  <View className="flex-row items-center mb-3">
                    <View className="w-2 h-2 bg-success rounded-full mr-2" />
                    <Text className="text-sm text-muted">Atualizando em tempo real</Text>
                  </View>
                ) : null
              }
            />
          </>
        )}

        {activeTab === 'blacklist' && (
          <>
            <ActionButton
              title="Adicionar à Lista"
              icon="plus"
              onPress={handleAddToBlacklist}
              fullWidth
              className="mb-4"
            />
            <FlatList
              data={MOCK_BLACKLIST}
              renderItem={renderBlacklistItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View className="items-center py-8">
                  <IconSymbol name="checkmark.shield.fill" size={48} color={colors.success} />
                  <Text className="text-base text-muted mt-4">Lista de restrição vazia</Text>
                </View>
              }
            />
          </>
        )}

        {activeTab === 'anomalies' && (
          <View className="items-center py-8">
            <View className="w-20 h-20 bg-success/15 rounded-full items-center justify-center mb-4">
              <IconSymbol name="checkmark.shield.fill" size={40} color={colors.success} />
            </View>
            <Text className="text-lg font-semibold text-foreground">Tudo Normal</Text>
            <Text className="text-base text-muted text-center mt-2 max-w-xs">
              Nenhuma anomalia detectada nas últimas 24 horas. O sistema de IA está monitorando os padrões de acesso.
            </Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
