import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/api/queryClient";
import useAuth from "@/hooks/queries/useAuth";
import Toast from "react-native-toast-message";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
      <Toast />
    </QueryClientProvider>
  );
}

function RootNavigation() {
  const { userInfo } = useAuth();
  useEffect(() => {
    if (userInfo.id) {
      Toast.show({
        type: "success",
        text1: `${userInfo.nickname || "회원"}님 환영합니다.`,
        text2: "welcome to jam community",
      });
    }
  }, [userInfo.id]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      {/* 중첩된 헤더 없애줌 */}
      <Stack.Screen name="post" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
