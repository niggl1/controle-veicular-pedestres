import { Stack } from 'expo-router';
import { useColors } from '@/hooks/use-colors';

export default function AdminLayout() {
  const colors = useColors();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="register-users" />
    </Stack>
  );
}
