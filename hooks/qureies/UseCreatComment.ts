import { CreateComment } from "@/api/comment";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

function useCreateComment() {
  return useMutation({
    mutationFn: CreateComment,
    onSuccess: (postId: number) => {
      // 댓글 작성 후 게시글 상태를 업데이트 해야함
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, postId],
      });
    },
  });
}

export default useCreateComment;
