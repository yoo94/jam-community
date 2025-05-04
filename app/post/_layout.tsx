import { Link, Stack } from "expo-router";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { colors } from "@/constants";
export default function postLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: { backgroundColor: colors.WHITE },
      }}
    >
      <Stack.Screen
        name="writes"
        options={{
          title: "글 작성 하기",
          headerShown: true,
          headerLeft: () => {
            return (
              <Link href={"/"} replace style={{ paddingRight: 10 }}>
                <Foundation name="arrow-left" size={24} color="black" />
              </Link>
            );
          },
        }}
      />
    </Stack>
  );
}
