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
  const route = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Stack.Screen name="home" />
      <Stack.Screen
        options={{ headerBackVisible: false }}
        name="login"
      />
    </Stack>
  );
}
