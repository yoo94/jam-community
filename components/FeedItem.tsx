import { colors } from "@/constants";
import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Post } from "@/types";
import Profile from "./Profile";
import useAuth from "@/hooks/qureies/useAuth";
import { useActionSheet } from "@expo/react-native-action-sheet";
import useDeletePost from "@/hooks/qureies/useDeletePost";
import { router } from "expo-router";
import ImagePreviewList from "./imagePreviewList";
import Votes from "./Votes";
import useLikePost from "@/hooks/qureies/useLikePost";
interface FeedItemProps {
  post: Post;
  isDetail?: boolean;
}

function FeedItem({ post, isDetail = false }: FeedItemProps) {
  const { userInfo } = useAuth();
  const likeUsers = post.likes?.map((like) => Number(like.userId));
  const isLiked = likeUsers?.includes(Number(userInfo?.id));
  const { showActionSheetWithOptions } = useActionSheet();
  const deletePost = useDeletePost();
  const likePost = useLikePost();

  const handlePressOption = () => {
    const options = ["삭제", "수정", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, destructiveButtonIndex, cancelButtonIndex },
      (selectedIndex) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            // 삭제
            deletePost.mutate(post.id, {
              onSuccess: () => {
                isDetail && router.replace("/"); // 삭제 후 홈으로 이동
              },
              onError: (error) => {
                console.error("Error deleting post:", error);
              },
            });

            break;
          case 1:
            // 수정
            router.push(`/post/update/${post.id}`);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  const handlePressFeed = () => {
    if (!isDetail) {
      router.push(`/post/${post.id}`);
    }
  };

  const handlePressLike = () => {
    if (!userInfo.id) {
      router.push("/auth");
      return;
    }
    if (!isDetail) {
      router.push(`/post/${post.id}`);
      return;
    }

    likePost.mutate(post.id);
  };

  const ContainerComponent = isDetail ? View : Pressable;
  return (
    <ContainerComponent style={styles.container} onPress={handlePressFeed}>
      <View>
        <View style={styles.contentContainer}>
          <Profile
            onPress={() => {}}
            imageUri={post.author.imageUri}
            nickname={post.author.nickname}
            createAt={post.createdAt}
            option={
              post.author.id === userInfo?.id && (
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  color={colors.BLACK}
                  onPress={handlePressOption}
                />
              )
            }
          />
          <Text style={styles.title}>{post.title}</Text>
          <Text numberOfLines={3} style={styles.description}>
            {post.description}
          </Text>
          <ImagePreviewList imageUris={post.imageUris} />
          {!isDetail && post.hasVote && (
            <View style={styles.voteContainer}>
              <View style={styles.votesTextContainer}>
                <MaterialCommunityIcons
                  name="vote"
                  size={24}
                  color={colors.ORANGE_600}
                />
                <Text style={styles.voteCountText}>투표</Text>
              </View>
              <Text>{post.voteCount}명 참여중</Text>
            </View>
          )}
          {isDetail && post.hasVote && (
            <Votes
              voteCount={post.voteCount}
              postId={post.id}
              postVotes={post.votes ?? []}
            />
          )}
        </View>
        <View style={styles.menuContainer}>
          {/* 좋아요 */}
          <Pressable style={styles.menu} onPress={handlePressLike}>
            <Octicons
              name={isLiked ? "heart-fill" : "heart"}
              size={16}
              color={isLiked ? colors.ORANGE_600 : colors.BLACK}
            />
            <Text style={isLiked ? styles.activeMenuTexxt : styles.menuTexxt}>
              {post.likes.length || "좋아용"}
            </Text>
          </Pressable>
          <Pressable style={styles.menu} onPress={handlePressFeed}>
            {/* 댓글 */}
            <MaterialCommunityIcons
              name="comment-processing-outline"
              size={16}
              color={colors.BLACK}
            />
            <Text style={styles.menuTexxt}>{post.commentCount || "댓글"}</Text>
          </Pressable>
          <Pressable style={styles.menu} onPress={() => {}}>
            {/* 조회수 */}
            <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
            <Text style={styles.menuTexxt}>{post.viewCount}</Text>
          </Pressable>
        </View>
      </View>
    </ContainerComponent>
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
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    gap: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.ORANGE_600,
    backgroundColor: colors.ORANGE_100,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  votesTextContainer: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  voteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  voteCountText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.BLACK,
  },
});

export default FeedItem;
