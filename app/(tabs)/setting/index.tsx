import AuthRouter from "@/components/AuthRouter";
import useAuth from "@/hooks/queries/useAuth";
import { SafeAreaView, Text } from "react-native";

export default function SettingScreen() {
  const { logout } = useAuth();
  return (
    <AuthRouter>
      <SafeAreaView>
        <Text onPress={logout}>로그아웃</Text>
      </SafeAreaView>
    </AuthRouter>
  );
}
