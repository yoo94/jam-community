import React, { Children } from "react";
import { StyleSheet, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import useAuth from "@/hooks/queries/useAuth";

interface AuthRouterProps {
  children: React.ReactNode;
}

function AuthRouter({ children }: AuthRouterProps) {
  const { userInfo } = useAuth();
  useFocusEffect(() => {
    !userInfo.id && router.replace("/auth");
  });
  return <>{children}</>;
}

export default AuthRouter;
