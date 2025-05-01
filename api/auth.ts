import { getSecureStore } from "@/utills/secureStore";
import axiosInstance from "@/api/axios";
import type { Profile } from "@/types";

type RequestUser = {
  email: string;
  password: string;
};

async function postSignup(body: RequestUser): Promise<void> {
  const { data } = await axiosInstance.post("auth/signup", body);
  return data;
}

async function postLogin(body: RequestUser): Promise<{ accessToken: string }> {
  const { data } = await axiosInstance.post("/auth/signin", body);
  return data;
}

async function pgetMe(): Promise<Profile> {
  const accessToekn = await getSecureStore("accessToken");
  if (!accessToekn) {
    throw new Error("Access token not found");
  }
  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToekn}`,
    },
  });
  return data;
}

export { postSignup, postLogin, pgetMe };
