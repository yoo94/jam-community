import { Link, Stack } from "expo-router";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { colors } from "@/constants";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: { backgroundColor: colors.WHITE },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "로그인",
          headerShown: true,
          headerLeft: () => {
            return (
              <Link href={"/"} replace style={{ paddingRight: 10 }}>
                <Foundation name="home" size={24} color="black" />
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "이메일 로그인",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
