import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { ActionButton } from '@/components/ui/action-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useAuth, UserProfile } from '@/lib/auth-context';

interface MenuItem {
  icon: string;
  label: string;
  onPress: () => void;
  color?: string;
  showArrow?: boolean;
}

export default function ProfileScreen() {
  const colors = useColors();
  const { user, logout, selectProfile } = useAuth();

  const getProfileLabel = (profile: UserProfile) => {
    switch (profile) {
      case 'admin': return 'Administrador';
      case 'gestao': return 'Gestão';
      case 'portaria': return 'Portaria';
      case 'usuario': return 'Usuário';
      default: return 'Usuário';
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const handleChangeProfile = (profile: UserProfile) => {
    selectProfile(profile);
    router.replace('/(tabs)');
  };

  const menuItems: MenuItem[] = [
    { icon: 'person.fill', label: 'Meus Dados', onPress: () => {}, showArrow: true },
    { icon: 'bell.fill', label: 'Notificações', onPress: () => {}, showArrow: true },
    { icon: 'lock.fill', label: 'Alterar Senha', onPress: () => {}, showArrow: true },
    { icon: 'questionmark.circle.fill', label: 'Ajuda', onPress: () => {}, showArrow: true },
    { icon: 'doc.text.fill', label: 'Termos de Uso', onPress: () => {}, showArrow: true },
  ];

  const profiles: { key: UserProfile; label: string; icon: string }[] = [
    { key: 'usuario', label: 'Usuário', icon: 'person.fill' },
    { key: 'portaria', label: 'Portaria', icon: 'shield.fill' },
    { key: 'gestao', label: 'Gestão', icon: 'chart.bar.fill' },
    { key: 'admin', label: 'Admin', icon: 'gear' },
  ];

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-4 py-4">
          <Text className="text-2xl font-bold text-foreground">Perfil</Text>
        </View>

        {/* User Info Card */}
        <View className="px-4 mb-6">
          <View className="bg-surface rounded-2xl p-4">
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-primary/15 rounded-full items-center justify-center">
                <IconSymbol name="person.fill" size={32} color={colors.primary} />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold text-foreground">{user?.name || 'Usuário'}</Text>
                <Text className="text-sm text-muted">{user?.email}</Text>
                <View className="flex-row items-center mt-1">
                  <View className="bg-primary/15 px-2 py-0.5 rounded-full">
                    <Text className="text-xs text-primary font-medium">
                      {getProfileLabel(user?.profile || 'usuario')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Organization Info */}
            <View className="mt-4 pt-4 border-t border-border">
              <View className="flex-row items-center">
                <IconSymbol name="building.2.fill" size={16} color={colors.muted} />
                <Text className="text-sm text-muted ml-2">{user?.organizationName || 'Organização'}</Text>
              </View>
              {user?.unitName && (
                <View className="flex-row items-center mt-2">
                  <IconSymbol name="location.fill" size={16} color={colors.muted} />
                  <Text className="text-sm text-muted ml-2">{user.unitName}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Profile Switcher (Demo) */}
        <View className="px-4 mb-6">
          <Text className="text-sm font-medium text-muted mb-3">Alternar Perfil (Demo)</Text>
          <View className="flex-row flex-wrap gap-2">
            {profiles.map((profile) => (
              <Pressable
                key={profile.key}
                onPress={() => handleChangeProfile(profile.key)}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                className={`flex-row items-center px-3 py-2 rounded-full ${user?.profile === profile.key ? 'bg-primary' : 'bg-surface'}`}
              >
                <IconSymbol
                  name={profile.icon as any}
                  size={16}
                  color={user?.profile === profile.key ? '#FFFFFF' : colors.muted}
                />
                <Text className={`text-sm ml-2 ${user?.profile === profile.key ? 'text-white font-medium' : 'text-foreground'}`}>
                  {profile.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4 mb-6">
          <View className="bg-surface rounded-2xl overflow-hidden">
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                onPress={item.onPress}
                style={({ pressed }) => [pressed && { backgroundColor: colors.border + '30' }]}
                className={`flex-row items-center px-4 py-4 ${index < menuItems.length - 1 ? 'border-b border-border' : ''}`}
              >
                <View className="w-8 h-8 bg-primary/15 rounded-full items-center justify-center">
                  <IconSymbol
                    name={item.icon as any}
                    size={18}
                    color={item.color || colors.primary}
                  />
                </View>
                <Text className="flex-1 text-base text-foreground ml-3">{item.label}</Text>
                {item.showArrow && (
                  <IconSymbol name="chevron.right" size={20} color={colors.muted} />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-4">
          <ActionButton
            title="Sair da Conta"
            icon="arrow.left"
            onPress={handleLogout}
            variant="danger"
            fullWidth
          />
        </View>

        {/* Version Info */}
        <View className="items-center mt-8">
          <Text className="text-xs text-muted">Controle de Acesso v1.0.0</Text>
          <Text className="text-xs text-muted mt-1">© 2026 - Todos os direitos reservados</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
