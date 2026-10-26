import { FetchPostParams, FetchPostResponse } from "@/types/posts";
import axios from "axios";

export async function fetchPosts({
  pageParam,
  limit,
}: FetchPostParams): Promise<FetchPostResponse> {
  const response = await axios.get("api/posts", {
    params: {
      cursor: pageParam,
      limit,
    },
  });
  return response.data;
}

export async function deletePost(postId: string) {
  const response = await axios.delete(`/api/posts/${postId}`);
  return response.data;
}

export async function searchPosts(query: string) {
  if (!query) return [];
  const response = await axios.get("/api/posts/search", {
    params: {
      q: query,
    },
  });
  return response.data.posts;
}
