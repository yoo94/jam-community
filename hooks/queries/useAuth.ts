import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo, postLogin, postSignup } from "@/api/auth";
import { router } from "expo-router";
import { deleteSecureStore, savesecureStore } from "@/utills/secureStore";
import { removeHeader, setHeader } from "@/utills/header";
import queryClient from "@/api/queryClient";
import { useEffect } from "react";

function useGetUserInfo() {
  const { data, isError } = useQuery({
    queryKey: ["userInfo", "auth"],
    queryFn: getUserInfo,
  });
  useEffect(() => {
    if (isError) {
      // 데이터를 잘못 가져 왔을 때
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
      router.push("/auth/login");
    }
  }, [isError]);
  return { data };
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      console.log("Signup successful", data);
      router.push("/auth/login");
    },
    onError: (error) => {
      console.error("Signup failed", error);
    },
  });
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      console.log("Login successful");
      setHeader("Authorization", `Bearer ${accessToken}`);
      await savesecureStore("accessToken", accessToken);
      //내정보를 가져오는 훅 호출
      queryClient.fetchQuery({
        queryKey: ["userInfo", "auth"],
      });
      router.push("/"); // Redirect to the main page
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
}

function useLogout() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      console.log("Logout successful", data);
      router.push("/auth/login");
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });
}

function useAuth() {
  const { data } = useGetUserInfo();
  // 한꺼번에 불러가기 위해 묶음
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();
  return {
    userInfo: { id: data?.id || "" },
    loginMutation,
    signupMutation,
    logoutMutation,
  };
}

export default useAuth;
