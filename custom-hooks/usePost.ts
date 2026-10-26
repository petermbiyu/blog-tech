import { deletePost, fetchPosts } from "@/services/post";
import { FetchPostResponse } from "@/types/posts";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useInfintePosts({ limit }: { limit: number }) {
  return useInfiniteQuery<FetchPostResponse>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) =>
      fetchPosts({ pageParam: pageParam as string | null, limit }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.replace("/articles");
    },
    onError: (error) => {
      console.error("Error_deleting_post", error);
      alert("failed to delete post");
    },
  });
}

export function useDebounce<T>(value: T, delay = 300) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
}
