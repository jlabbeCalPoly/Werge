import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  // Ensure fonts load before splash screen is removed (ex. launcher icon goes away)
  const [loaded] = useFonts({
        'Nunito': require('../../assets/fonts/nunito-font.ttf'),
  });
  console.log(loaded)

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const colorScheme = useColorScheme();
  
  if (!loaded) {
    return null;
  } else {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="explore" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    );
  }
}
