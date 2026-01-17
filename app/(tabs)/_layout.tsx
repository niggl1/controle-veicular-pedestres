import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/lib/auth-context";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  const profile = user?.profile || 'usuario';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      
      {/* Portaria Tabs */}
      {(profile === 'portaria' || profile === 'admin') && (
        <>
          <Tabs.Screen
            name="vehicle-control"
            options={{
              title: "Veículos",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="car.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="pedestrian-control"
            options={{
              title: "Pedestres",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
            }}
          />
        </>
      )}

      {/* Usuario Tabs */}
      {(profile === 'usuario' || profile === 'admin') && (
        <>
          <Tabs.Screen
            name="authorizations"
            options={{
              title: "Liberações",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="checkmark.shield.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="invite"
            options={{
              title: "Convite",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="qrcode" color={color} />,
            }}
          />
        </>
      )}

      {/* Gestao/Admin Tabs */}
      {(profile === 'gestao' || profile === 'admin') && (
        <Tabs.Screen
          name="reports"
          options={{
            title: "Relatórios",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} />,
          }}
        />
      )}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
