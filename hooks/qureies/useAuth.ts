import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo, postLogin, postSignup } from "@/api/auth";
import { router } from "expo-router";
import {
  deleteSecureStore,
  getSecureStore,
  savesecureStore,
} from "@/utills/secureStore";
import { removeHeader, setHeader } from "@/utills/header";
import queryClient from "@/api/queryClient";
import { useEffect } from "react";
import { queryKeys } from "@/constants";

function useGetUserInfo() {
  const { data, isError, isSuccess } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.USER_INFO],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        // 데이터를 잘 가져왔을 때
        const accessToken = await getSecureStore("accessToken");
        setHeader("Authorization", `Bearer ${accessToken}`);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      // 데이터를 잘못 가져 왔을 때
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
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
        queryKey: [queryKeys.AUTH, queryKeys.USER_INFO],
      });
      router.push("/"); // Redirect to the main page
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
}

function useLogout() {
  return () => {
    removeHeader("Authorization");
    deleteSecureStore("accessToken");
    queryClient.resetQueries({
      queryKey: [queryKeys.AUTH, queryKeys.USER_INFO],
    });
    router.push("/auth"); // 로그아웃 후 로그인 페이지로 이동
  };
}

function useAuth() {
  const { data } = useGetUserInfo();
  // 한꺼번에 불러가기 위해 묶음
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logout = useLogout();
  return {
    userInfo: { id: data?.id || "", nickname: data?.nickname || "" },
    loginMutation,
    signupMutation,
    logout,
  };
}

export default useAuth;
