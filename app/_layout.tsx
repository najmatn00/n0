import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { checkUserLoggedIn } from "../components/checkUserLoggedIn"; // فرض می‌کنیم که یک تابع برای بررسی وضعیت لاگین کاربر دارید
import { Navigator, Redirect, Stack, useRouter } from "expo-router"; // Assuming expo-router is used
import HomeIndex from ".";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="Login" />
      <Stack.Screen options={{ headerShown: false }} name="LoginSms" />
      <Stack.Screen options={{ headerShown: false }} name="Welcom" />
      <Stack.Screen options={{ headerShown: false }} name="Chat" />
      <Stack.Screen name="Profile" />
    </Stack>
  );
}
