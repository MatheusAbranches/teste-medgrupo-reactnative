import FontAwesome from '@expo/vector-icons/FontAwesome';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { makeServer } from '../services/mockServer';

export {
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

if (typeof window !== 'undefined') {
  makeServer();
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen 
            name="schools/form" 
            options={{ 
              title: 'Escola', 
              headerShown: true,
              headerStyle: { backgroundColor: '#fff' },
              headerTintColor: '#000',
            }} 
          />
          <Stack.Screen 
            name="schools/[schoolId]/classes" 
            options={{ 
              title: 'Turmas', 
              headerShown: true,
              headerStyle: { backgroundColor: '#fff' },
              headerTintColor: '#000',
            }} 
          />
          <Stack.Screen 
            name="schools/[schoolId]/classes/form" 
            options={{ 
              title: 'Turma', 
              headerShown: true,
              headerStyle: { backgroundColor: '#fff' },
              headerTintColor: '#000',
            }} 
          />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
