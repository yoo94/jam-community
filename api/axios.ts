import axios from "axios";
import { Platform } from "react-native";

const baseUrls = {
  ios: "http://localhost:3030",
  android: "http://10.0.2.2:3030",
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
  timeout: 1000,
  headers: {},
});

export default axiosInstance;

export const get = (url: string, params?: object) => {
  return axiosInstance.get(url, { params });
};
export const post = (url: string, data?: object) => {
  return axiosInstance.post(url, data);
};
