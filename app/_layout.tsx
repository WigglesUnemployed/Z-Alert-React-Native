import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="police" options={{ 
          headerShown: false,
          presentation: 'card',
        }} />
        <Stack.Screen name="fire" options={{ 
          headerShown: false,
          presentation: 'card',
        }} />
        <Stack.Screen name="medical" options={{ 
          headerShown: false,
          presentation: 'card',
        }} />
        <Stack.Screen name="rescue" options={{ 
          headerShown: false,
          presentation: 'card',
        }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
