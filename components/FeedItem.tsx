import { colors } from "@/constants";
import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Post } from "@/types";
import Profile from "./Profile";
interface FeedItemProps {
  post: Post;
}

function FeedItem({ post }: FeedItemProps) {
  const isLiked = false;
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Profile
          onPress={() => {}}
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createAt={post.createdAt}
        />
        <Text style={styles.title}>{post.title}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {post.description}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        {/* 좋아요 */}
        <Pressable style={styles.menu} onPress={() => {}}>
          <Octicons
            name={isLiked ? "heart-fill" : "heart"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuTexxt : styles.menuTexxt}>
            1
          </Text>
        </Pressable>
        <Pressable style={styles.menu} onPress={() => {}}>
          {/* 댓글 */}
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuTexxt}>1</Text>
        </Pressable>
        <Pressable style={styles.menu} onPress={() => {}}>
          {/* 조회수 */}
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
          <Text style={styles.menuTexxt}>1</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.WHITE },
  contentContainer: { padding: 16 },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK,
    marginVertical: 8,
  },
  description: { fontSize: 14, color: colors.BLACK, marginBottom: 14 },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: colors.GREY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    width: "33%",
    gap: 4,
  },
  menuTexxt: {
    fontSize: 14,
    color: colors.GREY_700,
  },
  activeMenuTexxt: {
    fontWeight: "500",
    color: colors.ORANGE_600,
  },
});

export default FeedItem;
