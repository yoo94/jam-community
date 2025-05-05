import { getPosts } from "@/api/post";
import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetInfinitePosts() {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined; // No more pages
      }
      return pages.length + 1; // Increment page number for next query
    },
  });
}

export default useGetInfinitePosts;
