import axiosInstance from "@/api/axios"; // Import the axios instance 만들어놓은 인스턴스

function setHeader(key: string, value: string) {
  // Set a header for all requests
  axiosInstance.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
  // Remove a header for all requests
  if (!axiosInstance.defaults.headers.common[key]) {
    console.warn(`Header ${key} does not exist.`);
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
}
export { setHeader, removeHeader };
