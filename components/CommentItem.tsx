import { colors } from "@/constants";
import { Comment } from "@/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import Profile from "./Profile";
import useAuth from "@/hooks/qureies/useAuth";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "./InputField";
import { useActionSheet } from "@expo/react-native-action-sheet";
import useDeleteComment from "@/hooks/qureies/UseDeleteComment";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
}

function CommentItem({ comment, isReply = false }: CommentItemProps) {
  const { userInfo } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const deleteComment = useDeleteComment();

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
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color={"black"}
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
                size={24}
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
      />
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
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default CommentItem;
