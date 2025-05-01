import * as SecureStore from "expo-secure-store";

async function savesecureStore(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}
async function getSecureStore(key: string): Promise<string | null> {
  const storeData = await SecureStore.getItemAsync(key);
  return storeData;
}
async function deleteSecureStore(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}

export { savesecureStore, getSecureStore, deleteSecureStore };
