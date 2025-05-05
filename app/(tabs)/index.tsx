import FeedList from "@/components/FeedList";
import { colors } from "@/constants";
import useAuth from "@/hooks/qureies/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { userInfo } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
      {userInfo.id && (
        <Pressable
          style={styles.writeButton}
          onPress={() => router.push("/post/writes")}
        >
          <Ionicons name="pencil" size={32} color={colors.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WHITE },
  writeButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.ORANGE_600,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
