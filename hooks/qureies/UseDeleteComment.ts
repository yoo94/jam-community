import { DeleteComment } from "@/api/comment";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

function UseDeleteComment() {
  return useMutation({
    mutationFn: DeleteComment,
    onSuccess: (postId: number) => {
      // 댓글 삭제 후 게시글 상태를 업데이트 해야함
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, postId],
      });
    },
  });
}

export default UseDeleteComment;
