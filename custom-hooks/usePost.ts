import { fetchPosts } from "@/services/post";
import { FetchPostResponse } from "@/types/posts";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfintePosts({ limit }: { limit: number }) {
  return useInfiniteQuery<FetchPostResponse>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) =>
      fetchPosts({ pageParam: pageParam as string | null, limit }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
