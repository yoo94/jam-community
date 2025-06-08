import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { Post, Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";

function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, postId],
      });

      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.USER_INFO,
      ]);
      const userId = user?.id;

      if (userId !== undefined) {
        const previousPosts = queryClient.getQueryData<Post>([
          queryKeys.POST,
          queryKeys.GET_POSTS,
          postId,
        ]);

        if (previousPosts) {
          const newPost = { ...previousPosts };
          const likeIndex = previousPosts.likes.findIndex(
            (like) => like.userId === userId
          );

          likeIndex >= 0
            ? newPost.likes?.splice(likeIndex, 1)
            : newPost.likes?.push({ userId });

          queryClient.setQueryData(
            [queryKeys.POST, queryKeys.GET_POSTS, postId],
            newPost
          );

          return { previousPosts, newPost };
        }
      }
    },
    onError: (error, postId, context) => {
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POSTS, context?.previousPosts.id], // 쿼리키 수정
        context?.previousPosts
      );
    },
    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useLikePost;
