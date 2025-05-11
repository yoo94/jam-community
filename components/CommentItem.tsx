import { colors } from "@/constants";
import { Comment } from "@/types";
import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import Profile from "./Profile";
import useAuth from "@/hooks/qureies/useAuth";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "./InputField";
import { useActionSheet } from "@expo/react-native-action-sheet";
import useDeleteComment from "@/hooks/qureies/UseDeleteComment";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  parentCommentId?: number | null;
  onReply?: () => void;
  onCancelReply?: () => void;
}

function CommentItem({
  comment,
  isReply = false,
  parentCommentId,
  onReply,
  onCancelReply,
}: CommentItemProps) {
  const { userInfo } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const deleteComment = useDeleteComment();

  const getCommentStyle = () => {
    if (parentCommentId === comment.id) {
      return colors.ORANGE_100;
    }
    if (isReply) {
      return colors.GREY_50;
    }
    return colors.WHITE;
  };

  const handlePressOption = () => {
    const options = ["삭제", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deleteComment.mutate(comment.id);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getCommentStyle(), marginLeft: isReply ? 7 : 0 },
      ]}
    >
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={20}
            color={colors.BLACK}
          />
        )}
        <Profile
          imageUri={comment.isDeleted ? "" : comment.user.imageUri}
          nickname={comment.isDeleted ? "(삭제)" : comment.user.nickname}
          createAt={comment.createdAt}
          onPress={() => {}}
          option={
            userInfo.id === comment.user.id &&
            !comment.isDeleted && (
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color="black"
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      <InputField
        editable={false}
        value={comment.isDeleted ? "삭제된 댓글입니다." : comment.content}
        label={""}
        style={styles.commentInput}
      />
      {!comment.isDeleted &&
        !isReply && ( // 삭제된게 아니면서 답글일때
          <View style={styles.relpyButtonContainer}>
            <Pressable onPress={onReply}>
              <Text style={styles.relpyButton}>답글 남기기</Text>
            </Pressable>
            {parentCommentId === comment.id && (
              <Pressable onPress={onCancelReply}>
                <Text style={styles.cancelButton}>취소</Text>
              </Pressable>
            )}
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GREY_200,
    borderWidth: 1,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  relpyButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4, // 간격 추가
  },
  relpyButton: {
    fontWeight: "bold",
    fontSize: 12,
    color: colors.ORANGE_600,
  },
  cancelButton: {
    color: colors.BLACK,
  },
  commentInput: {
    borderWidth: 0, // InputField의 기본 테두리 제거
  },
});
export default CommentItem;
