import { router, useFocusEffect } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function MyScreen() {
  //화면이 포커싱 됐을 때
  useFocusEffect(() => {
    router.replace("/auth");
  });
  return (
    <SafeAreaView>
      <Text>내정보 스크린</Text>
    </SafeAreaView>
  );
}
