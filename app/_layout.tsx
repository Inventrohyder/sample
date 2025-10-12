import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Cardo fonts for headings and titles
    "Cardo-Regular": require("../assets/fonts/Cardo-Regular.ttf"),
    "Cardo-Bold": require("../assets/fonts/Cardo-Bold.ttf"),
    "Cardo-Italic": require("../assets/fonts/Cardo-Italic.ttf"),

    // Commissioner fonts for body text
    "Commissioner-Thin": require("../assets/fonts/Commissioner-Thin.ttf"),
    "Commissioner-ExtraLight": require("../assets/fonts/Commissioner-ExtraLight.ttf"),
    "Commissioner-Light": require("../assets/fonts/Commissioner-Light.ttf"),
    "Commissioner-Regular": require("../assets/fonts/Commissioner-Regular.ttf"),
    "Commissioner-Medium": require("../assets/fonts/Commissioner-Medium.ttf"),
    "Commissioner-SemiBold": require("../assets/fonts/Commissioner-SemiBold.ttf"),
    "Commissioner-Bold": require("../assets/fonts/Commissioner-Bold.ttf"),
    "Commissioner-ExtraBold": require("../assets/fonts/Commissioner-ExtraBold.ttf"),
    "Commissioner-Black": require("../assets/fonts/Commissioner-Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
