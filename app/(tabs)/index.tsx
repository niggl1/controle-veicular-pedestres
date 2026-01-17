import { ScrollView, Text, View, Image } from "react-native";
import { router } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconButton } from "@/components/ui/icon-button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/lib/auth-context";
import { useColors } from "@/hooks/use-colors";

export default function HomeScreen() {
  const colors = useColors();
  const { user, organizationLogo } = useAuth();
  
  const profile = user?.profile || 'usuario';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getProfileLabel = () => {
    switch (profile) {
      case 'admin': return 'Administrador';
      case 'gestao': return 'Gestão';
      case 'portaria': return 'Portaria';
      case 'usuario': return 'Usuário';
      default: return 'Usuário';
    }
  };

  // Menu items based on profile
  const getMenuItems = () => {
    const items = [];

    // Portaria items
    if (profile === 'portaria' || profile === 'admin') {
      items.push(
        { icon: 'car.fill', label: 'Controle\nVeicular', onPress: () => router.push('/(tabs)/vehicle-control'), color: colors.primary },
        { icon: 'person.fill', label: 'Controle\nPedestre', onPress: () => router.push('/(tabs)/pedestrian-control'), color: colors.success },
      );
    }

    // Usuario items
    if (profile === 'usuario' || profile === 'admin') {
      items.push(
        { icon: 'person.badge.check', label: 'Liberar\nVisitante', onPress: () => router.push('/(tabs)/authorizations'), color: colors.primary },
        { icon: 'car', label: 'Liberar\nVeículo', onPress: () => router.push('/(tabs)/authorizations'), color: colors.success },
        { icon: 'qrcode', label: 'Gerar\nConvite', onPress: () => router.push('/(tabs)/invite'), color: colors.warning },
        { icon: 'calendar', label: 'Autorizações\nRecorrentes', onPress: () => router.push('/(tabs)/authorizations'), color: '#8B5CF6' },
      );
    }

    // Gestao/Admin items
    if (profile === 'gestao' || profile === 'admin') {
      items.push(
        { icon: 'chart.bar.fill', label: 'Relatórios', onPress: () => router.push('/(tabs)/reports'), color: colors.primary },
        { icon: 'person.2.fill', label: 'Lotação\nAtual', onPress: () => router.push('/(tabs)/reports'), color: colors.warning },
        { icon: 'exclamationmark.triangle.fill', label: 'Lista de\nRestrição', onPress: () => router.push('/(tabs)/reports'), color: colors.error },
      );
    }

    // Common items
    items.push(
      { icon: 'clock.fill', label: 'Histórico', onPress: () => router.push('/(tabs)/reports'), color: colors.muted },
      { icon: 'bell.fill', label: 'Notificações', onPress: () => {}, color: colors.warning, badge: 3 },
    );

    return items;
  };

  const menuItems = getMenuItems();

  return (
    <ScreenContainer className="px-4">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between py-4">
          <View className="flex-1">
            <Text className="text-base text-muted">{getGreeting()},</Text>
            <Text className="text-xl font-bold text-foreground" numberOfLines={1}>
              {user?.name || 'Usuário'}
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="bg-primary/15 px-2 py-0.5 rounded-full">
                <Text className="text-xs text-primary font-medium">{getProfileLabel()}</Text>
              </View>
            </View>
          </View>
          
          {/* Organization Logo */}
          <View className="ml-4">
            {organizationLogo ? (
              <Image
                source={{ uri: organizationLogo }}
                className="w-14 h-14 rounded-xl"
                resizeMode="contain"
              />
            ) : (
              <View className="w-14 h-14 bg-primary/10 rounded-xl items-center justify-center">
                <IconSymbol
                  name="shield.fill"
                  size={28}
                  color={colors.primary}
                />
              </View>
            )}
          </View>
        </View>

        {/* Organization Name */}
        <View className="bg-surface rounded-xl p-4 mb-6">
          <View className="flex-row items-center">
            <IconSymbol
              name="building.2.fill"
              size={20}
              color={colors.muted}
            />
            <Text className="text-sm text-muted ml-2">
              {user?.organizationName || 'Organização'}
            </Text>
          </View>
          {user?.unitName && (
            <View className="flex-row items-center mt-2">
              <IconSymbol
                name="location.fill"
                size={20}
                color={colors.muted}
              />
              <Text className="text-sm text-muted ml-2">
                {user.unitName}
              </Text>
            </View>
          )}
        </View>

        {/* Quick Stats for Portaria */}
        {(profile === 'portaria' || profile === 'admin') && (
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-success/10 rounded-xl p-4">
              <Text className="text-2xl font-bold text-success">12</Text>
              <Text className="text-xs text-muted mt-1">Visitantes Ativos</Text>
            </View>
            <View className="flex-1 bg-primary/10 rounded-xl p-4">
              <Text className="text-2xl font-bold text-primary">8</Text>
              <Text className="text-xs text-muted mt-1">Veículos Visitantes</Text>
            </View>
          </View>
        )}

        {/* Menu Grid */}
        <Text className="text-lg font-semibold text-foreground mb-4">
          Acesso Rápido
        </Text>
        
        <View className="flex-row flex-wrap justify-between">
          {menuItems.map((item, index) => (
            <View key={index} className="w-1/3 items-center mb-4">
              <IconButton
                icon={item.icon}
                label={item.label}
                onPress={item.onPress}
                color={item.color}
                badge={item.badge}
              />
            </View>
          ))}
        </View>

        {/* Offline Mode Indicator */}
        {profile === 'portaria' && (
          <View className="bg-warning/10 rounded-xl p-4 mt-4 flex-row items-center">
            <IconSymbol
              name="exclamationmark.triangle.fill"
              size={20}
              color={colors.warning}
            />
            <View className="ml-3 flex-1">
              <Text className="text-sm font-medium text-foreground">
                Modo Offline Disponível
              </Text>
              <Text className="text-xs text-muted mt-0.5">
                O sistema continua funcionando mesmo sem internet
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
