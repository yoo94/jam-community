import { getPost } from "@/api/post";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

function useGetPost(id: number) {
  return useQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS, id],
    queryFn: () => getPost(Number(id)),
    enabled: !!id,
  });
}

export default useGetPost;
