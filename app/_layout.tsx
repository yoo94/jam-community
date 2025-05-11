import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/api/queryClient";
import useAuth from "@/hooks/qureies/useAuth";
import Toast from "react-native-toast-message";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

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
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
        <Toast />
      </QueryClientProvider>
    </ActionSheetProvider>
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
      <Stack.Screen name="imagePreview" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
function useReactQueryDevTools(queryClient: QueryClient) {
  throw new Error("Function not implemented.");
}
