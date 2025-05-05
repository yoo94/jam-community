import { colors } from "@/constants";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, View, Image, Text } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");
interface ProfileProps {
  onPress: () => void;
  imageUri?: string;
  nickname: string;
  createAt: string;
  option?: ReactNode;
}

function Profile({
  onPress,
  imageUri,
  nickname,
  createAt,
  option,
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
          <Text style={styles.createAt}>{dayjs(createAt).fromNow()}</Text>
        </View>
      </Pressable>
      {option}
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
