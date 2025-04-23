import { colors } from "@/constants";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, View, Image, Text } from "react-native";

interface ProfileProps {
  onPress: () => void;
  imageUri?: string;
  nickname: string;
  createAt: string;
  optoin?: ReactNode;
}

function Profile({
  onPress,
  imageUri,
  nickname,
  createAt,
  optoin,
}: ProfileProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer} onPress={onPress}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.avatar}
        />
        <View style={{ gap: 5 }}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.createAt}>{createAt}</Text>
        </View>
      </Pressable>
      {optoin}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  nickname: { fontSize: 15, fontWeight: "bold", color: colors.BLACK },
  createAt: { fontSize: 15, color: colors.GREY_500 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GREY_300,
  },
});

export default Profile;
